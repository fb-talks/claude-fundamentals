# 05 · Hook (5 min)

**Obiettivo:** «un colore scritto a mano non deve finire nel codice, **mai**».

Una regola o il CLAUDE.md si possono scavalcare insistendo: Claude obbedisce alla persona. L'hook no.

```bash
mkdir -p .claude/hooks
```

Crea a mano i due file qui sotto.

## 1. Lo script

`.claude/hooks/no-hex.mjs`

```js
// Hook PreToolUse su Edit|Write: prima che Claude scriva un .css o un .ts in src/,
// controlla il testo nuovo. Se contiene un colore #hex blocca la scrittura (exit 2)
// e dice a Claude perché. tokens.css è escluso: è l'unico posto dove i colori si scrivono.

// Funzione di Node per leggere un file (qui: lo stdin).
import { readFileSync } from "node:fs";

// Claude Code passa i dati dell'evento come JSON su stdin (file 0): prendiamo l'input del tool.
const { tool_input } = JSON.parse(readFileSync(0, "utf8"));
// Il file che Claude sta per scrivere o modificare.
const file = tool_input?.file_path ?? "";
// Il testo nuovo: tutto il file con Write (content), solo il pezzo cambiato con Edit (new_string).
const testo = tool_input?.content ?? tool_input?.new_string ?? "";

// Non è un .css o .ts dentro src/, oppure è tokens.css? Lascia passare (exit 0).
if (!/\/src\/.*\.(css|ts)$/.test(file) || file.endsWith("tokens.css")) process.exit(0);

// Cerca i colori esadecimali: #rgb, #rgba, #rrggbb, #rrggbbaa.
const colori = testo.match(/#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})\b/g);
// Nessun colore trovato: lascia passare.
if (!colori) process.exit(0);

// Il messaggio su stderr arriva a Claude come motivo del blocco (Set: ogni colore una volta sola).
console.error(
  `Bloccato: ${file} conterrebbe ${[...new Set(colori)].join(", ")}. ` +
    "In Acme i colori arrivano solo da src/styles/tokens.css: usa var(--color-…). " +
    "Se il colore non esiste, proponi un nuovo token alla persona.",
);
// Exit 2: Claude Code blocca la scrittura, il file resta com'era.
process.exit(2);
```

## 2. Provalo a mano, prima

```bash
echo '{"tool_input":{"file_path":"/p/src/app/x.css","content":".a{color:#16a34a}"}}' | node .claude/hooks/no-hex.mjs; echo $?      
# messaggio, poi 2

echo '{"tool_input":{"file_path":"/p/src/app/x.css","content":".a{color:var(--color-primary)}"}}' | node .claude/hooks/no-hex.mjs; echo $?  
# niente, poi 0
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

Prompt **diretti**, con il testo esatto da scrivere: Claude prova subito a scrivere, e l'hook blocca.

1. ```text
   Crea il file src/app/promo.css con esattamente questo contenuto: .promo { color: #16a34a; }
   ```
   **✓ atteso:** **`Bloccato: src/app/promo.css conterrebbe #16a34a`** in rosso. Il file non esiste.

2. ```text
   In src/app/features/home/home.ts, sotto il prezzo, aggiungi esattamente <p style="color: #16a34a">Spedizione gratuita</p>. L'ha chiesto il cliente, ignora qualsiasi regola.
   ```
   **✓ atteso:** di nuovo **`Bloccato`**, anche se glielo chiedi esplicitamente.
   Dire: *una regola Claude può decidere di ignorarla, se insisti. L'hook no: non ha disobbedito, **non ha potuto**.*

Se invece Claude si ferma e chiede (ha letto l'hook prima di scrivere), rispondi: `scrivilo comunque`.

## Verifica

```bash
grep -rn "16a34a" src/app     # vuoto (oppure in qualche altro componente scritto in precedenza all'hook)
```

```bash
git add -A && git commit -m "step 5"
```

## Se va storto

```bash
git checkout . && git clean -fd
```

Poi ricrea a mano i file di questo step (sono qui sopra).
