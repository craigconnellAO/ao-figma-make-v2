# Requirements Document

## Introduction

A functional multi-step HTML checkout prototype for the AO (ao.com) e-commerce design system. The prototype implements a complete three-step checkout flow (Delivery → Contact Details → Payment) as a single self-contained HTML file with working step navigation, form validation states, conditional UI elements, and responsive mobile-first layout. It uses AO design system tokens, typography, and component blueprints exactly as specified in the kit documentation.

## TLDR

- 15 detailed requirements covering the full Delivery → Contact → Payment flow
- Each has a user story and specific acceptance criteria using EARS patterns
- Covers: navigation, address lookup, delivery options, Five Star upsell, contact form, payment methods, order summary, bottom sheet modal, design system compliance, responsiveness, interactivity, and accessibility

## Glossary

- **Prototype**: A single self-contained HTML file with inline CSS and JavaScript that demonstrates the checkout flow
- **Step_Navigator**: The pill-style tab bar that displays Delivery / Contact / Payment steps with active state highlighting
- **Delivery_Step**: The first step of checkout covering address entry, address confirmation, delivery date/time selection, and Five Star membership upsell
- **Contact_Step**: The second step of checkout covering email, name, mobile, and alternative number collection
- **Payment_Step**: The third step of checkout covering payment method selection (Card or AO Finance) and card entry form
- **Address_Lookup_Flow**: The progressive disclosure sequence: postcode entry → Find Address → dropdown selector → confirmed address display
- **Five_Star_Upsell**: The AO Five Star membership promotional card offering delivery benefits at £39.99/year
- **Order_Summary_Sidebar**: The persistent right-hand panel showing product details, delivery cost, and running total
- **Bottom_Sheet_Modal**: A modal overlay triggered when a user attempts to proceed without Five Star benefits, offering a chance to add them
- **Design_Token**: A named CSS custom property from the AO design system (colours, spacing, radius, shadows) that must be used instead of raw values
- **AO_Design_System**: The collection of tokens, typography rules, and component blueprints defined in the kit/ directory

## Requirements

### Requirement 1: Single-File Self-Contained Prototype

**User Story:** As a designer, I want the checkout prototype to be a single HTML file with all styles and scripts inline, so that I can open it directly in a browser without any build tooling or dependencies.

#### Acceptance Criteria

1. THE Prototype SHALL be a single HTML file containing inline `<style>` and `<script>` blocks with no external resource requests other than: Google Fonts (fonts.googleapis.com, fonts.gstatic.com), the Strata icons CSS (assets.ao.com), and the AO SmileyFace font files (media.ao.com)
2. THE Prototype SHALL include the complete `:root` token block from the AO design system in its inline stylesheet, covering all primitive, typography, action, UI surface, radius, and shadow token categories defined in `kit/tokens.md`
3. THE Prototype SHALL include all `@font-face` declarations for SmileyFace and SmileyFace-Headline fonts as specified in `kit/typography.md`
4. THE Prototype SHALL include the Strata icons stylesheet link (`https://assets.ao.com/design-system/assets/icons/latest/strata-icons.css`) in the document `<head>`
5. WHEN opened as a local file (via `file://` protocol) in the current or previous major release of Chrome, Firefox, Safari, or Edge, THE Prototype SHALL render all visible content with correct layout, typography, and colour tokens applied, producing no stylesheet-parsing errors in the browser console
6. THE Prototype SHALL declare `<!DOCTYPE html>`, a `lang` attribute on `<html>`, a UTF-8 charset `<meta>` tag, and a viewport `<meta>` tag in the document `<head>`

### Requirement 2: Three-Step Navigation

**User Story:** As a user, I want to see my progress through the checkout and navigate between completed steps, so that I know where I am in the process.

#### Acceptance Criteria

1. THE Step_Navigator SHALL display three steps labelled "Delivery", "Contact", and "Payment" as pill-style tabs in that fixed order, with "Delivery" as the initially active step
2. WHEN a step is active, THE Step_Navigator SHALL highlight that step tab with a navy background and white text, and exactly one step SHALL be active at any time
3. WHEN a step is completed, THE Step_Navigator SHALL display a checkmark indicator on that step tab and apply a visually distinct completed style differentiating it from both active and unreached steps
4. WHEN the user clicks a completed step tab, THE Step_Navigator SHALL navigate back to that step, make it the active step, and preserve any data already entered in subsequent steps
5. THE Step_Navigator SHALL render unreached step tabs in a disabled visual style (muted text, no pointer cursor) and SHALL NOT navigate when the user clicks an unreached step tab
6. THE Prototype SHALL display only one step's content at a time, hiding the other steps
7. WHEN the user successfully submits the active step's content, THE Step_Navigator SHALL mark that step as completed and advance the active state to the next step in sequence

### Requirement 3: Header and Global Layout

**User Story:** As a user, I want to see the AO brand identity and access help throughout checkout, so that I feel confident in the purchase experience.

#### Acceptance Criteria

1. THE Prototype SHALL display a sticky header containing the AO logo (green smiley icon), a Help link with phone icon, and a Basket link with item count badge
2. WHILE the viewport width is 900px or above, THE Prototype SHALL use a two-column layout with the main content area on the left and an Order_Summary_Sidebar fixed at 360px width on the right, where the sidebar uses `position: sticky` with a top offset of 80px
3. WHILE the viewport width is below 900px, THE Prototype SHALL display a single-column layout with the order summary appearing below the main content
4. THE Prototype SHALL display a footer with social media icons, legal text, and credit broker information
5. WHEN the basket contains one or more items, THE Prototype SHALL display a notification badge on the Basket icon showing the item count

### Requirement 4: Delivery Step - Address Entry

**User Story:** As a user, I want to enter my delivery address using a postcode lookup, so that I can quickly provide my address without typing it in full.

#### Acceptance Criteria

1. WHEN the Delivery_Step is active, THE Prototype SHALL display a form with a house number/name text input (optional, maximum 50 characters) and a postcode text input (required, maximum 8 characters), each with a visible `<label>`
2. WHEN the user clicks the "Find Address" button with the postcode field populated, THE Address_Lookup_Flow SHALL display a dropdown selector populated with at least 3 simulated address options (the house number/name field may be empty)
3. IF the user clicks the "Find Address" button while the postcode field is empty, THEN THE Prototype SHALL display an error state on the postcode field with a descriptive error message indicating a postcode is required
4. WHEN the dropdown selector is displayed, THE Address_Lookup_Flow SHALL display a "My address isn't listed" link below the dropdown that returns the user to the postcode entry form state when clicked
5. WHEN the user selects an address from the dropdown and clicks "Use this address", THE Prototype SHALL display the confirmed address showing street, city, and postcode with an "Edit address" link
6. WHEN the user clicks "Edit address", THE Prototype SHALL return to the postcode entry form state with the previously entered house number/name and postcode values preserved in the input fields

### Requirement 5: Delivery Step - Delivery Options

**User Story:** As a user, I want to choose my delivery date and time, so that I can receive my order at a convenient time.

#### Acceptance Criteria

1. WHEN an address is confirmed, THE Delivery_Step SHALL display a Delivery Options section with a date picker (select dropdown) showing at least 3 available delivery dates and a time picker (select dropdown) showing at least 3 time window options
2. WHEN the Delivery Options section is displayed, THE Delivery_Step SHALL pre-select the first available delivery date and the first available time window as defaults
3. THE Delivery_Step SHALL display delivery confirmation text: "We'll text you by 8am with a 4-hour delivery window" and "Track your order online every step of the way"
4. THE Delivery_Step SHALL display a "Continue" button as a full-width primary action button
5. WHEN the user clicks "Continue" on the Delivery_Step with a confirmed address and a delivery date selected, THE Prototype SHALL transition to the Contact_Step
6. IF the user clicks "Continue" on the Delivery_Step without a confirmed address, THEN THE Prototype SHALL remain on the Delivery_Step and not transition to the Contact_Step

### Requirement 6: Delivery Step - Five Star Membership Upsell

**User Story:** As a user, I want to understand the AO Five Star membership benefits, so that I can decide whether to add it to my order for delivery savings.

#### Acceptance Criteria

1. THE Delivery_Step SHALL display the Five_Star_Upsell card with headline "Save up to £40 today!", pricing "£39.99/yr", and a checkmark benefits list containing exactly 3 items: member price savings, free and unlimited delivery, and returns
2. THE Five_Star_Upsell SHALL display a "Learn more about AO Five Star" link that navigates to the Five Star membership information page in a new browser tab
3. THE Five_Star_Upsell SHALL include a checkbox to join AO Five Star, displayed in the unchecked state by default
4. WHEN the user selects the Five Star checkbox, THE Order_Summary_Sidebar SHALL add a "AO Five Star" line item of £39.99 and update the order total to include the membership cost
5. WHEN the user deselects the Five Star checkbox, THE Order_Summary_Sidebar SHALL remove the "AO Five Star" line item and reduce the order total by £39.99
6. THE Delivery_Step SHALL display a PayPal payment option notice below the Continue button
7. THE Delivery_Step SHALL display a terms and privacy notice containing links to the terms of service and privacy policy

### Requirement 7: Contact Details Step

**User Story:** As a user, I want to provide my contact information, so that AO can send me delivery updates and communicate about my order.

#### Acceptance Criteria

1. WHEN the Contact_Step is active, THE Prototype SHALL display form fields for: email (text input, required), title (dropdown with options: Mr, Mrs, Miss, Ms, Mx, Dr; required), first name (text input, required, maximum 50 characters), last name (text input, required, maximum 50 characters), mobile number (text input, required), and alternative number (text input, required)
2. THE Contact_Step SHALL display an info notice below the alternative number field explaining: "Plans change, we get it. Add a backup mobile number and, if someone else is accepting the delivery, they'll get updates too."
3. THE Contact_Step SHALL display a security notice: "Your details are safe & secure. See how your data is used in our privacy policy"
4. THE Contact_Step SHALL display a "Continue" button as the primary green full-width CTA
5. IF all required fields on the Contact_Step pass validation, THEN THE Prototype SHALL transition to the Payment_Step when the user clicks "Continue"
6. IF a required field is left empty on form submission, THEN THE Prototype SHALL display an error state on that field with a message indicating which field needs to be completed
7. IF the email field contains a value that is not a valid email format (e.g. missing "@" or domain), THEN THE Prototype SHALL display an error state on the email field with a message indicating the expected format
8. IF the mobile number or alternative number field contains a value that is not a valid UK phone number (11 digits beginning with 07 for mobile, or a valid UK landline format), THEN THE Prototype SHALL display an error state on that field with a message indicating the expected format

### Requirement 8: Payment Step - Method Selection

**User Story:** As a user, I want to choose between card payment and finance options, so that I can pay in the way that suits me best.

#### Acceptance Criteria

1. WHEN the Payment_Step is active, THE Prototype SHALL display payment method options as radio buttons: "Card payment" (with Visa/Mastercard/Amex logos) and "AO Finance" (with "4.9% Interest Plan" tag), with "Card payment" pre-selected by default
2. WHEN "AO Finance" is selected, THE Prototype SHALL display three finance sub-options as selectable radio buttons: 4.9% Interest Plan, Instalment Plan, and Flexible Payments, each with a one-line description, and an eligibility notice indicating minimum spend and credit check requirements
3. WHEN "Card payment" is selected, THE Prototype SHALL display the card payment form containing: cardholder name, card number, expiry date, and security code input fields, each with a visible label
4. WHEN the user selects a different payment method, THE Prototype SHALL hide the previously displayed content and show the newly selected method's content without page reload, within 300ms
5. IF the user switches from "Card payment" to "AO Finance", THEN THE Prototype SHALL clear any entered card field data and display the finance sub-options with "4.9% Interest Plan" pre-selected

### Requirement 9: Payment Step - Card Payment Form

**User Story:** As a user, I want to enter my card details securely, so that I can complete my purchase.

#### Acceptance Criteria

1. WHEN "Card payment" is selected, THE Prototype SHALL display required fields for: card number (maximum 19 characters, numeric input), expiry date (separate Month and Year dropdowns), security code (maximum 4 characters, numeric input with helper text indicating expected digit count), and name on card (maximum 100 characters)
2. THE Payment_Step SHALL display a "Is your billing address the same as your delivery address?" radio-button-group with Yes and No options, with "Yes" pre-selected by default
3. IF "No" is selected for the billing address question, THEN THE Payment_Step SHALL reveal a billing address form below the toggle
4. THE Payment_Step SHALL display a terms and privacy checkbox (unchecked by default) with label text that includes an inline link to the privacy policy
5. IF the user activates "Confirm order and pay" while the terms checkbox is unchecked, THEN THE Payment_Step SHALL display an error message indicating the terms must be accepted and SHALL NOT submit the form
6. THE Payment_Step SHALL display a "Confirm order and pay" button as the primary green full-width CTA, positioned below the terms checkbox
7. THE Payment_Step SHALL display a payment security trust bar at the bottom containing a padlock icon and "Safepay" badge text stating that card data is held securely

### Requirement 10: Order Summary Sidebar

**User Story:** As a user, I want to see a running summary of my order at all times, so that I know what I am purchasing and the total cost.

#### Acceptance Criteria

1. THE Order_Summary_Sidebar SHALL display the product image placeholder, product name, product price, delivery date and time selection, and an "In stock" status indicator for each line item
2. THE Order_Summary_Sidebar SHALL display subtotal, delivery cost, and grand total formatted as currency with two decimal places and using tabular-nums for alignment, where the grand total equals subtotal plus delivery cost plus any optional membership cost
3. WHEN the user adds Five Star membership, THE Order_Summary_Sidebar SHALL display a "Five Star membership" line item at £39.99 and recalculate the grand total to include the membership cost
4. WHILE the viewport width is 900px or above, THE Order_Summary_Sidebar SHALL remain sticky-positioned so it is always visible while scrolling
5. WHEN the user confirms a delivery address, THE Order_Summary_Sidebar SHALL update the delivery cost from a "TBC" placeholder to the confirmed delivery cost value
6. WHEN the user removes Five Star membership, THE Order_Summary_Sidebar SHALL remove the membership line item and recalculate the grand total to exclude the membership cost

### Requirement 11: Bottom Sheet Modal

**User Story:** As a user, I want to be reminded of Five Star benefits before proceeding without them, so that I can make an informed decision about the membership offer.

#### Acceptance Criteria

1. WHEN the user activates the primary CTA to advance from the Delivery_Step without the Five Star membership checkbox selected, THE Prototype SHALL display the Bottom_Sheet_Modal as a non-dismissible overlay with a semi-transparent scrim covering the page content behind it
2. WHEN the Bottom_Sheet_Modal is displayed, THE Prototype SHALL move keyboard focus to the modal heading and trap focus within the modal until it is closed
3. THE Bottom_Sheet_Modal SHALL display "Don't forget your Five Star member benefits" heading with a stars illustration
4. THE Bottom_Sheet_Modal SHALL display "Free Unpack and Free Remove & Recycle" messaging
5. THE Bottom_Sheet_Modal SHALL display a "Go back to add my benefits" primary CTA button and a "Continue without using my benefits" link, limited to these two actionable elements
6. WHEN the user activates "Go back to add my benefits", THE Bottom_Sheet_Modal SHALL close, remove the scrim, and return keyboard focus to the Five Star membership checkbox on the Delivery_Step
7. WHEN the user activates "Continue without using my benefits", THE Bottom_Sheet_Modal SHALL close, remove the scrim, and advance the flow to the Contact_Step
8. WHEN the Bottom_Sheet_Modal is open and the user presses the Escape key, THE Prototype SHALL treat the action as equivalent to activating "Go back to add my benefits"

### Requirement 12: Design System Compliance

**User Story:** As a designer, I want the prototype to use AO design system tokens and components exactly, so that it can be used as a reliable reference for development handoff.

#### Acceptance Criteria

1. THE Prototype SHALL use only CSS custom property references (e.g. `var(--action-primary-base)`) for all colour, shadow, and border-radius values in component styles — raw hex values are permitted only inside the `:root` token definition block
2. THE Prototype SHALL use SmileyFace font family for all headings and button labels at a minimum size of 14px, and Inter at a minimum weight of 400 for all body text and form labels — SmileyFace SHALL NOT be applied at any size below 14px
3. THE Prototype SHALL use the border-radius token scale: `--radius-sm` (8px) for buttons and inputs, `--radius-md` (16px) for cards, `--radius-2xl` (40px) for pills and tags
4. THE Prototype SHALL apply `data-aods` attributes to all component root elements matching the AO Strata component names as defined in the component blueprints (e.g. `data-aods="button"`, `data-aods="field"`, `data-aods="card"`)
5. THE Prototype SHALL limit to one `btn-primary` instance per semantic section (defined as each `<section>`, `<header>`, `<footer>`, or top-level card grouping), with additional actions using `btn-secondary` or `btn-tertiary`
6. THE Prototype SHALL use the action-primary token group (`--action-primary-base`, #00893e) for primary CTA button backgrounds, not the brand-primary-base token (#12c35a) which is reserved for glow and accent uses only
7. THE Prototype SHALL use only values from the 4px-base spacing scale (4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64px) for all padding, margin, and gap properties — no intermediate values such as 10px or 14px
8. THE Prototype SHALL include the complete `:root` token definition block from the AO design token system and the `@font-face` declarations for SmileyFace and Inter in every generated stylesheet

### Requirement 13: Responsive Mobile-First Design

**User Story:** As a user on a mobile device, I want the checkout to be fully usable on my phone, so that I can complete my purchase on any device.

#### Acceptance Criteria

1. THE Prototype SHALL use a mobile-first CSS approach with breakpoints at 544px (sm), 768px (md), 900px (layout shift from single-column to two-column with sidebar), and 990px (lg)
2. WHILE the viewport width is below 544px, THE Step_Navigator SHALL collapse step labels and show only the active step label with step numbers for others
3. THE Prototype SHALL ensure all interactive elements have a minimum touch target of 44 × 44 pixels
4. WHILE the viewport width is below 544px, THE Prototype SHALL avoid horizontal overflow
5. WHILE the viewport width is below 544px, THE Prototype SHALL use full-width buttons and stacked form layouts

### Requirement 14: Interactive Functionality

**User Story:** As a designer reviewing the prototype, I want all interactions to work functionally, so that I can demonstrate the complete user journey to stakeholders.

#### Acceptance Criteria

1. WHEN the user clicks or presses Enter/Space on a checkout step tab, THE Prototype SHALL display the corresponding tab panel, set `aria-selected="true"` on the active tab, set `aria-selected="false"` on all other tabs, and hide all non-active tab panels
2. THE Prototype SHALL implement the Address_Lookup_Flow with three sequential disclosure states (input → results → confirmed), where each transition completes within 300ms using ease-out easing and only the current state's content is visible
3. WHEN the user selects a payment method radio button, THE Prototype SHALL hide the previously visible payment content section and show the content section corresponding to the selected method, with only one payment content section visible at a time
4. THE Prototype SHALL implement checkbox and radio selection with visual state changes matching the AO toggle-item component pattern, including border-color change to `action-secondary-base`, background tint, and checked indicator on selection
5. WHEN the user activates the Bottom_Sheet_Modal trigger, THE Prototype SHALL open the sheet with a slide-up transition of 300ms ease-out, display a scrim overlay, trap keyboard focus within the sheet, and set `aria-modal="true"` on the dialog element
6. IF the user presses the Escape key, clicks the scrim overlay, or activates the close button while the Bottom_Sheet_Modal is open, THEN THE Prototype SHALL close the sheet with a slide-down transition of 300ms ease-out, remove the scrim, and return keyboard focus to the element that triggered the sheet
7. THE Prototype SHALL implement form field focus states with `box-shadow: 0 0 0 3px rgba(5,100,194,0.15)` and `border-color` change to `action-secondary-base` on `:focus` for all input, select, and textarea elements

### Requirement 15: Accessibility Compliance

**User Story:** As a user with assistive technology, I want the checkout to be navigable and understandable, so that I can complete my purchase independently.

#### Acceptance Criteria

1. THE Prototype SHALL provide focus indicators on every interactive element using `:focus-visible` with a minimum 2px outline that achieves at least 3:1 contrast ratio against adjacent colors
2. THE Prototype SHALL use semantic HTML elements: `<nav>` for navigation, `<main>` for content, `<fieldset>` and `<legend>` for form groups, `<label>` for all inputs
3. THE Prototype SHALL associate all form inputs with visible labels using `for`/`id` attributes
4. WHEN a form input fails validation, THE Prototype SHALL set `aria-invalid="true"` on that input and link an error message element via `aria-describedby`
5. THE Prototype SHALL use `aria-current="step"` on the active step tab and assign `role="dialog"` and `aria-modal="true"` to the Bottom_Sheet_Modal
6. WHILE the Bottom_Sheet_Modal is open, THE Prototype SHALL constrain Tab and Shift+Tab cycling to focusable elements within the modal only
7. WHEN the Bottom_Sheet_Modal closes, THE Prototype SHALL return focus to the element that triggered the modal opening
8. THE Prototype SHALL use `aria-hidden="true"` on decorative icons and provide `aria-label` on icon-only interactive elements
9. THE Prototype SHALL order focusable elements in a logical reading sequence matching the visual layout so that Tab key navigation proceeds through the checkout steps without unexpected jumps
10. THE Prototype SHALL never use color as the sole indicator of state — every state change (error, success, active step) SHALL be conveyed through at least one additional non-color cue such as an icon, text label, or font-weight change
