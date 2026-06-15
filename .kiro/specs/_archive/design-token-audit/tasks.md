# Implementation Plan

## Overview

This plan implements a design token and component audit for the AO Figma Make kit. Instead of manual "Check Designs" comparison, we imported actual Figma library components and extracted specs programmatically via the Figma MCP. Corrections are applied to kit files (tokens.md, tokens.json, components.md) with property-based tests validating consistency.

## Tasks

- [x] 1. Write bug condition exploration test
  - **Property 1: Bug Condition** - Token Drift Between Kit Files
  - Property-based test confirming token drift exists between kit files
  - Test FAILED as expected on unfixed code (counterexample: action-primary-base #008945 vs #00893e)
  - _Requirements: 1.3, 1.4_

- [x] 2. Write preservation property tests
  - **Property 2: Preservation** - Correct Token Stability
  - 15 tests covering gray tokens, spacing, shadows, component structure, typography, DTCG schema
  - All PASSED on unfixed code confirming baseline to preserve
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6_

- [x] 3. Phase 1 - Generate design token audit

  - [x] 3.1 Build audit page (examples/design-token-audit.html) with all token sections
  - [x] 3.2 Build Figma audit frames on Make Kit Corrections page with imported library components
  - _Requirements: 2.6_

- [x] 4. Phase 2 - Extract Figma specs and correct kit files

  - [x] 4.1 Extract button specs from Figma library (Primary/Secondary/Tertiary CTA)
  - [x] 4.2 Extract Form Field specs from Figma library
  - [x] 4.3 Extract Status Alerts specs from Figma library
  - [x] 4.4 Extract Accordion specs from Figma library
  - [x] 4.5 Extract Tab specs from Figma library
  - [x] 4.6 Extract Radio Button and Checkbox specs from Figma library
  - [x] 4.7 Extract Loading Spinner specs from Figma library
  - [x] 4.8 Correct kit/tokens.md (action-secondary-base, action-primary-active, action-primary-base/focus)
  - [x] 4.9 Correct kit/tokens.json (matching values)
  - [x] 4.10 Correct kit/components.md (buttons, inputs, notices, accordion, tabs, toggle items)
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

- [x] 5. Verify tests pass after corrections

  - [x] 5.1 token-consistency.test.ts PASSES (token drift fixed)
    - **Property 1: Expected Behavior** - Token Drift Between Kit Files
  - [x] 5.2 preservation.test.js PASSES (16/16 tests, no regressions)
    - **Property 2: Preservation** - Correct Token Stability
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6_

- [x] 6. Update all example HTML files with corrected CSS

  - [x] 6.1 Update examples/productComparison.html
  - [x] 6.2 Update examples/categoryPage.html
  - [x] 6.3 Update examples/productPage.html
  - [x] 6.4 Update examples/checkout.html
  - [x] 6.5 Update examples/accountDashboard.html
  - [x] 6.6 Update examples/orderConfirmation.html
  - [x] 6.7 Update examples/componentLibrary.html
  - [x] 6.8 Update examples/patternsGallery.html
  - [x] 6.9 Update examples/radioButtonShowcase.html
  - [x] 6.10 Update examples/design-token-audit.html
  - _Requirements: 3.6_

- [x] 7. Final checkpoint
  - All 16 property tests pass (token-consistency + preservation)
  - All example HTML files aligned to corrected kit values
  - _Requirements: 3.6_

## Task Dependency Graph

```json
{
  "waves": [
    ["1", "2"],
    ["3"],
    ["4"],
    ["5"],
    ["6"],
    ["7"]
  ]
}
```

## Corrections Applied

| Component | Property | Was | Corrected To | Source |
|-----------|----------|-----|--------------|--------|
| Button | border-radius | 9999px | var(--radius-sm) / 8px | Figma Primary CTA |
| Button | border-width | 2px | 1px | Figma Primary CTA |
| Token | action-secondary-base | #0a64c2 | #0564c2 | Figma Secondary CTA |
| Token | action-secondary-focus | #0a64c2 | #0564c2 | Figma Secondary CTA |
| Token | action-primary-active | #02422b | #003d00 | Figma Primary CTA |
| Token | action-primary-base | #008945 | #00893e | tokens.json (was correct) |
| Token | action-primary-focus | #008945 | #00893e | tokens.json (was correct) |
| Input | border colour | var(--gray-40) | var(--gray-50) | Figma Form Field |
| Input | font-size | 0.9375rem | 0.875rem | Figma Form Field |
| Input | padding | 0.6875rem 0.75rem | 0.6875rem 0.875rem | Figma Form Field |
| Notice | border | 1px solid | none | Figma Status Alerts |
| Notice | font-size | 0.875rem | 0.75rem | Figma Status Alerts |
| Notice | padding | 0.75rem 1rem | 0.75rem | Figma Status Alerts |
| Notice/Warning | background | ui-warning-base | palette-bread | Figma Status Alerts |
| Accordion | container | border + radius | dividers only | Figma Accordion |
| Accordion | title font | Inter 500 | SmileyFace Bold | Figma Accordion |
| Tabs | font-family | Inter | SmileyFace Bold | Figma Tab |
| Tabs | active indicator | 2px brand-primary-base | 3px action-secondary-base | Figma Tab |
| Toggle items | border colour | var(--gray-40) | var(--gray-50) | Figma Radio Button |

## Notes

- Phase 1 approach changed: instead of relying on manual "Check Designs", we imported actual Figma library components via MCP and extracted specs programmatically
- Phase 2 was completed by pulling variable definitions and design context from each library component
- The productComparison.html example was partially updated (tokens only) but all examples need full CSS alignment
- Header/Nav: all variants extracted from Figma (Mobile Default, Checkout, Basket, Desktop 990/1200) — proposition bar with Strata icons documented
- Footer: extracted from Figma — 3-row layout (gray-90 → gray-100 → gray-100), desktop centred pipe-separated layout confirmed
- Icon system: Strata icon font integrated across all kit files and examples (CDN: assets.ao.com/design-system/assets/icons/latest/strata-icons.css)
