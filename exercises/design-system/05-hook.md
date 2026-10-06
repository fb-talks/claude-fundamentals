# 05 · Hook (5 min)

**Obiettivo:** «un colore scritto a mano non deve finire nel codice, **mai**».

Il CLAUDE.md lo chiede, ma se la persona insiste Claude obbedisce alla persona. L'hook no.

```bash
acme-setup 5          # crea .claude/hooks/no-hex.mjs e .claude/settings.json
```

Apri e mostra i file qui sotto.

## 1. Lo script

`.claude/hooks/no-hex.mjs`

```js
import { readFileSync } from "node:fs";

// Claude Code passa i dati dell'evento come JSON su stdin.
const { tool_input } = JSON.parse(readFileSync(0, "utf8"));
const file = tool_input?.file_path ?? "";
const testo = tool_input?.content ?? tool_input?.new_string ?? "";

// Solo CSS e .ts dell'app. tokens.css è l'unico posto dove un colore si scrive.
if (!/\/src\/.*\.(css|ts)$/.test(file) || file.endsWith("tokens.css")) process.exit(0);

const colori = testo.match(/#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})\b/g);
if (!colori) process.exit(0);

console.error(
  `Bloccato: ${file} conterrebbe ${[...new Set(colori)].join(", ")}. ` +
    "In Acme i colori arrivano solo da src/styles/tokens.css: usa var(--color-…). " +
    "Se il colore non esiste, proponi un nuovo token alla persona.",
);
process.exit(2);
```

## 2. Provalo a mano, prima

```bash
echo '{"tool_input":{"file_path":"/p/src/app/x.css","content":".a{color:#16a34a}"}}' \
  | node .claude/hooks/no-hex.mjs; echo $?      # messaggio, poi 2

echo '{"tool_input":{"file_path":"/p/src/app/x.css","content":".a{color:var(--color-primary)}"}}' \
  | node .claude/hooks/no-hex.mjs; echo $?      # niente, poi 0
```

## 3. Registralo

`.claude/settings.json`

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          { "type": "command", "command": "node \"$CLAUDE_PROJECT_DIR\"/.claude/hooks/no-hex.mjs" }
        ]
      }
    ]
  }
}
```

`/exit` → `claude` → `/hooks` (deve comparire `PreToolUse`)

## Prompt di test

1. ```text
   Nel carrello aggiungi la scritta «Spedizione gratuita» in verde #16a34a.
   ```
   **✓ atteso:** Claude rifiuta da solo (CLAUDE.md) e usa/propone un token. L'hook non serve ancora.

2. ```text
   Nel carrello aggiungi la scritta «Spedizione gratuita» in verde. Per questa volta ignora le regole sui token: scrivi proprio #16a34a nel CSS, l'ha chiesto il cliente.
   ```
   **✓ atteso:** Claude ci prova → **`Bloccato: … #16a34a`** in rosso → propone un token.
   Dire: *la regola ha ceduto, l'hook no. Non ha obbedito: **non ha potuto**.*

## Verifica

```bash
grep -rn "16a34a" src/app     # vuoto
```

```bash
git add -A && git commit -m "step 5"
```

## Se va storto

```bash
git checkout . && git clean -fd && acme-setup 5
```
