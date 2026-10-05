---
paths:
  - "src/**/*.css"
---

# CSS Acme

- **Gli stati usano i token dedicati.** Hover con `--color-<nome>-hover`, disabilitato con `--color-disabled-bg` e `--color-disabled-text`, focus con `outline: none` più `box-shadow: var(--focus-ring)`. Mai `filter`, `opacity` o `outline` scritti a mano: il design team li ha testati per il contrasto.
- **Spaziature solo `--space-1` … `--space-6`, angoli solo `--radius-*`, testo solo `--font-size-*`.** L'unico px ammesso è il bordo da 1px.
