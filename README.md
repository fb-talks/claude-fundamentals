# Claude Fundamentals

Slides built with [`fb-slides`](https://www.npmjs.com/package/fb-slides).

```bash
npm install
npm run dev       # http://localhost:4000
npm run build     # → dist/
npm run preview   # build, then serve dist/
```

## What is where

| | |
| --- | --- |
| `decks/*.md` | the talk. Drop a file in, delete one — there is no list to update |
| `demo/counter/` | a static page a slide embeds and runs |
| `demo/angular-hello/` | an app with its own dev server, started by `servers:` |
| `assets/` | images the Markdown links to |
| `theme.css` | colour overrides, loaded after the package's theme |
| `slides.config.js` | title, folders, signature, side servers — all optional |

The Angular demo needs its own install once — `npm --prefix demo/angular-hello install`.
Without it that one slide comes up empty and everything else works.

To swap it for a real app of your own — copied in whole, with its own `package.json` and
`node_modules` — see [framework demos](https://github.com/fabiobiondi/fb-slides/blob/main/docs/framework-demos.md).

The deck engine itself is not in this repo: it comes from the package, so
`npm update fb-slides` brings new features to this talk and every other one.
