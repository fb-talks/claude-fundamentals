# Esercizio finale: il design system Acme

L'azienda Acme ha un design system: componenti `ui-*`, token CSS, una vetrina.
Lo insegniamo a Claude un pezzo alla volta, poi lo portiamo in un secondo progetto con un plugin.

## Scaletta (30 min)

| Min | File | Cosa si vede |
|---|---|---|
| 0–5 | [01-claude-md](01-claude-md.md) | componenti e vetrina nascono dove deciso, senza dirlo nel prompt |
| 5–9 | [02-rules](02-rules.md) | una regola con `paths:` allinea i CSS agli stati del design team |
| 9–15 | [03-skill](03-skill.md) | `/new-ui-component badge` → 3 file + export + vetrina + build |
| 15–20 | [04-agent](04-agent.md) | l'auditor legge tutto e riporta solo le violazioni |
| 20–25 | [05-hook](05-hook.md) | il colore a mano viene **bloccato**, anche se lo chiedi |
| 25–30 | [06-plugin](06-plugin.md) | in un progetto nuovo, stesse regole con un'installazione |
| — | [07-chiusura](07-chiusura.md) | tabella finale |

## Prima dell'aula (10 min, a casa)

```bash
mkdir ~/workshop && cd ~/workshop
npx @angular/cli@22 new acme-shop  --style=css --ssr=false --defaults
npx @angular/cli@22 new acme-admin --style=css --ssr=false --defaults
```

- `cd acme-shop && npm start` in un secondo terminale → browser su `http://localhost:4200`
- in aula: `cd ~/workshop/acme-shop && claude`
- variabile per il piano B (tienila nel terminale):

```bash
SOL=<path-del-repo-slides>/exercises/design-system/soluzione
```

## Abitudini, a ogni step

```bash
git status --short -u            # cosa ha toccato
git add -A && git commit -m "step N"
```

## Se va storto

```bash
git checkout . && git clean -fd  # torna all'ultimo commit
```

Ogni file ha in fondo il `cp` dalla `soluzione/` per saltare lo step.
Dopo ogni modifica a `.claude/` → `/exit` e `claude` (o `/reload-skills`, `/reload-plugins`).
