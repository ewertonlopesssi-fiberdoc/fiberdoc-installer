# FiberDoc v6.2.4 — Pacote de Instalação

Sistema de Documentação de Fibras Ópticas e Equipamentos de Rede.

---

## Requisitos

| Componente | Versão mínima |
|---|---|
| Debian / Ubuntu | 11+ / 20.04+ |
| RAM | 1 GB (recomendado: 2 GB) |
| Disco | 5 GB livres |
| Acesso | root ou sudo |

---

## Instalação em Novo Servidor

```bash
# 1. Extrair o pacote
tar -xzf fiberdoc-v6.2.4-installer.tar.gz
cd fiberdoc-v6.2.4-installer

# 2. Executar o instalador
sudo bash install.sh
```

O script instala automaticamente:
- Node.js 22
- MySQL Server
- Cria banco de dados `fiberdoc`
- Aplica todo o schema SQL
- Cria serviço systemd `fiberdoc`
- Configura Nginx como proxy reverso (opcional)

---

## Credenciais Padrão

Após a instalação, acesse o sistema com:

| Campo | Valor |
|---|---|
| Email | `admin@fiberdoc.local` |
| Senha | `fiberdoc2025` |

> **Importante:** Altere a senha padrão imediatamente após o primeiro login.

---

## Atualização de Versão

Para atualizar um servidor já instalado:

```bash
tar -xzf fiberdoc-v6.2.4-installer.tar.gz
cd fiberdoc-v6.2.4-installer
sudo bash update.sh
```

---

## Comandos Úteis

```bash
# Verificar status do serviço
systemctl status fiberdoc

# Ver logs em tempo real
journalctl -u fiberdoc -f

# Reiniciar o serviço
systemctl restart fiberdoc

# Parar o serviço
systemctl stop fiberdoc

# Editar configurações
nano /opt/fiberdoc/.env
```

---

## Estrutura de Arquivos

```
/opt/fiberdoc/
├── dist/
│   ├── index.js          ← Servidor Node.js (bundle completo)
│   └── public/
│       ├── index.html
│       ├── sw.js
│       └── assets/
│           ├── index-*.js   ← Bundle React
│           └── index-*.css  ← Estilos
├── backups/              ← Backups automáticos do banco
├── logs/
│   ├── fiberdoc.log
│   └── fiberdoc-error.log
└── .env                  ← Configurações (DATABASE_URL, JWT_SECRET, etc.)
```

---

## Configuração Manual do .env

Edite `/opt/fiberdoc/.env` conforme necessário:

```env
NODE_ENV=production
PORT=3000
DATABASE_URL=mysql://fiberdoc:SENHA@localhost:3306/fiberdoc
JWT_SECRET=CHAVE_SECRETA_ALEATORIA
```

Após editar, reinicie o serviço: `systemctl restart fiberdoc`

---

## Suporte

Para dúvidas ou problemas, verifique os logs:
```bash
tail -100 /opt/fiberdoc/logs/fiberdoc-error.log
journalctl -u fiberdoc -n 50
```
