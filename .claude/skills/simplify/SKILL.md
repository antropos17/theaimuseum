---
name: simplify
description: Make code more human-readable, clean, and simple. Use on any file or selection to improve readability without changing behavior.
---

# Simplify

Rewrite code to be more readable and human-friendly. Preserve behavior exactly — only change how the code reads, not what it does.

## Process
1. Read the target file (or use IDE selection if provided)
2. Identify complexity: deep nesting, unclear names, long functions, unnecessary abstractions
3. Rewrite following the rules below
4. Show a diff summary of what changed and why

## Rules

### Structure
- Flatten nested conditionals → early returns
- Break functions >30 lines → smaller focused functions
- One responsibility per function
- Max 300 lines per file (split if needed)

### Naming
- Rename cryptic vars → descriptive names (`d` → `durationMs`, `cb` → `onComplete`)
- Boolean vars/functions: `is*`, `has*`, `should*` prefix
- Event handlers: `handle*` or `on*` prefix
- Prefer full words over abbreviations

### Cleanup
- Remove dead code, unused imports, unreachable branches
- Remove unnecessary comments (code should be self-documenting)
- Keep comments ONLY where logic isn't obvious
- Remove empty catch blocks, console.logs, TODO comments that are stale

### Simplification
- Replace clever/tricky patterns with straightforward alternatives
- Prefer `Array.map/filter/find` over manual loops when clearer
- Use optional chaining and nullish coalescing where simpler
- Remove unnecessary type assertions (let TypeScript infer)
- Remove wrapper functions that just pass through

### Preserve
- All external behavior and API contracts
- TypeScript strict mode compliance
- Existing test compatibility
- Project conventions from CLAUDE.md

## Output
After simplifying, briefly list what changed:
- "Renamed X → Y for clarity"
- "Extracted Z into helper function"
- "Removed unused import A"
- "Flattened nested if/else in function B"
