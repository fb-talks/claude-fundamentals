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
