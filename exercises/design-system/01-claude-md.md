# 01 · CLAUDE.md (5 min)

**Obiettivo:** le decisioni del design system scritte una volta, rispettate senza ripeterle.

## 1. I token del design team

`src/styles/tokens.css`

```css
/* Token del design system Acme: l'unico file dove si scrivono colori e misure. */
:root {
  --color-primary: #4f46e5;
  --color-primary-contrast: #ffffff;
  --color-danger: #e11d48;
  --color-surface: #ffffff;
  --color-background: #f8fafc;
  --color-text: #1e293b;
  --color-muted: #64748b;
  --color-border: #e2e8f0;

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 40px;

  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;

  --font-family: system-ui, sans-serif;
  --font-size-sm: 0.875rem;
  --font-size-md: 1rem;
  --font-size-lg: 1.25rem;
}
```

`src/styles.css` → sostituisci tutto con:

```css
@import './styles/tokens.css';
```

## 2. Il CLAUDE.md

`CLAUDE.md` (radice del progetto)

```markdown
# acme-shop

App Angular di Acme. La UI si costruisce **solo** con il design system Acme.

## Regole

- I token (colori, spaziature, raggi, font) stanno in `src/styles/tokens.css`. Si usano con `var(--…)`.
- I componenti del design system stanno in `src/app/ui/<nome>/<nome>.ts|html|css`, selettore `ui-<nome>`, classe `Ui<Nome>`.
- Ogni componente `ui-*` è esportato da `src/app/ui/index.ts`.
- Ogni componente `ui-*` ha un esempio nella vetrina `src/app/showcase/`, rotta `/showcase`.
- Le pagine stanno in `src/app/features/<nome>/` e compongono componenti `ui-*`.

## Non fare mai

- Niente `<button>`, `<input>`, `<select>` nativi nelle feature: si usa il componente `ui-*`. Se manca, si crea prima quello.
- Niente colori scritti a mano (`#hex`, `rgb()`, nomi): solo token.
- Niente librerie UI (Angular Material, PrimeNG, Tailwind…).
```

Dire: *niente OnPush, signals, `@if`: Claude li sa già. Qui solo ciò che non può indovinare.*

```bash
git add -A && git commit -m "step 1: token e CLAUDE.md"
```

## Prompt di test

Avvia `claude`, poi:

1. ```text
   Crea i componenti ui-button e ui-card e una pagina home con la card di un prodotto: nome, prezzo e un bottone «Aggiungi al carrello».
   ```
   **✓ atteso:** `ui/button/`, `ui/card/`, `ui/index.ts`, `showcase/` con la rotta, `features/home/`. CSS con `var(--…)`.
   Nel prompt **non** c'erano né vetrina, né index, né token.

## Verifica

```bash
git status --short -u
```

Browser: `/` (la card) e `/showcase`.
Far notare in `ui/button/button.css`: hover con `filter`, disabled con `opacity` → li sistemiamo al prossimo step.

```bash
git add -A && git commit -m "step 1"
```

## Se va storto

```bash
cp $SOL/acme-shop/CLAUDE.md . && mkdir -p src/styles && cp $SOL/acme-shop/src/styles/tokens.css src/styles/
```
