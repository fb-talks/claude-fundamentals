#!/usr/bin/env bash
# Prepara lo step N dell'esercizio nel progetto corrente.
# Uso, dalla radice di acme-shop:  acme-setup <1-7>   (alias definito in 00-prima-dell-aula.md)
set -euo pipefail

SOL="$(cd "$(dirname "$0")" && pwd)/soluzione"
S="$SOL/acme-shop"

case "${1:-}" in
  1) # token base (senza gli stati), import, CLAUDE.md
    mkdir -p src/styles
    perl -0pe 's/\n\n  \/\* Stati.*?(\n\})/$1/s' "$S/src/styles/tokens.css" > src/styles/tokens.css
    echo "@import './styles/tokens.css';" > src/styles.css
    cp "$S/CLAUDE.md" .
    ;;
  2) # token degli stati in coda a tokens.css, regola css
    if ! grep -q -- '--focus-ring' src/styles/tokens.css; then
      STATI="$(perl -0ne 'print $1 if /\n(  \/\* Stati.*?)\n\}/s' "$S/src/styles/tokens.css")" \
        perl -0pi -e 's/\n\}\s*$/\n\n$ENV{STATI}\n}\n/s' src/styles/tokens.css
    fi
    mkdir -p .claude/rules && cp "$S/.claude/rules/css.md" .claude/rules/
    ;;
  3) # skill
    mkdir -p .claude/skills && cp -r "$S/.claude/skills/new-ui-component" .claude/skills/
    ;;
  4) # agente + componente "sporco"
    mkdir -p .claude/agents src/app/features/cart
    cp "$S/.claude/agents/ds-auditor.md" .claude/agents/
    cp "$S/src/app/features/cart/cart.ts" src/app/features/cart/
    ;;
  5) # hook + registrazione
    mkdir -p .claude/hooks
    cp "$S/.claude/hooks/no-hex.mjs" .claude/hooks/
    cp "$S/.claude/settings.json" .claude/
    ;;
  6) # secondo progetto, vuoto, per provare il plugin
    if [ -d ../acme-admin ]; then echo "../acme-admin esiste già" >&2; exit 1; fi
    (cd .. && npx -y @angular/cli@22 new acme-admin --style=css --ssr=false --defaults)
    echo "Secondo progetto pronto in $(cd ../acme-admin && pwd)"
    exit 0
    ;;
  7) # plugin in ../acme-ds, costruito dai file di questo progetto
    P=../acme-ds
    mkdir -p "$P/.claude-plugin" "$P/skills" "$P/agents" "$P/hooks"
    cp -r .claude/skills/new-ui-component "$P/skills/"
    cp .claude/agents/ds-auditor.md "$P/agents/"
    cp .claude/hooks/no-hex.mjs "$P/hooks/"
    cp "$SOL/acme-ds/.claude-plugin/"*.json "$P/.claude-plugin/"
    cp "$SOL/acme-ds/hooks/hooks.json" "$P/hooks/"
    echo "Plugin pronto in $(cd "$P" && pwd)"
    exit 0
    ;;
  *)
    echo "Uso: acme-setup <1-7>, dalla radice di acme-shop" >&2
    exit 1
    ;;
esac

echo "Step $1 pronto:"
git status --short -u
