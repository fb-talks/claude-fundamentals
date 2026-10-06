# 01 · CLAUDE.md (5 min)

**Obiettivo:** le decisioni del progetto scritte una volta, rispettate senza ripeterle.

Crea a mano il file qui sotto, mostrandolo mentre lo scrivi.

## Il CLAUDE.md

`CLAUDE.md` (radice del progetto)

```markdown
# acme-shop

App Angular di Acme. La UI si costruisce **solo** con i componenti del design system Acme.

## Struttura

- I componenti del design system stanno in `src/app/ui/<nome>/<nome>.ts`: **un file solo**, con `template` e `styles` inline. Niente `.html` né `.css` separati.
- Ogni componente è esportato da `src/app/ui/index.ts`.
- Le pagine stanno in `src/app/features/<nome>/` e compongono i componenti di `src/app/ui/`.

## Non fare mai

- Niente `<button>`, `<input>`, `<select>` nativi nelle feature: si usa il componente del design system. Se manca, si crea prima quello.
- Niente librerie UI (Angular Material, PrimeNG, Tailwind…).
```

Dire: *niente OnPush, signals, `@if`: Claude li sa già. Qui solo ciò che non può indovinare.*

```bash
git add -A && git commit -m "step 1: CLAUDE.md"
```

## Prompt di test

Avvia `claude`, poi:

1. ```text
   Crea una pagina home con la card di un prodotto: nome, prezzo e un bottone «Aggiungi al carrello».
   ```
   **✓ atteso:** prima `ui/button/button.ts` e `ui/card/card.ts`, ognuno in **un file solo**, poi `ui/index.ts`, poi `features/home/` che li usa. Nessun `<button>` nativo nella home.
   Nel prompt **non** c'erano né componenti, né cartelle, né index.

## Verifica

```bash
git status --short -u
grep -rn "<button" src/app/features     # vuoto
find src/app/ui -name "*.html" -o -name "*.css"   # vuoto: tutto inline
```

Browser: `/` (la card).

```bash
git add -A && git commit -m "step 1"
```

## Se va storto

```bash
git checkout . && git clean -fd
```

Poi ricrea a mano il file di questo step (è qui sopra).
