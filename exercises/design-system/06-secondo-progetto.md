# 06 · Secondo progetto (2 min)

**Obiettivo:** un'altra app Acme, vuota, dove provare il plugin del prossimo step.

Nella cartella che contiene `acme-shop`:

```bash
cd ~/workshop && npx @angular/cli@22 new acme-admin -t -s -S --defaults
```

```text
~/workshop/
├── acme-shop/     ← quello degli step 1–5
└── acme-admin/    ← nuovo, accanto
```

Consiglio: l'install dura ~1 min, lancialo in un **secondo terminale** mentre commenti lo step 5.

Dire: *è il progetto di un collega: niente CLAUDE.md, niente `.claude/`. Non sa niente del design system.*

## Verifica

```bash
ls -a ~/workshop/acme-admin         # nessun CLAUDE.md, nessuna .claude/
```

## Se va storto

```bash
rm -rf ~/workshop/acme-admin    # e rilancia il comando qui sopra
```
