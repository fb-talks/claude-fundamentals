---
marp: true
title: CLAUDE.md
section: CLAUDE.md
---

# CLAUDE.md

Quello che vale per ogni messaggio, senza ripeterlo

---

## Cos'è

Un file Markdown che Claude legge **da solo**, all'inizio di ogni sessione.

Quello che c'è scritto lì vale per **tutti i messaggi**.

```text
hello-workshop/
├── CLAUDE.md          ← nella radice del progetto…
├── .claude/
│   └── CLAUDE.md      ← …oppure qui, accanto a rules, skill e agenti
├── package.json
└── src/
```

Vanno bene tutti e due: scegline uno. `.claude/` tiene pulita la radice e mette tutto quello che riguarda Claude in una cartella sola.

Note: il «non toccare main.tsx» del primo prompt, scritto qui, non va più ripetuto. Attenzione: viene letto all'avvio. Se lo modifichi, riavvia la sessione (/exit, poi claude).

---

## `/init`, e poi **taglia**

`/init` legge il progetto e scrive un `CLAUDE.md`. È un **punto di partenza, non un risultato**: quasi sempre troppo lungo, pieno di descrizione.

| Via | Perché |
|---|---|
| «progetto React con Vite e TypeScript» | lo vede dal `package.json` |
| l'elenco delle cartelle | lo vede da solo |
| «per avviare: `npm run dev`» | è già negli script |
| «scrivi codice pulito», «best practice» | non vuol dire niente, quindi non cambia niente |
| cosa fa React o TypeScript | lo sa meglio di te |

Note: il CLAUDE.md non è la documentazione del progetto. Claude il progetto lo sa leggere: gli bastano i file.

---

## Prima e dopo

<div class="cols">
<div class="col">

**✗ Appena uscito da `/init`**

```markdown
# CLAUDE.md

This file provides guidance to Claude Code
when working with code in this repository.

## Project overview
A React 19 + TypeScript app built with Vite.
Uses ESLint for linting.

## Commands
- `npm run dev` — start the dev server
- `npm run build` — type-check and build
- `npm run lint` — run ESLint
- `npm run preview` — preview the build

## Structure
- `src/main.tsx` — entry point
- `src/App.tsx` — root component
- `src/assets/` — static assets
- `public/` — public files

## Guidelines
- Write clean, readable code
- Follow React best practices
- Use TypeScript types properly
```

</div>
<div class="col">

**✓ Dopo il taglio**

```markdown
# hello-workshop

## Regole

- I componenti stanno in `src/components/`,
  uno per file, con lo stesso nome del file.
- Ogni componente esporta anche
  il tipo delle sue props.
- Niente `any`: se un tipo non torna,
  sistemalo, non zittirlo.

## Non fare mai

- Non modificare `src/main.tsx`.
- Non aggiungere dipendenze senza chiedere.
- Non installare librerie di componenti:
  la UI si scrive a mano.
```

Tutto quello a sinistra **è già nei file**, oppure **non vuol dire niente**. A destra c'è quello che Claude **sbaglierebbe** se non glielo dici.

</div>
</div>

Note: scorrete la colonna sinistra sezione per sezione. Overview: package.json. Commands: gli script. Structure: l'albero delle cartelle. Guidelines: non verificabili. Non sopravvive niente, ed è il punto: quello che resta a destra si scrive da zero.

---

## La domanda per ogni riga

<div class="box">

**Se la cancello, Claude sbaglia qualcosa?**

Se la risposta è no, cancellala.

</div>

Nel `CLAUDE.md` ci va solo quello che Claude **non può dedurre guardando il codice**, e che se non gli dici sbaglia.

Il rumore costa: più il file è lungo, **meno peso ha ogni riga**, e più è probabile che quella che ti serviva venga ignorata.

---

## Tre categorie, e basta

| | Esempio |
|---|---|
| **Regole** — come si fa qui | «i componenti stanno in `src/components/`, uno per file» |
| **Divieti** — cosa non si fa mai | «non modificare `src/main.tsx`» |
| **Forzature** — decisioni già prese | «niente librerie di UI, si scrive a mano» |

Si scrivono **all'imperativo e al presente**. Una regola scritta come un consiglio viene trattata come un consiglio.

---

## Un CLAUDE.md che funziona

```markdown [1|3-7|9-13]
# hello-workshop

## Regole

- I componenti stanno in `src/components/`, uno per file, con lo stesso nome del file.
- Ogni componente esporta anche il tipo delle sue props.
- Niente `any`: se un tipo non torna, sistemalo, non zittirlo.

## Non fare mai

- Non modificare `src/main.tsx`.
- Non aggiungere dipendenze senza chiedere prima.
- Non installare librerie di componenti: la UI si scrive a mano.
```

Sei righe, tutte della forma «altrimenti sbaglia». **Sotto le venti righe.**

---

## Provalo senza ripeterlo

Riavvia `claude`, poi un prompt che **non dice** né dove va il file né come si scrive:

```text
Aggiungi un componente Greeting che riceve una prop name e mostra
"Ciao, {name}". Usalo in App.tsx al posto dell'h1.
```

```bash
git status --short -u
#  M src/App.tsx
# ?? src/components/Greeting.tsx
```

<div class="box">

Una regola scritta e mai verificata è una regola che **non sai se funziona**.

</div>

---

## Prima le regole, poi il codice

Se le convenzioni sono scritte **prima** che esista il codice, il codice nasce già conforme. Se le scrivi dopo, passi il pomeriggio a sistemare.

```markdown
## I cinque file da toccare

Aggiungere un componente tocca **cinque** file, sempre gli stessi:

1. `src/components/<Nome>/<Nome>.tsx` — il componente, e il suo `<Nome>.css`
2. `src/components/<Nome>/<Nome>.example.tsx` — l'esempio
3. `src/components/index.ts` — l'export del componente **e** del tipo
4. `src/App.tsx` — la registrazione nella vetrina
5. `docs/componenti.md` — una riga nella tabella

Se ne salti uno il progetto compila lo stesso: te ne accorgi dopo.
```

Note: questa è la versione del passo 3, sotto le quaranta righe: i cinque file, sette convenzioni, i divieti. Poi un prompt solo costruisce la libreria (Badge, Button, Stack e la vetrina).

---

## Il momento in cui si capisce tutto

Un prompt di una riga, nessun dettaglio:

> Aggiungi un componente Spinner alla libreria.

| Dove guardare | Cosa trovi — **nessuna era nella richiesta** |
|---|---|
| `Spinner.tsx` | `export function Spinner`, non `export default` |
| lo stesso file | una `interface SpinnerProps` esportata |
| `Spinner.css` | classi `ui-spinner…`, nessuno `style={{` |
| i file toccati | tutti e cinque, `index.ts` compreso |

<div class="box">

Quello che è scritto in `CLAUDE.md`, Claude lo fa **senza che tu lo chieda**.

</div>

---

## In team: il posto delle decisioni

Nel workshop in team il `CLAUDE.md` diventa **il verbale**:

- le **decisioni** prese a voce: *content è testo o markdown? l'ordinamento? la conferma prima di cancellare?*
- le **aree di proprietà**: chi è responsabile di cosa
- le **regole aggiunte dal team**, a fine giornata

> Non su un foglio e non nella chat: è il file che Claude legge da solo. Una decisione scritta lì **la rispetta da sola**.

Note: la sezione "Regole aggiunte dal team" si compila alla fine, non all'inizio. Una regola scritta prima di sbagliare è un'opinione.
