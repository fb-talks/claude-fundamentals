# 02 · Rules (4 min)

**Obiettivo:** una regola che vale solo per i componenti del design system, caricata solo quando Claude li tocca.

Storia: il design team decide due convenzioni per **tutti** i componenti: selettore `fb-<nome>` e un JSDoc sopra la classe.
Dal codice non si possono indovinare: sono decisioni, non stile.

## 0. Prima: il prompt senza regola

```text
Crea il componente avatar: immagine tonda, con le iniziali se manca la foto.
```

Guarda `src/app/ui/avatar/avatar.ts`: di solito nessun JSDoc, e un selettore che **non** è `fb-avatar`.

> **Nota:** il prefisso cambia da una prova all'altra. Spesso è `app-avatar` (il prefisso di default di Angular, in `angular.json`), ma può essere `acme-avatar` (Claude l'ha letto nel CLAUDE.md) o `ui-avatar`. Non importa quale: conta che **non** sia `fb-`, perché `fb` non compare da nessuna parte nel progetto.

```bash
git checkout . && git clean -fd   # butta via, si rifà con la regola
```

## 1. La regola

```bash
mkdir -p .claude/rules
```

`.claude/rules/ui-components.md`

````markdown
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
````

Dire: *con `paths:` entra nel contesto solo quando Claude apre un file in `src/app/ui/`. Le pagine in `features/` non la caricano.*

`/exit` → `claude`

## 2. Dopo: stesso prompt

```text
Crea il componente avatar: immagine tonda, con le iniziali se manca la foto.
```

| | Senza regola | Con la regola |
|---|---|---|
| selettore | `app-avatar`, `acme-avatar`… | `fb-avatar` |
| sopra la classe | niente | JSDoc con `@example` |

## 3. Anche sui componenti che esistono già

```text
Allinea i componenti di src/app/ui alle regole del progetto.
```

**✓ atteso:** `button` e `card` diventano `fb-button` e `fb-card`, con JSDoc. La home usa i nuovi selettori e funziona ancora.

Dire: *la regola vale **ogni volta** che si entra in `src/app/ui/`, qualunque cosa si stia facendo.*

## Verifica

Tutti i selettori iniziano con `fb-` (una riga per componente):

```bash
grep -rn "selector:" src/app/ui                      # solo 'fb-…'
```

Nessun componente senza JSDoc: elenca i file **senza** `@example`, deve uscire solo `index.ts` (non ha una classe da documentare):

```bash
grep -rL "@example" src/app/ui --include='*.ts'      # solo index.ts
```

Browser: `/` funziona ancora.

```bash
git add -A && git commit -m "step 2"
```

## Se va storto

```bash
git checkout . && git clean -fd
```

Poi ricrea a mano il file di questo step (è qui sopra).
