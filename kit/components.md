# AO Component Blueprints

> Authoritative HTML + CSS for every AO component. Use these verbatim — class names match Strata and the production `@ao/components` library. Every component root carries a `data-aods="component-name"` attribute for engineering parity.

The CSS in this file assumes the variables from [`tokens.md`](./tokens.md) and the typography setup from [`typography.md`](./typography.md) are already in the document's `:root`.

Components, in order:

1. [Button](#1--button)
2. [Field, Label, Input, InputMessage](#2--field-label-input-inputmessage)
3. [Select](#3--select)
4. [Textarea](#4--textarea)
5. [Checkbox / Radio (toggle items)](#5--checkbox--radio-toggle-items)
6. [Tag](#6--tag)
7. [Notice (info / success / warning / error)](#7--notice)
8. [Card](#8--card)
9. [Breadcrumb](#9--breadcrumb)
10. [Tabs](#10--tabs)
11. [Accordion](#11--accordion)
12. [Quantity stepper](#12--quantity-stepper)
13. [Loading spinner](#13--loading-spinner)
14. [Nav](#14--nav)

---

## 1 · Button

Pill-shaped, SmileyFace Bold label, 2px border. The `primary` variant is reserved for the **one** main CTA per visual section.

**Variants:** `primary` (green) · `secondary` (blue, outlined) · `tertiary` (neutral outline) · `white` (on dark surfaces) · `dark` (alternative primary on light surfaces) · `inactive` (auto-applied when disabled).

**Sizes:** default · `btn-lg` · `btn-sm` · `btn-icon` (square, icon only) · `btn-full` (100% width).

### HTML

```html
<button class="btn btn-primary" data-aods="button">Add to basket</button>
<button class="btn btn-secondary" data-aods="button">View details</button>
<button class="btn btn-tertiary" data-aods="button">Compare</button>
<button class="btn btn-dark" data-aods="button">Sign in</button>
<button class="btn btn-white" data-aods="button">Continue on dark</button>
<button class="btn btn-inactive" data-aods="button" disabled>Out of stock</button>

<!-- Sizes -->
<button class="btn btn-primary btn-lg" data-aods="button">Add to basket</button>
<button class="btn btn-primary btn-full" data-aods="button">Checkout</button>
<button class="btn btn-tertiary btn-icon" data-aods="button" aria-label="Close">✕</button>
```

### CSS

```css
.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem;
  padding: 0.6875rem 1.5rem; border-radius: 9999px;
  font-family: 'SmileyFace', Georgia, serif; font-weight: 700; font-size: 1rem; line-height: 1;
  border: 2px solid transparent; cursor: pointer; white-space: nowrap; text-decoration: none;
  transition: background 150ms, color 150ms, border-color 150ms, box-shadow 150ms;
}
.btn:focus-visible { outline: 3px solid var(--action-secondary-glow); outline-offset: 2px; }

.btn-primary   { background: var(--action-primary-base); color: #fff; border-color: var(--action-primary-base); }
.btn-primary:hover   { background: var(--action-primary-hover); border-color: var(--action-primary-hover); }

.btn-secondary { background: transparent; color: var(--action-secondary-base); border-color: var(--action-secondary-base); }
.btn-secondary:hover { background: var(--ui-highlight-base); }

.btn-tertiary  { background: transparent; color: var(--type-secondary); border-color: var(--gray-40); }
.btn-tertiary:hover  { background: var(--gray-20); border-color: var(--gray-50); }

.btn-white     { background: #fff; color: var(--type-primary); border-color: #fff; }
.btn-white:hover     { background: var(--gray-20); border-color: var(--gray-20); }

.btn-dark      { background: var(--type-primary); color: #fff; border-color: var(--type-primary); }
.btn-dark:hover      { background: var(--action-secondary-hover); border-color: var(--action-secondary-hover); }

.btn-inactive  { background: var(--gray-30); color: var(--gray-70); border-color: var(--gray-30); cursor: not-allowed; }

.btn-lg   { padding: 0.9375rem 2rem; font-size: 1.0625rem; }
.btn-sm   { padding: 0.4375rem 1rem; font-size: 0.875rem; }
.btn-icon { padding: 0.6875rem; }
.btn-full { width: 100%; }
```

### Rules

- One `btn-primary` per visual section.
- Verb-first labels: "Add to basket", "View details", "Save changes".
- Icon-only buttons require `aria-label`.
- Always use `<button>` for actions, `<a class="btn">` only for navigation. Polymorphic substitution is fine but the visual must stay identical.

---

## 2 · Field, Label, Input, InputMessage

The accessibility-wired form pattern. Always wrap an input in a `.field` so the label, input, and message are vertically aligned and screen-reader-linked.

### HTML

```html
<div class="field" data-aods="field">
  <label class="field-label" for="email">Email address</label>
  <input class="field-input" id="email" type="email" placeholder="you@example.com">
  <p class="field-msg is-helper">We'll send delivery updates to this address.</p>
</div>

<!-- Error state -->
<div class="field" data-aods="field">
  <label class="field-label" for="phone">Phone number</label>
  <input class="field-input is-error" id="phone" type="tel" aria-invalid="true" aria-describedby="phone-msg">
  <p class="field-msg is-error" id="phone-msg">Enter a valid UK mobile or landline number.</p>
</div>

<!-- Success state -->
<div class="field" data-aods="field">
  <label class="field-label" for="email2">Email address</label>
  <input class="field-input is-success" id="email2" type="email" value="craig@example.com">
  <p class="field-msg is-success">✓ Valid email address.</p>
</div>

<!-- Required -->
<label class="field-label field-label-required" for="postcode">Postcode</label>
```

### CSS

```css
.field { display: flex; flex-direction: column; gap: 0.25rem; }
.field-label { font-size: 0.875rem; font-weight: 500; color: var(--type-secondary); }
.field-label-required::after { content: ' *'; color: var(--ui-error-accent); }

.field-input {
  padding: 0.6875rem 0.75rem;
  border: 1px solid var(--gray-40); border-radius: var(--radius-sm);
  font-family: 'Inter', sans-serif; font-size: 0.9375rem; color: var(--type-secondary);
  background: #fff; outline: none; width: 100%;
  transition: border-color 150ms, box-shadow 150ms;
}
.field-input::placeholder { color: var(--gray-60); }
.field-input:focus { border-color: var(--action-secondary-base); box-shadow: 0 0 0 3px rgba(5,100,194,0.15); }
.field-input:disabled { background: var(--gray-10); color: var(--gray-70); cursor: not-allowed; border-color: var(--gray-30); }

.field-input.is-error     { border-color: var(--ui-error-accent);     background: var(--ui-error-base); }
.field-input.is-success   { border-color: var(--ui-success-accent);   background: var(--ui-success-base); }
.field-input.is-highlight { border-color: var(--ui-highlight-accent); background: var(--ui-highlight-base); }

.field-msg { font-size: 0.8125rem; }
.field-msg.is-error     { color: var(--ui-error-contrast); }
.field-msg.is-success   { color: var(--ui-success-contrast); }
.field-msg.is-highlight { color: var(--ui-highlight-contrast); }
.field-msg.is-helper    { color: var(--type-tertiary); }
```

### Rules

- `aria-invalid="true"` on error inputs. `aria-describedby` linking to the `.field-msg`'s `id`.
- Visible label always. Placeholder is **not** a label.
- Error messages start with a verb or describe the fix: "Enter a valid UK postcode" — not "Invalid postcode."

---

## 3 · Select

Native `<select>` with a custom chevron overlay. Inherits the Input styles.

### HTML

```html
<div class="field" data-aods="field">
  <label class="field-label" for="delivery">Delivery option</label>
  <div class="field-select-wrap">
    <select class="field-input" id="delivery">
      <option value="">Choose delivery option</option>
      <option value="standard">Standard (3–5 days)</option>
      <option value="express">Express (next day)</option>
    </select>
  </div>
</div>
```

### CSS

```css
.field-select-wrap { position: relative; }
.field-select-wrap::after {
  content: ''; pointer-events: none;
  position: absolute; right: 0.75rem; top: 50%; transform: translateY(-50%);
  width: 0; height: 0;
  border-left: 5px solid transparent; border-right: 5px solid transparent;
  border-top: 6px solid var(--gray-70);
}
select.field-input { appearance: none; padding-right: 2.5rem; }
```

---

## 4 · Textarea

Inherits all Input states. Use for multi-line input.

```html
<div class="field" data-aods="field">
  <label class="field-label" for="notes">Delivery notes</label>
  <textarea class="field-input" id="notes" rows="4" placeholder="Additional instructions for the driver"></textarea>
</div>
```

---

## 5 · Checkbox / Radio (toggle items)

Card-style toggle items — generous tap target, optional sub-label. Use in a `.toggle-group` for grouped controls.

### HTML

```html
<fieldset>
  <legend class="field-label" style="margin-bottom:0.5rem;">Delivery options</legend>
  <div class="toggle-group" data-aods="radio-button-group">
    <label class="toggle-item">
      <input type="radio" name="delivery" value="standard" checked>
      <div>
        <div class="toggle-item-label">Standard delivery</div>
        <div class="toggle-item-sub">3–5 working days · free</div>
      </div>
    </label>
    <label class="toggle-item">
      <input type="radio" name="delivery" value="express">
      <div>
        <div class="toggle-item-label">Express delivery</div>
        <div class="toggle-item-sub">Next working day · £5.99</div>
      </div>
    </label>
  </div>
</fieldset>

<!-- Checkbox group -->
<div class="toggle-group" data-aods="checkbox-group">
  <label class="toggle-item">
    <input type="checkbox" value="warranty">
    <div>
      <div class="toggle-item-label">3-year warranty</div>
      <div class="toggle-item-sub">+£59 — covers parts and labour.</div>
    </div>
  </label>
</div>
```

### CSS

```css
.toggle-group { display: flex; flex-direction: column; gap: 0.5rem; }
.toggle-item {
  display: flex; align-items: center; gap: 0.625rem;
  padding: 0.625rem 0.875rem; border-radius: var(--radius-sm);
  border: 1px solid var(--gray-40); background: #fff; cursor: pointer;
  transition: border-color 150ms, background 150ms;
}
.toggle-item:hover { border-color: var(--gray-60); background: var(--gray-10); }
.toggle-item input { accent-color: var(--action-secondary-base); width: 16px; height: 16px; flex-shrink: 0; }
.toggle-item-label { font-size: 0.9375rem; color: var(--type-secondary); }
.toggle-item-sub   { font-size: 0.8125rem; color: var(--type-tertiary); }
```

### Rules

- Groups use `<fieldset>` + `<legend>` for screen-reader grouping.
- Sub-label is optional but encouraged for radio groups with price or duration variants.

---

## 6 · Tag

Pill badges for status, categories, labels.

**Variants (always `ui-*` semantic):** `core` · `neutral` · `highlight` · `success` · `warning` · `error` · `dark`.
**Sizes:** default · `tag-lg`.

### HTML

```html
<span class="tag tag-success" data-aods="tag">In stock</span>
<span class="tag tag-highlight" data-aods="tag">New</span>
<span class="tag tag-warning" data-aods="tag">Limited stock</span>
<span class="tag tag-error" data-aods="tag">Out of stock</span>
<span class="tag tag-neutral tag-lg" data-aods="tag">Energy A+++</span>
```

### CSS

```css
.tag {
  display: inline-flex; align-items: center; gap: 0.25rem;
  padding: 0.2rem 0.625rem; border-radius: var(--radius-2xl);
  font-size: 0.75rem; font-weight: 500; line-height: 1.4; border: 1px solid transparent;
}
.tag-success   { background: var(--ui-success-base);   color: var(--ui-success-contrast);   border-color: var(--ui-success-accent); }
.tag-highlight { background: var(--ui-highlight-base); color: var(--ui-highlight-contrast); border-color: var(--ui-highlight-accent); }
.tag-neutral   { background: var(--ui-neutral-base);   color: var(--type-secondary);        border-color: var(--gray-40); }
.tag-warning   { background: var(--ui-warning-base);   color: var(--ui-warning-contrast);   border-color: var(--ui-warning-accent); }
.tag-error     { background: var(--ui-error-base);     color: var(--ui-error-contrast);     border-color: var(--ui-error-accent); }
.tag-dark      { background: var(--type-primary);      color: #fff;                         border-color: var(--type-primary); }
.tag-lg { padding: 0.35rem 0.875rem; font-size: 0.875rem; }
```

### Rules

- Stick to `ui-*` semantic groups. No arbitrary colours.
- `tag-warning` is for caution states only — never decoration.
- One tag style per concept. Don't mix variants in a single list (e.g. don't use `success` and `highlight` on adjacent product tiles unless they communicate genuinely different states).

---

## 7 · Notice

Inline alerts for info, success, warning, error. Smaller than a Card; sits in-flow.

### HTML

```html
<div class="notice notice-highlight" role="note" data-aods="notice">
  <i class="notice-icon" aria-hidden="true">ℹ</i>
  <div><strong>Free delivery</strong> on orders over £50.</div>
</div>

<div class="notice notice-success" role="status" data-aods="notice">
  <i class="notice-icon" aria-hidden="true">✓</i>
  Delivery confirmed for tomorrow, 8am–6pm.
</div>

<div class="notice notice-warning" role="note" data-aods="notice">
  <i class="notice-icon" aria-hidden="true">⚠</i>
  Installation slots are limited this week. Book early.
</div>

<div class="notice notice-error" role="alert" data-aods="notice">
  <i class="notice-icon" aria-hidden="true">✗</i>
  Your payment was declined. Check your card details and try again.
</div>
```

### CSS

```css
.notice {
  display: flex; gap: 0.75rem; align-items: flex-start;
  padding: 0.75rem 1rem; border-radius: var(--radius-sm);
  font-size: 0.875rem; border: 1px solid transparent;
}
.notice-icon { flex-shrink: 0; font-style: normal; font-weight: 600; }
.notice-highlight { background: var(--ui-highlight-base); color: var(--ui-highlight-contrast); border-color: var(--ui-highlight-accent); }
.notice-success   { background: var(--ui-success-base);   color: var(--ui-success-contrast);   border-color: var(--ui-success-accent); }
.notice-warning   { background: var(--ui-warning-base);   color: var(--ui-warning-contrast);   border-color: var(--ui-warning-accent); }
.notice-error     { background: var(--ui-error-base);     color: var(--ui-error-contrast);     border-color: var(--ui-error-accent); }
```

### Rules

- `role="alert"` for errors (assertive announcement). `role="status"` for confirmations. `role="note"` for everything else.
- Keep notices to one sentence. If you need more, you need a Card.

---

## 8 · Card

The default surface. 16px radius, 1px border, 24px padding. Use `card-raised` for elevated surfaces (sticky panels, dropdowns).

### HTML

```html
<div class="card" data-aods="card">
  <h3 class="t-title">Card title</h3>
  <p class="t-body">Card body text.</p>
</div>

<!-- Raised -->
<div class="card card-raised" data-aods="card">…</div>

<!-- State variants -->
<div class="card card-success" data-aods="card">Payment confirmed.</div>
<div class="card card-highlight" data-aods="card">Recommended option.</div>
<div class="card card-error" data-aods="card">Card declined.</div>

<!-- With a divider -->
<div class="card" data-aods="card">
  <h3 class="t-title">Order summary</h3>
  <div class="card-divider"></div>
  <p class="t-body">Subtotal · £499.00</p>
</div>
```

### CSS

```css
.card {
  background: #fff; border: 1px solid var(--gray-40);
  border-radius: var(--radius-md); padding: 1.5rem;
}
.card-raised    { box-shadow: var(--shadow-md); }
.card-success   { background: var(--ui-success-base);   border-color: var(--ui-success-accent); }
.card-highlight { background: var(--ui-highlight-base); border-color: var(--ui-highlight-accent); }
.card-error     { background: var(--ui-error-base);     border-color: var(--ui-error-accent); }
.card-divider   { height: 1px; background: var(--gray-30); margin: 1rem -1.5rem; }
```

### Rules

- 24px padding default; reduce to 16px on mobile only when space is tight.
- Don't nest cards more than one level deep.

---

## 9 · Breadcrumb

```html
<nav aria-label="Breadcrumb" data-aods="breadcrumb">
  <ol class="crumb">
    <li><a href="/">Home</a><span class="crumb-sep" aria-hidden="true">›</span></li>
    <li><a href="/appliances">Appliances</a><span class="crumb-sep" aria-hidden="true">›</span></li>
    <li><span aria-current="page">Washing machines</span></li>
  </ol>
</nav>
```

```css
.crumb { display: flex; gap: 0.375rem; align-items: center; list-style: none; }
.crumb li { display: flex; align-items: center; gap: 0.375rem; }
.crumb a { color: var(--action-secondary-base); text-decoration: none; font-size: 0.8125rem; }
.crumb a:hover { text-decoration: underline; }
.crumb span { font-size: 0.8125rem; color: var(--type-tertiary); }
.crumb-sep { color: var(--gray-60); font-size: 0.75rem; }
```

Rules: last item is `aria-current="page"` and not a link. Separators are decorative (`aria-hidden`).

---

## 10 · Tabs

Limit to 2–7 tabs. Use accordion pattern on narrow screens.

```html
<div data-aods="tabs">
  <div class="tab-list" role="tablist">
    <button class="tab-item active" role="tab" aria-selected="true">Description</button>
    <button class="tab-item" role="tab" aria-selected="false">Specifications</button>
    <button class="tab-item" role="tab" aria-selected="false">Reviews</button>
  </div>
  <div class="tab-panel" role="tabpanel">…</div>
</div>
```

```css
.tab-list { display: flex; border-bottom: 2px solid var(--gray-30); gap: 0; }
.tab-item {
  padding: 0.75rem 1.25rem; font-size: 0.9375rem;
  color: var(--type-tertiary); cursor: pointer; border: none; background: transparent;
  font-family: 'Inter', sans-serif; border-bottom: 2px solid transparent;
  margin-bottom: -2px; transition: color 150ms, border-color 150ms;
}
.tab-item:hover { color: var(--type-secondary); }
.tab-item.active { color: var(--type-primary); border-bottom-color: var(--brand-primary-base); font-weight: 500; }
```

---

## 11 · Accordion

Progressive disclosure for FAQ, product details, supplementary content. Not for primary navigation.

```html
<div class="accordion" data-aods="accordion">
  <div class="accordion-item">
    <button class="accordion-header" aria-expanded="true" aria-controls="acc-1">
      <span>Delivery information</span>
      <span class="accordion-chevron" aria-hidden="true">▼</span>
    </button>
    <div id="acc-1" class="accordion-body">We deliver within 2–3 working days.</div>
  </div>
  <div class="accordion-item">
    <button class="accordion-header" aria-expanded="false" aria-controls="acc-2">
      <span>Returns policy</span>
      <span class="accordion-chevron" aria-hidden="true">▼</span>
    </button>
    <div id="acc-2" class="accordion-body" hidden>Return within 30 days.</div>
  </div>
</div>
```

```css
.accordion { border: 1px solid var(--gray-40); border-radius: var(--radius-sm); overflow: hidden; }
.accordion-item { border-bottom: 1px solid var(--gray-30); }
.accordion-item:last-child { border-bottom: none; }
.accordion-header {
  display: flex; align-items: center; justify-content: space-between;
  width: 100%; padding: 1rem 1.25rem; background: #fff; border: none; cursor: pointer;
  font-family: 'Inter', sans-serif; font-size: 0.9375rem; font-weight: 500; color: var(--type-primary);
  text-align: left; transition: background 150ms;
}
.accordion-header:hover,
.accordion-header[aria-expanded="true"] { background: var(--gray-10); }
.accordion-chevron { color: var(--gray-70); transition: transform 200ms; }
.accordion-header[aria-expanded="true"] .accordion-chevron { transform: rotate(180deg); }
.accordion-body { padding: 1rem 1.25rem; background: var(--gray-10); font-size: 0.9375rem; color: var(--type-secondary); line-height: 1.6; }
.accordion-body[hidden] { display: none; }
```

---

## 12 · Quantity stepper

```html
<div class="qty-control" data-aods="quantity">
  <button class="qty-btn" aria-label="Decrease">−</button>
  <span class="qty-val">1</span>
  <button class="qty-btn" aria-label="Increase">+</button>
</div>
```

```css
.qty-control {
  display: inline-flex; align-items: stretch;
  border: 1px solid var(--gray-40); border-radius: var(--radius-sm); overflow: hidden;
}
.qty-btn {
  width: 40px; height: 40px; background: var(--gray-10); border: none;
  font-size: 1.25rem; color: var(--type-secondary); cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: background 150ms;
}
.qty-btn:hover { background: var(--gray-20); }
.qty-val {
  width: 48px; text-align: center; font-size: 1rem; font-weight: 500;
  line-height: 40px; color: var(--type-primary);
  border-left: 1px solid var(--gray-40); border-right: 1px solid var(--gray-40);
}
```

---

## 13 · Loading spinner

```html
<div class="spinner" role="status" aria-live="polite" data-aods="loading-spinner">
  <span class="sr-only">Loading…</span>
</div>

<!-- Small -->
<div class="spinner spinner-sm" role="status"></div>

<!-- On dark background -->
<div class="spinner spinner-white" role="status"></div>
```

```css
@keyframes spin { to { transform: rotate(360deg); } }
.spinner {
  display: inline-block; width: 32px; height: 32px;
  border: 3px solid var(--brand-primary-light);
  border-top-color: var(--action-primary-base);
  border-radius: 50%; animation: spin 0.75s linear infinite;
}
.spinner-sm    { width: 20px; height: 20px; border-width: 2px; }
.spinner-white { border-color: rgba(255,255,255,0.3); border-top-color: #fff; }
```

Rule: show after a 300ms delay; under 300ms, show nothing. For waits over 2s, use a skeleton screen.

---

## 14 · Nav

The dark navy header used across ao.com.

```html
<nav class="nav" data-aods="nav">
  <span class="nav-logo">ao.</span>
  <ul class="nav-links">
    <li><a href="#">Appliances</a></li>
    <li><a href="#">TV &amp; Audio</a></li>
    <li><a href="#">Computing</a></li>
  </ul>
  <button class="btn btn-primary btn-sm" data-aods="button">Basket (2)</button>
</nav>
```

```css
.nav {
  background: var(--type-primary);
  padding: 0.875rem 2rem;
  display: flex; align-items: center; justify-content: space-between;
  position: sticky; top: 0; z-index: 20;
  box-shadow: var(--shadow-md);
}
.nav-logo { font-family: 'SmileyFace', Georgia, serif; font-weight: 700; font-size: 1.75rem; color: var(--brand-primary-base); letter-spacing: -0.02em; }
.nav-links { display: flex; gap: 1.75rem; list-style: none; }
.nav-links a { color: rgba(255,255,255,0.75); text-decoration: none; font-size: 0.875rem; transition: color 150ms; }
.nav-links a:hover { color: #fff; }
@media (max-width: 640px) { .nav { padding: 0.75rem 1rem; } .nav-links { display: none; } }
```
