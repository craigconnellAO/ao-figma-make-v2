# AO Page Patterns

> Multi-component recipes for the screens designers build most often. Use these as the structural starting point — they encode the right component order, hierarchy, and breakpoints. Adapt the content, keep the structure.

Patterns covered:

1. [Sign in](#1--sign-in)
2. [Validated form](#2--validated-form-eg-delivery-check)
3. [Product detail page (PDP)](#3--product-detail-page-pdp)
4. [Basket / order summary](#4--basket--order-summary)
5. [Modal confirmation](#5--modal-confirmation)
6. [Empty state](#6--empty-state)

All patterns assume the `:root` block from `tokens.md` and the typography setup from `typography.md` are present.

---

## 1 · Sign in

Single-column, centred, max 420px. One primary CTA, one secondary route.

```html
<main style="max-width: 420px; margin: 4rem auto; padding: 0 1rem;">
  <div style="text-align:center; margin-bottom: 2rem;">
    <h1 class="t-display" style="margin-bottom: 0.5rem;">Sign in to your account</h1>
    <p class="t-body t-secondary">Use your email to track orders, save addresses, and check your delivery slots.</p>
  </div>

  <div class="card card-raised" style="display:flex; flex-direction:column; gap: 1rem;">
    <div class="field" data-aods="field">
      <label class="field-label" for="signin-email">Email address</label>
      <input class="field-input" id="signin-email" type="email" autocomplete="email">
    </div>

    <div class="field" data-aods="field">
      <label class="field-label" for="signin-password">Password</label>
      <input class="field-input" id="signin-password" type="password" autocomplete="current-password">
    </div>

    <div style="display:flex; justify-content:space-between; align-items:center; font-size: 0.875rem;">
      <label style="display:flex; gap:0.5rem; align-items:center;">
        <input type="checkbox"> Stay signed in
      </label>
      <a href="#" class="t-link">Forgotten password?</a>
    </div>

    <button class="btn btn-primary btn-full" data-aods="button">Sign in</button>
  </div>

  <p style="text-align:center; margin-top: 1.5rem;" class="t-body-sm">
    New to AO? <a href="#" class="t-link">Create an account</a>
  </p>
</main>
```

**Rules:** primary CTA is full-width on a focused single-task screen. "Forgotten password?" is a `t-link`, not a button — it's a navigation, not an action.

---

## 2 · Validated form (e.g. delivery check)

The canonical validated-form pattern: helper text by default, switch to error/success when the user submits.

```html
<div class="card card-raised" data-aods="card" style="max-width: 480px;">
  <h3 class="t-title" style="margin-bottom: 1.25rem;">Check delivery to your postcode</h3>

  <div class="field" style="margin-bottom: 1rem;">
    <label class="field-label" for="postcode">Postcode</label>
    <input class="field-input" id="postcode" type="text" placeholder="e.g. M1 1AA" autocomplete="postal-code">
    <p class="field-msg is-helper">We deliver to all UK mainland postcodes.</p>
  </div>

  <div class="field" style="margin-bottom: 1rem;">
    <label class="field-label" for="email">Email for delivery updates</label>
    <input class="field-input is-success" id="email" type="email" value="craig@example.com">
    <p class="field-msg is-success">✓ Valid email address.</p>
  </div>

  <div class="field" style="margin-bottom: 1.5rem;">
    <label class="field-label" for="phone">Phone number</label>
    <input class="field-input is-error" id="phone" type="tel" value="0777" aria-invalid="true" aria-describedby="phone-msg">
    <p class="field-msg is-error" id="phone-msg">Enter a valid UK mobile or landline number.</p>
  </div>

  <button class="btn btn-primary btn-full" data-aods="button">Check availability</button>
</div>
```

**Rules:** helper text by default, validation states only after the user has interacted. One Notice above the form for global errors (e.g. server-side). One primary CTA at the bottom.

---

## 3 · Product detail page (PDP)

Two-column on desktop (image pane + details), single-column on mobile. Specs and reviews live in tabs or accordions below the fold.

```html
<nav aria-label="Breadcrumb" data-aods="breadcrumb" style="margin-bottom: 1.5rem;">
  <ol class="crumb">
    <li><a href="/">Home</a><span class="crumb-sep" aria-hidden="true">›</span></li>
    <li><a href="/appliances">Appliances</a><span class="crumb-sep" aria-hidden="true">›</span></li>
    <li><span aria-current="page">Washing machines</span></li>
  </ol>
</nav>

<section style="display:grid; grid-template-columns: 480px 1fr; gap: 3rem; align-items:start;">
  <!-- Image pane -->
  <div class="card" style="aspect-ratio: 1; padding: 0; display:flex; align-items:center; justify-content:center;">
    <img src="…" alt="Bosch Series 6 washing machine" style="max-width:80%; max-height:80%;">
  </div>

  <!-- Detail pane -->
  <div style="display:flex; flex-direction:column; gap: 1.25rem;">
    <div>
      <span class="tag tag-highlight" data-aods="tag">New</span>
      <span class="tag tag-success" data-aods="tag">In stock</span>
    </div>

    <h1 class="t-display">Bosch Series 6 9kg Washing Machine</h1>

    <div style="display:flex; align-items:baseline; gap: 0.75rem;">
      <span class="t-display-lg" style="font-size: 2rem;">£549</span>
      <span class="t-body t-secondary" style="text-decoration: line-through;">£599</span>
      <span class="tag tag-error" data-aods="tag">Save £50</span>
    </div>

    <ul style="list-style:none; padding:0; display:flex; flex-direction:column; gap: 0.5rem;">
      <li>✓ Free delivery tomorrow</li>
      <li>✓ 2-year AO guarantee included</li>
      <li>✓ Recycle your old appliance for £25</li>
    </ul>

    <div style="display:flex; gap: 1rem; align-items:center;">
      <span class="t-body-sm t-secondary">Quantity</span>
      <div class="qty-control" data-aods="quantity">
        <button class="qty-btn" aria-label="Decrease">−</button>
        <span class="qty-val">1</span>
        <button class="qty-btn" aria-label="Increase">+</button>
      </div>
    </div>

    <button class="btn btn-primary btn-lg btn-full" data-aods="button">Add to basket</button>
    <button class="btn btn-secondary btn-full" data-aods="button">Save to wishlist</button>

    <div class="notice notice-highlight" role="note" data-aods="notice">
      <i class="notice-icon" aria-hidden="true">ℹ</i>
      <div><strong>Professional installation available.</strong> Add fitting for £69.</div>
    </div>
  </div>
</section>

<!-- Specs + reviews -->
<section style="margin-top: 3rem;">
  <div class="tab-list" role="tablist">
    <button class="tab-item active" role="tab">Specifications</button>
    <button class="tab-item" role="tab">Reviews</button>
    <button class="tab-item" role="tab">Delivery &amp; returns</button>
  </div>
  <div class="tab-panel" role="tabpanel" style="padding-top: 1.5rem;">…</div>
</section>
```

**Rules:** image pane is fixed 480px on desktop. Primary action is "Add to basket", supporting is "Save to wishlist". Don't stack three CTAs in a row — third option goes into a Notice or below the fold.

---

## 4 · Basket / order summary

Two-column on desktop (line items + order summary card). Summary card is `card-raised` and sticky on long pages.

```html
<h1 class="t-display" style="margin-bottom: 1.5rem;">
  Your basket <span style="font-size: 1.125rem; color: var(--type-tertiary); font-family: 'Inter'; font-weight: 400;">(2 items)</span>
</h1>

<section style="display:grid; grid-template-columns: 1fr 360px; gap: 2.5rem; align-items:start;">
  <!-- Line items -->
  <div style="display:flex; flex-direction:column; gap: 1rem;">

    <div class="card" data-aods="card">
      <div style="display:flex; gap: 1rem;">
        <img src="…" alt="" style="width:96px; height:96px; object-fit:contain; background: var(--gray-10); border-radius: var(--radius-sm);">
        <div style="flex:1;">
          <h3 class="t-title">Bosch Series 6 9kg Washing Machine</h3>
          <p class="t-body-sm t-secondary">Energy A+++ · 1,400 rpm</p>
          <div style="display:flex; gap: 1rem; align-items:center; margin-top: 0.75rem;">
            <div class="qty-control" data-aods="quantity">
              <button class="qty-btn" aria-label="Decrease">−</button>
              <span class="qty-val">1</span>
              <button class="qty-btn" aria-label="Increase">+</button>
            </div>
            <a href="#" class="t-link t-body-sm">Remove</a>
          </div>
        </div>
        <div style="text-align:right;">
          <div class="t-title">£549</div>
        </div>
      </div>
    </div>

    <!-- Add-ons -->
    <div class="card" data-aods="card">
      <h2 class="t-title-sm" style="margin-bottom: 1rem;">Add to your order</h2>
      <div class="toggle-group">
        <label class="toggle-item">
          <input type="checkbox" value="install">
          <div>
            <div class="toggle-item-label">Professional installation</div>
            <div class="toggle-item-sub">+£69 — install, level, and test.</div>
          </div>
        </label>
        <label class="toggle-item">
          <input type="checkbox" value="warranty">
          <div>
            <div class="toggle-item-label">3-year warranty</div>
            <div class="toggle-item-sub">+£59 — parts and labour.</div>
          </div>
        </label>
      </div>
    </div>
  </div>

  <!-- Order summary -->
  <aside class="card card-raised" data-aods="card" style="position: sticky; top: 80px;">
    <h2 class="t-title-sm" style="margin-bottom: 1.25rem;">Order summary</h2>

    <div style="display:flex; flex-direction:column; gap: 0.5rem; font-size: 0.9375rem;">
      <div style="display:flex; justify-content:space-between;"><span>Subtotal</span><span>£549.00</span></div>
      <div style="display:flex; justify-content:space-between;"><span>Delivery</span><span>Free</span></div>
    </div>

    <div class="card-divider"></div>

    <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom: 1.25rem;">
      <span class="t-title-sm">Total</span>
      <span class="t-title-lg">£549.00</span>
    </div>

    <button class="btn btn-primary btn-full btn-lg" data-aods="button">Checkout</button>

    <div class="notice notice-success" role="status" data-aods="notice" style="margin-top: 1rem;">
      <i class="notice-icon" aria-hidden="true">✓</i>
      You've qualified for free delivery.
    </div>
  </aside>
</section>
```

**Rules:** summary card sticks at `top: 80px` (under the nav). One primary CTA — "Checkout". Edit actions on items are `t-link`, not buttons.

---

## 5 · Modal confirmation

Use modals **only** when an inline alternative is exhausted (e.g. destructive confirmation, focused single-task).

```html
<div role="dialog" aria-modal="true" aria-labelledby="modal-title"
     style="position:fixed; inset:0; background: rgba(1,22,48,0.6); display:flex; align-items:center; justify-content:center; padding: 1rem; z-index: 50;">
  <div class="card card-raised" style="max-width: 480px; width: 100%; box-shadow: var(--shadow-lg);" data-aods="modal">
    <h2 id="modal-title" class="t-title" style="margin-bottom: 0.5rem;">Cancel this order?</h2>
    <p class="t-body" style="margin-bottom: 1.5rem;">Your order #AO-228341 will be cancelled and refunded within 3–5 working days.</p>

    <div style="display:flex; gap: 0.75rem; justify-content:flex-end;">
      <button class="btn btn-tertiary" data-aods="button">Keep order</button>
      <button class="btn btn-primary" data-aods="button">Yes, cancel order</button>
    </div>
  </div>
</div>
```

**Rules:** the destructive action is the primary because it's what the user came here to do. Escape key closes. Focus traps inside the dialog. Previous focus is restored on close.

---

## 6 · Empty state

When there's nothing to show, give the user one clear next step.

```html
<div class="card" data-aods="card" style="text-align:center; padding: 3rem 1.5rem;">
  <div style="font-size: 3rem; margin-bottom: 0.75rem;" aria-hidden="true">🛒</div>
  <h2 class="t-title-lg" style="margin-bottom: 0.5rem;">Your basket is empty</h2>
  <p class="t-body t-secondary" style="max-width: 40ch; margin: 0 auto 1.5rem;">
    Browse our latest appliances and add something you'll love.
  </p>
  <button class="btn btn-primary" data-aods="button">Shop appliances</button>
</div>
```

**Rules:** one CTA, verb-first. One sentence of supporting copy. No multiple parallel suggestions ("or browse this, or that, or that") — pick the most likely next step.
