#!/bin/bash
# =============================================================================
# FiberDoc — Script de Atualização
# Uso: sudo bash update.sh
# =============================================================================
set -e

FIBERDOC_DIR="/opt/fiberdoc"
SERVICE_NAME="fiberdoc"
BACKUP_DIR="$FIBERDOC_DIR/backups/update-$(date +%Y%m%d-%H%M%S)"

RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; BLUE='\033[0;34m'; NC='\033[0m'
info()    { echo -e "${BLUE}[INFO]${NC} $1"; }
success() { echo -e "${GREEN}[OK]${NC} $1"; }
warn()    { echo -e "${YELLOW}[AVISO]${NC} $1"; }
error()   { echo -e "${RED}[ERRO]${NC} $1"; exit 1; }

[[ $EUID -ne 0 ]] && error "Execute como root: sudo bash update.sh"

echo ""
echo "╔══════════════════════════════════════════════════════════╗"
echo "║              FiberDoc — Atualização de Versão            ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# Backup dos arquivos atuais
info "Criando backup em $BACKUP_DIR ..."
mkdir -p "$BACKUP_DIR/assets"
cp "$FIBERDOC_DIR/dist/index.js" "$BACKUP_DIR/" 2>/dev/null || true
cp "$FIBERDOC_DIR/dist/public/assets/"*.js "$BACKUP_DIR/assets/" 2>/dev/null || true
cp "$FIBERDOC_DIR/dist/public/assets/"*.css "$BACKUP_DIR/assets/" 2>/dev/null || true
cp "$FIBERDOC_DIR/dist/public/index.html" "$BACKUP_DIR/" 2>/dev/null || true
success "Backup salvo."

# Copiar novos arquivos
info "Atualizando arquivos da aplicação..."
cp -r "$SCRIPT_DIR/dist/"* "$FIBERDOC_DIR/dist/"
chown -R fiberdoc:fiberdoc "$FIBERDOC_DIR/dist/" 2>/dev/null || true
success "Arquivos atualizados."

# Aplicar migrações SQL se existirem
if [ -f "$SCRIPT_DIR/schema-full.sql" ]; then
  info "Verificando migrações do banco de dados..."
  # Carregar variáveis de ambiente
  if [ -f "$FIBERDOC_DIR/.env" ]; then
    export $(grep -v '^#' "$FIBERDOC_DIR/.env" | xargs) 2>/dev/null || true
  fi
  warn "Para aplicar migrações manualmente: mysql -u fiberdoc -p fiberdoc < $SCRIPT_DIR/schema-full.sql"
fi

# Reiniciar serviço
info "Reiniciando serviço..."
systemctl restart "$SERVICE_NAME"
sleep 3

if systemctl is-active --quiet "$SERVICE_NAME"; then
  success "Serviço reiniciado com sucesso."
else
  warn "Verifique o serviço: journalctl -u $SERVICE_NAME -n 20"
fi

echo ""
success "Atualização concluída!"
echo ""
