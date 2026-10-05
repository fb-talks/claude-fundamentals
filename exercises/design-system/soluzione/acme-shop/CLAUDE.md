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
