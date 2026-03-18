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

Injects live branch/diff context at invocation time, then generates structured PR content ready for GitHub. Outputs a `PULL_REQUEST.md` or `gh pr create` command.

**Triggers:** "PR 만들어줘", "write a PR", "summarize changes", "PR 내용 작성해줘"

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
