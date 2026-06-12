# Bugfix Requirements Document

## Introduction

The AO Figma Make kit (ao-figma-make-v2) contains design token values that have drifted from the actual Figma library (source of truth). Incorrect values exist for border radii, some colour tokens, and possibly font specifications across `kit/tokens.md`, `kit/tokens.json`, `kit/components.md`, and `kit/typography.md`. Additionally, there are internal inconsistencies between kit files (e.g. `action-primary-base` is `#008945` in tokens.md but `#00893e` in tokens.json; `action-secondary-base` is `#0a64c2` in tokens.md but `#0564c2` in tokens.json).

The fix requires a two-phase approach:
1. Generate a comprehensive design token audit page (HTML) that renders every token, component variant, and state so it can be validated against the Figma library via "Check Designs"
2. Update kit files with corrected values once Figma identifies the discrepancies

## Bug Analysis

### Current Behavior (Defect)

1.1 WHEN a prototype is generated using the kit's border radius tokens THEN the system applies incorrect radius values that do not match the Figma library source of truth

1.2 WHEN a prototype is generated using the kit's colour tokens THEN the system applies some incorrect hex values that do not match the Figma library source of truth

1.3 WHEN referencing `action-primary-base` across kit files THEN the system has conflicting values (`#008945` in tokens.md vs `#00893e` in tokens.json), creating ambiguity about which is correct

1.4 WHEN referencing `action-secondary-base` across kit files THEN the system has conflicting values (`#0a64c2` in tokens.md vs `#0564c2` in tokens.json), creating ambiguity about which is correct

1.5 WHEN a prototype is generated using the kit's font specifications THEN the system may apply incorrect font weights, sizes, or line-heights that do not match the Figma library source of truth

1.6 WHEN there is no comprehensive audit page available THEN the system provides no mechanism to systematically validate all token values against the Figma library in a single pass

### Expected Behavior (Correct)

2.1 WHEN a prototype is generated using the kit's border radius tokens THEN the system SHALL apply radius values that exactly match the Figma library source of truth

2.2 WHEN a prototype is generated using the kit's colour tokens THEN the system SHALL apply hex values that exactly match the Figma library source of truth

2.3 WHEN referencing `action-primary-base` across kit files THEN the system SHALL have a single consistent correct value across tokens.md, tokens.json, and the `:root` CSS block

2.4 WHEN referencing `action-secondary-base` across kit files THEN the system SHALL have a single consistent correct value across tokens.md, tokens.json, and the `:root` CSS block

2.5 WHEN a prototype is generated using the kit's font specifications THEN the system SHALL apply font family, weight, size, and line-height values that exactly match the Figma library source of truth

2.6 WHEN the design token audit page is generated THEN the system SHALL render every token (colours, spacing, radii, shadows, typography) and every component variant in every state, structured for Figma "Check Designs" validation

### Unchanged Behavior (Regression Prevention)

3.1 WHEN tokens that are already correct are referenced THEN the system SHALL CONTINUE TO use their current values without modification

3.2 WHEN the spacing scale tokens are referenced THEN the system SHALL CONTINUE TO use the 4px-base scale (4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64px) without modification

3.3 WHEN the shadow tokens are referenced THEN the system SHALL CONTINUE TO produce correct elevation effects (unless Figma identifies these as incorrect)

3.4 WHEN the component HTML structure and class names are used THEN the system SHALL CONTINUE TO produce markup that maps 1:1 to `@ao/components` production library via `data-aods` attributes

3.5 WHEN the typography font families (SmileyFace for headings/CTAs, Inter for body/UI) are referenced THEN the system SHALL CONTINUE TO use the same two-font system without introducing additional typefaces

3.6 WHEN existing example HTML pages reference kit tokens THEN the system SHALL CONTINUE TO render correctly after token values are updated (no broken references)
