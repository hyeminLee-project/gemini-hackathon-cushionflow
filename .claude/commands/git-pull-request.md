---
name: git-pull-request
description: >
  Generates a Pull Request by analyzing commits and diffs on the current branch.
  Use when the user says "PR 만들어줘", "write a PR", "summarize changes",
  "PR 내용 작성해줘", or when a branch is ready to merge into main.
allowed-tools: Bash(git log *), Bash(git diff *), Bash(git branch *), Bash(gh pr *)
---

## Branch Context

- Current branch: !`git branch --show-current`
- Commits vs main: !`git log --oneline main..HEAD`
- Changed files: !`git diff --name-status main..HEAD`
- Diff stats: !`git diff --stat main..HEAD`

# Pull Request Skill

Generate a PR from the current branch's commits and diffs.

## Steps

### 1. Identify the target branch

Default target is `main`. If the user specifies a different base, use that instead.

### 2. Analyze commits

Use the branch context above. Categorize each commit:

- ✨ Features
- 🐛 Fixes
- ♻️ Refactoring
- 🔧 Chores
- 📝 Docs
- ✅ Tests
- 🚀 Performance

### 3. Generate PR content

Title format: `<emoji> <type>(<scope>): <short summary>`

Body structure:

```markdown
## Summary

- Bullet points explaining what changed and why

## Changes

- [x] Change description (commit hash)

## Test plan

- [ ] How to verify this PR works
```

Only include sections that are relevant. Skip empty sections entirely.

### 4. Create the PR

```bash
gh pr create --title "<title>" --body "<body>"
```

## Guidelines

- PR title under 70 characters
- Summary focuses on "why", not "what"
- Include test plan with actionable verification steps
- If there are breaking changes, call them out explicitly
- Always recommend the user review before merging
