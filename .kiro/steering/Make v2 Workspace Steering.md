---
inclusion: always
---

# AO Figma Make Kit v2 — Workspace Rules

## Project Purpose

This workspace is a design system kit for **Figma Make** (Figma's AI code-generation tool). It produces self-contained HTML prototypes that are strict to the AO (ao.com) design system. Output is intended to be handed directly to developers — class names, token names, and `data-aods` selectors map 1:1 to the production `@ao/components` React library.

## Output Format

- Single self-contained HTML file with inline `<style>` block
- Semantic HTML (`<nav>`, `<main>`, `<section>`, `<button>`, `<label>`)
- Mobile-first layout with breakpoints: `sm: 544px`, `md: 768px`, `lg: 990px`, `xl: 1200px`
- Every generated stylesheet includes the `:root` token block from `kit/tokens.md` and the `@font-face` block from `kit/typography.md`
- Every generated HTML includes the Strata icons stylesheet: `<link rel="stylesheet" href="https://assets.ao.com/design-system/assets/icons/latest/strata-icons.css">`

## Token Rules (Non-Negotiable)

- Every colour, spacing, radius, and shadow value references a token by name — never raw hex
- Spacing uses the 4px-base scale only: 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64px. No intermediate values.
- Radii: `xs` (4px) for tags/chips, `sm` (8px) for buttons/inputs, `md` (16px) for cards/modals, `xl` (24px) for large containers, `2xl` (40px) for pills
- Shadows via CSS variables only: `--shadow`, `--shadow-md`, `--shadow-lg`, `--shadow-xl`

## Typography Rules

- Two fonts only: **SmileyFace** (headings + all button labels) and **Inter** (everything else)
- SmileyFace never below 14px (`t-title-sm`). Below that, use Inter.
- Buttons always use `t-cta` (SmileyFace Bold 16px). No exceptions.
- Body minimum: Inter 400 at 16px
- Colour roles: headings → `type-primary`, body → `type-secondary`, supporting → `type-tertiary`

## Component Rules

- Use blueprints from `kit/components.md` verbatim — class names match Strata production classes
- Every component root carries `data-aods="component-name"` for E2E targeting
- Approved button variants only: `primary`, `secondary`, `tertiary`, `link`, `white`, `dark`
- Approved tag groups only: `core`, `neutral`, `highlight`, `success`, `warning`, `error`, `light`, `dark`
- Buttons use `border-radius: var(--radius-sm)` (8px) with a 1px border — never override
- One `btn-primary` per visual section. Demote additional actions to `secondary` or `tertiary`.
- Verb-first CTA labels: "Add to basket", "Check availability" — never "Submit", "OK", "Click here"

## Accessibility Floor (WCAG 2.1 AA)

- Focus rings on every interactive element (never suppress `:focus-visible`)
- `aria-invalid="true"` on error inputs, `aria-describedby` linking to the error message
- Visible `<label>` always — placeholder is never a label
- Icon-only buttons require `aria-label`
- Decorative icons get `aria-hidden="true"`
- Colour is never the sole indicator of state — pair with icon, weight and/or text

## Anti-Pattern Enforcement

Before producing output, check against `kit/anti-patterns.md`. Key refusals:
- No invented variants (no `btn-success`, `tag-purple`)
- No hardcoded hex — always token references
- No Inter on buttons, no SmileyFace below 14px
- No multiple primary CTAs in a section
- No cards nested more than one level deep
- No `palette-*` tokens for functional UI states (those are decorative only)
- `brand-primary-base` (#12c35a) is a glow/accent — the button colour is `action-primary-base` (#00893e)

## File Reference Guide

| File | When to consult |
|---|---|
| `kit/tokens.md` | Choosing any colour, spacing, radius, or shadow value |
| `kit/typography.md` | Setting font, size, weight, or line-height |
| `kit/icons.md` | Using any icon — class names, sizes, accessibility rules |
| `kit/components.md` | Building any UI component (buttons, inputs, cards, etc.) |
| `kit/patterns.md` | Assembling a full page layout (PDP, basket, sign-in, etc.) |
| `kit/anti-patterns.md` | Validating output doesn't violate system rules |
| `kit/tokens.json` | DTCG token source for variable wiring or dev handoff |
| `handoff.md` | Translating prototype classes to `@ao/components` React props |

## Brand Voice

Energetic, trustworthy, human. Clear and warm, never shouty. One clear action per moment. Commercial but not cheap — whitespace signals quality.

Not: John Lewis (too cold), Currys (too loud), Apple (too sterile), marketplace (too chaotic), trade supplier (too corporate).