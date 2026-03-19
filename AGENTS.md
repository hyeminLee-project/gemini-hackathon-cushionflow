# AGENTS.md

Guidelines for AI agents (Claude Code, Cursor, Copilot, etc.) working in this repository.

## Project Overview

**CushionFlow** is a Next.js + TypeScript web app that uses the Google Gemini API to help users rewrite workplace messages with MBTI-aware, context-sensitive communication.

- Framework: Next.js (App Router), React 19, TypeScript 5
- AI: Google Gemini 2.5 Flash (`@google/generative-ai`)
- Styling: Tailwind CSS 4

## Key Files

| Path                           | Role                                                       |
| :----------------------------- | :--------------------------------------------------------- |
| `src/app/page.tsx`             | Main UI component                                          |
| `src/app/api/cushion/route.ts` | POST API endpoint                                          |
| `src/lib/prompts.ts`           | Gemini system prompt builder                               |
| `src/lib/types.ts`             | Shared TypeScript types                                    |
| `.claude/commands/`            | Custom slash commands (`/git-commit`, `/git-pull-request`) |

## Conventions to Follow

### Commits

Follow the convention in [`markdown/GIT_COMMIT.md`](markdown/GIT_COMMIT.md).

- Format: `<gitmoji> <type>(<scope>): <subject>`
- Write commit messages in English.

### Branches

Follow the convention in [`markdown/BRANCH_NAMING.md`](markdown/BRANCH_NAMING.md).

- Format: `<type>/<short-description>`
- Never commit directly to `main`.

### Code Style

- TypeScript strict mode is enabled — avoid `any`.
- Prefer editing existing files over creating new ones.
- Do not add comments unless the logic is non-obvious.
- Follow available skills in [`markdown/SKILLS.md`](markdown/SKILLS.md).

## What NOT to Do

- Do not commit `.env` or any file containing secrets.
- Do not push directly to `main` or `origin/main`.
- Do not skip pre-commit hooks (`--no-verify`).
- Do not add unnecessary abstractions or future-proofing.
- Do not run `npm install` for packages not directly needed for the current task.
