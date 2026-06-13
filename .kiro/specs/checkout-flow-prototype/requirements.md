# Requirements Document

## Introduction

A functional multi-step HTML checkout prototype for the AO (ao.com) e-commerce design system. The prototype implements a complete three-step checkout flow (Delivery → Contact Details → Payment) as a single self-contained HTML file with working step navigation, form validation states, conditional UI elements, and responsive mobile-first layout. It uses AO design system tokens, typography, and component blueprints exactly as specified in the kit documentation.

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

1. THE Prototype SHALL be a single HTML file containing inline `<style>` and `<script>` blocks with no external dependencies other than Google Fonts, Strata icons CSS, and AO font files
2. THE Prototype SHALL include the complete `:root` token block from the AO design system in its inline stylesheet
3. THE Prototype SHALL include the `@font-face` declarations for SmileyFace and SmileyFace-Headline fonts
4. THE Prototype SHALL include the Strata icons stylesheet link in the document head
5. THE Prototype SHALL render correctly when opened as a local file in a modern browser without a development server

### Requirement 2: Three-Step Navigation

**User Story:** As a user, I want to see my progress through the checkout and navigate between completed steps, so that I know where I am in the process.

#### Acceptance Criteria

1. THE Step_Navigator SHALL display three steps labelled "Delivery", "Contact", and "Payment" as pill-style tabs
2. WHEN a step is active, THE Step_Navigator SHALL highlight that step tab with a navy background and white text
3. WHEN a step is completed, THE Step_Navigator SHALL display a checkmark indicator on that step tab
4. WHEN the user clicks a completed step tab, THE Step_Navigator SHALL navigate back to that step
5. THE Step_Navigator SHALL prevent navigation to steps that have not yet been reached
6. THE Prototype SHALL display only one step's content at a time, hiding the other steps

### Requirement 3: Header and Global Layout

**User Story:** As a user, I want to see the AO brand identity and access help throughout checkout, so that I feel confident in the purchase experience.

#### Acceptance Criteria

1. THE Prototype SHALL display a sticky header containing the AO logo (green smiley icon), a Help link with phone icon, and a Basket link with item count badge
2. THE Prototype SHALL use a two-column layout on desktop viewports: main content area on the left and Order_Summary_Sidebar on the right
3. WHEN the viewport is below 900px, THE Prototype SHALL collapse to a single-column layout with the order summary appearing above the main content
4. THE Prototype SHALL display a footer with social media icons, legal text, and credit broker information

### Requirement 4: Delivery Step - Address Entry

**User Story:** As a user, I want to enter my delivery address using a postcode lookup, so that I can quickly provide my address without typing it in full.

#### Acceptance Criteria

1. WHEN the Delivery_Step is active, THE Prototype SHALL display a form with house number/name and postcode input fields
2. WHEN the user clicks the "Find Address" button, THE Address_Lookup_Flow SHALL display a dropdown selector populated with simulated address options
3. THE Address_Lookup_Flow SHALL display a "My address isn't listed" link below the dropdown selector
4. WHEN the user selects an address and clicks "Use this address", THE Prototype SHALL display the confirmed full address with an "Edit address" link
5. WHEN the user clicks "Edit address", THE Prototype SHALL return to the postcode entry form state

### Requirement 5: Delivery Step - Delivery Options

**User Story:** As a user, I want to choose my delivery date and time, so that I can receive my order at a convenient time.

#### Acceptance Criteria

1. WHEN an address is confirmed, THE Delivery_Step SHALL display a Delivery Options section with a date picker (select dropdown) and a time picker (select dropdown)
2. THE Delivery_Step SHALL display delivery confirmation text: "We'll text you by 8am with a 4-hour delivery window" and "Track your order online every step of the way"
3. THE Delivery_Step SHALL display a "Continue" button as the primary green full-width CTA
4. WHEN the user clicks "Continue" on the Delivery_Step, THE Prototype SHALL validate that an address is confirmed and transition to the Contact_Step

### Requirement 6: Delivery Step - Five Star Membership Upsell

**User Story:** As a user, I want to understand the AO Five Star membership benefits, so that I can decide whether to add it to my order for delivery savings.

#### Acceptance Criteria

1. THE Delivery_Step SHALL display the Five_Star_Upsell card with headline "Save up to £40 today!", pricing "£39.99/yr", and a checkmark benefits list (member price savings, free and unlimited delivery, returns)
2. THE Five_Star_Upsell SHALL display a "Learn more about AO Five Star" link
3. THE Five_Star_Upsell SHALL include a checkbox to join AO Five Star
4. WHEN the user selects the Five Star checkbox, THE Order_Summary_Sidebar SHALL update to include the Five Star membership cost in the total
5. THE Delivery_Step SHALL display a PayPal payment option notice below the Continue button
6. THE Delivery_Step SHALL display a terms and privacy notice

### Requirement 7: Contact Details Step

**User Story:** As a user, I want to provide my contact information, so that AO can send me delivery updates and communicate about my order.

#### Acceptance Criteria

1. WHEN the Contact_Step is active, THE Prototype SHALL display form fields for: email (required), title (dropdown, required), first name (required), last name (required), mobile number (required), and alternative number (required)
2. THE Contact_Step SHALL display an info notice below the alternative number field explaining: "Plans change, we get it. Add a backup mobile number and, if someone else is accepting the delivery, they'll get updates too."
3. THE Contact_Step SHALL display a security notice: "Your details are safe & secure. See how your data is used in our privacy policy"
4. THE Contact_Step SHALL display a "Continue" button as the primary green full-width CTA
5. WHEN the user clicks "Continue" on the Contact_Step, THE Prototype SHALL transition to the Payment_Step
6. WHEN a required field is left empty on form submission, THE Prototype SHALL display an error state on that field with a descriptive error message

### Requirement 8: Payment Step - Method Selection

**User Story:** As a user, I want to choose between card payment and finance options, so that I can pay in the way that suits me best.

#### Acceptance Criteria

1. WHEN the Payment_Step is active, THE Prototype SHALL display payment method options as radio buttons: "Card payment" (with Visa/Mastercard/Amex logos) and "AO Finance" (with "4.9% Interest Plan" tag)
2. WHEN "AO Finance" is selected, THE Prototype SHALL display three finance sub-options: 4.9% Interest Plan, Instalment Plan, and Flexible Payments with descriptions and an eligibility notice
3. WHEN "Card payment" is selected, THE Prototype SHALL display the card payment form
4. THE Prototype SHALL toggle between Card payment and AO Finance content without page reload

### Requirement 9: Payment Step - Card Payment Form

**User Story:** As a user, I want to enter my card details securely, so that I can complete my purchase.

#### Acceptance Criteria

1. WHEN "Card payment" is selected, THE Prototype SHALL display fields for: card number, expiry date (Month and Year dropdowns), security code, and name on card
2. THE Payment_Step SHALL display a "Is your billing address the same as your delivery address?" toggle with Yes/No options
3. THE Payment_Step SHALL display a terms and privacy checkbox with a privacy policy link
4. THE Payment_Step SHALL display a "Confirm order and pay" button as the primary green full-width CTA
5. THE Payment_Step SHALL display a payment security trust bar at the bottom with a padlock icon and "Safepay" badge text about secure card data

### Requirement 10: Order Summary Sidebar

**User Story:** As a user, I want to see a running summary of my order at all times, so that I know what I am purchasing and the total cost.

#### Acceptance Criteria

1. THE Order_Summary_Sidebar SHALL display the product image placeholder, product name, product price, and delivery information
2. THE Order_Summary_Sidebar SHALL display subtotal, delivery cost, and grand total
3. WHEN the user adds Five Star membership, THE Order_Summary_Sidebar SHALL update to include the membership line item and recalculate the total
4. THE Order_Summary_Sidebar SHALL remain sticky on desktop viewports so it is always visible while scrolling
5. THE Order_Summary_Sidebar SHALL update its content contextually as the user progresses through steps (showing delivery cost once confirmed, showing Five Star if selected)

### Requirement 11: Bottom Sheet Modal

**User Story:** As a user, I want to be reminded of Five Star benefits before proceeding without them, so that I can make an informed decision about the membership offer.

#### Acceptance Criteria

1. WHEN the user proceeds from Delivery_Step without selecting Five Star membership, THE Prototype SHALL display the Bottom_Sheet_Modal
2. THE Bottom_Sheet_Modal SHALL display "Don't forget your Five Star member benefits" heading with a stars illustration
3. THE Bottom_Sheet_Modal SHALL display "Free Unpack and Free Remove & Recycle" messaging
4. THE Bottom_Sheet_Modal SHALL display a "Go back to add my benefits" primary CTA button
5. THE Bottom_Sheet_Modal SHALL display a "Continue without using my benefits" link
6. WHEN the user clicks "Go back to add my benefits", THE Bottom_Sheet_Modal SHALL close and return focus to the Five Star checkbox
7. WHEN the user clicks "Continue without using my benefits", THE Bottom_Sheet_Modal SHALL close and proceed to the Contact_Step

### Requirement 12: Design System Compliance

**User Story:** As a designer, I want the prototype to use AO design system tokens and components exactly, so that it can be used as a reliable reference for development handoff.

#### Acceptance Criteria

1. THE Prototype SHALL use only colour values defined as CSS custom properties from the AO design token system — no raw hex values in component styles
2. THE Prototype SHALL use SmileyFace font family for all headings and button labels, and Inter for all body text and form labels
3. THE Prototype SHALL use the border-radius token scale: `--radius-sm` (8px) for buttons and inputs, `--radius-md` (16px) for cards, `--radius-2xl` (40px) for pills and tags
4. THE Prototype SHALL apply `data-aods` attributes to all component roots matching the AO Strata component names
5. THE Prototype SHALL limit to one `btn-primary` per visual section, with additional actions using `btn-secondary` or `btn-tertiary`
6. THE Prototype SHALL use the action-primary token group (#00893e) for primary CTA buttons, not the brand-primary-base token (#12c35a)

### Requirement 13: Responsive Mobile-First Design

**User Story:** As a user on a mobile device, I want the checkout to be fully usable on my phone, so that I can complete my purchase on any device.

#### Acceptance Criteria

1. THE Prototype SHALL use a mobile-first CSS approach with breakpoints at 544px (sm), 768px (md), 900px (layout shift), and 990px (lg)
2. WHEN the viewport is below 544px, THE Step_Navigator SHALL collapse step labels and show only the active step label with step numbers for others
3. THE Prototype SHALL ensure all interactive elements have a minimum touch target of 44 × 44 pixels
4. THE Prototype SHALL avoid horizontal overflow on mobile viewports
5. THE Prototype SHALL use full-width buttons and stacked form layouts on mobile viewports

### Requirement 14: Interactive Functionality

**User Story:** As a designer reviewing the prototype, I want all interactions to work functionally, so that I can demonstrate the complete user journey to stakeholders.

#### Acceptance Criteria

1. THE Prototype SHALL implement working tab switching between checkout steps via JavaScript
2. THE Prototype SHALL implement the Address_Lookup_Flow with progressive disclosure (input → results → confirmed state)
3. THE Prototype SHALL implement payment method radio button switching that shows/hides the corresponding payment content
4. THE Prototype SHALL implement checkbox and radio selection with visual state changes matching the AO toggle-item component pattern
5. THE Prototype SHALL implement the Bottom_Sheet_Modal with open/close transitions and focus management
6. THE Prototype SHALL implement form field focus states with the blue focus ring (`0 0 0 3px rgba(5,100,194,0.15)`)

### Requirement 15: Accessibility Compliance

**User Story:** As a user with assistive technology, I want the checkout to be navigable and understandable, so that I can complete my purchase independently.

#### Acceptance Criteria

1. THE Prototype SHALL provide visible focus indicators (`:focus-visible`) on every interactive element
2. THE Prototype SHALL use semantic HTML elements: `<nav>` for navigation, `<main>` for content, `<fieldset>` and `<legend>` for form groups, `<label>` for all inputs
3. THE Prototype SHALL associate all form inputs with visible labels using `for`/`id` attributes
4. THE Prototype SHALL use `aria-invalid="true"` on error-state inputs and `aria-describedby` linking to error messages
5. THE Prototype SHALL use `aria-current="step"` on the active step tab and appropriate ARIA roles on the modal (`role="dialog"`, `aria-modal="true"`)
6. THE Prototype SHALL trap focus within the Bottom_Sheet_Modal when open and restore focus to the triggering element on close
7. THE Prototype SHALL use `aria-hidden="true"` on decorative icons and provide `aria-label` on icon-only interactive elements
