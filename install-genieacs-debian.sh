#!/bin/bash
# =============================================================================
#  GenieACS — Instalador Automatizado para Debian/Ubuntu
#  Versão: 1.0.0
#  Compatível com: Debian 11/12, Ubuntu 20.04/22.04
#
#  Configurações pré-definidas (compatível com FiberDoc):
#    - UI:   porta 3100 (evita conflito com FiberDoc na 3000)
#    - CWMP: porta 7547 (padrão TR-069)
#    - NBI:  porta 7557 (API REST)
#    - FS:   porta 7567 (file server)
# =============================================================================

set -e

# ─── Cores ───────────────────────────────────────────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m'

# ─── Banner ──────────────────────────────────────────────────────────────────
clear
echo -e "${CYAN}${BOLD}"
echo "  ╔══════════════════════════════════════════════════════════╗"
echo "  ║         GenieACS — Instalador para Debian/Ubuntu        ║"
echo "  ║              Otimizado para uso com FiberDoc             ║"
echo "  ╚══════════════════════════════════════════════════════════╝"
echo -e "${NC}"
echo -e "  ${YELLOW}Portas configuradas:${NC}"
echo -e "  • UI Web:  ${BOLD}3100${NC}  → http://SEU_IP:3100"
echo -e "  • CWMP:    ${BOLD}7547${NC}  → CPEs/ONTs se conectam aqui (TR-069)"
echo -e "  • NBI:     ${BOLD}7557${NC}  → API REST (SGP, FiberDoc)"
echo -e "  • FS:      ${BOLD}7567${NC}  → File Server (firmwares)"
echo ""

# ─── Verificar root ──────────────────────────────────────────────────────────
if [ "$EUID" -ne 0 ]; then
  echo -e "${RED}[ERRO] Execute como root: sudo bash $0${NC}"
  exit 1
fi

# ─── Verificar sistema operacional ───────────────────────────────────────────
if ! command -v apt-get &>/dev/null; then
  echo -e "${RED}[ERRO] Este script requer um sistema baseado em Debian/Ubuntu.${NC}"
  exit 1
fi

# ─── Perguntas de configuração ───────────────────────────────────────────────
echo -e "${CYAN}─── Configuração do GenieACS ────────────────────────────────${NC}"
echo ""

read -p "  Usuário admin da UI [padrão: admin]: " GENIE_ADMIN_USER
GENIE_ADMIN_USER=${GENIE_ADMIN_USER:-admin}

read -s -p "  Senha admin da UI [padrão: genieacs2025]: " GENIE_ADMIN_PASS
echo ""
GENIE_ADMIN_PASS=${GENIE_ADMIN_PASS:-genieacs2025}

echo ""
read -p "  Porta da UI Web [padrão: 3100]: " GENIE_UI_PORT
GENIE_UI_PORT=${GENIE_UI_PORT:-3100}

echo ""
echo -e "${CYAN}─── MongoDB ─────────────────────────────────────────────────${NC}"
echo ""
read -p "  Instalar MongoDB automaticamente? [S/n]: " INSTALL_MONGO
INSTALL_MONGO=${INSTALL_MONGO:-S}

echo ""
echo -e "${CYAN}─── Firewall ────────────────────────────────────────────────${NC}"
echo ""
read -p "  Configurar firewall (ufw) automaticamente? [S/n]: " SETUP_UFW
SETUP_UFW=${SETUP_UFW:-S}

echo ""
echo -e "${YELLOW}  Iniciando instalação...${NC}"
echo ""

# ─── Atualizar sistema ───────────────────────────────────────────────────────
echo -e "${CYAN}[1/7] Atualizando sistema...${NC}"
apt-get update -qq
apt-get install -y -qq curl wget gnupg2 ca-certificates lsb-release ufw

# ─── Instalar Node.js 18 (compatível com GenieACS) ──────────────────────────
echo -e "${CYAN}[2/7] Instalando Node.js 18...${NC}"
if ! node --version 2>/dev/null | grep -q "v18\|v20\|v22"; then
  curl -fsSL https://deb.nodesource.com/setup_18.x | bash - > /dev/null 2>&1
  apt-get install -y -qq nodejs
fi
echo -e "  ${GREEN}✓ Node.js $(node --version) instalado${NC}"

# ─── Instalar MongoDB ────────────────────────────────────────────────────────
if [[ "$INSTALL_MONGO" =~ ^[Ss]$ ]] || [ "$INSTALL_MONGO" = "" ]; then
  echo -e "${CYAN}[3/7] Instalando MongoDB...${NC}"
  if ! command -v mongod &>/dev/null; then
    # Detectar versão do Debian/Ubuntu
    OS_CODENAME=$(lsb_release -cs 2>/dev/null || echo "jammy")
    
    # Tentar MongoDB 6 primeiro
    curl -fsSL https://www.mongodb.org/static/pgp/server-6.0.asc | \
      gpg --dearmor -o /usr/share/keyrings/mongodb-server-6.0.gpg 2>/dev/null || true
    
    echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-6.0.gpg ] \
https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" \
      > /etc/apt/sources.list.d/mongodb-org-6.0.list
    
    apt-get update -qq
    apt-get install -y -qq mongodb-org 2>/dev/null || apt-get install -y -qq mongodb 2>/dev/null || {
      echo -e "  ${YELLOW}⚠ MongoDB do repositório oficial falhou, tentando versão do sistema...${NC}"
      apt-get install -y -qq mongodb
    }
    
    systemctl enable mongod 2>/dev/null || systemctl enable mongodb 2>/dev/null || true
    systemctl start mongod 2>/dev/null || systemctl start mongodb 2>/dev/null || true
    sleep 3
  fi
  echo -e "  ${GREEN}✓ MongoDB instalado e rodando${NC}"
else
  echo -e "${CYAN}[3/7] Pulando instalação do MongoDB (já instalado)...${NC}"
fi

# ─── Instalar GenieACS ───────────────────────────────────────────────────────
echo -e "${CYAN}[4/7] Instalando GenieACS...${NC}"
npm install -g genieacs --quiet 2>/dev/null || npm install -g genieacs

# Criar usuário e diretórios
if ! id -u genieacs &>/dev/null; then
  useradd --system --no-create-home --shell /bin/false genieacs
fi

mkdir -p /opt/genieacs/config /opt/genieacs/logs
chown -R genieacs:genieacs /opt/genieacs

echo -e "  ${GREEN}✓ GenieACS instalado: $(genieacs-cwmp --version 2>/dev/null || echo 'OK')${NC}"

# ─── Gerar configuração ──────────────────────────────────────────────────────
echo -e "${CYAN}[5/7] Gerando configuração...${NC}"

JWT_SECRET=$(openssl rand -base64 48)

cat > /opt/genieacs/config/genieacs.env << EOF
GENIEACS_CWMP_ACCESS_LOG_FILE=/opt/genieacs/logs/cwmp-access.log
GENIEACS_NBI_ACCESS_LOG_FILE=/opt/genieacs/logs/nbi-access.log
GENIEACS_FS_ACCESS_LOG_FILE=/opt/genieacs/logs/fs-access.log
GENIEACS_UI_ACCESS_LOG_FILE=/opt/genieacs/logs/ui-access.log
GENIEACS_DEBUG_FILE=/opt/genieacs/logs/debug.yaml
GENIEACS_EXT_DIR=/opt/genieacs/config/ext
GENIEACS_CWMP_PORT=7547
GENIEACS_NBI_PORT=7557
GENIEACS_FS_PORT=7567
GENIEACS_UI_PORT=${GENIE_UI_PORT}
GENIEACS_UI_JWT_SECRET=${JWT_SECRET}
GENIEACS_MONGODB_CONNECTION_URL=mongodb://127.0.0.1/genieacs
EOF

chown genieacs:genieacs /opt/genieacs/config/genieacs.env
chmod 600 /opt/genieacs/config/genieacs.env

mkdir -p /opt/genieacs/config/ext
chown -R genieacs:genieacs /opt/genieacs/config/ext

echo -e "  ${GREEN}✓ Configuração gerada (UI na porta ${GENIE_UI_PORT})${NC}"

# ─── Criar serviços systemd ──────────────────────────────────────────────────
echo -e "${CYAN}[6/7] Criando serviços systemd...${NC}"

GENIE_BIN_PATH=$(which genieacs-cwmp | xargs dirname)

for SERVICE in cwmp nbi fs ui; do
  cat > /etc/systemd/system/genieacs-${SERVICE}.service << EOF
[Unit]
Description=GenieACS ${SERVICE^^}
After=network.target mongod.service mongodb.service
Wants=network.target

[Service]
Type=simple
User=genieacs
EnvironmentFile=/opt/genieacs/config/genieacs.env
ExecStart=${GENIE_BIN_PATH}/genieacs-${SERVICE}
Restart=on-failure
RestartSec=10
KillMode=mixed
TimeoutStopSec=15

[Install]
WantedBy=multi-user.target
EOF
done

systemctl daemon-reload
systemctl enable genieacs-cwmp genieacs-nbi genieacs-fs genieacs-ui
systemctl start genieacs-cwmp genieacs-nbi genieacs-fs genieacs-ui
sleep 3

echo -e "  ${GREEN}✓ Serviços criados e iniciados${NC}"

# ─── Configurar firewall ─────────────────────────────────────────────────────
if [[ "$SETUP_UFW" =~ ^[Ss]$ ]] || [ "$SETUP_UFW" = "" ]; then
  echo -e "${CYAN}[7/7] Configurando firewall...${NC}"
  
  ufw allow 22/tcp > /dev/null 2>&1    # SSH
  ufw allow ${GENIE_UI_PORT}/tcp > /dev/null 2>&1  # GenieACS UI
  ufw allow 7547/tcp > /dev/null 2>&1  # CWMP (CPEs)
  ufw allow 7557/tcp > /dev/null 2>&1  # NBI (API)
  ufw allow 7567/tcp > /dev/null 2>&1  # FS (firmwares)
  
  # Habilitar ufw se não estiver ativo
  if ! ufw status | grep -q "Status: active"; then
    ufw --force enable > /dev/null 2>&1
  else
    ufw reload > /dev/null 2>&1
  fi
  
  echo -e "  ${GREEN}✓ Portas liberadas: ${GENIE_UI_PORT} (UI), 7547 (CWMP), 7557 (NBI), 7567 (FS)${NC}"
else
  echo -e "${CYAN}[7/7] Pulando configuração do firewall...${NC}"
fi

# ─── Criar usuário admin no GenieACS ────────────────────────────────────────
sleep 2
echo -e "${CYAN}[+] Criando usuário admin...${NC}"

# Hash MD5 da senha para o GenieACS
PASS_HASH=$(echo -n "$GENIE_ADMIN_PASS" | md5sum | cut -d' ' -f1)

# Tentar criar via MongoDB
mongo genieacs --eval "
  db.users.updateOne(
    {username: '${GENIE_ADMIN_USER}'},
    {\$set: {username: '${GENIE_ADMIN_USER}', password: '${PASS_HASH}', roles: {admin: true}}},
    {upsert: true}
  );
" 2>/dev/null || \
mongosh genieacs --eval "
  db.users.updateOne(
    {username: '${GENIE_ADMIN_USER}'},
    {\$set: {username: '${GENIE_ADMIN_USER}', password: '${PASS_HASH}', roles: {admin: true}}},
    {upsert: true}
  );
" 2>/dev/null || \
echo -e "  ${YELLOW}⚠ Usuário será criado no primeiro acesso via wizard${NC}"

# ─── Verificar status final ──────────────────────────────────────────────────
echo ""
echo -e "${GREEN}${BOLD}═══════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}${BOLD}  GenieACS instalado com sucesso!${NC}"
echo -e "${GREEN}${BOLD}═══════════════════════════════════════════════════════════${NC}"
echo ""

SERVER_IP=$(hostname -I | awk '{print $1}')

echo -e "  ${BOLD}Acesso à interface web:${NC}"
echo -e "  → ${CYAN}http://${SERVER_IP}:${GENIE_UI_PORT}${NC}"
echo -e "  → Usuário: ${BOLD}${GENIE_ADMIN_USER}${NC}"
echo -e "  → Senha:   ${BOLD}${GENIE_ADMIN_PASS}${NC}"
echo ""
echo -e "  ${BOLD}Configuração dos CPEs (roteadores/ONTs):${NC}"
echo -e "  → URL ACS: ${CYAN}http://${SERVER_IP}:7547${NC}"
echo -e "  → Usuário/Senha: (em branco)"
echo ""
echo -e "  ${BOLD}Integração com SGP/FiberDoc:${NC}"
echo -e "  → URL NBI: ${CYAN}http://${SERVER_IP}:7557${NC}"
echo -e "  → Usuário/Senha: (em branco)"
echo ""
echo -e "  ${BOLD}Status dos serviços:${NC}"
for SERVICE in cwmp nbi fs ui; do
  STATUS=$(systemctl is-active genieacs-${SERVICE} 2>/dev/null)
  if [ "$STATUS" = "active" ]; then
    echo -e "  • genieacs-${SERVICE}: ${GREEN}✓ rodando${NC}"
  else
    echo -e "  • genieacs-${SERVICE}: ${RED}✗ parado${NC}"
  fi
done

echo ""
echo -e "  ${YELLOW}Nota: Na primeira vez que acessar a UI, clique em${NC}"
echo -e "  ${YELLOW}'ABRACADABRA!' no wizard de inicialização.${NC}"
echo ""
