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
