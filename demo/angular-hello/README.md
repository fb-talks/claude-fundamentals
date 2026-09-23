# angular-hello

An Angular app on a slide. It is here to show the one thing a static page cannot:
a demo with its **own dev server**, started by `servers:` in `../../slides.config.js`
and embedded with `<!-- demo: http://localhost:4200/ -->`.

It needs its own install, once:

```bash
npm --prefix demo/angular-hello install
```

Until you do, `npm run dev` prints a warning and that one slide comes up empty.
Delete the folder — and the `servers:` entry, and the slide — if the talk has no
framework demo in it.
