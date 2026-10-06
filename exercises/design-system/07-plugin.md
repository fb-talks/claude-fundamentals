# 07 · Plugin (5 min)

**Obiettivo:** Acme ha altre app. Skill, agente e hook valgono per **tutte**: impacchettiamoli.

## 1. La cartella del plugin (fuori dal progetto)

Da `~/workshop/acme-shop`: si **copiano** skill, agente e hook già scritti, i JSON si scrivono a mano.

```bash
mkdir -p ../acme-ds/.claude-plugin ../acme-ds/skills ../acme-ds/agents ../acme-ds/hooks
cp -r .claude/skills/new-ui-component ../acme-ds/skills/
cp .claude/agents/ds-auditor.md ../acme-ds/agents/
cp .claude/hooks/no-hex.mjs ../acme-ds/hooks/
```

Dopo i `cp` mancano ancora i tre JSON (✎), da creare a mano al passo 2:

```text
acme-ds/
├── .claude-plugin/
│   ├── plugin.json         ✎
│   └── marketplace.json    ✎
├── skills/new-ui-component/SKILL.md
├── agents/ds-auditor.md
└── hooks/
    ├── hooks.json          ✎
    └── no-hex.mjs
```

## 2. I tre JSON, a mano

Crea i tre file qui sotto. **Senza questi il plugin non si installa** (`Marketplace file not found`).

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
ls ../acme-ds/.claude-plugin ../acme-ds/hooks   # plugin.json marketplace.json · hooks.json no-hex.mjs
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
   **✓ atteso:** `ui/button/`, `index.ts`, `/uikit`. Build ✓.
   Il selettore **non** è `fb-button`: la regola è rimasta in `acme-shop`.

2. ```text
   Aggiungi in fondo a src/app/app.css la regola .title { color: #ff0000; } esattamente così.
   ```
   **✓ atteso:** **`Bloccato`**: l'hook arriva col plugin.

3. ```text
   @acme-ds:ds-auditor fammi un audit del design system
   ```
   **✓ atteso:** segnala il `button` appena creato: selettore non `fb-`, niente JSDoc. La regola è rimasta in `acme-shop`, l'agente invece è arrivato col plugin.

Dire: *progetto mai visto, zero file scritti a mano: stesse regole.*

## Se va storto

```bash
rm -rf ~/workshop/acme-ds && cd ~/workshop/acme-shop
```

Poi rifai i passi 1 e 2.
