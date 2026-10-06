# acme-shop

App Angular di Acme. La UI si costruisce **solo** con i componenti del design system Acme.

## Struttura

- I componenti del design system stanno in `src/app/ui/<nome>/<nome>.ts`: **un file solo**, con `template` e `styles` inline. Niente `.html` né `.css` separati.
- Ogni componente è esportato da `src/app/ui/index.ts`.
- Le pagine stanno in `src/app/features/<nome>/` e compongono i componenti di `src/app/ui/`.

## Non fare mai

- Niente `<button>`, `<input>`, `<select>` nativi nelle feature: si usa il componente del design system. Se manca, si crea prima quello.
- Niente librerie UI (Angular Material, PrimeNG, Tailwind…).
