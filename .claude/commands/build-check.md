---
name: build-check
description: >
  Run Next.js production build to catch compilation errors and verify API routes.
  Use when the user says "빌드 확인", "check build", "build test",
  or before creating a PR or deploying.
allowed-tools: Bash(bun run build), Bash(GEMINI_API_KEY=* bun run build), Read
---

# Build Check

Run Next.js production build to verify everything compiles correctly.

## Steps

### Step 1: Run production build

```bash
GEMINI_API_KEY=${GEMINI_API_KEY:-test} bun run build
```

Note: `GEMINI_API_KEY` is required at build time due to `next.config.ts` validation. If not set in environment, a placeholder is used (the key is only needed at runtime for actual API calls).

### Step 2: Analyze output

Check for:

- ✅ Build success
- ⚠️ Any warnings
- ❌ Compilation errors
- 📦 Route summary (static vs dynamic)

### Step 3: Report

On success:

```
✅ Build — passed
📦 Routes: N static, N dynamic
⏱️ Build time: Ns
```

On failure:

```
❌ Build — failed
🔴 Error: [error description]
📄 File: [file path]
```

## When to Use

- Before creating a PR (`/git-pull-request`)
- After major refactoring
- After adding new dependencies
- After modifying `next.config.ts`
