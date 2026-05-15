# Changelog

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
