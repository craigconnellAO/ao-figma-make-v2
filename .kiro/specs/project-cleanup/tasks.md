# Implementation Plan: Project Cleanup

## Overview

A sequential 5-phase cleanup pipeline executed as shell commands and file edits. Each phase corresponds to one requirement and must run in order since later phases depend on earlier moves. All changes are staged for a single commit at the end.

## Tasks

- [x] 1. Consolidate prototypes into examples/
  - [x] 1.1 Move prototype HTML files from `prototypes/` to `examples/`
    - Move `bottom-sheet-variants.html`, `checkout-flow.html`, `login-flow.html` into `examples/`
    - _Requirements: 1.1_
  - [x] 1.2 Move trust-bridge-prototype HTML to `examples/` with conflict resolution
    - Rename `trust-bridge-prototype/index.html` to `examples/trust-bridge-prototype.html` (conflict: `examples/index.html` already exists)
    - _Requirements: 1.2, 1.3_
  - [x] 1.3 Remove empty source directories
    - Remove `prototypes/` and `trust-bridge-prototype/` directories
    - _Requirements: 1.4, 1.5_

- [x] 2. Archive completed specs
  - [x] 2.1 Create archive directory and move completed spec folders
    - Create `.kiro/specs/_archive/` if it doesn't exist
    - Move `.kiro/specs/checkout-flow-prototype` to `.kiro/specs/_archive/`
    - Move `.kiro/specs/design-token-audit` to `.kiro/specs/_archive/`
    - Preserve all files within each folder without modification
    - _Requirements: 2.1, 2.2, 2.3, 2.4_

- [x] 3. Remove .DS_Store from git index
  - [x] 3.1 Remove .DS_Store from git tracking
    - Check if `.DS_Store` is currently tracked with `git ls-files --error-unmatch`
    - If tracked, run `git rm --cached .DS_Store`
    - If not tracked, skip without error
    - Verify `.gitignore` already contains `.DS_Store` entry (no edit needed)
    - _Requirements: 3.1, 3.2, 3.3_

- [x] 4. Checkpoint — Verify file moves
  - Ensure all prototype files exist in `examples/`, source directories are removed, specs are archived, and `.DS_Store` is untracked. Ask the user if questions arise.

- [ ] 5. Update internal path references
  - [x] 5.1 Update steering file fileMatchPattern
    - Edit `.kiro/steering/design-best-practices.md` frontmatter to remove `'**/prototypes/**/*.html'` and `'**/trust-bridge-prototype/**/*.html'` from `fileMatchPattern`
    - Resulting pattern: `['**/examples/**/*.html']`
    - _Requirements: 4.1_
  - [x] 5.2 Validate no stale path references remain
    - Run grep scan across `.md`, `.ts`, `.js`, `.json` files (excluding `node_modules/`, `.git/`, `_archive/`) for `prototypes/` or `trust-bridge-prototype/`
    - Update any hits found to reference `examples/` instead
    - _Requirements: 4.2, 4.3_

- [ ] 6. Update README.md
  - [x] 6.1 Replace the Repo layout section with updated directory tree
    - Update the code block to reflect consolidated `examples/` directory with all HTML files listed
    - Remove `prototypes/` and `trust-bridge-prototype/` entries
    - _Requirements: 5.1, 5.2_
  - [x] 6.2 Remove the symlink note
    - Delete the blockquote note about `examples/` being a symlink
    - _Requirements: 5.3_
  - [x] 6.3 Verify other README sections are preserved
    - Confirm no other sections were modified
    - _Requirements: 5.4_

- [ ] 7. Stage and commit all changes
  - [-] 7.1 Stage all changes and create commit
    - Run `git add -A`
    - Commit with message: `chore: consolidate prototypes, archive specs, clean .DS_Store`
    - _Requirements: 1.1, 1.2, 2.1, 3.1, 4.1, 5.1_

- [~] 8. Final checkpoint — Post-condition validation
  - Run validation checks: confirm ≥18 HTML files in `examples/`, source dirs removed, archived specs present, `.DS_Store` untracked, no stale path refs, README clean. Ask the user if questions arise.

## Notes

- This is a one-shot reorganisation with no application code — all tasks are shell commands and file edits
- Each phase depends on the previous one completing successfully (sequential execution required)
- Conflict resolution for `index.html` uses the source-directory-prefix strategy documented in the design
- No property-based tests are needed — validation is post-condition assertion checks on a deterministic set of file moves
- The `.gitignore` already contains `.DS_Store` so no edit to that file is required

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2"] },
    { "id": 1, "tasks": ["1.3"] },
    { "id": 2, "tasks": ["2.1", "3.1"] },
    { "id": 3, "tasks": ["5.1", "5.2"] },
    { "id": 4, "tasks": ["6.1", "6.2", "6.3"] },
    { "id": 5, "tasks": ["7.1"] }
  ]
}
```
