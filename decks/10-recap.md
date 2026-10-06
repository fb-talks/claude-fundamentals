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

# Exercise

---

## Exercise with the Teacher

**The Acme design system**: one Angular 22 app, everything in 30 minutes.

CLAUDE.md → rules → skill → agent → hook → plugin

<div class="box">

Step-by-step guide: [`exercises/design-system/`](https://github.com/fb-talks/claude-fundamentals/tree/main/exercises/design-system)

</div>

Note: start from 00-prima-dell-aula.md. Each file has the test prompts and the cp from soluzione/ if something breaks.

---

# Superpowers: _skills as a method_

---

## What Superpowers is

- a **plugin**: a set of skills that work together, by Jesse Vincent
- goal: the agent follows a **method** (design → plan → build → review) instead of jumping straight into code
- the skills trigger by themselves when the task matches, like yours

```text
/plugin install superpowers@claude-plugins-official
```

<div class="box">

Everything seen today (skills, subagents, plugins) used together, and written by someone else.

</div>

Note: also available from its own marketplace: /plugin marketplace add obra/superpowers-marketplace, then /plugin install superpowers@superpowers-marketplace. Source: github.com/obra/superpowers.

---

## The workflow

1. `brainstorming` → questions, approaches, a **spec**
2. `using-git-worktrees` → an isolated branch
3. `writing-plans` → the spec becomes small tasks: the **plan**
4. `subagent-driven-development` → one fresh subagent per task
5. `test-driven-development` → red, green, refactor
6. `requesting-code-review` → checked against the plan
7. `finishing-a-development-branch` → tests, then merge or PR

Note: brainstorming and writing-plans are two separate skills on purpose. If you skip the spec, the plan solves the wrong problem very well.

---

## Spec vs implementation plan

| | Spec | Implementation plan |
|---|---|---|
| **Answers** | what to build, and why | how to build it, step by step |
| **Contains** | goal, expected behavior, edge cases, non-goals, acceptance criteria | files to touch, order of steps, code, tests, commits |
| **Tied to the code?** | barely: survives a change of implementation | heavily: names files, functions, patterns |
| **Who validates it** | whoever owns the product: "is this what I want?" | whoever builds it: "is this how we do it?" |
| **Lifetime** | stays as a reference | consumed: once executed, it's done |

<div class="box">

Unsure **what** → spec. Unsure **how** → plan. Sure of both → just build it.

</div>

Note: Claude Code's plan mode produces the plan, not the spec. For a real feature, write the spec first (by hand, with brainstorming, or with a PRD skill) and give it to plan mode as input.

---

## Let's try it

---

## 1. Install

<video src="assets/video/superpowers/01-install.mp4" controls muted playsinline preload="metadata"
  style="width: 78%; aspect-ratio: 16 / 9;"></video>

---

## 2. Brainstorming

<video src="assets/video/superpowers/02-brainstorming.mp4" controls muted playsinline preload="metadata"
  style="width: 78%; aspect-ratio: 16 / 9;"></video>

---

## 3. Plan and implementation

<video src="assets/video/superpowers/03-plan-and-implementation.mp4" controls muted playsinline preload="metadata"
  style="width: 78%; aspect-ratio: 16 / 9;"></video>

---

## 4. Visual artifact

<video src="assets/video/superpowers/04-visual-artifact.mp4" controls muted playsinline preload="metadata"
  style="width: 78%; aspect-ratio: 16 / 9;"></video>

---

## 5. Subagent-driven development

<video src="assets/video/superpowers/05-subagent-driven.mp4" controls muted playsinline preload="metadata"
  style="width: 78%; aspect-ratio: 16 / 9;"></video>

---

## 6. Last fixes

<video src="assets/video/superpowers/06-last-fixes.mp4" controls muted playsinline preload="metadata"
  style="width: 78%; aspect-ratio: 16 / 9;"></video>

---

# Thank you

Now it's your turn: we start from an empty project.

---

## TODO
- plugin utili
- Super Powers
- Ai skills for Real Engineers
