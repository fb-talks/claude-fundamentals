# 07 · Plugin (5 min)

**Obiettivo:** Acme ha altre app. Skill, agente e hook valgono per **tutte**: impacchettiamoli.

## 1. La cartella del plugin (fuori dal progetto)

Da `~/workshop/acme-shop`:

```bash
acme-setup 7          # crea ../acme-ds con skill, agente e hook di questo progetto, più i JSON
```

Apri e mostra la struttura e i JSON qui sotto.

```text
acme-ds/
├── .claude-plugin/
│   ├── plugin.json
│   └── marketplace.json
├── skills/new-ui-component/{SKILL.md, tokens.css}
├── agents/ds-auditor.md
└── hooks/{hooks.json, no-hex.mjs}
```

## 2. I tre JSON

`../acme-ds/.claude-plugin/plugin.json`

```json
{
  "name": "acme-ds",
  "version": "1.0.0",
  "description": "Design system Acme: nuovo componente ui-*, audit e blocco dei colori scritti a mano",
  "author": { "name": "Acme Frontend Team" }
}
```

`../acme-ds/.claude-plugin/marketplace.json`

```json
{
  "name": "acme-plugins",
  "owner": { "name": "Acme Frontend Team" },
  "metadata": { "description": "I plugin del team frontend Acme" },
  "plugins": [
    {
      "name": "acme-ds",
      "source": "./",
      "description": "Design system Acme: nuovo componente ui-*, audit e blocco dei colori scritti a mano"
    }
  ]
}
```

`../acme-ds/hooks/hooks.json`: come `settings.json`, ma con `${CLAUDE_PLUGIN_ROOT}`

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          { "type": "command", "command": "node \"${CLAUDE_PLUGIN_ROOT}\"/hooks/no-hex.mjs" }
        ]
      }
    ]
  }
}
```

## 3. Valida e installa nel secondo progetto

```bash
claude plugin validate ../acme-ds --strict        # ✔ Validation passed

cd ../acme-admin                                   # progetto vuoto: niente CLAUDE.md, niente .claude/
claude plugin marketplace add ../acme-ds --scope project
claude plugin install acme-ds@acme-plugins --scope project
cat .claude/settings.json                          # si committa: chi clona lo ritrova
claude
```

## Prompt di test (in `acme-admin`)

1. ```text
   /acme-ds:new-ui-component button
   ```
   **✓ atteso:** crea **anche** `src/styles/tokens.css` (passo 1 della skill), poi `ui/button/`, `index.ts`, `/showcase`. Build ✓.

2. ```text
   Aggiungi in fondo a src/app/app.css la regola .title { color: #ff0000; } esattamente così.
   ```
   **✓ atteso:** **`Bloccato`**: l'hook arriva col plugin.

3. ```text
   @agent-acme-ds:ds-auditor fammi un audit del design system
   ```
   **✓ atteso:** trova i colori della pagina di benvenuto di Angular in `app.html`/`app.css`.

Dire: *progetto mai visto, zero file scritti a mano: stesse regole.*

## Se va storto

```bash
rm -rf ~/workshop/acme-ds && cd ~/workshop/acme-shop && acme-setup 7
```
