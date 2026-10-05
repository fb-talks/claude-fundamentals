# 07 · Chiusura (1 min)

| Cosa | File | Per | Visto quando |
|---|---|---|---|
| **CLAUDE.md** | `CLAUDE.md` | le decisioni che Claude non può indovinare | vetrina e index creati senza chiederli |
| **Rule** | `.claude/rules/css.md` | dettagli che valgono solo per alcuni file | `filter`/`opacity` → token degli stati |
| **Skill** | `.claude/skills/new-ui-component/` | una procedura che si ripete uguale | `/new-ui-component badge`, e da una frase normale |
| **Agent** | `.claude/agents/ds-auditor.md` | leggere tanto, riportare poco, senza toccare | 7 righe su `cart.ts` |
| **Hook** | `.claude/hooks/no-hex.mjs` | ciò che non deve succedere **mai** | `Bloccato` anche con «ignora le regole» |
| **Plugin** | `../acme-ds/` | portare tutto in ogni progetto del team | `acme-admin` vuoto, stesse regole |

Restano nel progetto: CLAUDE.md e rule (parlano di **questa** app).
Vanno nel plugin: skill, agente, hook (valgono per **ogni** app Acme).
