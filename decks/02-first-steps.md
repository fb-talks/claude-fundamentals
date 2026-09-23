---
marp: true
title: First steps
section: First steps
---

# First steps

The first prompt, the diff, the plan

---

## The first prompt

```text
Open @src/App.tsx: remove all the Vite sample content — the two logos,
the counter, the state, the links — and leave only an <h1>Hello Workshop</h1>.

Remove the imports and CSS rules that end up unused.
Don't touch src/main.tsx.
```

- **`@file`** tells Claude *which* file to look at, instead of letting it search
- asking it to **remove** code is a great first test
- note the last line: a prohibition **written in the prompt**. We'll come back to it

Note: "Don't touch src/main.tsx" is the hook for CLAUDE.md. If tomorrow you ask for something else, that prohibition has to be written again. That's exactly the problem the next step solves.

---

## Watch the screen, don't wait

While Claude works you see three things:

1. **which files it opens**: they should be the ones you expect, and nothing else
2. **the diff it proposes**, red and green, before writing
3. **the confirmation request**, which you accept or reject

<div class="box">

If it proposes touching unrelated files, **say no**. It's not a rare accident: it's the reason it shows you the diff first.

</div>

---

## The habit worth more than everything else

```bash
git diff --stat        # how many files, how many lines
git diff               # the full diff
git status --short -u  # NEW files too, which git diff doesn't see
```

> Claude makes mistakes like a fast colleague: **rarely, and never where you're looking**.
> A `git diff` costs five seconds.

Then `git commit`. Every step ends with a commit: it's the point to restart from, and the baseline to measure what changes next.

Note: git diff only shows files git already knows. When Claude creates new files you need git status. A common mistake: "it did nothing" when it actually created three files.

---

## Plan mode: think before writing

A mode where Claude **touches nothing**: it reads, reasons, and proposes a plan. You approve, and only then does it write.

<div class="cols">
<div class="col">

**How to enter**

- `shift+tab` until *plan mode* shows up
- or `/plan`

</div>
<div class="col">

**Try the same request**

> Add a theme system to the library, light and dark.

First **without** a plan, then **with** one. Compare.

</div>
</div>

Note: in the exercise you let it start without a plan, stop it with Esc, throw everything away with git checkout . && git clean -fd, and redo it in plan mode. The comparison is the exercise: what it understood, what it decided on its own.

---

## When you actually need it

**Not always.** For adding a `Badge` it's a waste of time.

You need it when:

- the change **touches several files**
- you're not sure you **explained well** what you want
- you want to **reason** together: pros and cons, risks, alternatives

<div class="box">

The plan is the cheapest place to find out you misunderstood each other: changing it costs **one sentence**, changing the code costs **half an hour**.

</div>
