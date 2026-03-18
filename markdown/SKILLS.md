# Skills & Slash Commands

Available Claude Code custom skills for this project.
All skills live in [`.claude/commands/`](../.claude/commands/) and are invoked with `/skill-name` in the Claude Code CLI.

## Project-Specific Skills

### `/git-commit`
**File:** `.claude/commands/git-commit.md`

Drafts and creates a Git commit message following the Conventional Commits + Gitmoji convention defined in [`GIT_COMMIT.md`](GIT_COMMIT.md).

**When to use:** After completing a unit of work and verifying it builds/lints cleanly.

---

### `/git-pull-request`
**File:** `.claude/commands/git-pull-request.md`

Analyzes the commit log and diff between the current branch and its parent branch, then generates structured PR content ready for GitHub.

**When to use:** When work on a branch is complete and ready to merge. Outputs a `PULL_REQUEST.md` or content for `gh pr create`.

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
    └─ /simplify               ← clean up if needed
    └─ /git-commit             ← commit with convention
    └─ push branch
    └─ /git-pull-request       ← generate PR content
    └─ gh pr create -F PULL_REQUEST.md
```
