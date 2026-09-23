---
marp: true
title: CLAUDE.md
section: CLAUDE.md
---

# CLAUDE.md

What holds for every message, without repeating it

---

## What it is

A Markdown file that Claude reads **on its own**, at the start of every session.

What's written there applies to **every message**.

```text
hello-workshop/
├── CLAUDE.md          ← in the project root…
├── .claude/
│   └── CLAUDE.md      ← …or here, next to rules, skills and agents
├── package.json
└── src/
```

Either place works: pick one. `.claude/` keeps the root tidy and everything Claude-related in one folder.

Note: the "don't touch main.tsx" from the first prompt, written here, never needs repeating. Careful: it's read at startup. If you change it, restart the session (/exit, then claude).

---

## `/init`, then **cut**

`/init` reads the project and writes a `CLAUDE.md`. It's a **starting point, not a result**: almost always too long, full of description.

| Cut | Why |
|---|---|
| "React project with Vite and TypeScript" | it sees that in `package.json` |
| the list of folders | it sees that on its own |
| "to start: `npm run dev`" | it's already in the scripts |
| "write clean code", "best practices" | means nothing, so changes nothing |
| what React or TypeScript do | it knows better than you |

Note: CLAUDE.md is not the project's documentation. Claude can read the project: the files are enough.

---

## Before and after

<div class="cols">
<div class="col">

**✗ Straight out of `/init`**

```markdown
# CLAUDE.md

This file provides guidance to Claude Code
when working with code in this repository.

## Project overview
A React 19 + TypeScript app built with Vite.
Uses ESLint for linting.

## Commands
- `npm run dev` — start the dev server
- `npm run build` — type-check and build
- `npm run lint` — run ESLint
- `npm run preview` — preview the build

## Structure
- `src/main.tsx` — entry point
- `src/App.tsx` — root component
- `src/assets/` — static assets
- `public/` — public files

## Guidelines
- Write clean, readable code
- Follow React best practices
- Use TypeScript types properly
```

</div>
<div class="col">

**✓ After the cut**

```markdown
# hello-workshop

## Rules

- Components live in `src/components/`,
  one per file, named after the file.
- Every component also exports
  the type of its props.
- No `any`: if a type doesn't fit,
  fix it, don't silence it.

## Never

- Don't modify `src/main.tsx`.
- Don't add dependencies without asking.
- Don't install component libraries:
  the UI is written by hand.
```

Everything on the left is **in the files already**, or **means nothing**. What's on the right is what Claude **would get wrong** without being told.

</div>
</div>

Note: go through the left column section by section. Overview: package.json. Commands: the scripts. Structure: the folder tree. Guidelines: not checkable. Nothing survives, and that's the point: what's left on the right is written from scratch.

---

## The question for every line

<div class="box">

**If I delete it, does Claude get something wrong?**

If the answer is no, delete it.

</div>

`CLAUDE.md` holds only what Claude **can't infer by looking at the code**, and gets wrong if you don't tell it.

Noise has a cost: the longer the file, **the less weight each line carries**, and the more likely the one you needed gets ignored.

---

## Three categories, that's all

| | Example |
|---|---|
| **Rules** — how it's done here | "components live in `src/components/`, one per file" |
| **Prohibitions** — what's never done | "don't modify `src/main.tsx`" |
| **Constraints** — decisions already made | "no UI libraries, we write it by hand" |

Write them **in the imperative, present tense**. A rule written as advice gets treated as advice.

---

## A CLAUDE.md that works

```markdown [1|3-7|9-13]
# hello-workshop

## Rules

- Components live in `src/components/`, one per file, named after the file.
- Every component also exports the type of its props.
- No `any`: if a type doesn't fit, fix it, don't silence it.

## Never

- Don't modify `src/main.tsx`.
- Don't add dependencies without asking first.
- Don't install component libraries: the UI is written by hand.
```

Six lines, all of the "otherwise it gets it wrong" kind. **Under twenty lines.**

---

## Test it without repeating it

Restart `claude`, then a prompt that says **neither** where the file goes nor how to write it:

```text
Add a Greeting component that takes a name prop and shows
"Hello, {name}". Use it in App.tsx instead of the h1.
```

```bash
git status --short -u
#  M src/App.tsx
# ?? src/components/Greeting.tsx
```

<div class="box">

A rule written and never checked is a rule **you don't know works**.

</div>

---

## Rules first, then code

If conventions are written **before** the code exists, the code is born compliant. Write them afterwards and you spend the afternoon fixing things.

```markdown
## The five files to touch

Adding a component touches **five** files, always the same:

1. `src/components/<Name>/<Name>.tsx` — the component, and its `<Name>.css`
2. `src/components/<Name>/<Name>.example.tsx` — the example
3. `src/components/index.ts` — the export of the component **and** its type
4. `src/App.tsx` — the registration in the showcase
5. `docs/components.md` — a row in the table

Skip one and the project still compiles: you find out later.
```

Note: this is the step 3 version, under forty lines: the five files, seven conventions, the prohibitions. Then a single prompt builds the library (Badge, Button, Stack and the showcase).

---

## The moment it all clicks

A one-line prompt, no details:

> Add a Spinner component to the library.

| Where to look | What you find — **none of it was in the request** |
|---|---|
| `Spinner.tsx` | `export function Spinner`, not `export default` |
| same file | an exported `interface SpinnerProps` |
| `Spinner.css` | `ui-spinner…` classes, no `style={{` |
| files touched | all five, `index.ts` included |

<div class="box">

Whatever is written in `CLAUDE.md`, Claude does **without being asked**.

</div>

---

## In a team: where decisions live

In the team workshop `CLAUDE.md` becomes **the minutes**:

- the **decisions** made out loud: *is content plain text or markdown? the sort order? confirm before deleting?*
- the **ownership areas**: who is responsible for what
- the **rules added by the team**, at the end of the day

> Not on a sheet of paper and not in the chat: it's the file Claude reads on its own. A decision written there **gets respected on its own**.

Note: the "Rules added by the team" section is filled in at the end, not at the start. A rule written before making the mistake is an opinion.
