#!/bin/bash
# =============================================================================
# FiberDoc — Script de Instalação para Debian/Ubuntu
# Versão: 6.2.4
# =============================================================================
set -e

FIBERDOC_DIR="/opt/fiberdoc"
FIBERDOC_USER="fiberdoc"
DB_NAME="fiberdoc"
DB_USER="fiberdoc"
NODE_VERSION="22"
SERVICE_NAME="fiberdoc"
APP_PORT="3000"

# Cores
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; BLUE='\033[0;34m'; NC='\033[0m'
info()    { echo -e "${BLUE}[INFO]${NC} $1"; }
success() { echo -e "${GREEN}[OK]${NC} $1"; }
warn()    { echo -e "${YELLOW}[AVISO]${NC} $1"; }
error()   { echo -e "${RED}[ERRO]${NC} $1"; exit 1; }

# Verificar root
[[ $EUID -ne 0 ]] && error "Execute como root: sudo bash install.sh"

echo ""
echo "╔══════════════════════════════════════════════════════════╗"
echo "║          FiberDoc v6.2.4 — Instalação Automática         ║"
echo "║     Sistema de Documentação de Fibras e Equipamentos     ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""

# Detectar OS
if [ -f /etc/os-release ]; then
  . /etc/os-release
  OS=$ID
  OS_VERSION=$VERSION_ID
else
  error "Sistema operacional não suportado."
fi
info "Sistema detectado: $PRETTY_NAME"

# ─── Coletar configurações ───────────────────────────────────────────────────
echo ""
echo "─── Configuração do Banco de Dados ─────────────────────────"
read -p "  Senha para o usuário MySQL '$DB_USER' [padrão: fiberdoc2025]: " DB_PASS
DB_PASS="${DB_PASS:-fiberdoc2025}"

read -p "  Senha root do MySQL (deixe em branco para gerar automaticamente): " MYSQL_ROOT_PASS
if [ -z "$MYSQL_ROOT_PASS" ]; then
  MYSQL_ROOT_PASS=$(openssl rand -base64 20 | tr -dc 'A-Za-z0-9' | head -c 20)
  warn "Senha root MySQL gerada: $MYSQL_ROOT_PASS (anote esta senha!)"
fi

echo ""
echo "─── Configuração do Servidor ────────────────────────────────"
read -p "  Porta do servidor FiberDoc [padrão: 3000]: " INPUT_PORT
APP_PORT="${INPUT_PORT:-3000}"

read -p "  Configurar Nginx como proxy reverso? [S/n]: " SETUP_NGINX
SETUP_NGINX="${SETUP_NGINX:-S}"

if [[ "$SETUP_NGINX" =~ ^[Ss]$ ]]; then
  read -p "  Domínio ou IP para o Nginx [padrão: $(hostname -I | awk '{print $1}')]: " NGINX_HOST
  NGINX_HOST="${NGINX_HOST:-$(hostname -I | awk '{print $1}')}"
fi

# Gerar JWT_SECRET
JWT_SECRET=$(openssl rand -base64 48 | tr -dc 'A-Za-z0-9' | head -c 48)

echo ""
info "Iniciando instalação..."
echo ""

# ─── 1. Atualizar sistema e instalar dependências ────────────────────────────
info "[1/8] Atualizando pacotes do sistema..."
apt-get update -qq
apt-get install -y -qq curl wget gnupg2 ca-certificates lsb-release apt-transport-https \
  software-properties-common unzip openssl nginx 2>/dev/null || true
success "Pacotes base instalados."

# ─── 2. Instalar Node.js ─────────────────────────────────────────────────────
info "[2/8] Instalando Node.js $NODE_VERSION..."
if ! command -v node &>/dev/null || [[ $(node -v | cut -d. -f1 | tr -d 'v') -lt 18 ]]; then
  curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash - 2>/dev/null
  apt-get install -y -qq nodejs
  success "Node.js $(node -v) instalado."
else
  success "Node.js $(node -v) já instalado."
fi

# ─── 3. Instalar MySQL ───────────────────────────────────────────────────────
info "[3/8] Instalando MySQL Server..."
if ! command -v mysql &>/dev/null; then
  DEBIAN_FRONTEND=noninteractive apt-get install -y -qq mysql-server
  # Configurar senha root
  mysqladmin -u root password "$MYSQL_ROOT_PASS" 2>/dev/null || \
    mysql -u root -e "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '$MYSQL_ROOT_PASS'; FLUSH PRIVILEGES;" 2>/dev/null || true
  success "MySQL instalado."
else
  success "MySQL já instalado."
fi

# Garantir que MySQL está rodando
systemctl start mysql 2>/dev/null || service mysql start 2>/dev/null || true
sleep 2

# ─── 4. Criar banco de dados e usuário ──────────────────────────────────────
info "[4/8] Configurando banco de dados '$DB_NAME'..."
MYSQL_CMD="mysql -u root -p${MYSQL_ROOT_PASS}"

# Criar banco e usuário
$MYSQL_CMD -e "
  CREATE DATABASE IF NOT EXISTS \`$DB_NAME\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
  CREATE USER IF NOT EXISTS '$DB_USER'@'localhost' IDENTIFIED BY '$DB_PASS';
  GRANT ALL PRIVILEGES ON \`$DB_NAME\`.* TO '$DB_USER'@'localhost';
  FLUSH PRIVILEGES;
" 2>/dev/null || warn "Usuário pode já existir, continuando..."

# Aplicar schema completo
info "  Aplicando schema do banco de dados..."
$MYSQL_CMD "$DB_NAME" < "$(dirname "$0")/schema-full.sql" 2>/dev/null && \
  success "Schema aplicado com sucesso." || \
  warn "Algumas tabelas podem já existir (normal em reinstalação)."

success "Banco de dados configurado."

# ─── 5. Criar usuário do sistema e diretório ────────────────────────────────
info "[5/8] Criando usuário do sistema e diretório de instalação..."
if ! id "$FIBERDOC_USER" &>/dev/null; then
  useradd -r -s /bin/false -d "$FIBERDOC_DIR" "$FIBERDOC_USER"
fi
mkdir -p "$FIBERDOC_DIR/dist/public/assets"
mkdir -p "$FIBERDOC_DIR/backups"
mkdir -p "$FIBERDOC_DIR/logs"
success "Diretório $FIBERDOC_DIR criado."

# ─── 6. Copiar arquivos da aplicação ────────────────────────────────────────
info "[6/8] Copiando arquivos da aplicação..."
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cp -r "$SCRIPT_DIR/dist/"* "$FIBERDOC_DIR/dist/"
success "Arquivos copiados para $FIBERDOC_DIR."

# ─── 7. Criar arquivo .env ──────────────────────────────────────────────────
info "[7/8] Criando configuração de ambiente..."
DATABASE_URL="mysql://$DB_USER:$DB_PASS@localhost:3306/$DB_NAME"

cat > "$FIBERDOC_DIR/.env" << EOF
# FiberDoc — Configuração de Ambiente
# Gerado em: $(date)
NODE_ENV=production
PORT=$APP_PORT
DATABASE_URL=$DATABASE_URL
JWT_SECRET=$JWT_SECRET
# Deixar em branco para usar autenticação local (admin@fiberdoc.local / fiberdoc2025)
OAUTH_SERVER_URL=
VITE_APP_ID=
OWNER_OPEN_ID=
OWNER_NAME=
BUILT_IN_FORGE_API_URL=
BUILT_IN_FORGE_API_KEY=
VITE_FRONTEND_FORGE_API_KEY=
VITE_FRONTEND_FORGE_API_URL=
EOF

chmod 600 "$FIBERDOC_DIR/.env"
chown -R "$FIBERDOC_USER:$FIBERDOC_USER" "$FIBERDOC_DIR"
success "Arquivo .env criado."

# ─── 8. Criar serviço systemd ───────────────────────────────────────────────
info "[8/8] Configurando serviço systemd..."
cat > "/etc/systemd/system/$SERVICE_NAME.service" << EOF
[Unit]
Description=FiberDoc — Sistema de Documentação de Fibras e Equipamentos
After=network.target mysql.service
Wants=mysql.service

[Service]
Type=simple
User=$FIBERDOC_USER
WorkingDirectory=$FIBERDOC_DIR
EnvironmentFile=$FIBERDOC_DIR/.env
ExecStart=/usr/bin/node $FIBERDOC_DIR/dist/index.js
Restart=always
RestartSec=5
StandardOutput=append:$FIBERDOC_DIR/logs/fiberdoc.log
StandardError=append:$FIBERDOC_DIR/logs/fiberdoc-error.log

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable "$SERVICE_NAME"
systemctl start "$SERVICE_NAME"
sleep 3

if systemctl is-active --quiet "$SERVICE_NAME"; then
  success "Serviço $SERVICE_NAME iniciado com sucesso."
else
  warn "Serviço pode não ter iniciado. Verifique: journalctl -u $SERVICE_NAME -n 20"
fi

# ─── Configurar Nginx ────────────────────────────────────────────────────────
if [[ "$SETUP_NGINX" =~ ^[Ss]$ ]]; then
  info "Configurando Nginx como proxy reverso..."
  cat > "/etc/nginx/sites-available/$SERVICE_NAME" << EOF
server {
    listen 80;
    server_name $NGINX_HOST;

    # Aumentar limite de upload para backups e importações
    client_max_body_size 100M;

    # Logs
    access_log /var/log/nginx/fiberdoc-access.log;
    error_log  /var/log/nginx/fiberdoc-error.log;

    # Proxy para o Node.js
    location / {
        proxy_pass http://127.0.0.1:$APP_PORT;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        proxy_read_timeout 300s;
        proxy_connect_timeout 75s;
    }

    # Cache para assets estáticos
    location /assets/ {
        proxy_pass http://127.0.0.1:$APP_PORT;
        proxy_cache_valid 200 1d;
        add_header Cache-Control "public, max-age=86400, immutable";
    }
}
EOF

  ln -sf "/etc/nginx/sites-available/$SERVICE_NAME" "/etc/nginx/sites-enabled/$SERVICE_NAME"
  rm -f /etc/nginx/sites-enabled/default 2>/dev/null || true
  nginx -t && systemctl restart nginx && success "Nginx configurado."
fi

# ─── Resumo final ────────────────────────────────────────────────────────────
echo ""
echo "╔══════════════════════════════════════════════════════════╗"
echo "║              Instalação Concluída com Sucesso!           ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""
echo "  Acesso ao sistema:"
if [[ "$SETUP_NGINX" =~ ^[Ss]$ ]]; then
  echo "    URL:      http://$NGINX_HOST"
else
  echo "    URL:      http://$(hostname -I | awk '{print $1}'):$APP_PORT"
fi
echo ""
echo "  Credenciais padrão:"
echo "    Email:    admin@fiberdoc.local"
echo "    Senha:    fiberdoc2025"
echo ""
echo "  ⚠️  IMPORTANTE: Altere a senha padrão após o primeiro login!"
echo ""
echo "  Banco de dados:"
echo "    Host:     localhost"
echo "    Banco:    $DB_NAME"
echo "    Usuário:  $DB_USER"
echo "    Senha:    $DB_PASS"
echo "    Root:     $MYSQL_ROOT_PASS"
echo ""
echo "  Arquivos:"
echo "    App:      $FIBERDOC_DIR"
echo "    Logs:     $FIBERDOC_DIR/logs/"
echo "    Config:   $FIBERDOC_DIR/.env"
echo ""
echo "  Comandos úteis:"
echo "    Status:   systemctl status $SERVICE_NAME"
echo "    Logs:     journalctl -u $SERVICE_NAME -f"
echo "    Reiniciar: systemctl restart $SERVICE_NAME"
echo ""
