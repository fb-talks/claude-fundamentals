# 04 · Agent (5 min)

**Obiettivo:** un audit che legge tutto il progetto e restituisce solo le violazioni.

## 1. Un componente scritto "da un collega"

`src/app/features/cart/cart.ts`

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-cart',
  template: `
    <section class="cart">
      <h2>Carrello</h2>
      <p>2 articoli · 49,90 €</p>
      <button class="checkout" (click)="checkout()">Vai al pagamento</button>
    </section>
  `,
  styles: `
    .cart { padding: 13px; border: 1px solid #ddd; border-radius: 6px; }
    .checkout { background: #e11d48; color: white; padding: 8px 16px; }
  `,
})
export class Cart {
  checkout() {}
}
```

## 2. L'agente

`.claude/agents/ds-auditor.md`

```markdown
---
name: ds-auditor
description: Controlla che il codice rispetti il design system Acme e riferisce le violazioni, senza correggere. Trigger: audit del design system, controlla il design system, rispettiamo i token, ci sono colori scritti a mano.
tools: Read, Glob, Grep
model: sonnet
---

Controlla `src/app/` contro il design system Acme:

1. `<button>`, `<input>`, `<select>` nativi fuori da `src/app/ui/`
2. colori scritti a mano (`#hex`, `rgb(`, `hsl(`, `white`, `red`…) fuori da `src/styles/tokens.css`
3. `margin`, `padding`, `gap`, `border-radius`, `font-size` in `px`/`rem` invece dei token
4. componenti in `src/app/ui/` non esportati da `src/app/ui/index.ts` o senza esempio in `src/app/showcase/`

Controlla anche gli stili e i template inline nei file `.ts`.

Rispondi solo con:
- una riga per violazione: `file:riga — regola violata`
- in fondo: `N violazioni` oppure `Design system OK`

Massimo 15 righe. Non correggere niente.
```

Dire: *`tools: Read, Glob, Grep` è un muro: non **può** modificare.*

`/exit` → `claude`

## Prompt di test

1. ```text
   @agent-ds-auditor fammi un audit del design system
   ```
   **✓ atteso:** ~7 righe, tutte su `cart.ts`: `<button>` nativo, `#ddd`, `#e11d48`, `white`, `13px`, `6px`, `8px 16px`. Il resto: OK.

2. ```text
   Correggi src/app/features/cart/cart.ts: usa ui-button e i token, e aggiungi la rotta /cart.
   ```
   **✓ atteso:** `<ui-button>`, solo `var(--…)`, rotta `/cart`. Browser: `/cart`.

## Verifica

`/agents` → `ds-auditor` nell'elenco.

```bash
git add -A && git commit -m "step 4"
```

## Se va storto

```bash
mkdir -p .claude/agents src/app/features/cart
cp $SOL/acme-shop/.claude/agents/ds-auditor.md .claude/agents/
cp $SOL/acme-shop/src/app/features/cart/cart.ts src/app/features/cart/
```
