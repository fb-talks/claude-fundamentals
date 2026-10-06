# Esercizio finale: il design system Acme

L'azienda Acme ha un design system: componenti con selettore `fb-`, una pagina UI kit che li documenta.
Lo insegniamo a Claude un pezzo alla volta, poi lo portiamo in un secondo progetto con un plugin.

## Scaletta (30 min)

| Min | File | Cosa si vede |
|---|---|---|
| 0–5 | [01-claude-md](01-claude-md.md) | componenti e index nascono dove deciso, senza dirlo nel prompt |
| 5–9 | [02-rules](02-rules.md) | una regola con `paths:`: selettore `fb-` e JSDoc su ogni componente |
| 9–15 | [03-skill](03-skill.md) | `/new-ui-component badge` → 3 file + export + pagina `/uikit` + build |
| 15–20 | [04-agent](04-agent.md) | l'auditor legge tutto e riporta solo le violazioni |
| 20–24 | [05-hook](05-hook.md) | il colore a mano viene **bloccato**, anche se lo chiedi |
| 24–26 | [06-secondo-progetto](06-secondo-progetto.md) | un'altra app Acme, vuota: il banco di prova del plugin |
| 26–30 | [07-plugin](07-plugin.md) | in un progetto nuovo, stesse regole con un'installazione |
| — | [08-chiusura](08-chiusura.md) | tabella finale |

## Preparazione, in 3 passi

### 1. Crea l'app (a casa, una volta sola)

```bash
mkdir -p ~/workshop && cd ~/workshop
npx @angular/cli@22 new acme-shop -t -s -S --defaults
```

### 2. Avviala (terminale A, resta aperto)

```bash
cd ~/workshop/acme-shop 
code .  # aprilo in VSC o Antigravity
npm start      # → http://localhost:4200
```

### 3. Entra nel progetto (terminale B)

```bash
cd ~/workshop/acme-shop
git add -A && git commit -m "start"   # punto di partenza pulito
claude
```

## A ogni step

1. `/exit` da Claude (o usa un altro terminale in `acme-shop`)
2. crea **a mano** i file della guida dello step, mostrandoli mentre li scrivi
3. `claude` e il prompt dello step

I file pronti sono anche in `soluzione/`, accanto a questa guida: solo per controllare, o per recuperare se sei in ritardo.

## Alla fine di ogni step

```bash
git status --short -u            # cosa ha toccato
git add -A && git commit -m "step N"
```

## Se va storto: rifare uno step

Esempio: la skill (step 3) ha generato file sbagliati, o l'hai modificata e non va più.

**Step non ancora committato** → torna all'ultimo commit (`step 2`):

```bash
git checkout . && git clean -fd  # annulla modifiche e file nuovi
```

**Step già committato** → torna al commit dello step prima:

```bash
git log --oneline                # trova "step 2"
git reset --hard <hash-step-2> && git clean -fd
```

Poi ricrea i file dello step dalla guida, `/exit` e `claude`.

- solo la skill, senza toccare il resto: `git checkout -- .claude/skills/` (se era committata)
- step 6, `acme-admin` esiste già → `rm -rf ~/workshop/acme-admin` e rilancia
- `git clean -fd` cancella **tutto ciò che non è committato**: committa a ogni step, o perdi anche il lavoro buono

## Tips

- **Dopo ogni modifica a `.claude/`** (skill, regole, agenti, hook) → `/exit` e `claude` (o `/reload-skills`, `/reload-plugins`)
- **Hook caricato?** In Claude: `/hooks`
- **Crea i file dal terminale o dall'editor, non chiedendoli a Claude**: l'esercizio mostra cosa succede *dopo* che esistono
- **`acme-shop` può stare dove vuoi** (non per forza `~/workshop`): `acme-admin` e `acme-ds` vanno nella stessa cartella, accanto ad `acme-shop`
- **`!` in Claude Code** lancia un comando senza uscire da Claude (es. `! mkdir -p .claude/rules`), ma ogni volta in una shell nuova
