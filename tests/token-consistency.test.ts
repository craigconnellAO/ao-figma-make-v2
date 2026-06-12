/**
 * Bug Condition Exploration Test — Token Value Drift & Internal Inconsistency
 *
 * **Validates: Requirements 1.3, 1.4**
 *
 * This property-based test verifies that design tokens appearing in multiple
 * kit files (tokens.md and tokens.json) have IDENTICAL values across all sources.
 *
 * Known bug conditions:
 * - `action-primary-base`: tokens.md has `#008945`, tokens.json has `#00893e`
 * - `action-secondary-base`: tokens.md has `#0a64c2`, tokens.json has `#0564c2`
 *
 * This test is EXPECTED TO FAIL on unfixed code — failure confirms the bug exists.
 */

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

// --- Parsers ---

interface TokenValue {
  name: string;
  source: string;
  value: string;
}

/**
 * Parse colour tokens from the markdown tables in tokens.md.
 * Looks for rows with format: | `token-name` | `#hexval` | ... |
 */
function parseMarkdownTableTokens(content: string): Map<string, string> {
  const tokens = new Map<string, string>();
  // Match table rows like: | `token-name` | `#hexval` | ...
  const tableRowRegex = /\|\s*`([^`]+)`\s*\|\s*`(#[0-9a-fA-F]{6})`\s*\|/g;
  let match: RegExpExecArray | null;
  while ((match = tableRowRegex.exec(content)) !== null) {
    tokens.set(match[1], match[2].toLowerCase());
  }
  return tokens;
}

/**
 * Parse colour tokens from the :root CSS block in tokens.md.
 * Looks for lines like: --token-name: #hexval;
 */
function parseRootBlockTokens(content: string): Map<string, string> {
  const tokens = new Map<string, string>();
  // Extract the :root block
  const rootBlockMatch = content.match(/:root\s*\{([^}]+(?:\{[^}]*\}[^}]*)*)\}/s);
  if (!rootBlockMatch) return tokens;

  const rootContent = rootBlockMatch[1];
  // Match CSS custom properties with hex colour values
  const propRegex = /--([a-z0-9-]+):\s*(#[0-9a-fA-F]{6})\b/g;
  let match: RegExpExecArray | null;
  while ((match = propRegex.exec(rootContent)) !== null) {
    tokens.set(match[1], match[2].toLowerCase());
  }
  return tokens;
}

/**
 * Parse colour tokens from tokens.json.
 * Navigates the DTCG structure to extract $value fields for color type tokens.
 */
function parseTokensJson(json: Record<string, unknown>): Map<string, string> {
  const tokens = new Map<string, string>();

  function walk(obj: Record<string, unknown>, path: string[]): void {
    for (const [key, val] of Object.entries(obj)) {
      if (key.startsWith('$')) continue;

      const value = val as Record<string, unknown>;
      if (value && typeof value === 'object') {
        if (value['$value'] && typeof value['$value'] === 'string' && value['$type'] === 'color') {
          // Build the token name from the path
          const tokenName = [...path, key].join('-');
          tokens.set(tokenName, (value['$value'] as string).toLowerCase());
        } else {
          walk(value, [...path, key]);
        }
      }
    }
  }

  // Walk the color section
  if (json.color && typeof json.color === 'object') {
    walk(json.color as Record<string, unknown>, []);
  }

  return tokens;
}

/**
 * Map JSON path-based names to the CSS custom property names used in tokens.md.
 * e.g., "action-primary-base" stays the same, "gray-10" stays the same,
 * "brand-primary-base" stays the same, etc.
 */
function normalizeJsonTokenName(jsonName: string): string {
  // The JSON structure uses nested objects, resulting in paths like:
  // "gray-10", "brand-primary-base", "action-primary-base", etc.
  // These already map directly to the CSS custom property names
  return jsonName;
}

// --- Load files ---

const kitDir = resolve(import.meta.dirname, '..', 'kit');
const tokensMdContent = readFileSync(resolve(kitDir, 'tokens.md'), 'utf-8');
const tokensJsonContent = JSON.parse(readFileSync(resolve(kitDir, 'tokens.json'), 'utf-8'));

// Parse all three sources
const markdownTableTokens = parseMarkdownTableTokens(tokensMdContent);
const rootBlockTokens = parseRootBlockTokens(tokensMdContent);
const jsonTokens = parseTokensJson(tokensJsonContent);

// Normalize JSON token names for comparison
const normalizedJsonTokens = new Map<string, string>();
for (const [name, value] of jsonTokens) {
  normalizedJsonTokens.set(normalizeJsonTokenName(name), value);
}

// Build a set of all token names that appear in multiple sources
const allTokenNames = new Set<string>();
for (const name of markdownTableTokens.keys()) allTokenNames.add(name);
for (const name of rootBlockTokens.keys()) allTokenNames.add(name);
for (const name of normalizedJsonTokens.keys()) allTokenNames.add(name);

// Filter to tokens that appear in at least 2 sources (cross-file tokens)
interface CrossFileToken {
  name: string;
  values: { source: string; value: string }[];
}

const crossFileTokens: CrossFileToken[] = [];
for (const name of allTokenNames) {
  const values: { source: string; value: string }[] = [];
  if (markdownTableTokens.has(name)) {
    values.push({ source: 'tokens.md (table)', value: markdownTableTokens.get(name)! });
  }
  if (rootBlockTokens.has(name)) {
    values.push({ source: 'tokens.md (:root)', value: rootBlockTokens.get(name)! });
  }
  if (normalizedJsonTokens.has(name)) {
    values.push({ source: 'tokens.json', value: normalizedJsonTokens.get(name)! });
  }
  if (values.length >= 2) {
    crossFileTokens.push({ name, values });
  }
}

// --- Property-Based Test ---

describe('Bug Condition: Token Value Drift & Internal Inconsistency', () => {
  /**
   * **Validates: Requirements 1.3, 1.4**
   *
   * Property: For every colour token that appears in multiple sources
   * (tokens.md table, tokens.md :root block, tokens.json), the value
   * MUST be identical across all sources.
   *
   * This test is EXPECTED TO FAIL on unfixed code because:
   * - action-primary-base: #008945 (tokens.md) vs #00893e (tokens.json)
   * - action-secondary-base: #0a64c2 (tokens.md) vs #0564c2 (tokens.json)
   */
  it('all cross-file colour tokens have identical values across sources', () => {
    // Use fast-check to sample from the set of cross-file tokens
    const tokenArbitrary = fc.constantFrom(...crossFileTokens);

    fc.assert(
      fc.property(tokenArbitrary, (token: CrossFileToken) => {
        // All values for this token across sources must be identical
        const firstValue = token.values[0].value;
        for (const entry of token.values) {
          if (entry.value !== firstValue) {
            // Report the inconsistency clearly
            const valuesReport = token.values
              .map((v) => `${v.source}: ${v.value}`)
              .join(', ');
            throw new Error(
              `Token "${token.name}" has inconsistent values: ${valuesReport}`
            );
          }
        }
        return true;
      }),
      {
        numRuns: crossFileTokens.length * 3, // Run enough to hit all tokens multiple times
        seed: 42, // Deterministic for reproducibility
      }
    );
  });
});
