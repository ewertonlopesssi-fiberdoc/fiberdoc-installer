#!/bin/bash
# ============================================================
# FiberDoc — Script de Atualização Automática
# URL permanente (sempre atualiza para a versão mais recente):
#
#   curl -fsSL https://raw.githubusercontent.com/ewertonlopesssi-fiberdoc/fiberdoc-installer/main/update.sh | bash
#
# ============================================================
set -e

REPO="ewertonlopesssi-fiberdoc/fiberdoc-source"
APP_DIR="/opt/fiberdoc"
TMP_DIR="/tmp/fiberdoc-update-$$"

# ── Cores ────────────────────────────────────────────────────
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'
CYAN='\033[0;36m'; BOLD='\033[1m'; NC='\033[0m'

log()  { echo -e "${GREEN}[✓]${NC} $1"; }
info() { echo -e "${CYAN}[i]${NC} $1"; }
warn() { echo -e "${YELLOW}[!]${NC} $1"; }
err()  { echo -e "${RED}[✗]${NC} $1"; exit 1; }

echo ""
echo -e "${BOLD}╔══════════════════════════════════════════╗${NC}"
echo -e "${BOLD}║      FiberDoc — Atualização Automática   ║${NC}"
echo -e "${BOLD}╚══════════════════════════════════════════╝${NC}"
echo ""

# ── 1. Verificar dependências ────────────────────────────────
command -v curl  >/dev/null 2>&1 || err "curl não encontrado. Instale com: apt install curl"
command -v unzip >/dev/null 2>&1 || { warn "unzip não encontrado. Instalando..."; apt-get install -y unzip -qq; }

# ── 2. Detectar versão instalada ─────────────────────────────
INSTALLED_VERSION="desconhecida"
if [ -f "$APP_DIR/package.json" ]; then
  INSTALLED_VERSION=$(grep '"version"' "$APP_DIR/package.json" 2>/dev/null \
    | head -1 | sed 's/.*"version": *"\([^"]*\)".*/\1/' || echo "desconhecida")
fi
info "Versão instalada: ${BOLD}$INSTALLED_VERSION${NC}"

# # ── 3. Buscar versão mais recente no GitHub ──────────────
info "Verificando versão mais recente no GitHub..."
# Buscar versão via package.json do branch main
LATEST_VERSION=$(curl -fsSL "https://raw.githubusercontent.com/$REPO/main/package.json" 2>/dev/null \
  | grep '"version"' | head -1 | sed 's/.*"version": *"\([^"]*\)".*/\1/')

if [ -z "$LATEST_VERSION" ]; then
  err "Não foi possível obter a versão mais recente. Verifique a conexão com a internet."
fi

LATEST="v$LATEST_VERSION"
info "Versão mais recente: ${BOLD}$LATEST${NC}"

# ── 4. Verificar se já está atualizado ──────────────────────
if [ "$INSTALLED_VERSION" = "$LATEST_VERSION" ]; then
  echo ""
  log "O sistema já está na versão mais recente (${BOLD}$INSTALLED_VERSION${NC})."
  echo ""
  exit 0
fi

echo ""
warn "Nova versão disponível: ${BOLD}$INSTALLED_VERSION${NC} → ${BOLD}$LATEST_VERSION${NC}"
echo ""

# ── 5. Confirmar atualização ─────────────────────────────────
# Se executado via pipe (curl | bash), pular confirmação interativa
if [ -t 0 ]; then
  read -p "Deseja atualizar agora? [S/n] " CONFIRM
  CONFIRM="${CONFIRM:-S}"
  if [[ ! "$CONFIRM" =~ ^[Ss]$ ]]; then
    echo "Atualização cancelada."
    exit 0
  fi
fi

# ── 6. Criar backup ──────────────────────────────────────────
BACKUP_DIR="$APP_DIR/backup-$(date +%Y%m%d-%H%M%S)"
info "Criando backup em $BACKUP_DIR ..."
mkdir -p "$BACKUP_DIR"
cp "$APP_DIR/dist/index.js" "$BACKUP_DIR/" 2>/dev/null || true
cp -r "$APP_DIR/dist/public" "$BACKUP_DIR/" 2>/dev/null || true
log "Backup criado"# ── 7. Baixar pacote de atualização ─────────────────────────────
# Tentar obter a data do release para montar o nome do arquivo
# Formato: fiberdoc-vX.Y.Z-YYYYMMDD.zip
mkdir -p "$TMP_DIR"

# Buscar lista de releases para encontrar o ZIP correto
info "Buscando pacote de atualização..."
RELEASE_FILES=$(curl -fsSL "https://api.github.com/repos/$REPO/contents/releases" 2>/dev/null \
  | grep '"name"' | grep -o 'fiberdoc-v[0-9.]*-[0-9]*.zip' | sort -V | tail -1)

if [ -z "$RELEASE_FILES" ]; then
  # Fallback: tentar URL direta com data de hoje
  TODAY=$(date +%Y%m%d)
  RELEASE_FILES="fiberdoc-v${LATEST_VERSION}-${TODAY}.zip"
fi

ZIP_URL="https://raw.githubusercontent.com/$REPO/main/releases/$RELEASE_FILES"
info "Baixando $RELEASE_FILES ..."
curl -fsSL "$ZIP_URL" -o "$TMP_DIR/update.zip" \
  || err "Falha ao baixar o pacote. Verifique: $ZIP_URL"
log "Pacote baixado"# ── 8. Extrair e aplicar ─────────────────────────────────────
info "Extraindo pacote..."
unzip -q "$TMP_DIR/update.zip" -d "$TMP_DIR/extracted"

# Detectar subdiretório raiz no ZIP
EXTRACT_DIR="$TMP_DIR/extracted"
ENTRIES=$(ls "$EXTRACT_DIR" | wc -l)
if [ "$ENTRIES" -eq 1 ]; then
  SUBDIR=$(ls "$EXTRACT_DIR")
  if [ -d "$EXTRACT_DIR/$SUBDIR" ]; then
    EXTRACT_DIR="$EXTRACT_DIR/$SUBDIR"
  fi
fi

info "Aplicando arquivos atualizados..."
for item in "$EXTRACT_DIR"/*; do
  name=$(basename "$item")
  case "$name" in
    .env|fiberdoc.env|node_modules|storage|backups) continue ;;
  esac
  cp -r "$item" "$APP_DIR/$name"
done
log "Arquivos aplicados"

# ── 9. Atualizar versão no package.json ─────────────────────
if [ -f "$EXTRACT_DIR/package.json" ]; then
  cp "$EXTRACT_DIR/package.json" "$APP_DIR/package.json"
fi

# ── 10. Reiniciar serviço ────────────────────────────────────
info "Reiniciando serviço FiberDoc..."
if systemctl is-active --quiet fiberdoc 2>/dev/null; then
  systemctl restart fiberdoc
  log "Serviço reiniciado via systemctl"
elif command -v pm2 &>/dev/null && pm2 list 2>/dev/null | grep -q fiberdoc; then
  pm2 restart fiberdoc
  log "Serviço reiniciado via pm2"
else
  warn "Reinicie o serviço manualmente: systemctl restart fiberdoc"
fi

# ── 11. Limpar temporários ───────────────────────────────────
rm -rf "$TMP_DIR"

echo ""
echo -e "${GREEN}${BOLD}╔══════════════════════════════════════════╗${NC}"
echo -e "${GREEN}${BOLD}║   Atualização concluída com sucesso!     ║${NC}"
echo -e "${GREEN}${BOLD}║   FiberDoc $LATEST_VERSION instalado              ║${NC}"
echo -e "${GREEN}${BOLD}╚══════════════════════════════════════════╝${NC}"
echo ""
echo -e "  Backup salvo em: ${CYAN}$BACKUP_DIR${NC}"
echo -e "  Faça um ${BOLD}hard refresh${NC} (Ctrl+Shift+R) no navegador."
echo ""
