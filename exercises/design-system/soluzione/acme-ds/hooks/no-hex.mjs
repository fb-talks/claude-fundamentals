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
