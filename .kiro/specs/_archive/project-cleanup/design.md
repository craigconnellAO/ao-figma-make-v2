# Design Document

## Overview

This design covers a one-shot repository reorganisation executed as a sequence of file-system and git operations. There is no application code to architect — the "system" is a linear cleanup script (shell commands) run once by the developer or agent. The design focuses on operation ordering, conflict handling, and post-condition validation.

## Architecture

The cleanup is a **sequential pipeline** of five phases, each corresponding to one requirement. Phases must execute in dependency order because later phases (path-reference updates, README edits) depend on the moves performed in earlier phases.

```
Phase 1: Consolidate prototypes → examples/
Phase 2: Archive completed specs
Phase 3: Remove .DS_Store from git index
Phase 4: Update internal path references
Phase 5: Update README.md
```

All operations are performed directly on the working tree and staged for a single commit at the end.

## Detailed Design

### Phase 1 — Consolidate Prototypes

**Operations (in order):**

1. Move `prototypes/*.html` → `examples/`
   - Files: `bottom-sheet-variants.html`, `checkout-flow.html`, `login-flow.html`
2. Move `trust-bridge-prototype/*.html` → `examples/`
   - Files: `index.html` (rename to `trust-bridge-prototype.html` for clarity since `examples/index.html` already exists — this is the conflict-resolution rule from Requirement 1.3)
3. Remove empty directories: `prototypes/`, `trust-bridge-prototype/`

**Conflict resolution strategy:**
If a filename already exists in `examples/`, prefix the incoming file with its source directory name (e.g., `index.html` from `trust-bridge-prototype/` becomes `trust-bridge-prototype.html`). In this specific workspace, only `index.html` conflicts.

**Shell commands:**

```bash
# Move prototypes (no conflicts)
mv prototypes/bottom-sheet-variants.html examples/
mv prototypes/checkout-flow.html examples/
mv prototypes/login-flow.html examples/

# Move trust-bridge-prototype (conflict: index.html already exists in examples/)
mv trust-bridge-prototype/index.html examples/trust-bridge-prototype.html

# Remove empty source directories
rmdir prototypes
rmdir trust-bridge-prototype
```

### Phase 2 — Archive Completed Specs

**Operations:**

1. Create `_archive/` directory inside `.kiro/specs/`
2. Move entire spec folders (preserving all contents)

```bash
mkdir -p .kiro/specs/_archive
mv .kiro/specs/checkout-flow-prototype .kiro/specs/_archive/
mv .kiro/specs/design-token-audit .kiro/specs/_archive/
```

### Phase 3 — Remove .DS_Store from Git Index

**Operations:**

1. Check if `.DS_Store` is tracked; if so, remove from index only (keep on disk)
2. Verify `.gitignore` already contains the entry (it does — no edit needed)

```bash
# Conditional removal — only if tracked
git ls-files --error-unmatch .DS_Store 2>/dev/null && git rm --cached .DS_Store || true
```

The `.gitignore` already contains `.DS_Store` so no modification is required.

### Phase 4 — Update Internal Path References

**Files to update:**

| File | Change |
|------|--------|
| `.kiro/steering/design-best-practices.md` | Remove `'**/prototypes/**/*.html'` and `'**/trust-bridge-prototype/**/*.html'` from `fileMatchPattern` |

**Updated frontmatter:**

```yaml
---
inclusion: fileMatch
fileMatchPattern: ['**/examples/**/*.html']
---
```

**Validation scan:**
After edits, grep the entire repo for stale references:

```bash
grep -r --include="*.md" --include="*.ts" --include="*.js" --include="*.json" \
  -e "prototypes/" -e "trust-bridge-prototype/" . \
  --exclude-dir=node_modules --exclude-dir=.git --exclude-dir=_archive
```

Expected result: zero matches.

### Phase 5 — Update README.md

**Edits:**

1. Replace the "Repo layout" code block with the updated tree (no `prototypes/`, no `trust-bridge-prototype/`)
2. Remove the symlink note blockquote that follows the tree
3. Remove any other mentions of the old directories

**Updated Repo layout section:**

```
ao-figma-make-v2/
├── README.md             ← you are here
├── MASTER_PROMPT.md      ← paste into Figma Make at the start of a project
├── handoff.md            ← how to take Make output to a dev conversation
├── kit/                  ← attach all of these to your Figma Make project
│   ├── tokens.md
│   ├── typography.md
│   ├── components.md
│   ├── patterns.md
│   ├── anti-patterns.md
│   ├── tokens.json
│   └── screenshots/
├── examples/             ← open these in a browser to see the system rendered
│   ├── productPage.html
│   ├── componentLibrary.html
│   ├── patternsGallery.html
│   ├── checkout-flow.html
│   ├── login-flow.html
│   ├── bottom-sheet-variants.html
│   └── trust-bridge-prototype.html
└── tests/                ← token consistency and preservation tests
```

### Final Commit

After all phases complete, stage everything and commit:

```bash
git add -A
git commit -m "chore: consolidate prototypes, archive specs, clean .DS_Store"
```

## Error Handling

| Scenario | Handling |
|----------|----------|
| Source file missing (already moved) | `mv` will fail — script should check existence first or use `mv -f` with preceding existence check |
| Target filename conflict | Apply prefix-rename strategy from Phase 1 |
| `.DS_Store` not in git index | `git ls-files --error-unmatch` returns non-zero; `|| true` absorbs the error |
| `_archive/` already exists | `mkdir -p` is idempotent |
| Stale references found in grep scan | Report them as warnings; the developer manually resolves any unexpected hits |

## Validation Strategy

Post-execution checks to confirm all requirements are met:

| Check | Command | Expected |
|-------|---------|----------|
| Prototypes consolidated | `ls examples/*.html \| wc -l` | ≥ 18 files (14 existing + 4 moved) |
| Source dirs removed | `test -d prototypes` | Fails (dir gone) |
| Specs archived | `ls .kiro/specs/_archive/` | `checkout-flow-prototype/`, `design-token-audit/` |
| Active specs clean | `ls .kiro/specs/` | Only `project-cleanup/` and `_archive/` |
| .DS_Store untracked | `git ls-files .DS_Store` | Empty output |
| .gitignore intact | `grep -c '.DS_Store' .gitignore` | ≥ 1 |
| No stale path refs | grep scan from Phase 4 | Zero matches |
| README updated | `grep -c 'prototypes/' README.md` | 0 |
| Steering file updated | `grep 'prototypes' .kiro/steering/design-best-practices.md` | Zero matches |

## Components and Interfaces

This feature has no application components or programmatic interfaces. The "system" is a linear sequence of shell commands (file moves, git operations, text edits) executed once. The interface is the developer's terminal.

**Cleanup Script Interface:**

```bash
# Usage: run from workspace root
./cleanup.sh   # or execute commands manually in sequence
```

No APIs, classes, or modules are introduced.

## Data Models

No data models are introduced. The artefacts are:

- **Files on disk** — HTML prototypes, markdown specs, steering files
- **Git index** — tracked/untracked status of `.DS_Store`
- **Markdown content** — README and steering file text

All are manipulated via standard file-system and git CLI operations.

## Testing Strategy

Since this is a one-shot reorganisation, testing is **post-condition validation** rather than repeatable automated tests:

- **Existence checks**: Verify moved files landed in the correct locations
- **Content checks**: Verify file content is byte-identical after moves (Properties 1, 3)
- **Absence checks**: Verify old directories and stale references no longer exist (Property 4)
- **Preservation checks**: Verify untouched README sections are unmodified (Property 2)

All checks can be run as a shell script after the cleanup completes. Property-based testing is not appropriate here — the operations are deterministic file moves with a fixed, known input set. Example-based post-condition assertions are the correct validation approach.

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Archived spec file preservation

*For any* file that existed in `.kiro/specs/checkout-flow-prototype/` or `.kiro/specs/design-token-audit/` before the cleanup, after the move to `_archive/`, the file SHALL exist at its new path with byte-identical content to the original.

**Validates: Requirements 2.4**

### Property 2: README non-layout section preservation

*For any* section of `README.md` that is not the "Repo layout" section or the symlink note, the content SHALL be identical before and after the cleanup operation.

**Validates: Requirements 5.4**

### Property 3: Prototype file completeness

*For any* `.html` file that existed in `prototypes/` or `trust-bridge-prototype/` before cleanup, after consolidation that file's content SHALL exist in `examples/` (possibly under a disambiguated filename) with byte-identical content.

**Validates: Requirements 1.1, 1.2, 1.3**

### Property 4: No stale path references remain

*For any* non-archived, non-git-history file in the repository, the file SHALL NOT contain path references to `prototypes/` or `trust-bridge-prototype/` after cleanup completes.

**Validates: Requirements 4.1, 4.2, 4.3, 5.2**
