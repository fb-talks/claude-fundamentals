---
paths:
  - "src/app/ui/**"
---

# Componenti del design system

- **Selettore `fb-<nome>`**, sempre: `fb-button`, `fb-card`. Mai `app-`, `ui-` o altri prefissi. Se rinomini un selettore, aggiorna anche i template che lo usano.
- **Sopra la classe, un commento JSDoc** con: una riga su cos'è, una su cosa fa (input e output principali), e un `@example` con l'HTML per usarlo.

```ts
/**
 * Bottone del design system Acme.
 * Esegue un'azione al click; input `variant` ('primary' | 'secondary').
 *
 * @example <fb-button variant="secondary">Annulla</fb-button>
 */
```
