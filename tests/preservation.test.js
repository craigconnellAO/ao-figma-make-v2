/**
 * Property 2: Preservation — Correct Token & Structure Stability
 *
 * These tests verify that tokens and structures which are ALREADY CORRECT
 * in the unfixed code remain stable. They must PASS on unfixed code to
 * confirm the baseline behaviour we need to preserve after the fix.
 *
 * **Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5, 3.6**
 */
import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ─── File Loaders ───────────────────────────────────────────────────────────

const KIT_DIR = resolve(__dirname, '..', 'kit');

const tokensMd = readFileSync(resolve(KIT_DIR, 'tokens.md'), 'utf-8');
const tokensJson = JSON.parse(readFileSync(resolve(KIT_DIR, 'tokens.json'), 'utf-8'));
const componentsMd = readFileSync(resolve(KIT_DIR, 'components.md'), 'utf-8');
const typographyMd = readFileSync(resolve(KIT_DIR, 'typography.md'), 'utf-8');

// ─── Parsers ────────────────────────────────────────────────────────────────

/**
 * Extract CSS custom properties from the :root block in tokens.md
 */
function parseRootBlock(md) {
  const rootMatch = md.match(/:root\s*\{([\s\S]*?)\n\}\s*\n```/);
  if (!rootMatch) return {};

  const rootContent = rootMatch[1];
  const props = {};
  const propRegex = /--([\w-]+)\s*:\s*([^;]+);/g;
  let match;
  while ((match = propRegex.exec(rootContent)) !== null) {
    props[match[1]] = match[2].trim().toLowerCase();
  }
  return props;
}

/**
 * Extract token values from markdown tables in tokens.md
 * Looks for rows with backtick-wrapped token names and hex values
 */
function parseMarkdownTableTokens(md) {
  const tokens = {};
  // Match table rows: | `token-name` | `#hex` | or | `token-name` | #hex |
  const rowRegex = /\|\s*`([\w-]+)`\s*\|\s*`?(#[0-9a-fA-F]{6})`?\s*\|/g;
  let match;
  while ((match = rowRegex.exec(md)) !== null) {
    tokens[match[1]] = match[2].toLowerCase();
  }
  return tokens;
}

/**
 * Extract color values from tokens.json into a flat name→hex mapping
 */
function extractJsonColorTokens(json) {
  const tokens = {};

  function walkColors(obj, prefix = '') {
    for (const [key, val] of Object.entries(obj)) {
      if (key.startsWith('$')) continue;
      const path = prefix ? `${prefix}-${key}` : key;
      if (val && typeof val === 'object' && '$value' in val && val.$type === 'color') {
        tokens[path] = val.$value.toLowerCase();
      } else if (val && typeof val === 'object' && !('$value' in val)) {
        walkColors(val, path);
      }
    }
  }

  if (json.color) walkColors(json.color);
  return tokens;
}

/**
 * Extract spacing tokens from tokens.json
 */
function extractJsonSpacingTokens(json) {
  const tokens = {};
  if (json.spacing) {
    for (const [key, val] of Object.entries(json.spacing)) {
      if (key.startsWith('$')) continue;
      tokens[key] = { value: val.$value, description: val.$description || '' };
    }
  }
  return tokens;
}

/**
 * Extract spacing tokens from the markdown table in tokens.md
 */
function parseSpacingTable(md) {
  const tokens = {};
  const spacingSection = md.match(/## 5 · Spacing[\s\S]*?(?=\n## )/);
  if (!spacingSection) return tokens;

  const rowRegex = /\|\s*`spacing-(\d+)`\s*\|\s*([\d.]+rem)\s*\|\s*(\d+)px\s*\|/g;
  let match;
  while ((match = rowRegex.exec(spacingSection[0])) !== null) {
    tokens[match[1]] = { rem: match[2], px: parseInt(match[3]) };
  }
  return tokens;
}

/**
 * Extract shadow values from :root block
 */
function parseShadowsFromRoot(md) {
  const rootProps = parseRootBlock(md);
  const shadows = {};
  for (const [key, val] of Object.entries(rootProps)) {
    if (key.startsWith('shadow') && key !== 'shadow-overlay') {
      shadows[key] = val;
    }
  }
  return shadows;
}

/**
 * Extract shadow values from tokens.json
 */
function extractJsonShadowTokens(json) {
  const tokens = {};
  if (json.shadow) {
    for (const [key, val] of Object.entries(json.shadow)) {
      if (key.startsWith('$')) continue;
      const name = key === 'default' ? 'shadow' : `shadow-${key}`;
      tokens[name] = val.$value.toLowerCase();
    }
  }
  return tokens;
}

// ─── Pre-computed data ──────────────────────────────────────────────────────

const rootBlockTokens = parseRootBlock(tokensMd);
const markdownTableTokens = parseMarkdownTableTokens(tokensMd);
const jsonColorTokens = extractJsonColorTokens(tokensJson);
const jsonSpacingTokens = extractJsonSpacingTokens(tokensJson);
const mdSpacingTokens = parseSpacingTable(tokensMd);
const rootShadows = parseShadowsFromRoot(tokensMd);
const jsonShadows = extractJsonShadowTokens(tokensJson);

// ─── Known Bug Condition Tokens ─────────────────────────────────────────────
// These tokens have KNOWN inconsistencies between files (the bug).
// Preservation tests exclude these.
const BUG_CONDITION_TOKENS = new Set([
  'action-primary-base',
  'action-primary-focus',
  'action-secondary-base',
  'action-secondary-focus',
]);

// ─── Gray tokens ────────────────────────────────────────────────────────────
const GRAY_TOKENS = [
  'gray-10', 'gray-20', 'gray-30', 'gray-40', 'gray-50',
  'gray-60', 'gray-70', 'gray-80', 'gray-90', 'gray-100',
];

// ─── Expected spacing scale ─────────────────────────────────────────────────
const EXPECTED_SPACING = [
  { key: '1', px: 4, rem: '0.25rem' },
  { key: '2', px: 8, rem: '0.5rem' },
  { key: '3', px: 12, rem: '0.75rem' },
  { key: '4', px: 16, rem: '1rem' },
  { key: '5', px: 20, rem: '1.25rem' },
  { key: '6', px: 24, rem: '1.5rem' },
  { key: '8', px: 32, rem: '2rem' },
  { key: '10', px: 40, rem: '2.5rem' },
  { key: '12', px: 48, rem: '3rem' },
  { key: '14', px: 56, rem: '3.5rem' },
  { key: '16', px: 64, rem: '4rem' },
];

// ─── data-aods component attributes ────────────────────────────────────────
const EXPECTED_COMPONENTS = [
  'button', 'field', 'radio-button-group', 'radio-button',
  'checkbox-group', 'checkbox', 'tag', 'notice', 'card',
  'breadcrumb', 'tabs', 'accordion', 'quantity', 'loading-spinner', 'nav',
];

// The 14 component root types from the index
const FOURTEEN_COMPONENT_ROOTS = [
  'button',             // 1. Button
  'field',              // 2. Field (covers Input, Select, Textarea)
  'radio-button-group', // 5. Checkbox/Radio - group level
  'tag',                // 6. Tag
  'notice',             // 7. Notice
  'card',               // 8. Card
  'breadcrumb',         // 9. Breadcrumb
  'tabs',               // 10. Tabs
  'accordion',          // 11. Accordion
  'quantity',           // 12. Quantity stepper
  'loading-spinner',    // 13. Loading spinner
  'nav',                // 14. Nav
];

// ─── Typography classes ─────────────────────────────────────────────────────
const SMILEY_FACE_CLASSES = [
  't-display-headline', 't-display-lg', 't-display',
  't-title-lg', 't-title', 't-title-sm', 't-cta',
];

const INTER_CLASSES = [
  't-body', 't-body-sm', 't-caption', 't-link', 't-link-sm',
];

// ═══════════════════════════════════════════════════════════════════════════════
// TEST SUITES
// ═══════════════════════════════════════════════════════════════════════════════

describe('Property 2: Preservation — Correct Token & Structure Stability', () => {

  // ─── 3.1 Consistent tokens across files ─────────────────────────────────
  describe('Requirement 3.1: Correct tokens maintain identical values across files', () => {

    it('all gray-* tokens have identical values in tokens.md table, :root block, and tokens.json', () => {
      fc.assert(
        fc.property(fc.constantFrom(...GRAY_TOKENS), (tokenName) => {
          const mdTableValue = markdownTableTokens[tokenName];
          const rootValue = rootBlockTokens[tokenName];
          // In JSON, gray tokens are under color.gray with just the number
          const grayNum = tokenName.replace('gray-', '');
          const jsonValue = jsonColorTokens[`gray-${grayNum}`];

          // All three sources must exist
          if (!mdTableValue || !rootValue || !jsonValue) {
            throw new Error(`Token ${tokenName} missing from a source: md=${mdTableValue}, root=${rootValue}, json=${jsonValue}`);
          }

          // All three sources must have the same value
          if (mdTableValue !== rootValue) {
            throw new Error(`${tokenName}: md table (${mdTableValue}) !== :root (${rootValue})`);
          }
          if (mdTableValue !== jsonValue) {
            throw new Error(`${tokenName}: md table (${mdTableValue}) !== json (${jsonValue})`);
          }
        }),
        { numRuns: 100, seed: 42 }
      );
    });

    it('non-buggy color tokens are consistent between tokens.md :root and tokens.json', () => {
      // Build list of tokens that exist in BOTH :root and JSON, excluding known bugs
      const consistentTokens = Object.keys(rootBlockTokens).filter(name => {
        if (BUG_CONDITION_TOKENS.has(name)) return false;
        // Only test color tokens (hex values)
        const val = rootBlockTokens[name];
        if (!val.startsWith('#')) return false;
        // Must also exist in JSON
        return jsonColorTokens[name] !== undefined;
      });

      expect(consistentTokens.length).toBeGreaterThan(0);

      fc.assert(
        fc.property(fc.constantFrom(...consistentTokens), (tokenName) => {
          const rootValue = rootBlockTokens[tokenName];
          const jsonValue = jsonColorTokens[tokenName];

          if (rootValue !== jsonValue) {
            throw new Error(`${tokenName}: :root (${rootValue}) !== tokens.json (${jsonValue})`);
          }
        }),
        { numRuns: 200, seed: 42 }
      );
    });
  });

  // ─── 3.2 Spacing scale consistency ──────────────────────────────────────
  describe('Requirement 3.2: Spacing scale (4px base) is consistent across files', () => {

    it('all 11 spacing values match the 4px-base scale in tokens.md and tokens.json', () => {
      fc.assert(
        fc.property(fc.constantFrom(...EXPECTED_SPACING), ({ key, px, rem }) => {
          // Check tokens.md table
          const mdToken = mdSpacingTokens[key];
          if (!mdToken) {
            throw new Error(`spacing-${key} missing from tokens.md table`);
          }
          if (mdToken.px !== px) {
            throw new Error(`spacing-${key} px in tokens.md: expected ${px}, got ${mdToken.px}`);
          }
          if (mdToken.rem !== rem) {
            throw new Error(`spacing-${key} rem in tokens.md: expected ${rem}, got ${mdToken.rem}`);
          }

          // Check tokens.json
          const jsonToken = jsonSpacingTokens[key];
          if (!jsonToken) {
            throw new Error(`spacing-${key} missing from tokens.json`);
          }
          if (jsonToken.value !== rem) {
            throw new Error(`spacing-${key} in tokens.json: expected ${rem}, got ${jsonToken.value}`);
          }

          // Verify 4px base calculation
          const expectedPx = parseFloat(rem) * 16;
          if (expectedPx !== px) {
            throw new Error(`spacing-${key}: ${rem} * 16 = ${expectedPx}, expected ${px}`);
          }
        }),
        { numRuns: 100, seed: 42 }
      );
    });

    it('spacing scale has exactly 11 entries', () => {
      expect(Object.keys(mdSpacingTokens)).toHaveLength(11);
      // Filter out $ keys from jsonSpacingTokens
      const jsonKeys = Object.keys(jsonSpacingTokens).filter(k => !k.startsWith('$'));
      expect(jsonKeys).toHaveLength(11);
    });
  });

  // ─── 3.3 Shadow token consistency ──────────────────────────────────────
  describe('Requirement 3.3: Shadow tokens are consistent across files', () => {

    const SHADOW_TOKENS = ['shadow', 'shadow-md', 'shadow-lg', 'shadow-xl'];

    it('all shadow tokens match between :root block and tokens.json', () => {
      fc.assert(
        fc.property(fc.constantFrom(...SHADOW_TOKENS), (shadowName) => {
          const rootValue = rootShadows[shadowName];
          const jsonValue = jsonShadows[shadowName];

          if (!rootValue) {
            throw new Error(`Shadow ${shadowName} missing from :root block`);
          }
          if (!jsonValue) {
            throw new Error(`Shadow ${shadowName} missing from tokens.json`);
          }

          // Normalize whitespace for comparison
          const normalizeSpaces = (s) => s.replace(/\s+/g, ' ').trim();
          const normalizedRoot = normalizeSpaces(rootValue);
          const normalizedJson = normalizeSpaces(jsonValue);

          if (normalizedRoot !== normalizedJson) {
            throw new Error(`${shadowName}: :root (${normalizedRoot}) !== json (${normalizedJson})`);
          }
        }),
        { numRuns: 100, seed: 42 }
      );
    });
  });

  // ─── 3.4 Component HTML structure ─────────────────────────────────────
  describe('Requirement 3.4: Component structure uses data-aods attributes on all component roots', () => {

    it('all 14 component roots have data-aods attributes in components.md', () => {
      fc.assert(
        fc.property(fc.constantFrom(...FOURTEEN_COMPONENT_ROOTS), (componentName) => {
          const pattern = new RegExp(`data-aods="${componentName}"`, 'g');
          const matches = componentsMd.match(pattern);
          if (!matches || matches.length === 0) {
            throw new Error(`Component root "${componentName}" has no data-aods attribute in components.md`);
          }
        }),
        { numRuns: 100, seed: 42 }
      );
    });

    it('components index lists exactly 14 items', () => {
      const componentListMatch = componentsMd.match(/Components, in order:\n\n([\s\S]*?)\n---/);
      expect(componentListMatch).not.toBeNull();

      const listItems = componentListMatch[1].match(/^\d+\./gm);
      expect(listItems).toHaveLength(14);
    });

    it('every data-aods value in components.md HTML blocks is from the expected set', () => {
      // Extract only data-aods values from code blocks (```html ... ```)
      const codeBlocks = componentsMd.match(/```html\n([\s\S]*?)```/g) || [];
      const allCode = codeBlocks.join('\n');
      const allDataAods = allCode.match(/data-aods="([\w-]+)"/g) || [];
      const values = allDataAods.map(m => m.match(/data-aods="([\w-]+)"/)[1]);
      const uniqueValues = [...new Set(values)];

      expect(uniqueValues.length).toBeGreaterThan(0);
      for (const val of uniqueValues) {
        expect(EXPECTED_COMPONENTS).toContain(val);
      }
    });
  });

  // ─── 3.5 Typography two-font system ───────────────────────────────────
  describe('Requirement 3.5: Typography uses two-font system (SmileyFace/Inter)', () => {

    it('all heading/CTA classes use SmileyFace font-family', () => {
      fc.assert(
        fc.property(fc.constantFrom(...SMILEY_FACE_CLASSES), (className) => {
          const pattern = new RegExp(`\\.${className}\\s*\\{([^}]+)\\}`, 's');
          const match = typographyMd.match(pattern);
          if (!match) {
            throw new Error(`Class .${className} not found in typography.md CSS`);
          }

          const rule = match[1];
          if (!rule.match(/font-family:\s*'SmileyFace/)) {
            throw new Error(`Class .${className} does not use SmileyFace font-family`);
          }
        }),
        { numRuns: 100, seed: 42 }
      );
    });

    it('all body/UI classes use Inter font-family', () => {
      fc.assert(
        fc.property(fc.constantFrom(...INTER_CLASSES), (className) => {
          const pattern = new RegExp(`\\.${className}\\s*\\{([^}]+)\\}`, 's');
          const match = typographyMd.match(pattern);
          if (!match) {
            throw new Error(`Class .${className} not found in typography.md CSS`);
          }

          const rule = match[1];
          if (!rule.match(/font-family:\s*'Inter'/)) {
            throw new Error(`Class .${className} does not use Inter font-family`);
          }
        }),
        { numRuns: 100, seed: 42 }
      );
    });

    it('type scale table only references SmileyFace variants and Inter', () => {
      const typeScaleSection = typographyMd.match(/## Type scale[\s\S]*?(?=\n## |$)/);
      expect(typeScaleSection).not.toBeNull();

      const tableContent = typeScaleSection[0];
      // Extract font names from table rows
      const fontEntries = tableContent.match(/\|\s*(SmileyFace[\w-]*|Inter)\s*\|/g);
      expect(fontEntries).not.toBeNull();

      const fontNames = fontEntries.map(f => f.match(/\|\s*([\w-]+)/)[1]);
      const uniqueFonts = [...new Set(fontNames)];

      for (const font of uniqueFonts) {
        expect(['SmileyFace', 'SmileyFace-Headline', 'Inter']).toContain(font);
      }
    });
  });

  // ─── 3.6 tokens.json valid DTCG structure ─────────────────────────────
  describe('Requirement 3.6: tokens.json is valid JSON conforming to DTCG schema structure', () => {

    it('tokens.json parses as valid JSON', () => {
      expect(tokensJson).toBeDefined();
      expect(typeof tokensJson).toBe('object');
    });

    it('tokens.json has required DTCG top-level fields', () => {
      expect(tokensJson.$schema).toBeDefined();
      expect(tokensJson.$description).toBeDefined();
      expect(tokensJson.$version).toBeDefined();
    });

    it('tokens.json has expected top-level token groups', () => {
      expect(tokensJson.color).toBeDefined();
      expect(tokensJson.spacing).toBeDefined();
      expect(tokensJson.radius).toBeDefined();
      expect(tokensJson.shadow).toBeDefined();
      expect(tokensJson.typography).toBeDefined();
      expect(tokensJson.breakpoint).toBeDefined();
    });

    it('all token groups have leaf nodes with $value and $type fields', () => {
      const groups = ['color', 'spacing', 'radius', 'shadow', 'breakpoint'];

      fc.assert(
        fc.property(fc.constantFrom(...groups), (group) => {
          function validateLeaves(obj, path = group) {
            for (const [key, val] of Object.entries(obj)) {
              if (key.startsWith('$')) continue;
              if (val && typeof val === 'object') {
                if ('$value' in val) {
                  if (!val.$type) {
                    throw new Error(`Leaf at ${path}.${key} has $value but no $type`);
                  }
                } else {
                  validateLeaves(val, `${path}.${key}`);
                }
              }
            }
          }
          validateLeaves(tokensJson[group]);
        }),
        { numRuns: 100, seed: 42 }
      );
    });
  });
});
