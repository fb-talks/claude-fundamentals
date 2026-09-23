---
marp: true
title: Ricapitolando
section: Recap
---

# Ricapitolando

Quale strumento, quando

---

## Regola, skill, agente o hook?

| | Quando agisce | Chi decide |
|---|---|---|
| **Regola** | sempre, sta nel contesto | Claude, che la legge e la applica |
| **Skill** | quando serve, per un lavoro che si ripete | Claude dalla `description`, o tu con `/` |
| **Subagent** | per un lavoro isolato, con un contesto suo | Claude, o tu che glielo chiedi |
| **Hook** | a un evento preciso, prima o dopo un'azione | nessuno: succede |

**Plugin**: la scatola per portarli in ogni repo, e darli agli altri.

---

## Come comincia la frase

| Se la frase comincia con… | È… |
|---|---|
| «Claude **dovrebbe**…» | una **regola** |
| «Claude **non deve mai**…» | un **hook** |
| «**prima** fai X, **poi** Y…» | una **skill** |
| «vai a leggere tutto e **dimmi solo**…» | un **subagent** |
| «questo mi serve **in ogni repo**…» | un **plugin** |

---

## Dove sta ogni cosa

```text
progetto/
├── CLAUDE.md                     ← la mappa: regole, divieti, forzature
└── .claude/
    ├── rules/*.md                ← regole per argomento (anche con paths:)
    ├── skills/<nome>/SKILL.md    ← procedure che si ripetono
    ├── agents/<nome>.md          ← lavori delegati, con tools e model
    ├── hooks/*.mjs               ← gli script
    └── settings.json             ← hook registrati, plugin installati

~/.claude/                        ← le stesse cose, ma solo tue, in ogni progetto
```

Tutto è **Markdown o JSON nel repo**: si legge, si committa, si rivede in una PR.

---

## Le abitudini che contano più degli strumenti

- **`git diff` prima di accettare**: cinque secondi, vale tutto il resto
- **un commit a ogni passo**: il punto da cui ripartire
- **verifica, non fidarti**: una regola, una skill, un agente si provano con una frase normale
- **riavvia o ricarica** dopo ogni modifica: `/reload-skills`, `/reload-plugins`, `/exit`
- **corto batte lungo**: CLAUDE.md, skill, agenti. Scrivi, rileggi, **taglia**

---

## Dal singolo al team

- il **`CLAUDE.md` è il verbale**: decisioni, responsabili, regole del team
- **una regola nasce da un errore vero**, scritta alla fine, non all'inizio
- gli strumenti **si scambiano con un `git pull`**: uno scrive `smoke-test`, lo usano tutti
- il lavoro ripetuto a mano diventa l'ultima skill: **`/ship`** = check, commit, push

```markdown
Le pagine del sito fanno fetch con `cache: "no-store"`. Senza, un post creato
nel backoffice non compare in home e sembra un bug delle API.
```

<div class="caption">Una regola del team, così. Non «attenzione alla cache».</div>

Note: dal workshop 2B. Alla fine della giornata ognuno porta una regola: quella che ha corretto a mano più di una volta, o il vincolo ripetuto in ogni prompt.

---

## Comandi da tenere a mano

<div class="cols">
<div class="col">

**Nella sessione**

```text
/init              CLAUDE.md iniziale
shift+tab, /plan   plan mode
@file              indica il file
/                  elenca le skill
/reload-skills
/reload-plugins
/hooks             hook caricati
/exit
```

</div>
<div class="col">

**Nel terminale**

```bash
claude plugin marketplace add <repo>
claude plugin install <p>@<m>
claude plugin list
claude plugin validate . --strict
claude plugin marketplace update <m>
claude plugin update <p>@<m>
```

</div>
</div>

---

# Grazie

Adesso tocca a voi: si parte da un progetto vuoto.
