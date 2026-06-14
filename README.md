# AO Figma Make Kit · v2

A drop-in kit that makes Figma Make output match the AO design system — so designers can build working prototypes, generate examples, and ideate freely without drifting from the library.

> **For:** AO UX designers using Figma Make
> **Goal:** Outputs that are strict to the AO Figma design system library — close enough to hand to a developer with confidence.

---

## How to use the kit

It's two steps. Both happen once per Figma Make project.

### 1. Attach the kit files to your Figma Make project

Drag the entire contents of [`kit/`](./kit/) into your Figma Make project as attached references. These files become persistent context for every prompt you write in that project.

What's inside:

| File | What it does |
|---|---|
| [`kit/tokens.md`](./kit/tokens.md) | Colour, spacing, radius, shadow tokens — with usage intent |
| [`kit/typography.md`](./kit/typography.md) | SmileyFace + Inter, the scale, and the `@font-face` block |
| [`kit/components.md`](./kit/components.md) | HTML + CSS blueprints for every component (button, input, card, …) |
| [`kit/patterns.md`](./kit/patterns.md) | Page-level recipes (sign in, basket, PDP, validated form) |
| [`kit/anti-patterns.md`](./kit/anti-patterns.md) | The refuse-and-replace list — what Make should *never* output |
| [`kit/tokens.json`](./kit/tokens.json) | DTCG tokens — useful for wiring Figma variables or sharing with engineering |

### 2. Paste the master prompt

Open [`MASTER_PROMPT.md`](./MASTER_PROMPT.md), copy it, and paste it as your first message in the Figma Make project. Edit the editable section at the bottom to describe what you're building this session.

That's it. You're ready to prompt.

---

## What you can build

| Use case | What to prompt | Result |
|---|---|---|
| **Working prototype** | *"Build a delivery check screen with postcode input, error state, and a submit button."* | Functional, AO-styled HTML you can interact with |
| **Worked example** | *"Show me a basket page with two items, summary card, and checkout CTA."* | A complete pattern you can paste back into Figma or use as a spec |
| **Ideation** | *"Three alternative layouts for the post-purchase confirmation screen."* | Variations — all on-brand, all using real tokens |
| **Iteration** | *"Same screen, but make the primary CTA full-width and move the price above the title."* | A precise edit, no drift |

When the output drifts (wrong colour, invented variant, Inter on a button), quote the offending element back to Make and reference the relevant file: *"Use the AO `btn-primary` blueprint from `kit/components.md`."*

---

## Why v2 exists

v1 was a starting point, but it had three real problems:

1. **AI drift.** When designers pasted Figma frames into Make, the output was often loose with the designer's intent — colours shifted, variants got invented, type hierarchy slipped. There was no anchored source of truth Make would honour.
2. **Couldn't progress with confidence.** Designers had no clean way to take a Make output into a conversation with developers or push it further into prototyping — too many invented details to untangle.
3. **The original files were a mess.** Provenance was unclear, the contents weren't well-described, and even the maintainer wasn't fully sure what was in them or how they fit together.

v2 fixes those:

- The **master prompt + attached kit** locks Make to AO tokens, components, and patterns up front — drift becomes the exception, not the default.
- Output is **dev-ready** because everything maps to real `@ao/components` names, `data-aods` selectors, and DTCG tokens. See [`handoff.md`](./handoff.md).
- The kit is **structured and named clearly** — every file states what it is, what it's for, and when to reach for it.

---

## Repo layout

```
ao-figma-make-v2/
├── README.md             ← you are here
├── MASTER_PROMPT.md      ← paste into Figma Make at the start of a project
├── handoff.md            ← how to take Make output to a dev conversation
├── kit/                  ← attach all of these to your Figma Make project
│   ├── tokens.md
│   ├── typography.md
│   ├── components.md
│   ├── patterns.md
│   ├── anti-patterns.md
│   └── tokens.json
├── output/               ← open these in a browser to see the system rendered
│   ├── examples/         ← stable, polished showcases
│   │   ├── productPage.html
│   │   ├── componentLibrary.html
│   │   ├── patternsGallery.html
│   │   └── …
│   └── prototypes/       ← in-progress explorations
│       ├── checkout-flow.html
│       ├── login-flow.html
│       ├── bottom-sheet-variants.html
│       └── trust-bridge-prototype.html
└── tests/                ← token consistency and preservation tests
```

---

## Rules of engagement

These are non-negotiable. They are also enforced in [`kit/anti-patterns.md`](./kit/anti-patterns.md):

1. **Never invent variants.** If `Button` doesn't have a `success` variant, your mock can't either.
2. **Never hardcode hex.** Use token names (`action-primary-base`) or Strata classes (`btn-primary`).
3. **One primary CTA per visual section.** Multiple primaries break hierarchy.
4. **Verb-first CTAs.** "Add to basket" not "Basket".
5. **WCAG AA is the floor.** Even in mocks — designers see screenshots before engineers do.

---

## Version

**v2.0** · 2026-05-15 · Maintained by AO Design Systems

See [`CHANGELOG.md`](./CHANGELOG.md) for what changed since v1.
