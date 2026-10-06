# 03 · Skill (6 min)

**Obiettivo:** «nuovo componente» è sempre la stessa procedura: crearlo, esportarlo, documentarlo nel UI kit. Scriverla una volta.

```bash
mkdir -p .claude/skills/new-ui-component
```

Crea `SKILL.md` qui sotto, mostrandolo mentre lo scrivi.

## La skill

`.claude/skills/new-ui-component/SKILL.md`

```markdown
---
name: new-ui-component
description: Crea un nuovo componente del design system Acme, lo esporta e lo documenta nella pagina UI kit. Trigger: crea un componente, nuovo componente del design system, mi serve un componente, aggiungi al design system, aggiungi al ui kit.
argument-hint: <nome-in-kebab-case>
allowed-tools: Read, Glob, Grep, Write, Edit, Bash(npx ng build:*)
---

# Nuovo componente `$ARGUMENTS`

Se il nome è vuoto, chiedilo e fermati.

1. Crea `src/app/ui/<nome>/<nome>.ts`, un file solo con `template` e `styles` inline. Se in `src/app/ui/` c'è già un componente, usalo come modello.
2. Esporta il componente da `src/app/ui/index.ts` (crealo se manca).
3. Documentalo nella pagina UI kit `src/app/features/uikit/`, rotta `/uikit` (creala se manca). Una sezione per componente:
   - titolo con il nome del componente;
   - **a sinistra** la demo dal vivo, con 2-3 varianti;
   - **a destra** il codice HTML per istanziare quelle varianti, in `<pre><code>`.
   Il codice va in una stringa nella classe e si mostra con `{{ }}`: scritto direttamente nel template, Angular lo interpreterebbe.
4. Lancia `npx ng build`. Se è rosso, correggi solo i file di questo giro.

Non toccare gli altri componenti né le altre feature.

Alla fine una riga sola: `<nome>: <file creati o modificati> — build ✓|✗`
```

Dire: *la skill non dice niente di `fb-` né del JSDoc. Ci pensa la regola: la skill scrive in `src/app/ui/`, la regola si carica da sola.*

`/exit` → `claude`

## Prompt di test

1. ```text
   /new-ui-component badge
   ```
   **✓ atteso:** una riga finale `badge: … — build ✓`. `ng build` parte senza chiedere il permesso (`allowed-tools`).
   `fb-badge` con JSDoc (dalla regola), export in `index.ts`, sezione in `/uikit`: demo a sinistra, codice a destra.

2. ```text
   mi serve un componente alert per mostrare messaggi di errore e di successo
   ```
   **✓ atteso:** compare `Skill(new-ui-component)`: partita dalla `description`. `fb-alert` compare in `/uikit`.

## Verifica

```bash
git status --short -u
```

Browser: `/uikit` → badge e alert, ognuno con demo e codice.

```bash
git add -A && git commit -m "step 3"
```

## Se va storto

```bash
git checkout . && git clean -fd
```

Poi ricrea a mano il file di questo step (è qui sopra).
