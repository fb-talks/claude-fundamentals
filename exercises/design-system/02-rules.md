# 02 · Rules (4 min)

**Obiettivo:** una regola che vale solo per i CSS, caricata solo quando servono.

Storia: il design team rilascia i token degli **stati** (hover, disabled, focus).
Claude ha usato `filter` e `opacity`: non poteva saperlo.

## 1. Aggiungi i token degli stati

In fondo a `:root` in `src/styles/tokens.css`:

```css
  /* Stati: aggiunti dal design team nella v2 */
  --color-primary-hover: #4338ca;
  --color-danger-hover: #be123c;
  --color-surface-hover: #f1f5f9;
  --color-disabled-bg: #e2e8f0;
  --color-disabled-text: #94a3b8;
  --focus-ring: 0 0 0 3px #c7d2fe;
```

## 2. La regola

`.claude/rules/css.md`

```markdown
---
paths:
  - "src/**/*.css"
---

# CSS Acme

- **Gli stati usano i token dedicati.** Hover con `--color-<nome>-hover`, disabilitato con `--color-disabled-bg` e `--color-disabled-text`, focus con `outline: none` più `box-shadow: var(--focus-ring)`. Mai `filter`, `opacity` o `outline` scritti a mano: il design team li ha testati per il contrasto.
- **Spaziature solo `--space-1` … `--space-6`, angoli solo `--radius-*`, testo solo `--font-size-*`.** L'unico px ammesso è il bordo da 1px.
```

Dire: *con `paths:` entra nel contesto solo quando Claude apre un `.css`.*

`/exit` → `claude`

## Prompt di test

1. ```text
   Allinea i CSS di src/app/ui alle regole in .claude/rules/. Non cambiare altro.
   ```
   **✓ atteso:** solo `button.css` cambia: `filter` → `--color-primary-hover`, `opacity` → `--color-disabled-*`, `outline` → `--focus-ring`.

2. ```text
   Aggiungi a ui-button una variante danger.
   ```
   **✓ atteso:** hover con `--color-danger-hover` **senza dirlo**, e l'esempio "Danger" compare in `/showcase` (CLAUDE.md).

## Verifica

```bash
git diff --stat
grep -rnE "filter|opacity" src/app/ui     # vuoto
```

```bash
git add -A && git commit -m "step 2"
```

## Se va storto

```bash
mkdir -p .claude/rules && cp $SOL/acme-shop/.claude/rules/css.md .claude/rules/ && cp $SOL/acme-shop/src/styles/tokens.css src/styles/
```
