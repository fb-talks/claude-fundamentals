// Everything here is optional: delete the file and the defaults below apply.
export default {
  title: 'Claude Code — the fundamentals',
  lang: 'en',

  // Where the talk lives. Every .md in here becomes slides, in file-name order.
  decks: 'decks',

  // Folder behind a bare `<!-- demo: counter -->` marker in the Markdown.
  demos: 'demo',

  // One of reveal.js's own themes, served from this project rather than from a
  // CDN: beige, black, black-contrast, blood, dracula, league, moon, night,
  // serif, simple, sky, solarized, white, white-contrast. Uncomment to wear one
  // — the deck's chrome follows it. Leave it out for this package's own look.
  // revealTheme: 'dracula',

  // Six of those themes ask fonts.googleapis.com for their typefaces. Those
  // requests are stripped out, so a deck never depends on the room's wifi; the
  // theme falls back to the next font in its own stack. Set this to true to let
  // them through and get the typography of revealjs.com/themes exactly.
  // webfonts: true,

  // Port `fb-slides dev` serves the deck on (`preview` uses the next one up).
  // `--port n` on the command line wins over this.
  port: 4000,

  // Side processes `fb-slides dev` starts along with the deck — a demo that is a
  // real app rather than a static page. Drop this key, the folder and the slide
  // that embeds it if the talk has no framework demo in it.
  servers: [
    {
      name: 'angular-hello',
      cwd: 'demo/angular-hello',
      command: 'npm',
      args: ['start', '--', '--port', '4200'],
      url: 'http://localhost:4200/',
    },
  ],

  // A `source ↗` button on every demo slide, opening that demo's folder in real
  // VS Code in a new tab. It is `code serve-web` — the web server built into the
  // editor you already have — started alongside the deck, so nothing is installed
  // and nothing is embedded. Off by default because the very first run downloads
  // VS Code's server half (~100 MB) and you do not want to discover that on
  // stage: uncomment, run `dev` once at your desk, and it is cached from then on.
  // `{ port: 7300, command: 'code' }` to change either — the default is 7100,
  // which is clear of the ports the demos want. `--no-editor` turns it off for
  // one run, and a built deck never has it: the link is a localhost address and
  // a path on disk.
  editor: true,

  // The corner signature. Uncomment to show it.
  // signature: { name: 'fabiobiondi.dev', url: 'https://www.fabiobiondi.dev', logo: 'assets/logo.png' },

  // Passed straight to Reveal.initialize().
  // reveal: { transition: 'fade', slideNumber: false },
};
