---
inclusion: fileMatch
fileMatchPattern: ['**/prototypes/**/*.html', '**/examples/**/*.html', '**/trust-bridge-prototype/**/*.html']
---

# Design Best Practices — UI Prototype Generation

Apply these rules when generating or editing HTML prototypes. They layer on top of the workspace steering (tokens, typography, components). When a rule here conflicts with workspace steering, workspace steering wins.

## Decision Priorities (Resolve Conflicts Top-Down)

1. Accessibility compliance (WCAG 2.1 AA)
2. Functional clarity — user always knows where they are and what to do next
3. Visual hierarchy — one dominant element per state
4. Token adherence — no raw values
5. Polish and delight

## Visual Hierarchy

- Each card or screen state has exactly ONE dominant element. Demote everything else via size, weight, or opacity.
- Maintain ≥ 1.25× ratio between adjacent type steps. Combine scale AND weight changes together.
- Use whitespace for grouping and emphasis instead of bordered containers.
- Tight spacing (8–12 px) within related groups; generous separation (48–64 px) between sections. Never apply uniform padding everywhere.
- Vary card sizes and use asymmetric layouts. Do not produce identical repeating card grids.

## Layout

- CSS Grid for page-level two-dimensional structure. Flexbox for single-axis composition (card internals, button rows).
- Never nest cards inside cards. Separate with spacing or dividers.
- Prefer asymmetric arrangements over centre-everything layouts.
- No horizontal overflow on mobile viewports.
- Touch targets: minimum 44 × 44 px.
- When generating multiple design alternatives, vary density via spacing multiplier: `calc(var(--density) * base)`.

## Typography (Additive to Workspace Steering)

- Constrain body text to `max-width: 65ch`.
- Apply `font-variant-numeric: tabular-nums` to numeric data and percentages.
- Apply `text-wrap: balance` to headings.
- On dark backgrounds: increase `line-height` by 0.05–0.1 and add `letter-spacing: 0.01–0.02em`.
- ALL-CAPS labels: add `letter-spacing: 0.05–0.12em`.
- Use `clamp()` sizing only for display/hero text. Use fixed `rem` scales for product UI text.

## UX Writing

- Buttons: specific verb + object ("Continue journey", "View next step"). Never generic ("Submit", "OK").
- Errors: state what happened → why → how to fix.
- Success: confirm the action + state the next step ("Step complete! 3 of 5 done.").
- Empty states: acknowledge → explain value → provide an action.
- Loading: be specific ("Calculating progress…") and set duration expectation when possible.
- Use one term consistently per concept — never alternate synonyms ("step" vs "stage" vs "phase").
- Active voice only. No blame language.

## Interaction & Animation

- Transition duration: 150–300 ms. Easing: `ease-out` (quart/quint/expo curves). Never bounce or elastic.
- Button press: `translateY(1px)` + reduced shadow on `:active`.
- Hover lift: `translateY(-2px)` with `ease-out-quart`.
- Always wrap motion in `@media (prefers-reduced-motion: no-preference) { }`.
- No layout shift on state transitions — reserve space or use absolute positioning for appearing elements.
- Define all 8 states for every interactive element: default, hover, focus-visible, active, disabled, loading, error, success.

## Completion & Progress Delight

- Checkmark draw animation on task completion.
- Confetti burst for major milestones (< 1 s duration, then remove from DOM).
- Gentle scale + fade for step confirmations.
- Skeleton screens over spinners for content loading.
- Progress bars celebrate at 100% (colour shift or glow pulse).
- Show personalised position context: "You completed step 3 of 5!"
- Delight animations must never delay or block core functionality.

## Banned Patterns

Do not produce any of the following:

- Gradient backgrounds used as decoration
- Glassmorphism / frosted-glass effects
- Hero-metric dashboard templates
- Side-stripe accents
- Gradient text
- Identical repeating card grids with no variation
- Bounce or elastic easing

## Output Validation Checklist

Before finalising, verify:

- [ ] Squint test — primary action, secondary content, and groupings identifiable when blurred
- [ ] No banned patterns present
- [ ] Exactly 1 primary CTA per visual section
- [ ] User's position or progress in a journey is always visible
- [ ] All touch targets ≥ 44 px
- [ ] `:focus-visible` on every interactive element
- [ ] Spacing uses design-token scale with deliberate rhythm variation
- [ ] Type hierarchy has clear contrast between adjacent levels (size + weight)
- [ ] Colour serves function, not decoration
- [ ] All relevant states represented (progress, complete, next-steps, error, empty)
- [ ] Transitions ≤ 300 ms, no bounce/elastic easing
- [ ] `prefers-reduced-motion` respected
- [ ] ≤ 4 visible competing actions per decision point

## Issue Severity

| Level | Meaning | Action |
|-------|---------|--------|
| P0 | Blocks task completion | Fix before output |
| P1 | Causes user confusion | Fix before handoff |
| P2 | Annoyance with workaround | Fix in next pass |
| P3 | Polish only | Fix if time permits |
