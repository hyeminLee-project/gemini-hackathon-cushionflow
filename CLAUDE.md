# CLAUDE.md

Guidelines for Claude Code working in this repository.

## Project Overview

**CushionFlow** is a Next.js + TypeScript web app that uses the Google Gemini API to help users rewrite workplace messages with MBTI-aware, context-sensitive communication.

- Framework: Next.js (App Router), React 19, TypeScript 5
- AI: Google Gemini 2.5 Flash (`@google/generative-ai`)
- Styling: Tailwind CSS 4
- Package manager: Bun

## Key Files

| Path                           | Role                                                                                                                       |
| :----------------------------- | :------------------------------------------------------------------------------------------------------------------------- |
| `src/app/page.tsx`             | Main UI component                                                                                                          |
| `src/app/api/cushion/route.ts` | POST API endpoint                                                                                                          |
| `src/lib/prompts.ts`           | Gemini system prompt builder                                                                                               |
| `src/lib/types.ts`             | Shared TypeScript types                                                                                                    |
| `.claude/commands/`            | Custom slash commands (`/git-commit`, `/git-pull-request`, `/verify`, `/gemini-prompt-test`, `/build-check`, `/env-check`) |

## Commands

```bash
make dev        # 개발 서버
make build      # 프로덕션 빌드
make lint       # ESLint
make typecheck  # TypeScript 타입 체크
```

---

## Behavioral Guidelines

### 1. Think Before Coding

Before implementing, state assumptions explicitly. If multiple interpretations exist, present them — don't pick silently. If something is unclear, ask before writing code.

### 2. Simplicity First

Minimum code that solves the problem. Nothing speculative.

- No features beyond what was asked.
- No abstractions for single-use code.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

### 3. Surgical Changes

Touch only what you must.

- Don't improve adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- Remove imports/variables made unused by YOUR changes only.

### 4. Goal-Driven Execution

For multi-step tasks, state a brief plan before starting:

```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
```

---

## Conventions

### Commits

Follow [`markdown/GIT_COMMIT.md`](markdown/GIT_COMMIT.md).

- Format: `<gitmoji> <type>(<scope>): <subject>`
- Language: English

### Commit Quality Rules

- **Never push debug commits to main.** Debug code must be removed in the same PR.
- **Fix formatting in the same PR** that introduced the change. Don't create separate "fix formatting" PRs.
- **Run `bun run format` before every commit.** Format issues should never reach CI.
- **Use Squash and merge consistently.** Keep main history clean with one commit per PR.
- **Never edit files directly on GitHub web.** Always use branch → PR workflow to maintain commit conventions.
- **Every commit on main must follow the convention.** No "Update README.md" style messages.

### Branches

Follow [`markdown/BRANCH_NAMING.md`](markdown/BRANCH_NAMING.md).

- Format: `<type>/<short-description>`
- Never commit directly to `main`.
- Always create a branch → push → PR → merge. No exceptions.

### Code Style

- TypeScript strict mode — avoid `any`.
- Prefer editing existing files over creating new ones.
- No comments unless logic is non-obvious.

## What NOT to Do

- Do not commit `.env` or secrets.
- Do not push directly to `main`.
- Do not skip pre-commit hooks (`--no-verify`).
- Do not add abstractions or future-proofing beyond the current task.
- Do not run `bun add` for packages not directly needed.
