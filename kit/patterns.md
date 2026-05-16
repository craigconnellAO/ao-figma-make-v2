# AO Page Patterns

> Multi-component recipes for the screens designers build most often. Use these as the structural starting point — they encode the right component order, hierarchy, and breakpoints. Adapt the content, keep the structure.

Patterns covered:

1. [Sign in](#1--sign-in)
2. [Validated form](#2--validated-form-eg-delivery-check)
3. [Product detail page (PDP)](#3--product-detail-page-pdp)
4. [Basket / order summary](#4--basket--order-summary)
5. [Modal confirmation](#5--modal-confirmation)
6. [Empty state](#6--empty-state)
7. [Order confirmation](#7--order-confirmation)
8. [Category / product listing](#8--category--product-listing)
9. [Account dashboard](#9--account-dashboard)

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

---

## 7 · Order confirmation

Single-column centred layout, max 640px. The emotional peak of the purchase flow: confirm the outcome, tell the user what happens next, then give them somewhere to go. Brand energy belongs here.

```html
<main style="max-width: 640px; margin: 0 auto; padding: 0 1.5rem 4rem;">

  <!-- Confirmation hero -->
  <div style="text-align:center; padding: 2.5rem 1.5rem 1.5rem;">
    <div style="width:72px; height:72px; border-radius:50%;
                background:var(--ui-success-base); border:2px solid var(--ui-success-accent);
                display:flex; align-items:center; justify-content:center;
                margin:0 auto 1.25rem; font-size:2rem;" aria-hidden="true">✓</div>
    <h1 class="t-display-headline" style="margin-bottom:0.5rem;">You're all set, Sarah.</h1>
    <p class="t-body t-secondary" style="max-width:44ch; margin:0 auto;">
      Your order is confirmed. We'll keep you updated every step of the way.
    </p>
    <span style="display:inline-flex; align-items:center; gap:0.5rem;
                 background:var(--gray-10); border:1px solid var(--gray-40);
                 border-radius:var(--radius-2xl); padding:0.375rem 1rem;
                 font-size:0.875rem; color:var(--type-tertiary); margin-top:0.625rem;">
      Order <strong style="color:var(--type-secondary);">#AO-228341</strong> · 16 May 2026
    </span>
  </div>

  <!-- Delivery summary -->
  <div class="card" data-aods="card" style="margin-bottom:1rem;">
    <h2 class="t-title" style="margin-bottom:1rem;">Your delivery</h2>
    <p class="t-body-sm" style="font-weight:600;">Thursday 17 May, 8am–6pm</p>
    <p class="t-body-sm t-secondary">14 Maple Close, Manchester, M14 5RQ</p>
    <div class="card-divider"></div>
    <div class="notice notice-success" role="status" data-aods="notice">
      <i class="notice-icon" aria-hidden="true">✓</i>
      Confirmation sent to <strong>sarah@example.com</strong>
    </div>
  </div>

  <!-- What happens next -->
  <div class="card" data-aods="card" style="margin-bottom:1.5rem;">
    <h2 class="t-title" style="margin-bottom:1.25rem;">What happens next</h2>
    <!-- Repeat for each step: -->
    <div style="display:flex; gap:1rem; padding:0.875rem 0; border-bottom:1px solid var(--gray-30);">
      <div style="width:28px; height:28px; border-radius:50%; flex-shrink:0;
                  background:var(--type-primary); color:#fff; display:flex;
                  align-items:center; justify-content:center;
                  font-size:0.75rem; font-weight:700;">1</div>
      <div>
        <p class="t-body-sm" style="font-weight:600; margin-bottom:0.25rem;">Confirmation email on its way</p>
        <p class="t-body-sm t-secondary">Full summary sent to your inbox within a few minutes.</p>
      </div>
    </div>
    <!-- Add steps 2, 3 following the same pattern -->
  </div>

  <!-- CTAs -->
  <div style="display:flex; flex-direction:column; gap:0.75rem; align-items:center;">
    <a href="#" class="btn btn-primary btn-lg btn-full" data-aods="button">Track your order</a>
    <a href="#" class="btn btn-secondary btn-full" data-aods="button">Continue shopping</a>
  </div>

</main>
```

**Rules:** `t-display-headline` is reserved for this page and true campaign moments — it earns its size here because the user just completed something. One primary CTA ("Track your order"), one secondary. Never use a modal on this page — all content is inline.

---

## 8 · Category / product listing

Two-column desktop layout: filter sidebar (240px, sticky) + product grid (fluid, 3 columns). Single column on mobile with filters hidden behind a "Filter" button.

```html
<!-- Breadcrumb + page header -->
<nav aria-label="Breadcrumb" data-aods="breadcrumb">
  <ol class="crumb">
    <li><a href="/">Home</a><span class="crumb-sep" aria-hidden="true">›</span></li>
    <li><a href="/appliances">Appliances</a><span class="crumb-sep" aria-hidden="true">›</span></li>
    <li><span aria-current="page">Washing machines</span></li>
  </ol>
</nav>

<div style="display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:1.5rem;">
  <div>
    <h1 class="t-display">Washing machines</h1>
    <p class="t-body-sm t-secondary">127 products</p>
  </div>
</div>

<div style="display:grid; grid-template-columns:240px 1fr; gap:2rem; align-items:start;">

  <!-- Filter sidebar -->
  <aside style="position:sticky; top:80px;">
    <div style="margin-bottom:1.25rem;">
      <p style="font-size:0.875rem; font-weight:600; color:var(--type-secondary);
                margin-bottom:0.625rem; padding-bottom:0.5rem; border-bottom:1px solid var(--gray-30);">
        Brand
      </p>
      <label style="display:flex; align-items:center; gap:0.5rem; padding:0.3125rem 0;
                    font-size:0.875rem; cursor:pointer;">
        <input type="checkbox" checked style="accent-color:var(--action-secondary-base);">
        Bosch
      </label>
      <!-- repeat for each filter option -->
    </div>
  </aside>

  <!-- Main content -->
  <div>
    <!-- Active filter chips + sort -->
    <div style="display:flex; justify-content:space-between; margin-bottom:1rem; align-items:center; flex-wrap:wrap; gap:0.75rem;">
      <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
        <button style="display:inline-flex; align-items:center; gap:0.375rem;
                       padding:0.3125rem 0.75rem; border-radius:var(--radius-2xl);
                       font-size:0.8125rem; font-weight:500;
                       background:var(--ui-highlight-base); color:var(--ui-highlight-contrast);
                       border:1px solid var(--ui-highlight-accent); cursor:pointer;">
          Bosch ✕
        </button>
      </div>
      <select style="appearance:none; padding:0.5rem 2rem 0.5rem 0.875rem;
                     border:1px solid var(--gray-40); border-radius:var(--radius-sm);
                     font-family:'Inter',sans-serif; font-size:0.875rem; background:#fff;">
        <option>Sort: Featured</option>
        <option>Price: low to high</option>
      </select>
    </div>

    <!-- Product grid: 3-up desktop, 2-up tablet, 1-up mobile -->
    <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:1rem;">
      <div style="background:#fff; border:1px solid var(--gray-40);
                  border-radius:var(--radius-md); overflow:hidden;" data-aods="card">
        <div style="aspect-ratio:1; background:var(--gray-10); display:flex;
                    align-items:center; justify-content:center; font-size:3.5rem;
                    border-bottom:1px solid var(--gray-30);" aria-hidden="true">🫧</div>
        <div style="padding:1rem; display:flex; flex-direction:column; gap:0.5rem;">
          <span class="tag tag-success" data-aods="tag">In stock</span>
          <p style="font-size:0.9375rem; font-weight:500; color:var(--type-secondary); line-height:1.35;">
            Bosch Series 6 9kg Washing Machine
          </p>
          <p class="t-body-sm t-secondary">9kg · 1,400 rpm · Energy A+++</p>
          <p style="font-family:'SmileyFace',Georgia,serif; font-weight:700;
                    font-size:1.375rem; color:var(--type-primary); margin-top:auto; padding-top:0.5rem;">
            £549
          </p>
        </div>
        <div style="padding:0 1rem 1rem;">
          <button class="btn btn-primary btn-full" data-aods="button">Add to basket</button>
        </div>
      </div>
      <!-- repeat tiles -->
    </div>

  </div>
</div>
```

**Rules:** one `btn-primary` per tile ("Add to basket"). Price in `t-title-lg` or SmileyFace Bold — never Inter. Product images on `var(--gray-10)` background only. Active filters use the `ui-highlight` surface, not custom colours. Out-of-stock tiles use `btn-inactive`.

---

## 9 · Account dashboard

Two-column desktop layout: main content (orders, 2/3) + sidebar quick links (1/3, sticky). Personalised greeting in a dark navy header band; functional utility tone throughout.

```html
<!-- Account header band (sits below the global nav) -->
<div style="background:var(--type-primary); padding:2rem 1.5rem;">
  <div style="max-width:1100px; margin:0 auto; display:flex; justify-content:space-between; align-items:flex-end;">
    <div>
      <p style="font-family:'SmileyFace',Georgia,serif; font-weight:700;
                font-size:1.75rem; color:#fff; line-height:1.2;">Good morning, Sarah.</p>
      <p style="font-size:0.875rem; color:rgba(255,255,255,0.6); margin-top:0.25rem;">Member since 2019 · 7 orders</p>
    </div>
    <button class="btn btn-secondary" style="color:rgba(255,255,255,0.7); border-color:rgba(255,255,255,0.3);"
            data-aods="button">Sign out</button>
  </div>
</div>

<!-- Main content grid -->
<div style="display:grid; grid-template-columns:1fr 280px; gap:2rem; align-items:start; max-width:1100px; margin:2rem auto; padding:0 1.5rem;">

  <!-- Orders -->
  <div class="card" data-aods="card">
    <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:1rem;">
      <h2 class="t-title">Recent orders</h2>
      <a href="#" class="t-link-sm">View all</a>
    </div>

    <!-- Order row -->
    <div style="padding:1.25rem 0; border-bottom:1px solid var(--gray-30);">
      <div style="display:flex; justify-content:space-between; margin-bottom:0.75rem; flex-wrap:wrap; gap:0.5rem;">
        <div style="display:flex; gap:0.5rem; align-items:center;">
          <span style="font-size:0.875rem; font-weight:600;">#AO-228341</span>
          <span class="t-body-sm t-secondary">16 May 2026</span>
        </div>
        <span class="tag tag-highlight" data-aods="tag">In transit</span>
      </div>
      <div style="display:flex; gap:0.75rem; align-items:center;">
        <div style="width:44px; height:44px; background:var(--gray-10);
                    border:1px solid var(--gray-30); border-radius:var(--radius-sm);
                    display:flex; align-items:center; justify-content:center; font-size:1.25rem;"
             aria-hidden="true">🫧</div>
        <span style="font-size:0.875rem; color:var(--type-secondary); flex:1;">Bosch Series 6 9kg Washing Machine</span>
        <span style="font-size:0.875rem; font-weight:600; color:var(--type-primary);">£549</span>
      </div>
      <div style="display:flex; justify-content:space-between; margin-top:1rem; flex-wrap:wrap; gap:0.5rem;">
        <span class="t-body-sm t-secondary">Total: <strong style="color:var(--type-secondary);">£618.00</strong></span>
        <a href="#" class="btn btn-secondary btn-sm" data-aods="button">Track order</a>
      </div>
    </div>
    <!-- repeat for additional orders -->
  </div>

  <!-- Sidebar -->
  <aside style="position:sticky; top:80px; display:flex; flex-direction:column; gap:1rem;">
    <div class="card" data-aods="card">
      <h2 class="t-title-sm" style="margin-bottom:0.5rem;">My account</h2>
      <!-- Each quicklink: -->
      <a href="#" style="display:flex; align-items:center; justify-content:space-between;
                         padding:0.875rem 0; border-bottom:1px solid var(--gray-30);
                         text-decoration:none;">
        <span style="font-size:0.9375rem; color:var(--type-secondary);">Address book</span>
        <span style="color:var(--gray-60);" aria-hidden="true">›</span>
      </a>
      <!-- repeat for: Payment methods, Personal details, Communication preferences -->
    </div>
  </aside>

</div>
```

**Rules:** personalised greeting uses SmileyFace Bold at 1.75rem (below `t-display` but above `t-title-lg`). Order rows are **not** cards — they're divider-separated rows inside a single card. One primary CTA per order maximum ("Track order" or "Buy again"). The sidebar uses `t-link-sm` chevron rows, not buttons.
