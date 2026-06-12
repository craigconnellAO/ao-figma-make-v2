# AO Anti-patterns — Refuse and Replace

> If a request, generated output, or pasted Figma frame would force any of the below, **stop and use the listed AO-correct alternative**. This is the most important file in the kit for preventing AI drift.

The pattern: **Match → Refuse → Replace.**

If you see the "Don't" on the left in input or output, refuse to produce it, explain why in one sentence, and use the "Do" on the right.

---

## Colour & tokens

| ❌ Don't | ✅ Do |
|---|---|
| `background: #00893e;` | `background: var(--action-primary-base);` |
| `color: #011f44;` | `color: var(--type-primary);` |
| `border-color: #d6dddf;` | `border-color: var(--gray-40);` |
| Invent a new colour to match a Figma comp | Find the closest token. If genuinely none fits, surface the ambiguity — don't invent. |
| Use `palette-heat` (#f96155) for an error state | Use `ui-error` tokens (background `#fff0f6`, text `#b50016`). |
| Use `palette-toast` for "limited stock" | Use `ui-warning` tokens. |
| Use `brand-primary-base` (#12c35a) as a button fill | The button colour is `action-primary-base` (#00893e). Brand green is a *glow / accent* colour. |

---

## Component variants

| ❌ Don't | ✅ Do |
|---|---|
| `<Button variant="success">` | Approved variants only: `primary` `secondary` `tertiary` `link` `white` `dark`. There is no `success` variant. |
| `<Button variant="green">` or `="red">` | See above — semantic name, not colour name. |
| `<Tag color="purple">` | Tags only support `ui-*` groups: `core` `neutral` `highlight` `success` `warning` `error` `light` `dark`. |
| Custom rounded-square buttons | Buttons are pills — `border-radius: 9999px`. Don't change it. |
| Buttons without a 2px border | The 2px border is part of the AO button identity, including on filled variants. |

---

## Typography

| ❌ Don't | ✅ Do |
|---|---|
| Inter on a button label | Always `t-cta` / SmileyFace Bold on `<button>`. No exceptions. |
| SmileyFace at 0.75rem (12px) | SmileyFace minimum is `t-title-sm` (14px / 0.875rem). Below that, switch to Inter. |
| `font-weight: 300` on body | Inter 400 is the minimum body weight. |
| `text-transform: uppercase` on CTAs | AO buttons are sentence-case verbs. |
| ALL CAPS LABELS in tags or buttons | Sentence case. |
| `Arial`, `Helvetica`, `system-ui` as the primary font | The two AO families are SmileyFace and Inter. System fonts only as fallbacks. |

---

## Layout & hierarchy

| ❌ Don't | ✅ Do |
|---|---|
| Two `btn-primary` in the same visual section | One primary CTA per section. Demote the second to `secondary`. |
| Three or more parallel CTAs ("Buy", "Save", "Compare", "Share") | Maximum two visible CTAs. Move the rest to a menu or a Notice. |
| Putting validation errors above the field | Errors go **below** the input, with `aria-describedby` linking them. |
| Using placeholders as labels | Always a visible `<label>`. Placeholders show formatting hints. |
| Stacking cards inside cards inside cards | Maximum one level of card nesting. |
| Hero text at `t-display-headline` AND a `t-display-lg` in the same section | One display-level heading per section. |

---

## CTA copy

| ❌ Don't | ✅ Do |
|---|---|
| "Submit" | "Check availability", "Confirm order", "Add to basket" — verb + object |
| "Click here" | Specific verb: "Read the delivery guide" |
| "OK" / "Cancel" on a destructive modal | "Yes, cancel order" / "Keep order" — the action stated outcome |
| "Learn more" with no context | "Read the delivery guide" — what is the user about to learn? |
| Two-word polite verbs ("Please continue") | Direct verbs ("Continue") |

---

## Accessibility

| ❌ Don't | ✅ Do |
|---|---|
| Icon-only buttons with no `aria-label` | Always include `aria-label="…"` |
| Form inputs with no `<label>` | Always pair an input with a visible label |
| Error inputs without `aria-invalid="true"` | Auto-applied; ensure it's present in your output |
| Decorative icons without `aria-hidden="true"` | Add it. Icons paired with text are decorative. |
| Removing focus outlines | Keep `:focus-visible` styling on every interactive element |
| Colour-only state indication ("the green row is approved") | Pair colour with an icon and/or text |

---

## Surfaces & shadows

| ❌ Don't | ✅ Do |
|---|---|
| `box-shadow: 0 2px 4px rgba(0,0,0,0.1);` | `box-shadow: var(--shadow);` (or `--shadow-md`, `--shadow-lg`, `--shadow-xl`) |
| Heavy drop shadows for emphasis | AO shadows are subtle. Use the token. Use elevation to communicate *layer*, not importance. |
| Drop shadow on a flat card on the page background | Cards on the page have a 1px `gray-40` border and no shadow. `card-raised` is only for floating surfaces. |
| Mixing radius values within one component | One radius per component: buttons pill, cards 16px, tags pill, inputs 8px. |

---

## Spacing

| ❌ Don't | ✅ Do |
|---|---|
| `padding: 14px;` | Pick from the scale: 12px or 16px. No intermediate values. |
| `gap: 10px;` | 8px or 12px. |
| Mobile padding the same as desktop | Mobile defaults: 8px gutters, 16px from `sm:` upward. |
| Cramped form fields | `gap: 1rem` between fields in a stack. `gap: 0.25rem` between label, input, and message inside one field. |

---

## Imagery

| ❌ Don't | ✅ Do |
|---|---|
| Stock photography that doesn't match AO's product range | If unsure, use a plain neutral background. Don't invent products. |
| Lifestyle photography with people in luxury settings | AO is for real homes. Imagery is product-led; lifestyle is warm and unstaged. |
| Product images on coloured backgrounds | Product images on `#fff` or `var(--gray-10)`. Always. |

---

## When in doubt

1. **Prefer fewer things.** Drop the second illustration. Drop the third CTA. Drop the gradient. AO earns trust through restraint.
2. **Prefer whitespace.** Density is earned by context (product pages, data tables). Default to more space, not less.
3. **Prefer the simpler token.** If you can solve a problem with `ui-core` instead of a state colour, do it.
4. **Surface the ambiguity, don't invent.** If the request doesn't fit any pattern, say so and ask. Don't produce a plausible-but-non-AO answer.
