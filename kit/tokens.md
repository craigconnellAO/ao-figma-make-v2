# AO Design Tokens

> Authoritative. Every colour, spacing value, radius, and shadow in your output must reference a token from this file. No raw hex. No invented values.

Tokens are organised into four layers. Pick from the **right layer for the job**:

| Layer | What it's for | Example |
|---|---|---|
| **Primitives** | Raw palette swatches — only used by the layers below | `gray-40`, `brand-primary-base`, `palette-toast` |
| **Typography** | Text colour roles | `type-primary` for headings, `type-secondary` for body |
| **Action** | Interactive states (buttons, links) | `action-primary-base`, `action-secondary-hover` |
| **UI Surface** | Semantic backgrounds, borders, validation states | `ui-success`, `ui-error`, `ui-highlight` |

If you're picking a colour by hex, you're doing it wrong — find the right token by intent.

---

## 1 · Primitives

### Neutrals — borders, backgrounds, secondary text

Cool-tinted gray scale anchored by deep navy.

| Token | Hex | Use |
|---|---|---|
| `gray-10` | `#f8f9fa` | Page background, subtle dividers |
| `gray-20` | `#f0f2f2` | Neutral surface backgrounds |
| `gray-30` | `#e2e7e8` | Hover states on neutral surfaces |
| `gray-40` | `#d6dddf` | Default borders, dividers |
| `gray-50` | `#c1c7c9` | Disabled borders |
| `gray-60` | `#abb1b4` | Placeholder text, muted icons |
| `gray-70` | `#727677` | Secondary icons, inactive labels |
| `gray-80` | `#595d5e` | Tertiary text |
| `gray-90` | `#3f4344` | Secondary text, subdued headings |
| `gray-100` | `#212121` | Primary body text on light backgrounds |

### Brand green — primary CTAs and brand moments only

| Token | Hex | Use |
|---|---|---|
| `brand-primary-base` | `#12c35a` | Brand accent, glow states |
| `brand-primary-light` | `#befcc8` | Light green tints, success backgrounds |
| `brand-primary-dark` | `#02422b` | Dark green text on light green |

### Food palette — decorative only

Never used for functional UI states. Named after food concepts. Use for illustration, campaign moments, or decorative accents.

| Token | Hex | Tone |
|---|---|---|
| `palette-bread` | `#ffe3c2` | Warm peach |
| `palette-toast` | `#ffa878` | Amber orange |
| `palette-jam` | `#422439` | Deep plum |
| `palette-simmer` | `#ffd8d2` | Pale blush |
| `palette-heat` | `#f96155` | Coral red |
| `palette-burn` | `#60222f` | Dark crimson |
| `palette-steam` | `#c8d1ff` | Soft periwinkle |
| `palette-ice` | `#4a6dce` | Medium blue |
| `palette-water` | `#011f44` | Deep navy |

> ⚠ Never reach for `palette-heat` to indicate an error. That's `ui-error`. Palette tokens are *decorative* — they don't communicate state.

---

## 2 · Typography colours

Roles for text. Picks from the neutral primitives.

| Token | Hex | Use |
|---|---|---|
| `type-primary` | `#011f44` | Main headings, display text |
| `type-secondary` | `#212121` | Body text, default UI labels |
| `type-tertiary` | `#595d5e` | Supporting text, captions, helper copy |
| `shadow-overlay` | `#011630` | Scrim overlay base |

---

## 3 · Action tokens — for interactive states

Each action role has `base`, `hover`, `focus`, `active`, `contrast` (text on the base), and `glow` (focus ring).

### Primary — green — main CTAs

Strata class: `btn-primary`

| Token | Hex |
|---|---|
| `action-primary-base` | `#008945` |
| `action-primary-hover` | `#00560b` |
| `action-primary-focus` | `#008945` |
| `action-primary-active` | `#02422b` |
| `action-primary-contrast` | `#ffffff` |
| `action-primary-glow` | `#12c35a` |

### Secondary — blue — supporting CTAs

Strata class: `btn-secondary`

| Token | Hex |
|---|---|
| `action-secondary-base` | `#0a64c2` |
| `action-secondary-hover` | `#00318f` |
| `action-secondary-focus` | `#0a64c2` |
| `action-secondary-active` | `#001876` |
| `action-secondary-contrast` | `#ffffff` |
| `action-secondary-glow` | `#40a1f8` |

### Light — white on dark surfaces

Strata class: `btn-white`

| Token | Hex |
|---|---|
| `action-light-base` | `#ffffff` |
| `action-light-contrast` | `#011f44` |
| `action-light-glow` | `#40a1f8` |

### Dark — navy on light surfaces

Strata class: `btn-dark`

| Token | Hex |
|---|---|
| `action-dark-base` | `#011f44` |
| `action-dark-contrast` | `#ffffff` |
| `action-dark-glow` | `#40a1f8` |

### Inactive — disabled state

Strata class: `btn-inactive`

| Token | Hex |
|---|---|
| `action-inactive-base` | `#727677` |
| `action-inactive-contrast` | `#ffffff` |

---

## 4 · UI surface tokens — for semantic state-driven surfaces

Each group has `base` (background), `contrast` (text), and `accent` (border / icon). Pre-validated for WCAG AA contrast.

| Group | Base | Contrast | Accent | Use |
|---|---|---|---|---|
| `ui-core` | `#ffffff` | `#212121` | `#d6dddf` | Default card / surface |
| `ui-neutral` | `#f0f2f2` | `#212121` | `#abb1b4` | Subdued surfaces |
| `ui-highlight` | `#edf2ff` | `#00318f` | `#00318f` | Selected, promoted, info |
| `ui-success` | `#f4fce3` | `#02422b` | `#00893e` | Confirmation, completion |
| `ui-warning` | `#fff4e6` | `#ad5a00` | `#ff9e36` | Caution only — never decoration |
| `ui-error` | `#fff0f6` | `#b50016` | `#b50016` | Validation errors, destructive |
| `ui-light` | `#ffffff` | `#011f44` | `#ffffff` | Light surface variant |
| `ui-dark` | `#011f44` | `#ffffff` | `#011f44` | Dark surface variant |

Strata class pattern: `text-ui-{group}`, `bg-ui-{group}`, `border-ui-{group}-accent`.

> ⚠ `ui-warning` is for caution states (limited stock, time-sensitive, requires attention). Never use it for decoration.

---

## 5 · Spacing — 4px base unit

| Token | rem | px |
|---|---|---|
| `spacing-1` | 0.25rem | 4px |
| `spacing-2` | 0.5rem | 8px |
| `spacing-3` | 0.75rem | 12px |
| `spacing-4` | 1rem | 16px |
| `spacing-5` | 1.25rem | 20px |
| `spacing-6` | 1.5rem | 24px |
| `spacing-8` | 2rem | 32px |
| `spacing-10` | 2.5rem | 40px |
| `spacing-12` | 3rem | 48px |
| `spacing-14` | 3.5rem | 56px |
| `spacing-16` | 4rem | 64px |

**Component spacing conventions:**

| Context | Value |
|---|---|
| Default card padding | `1rem` (16px), `1.5rem` (24px) at `lg:` |
| Input padding | `0.75rem` (12px) |
| Button horizontal padding | `1rem` (16px) |
| Tag padding | `0.5rem 0.75rem` (8px / 12px) |
| Page container padding | `0.5rem` mobile, `1rem` `sm:` and up |
| Grid gutter | `1rem` (16px) total |

No intermediate values. If you want 14px, you actually want either 12 or 16.

---

## 6 · Border radius

| Token | Value | Use |
|---|---|---|
| `--radius-xs` | `4px` | Tags, chips, small badges |
| `--radius-sm` | `8px` | Buttons, inputs, select |
| `--radius-md` | `16px` | Cards, modals, drawers |
| `--radius-xl` | `24px` | Large surface containers |
| `--radius-2xl` | `40px` | Pills, full-round tags |

---

## 7 · Elevation

Four levels. Always use the CSS variable — never raw `box-shadow`. Shadow colour is derived from `shadow-overlay` (`#011630`, deep navy).

| Token | Use |
|---|---|
| `--shadow` | Cards, default surfaces |
| `--shadow-md` | Raised cards, dropdowns |
| `--shadow-lg` | Modals, drawers |
| `--shadow-xl` | Tooltips |

Focus ring: `0 0 0 4px var(--action-secondary-glow)` applied to all interactive elements. Don't suppress.

---

## 8 · The single `:root` block — paste this into every generated stylesheet

```css
:root {
  /* Neutrals */
  --gray-10: #f8f9fa;  --gray-20: #f0f2f2;  --gray-30: #e2e7e8;
  --gray-40: #d6dddf;  --gray-50: #c1c7c9;  --gray-60: #abb1b4;
  --gray-70: #727677;  --gray-80: #595d5e;  --gray-90: #3f4344;  --gray-100: #212121;

  /* Brand green */
  --brand-primary-base: #12c35a;  --brand-primary-light: #befcc8;  --brand-primary-dark: #02422b;

  /* Typography */
  --type-primary: #011f44;  --type-secondary: #212121;  --type-tertiary: #595d5e;
  --shadow-overlay: #011630;

  /* Action — primary (green) */
  --action-primary-base: #008945;  --action-primary-hover: #00560b;
  --action-primary-focus: #008945;  --action-primary-active: #02422b;
  --action-primary-contrast: #ffffff;  --action-primary-glow: #12c35a;

  /* Action — secondary (blue / Action Main) */
  --action-secondary-base: #0a64c2;  --action-secondary-hover: #00318f;
  --action-secondary-focus: #0a64c2;  --action-secondary-active: #001876;
  --action-secondary-contrast: #ffffff;  --action-secondary-glow: #40a1f8;

  /* Action — light / dark / inactive */
  --action-light-base: #ffffff;  --action-light-contrast: #011f44;  --action-light-glow: #40a1f8;
  --action-dark-base: #011f44;   --action-dark-contrast: #ffffff;   --action-dark-glow: #40a1f8;
  --action-inactive-base: #727677;  --action-inactive-contrast: #ffffff;

  /* UI surface groups (base / contrast / accent) */
  --ui-core-base: #ffffff;       --ui-core-contrast: #212121;       --ui-core-accent: #d6dddf;
  --ui-neutral-base: #f0f2f2;    --ui-neutral-contrast: #212121;    --ui-neutral-accent: #abb1b4;
  --ui-highlight-base: #edf2ff;  --ui-highlight-contrast: #00318f;  --ui-highlight-accent: #00318f;
  --ui-success-base: #f4fce3;    --ui-success-contrast: #02422b;    --ui-success-accent: #00893e;
  --ui-warning-base: #fff4e6;    --ui-warning-contrast: #ad5a00;    --ui-warning-accent: #ff9e36;
  --ui-error-base: #fff0f6;      --ui-error-contrast: #b50016;      --ui-error-accent: #b50016;
  --ui-light-base: #ffffff;      --ui-light-contrast: #011f44;      --ui-light-accent: #ffffff;
  --ui-dark-base: #011f44;       --ui-dark-contrast: #ffffff;       --ui-dark-accent: #011f44;

  /* Food palette — decorative only */
  --palette-bread: #ffe3c2;  --palette-toast: #ffa878;  --palette-jam: #422439;
  --palette-simmer: #ffd8d2; --palette-heat: #f96155;   --palette-burn: #60222f;
  --palette-steam: #c8d1ff;  --palette-ice: #4a6dce;    --palette-water: #011f44;

  /* Radius */
  --radius-xs: 4px;  --radius-sm: 8px;  --radius-md: 16px;
  --radius-xl: 24px; --radius-2xl: 40px;

  /* Shadow */
  --shadow:    0 1px 3px rgba(1,22,48,0.08), 0 1px 2px rgba(1,22,48,0.05);
  --shadow-md: 0 4px 8px rgba(1,22,48,0.10), 0 2px 4px rgba(1,22,48,0.06);
  --shadow-lg: 0 10px 28px rgba(1,22,48,0.13), 0 4px 8px rgba(1,22,48,0.07);
  --shadow-xl: 0 20px 48px rgba(1,22,48,0.18), 0 8px 16px rgba(1,22,48,0.10);
}
```
