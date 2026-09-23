---
marp: true
title: Recap
section: Recap
---

# Recap

Which tool, when

---

## Rule, skill, agent or hook?

| | When it acts | Who decides |
|---|---|---|
| **Rule** | always, it lives in the context | Claude, which reads and applies it |
| **Skill** | when needed, for a repeated task | Claude from the `description`, or you with `/` |
| **Subagent** | for isolated work, with its own context | Claude, or you asking for it |
| **Hook** | on a specific event, before or after an action | nobody: it happens |

**Plugin**: the box that carries them into every repo, and hands them to others.

---

## How the sentence starts

| If the sentence starts with… | It's… |
|---|---|
| "Claude **should**…" | a **rule** |
| "Claude **must never**…" | a **hook** |
| "**first** do X, **then** Y…" | a **skill** |
| "go read everything and **just tell me**…" | a **subagent** |
| "I need this **in every repo**…" | a **plugin** |

---

## Where everything lives

```text
project/
├── CLAUDE.md                     ← the map: rules, prohibitions, constraints
└── .claude/
    ├── rules/*.md                ← rules by topic (also with paths:)
    ├── skills/<name>/SKILL.md    ← repeated procedures
    ├── agents/<name>.md          ← delegated work, with tools and model
    ├── hooks/*.mjs               ← the scripts
    └── settings.json             ← registered hooks, installed plugins

~/.claude/                        ← the same things, but only yours, in every project
```

It's all **Markdown or JSON in the repo**: readable, committable, reviewable in a PR.

---

## Habits that matter more than tools

- **`git diff` before accepting**: five seconds, worth everything else
- **a commit at every step**: the point to restart from
- **verify, don't trust**: a rule, a skill, an agent get tested with a normal sentence
- **restart or reload** after every change: `/reload-skills`, `/reload-plugins`, `/exit`
- **short beats long**: CLAUDE.md, skills, agents. Write, reread, **cut**

---

## From solo to team

- **`CLAUDE.md` is the minutes**: decisions, owners, team rules
- **a rule comes from a real mistake**, written at the end, not the start
- tools **are shared with a `git pull`**: one person writes `smoke-test`, everyone uses it
- the work repeated by hand becomes the last skill: **`/ship`** = check, commit, push

```markdown
Site pages fetch with `cache: "no-store"`. Without it, a post created in
the back office doesn't show up on the home page and looks like an API bug.
```

<div class="caption">A team rule, like this. Not "watch out for the cache".</div>

Note: from workshop 2B. At the end of the day everyone brings one rule: the one they fixed by hand more than once, or the constraint repeated in every prompt.

---

## Commands to keep handy

<div class="cols">
<div class="col">

**In the session**

```text
/init              initial CLAUDE.md
shift+tab, /plan   plan mode
@file              point at a file
/                  list the skills
/reload-skills
/reload-plugins
/hooks             loaded hooks
/exit
```

</div>
<div class="col">

**In the terminal**

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

# Thank you

Now it's your turn: we start from an empty project.
