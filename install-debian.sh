#!/bin/bash
# =============================================================================
# FiberDoc — Script de Instalação Standalone para Debian/Ubuntu
# Uso: curl -fsSL https://raw.githubusercontent.com/ewertonlopesssi-fiberdoc/fiberdoc-installer/main/install-debian.sh | sudo bash
# =============================================================================
set -e

REPO="ewertonlopesssi-fiberdoc/fiberdoc-installer"
FIBERDOC_DIR="/opt/fiberdoc"
FIBERDOC_USER="fiberdoc"
DB_NAME="fiberdoc"
DB_USER="fiberdoc"
NODE_VERSION="22"
SERVICE_NAME="fiberdoc"
APP_PORT="3000"
TMP_DIR="/tmp/fiberdoc-install-$$"

# ── Cores ────────────────────────────────────────────────────────────────────
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'
BLUE='\033[0;34m'; CYAN='\033[0;36m'; BOLD='\033[1m'; NC='\033[0m'

info()    { echo -e "${BLUE}[INFO]${NC} $1"; }
success() { echo -e "${GREEN}[OK]${NC}   $1"; }
warn()    { echo -e "${YELLOW}[AVISO]${NC} $1"; }
error()   { echo -e "${RED}[ERRO]${NC}  $1"; exit 1; }
step()    { echo -e "\n${CYAN}${BOLD}[$1/9]${NC} $2"; }

# ── Verificar root ────────────────────────────────────────────────────────────
[[ $EUID -ne 0 ]] && error "Execute como root: sudo bash $0"

clear
echo ""
echo -e "${BOLD}╔══════════════════════════════════════════════════════════╗${NC}"
echo -e "${BOLD}║       FiberDoc — Instalação Automática para Debian       ║${NC}"
echo -e "${BOLD}║   Sistema de Documentação de Fibras e Equipamentos       ║${NC}"
echo -e "${BOLD}╚══════════════════════════════════════════════════════════╝${NC}"
echo ""

# ── Detectar OS ───────────────────────────────────────────────────────────────
if [ -f /etc/os-release ]; then
  . /etc/os-release
  OS=$ID
else
  error "Sistema operacional não suportado."
fi
info "Sistema detectado: ${BOLD}$PRETTY_NAME${NC}"

# ── Verificar compatibilidade ─────────────────────────────────────────────────
if [[ "$OS" != "debian" && "$OS" != "ubuntu" && "$OS" != "raspbian" ]]; then
  warn "Sistema '$OS' não testado oficialmente. Prosseguindo mesmo assim..."
fi

# ── Coletar configurações ─────────────────────────────────────────────────────
echo ""
echo -e "${BOLD}─── Configuração do Banco de Dados ─────────────────────────${NC}"
read -p "  Senha para o usuário MySQL '$DB_USER' [padrão: fiberdoc2025]: " DB_PASS
DB_PASS="${DB_PASS:-fiberdoc2025}"

read -s -p "  Senha root do MySQL (em branco = gerar automaticamente): " MYSQL_ROOT_PASS
echo ""
if [ -z "$MYSQL_ROOT_PASS" ]; then
  MYSQL_ROOT_PASS=$(openssl rand -base64 20 | tr -dc 'A-Za-z0-9' | head -c 20)
  warn "Senha root MySQL gerada automaticamente: ${BOLD}$MYSQL_ROOT_PASS${NC}"
  warn "Anote esta senha! Ela não será exibida novamente."
fi

echo ""
echo -e "${BOLD}─── Configuração do Servidor ────────────────────────────────${NC}"
read -p "  Porta do servidor FiberDoc [padrão: 3000]: " INPUT_PORT
APP_PORT="${INPUT_PORT:-3000}"

read -p "  Configurar Nginx como proxy reverso? [S/n]: " SETUP_NGINX
SETUP_NGINX="${SETUP_NGINX:-S}"

if [[ "$SETUP_NGINX" =~ ^[Ss]$ ]]; then
  DEFAULT_IP=$(hostname -I | awk '{print $1}')
  read -p "  Domínio ou IP para o Nginx [padrão: $DEFAULT_IP]: " NGINX_HOST
  NGINX_HOST="${NGINX_HOST:-$DEFAULT_IP}"

  # Verificar se é um domínio real (não IP) para oferecer SSL
  if echo "$NGINX_HOST" | grep -qP '^[a-zA-Z].*\.[a-zA-Z]{2,}$'; then
    read -p "  Configurar SSL (Let's Encrypt) para $NGINX_HOST? [S/n]: " SETUP_SSL
    SETUP_SSL="${SETUP_SSL:-S}"
    if [[ "$SETUP_SSL" =~ ^[Ss]$ ]]; then
      read -p "  E-mail para o certificado SSL: " SSL_EMAIL
    fi
  else
    SETUP_SSL="N"
  fi
fi

echo ""
echo -e "${BOLD}─── Módulo de Provedores ────────────────────────────────────${NC}"
echo "  O módulo de múltiplos provedores permite gerenciar clientes"
echo "  com bancos de dados separados (multi-tenant)."
read -p "  Ocultar este módulo no menu? [s/N]: " HIDE_PROV_INPUT
HIDE_PROV_INPUT="${HIDE_PROV_INPUT:-N}"
if [[ "$HIDE_PROV_INPUT" =~ ^[Ss]$ ]]; then
  HIDE_PROVIDERS_VALUE="true"
  info "Módulo de provedores será ocultado no menu."
else
  HIDE_PROVIDERS_VALUE="false"
fi

# Gerar JWT_SECRET
JWT_SECRET=$(openssl rand -base64 48 | tr -dc 'A-Za-z0-9' | head -c 48)

echo ""
echo -e "${BOLD}─── Resumo da Instalação ────────────────────────────────────${NC}"
echo "  Diretório de instalação : $FIBERDOC_DIR"
echo "  Porta da aplicação      : $APP_PORT"
echo "  Banco de dados          : $DB_NAME"
echo "  Usuário MySQL           : $DB_USER"
if [[ "$SETUP_NGINX" =~ ^[Ss]$ ]]; then
  echo "  Nginx                   : habilitado → $NGINX_HOST"
fi
echo "  Módulo provedores       : $([ "$HIDE_PROVIDERS_VALUE" = "true" ] && echo "oculto" || echo "visível")"
echo ""
read -p "Confirmar instalação? [S/n]: " CONFIRM
CONFIRM="${CONFIRM:-S}"
[[ ! "$CONFIRM" =~ ^[Ss]$ ]] && { echo "Instalação cancelada."; exit 0; }

echo ""
info "Iniciando instalação..."
mkdir -p "$TMP_DIR"

# ─── PASSO 1: Dependências base ───────────────────────────────────────────────
step 1 "Instalando dependências do sistema..."
apt-get update -qq
apt-get install -y -qq curl wget gnupg2 ca-certificates lsb-release \
  apt-transport-https software-properties-common unzip openssl nginx 2>/dev/null || true
success "Dependências instaladas."

# ─── PASSO 2: Node.js ─────────────────────────────────────────────────────────
step 2 "Instalando Node.js $NODE_VERSION..."
if ! command -v node &>/dev/null || [[ $(node -v 2>/dev/null | cut -d. -f1 | tr -d 'v') -lt 18 ]]; then
  curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash - 2>/dev/null
  apt-get install -y -qq nodejs
  success "Node.js $(node -v) instalado."
else
  success "Node.js $(node -v) já está instalado."
fi

# ─── PASSO 3: MySQL ───────────────────────────────────────────────────────────
step 3 "Instalando MySQL Server..."
if ! command -v mysql &>/dev/null; then
  DEBIAN_FRONTEND=noninteractive apt-get install -y -qq mysql-server
  success "MySQL instalado."
else
  success "MySQL já está instalado."
fi

# Garantir que o MySQL está rodando
systemctl start mysql 2>/dev/null || service mysql start 2>/dev/null || true
sleep 2

# Configurar senha root
mysqladmin -u root password "$MYSQL_ROOT_PASS" 2>/dev/null || \
  mysql -u root -e "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '$MYSQL_ROOT_PASS'; FLUSH PRIVILEGES;" 2>/dev/null || \
  mysql -u root -e "ALTER USER 'root'@'localhost' IDENTIFIED BY '$MYSQL_ROOT_PASS'; FLUSH PRIVILEGES;" 2>/dev/null || \
  warn "Não foi possível alterar a senha root (pode já estar configurada)."

# ─── PASSO 4: Banco de dados ──────────────────────────────────────────────────
step 4 "Configurando banco de dados '$DB_NAME'..."
MYSQL_CMD="mysql -u root -p${MYSQL_ROOT_PASS} --connect-expired-password"

$MYSQL_CMD -e "
  CREATE DATABASE IF NOT EXISTS \`$DB_NAME\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
  CREATE USER IF NOT EXISTS '$DB_USER'@'localhost' IDENTIFIED BY '$DB_PASS';
  GRANT ALL PRIVILEGES ON \`$DB_NAME\`.* TO '$DB_USER'@'localhost';
  FLUSH PRIVILEGES;
" 2>/dev/null || warn "Usuário pode já existir, continuando..."

success "Banco de dados configurado."

# ─── PASSO 5: Download do FiberDoc ────────────────────────────────────────────
step 5 "Baixando FiberDoc do GitHub..."

# Obter versão mais recente
info "  Consultando versão mais recente..."
LATEST_TAG=$(curl -fsSL "https://api.github.com/repos/$REPO/releases/latest" 2>/dev/null \
  | grep '"tag_name"' | head -1 | sed 's/.*"tag_name": *"\([^"]*\)".*/\1/')

if [ -z "$LATEST_TAG" ]; then
  warn "Não foi possível obter a versão via API. Usando branch main..."
  LATEST_TAG="main"
  USE_MAIN=true
else
  LATEST_VERSION="${LATEST_TAG#v}"
  info "  Versão mais recente: ${BOLD}$LATEST_TAG${NC}"
  USE_MAIN=false
fi

# Baixar o repositório completo (contém dist/ e schema-full.sql)
info "  Baixando pacote de instalação..."
curl -fsSL "https://github.com/$REPO/archive/refs/heads/main.zip" \
  -o "$TMP_DIR/installer.zip" \
  || error "Falha ao baixar o instalador. Verifique a conexão com a internet."

unzip -q "$TMP_DIR/installer.zip" -d "$TMP_DIR/"
INSTALLER_DIR="$TMP_DIR/fiberdoc-installer-main"

# Se houver release mais recente, baixar o zip de atualização (dist mais novo)
if [ "$USE_MAIN" = false ]; then
  ZIP_NAME="fiberdoc-update-${LATEST_VERSION}.zip"
  ZIP_URL="https://github.com/$REPO/releases/download/$LATEST_TAG/$ZIP_NAME"
  info "  Baixando build $LATEST_TAG..."
  if curl -fsSL "$ZIP_URL" -o "$TMP_DIR/update.zip" 2>/dev/null; then
    unzip -q "$TMP_DIR/update.zip" -d "$TMP_DIR/update/"
    # Detectar subdiretório
    UPDATE_DIR="$TMP_DIR/update"
    ENTRIES=$(ls "$UPDATE_DIR" | wc -l)
    if [ "$ENTRIES" -eq 1 ]; then
      SUBDIR=$(ls "$UPDATE_DIR")
      [ -d "$UPDATE_DIR/$SUBDIR" ] && UPDATE_DIR="$UPDATE_DIR/$SUBDIR"
    fi
    # Substituir dist pelo build mais recente
    [ -f "$UPDATE_DIR/index.js" ] && cp "$UPDATE_DIR/index.js" "$INSTALLER_DIR/dist/index.js"
    [ -d "$UPDATE_DIR/public" ] && cp -r "$UPDATE_DIR/public/." "$INSTALLER_DIR/dist/public/"
    success "Build $LATEST_TAG aplicado."
  else
    warn "Build da release não encontrado. Usando versão do branch main."
  fi
fi

success "FiberDoc baixado."

# ─── PASSO 6: Instalar arquivos ───────────────────────────────────────────────
step 6 "Instalando arquivos da aplicação..."

# Criar usuário do sistema
if ! id "$FIBERDOC_USER" &>/dev/null; then
  useradd -r -s /bin/false -d "$FIBERDOC_DIR" "$FIBERDOC_USER"
fi

# Criar diretórios
mkdir -p "$FIBERDOC_DIR/dist/public/assets"
mkdir -p "$FIBERDOC_DIR/dist/public/icons"
mkdir -p "$FIBERDOC_DIR/backups"
mkdir -p "$FIBERDOC_DIR/logs"

# Copiar arquivos compilados
cp -r "$INSTALLER_DIR/dist/." "$FIBERDOC_DIR/dist/"

# Copiar schema-base.sql e scripts de migração para /opt/fiberdoc/scripts/
mkdir -p "$FIBERDOC_DIR/scripts"
if [ -f "$INSTALLER_DIR/schema-full.sql" ]; then
  cp "$INSTALLER_DIR/schema-full.sql" "$FIBERDOC_DIR/scripts/schema-base.sql"
fi
# Copiar scripts de atualização se existirem
for f in "$INSTALLER_DIR"/*.sh; do
  [ -f "$f" ] && cp "$f" "$FIBERDOC_DIR/scripts/" 2>/dev/null || true
done

# Aplicar schema do banco
info "  Aplicando schema do banco de dados..."
$MYSQL_CMD "$DB_NAME" < "$INSTALLER_DIR/schema-full.sql" 2>/dev/null && \
  success "Schema aplicado." || \
  warn "Algumas tabelas podem já existir (normal em reinstalação)."

# Inserir usuário admin padrão com hash bcrypt correto
info "  Criando usuário admin padrão..."
ADMIN_HASH='\$2b\$12\$.RRDCP3jRU.v9r1FlpJCpOwiGrBGJjHVQzIPtyt43Ndt7CK7wmxs6'
$MYSQL_CMD "$DB_NAME" -e "
  INSERT IGNORE INTO \`users\` (openId, name, email, loginMethod, role, passwordHash, mustChangePassword)
  VALUES ('local-admin', 'Administrador', 'admin@fiberdoc.local', 'local', 'admin', '${ADMIN_HASH}', 1);
" 2>/dev/null && success "Usuário admin criado." || warn "Usuário admin pode já existir."

success "Arquivos instalados em $FIBERDOC_DIR."

# ─── PASSO 7: Configurar ambiente (.env) ──────────────────────────────────────
step 7 "Criando arquivo de configuração..."
DATABASE_URL="mysql://$DB_USER:$DB_PASS@localhost:3306/$DB_NAME"

cat > "$FIBERDOC_DIR/.env" <<EOF
# FiberDoc — Configuração de Ambiente
# Gerado em: $(date)
NODE_ENV=production
PORT=$APP_PORT
DATABASE_URL=$DATABASE_URL
JWT_SECRET=$JWT_SECRET

# Ocultar módulo de múltiplos provedores no menu (true/false)
HIDE_PROVIDERS=$HIDE_PROVIDERS_VALUE

# Autenticação OAuth (deixar em branco para usar autenticação local)
# Credenciais padrão: admin@fiberdoc.local / fiberdoc2025
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

# ─── PASSO 8: Serviço systemd ─────────────────────────────────────────────────
step 8 "Configurando serviço systemd..."

cat > "/etc/systemd/system/$SERVICE_NAME.service" <<EOF
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
Restart=on-failure
RestartSec=10
KillMode=mixed
TimeoutStopSec=15

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable "$SERVICE_NAME"
systemctl start "$SERVICE_NAME"
sleep 3

if systemctl is-active --quiet "$SERVICE_NAME"; then
  success "Serviço $SERVICE_NAME iniciado e habilitado no boot."
else
  warn "Serviço pode não ter iniciado corretamente."
  warn "Verifique com: journalctl -u $SERVICE_NAME -n 30 --no-pager"
fi

# # ─── PASSO 9: Nginx + SSL ─────────────────────────────────────────────
if [[ "$SETUP_NGINX" =~ ^[Ss]$ ]]; then
  step 9 "Configurando Nginx como proxy reverso..."

  # Configurar Nginx inicial (HTTP)
  cat > "/etc/nginx/sites-available/$SERVICE_NAME" <<EOF
server {
    listen 80;
    server_name $NGINX_HOST;
    client_max_body_size 100M;
    proxy_read_timeout 120s;
    proxy_send_timeout 120s;
    access_log /var/log/nginx/$SERVICE_NAME-access.log;
    error_log  /var/log/nginx/$SERVICE_NAME-error.log;
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
    location /assets/ {
        proxy_pass http://127.0.0.1:$APP_PORT;
        add_header Cache-Control "public, max-age=86400, immutable";
    }
}
EOF

  ln -sf "/etc/nginx/sites-available/$SERVICE_NAME" "/etc/nginx/sites-enabled/$SERVICE_NAME"
  rm -f /etc/nginx/sites-enabled/default 2>/dev/null || true

  if nginx -t 2>/dev/null; then
    systemctl restart nginx
    success "Nginx configurado (HTTP)."
  else
    warn "Configuração do Nginx com erro. Verifique manualmente: nginx -t"
  fi

  # ─── SSL com Let's Encrypt ─────────────────────────────────────────────
  if [[ "$SETUP_SSL" =~ ^[Ss]$ ]] && [ -n "$SSL_EMAIL" ]; then
    info "Configurando SSL com Let's Encrypt para $NGINX_HOST..."

    # Instalar certbot se necessário
    if ! command -v certbot &>/dev/null; then
      info "  Instalando Certbot..."
      apt-get install -y -qq certbot python3-certbot-nginx && success "Certbot instalado."
    fi

    # Solicitar certificado
    if certbot --nginx -d "$NGINX_HOST" --non-interactive --agree-tos --email "$SSL_EMAIL" --redirect 2>/dev/null; then
      success "Certificado SSL obtido e Nginx atualizado com HTTPS!"
      SSL_CONFIGURED=true
    else
      warn "Não foi possível obter o certificado SSL automaticamente."
      warn "Verifique se o DNS de $NGINX_HOST aponta para este servidor e se a porta 80 está acessível."
      warn "Para tentar novamente: certbot --nginx -d $NGINX_HOST --email $SSL_EMAIL --agree-tos"
      SSL_CONFIGURED=false
    fi
  fi
fi

# ─── Limpeza ──────────────────────────────────────────────────────────────────
rm -rf "$TMP_DIR"

# ─── Resumo Final ─────────────────────────────────────────────────────────────
echo ""
echo -e "${GREEN}${BOLD}╔══════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}${BOLD}║            Instalação Concluída com Sucesso!             ║${NC}"
echo -e "${GREEN}${BOLD}╚══════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "  ${BOLD}Acesso ao sistema:${NC}"
if [[ "$SETUP_NGINX" =~ ^[Ss]$ ]]; then
  if [ "${SSL_CONFIGURED:-false}" = "true" ]; then
    echo -e "    URL:      ${CYAN}https://$NGINX_HOST${NC}  ${GREEN}(SSL ativo)${NC}"
  else
    echo -e "    URL:      ${CYAN}http://$NGINX_HOST${NC}"
  fi
else
  echo -e "    URL:      ${CYAN}http://$(hostname -I | awk '{print $1}'):$APP_PORT${NC}"
fi
echo ""
echo -e "  ${BOLD}Credenciais padrão:${NC}"
echo -e "    Email:    ${CYAN}admin@fiberdoc.local${NC}"
echo -e "    Senha:    ${CYAN}fiberdoc2025${NC}"
echo ""
echo -e "  ${YELLOW}${BOLD}⚠  IMPORTANTE: Altere a senha padrão após o primeiro login!${NC}"
echo ""
echo -e "  ${BOLD}Banco de dados:${NC}"
echo "    Host:     localhost"
echo "    Banco:    $DB_NAME"
echo "    Usuário:  $DB_USER"
echo "    Senha:    $DB_PASS"
echo "    Root:     $MYSQL_ROOT_PASS"
echo ""
echo -e "  ${BOLD}Arquivos:${NC}"
echo "    App:      $FIBERDOC_DIR"
echo "    Logs:     $FIBERDOC_DIR/logs/"
echo "    Config:   $FIBERDOC_DIR/.env"
echo ""
echo -e "  ${BOLD}Comandos úteis:${NC}"
echo "    Status:    systemctl status $SERVICE_NAME"
echo "    Logs:      journalctl -u $SERVICE_NAME -f"
echo "    Reiniciar: systemctl restart $SERVICE_NAME"
echo "    Atualizar: curl -fsSL https://raw.githubusercontent.com/$REPO/main/update.sh | bash"
echo ""
