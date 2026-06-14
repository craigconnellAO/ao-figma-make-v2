# Kit Alignment Plan — Figma Library → Code

Pulling specs directly from the Figma Design System Components library and correcting the kit files to match.

## Progress

- [x] **Buttons** — radius 8px (not pill), 1px border (not 2px), corrected action-secondary-base to #0564c2, action-primary-active to #003d00
- [x] **Form Field (Input)** — border colour gray-50 (not gray-40), font size 14px (0.875rem), padding 14px horizontal (0.875rem)
- [x] **Status Alerts (Notices)** — removed border entirely, padding 12px uniform (0.75rem), font 12px (0.75rem), warning bg is palette-bread (#ffe3c2)
- [x] **Accordion** — removed container border/radius, uses top/bottom dividers, SmileyFace Bold 16px title, padding 1rem
- [x] **Tabs** — SmileyFace Bold 16px (not Inter), all text type-primary, active indicator 3px action-secondary-base, padding 1rem
- [x] **Radio Button / Toggle Items** — border colour gray-50 (not gray-40), 8px radius, padding 12px/16px
- [x] **Checkbox Pill** — border grey-40 (already correct), 8px radius, 48px height
- [x] **Loading Spinner** — uses brand-primary-light + brand-primary-base colours (kit matches ✅)
- [x] **Run tests** — token-consistency ✅ PASSES, preservation ✅ PASSES (16/16 tests)
- [ ] **Update all example HTML files** — apply corrected tokens/CSS to existing prototypes
- [ ] **Header/Nav** — needs detailed extraction from Figma Header component (multiple viewport variants)
- [ ] **Footer** — not currently in kit, may need adding

## Corrections Applied

| Component | Property | Kit (was) | Figma (corrected to) | File |
|-----------|----------|-----------|---------------------|------|
| Button | border-radius | 9999px | var(--radius-sm) / 8px | components.md |
| Button | border-width | 2px | 1px | components.md |
| Token | action-secondary-base | #0a64c2 | #0564c2 | tokens.md, tokens.json |
| Token | action-secondary-focus | #0a64c2 | #0564c2 | tokens.md, tokens.json |
| Token | action-primary-active | #02422b | #003d00 | tokens.md, tokens.json |
| Token | action-primary-base | #008945 | #00893e | tokens.md |
| Token | action-primary-focus | #008945 | #00893e | tokens.md |
| Input | border colour | var(--gray-40) | var(--gray-50) | components.md |
| Input | font-size | 0.9375rem (15px) | 0.875rem (14px) | components.md |
| Input | padding | 0.6875rem 0.75rem | 0.6875rem 0.875rem | components.md |
| Notice | border | 1px solid transparent | none (removed) | components.md |
| Notice | font-size | 0.875rem (14px) | 0.75rem (12px) | components.md |
| Notice | padding | 0.75rem 1rem | 0.75rem | components.md |
| Notice/Warning | background | var(--ui-warning-base) | var(--palette-bread) | components.md |
| Notice/Warning | text colour | var(--ui-warning-contrast) | var(--type-secondary) | components.md |
| Accordion | container | border + border-radius | overflow: hidden (dividers only) | components.md |
| Accordion | title font | Inter 500 | SmileyFace Bold | components.md |
| Accordion | header padding | 1rem 1.25rem | 1rem | components.md |
| Accordion | body padding | 1rem 1.25rem | 0 1rem 1rem | components.md |
| Accordion | body background | var(--gray-10) | #fff | components.md |
| Tabs | font-family | Inter | SmileyFace Bold | components.md |
| Tabs | font-size | 0.9375rem | 1rem | components.md |
| Tabs | inactive colour | type-tertiary | type-primary | components.md |
| Tabs | active indicator | 2px brand-primary-base | 3px action-secondary-base | components.md |
| Tabs | padding | 0.75rem 1.25rem | 1rem | components.md |
| Toggle items | border colour | var(--gray-40) | var(--gray-50) | components.md |

## Still TODO

1. Update all example HTML files (categoryPage, productPage, checkout, etc.) to use corrected CSS
2. Extract Header/Nav variants from Figma (mobile, desktop, checkout, basket variants)
3. Consider adding Footer component to kit
4. Regenerate productComparison.html with all corrected values
