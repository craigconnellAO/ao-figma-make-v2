# Implementation Plan: Checkout Flow Prototype

## Overview

Build a single self-contained HTML prototype at `prototypes/checkout-flow.html` implementing a three-step checkout flow (Delivery → Contact Details → Payment) for the AO e-commerce design system. The file includes inline `<style>` and `<script>` blocks, uses AO design tokens, typography, and component blueprints, and runs directly from the filesystem with no build step. Property-based tests validate correctness properties using fast-check via the existing vitest setup.

## Tasks

- [x] 1. HTML scaffold and CSS foundation
  - [x] 1.1 Create HTML document scaffold with head section
    - Create `prototypes/checkout-flow.html` with `<!DOCTYPE html>`, `<html lang="en">`, charset and viewport meta tags
    - Add external resource links: Google Fonts (Inter), Strata icons CSS, SmileyFace font files
    - Add `@font-face` declarations for SmileyFace and SmileyFace-Headline
    - Add complete `:root` token block from `kit/tokens.md` (all primitives, typography, action, UI surface, radius, shadow tokens)
    - Add CSS reset (`*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }`)
    - Add typography utility classes (t-display, t-title-lg, t-title, t-title-sm, t-body, t-body-sm, t-caption, t-link, t-link-sm)
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 12.1, 12.2, 12.8_

  - [x] 1.2 Add component CSS styles from kit/components.md
    - Add button styles (btn, btn-primary, btn-secondary, btn-tertiary, btn-lg, btn-full, focus-visible)
    - Add field/input styles (field, field-label, field-input, field-msg, error/success states, field-select-wrap)
    - Add toggle-group and toggle-item styles (radio/checkbox card pattern with blue selection theme)
    - Add card styles (card, card-raised, card-divider, card-success, card-highlight)
    - Add tag styles (tag-success, tag-highlight, tag-neutral, tag-warning, tag-error)
    - Add notice styles (notice-highlight, notice-success, notice-warning, notice-error)
    - Ensure all colour/shadow/radius values use `var()` references, no raw hex outside `:root`
    - _Requirements: 12.1, 12.3, 12.4, 12.5, 12.6, 12.7_

  - [x] 1.3 Add layout CSS (checkout grid, step navigator, sidebar, responsive breakpoints)
    - Add checkout grid: two-column layout at ≥900px (main + 360px sidebar), single-column below
    - Add sidebar sticky positioning (`position: sticky; top: 80px`) for ≥900px
    - Add step navigator bar styles (pill tabs with active/completed/unreached states)
    - Add responsive breakpoints at 544px, 768px, 900px, 990px (mobile-first approach)
    - Add mobile adaptations: collapsed step labels <544px, full-width buttons, stacked forms
    - Add `@media (prefers-reduced-motion: no-preference)` wrapper for transitions
    - Ensure 44×44px minimum touch targets on all interactive elements
    - _Requirements: 3.2, 3.3, 13.1, 13.2, 13.3, 13.4, 13.5_

- [x] 2. Body structure (header, step navigator, footer)
  - [x] 2.1 Build header component
    - Add sticky nav header with AO logo (green smiley icon via Strata), Help link with phone icon, Basket link with item count badge
    - Use `data-aods="nav"` attribute
    - Add `aria-label` on icon-only elements, `aria-hidden="true"` on decorative icons
    - _Requirements: 3.1, 3.5, 12.4, 15.8_

  - [x] 2.2 Build step navigator component
    - Add `role="tablist"` container with three `role="tab"` pill buttons: Delivery, Contact, Payment
    - Implement active state: navy background (`--type-primary`), white text
    - Implement completed state: checkmark icon + blue text (`--action-secondary-base`)
    - Implement unreached state: muted text (`--type-tertiary`), `cursor: not-allowed`
    - Add `aria-selected`, `aria-current="step"` on active tab
    - Add `aria-controls` linking tabs to panels
    - _Requirements: 2.1, 2.2, 2.3, 2.5, 14.1, 15.5_

  - [x] 2.3 Build footer component
    - Add footer with social media icons, legal text, and credit broker information
    - Use `data-aods` attributes on component roots
    - Add `aria-hidden="true"` on decorative icons
    - _Requirements: 3.4, 12.4, 15.8_

- [x] 3. Delivery step implementation
  - [x] 3.1 Build address lookup flow (entry → results → confirmed phases)
    - Create entry phase: house number/name input (optional, max 50) + postcode input (required, max 8) + "Find Address" button
    - Create results phase: select dropdown with 4 simulated addresses + "My address isn't listed" link
    - Create confirmed phase: address summary card with street, city, postcode + "Edit address" link
    - Wrap each phase in a container with `data-phase` attribute for JS toggling
    - Add proper `<label>` elements with `for`/`id` linking for all inputs
    - Add `data-aods="field"` on field wrappers, `data-aods="button"` on buttons
    - _Requirements: 4.1, 4.2, 4.4, 4.5, 4.6, 12.4, 15.2, 15.3_

  - [x] 3.2 Build delivery options section
    - Add date picker select with 3+ dates (e.g. "Thursday 22 May", "Friday 23 May", "Saturday 24 May")
    - Add time picker select with 3+ windows (e.g. "Any time (7am–7pm)", "Morning (7am–12pm)", "Afternoon (12pm–5pm)")
    - Add delivery confirmation text with delivery info messaging
    - Add "Continue" button (`btn-primary btn-full`)
    - Section hidden until address is confirmed
    - _Requirements: 5.1, 5.2, 5.3, 5.4_

  - [x] 3.3 Build Five Star upsell card
    - Add card with "Save up to £40 today!" headline, "£39.99/yr" pricing
    - Add green checkmark benefits list (3 items: member price savings, free delivery, returns)
    - Add checkbox toggle (unchecked default) using toggle-item pattern
    - Add "Learn more about AO Five Star" link (`target="_blank" rel="noopener"`)
    - Add PayPal payment option notice below Continue button
    - Add terms and privacy notice with links
    - _Requirements: 6.1, 6.2, 6.3, 6.6, 6.7_

- [x] 4. Contact details and payment step HTML
  - [x] 4.1 Build contact details step form
    - Add form fields: email, title (select with Mr/Mrs/Miss/Ms/Mx/Dr), first name, last name, mobile, alternative number — all required
    - Add info notice below alt number: "Plans change, we get it…" messaging
    - Add security notice with privacy policy link
    - Add "Continue" button (`btn-primary btn-full`)
    - Use `fieldset`/`legend` for form grouping, visible `<label>` elements with `for`/`id`
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 15.2, 15.3_

  - [x] 4.2 Build payment step with method selection and card form
    - Add radio toggle group: "Card payment" (with Visa/MC/Amex logos) + "AO Finance" (with "4.9% Interest Plan" tag)
    - Add card form: name on card (max 100), card number (max 19, numeric), expiry month/year selects, security code (max 4, numeric)
    - Add finance sub-options: 3 radio items (4.9% Interest, Instalment, Flexible) with descriptions + eligibility notice
    - Add billing address toggle: "Same as delivery?" Yes/No radio group, "No" reveals address form
    - Add terms checkbox (unchecked default) with privacy policy link
    - Add "Confirm order and pay" button (`btn-primary btn-full`)
    - Add payment security trust bar (padlock icon + "Safepay" badge)
    - _Requirements: 8.1, 8.2, 8.3, 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7_

- [x] 5. Order summary sidebar and bottom sheet modal
  - [x] 5.1 Build order summary sidebar
    - Add product card: emoji placeholder image, product name (Samsung 65" TV), price (£999.00), "In stock" tag
    - Add line items: subtotal, delivery cost (initially "TBC"), Five Star (conditional), grand total
    - Use `font-variant-numeric: tabular-nums` for price alignment
    - Format currency with two decimal places
    - Add sidebar card with `card-raised` modifier
    - _Requirements: 10.1, 10.2, 10.4_

  - [x] 5.2 Build bottom sheet modal HTML and CSS
    - Add scrim overlay (`rgba(1,22,48,0.5)`) with slide-up sheet container
    - Add "Don't forget your Five Star member benefits" heading with stars illustration
    - Add "Free Unpack and Free Remove & Recycle" messaging
    - Add "Go back to add my benefits" primary CTA + "Continue without using my benefits" link
    - Set `role="dialog"`, `aria-modal="true"`, `aria-labelledby` on modal element
    - Add slide-up animation CSS (300ms ease-out) with `prefers-reduced-motion` respect
    - _Requirements: 11.1, 11.3, 11.4, 11.5, 14.5, 15.5_

- [x] 6. Checkpoint - Verify HTML structure
  - Ensure all tests pass, ask the user if questions arise.

- [x] 7. JavaScript state management and step navigation
  - [x] 7.1 Implement state object and step navigation controller
    - Create state object tracking: currentStep, stepsCompleted, addressPhase, addressData, deliveryDate/Time, fiveStarSelected, contactData, paymentMethod, billingMatchesDelivery, termsAccepted, bottomSheetOpen
    - Implement `goToStep(n)` function: shows/hides step panels, updates tab aria-selected/aria-current, enforces unreached-step blocking
    - Implement step submission guards: Delivery requires confirmed address + date; Contact requires valid fields; Payment requires terms accepted
    - Add click handlers on completed step tabs to navigate back preserving entered data
    - Ensure exactly one step panel visible at any time
    - _Requirements: 2.2, 2.4, 2.5, 2.6, 2.7, 14.1_

  - [x] 7.2 Implement address lookup flow controller
    - Handle "Find Address" click: validate postcode non-empty, transition entry→results (show populated dropdown)
    - Handle address selection + "Use this address": transition results→confirmed (display address card)
    - Handle "My address isn't listed" link: transition results→entry
    - Handle "Edit address" link: transition confirmed→entry with values preserved
    - Animate transitions with max-height + opacity over 300ms ease-out
    - Show/hide delivery options section when address is confirmed/unconfirmed
    - _Requirements: 4.2, 4.3, 4.4, 4.5, 4.6, 5.6, 14.2_

  - [x] 7.3 Implement payment method switcher
    - Toggle between Card and Finance content sections on radio change
    - Clear card fields when switching from Card to Finance
    - Pre-select "4.9% Interest Plan" when Finance is shown
    - Ensure only one payment content section visible at a time (within 300ms transition)
    - Handle billing address toggle: show/hide billing form on "No" selection
    - _Requirements: 8.4, 8.5, 14.3_

- [x] 8. Order summary calculator and Five Star toggle
  - [x] 8.1 Implement order summary dynamic recalculation
    - Calculate total: product price + delivery cost + (Five Star price if selected)
    - Update delivery cost from "TBC" to £0.00 when address is confirmed
    - Add/remove Five Star line item (£39.99) when checkbox is toggled
    - Debounce rapid toggles (150ms) to prevent flicker
    - Update grand total display with correct formatting (£X.XX)
    - _Requirements: 6.4, 6.5, 10.2, 10.3, 10.5, 10.6_

- [x] 9. Form validation and bottom sheet modal controller
  - [x] 9.1 Implement form validation functions
    - `validatePostcode(value)`: non-empty, max 8 chars
    - `validateEmail(value)`: contains `@` and `.` after `@`
    - `validatePhone(value, type)`: 11 digits, starts with `07` for mobile, `0` for landline
    - `validateRequired(value, maxLength)`: non-empty, within max length
    - `validateCardNumber(value)`: 13–19 digits
    - `validateSecurityCode(value)`: 3–4 digits
    - Apply error states: `is-error` class, `aria-invalid="true"`, `aria-describedby` linking to error message
    - Clear errors on valid blur/change (not keystroke)
    - On submit with multiple errors: highlight all, focus first error field
    - _Requirements: 4.3, 7.5, 7.6, 7.7, 7.8, 9.5, 15.4_

  - [x] 9.2 Implement bottom sheet modal controller
    - Trigger: advancing from Delivery without Five Star selected
    - Open: slide-up 300ms ease-out, show scrim, set focus to modal heading, trap focus (Tab/Shift+Tab cycle)
    - "Go back to add my benefits": close modal, return focus to Five Star checkbox
    - "Continue without using my benefits": close modal, advance to Contact step
    - Escape key: equivalent to "Go back"
    - Close: slide-down 300ms ease-out, remove scrim, restore focus to trigger element
    - _Requirements: 11.1, 11.2, 11.5, 11.6, 11.7, 11.8, 14.5, 14.6, 15.6, 15.7_

- [x] 10. Accessibility and final polish
  - [x] 10.1 Add ARIA attributes and keyboard navigation
    - Ensure all form inputs have visible `<label>` with `for`/`id` pairing
    - Add `aria-hidden="true"` on all decorative icons
    - Add `aria-label` on icon-only interactive elements
    - Verify logical Tab order matches visual layout
    - Ensure focus-visible indicators on every interactive element (3px outline, 2px offset)
    - Add `aria-live` regions for dynamic content updates (order total changes)
    - Ensure non-color state cues: icons for completed steps, text for errors, font-weight for active states
    - _Requirements: 15.1, 15.2, 15.3, 15.4, 15.5, 15.8, 15.9, 15.10_

  - [x] 10.2 Add responsive mobile adaptations and final styling
    - Verify step navigator collapses labels at <544px, showing only active step label
    - Verify no horizontal overflow at narrow viewports
    - Verify full-width buttons and stacked form layouts on mobile
    - Verify sidebar moves below main content on <900px
    - Add `btn-active` translateY(1px) on `:active` state
    - Ensure all transitions ≤300ms with ease-out easing
    - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5, 14.7_

- [x] 11. Checkpoint - Full prototype verification
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 12. Property-based tests
  - [ ]* 12.1 Write property test for order total calculation
    - **Property 4: Order total calculation**
    - Test `calculateTotal(subtotal, deliveryCost, fiveStarSelected)` with arbitrary numeric inputs
    - Verify: total always equals sum of components; toggling Five Star changes total by exactly £39.99
    - Use fast-check with 100+ iterations
    - **Validates: Requirements 6.4, 6.5, 10.2, 10.3, 10.5, 10.6**

  - [ ]* 12.2 Write property test for email validation
    - **Property 5: Form validation (email)**
    - Test `validateEmail(input)` with arbitrary strings
    - Verify: returns valid iff input contains `@` followed by a `.` in the domain part
    - Use fast-check with 100+ iterations
    - **Validates: Requirements 7.6, 7.7**

  - [ ]* 12.3 Write property test for phone validation
    - **Property 5: Form validation (phone)**
    - Test `validatePhone(input, type)` with arbitrary strings
    - Verify: mobile valid iff 11 digits starting `07`; landline valid iff 11 digits starting `0`
    - Use fast-check with 100+ iterations
    - **Validates: Requirements 7.8**

  - [ ]* 12.4 Write property test for step navigation state
    - **Property 1: Step navigation invariant**
    - Test `getStepState(currentStep, completedSteps)` with arbitrary step indices and completion arrays
    - Verify: exactly one step active, unreached steps disabled, active tab has correct styling class
    - Use fast-check with 100+ iterations
    - **Validates: Requirements 2.2, 2.5, 2.6, 14.1**

  - [ ]* 12.5 Write property test for address lookup state machine
    - **Property 3: Address lookup state machine**
    - Test `getAddressPhase(actions)` with arbitrary sequences of lookup actions
    - Verify: valid phase transitions only, exactly one phase active, postcode required for find
    - Use fast-check with 100+ iterations
    - **Validates: Requirements 4.2, 4.3, 4.5, 4.6, 14.2**

  - [ ]* 12.6 Write property test for payment method mutual exclusion
    - **Property 6: Payment method mutual exclusion**
    - Test `getVisiblePaymentSection(selectedMethod)` with arbitrary method selections
    - Verify: exactly one section visible at all times
    - Use fast-check with 100+ iterations
    - **Validates: Requirements 8.4, 14.3**

  - [ ]* 12.7 Write property test for focus trap cycling
    - **Property 7: Bottom sheet focus trap**
    - Test `trapFocus(focusableElements, currentIndex, direction)` with arbitrary element counts and positions
    - Verify: focus always cycles within bounds, never escapes modal
    - Use fast-check with 100+ iterations
    - **Validates: Requirements 11.1, 11.2, 15.6**

- [x] 13. Final checkpoint - Full verification
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document using fast-check via vitest (already configured in the project)
- The single output file is placed at `prototypes/checkout-flow.html`
- All CSS values reference design tokens via `var()` — no raw hex outside `:root`
- Component class names and `data-aods` attributes match `kit/components.md` blueprints exactly

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["1.2", "1.3"] },
    { "id": 2, "tasks": ["2.1", "2.2", "2.3"] },
    { "id": 3, "tasks": ["3.1", "3.2", "3.3", "4.1", "4.2", "5.1", "5.2"] },
    { "id": 4, "tasks": ["7.1"] },
    { "id": 5, "tasks": ["7.2", "7.3", "8.1"] },
    { "id": 6, "tasks": ["9.1", "9.2"] },
    { "id": 7, "tasks": ["10.1", "10.2"] },
    { "id": 8, "tasks": ["12.1", "12.2", "12.3", "12.4", "12.5", "12.6", "12.7"] }
  ]
}
```
