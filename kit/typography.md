# AO Typography

Two typefaces, strict role separation. Never swap them.

| Family | Role |
|---|---|
| **SmileyFace** | Headings, display text, **and all button labels (CTAs)**. |
| **Inter** | All body text, UI labels, helper copy, form fields. |

System fallback for Inter: `ui-sans-serif, system-ui, sans-serif`.

---

## Loading SmileyFace — paste this `@font-face` block into every generated stylesheet

```css
@font-face {
  font-family: 'SmileyFace-Headline';
  font-display: swap;
  src: url('https://media.ao.com/fonts/smiley-face/SmileyFace-Headline.woff2') format('woff2'),
       url('https://media.ao.com/fonts/smiley-face/SmileyFace-Headline.woff') format('woff');
}
@font-face {
  font-family: 'SmileyFace';
  font-weight: 100;
  font-display: swap;
  src: url('https://media.ao.com/fonts/smiley-face/SmileyFace-Light.woff2') format('woff2'),
       url('https://media.ao.com/fonts/smiley-face/SmileyFace-Light.woff') format('woff');
}
@font-face {
  font-family: 'SmileyFace';
  font-weight: 400;
  font-display: swap;
  src: url('https://media.ao.com/fonts/smiley-face/SmileyFace-Regular.woff2') format('woff2'),
       url('https://media.ao.com/fonts/smiley-face/SmileyFace-Regular.woff') format('woff');
}
@font-face {
  font-family: 'SmileyFace';
  font-weight: 500;
  font-display: swap;
  src: url('https://media.ao.com/fonts/smiley-face/SmileyFace-Medium.woff2') format('woff2'),
       url('https://media.ao.com/fonts/smiley-face/SmileyFace-Medium.woff') format('woff');
}
@font-face {
  font-family: 'SmileyFace';
  font-weight: 700;
  font-display: swap;
  src: url('https://media.ao.com/fonts/smiley-face/SmileyFace-Bold.woff2') format('woff2'),
       url('https://media.ao.com/fonts/smiley-face/SmileyFace-Bold.woff') format('woff');
}
```

Loading Inter (Google Fonts):

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap">
```

---

## Type scale

| Class | Font | Weight | Size | Line-height | Use |
|---|---|---|---|---|---|
| `t-display-headline` | SmileyFace-Headline | 800 | 2.5rem (40px) | 1.0 | Hero headlines, campaign display |
| `t-display-lg` | SmileyFace | 700 | 2rem (32px) | 1.25 | Large section headings |
| `t-display` | SmileyFace | 700 | 1.5rem (24px) | 1.25 | Standard page headings |
| `t-title-lg` | SmileyFace | 700 | 1.25rem (20px) | 1.25 | Card headings, section titles |
| `t-title` | SmileyFace | 700 | 1rem (16px) | 1.25 | Subsection headings |
| `t-title-sm` | SmileyFace | 700 | 0.875rem (14px) | 1.25 | Minimum SmileyFace size |
| `t-cta` | SmileyFace | 700 | 1rem (16px) | 1.25 | **All button labels** |
| `t-body` | Inter | 400 | 1rem (16px) | 1.625 | Default body copy |
| `t-body-sm` | Inter | 400 | 0.875rem (14px) | 1.625 | Supporting copy, helper text |
| `t-caption` | Inter | 400 | 0.75rem (12px) | 1.625 | Captions, metadata, micro copy |
| `t-link` | Inter | 500 | 1rem (16px) | 1.625 | Inline links — underlined |
| `t-link-sm` | Inter | 500 | 0.875rem (14px) | 1.625 | Small inline links |

---

## The single CSS block — paste this into every generated stylesheet

```css
body {
  font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
  color: var(--type-secondary);
  font-size: 1rem;
  line-height: 1.625;
  -webkit-font-smoothing: antialiased;
}

/* SmileyFace (headings + CTAs) */
.t-display-headline { font-family: 'SmileyFace-Headline', Georgia, serif; font-size: 2.5rem;   line-height: 1.0;  color: var(--type-primary); }
.t-display-lg      { font-family: 'SmileyFace', Georgia, serif; font-weight: 700; font-size: 2rem;    line-height: 1.25; color: var(--type-primary); }
.t-display         { font-family: 'SmileyFace', Georgia, serif; font-weight: 700; font-size: 1.5rem;  line-height: 1.25; color: var(--type-primary); }
.t-title-lg        { font-family: 'SmileyFace', Georgia, serif; font-weight: 700; font-size: 1.25rem; line-height: 1.25; color: var(--type-primary); }
.t-title           { font-family: 'SmileyFace', Georgia, serif; font-weight: 700; font-size: 1rem;    line-height: 1.25; color: var(--type-primary); }
.t-title-sm        { font-family: 'SmileyFace', Georgia, serif; font-weight: 700; font-size: 0.875rem; line-height: 1.25; color: var(--type-primary); }
.t-cta             { font-family: 'SmileyFace', Georgia, serif; font-weight: 700; font-size: 1rem;    line-height: 1.25; }

/* Inter (body + UI) */
.t-body       { font-family: 'Inter', sans-serif; font-size: 1rem;    line-height: 1.625; }
.t-body-sm    { font-family: 'Inter', sans-serif; font-size: 0.875rem; line-height: 1.625; }
.t-caption    { font-family: 'Inter', sans-serif; font-size: 0.75rem;  line-height: 1.625; color: var(--type-tertiary); }
.t-link       { font-family: 'Inter', sans-serif; font-weight: 500; font-size: 1rem;    text-decoration: underline; color: var(--action-secondary-base); }
.t-link-sm    { font-family: 'Inter', sans-serif; font-weight: 500; font-size: 0.875rem; text-decoration: underline; color: var(--action-secondary-base); }
.t-secondary  { color: var(--type-tertiary); }
```

---

## Typography rules

1. **Inter is never on a button.** Every `<button>` label uses `t-cta` (SmileyFace Bold). No exceptions.
2. **SmileyFace is never below 14px.** The minimum SmileyFace size is `t-title-sm` (14px). Below that, switch to Inter.
3. **Body line length: 65–75 characters.** Constrain wide text containers with `max-width: 65ch`.
4. **Colour by role:**
   - Headings → `type-primary` (#011f44, deep navy)
   - Body → `type-secondary` (#212121, near-black)
   - Supporting / captions → `type-tertiary` (mid-grey)
5. **Placeholder is not a label.** Always pair an `<input>` with a visible `<label>`.
6. **Links use Inter Medium (500).** Never Regular weight for clickable text links.

---

## Anti-patterns

| ❌ Don't | ✅ Do |
|---|---|
| `font-family: Arial` | Use the loaded families: `SmileyFace`, `Inter` |
| Inter on a `<button>` | Always `t-cta` (SmileyFace Bold) |
| SmileyFace at 12px | Switch to Inter under 14px |
| `font-weight: 300` on body | Inter 400 is the minimum body weight |
| `font-weight: 400` on links | Links are Inter 500 (Medium) |
| `text-transform: uppercase` on CTAs | AO buttons are sentence-case verbs |
| Multiple display sizes in one section | One `t-display` or `t-title-lg` per section, then `t-body` |
| `line-height: 1.5` on body | Body line-height is now 1.625 |
