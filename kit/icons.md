# AO Icon System — Strata Icons

> Icon font loaded from the AO CDN. Class-based usage matching the production `@ao/components` library.

## Setup

Every generated HTML file must include this stylesheet link in the `<head>`:

```html
<link rel="stylesheet" href="https://assets.ao.com/design-system/assets/icons/latest/strata-icons.css">
```

## Usage

Icons use an `<i>` element (or `<span>`) with two classes: the base `ico` class plus the icon name class.

```html
<i class="ico ico-basket" aria-hidden="true"></i>
```

### Accessibility

- **Decorative icons** (paired with visible text): add `aria-hidden="true"`
- **Meaningful icons** (icon-only buttons): omit `aria-hidden`, add `aria-label` on the parent button

```html
<!-- Decorative — text provides meaning -->
<button class="btn btn-primary" data-aods="button">
  <i class="ico ico-basket" aria-hidden="true"></i>
  Add to basket
</button>

<!-- Meaningful — icon-only button -->
<button class="btn btn-tertiary btn-icon" data-aods="button" aria-label="Close">
  <i class="ico ico-close"></i>
</button>
```

## Sizes

| Class | Scale | Use |
|-------|-------|-----|
| `ico-xs` | 0.75em | Inline with small text |
| `ico-sm` | 0.875em | Inline with body text |
| _(default)_ | 1em | Standard UI icons |
| `ico-lg` | 1.25em | Nav icons, card icons |
| `ico-xl` | 1.5em | Feature callouts |
| `ico-2x` | 2em | Hero features |
| `ico-3x` | 3em | Empty states, illustrations |

## UI Icon Reference

Icons used in standard AO UI patterns. Use these names — don't substitute alternatives.

### Navigation & Actions

| Icon | Class | Usage |
|------|-------|-------|
| AO Logo | `ico-ao-logo` | Header logo (the smiley-face "ao" mark) |
| Menu | `ico-menu` | Hamburger / mobile nav toggle |
| Search | `ico-search` | Search input, search button |
| Close | `ico-close` | Close/dismiss modals, drawers, notices |
| Account | `ico-account` | User account link |
| Basket | `ico-basket` | Shopping basket link |
| Track order | `ico-track-your-order` | Order tracking link |
| Home | `ico-home` | Home navigation |
| Chevron down | `ico-chevron-down` | Dropdowns, accordion expand |
| Chevron up | `ico-chevron-up` | Accordion collapse |
| Chevron right | `ico-chevron-right` | Breadcrumb separator, forward nav |
| Chevron left | `ico-chevron-left` | Back navigation |
| Settings | `ico-settings` | Settings/preferences |
| Share | `ico-share` | Share actions |
| Exit | `ico-exit` | Sign out |

### Status & Feedback

| Icon | Class | Usage |
|------|-------|-------|
| Tick | `ico-tick` | Success confirmation inline |
| Tick circle | `ico-tick-circle` | Success notice, completed state |
| Warning | `ico-warning` | Warning notice |
| Info | `ico-info` | Information notice, tooltips |
| Cancel circle | `ico-cancel-circle` | Error notice |
| Cancel | `ico-cancel` | Error inline |
| Question circle | `ico-question-circle` | Help / FAQ |

### Commerce

| Icon | Class | Usage |
|------|-------|-------|
| Delivery | `ico-delivery` | Delivery information |
| Free delivery | `ico-free-delivery` | Free delivery badge |
| Next day delivery | `ico-next-day-delivery` | Next-day promise |
| Click and collect | `ico-click-and-collect` | Collection option |
| Returns | `ico-returns` | Returns policy |
| Calendar | `ico-calendar` | Date/slot picker |
| Card | `ico-card` | Payment method |
| Finance | `ico-finance-gbp` | Finance options |
| Gift | `ico-gift` | Gift/promo |
| Tag | `ico-tag` | Offer/promotion tag |
| Price match | `ico-price-match-gbp` | Price match promise |
| Recycling | `ico-recycling` | Recycling/take-back |
| Installation | `ico-installation` | Installation service |
| Protection | `ico-protection` | Warranty/care plan |

### Communication

| Icon | Class | Usage |
|------|-------|-------|
| Call | `ico-call` | Phone contact |
| Mail | `ico-mail` | Email |
| Chat | `ico-chat` | Live chat |
| Live chat | `ico-live-chat` | Chat support |
| Notification | `ico-notification` | Alerts/notifications |

### Content & Media

| Icon | Class | Usage |
|------|-------|-------|
| Play | `ico-play` | Video play |
| Picture | `ico-picture` | Image/gallery |
| Camera | `ico-camera` | Photo upload |
| Enlarge | `ico-enlarge` | Zoom/expand |
| 360 degrees | `ico-360-degrees` | 360° view |
| AR | `ico-ar` | Augmented reality |

### Utility

| Icon | Class | Usage |
|------|-------|-------|
| Add | `ico-add` | Add/plus |
| Add circle | `ico-add-circle` | Add (circled) |
| Subtract | `ico-subtract` | Remove/minus |
| Subtract circle | `ico-subtract-circle` | Remove (circled) |
| Edit | `ico-amend-edit` | Edit/amend |
| Copy | `ico-copy` | Copy to clipboard |
| Delete | `ico-trashcan` | Delete/remove |
| Download | `ico-download` | Download file |
| Print | `ico-print` | Print |
| Refresh | `ico-refresh` | Reload/retry |
| Lock | `ico-lock` | Secure/locked |
| Show | `ico-show` | Show password/reveal |
| Hide | `ico-hide` | Hide password |
| Heart | `ico-heart` | Wishlist/favourite |
| Star | `ico-star` | Rating star |
| Compare | `ico-compare` | Compare products |
| Grid | `ico-grid` | Grid view |
| List | `ico-list` | List view |
| Location | `ico-location` | Store locator, address |
| Link | `ico-link` | External link |
| Document | `ico-document` | Document/PDF |
| Reviews | `ico-reviews` | Customer reviews |
| More | `ico-more` | Overflow/more actions |

## Mapping from Legacy Emoji Placeholders

If you encounter emoji icons in older kit files or prototypes, replace them:

| Emoji | Replace with |
|-------|-------------|
| ☰ | `<i class="ico ico-menu" aria-hidden="true"></i>` |
| 🔍 | `<i class="ico ico-search" aria-hidden="true"></i>` |
| 👤 | `<i class="ico ico-account" aria-hidden="true"></i>` |
| 🛒 | `<i class="ico ico-basket" aria-hidden="true"></i>` |
| 📦 | `<i class="ico ico-track-your-order" aria-hidden="true"></i>` |
| ✓ | `<i class="ico ico-tick" aria-hidden="true"></i>` |
| ✕ / ✗ | `<i class="ico ico-close" aria-hidden="true"></i>` |
| ⚠ | `<i class="ico ico-warning" aria-hidden="true"></i>` |
| ℹ | `<i class="ico ico-info" aria-hidden="true"></i>` |
| ▼ | `<i class="ico ico-chevron-down" aria-hidden="true"></i>` |
| › | `<i class="ico ico-chevron-right" aria-hidden="true"></i>` |
| + | `<i class="ico ico-add" aria-hidden="true"></i>` |
| − | `<i class="ico ico-subtract" aria-hidden="true"></i>` |

## Rules

- Never use raw emoji or Unicode symbols for icons in prototypes — always use Strata icon classes
- Icon colour inherits from the parent's `color` property. Override with utility classes or direct styling only when needed.
- Icons inside buttons sit before the label text with a `0.5rem` gap (handled by `.btn` flex gap)
- The icon font is decorative by default — always pair with `aria-hidden="true"` unless the icon is the sole communicator of meaning
- Don't use icons as the sole indicator of state — pair with text, weight, or colour (WCAG)
