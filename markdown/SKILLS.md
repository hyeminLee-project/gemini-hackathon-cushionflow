# Skills & Slash Commands

Available Claude Code custom skills for this project.
All skills live in [`.claude/commands/`](../.claude/commands/) and are invoked with `/skill-name` in the Claude Code CLI.

## Project-Specific Skills

### `/git-commit`

**File:** `.claude/commands/git-commit.md`
**Allowed tools:** `Bash(git diff --staged)`, `Bash(git add *)`, `Bash(git commit *)`

Drafts and creates a Git commit message following the Conventional Commits + Gitmoji convention defined in [`GIT_COMMIT.md`](GIT_COMMIT.md).

**Triggers:** "commit this", "커밋해줘", "write a commit message"

---

### `/git-pull-request`

**File:** `.claude/commands/git-pull-request.md`
**Allowed tools:** `Bash(git log *)`, `Bash(git diff *)`, `Bash(git branch *)`, `Bash(gh pr *)`

Injects live branch/diff context at invocation time, then generates structured PR content ready for GitHub.

**Triggers:** "PR 만들어줘", "write a PR", "summarize changes", "PR 내용 작성해줘"

---

### `/verify`

**File:** `.claude/commands/verify.md`
**Allowed tools:** `Bash(bunx tsc *)`, `Bash(bun run lint)`, `Bash(bun run test)`, `Bash(bun run format:check)`

Runs all code quality checks in sequence: TypeScript typecheck → ESLint → Vitest tests → Prettier format check. Stops and reports on first failure.

**Triggers:** "verify", "검증해줘", "check everything"

---

### `/gemini-prompt-test`

**File:** `.claude/commands/gemini-prompt-test.md`
**Allowed tools:** `Bash(curl *)`, `Read`

Tests the CushionFlow API with a sample request to verify Gemini prompt behavior. Validates response structure (score, suggestion, insights).

**Triggers:** "프롬프트 테스트", "test the prompt", "Gemini 테스트"

---

### `/build-check`

**File:** `.claude/commands/build-check.md`
**Allowed tools:** `Bash(bun run build)`, `Bash(GEMINI_API_KEY=* bun run build)`, `Read`

Runs Next.js production build to catch compilation errors and verify API routes compile correctly.

**Triggers:** "빌드 확인", "check build", "build test"

---

### `/env-check`

**File:** `.claude/commands/env-check.md`
**Allowed tools:** `Bash(grep *)`, `Read`

Verifies all required environment variables (GEMINI_API_KEY, Supabase) are set. Compares `.env.local` against `.env.example`. Never prints actual values.

**Triggers:** "환경변수 확인", "check env", "env 검증"

---

## Built-in Claude Code Skills

### `/simplify`

Reviews recently changed code for unnecessary complexity, duplication, or abstraction and fixes issues found.

**When to use:** After a large feature or refactor to trim excess code before committing.

---

### `/update-config`

Modifies Claude Code `settings.json` to add permissions, hooks, or environment variables.

**When to use:** Adding allowed commands, setting up automated hooks, or adding environment variables.

---

## Workflow Reference

```
feature branch
    └─ write code
    └─ /env-check              ← verify env vars
    └─ /verify                 ← typecheck + lint + test + format
    └─ /build-check            ← production build test
    └─ /gemini-prompt-test     ← test AI response (if prompt changed)
    └─ /simplify               ← clean up if needed
    └─ /git-commit             ← commit with convention
    └─ push branch
    └─ /git-pull-request       ← generate PR content
```
