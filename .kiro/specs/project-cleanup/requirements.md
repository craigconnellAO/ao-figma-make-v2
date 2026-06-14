# Requirements Document

## Introduction

This feature consolidates the workspace structure by merging all HTML prototype directories into `examples/`, archiving completed specs, removing tracked `.DS_Store` files from git, and updating documentation to reflect the final repository layout.

## Glossary

- **Cleanup_System**: The set of file-system operations, git commands, and documentation edits performed during this repository reorganisation.
- **Prototype**: A self-contained HTML file that renders an ao.com design system page or component.
- **Spec_Archive**: The directory `.kiro/specs/_archive/` used to store completed spec folders that are no longer active.
- **Steering_File**: A markdown file in `.kiro/steering/` that provides contextual rules to AI agents based on file-match patterns.

## Requirements

### Requirement 1: Organise HTML output under a single parent directory

**User Story:** As a developer, I want all HTML output grouped under a single `output/` directory with clear sub-folders for stable examples and in-progress prototypes, so that root stays clean and the intent of each file is obvious from its location.

#### Acceptance Criteria

1. WHEN the cleanup is executed, THE Cleanup_System SHALL create the directory structure `output/examples/` and `output/prototypes/`.
2. WHEN the cleanup is executed, THE Cleanup_System SHALL move all files from the current `examples/` directory into `output/examples/`.
3. WHEN the cleanup is executed, THE Cleanup_System SHALL move all files from `prototypes/` into `output/prototypes/`.
4. WHEN the cleanup is executed, THE Cleanup_System SHALL move all files from `trust-bridge-prototype/` into `output/prototypes/`.
5. IF a filename conflict exists between source directories, THEN THE Cleanup_System SHALL preserve both files by renaming the incoming file with a disambiguating prefix.
6. WHEN all files have been moved, THE Cleanup_System SHALL remove the now-empty `examples/`, `prototypes/`, and `trust-bridge-prototype/` directories.
7. THE Cleanup_System SHALL preserve git history for moved files by using `git mv`.

### Requirement 2: Archive completed specs

**User Story:** As a developer, I want completed specs moved to an archive folder, so that the active specs directory only contains work in progress.

#### Acceptance Criteriats4yewd4f brvvdrvted

1. WHEN the cleanup is executed, THE Cleanup_System SHALL create the directory `.kiro/specs/_archive/` if it does not already exist.
2. WHEN the cleanup is executed, THE Cleanup_System SHALL move the `checkout-flow-prototype` spec folder into `.kiro/specs/_archive/`.
3. WHEN the cleanup is executed, THE Cleanup_System SHALL move the `design-token-audit` spec folder into `.kiro/specs/_archive/`.
4. THE Cleanup_System SHALL preserve all files within each archived spec folder without modification.

### Requirement 3: Remove tracked .DS_Store from git

**User Story:** As a developer, I want `.DS_Store` files excluded from version control, so that OS-specific metadata does not pollute the repository.

#### Acceptance Criteria

1. WHEN the cleanup is executed, THE Cleanup_System SHALL remove `.DS_Store` from the git index using `git rm --cached`.
2. THE Cleanup_System SHALL retain the `.DS_Store` entry in `.gitignore` to prevent future tracking.
3. IF `.DS_Store` is not currently tracked by git, THEN THE Cleanup_System SHALL skip the `git rm --cached` step without error.

### Requirement 4: Update internal path references

**User Story:** As a developer, I want all internal references to reflect the new directory structure, so that steering files, tests, and tooling continue to function correctly after the move.

#### Acceptance Criteria

1. WHEN directories are reorganised, THE Cleanup_System SHALL update the `fileMatchPattern` in any `.kiro/steering/*.md` file to replace references to `**/examples/**`, `**/prototypes/**`, and `**/trust-bridge-prototype/**` with `**/output/**`.
2. WHEN directories are reorganised, THE Cleanup_System SHALL verify that test files in `tests/` do not contain import paths referencing the old `examples/`, `prototypes/`, or `trust-bridge-prototype/` directories.
3. IF any other file in the repository references the old directory paths, THEN THE Cleanup_System SHALL update that reference to the new `output/examples/` or `output/prototypes/` path as appropriate.

### Requirement 5: Update README.md

**User Story:** As a developer, I want the README to accurately describe the repository layout, so that contributors understand the current structure at a glance.

#### Acceptance Criteria

1. WHEN the cleanup is complete, THE Cleanup_System SHALL update the "Repo layout" section in `README.md` to describe the `output/` directory with its `examples/` and `prototypes/` sub-folders.
2. WHEN the cleanup is complete, THE Cleanup_System SHALL remove any standalone mention of `prototypes/` and `trust-bridge-prototype/` as root-level directories from `README.md`.
3. THE Cleanup_System SHALL preserve all other sections of `README.md` without modification.
