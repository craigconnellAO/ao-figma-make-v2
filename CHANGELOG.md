# Changelog

## v2.1.0 — 2026-06-12

Systematic alignment pass against the Figma Design System Components library. Every component in the kit was compared to its Figma source via MCP, ran through Figma Check Designs and corrected where drifted.

### Token corrections

| Token | Was | Now (Figma) |
|---|---|---|
| `action-primary-base` | `#008945` | `#00893e` |
| `action-primary-focus` | `#008945` | `#00893e` |
| `action-primary-active` | `#02422b` | `#003d00` |
| `action-secondary-base` | `#0a64c2` | `#0564c2` |
| `action-secondary-focus` | `#0a64c2` | `#0564c2` |

All three sources (`kit/tokens.md` tables, `:root` block, and `kit/tokens.json`) are now internally consistent for every action token.

### Component corrections

- **Buttons** — radius changed from `9999px` (pill) to `var(--radius-sm)` (8px). Border from 2px to 1px. Matches Figma library exactly.
- **Inputs** — border colour `gray-40` → `gray-50`, font size `0.9375rem` → `0.875rem` (14px), horizontal padding `0.75rem` → `0.875rem`.
- **Notices** — border removed entirely, padding simplified to `0.75rem` uniform, font size `0.875rem` → `0.75rem` (12px). Warning variant background corrected to `var(--palette-bread)` with `type-secondary` text.
- **Accordion** — container border/radius removed (uses dividers only). Title font changed from Inter 500 to SmileyFace Bold 16px. Body background from `gray-10` to `#fff`. Padding normalised to `1rem`.
- **Tabs** — font changed from Inter to SmileyFace Bold 16px. Inactive text from `type-tertiary` to `type-primary`. Active indicator from 2px `brand-primary-base` to 3px `action-secondary-base`. Padding normalised to `1rem`.
- **Radio/Toggle items** — border colour `gray-40` → `gray-50`, radius 8px, padding 12px/16px.

### Typography overhaul

The full type scale was re-measured against Figma and corrected:

- Display sizes reduced (headline 3rem→2.5rem, display-lg 2.5rem→2rem, display 2rem→1.5rem, title-lg 1.375rem→1.25rem, title 1.125rem→1rem, title-sm 1rem→0.875rem).
- Line-heights unified: all SmileyFace headings at `1.25`, all Inter body at `1.625`.
- Links (`t-link`, `t-link-sm`) corrected to `font-weight: 500` (Medium).
- SmileyFace minimum lowered from 16px to 14px (`t-title-sm`).
- `kit/anti-patterns.md` and typography rules updated to match.

### Design token audit page

- **New file: [`examples/design-token-audit.html`](./examples/design-token-audit.html)** — renders every token (colours, spacing, radii, shadows) and every component variant in every state. Built for Figma "Check Designs" overlay validation in a single pass.

### Example pages updated

All existing examples (`accountDashboard`, `categoryPage`, `checkout`, `componentLibrary`, `orderConfirmation`, `patternsGallery`, `productPage`) updated with corrected CSS: new action token values, 8px button radius, 1px borders, corrected input/notice/accordion/tab styles.

### Tests

- Token-consistency and preservation test suites both pass (16/16).

### Known gaps (deferred to v3)

- Header/Nav variants from Figma (multiple viewport variants).
- Footer component (not currently in kit).
- Full typography scale cascade into all example HTML files.

v3 will begin once the kit is renamed and packaged as a Kiro Power.

---

## v2.0.1 — 2026-05-18

- **RadioButton coverage.** [`kit/components.md`](./kit/components.md) §5 rewritten to match the AO Storybook component: adds `pill` and `inline` variants, `full-width` group, hidden-legend pattern, multi-line content (e.g. day-picker with 3 lines per option), and full selected / focus / disabled state styling. Prototypes were rendering the wrong selection visuals because these were missing.
- **Recommended-card pattern.** Added the highlighted radio-card variant (`toggle-item--highlight`) for "popular plan" / "recommended" surfaces — in the AO blue theme. Reiterates that green is reserved for the primary CTA.
- **`data-aods` naming aligned.** `radio-button-group`, `radio-button`, `checkbox-group`, `checkbox` — matching Storybook so Code Connect / prototype mapping resolves correctly. [`kit/patterns.md`](./kit/patterns.md) checkout add-ons block updated to match.

## v2.0 — 2026-05-15

The first **shareable** version of the AO Figma Make kit. Restructured from scratch around three problems v1 couldn't solve.

### What v1 got wrong

1. **AI drift.** Frames pasted from Figma into Make produced output that drifted from the designer's intent — wrong greens, invented variants, type hierarchy slipping. There was no anchored source of truth Make would consistently honour.
2. **No confident dev path.** Designers couldn't take a Make output to engineering and have a productive conversation, or push it further into prototyping — too many invented details to untangle, and no clear mapping back to `@ao/components`.
3. **The files were a mess.** Provenance unclear, contents not documented, even the maintainer wasn't fully sure what was in them or how they fit together.

### What changed in v2

- **Workflow: attach the kit, paste a short prompt.** Designers no longer paste a big system block into every chat. The `kit/` folder is attached once to a Figma Make project; the [`MASTER_PROMPT.md`](./MASTER_PROMPT.md) is short, editable, and references the attached files by name.
- **Authoritative reference files** in [`kit/`](./kit/): tokens, typography, components, patterns, anti-patterns, plus DTCG tokens for variable wiring. Each file states its scope and how it's used.
- **Anti-patterns are first-class.** [`kit/anti-patterns.md`](./kit/anti-patterns.md) is a refuse-and-replace list — Make is instructed to treat it as a hard constraint, not a guideline.
- **Dev handoff is built in.** [`handoff.md`](./handoff.md) provides a class-to-`@ao/components` translation table and a short script for handing prototypes to engineering. Designers can ship a Make prototype as the visual reference for a Linear ticket with no extra explainer.
- **Examples are first-class too.** [`examples/`](../examples/) has rendered HTML for the PDP, component library, and pattern gallery so designers can visually compare Make output against a working AO surface.
- **Brand intent is enforced.** Token usage rules (e.g. `palette-heat` is *not* an error colour; `ui-warning` is for caution only) are spelled out where Make will see them.

### What's the same

- The visual language. The tokens, fonts, components, and patterns documented here are the same ones in production at ao.com.

### How v2 sits next to other AO design system assets

| Asset | Role |
|---|---|
| AO Design System Figma library | The canonical visual source of truth. This kit mirrors it. |
| `@ao/components` (React library) | The canonical code implementation. This kit's blueprints map 1:1 to its exports. |
| `@ao-internal/design-tokens` | The canonical token source. [`kit/tokens.json`](./kit/tokens.json) mirrors it in DTCG. |
| This kit | The bridge that gets designers from Figma Make to a working, on-system prototype. |
