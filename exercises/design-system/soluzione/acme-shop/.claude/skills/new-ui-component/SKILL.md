---
name: new-ui-component
description: Crea un nuovo componente del design system Acme (ui-*), lo esporta e lo aggiunge alla vetrina. Trigger: crea un componente ui, nuovo componente del design system, mi serve un ui-qualcosa, aggiungi al design system.
argument-hint: <nome-in-kebab-case>
allowed-tools: Read, Glob, Grep, Write, Edit, Bash(npx ng build:*)
---

# Nuovo componente `ui-$ARGUMENTS`

Se il nome è vuoto, chiedilo e fermati.

1. Se `src/styles/tokens.css` non esiste, copialo da `tokens.css` nella cartella di questa skill e importalo in cima a `src/styles.css`.
2. Crea `src/app/ui/<nome>/<nome>.ts`, `.html`, `.css`: selettore `ui-<nome>`, classe `Ui<Nome>`. Se in `src/app/ui/` c'è già un componente, usalo come modello.
3. Nel CSS solo token di `tokens.css`: nessun colore, spaziatura o raggio scritto a mano. Se manca un token, aggiungilo a `tokens.css` e dillo nel riepilogo.
4. Esporta il componente da `src/app/ui/index.ts` (crealo se manca).
5. Aggiungi un esempio con le varianti principali nella vetrina `src/app/showcase/`, rotta `/showcase` (creala se manca).
6. Lancia `npx ng build`. Se è rosso, correggi solo i file di questo giro.

Non toccare gli altri componenti `ui-*` né le feature.

Alla fine una riga sola: `ui-<nome>: <file creati o modificati> — build ✓|✗`
