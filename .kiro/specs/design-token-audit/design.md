# Design Token Audit Bugfix Design

## Overview

The AO Figma Make kit contains design token values that have drifted from the Figma library (source of truth). There are also internal inconsistencies between kit files (e.g. `action-primary-base` is `#008945` in tokens.md but `#00893e` in tokens.json). This fix takes a two-phase approach:

1. **Phase 1 — Audit Page**: Generate a comprehensive self-contained HTML file (`examples/design-token-audit.html`) that renders every token and every component variant/state. This page will be opened in Figma for "Check Designs" validation against the actual AO Figma library.

2. **Phase 2 — Kit Correction**: After Figma identifies discrepancies, update `kit/tokens.md`, `kit/tokens.json`, `kit/components.md`, and `kit/typography.md` with corrected values and resolve all internal inconsistencies.

## Glossary

- **Bug_Condition (C)**: Any token value in the kit files that differs from the Figma library source of truth, OR any token that has conflicting values across kit files
- **Property (P)**: All token values across all kit files are consistent with each other AND match the Figma library exactly
- **Preservation**: Tokens and component structures that are already correct must remain unchanged; HTML/CSS component structure and `data-aods` attributes must not change
- **Audit Page**: A single self-contained HTML file rendering every token and component for visual comparison against Figma
- **Kit Files**: The four source-of-truth files — `tokens.md`, `tokens.json`, `components.md`, `typography.md`
- **Check Designs**: Figma's built-in feature that overlays a rendered page against a design file to identify pixel-level differences
- **DTCG**: Design Token Community Group format used in `tokens.json`

## Bug Details

### Bug Condition

The bug manifests when any kit file contains a token value that either (a) conflicts with the same token in another kit file, or (b) differs from the Figma library source of truth. The current kit has no mechanism to systematically surface all such discrepancies in a single pass.

**Formal Specification:**
```
FUNCTION isBugCondition(token)
  INPUT: token of type { name: string, file: string, value: string }
  OUTPUT: boolean
  
  figmaValue := getFigmaLibraryValue(token.name)
  otherFileValues := getValuesFromOtherKitFiles(token.name)
  
  RETURN token.value != figmaValue
         OR EXISTS(otherValue IN otherFileValues WHERE otherValue != token.value)
END FUNCTION
```

### Examples

- `action-primary-base`: tokens.md has `#008945`, tokens.json has `#00893e` — internal conflict, and one (or both) may differ from Figma
- `action-secondary-base`: tokens.md has `#0a64c2`, tokens.json has `#0564c2` — internal conflict, and one (or both) may differ from Figma
- Border radius values: Current values (`4px`, `8px`, `16px`, `24px`, `40px`) may not match the Figma library's actual radius scale
- Typography: Font weights, sizes, or line-heights in the type scale may have drifted from Figma source

## Expected Behavior

### Preservation Requirements

**Unchanged Behaviors:**
- The spacing scale (4px base: 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64px) must remain unchanged unless Figma explicitly contradicts it
- Component HTML structure, class names, and `data-aods` attributes must remain identical
- The two-font system (SmileyFace for headings/CTAs, Inter for body/UI) must remain unchanged
- Shadow token values must remain unchanged unless Figma identifies them as incorrect
- All existing example HTML pages must continue to render correctly after corrections
- The DTCG schema structure in tokens.json must remain valid

**Scope:**
All token values that already match the Figma library should be completely unaffected by this fix. The audit page (Phase 1) is additive — it creates a new file without modifying existing ones. Phase 2 only modifies values that Figma confirms as incorrect.

## Hypothesized Root Cause

Based on the bug description, the most likely issues are:

1. **Manual Transcription Errors**: Token values were manually copied from Figma into multiple kit files at different times, leading to typos (e.g. `#008945` vs `#00893e` — a single character transposition in the hex code)

2. **Version Drift**: The Figma library has been updated since the kit files were last synchronized, but the kit files were not updated to match

3. **Incomplete Propagation**: When a value was corrected in one file (e.g. tokens.json), the change was not propagated to the corresponding location in tokens.md or the `:root` CSS block

4. **Ambiguous Source of Truth**: With values defined in both markdown tables and JSON, there's no automated validation that they stay in sync, allowing silent drift

## Correctness Properties

Property 1: Bug Condition - Token Value Accuracy

_For any_ token where the kit value differs from the Figma library value (isBugCondition returns true), the corrected kit files SHALL contain the exact hex value, radius, or typography value specified by the Figma library, consistently across ALL kit files (tokens.md, tokens.json, components.md `:root` block, and typography.md).

**Validates: Requirements 2.1, 2.2, 2.3, 2.4, 2.5**

Property 2: Preservation - Correct Token Stability

_For any_ token where the kit value already matches the Figma library value (isBugCondition returns false), the corrected kit files SHALL contain the exact same value as before the fix, preserving all correct token values, component structures, and file formats.

**Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5, 3.6**

## Fix Implementation

### Changes Required

#### Phase 1: Audit Page Generation

**File**: `examples/design-token-audit.html`

**Purpose**: Create a new single-file HTML page structured for Figma "Check Designs" comparison.

**Specific Structure:**

1. **Header Section**: Page title, version, generation date
2. **Colour Tokens Section**: Every colour rendered as a swatch grid
   - Each swatch: 80×80px square with hex label below
   - Grouped by category: Neutrals, Brand, Typography, Action Primary, Action Secondary, Action Light/Dark/Inactive, UI Surfaces, Food Palette
   - Include both `base` and state variants (hover, focus, active, contrast, glow)
3. **Spacing Section**: Visual blocks demonstrating each spacing value
   - Filled rectangles at each spacing increment with px/rem label
4. **Border Radius Section**: Squares demonstrating each radius value
   - Same-size boxes with increasing radius, labelled with token name and px value
5. **Shadow Section**: Cards demonstrating each elevation level
   - Identical white cards with each shadow applied, labelled
6. **Typography Section**: Each type class rendered at actual size
   - Show font family, weight, size, line-height for each scale step
   - Include both SmileyFace and Inter examples
7. **Component Sections** (one per component, 14 total):
   - **Buttons**: All 6 variants × all sizes × states (default, hover, focus, active, disabled)
   - **Inputs**: Default, error, success, disabled, with helper text
   - **Select**: Default and disabled
   - **Textarea**: Default
   - **Toggle Items** (Checkbox/Radio): Default, checked, hover, disabled, inline pill, highlighted
   - **Tags**: All 7 semantic variants × default and large sizes
   - **Notices**: All 4 variants (highlight, success, warning, error)
   - **Cards**: Default, raised, success, highlight, error, with divider
   - **Breadcrumb**: Standard 3-level
   - **Tabs**: Active + inactive states
   - **Accordion**: Expanded + collapsed states
   - **Quantity Stepper**: Default state
   - **Spinner**: Default, small, white-on-dark
   - **Nav**: Full dark header bar

**Implementation Details:**
- Single self-contained HTML file with all CSS inline in `<style>`
- Includes full `:root` token block and `@font-face` block
- All components use `data-aods` attributes
- White background with clear section dividers for Figma overlay comparison
- Each section has a clear heading and consistent internal spacing
- Colour swatches display hex value as text label for easy cross-reference
- Generous whitespace between sections so Figma can isolate each token/component

#### Phase 2: Kit File Corrections

**Files**: `kit/tokens.md`, `kit/tokens.json`, `kit/components.md`, `kit/typography.md`

**Process** (after Figma validation):

1. **Resolve Internal Conflicts First**: For each conflicting value, determine the correct value from Figma
   - `action-primary-base`: Resolve `#008945` vs `#00893e` to the Figma value
   - `action-secondary-base`: Resolve `#0a64c2` vs `#0564c2` to the Figma value

2. **Update tokens.md**: Correct hex values in markdown tables AND in the `:root` CSS block within the same file

3. **Update tokens.json**: Correct `$value` fields in DTCG JSON to match

4. **Update components.md**: If the `:root` block or any inline CSS references corrected values, update those too

5. **Update typography.md**: If any font specifications (weights, sizes, line-heights) need correction, update the type scale table and the CSS block

6. **Cross-validate**: Ensure every token appears with the same value in all files where it's referenced

## Testing Strategy

### Validation Approach

The testing strategy follows a two-phase approach: first, generate the audit page and use Figma Check Designs to surface discrepancies (the "counterexamples"), then apply corrections and re-validate that the audit page now matches.

### Exploratory Bug Condition Checking

**Goal**: Surface counterexamples that demonstrate the token drift BEFORE implementing corrections. Use Figma "Check Designs" to identify every value that doesn't match the source library.

**Test Plan**: Generate the comprehensive audit HTML page, open it in a browser, then use Figma's Check Designs overlay feature to compare against the AO component library. Document every discrepancy.

**Test Cases**:
1. **Colour Token Comparison**: Render all colour swatches and compare against Figma library swatches (will reveal hex mismatches)
2. **Radius Comparison**: Render radius demos and compare against Figma component corners (will reveal radius drift)
3. **Typography Comparison**: Render full type scale and compare against Figma text styles (will reveal font spec drift)
4. **Component Visual Comparison**: Render all component variants and compare against Figma component library (will reveal compound issues)

**Expected Counterexamples**:
- At minimum, `action-primary-base` and `action-secondary-base` will show discrepancies due to known internal conflicts
- Border radius values may show as different from Figma's current values
- Possible additional colour or typography drift not yet identified

### Fix Checking

**Goal**: Verify that for all tokens where the bug condition holds, the corrected files contain the Figma-verified value consistently across all kit files.

**Pseudocode:**
```
FOR ALL token WHERE isBugCondition(token) DO
  correctedValue := getValueFromCorrectedKit(token.name)
  figmaValue := getFigmaLibraryValue(token.name)
  ASSERT correctedValue == figmaValue
  ASSERT valueInTokensMd(token.name) == correctedValue
  ASSERT valueInTokensJson(token.name) == correctedValue
  ASSERT valueInRootBlock(token.name) == correctedValue
END FOR
```

### Preservation Checking

**Goal**: Verify that for all tokens where the bug condition does NOT hold, the value remains unchanged after the fix.

**Pseudocode:**
```
FOR ALL token WHERE NOT isBugCondition(token) DO
  ASSERT getValueFromCorrectedKit(token.name) == getValueFromOriginalKit(token.name)
END FOR
```

**Testing Approach**: After applying Phase 2 corrections, re-generate the audit page and run Figma Check Designs again. All previously-matching tokens should still match. Additionally, open existing example HTML pages to confirm they still render correctly.

**Test Cases**:
1. **Spacing Preservation**: Verify the spacing scale (4px base) is unchanged in the corrected files
2. **Shadow Preservation**: Verify shadow values remain unchanged (unless Figma explicitly identified them as wrong)
3. **Component Structure Preservation**: Verify HTML structure, class names, and `data-aods` attributes are unchanged
4. **Existing Pages Preservation**: Open `examples/componentLibrary.html` and other existing examples to confirm they still render correctly with updated tokens

### Unit Tests

- Validate that tokens.md `:root` block parses correctly and contains all expected custom properties
- Validate that tokens.json is valid JSON conforming to DTCG schema
- Validate that every token referenced in components.md CSS exists in the `:root` block
- Cross-check that every token value in tokens.md matches the corresponding value in tokens.json

### Property-Based Tests

- Generate all token names from the kit, verify each appears in both tokens.md and tokens.json with identical values
- For each component in components.md, verify all CSS custom properties used are defined in the `:root` block
- Verify that no raw hex values appear in component CSS outside of the `:root` definition block

### Integration Tests

- Render the audit page in a browser and verify no CSS errors or missing references
- Open the audit page in Figma and run Check Designs against the AO library
- After Phase 2 corrections, re-run the Figma Check Designs comparison and verify zero discrepancies for corrected tokens
- Open all existing example pages and verify visual rendering is unchanged for unaffected tokens
