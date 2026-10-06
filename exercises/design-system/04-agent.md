# 04 · Agent (5 min)

**Obiettivo:** un audit che legge tutto il progetto e restituisce solo le violazioni.

Storia: un collega ha aggiunto un componente `tag` **senza conoscere le regole**.

## 1. Il componente "sporco"

Crealo **a mano dal terminale o dall'editor**, non con Claude: la regola lo scriverebbe già corretto.

```bash
mkdir -p src/app/ui/tag
```

`src/app/ui/tag/tag.ts`

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.html',
  styleUrl: './tag.css',
})
export class Tag {}
```

`src/app/ui/tag/tag.html`

```html
<span class="tag"><ng-content /></span>
```

`src/app/ui/tag/tag.css`

```css
.tag {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 999px;
  background: #eef2ff;
  font-size: 12px;
}
```

Cosa c'è che non va: selettore `app-`, nessun JSDoc, tre file invece di uno, non esportato da `index.ts`, assente da `/uikit`.

## 2. L'agente

```bash
mkdir -p .claude/agents
```

`.claude/agents/ds-auditor.md`

```markdown
---
name: ds-auditor
description: Controlla che il codice rispetti il design system Acme e riferisce le violazioni, senza correggere. Trigger: audit del design system, controlla il design system, controlla i componenti, rispettiamo le regole dei componenti.
tools: Read, Glob, Grep
model: sonnet
---

Controlla `src/app/` contro il design system Acme.

Per ogni componente in `src/app/ui/` (escluso `index.ts`):

1. selettore che non inizia con `fb-`
2. manca il JSDoc sopra la classe, o non ha `@example`
3. non è un file solo: `templateUrl`, `styleUrl` o file `.html`/`.css` nella sua cartella
4. non esportato da `src/app/ui/index.ts`
5. nessuna sezione nella pagina UI kit `src/app/features/uikit/`

In tutto il resto di `src/app/`:

6. `<button>`, `<input>`, `<select>` nativi fuori da `src/app/ui/`

Rispondi solo con:
- una riga per violazione: `file:riga — regola violata`
- in fondo: `N violazioni` oppure `Design system OK`

Massimo 15 righe. Non correggere niente.
```

Dire: *`tools: Read, Glob, Grep` è un muro: non **può** modificare.*

`/exit` → `claude`



## Verifica

Chiudi e riapri Claude Code

* Test #1: digita `@ds-` e vedi se ti viene suggerito `ds-auditor`
* Test #2: chiedi `quali subagent hai a disposizione?` → `ds-auditor` nell'elenco, con la sua `description`

Se non compare: il file deve iniziare con `---` (prima riga), e Claude va avviato dalla radice del progetto.




## Prompt di test

1. ```text
   @ds-auditor fammi un audit del design system
   ```
   **✓ atteso:** ~5 righe, tutte su `tag`: selettore `app-tag`, niente JSDoc, file separati, non esportato, assente da `/uikit`. Gli altri componenti: OK.
   Dire: *ha letto tutto il progetto, ci restituisce 5 righe.*

2. ```text
   Correggi il componente tag seguendo l'audit.
   ```
   **✓ atteso:** `tag.ts` unico file con selettore `fb-tag` e JSDoc, `tag.html` e `tag.css` cancellati, export in `index.ts`, sezione in `/uikit`.

3. ```text
   @ds-auditor fammi un audit del design system
   ```
   **✓ atteso:** nessuna riga su `tag`. Possono restare violazioni su altri componenti (es. creati prima della regola, o senza sezione in `/uikit`).

4. ```text
   Correggi tutti i componenti segnalati dall'audit.
   ```
   **✓ atteso:** ogni componente in `src/app/ui/` con selettore `fb-`, JSDoc, un file solo, export e sezione in `/uikit`. Le pagine che li usano aggiornate.

5. ```text
   @ds-auditor fammi un audit del design system
   ```
   **✓ atteso:** `Design system OK`.
   Dire: *audit → correzione → audit: l'agente controlla, Claude corregge. Ruoli separati.*


Nella cartella di `tag` resta solo `tag.ts`:

```bash
ls src/app/ui/tag
```

Browser: `/uikit` → c'è anche il tag.

```bash
git add -A && git commit -m "step 4"
```

## Se va storto

```bash
git checkout . && git clean -fd
```

Poi ricrea a mano i file di questo step (sono qui sopra).
