---
name: verify
description: >
  Run all code quality checks: TypeScript typecheck, ESLint, Vitest tests, and Prettier format check.
  Use when the user says "verify", "검증해줘", "check everything", or before committing/pushing code.
allowed-tools: Bash(bunx tsc *), Bash(bun run lint), Bash(bun run test), Bash(bun run format:check)
---

# Verify All Code Quality Checks

Run all checks in sequence. Stop and report on first failure.

## Steps

### Step 1: TypeScript Typecheck

```bash
bunx tsc --noEmit
```

If this fails, list the type errors and suggest fixes.

### Step 2: ESLint

```bash
bun run lint
```

Report any errors (warnings are acceptable).

### Step 3: Tests

```bash
bun run test
```

All tests must pass. If any fail, show the failing test names and error messages.

### Step 4: Format Check

```bash
bun run format:check
```

If formatting issues are found, run `bun run format` to fix them and report which files were changed.

## Output

Summarize results:

```
✅ Typecheck — passed
✅ Lint — passed (N warnings)
✅ Tests — N/N passed
✅ Format — clean
```

Or on failure:

```
✅ Typecheck — passed
❌ Lint — 2 errors in src/app/page.tsx
⏭️ Tests — skipped
⏭️ Format — skipped
```
