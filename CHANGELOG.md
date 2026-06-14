# Changelog

## v2.3.1 — 2026-06-15

Repository cleanup — consolidated output directories, archived completed specs, and tidied git tracking.

### Structure changes

- **Prototypes consolidated into `examples/`** — moved `bottom-sheet-variants.html`, `checkout-flow.html`, `login-flow.html` from `prototypes/`, and `trust-bridge-prototype/index.html` → `examples/trust-bridge-prototype.html`. Removed empty source directories.
- **Completed specs archived** — `checkout-flow-prototype` and `design-token-audit` moved to `.kiro/specs/_archive/`.
- **`.DS_Store` removed from git tracking** — already in `.gitignore`, now also untracked in the index.

### Documentation updates

- **README** — "Repo layout" tree updated to reflect consolidated `examples/` (18 HTML files). Removed outdated symlink note.
- **Steering file** — `fileMatchPattern` simplified to `['**/examples/**/*.html']`.
- **CHANGELOG** — fixed a stale `prototypes/` path reference.

---

## v2.3.0 — 2026-06-14

Checkout flow prototype — the first full interactive prototype generated from the kit.

### Checkout flow prototype

- **New file: [`examples/checkout-flow.html`](./examples/checkout-flow.html)** — a 2,300-line self-contained HTML prototype implementing a complete three-step checkout (Delivery → Contact Details → Payment).
- **Address lookup flow** — progressive disclosure: postcode entry → simulated dropdown → confirmed address card with edit option.
- **Delivery options** — date and time picker selects, conditional visibility after address confirmation.
- **Five Star upsell** — membership card with benefits list, checkbox toggle, bottom-sheet modal if user tries to skip.
- **Contact details** — email, title, name, phone fields with validation states.
- **Payment step** — card/finance method switcher, card entry form, billing address toggle, terms acceptance.
- **Order summary sidebar** — sticky on desktop, dynamic recalculation (product + delivery + Five Star = total), tabular-nums formatting.
- **Bottom sheet modal** — slide-up animation, scrim overlay, focus trap, Escape key handling, `role="dialog"` + `aria-modal`.
- **Step navigation** — pill-style tabs with active/completed/unreached states, `role="tablist"` + `aria-selected`, back-navigation to completed steps.
- **Form validation** — per-field validation on blur, multiple-error highlighting on submit, `aria-invalid` + `aria-describedby` linking.
- **Responsive** — two-column at ≥900px, single-column mobile, collapsed step labels at <544px, full-width buttons.
- **Accessibility** — focus-visible indicators, logical tab order, `aria-live` for total updates, `prefers-reduced-motion` respected.

### Spec completed

- Full requirements, design, and implementation tasks for checkout flow documented in `.kiro/specs/checkout-flow-prototype/`. All implementation tasks marked complete (property-based tests deferred as optional).

### Known gaps (deferred to v3)

- Property-based tests for checkout (order total, email validation, phone validation, step navigation, address state machine, payment exclusion, focus trap) — marked optional in spec.
- Full typography scale cascade verification across all examples.

v3 will begin once the kit is renamed and packaged as a Kiro Power.

---

## v2.2.0 — 2026-06-12

Icon system, further Figma alignment corrections, new showcase examples, and groundwork for packaging as a Kiro Power.

### Icon system added

- **New file: [`kit/icons.md`](./kit/icons.md)** — documents the Strata icon font (loaded from AO CDN), usage patterns, sizing classes (`ico-xs` through `ico-3x`), accessibility rules, and a full reference of available icon names.
- **All emoji/Unicode symbols replaced with Strata icons** across `kit/components.md`, `kit/patterns.md`, and all example HTML files. Notices now use `<i class="ico ico-info">`, `<i class="ico ico-tick-circle">`, etc.
- **Anti-pattern added:** using emoji/Unicode symbols (☰, 🔍, ✓, ✗, ⚠) for icons is now a listed refusal — use Strata icon font instead.
- **Steering updated:** `kit/icons.md` added to the file reference guide; Strata icons stylesheet required in every generated HTML.

### Component corrections (second pass)

- **Buttons** — default vertical padding corrected `0.6875rem` → `0.875rem` (14px). Size variants: `btn-lg` padding `0.9375rem` → `1.125rem`, `btn-sm` padding `0.4375rem` → `0.6875rem`. Icon buttons now use Strata icon font.
- **Inputs** — fixed height `48px` with `padding: 0 0.875rem` (was flexible padding). Field label weight `500` → `400`.
- **Toggle items** — custom radio/checkbox styling replacing native `accent-color`. Now renders custom 20px circles/squares with SVG checkmark and inner-dot pattern on selection. Padding increased to `1rem 1.125rem`. Pill variant padding `1rem 1.25rem`.
- **Notices** — icon markup changed from `<i class="notice-icon">✓</i>` to `<i class="ico ico-tick-circle notice-icon" aria-hidden="true"></i>`.
- **Nav** — logo changed from text span to icon-based `<a>` with `ico-ao-logo`. Full header/nav component rewritten with desktop mega-menu and mobile drawer patterns.
- **Footer** — expanded with link columns and legal copy structure.

### Typography correction

- Links (`t-link`, `t-link-sm`) weight corrected from `500` (Medium) to `700` (Bold) per Figma library.

### New examples

- **[`examples/index.html`](./examples/index.html)** — prototype gallery landing page linking all examples.
- **[`examples/kitShowcase.html`](./examples/kitShowcase.html)** — full Samsung Bespoke product page demonstrating all kit components working together with Strata icons.
- **[`examples/headerDemo.html`](./examples/headerDemo.html)** — isolated header component matching the live ao.com site.
- **[`examples/iconLibrary.html`](./examples/iconLibrary.html)** — visual reference of all available Strata icons at various sizes.

### Example pages updated

All existing examples updated with: Strata icons stylesheet link, icon font replacing emoji/Unicode, corrected button padding, 48px fixed-height inputs, custom toggle styling, and bold link weight.

### New spec started

- **Checkout flow prototype** — requirements document drafted (`.kiro/specs/checkout-flow-prototype/requirements.md`). Three-step checkout with address lookup, delivery scheduling, and payment flow.

### Known gaps (deferred to v3)

- ~~Checkout flow prototype implementation (spec drafted, tasks pending).~~ → Completed in v2.3.0.
- Full typography scale cascade verification across all examples.

v3 will begin once the kit is renamed and packaged as a Kiro Power.

---

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
