# Screenshots — visual references for Figma Make

> Drag these images into your Figma Make project alongside your prompt. Make uses them as a visual target, which is the most reliable way to keep output pixel-aligned with the AO system.

Each screenshot is named with a numeric prefix so it sorts predictably and you can reference it by name in a prompt (e.g. *"Match the button styling in `12-buttons.png`"*).

## Full-page references

| File | Shows |
|---|---|
| `01-page-product-detail.png` | Complete PDP — nav, breadcrumb, image pane, detail column, specs table, validated form, button variants, full token strip |
| `02-component-library.png` | Every component in one continuous reference — buttons, inputs, tags, notices, cards, breadcrumb, tabs, accordion, spinner |
| `03-patterns-gallery.png` | Page-level patterns — sign in screen and basket |

## Component sections

| File | Shows |
|---|---|
| `10-colour-tokens.png` | Brand green, action tokens, type colours, food palette, neutrals, UI semantic states |
| `11-typography.png` | The full type scale — SmileyFace headings + Inter body |
| `12-buttons.png` | All variants (primary, secondary, tertiary, dark, white, inactive), sizes, and the full-width checkout pattern |
| `13-inputs.png` | Default, success, error, highlight, disabled, required |
| `14-toggles.png` | Checkbox and radio (toggle-item card style) |
| `15-tags.png` | All semantic tag variants in both sizes |
| `16-notices.png` | Info, success, warning, error |
| `17-cards.png` | Default, raised, state variants, with divider |
| `18-breadcrumb.png` | Standard breadcrumb with separators |
| `19-tabs.png` | Tab list with active state |
| `20-accordion.png` | Expanded + collapsed items |
| `21-spinner.png` | Default, small, white-on-dark |

---

## Regenerating

These screenshots are generated from the HTML in [`../../examples/`](../../examples/) via `node /Users/connec/Development/03_Design_MD/.capture-screenshots.mjs` (requires the local Puppeteer install in the parent repo).

If you update an example HTML file, re-run the script to refresh the corresponding screenshots.
