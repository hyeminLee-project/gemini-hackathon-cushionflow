---
name: git-pull-request
description: >
  Generates Pull Request content by analyzing git commit logs and branch diffs.
  Use when the user says "PR 만들어줘", "write a PR", "summarize changes",
  "PR 내용 작성해줘", or when a branch is ready to merge into main.
allowed-tools: Bash(git log *), Bash(git diff *), Bash(git branch *), Bash(gh pr *)
---

## Live Branch Context

- Current branch: !`git branch --show-current`
- Commits vs main: !`git log --oneline main..HEAD`
- Changed files: !`git diff --name-status main..HEAD`
- Diff summary: !`git diff --stat main..HEAD`

# Git Pull Request Message Convention

This skill automates the analysis of commit logs to save time and ensure consistent PR documentation according to team conventions.

## How to Generate Pull Request Content

### Step 1: Determine Parent Branch

Use the injected branch context above. Map branch type to parent:

| Current Branch | Parent Branch         | Description                          |
| :------------- | :-------------------- | :----------------------------------- |
| `feature/*`    | `main` (or `develop`) | Feature branches PR to main/develop. |
| `hotfix/*`     | `main`                | Hotfixes PR directly to main.        |
| Others         | `main`                | Default target is main.              |

### Step 2: Extract Changes

Use the injected diff and commit data above. If more detail is needed:

- **Full commit log**: `git log --format="%h|%s|%b" main..HEAD`
- **File diff**: `git diff --name-status main..HEAD`

### Step 3: Parse and Categorize Commits

Map commits to PR categories based on Gitmojis and Types.

**Gitmoji Mapping:**

| Gitmoji | PR Category   | Description               |
| :-----: | :------------ | :------------------------ |
|   ✨    | Features      | New features              |
|   🐛    | Fixes         | Bug fixes                 |
|   📝    | Documentation | Documentation changes     |
|   ♻️    | Refactoring   | Code refactoring          |
|   🔧    | Chores        | Configurations and others |
|   🚀    | Performance   | Performance improvements  |
|   ✅    | Test          | Adding/correcting tests   |

> Always check this: [gitmoji | An emoji guide for your commit messages](https://gitmoji.dev/)

**Type Analysis:**

- `feat` → Features
- `fix` → Fixes
- `refactor` → Refactoring
- `chore` → Chores
- `perf` → Performance
- `docs` → Documentation
- `test` → Test.

### Step 4: Generate PR Content

Fill in `.github/PULL_REQUEST_TEMPLATE.md` using the commit and diff data above.

- Omit any section that does not apply (do not leave empty headers or "N/A")
- Generate **Review Points** by identifying critical logic, trade-offs, or potential side effects

### Step 5: Finalize and Save PR Content

Since Git itself does not support PR creation, the agent should save the finalized content to a file for easy access.

1. **Review**: Present the generated content to the user.
2. **Save**: Write the content to a file (e.g., `PULL_REQUEST.md`) in the project root or a temporary directory.
3. **Instruction**: Provide the user with instructions on how to use this file (e.g., "Copy this to GitHub" or "Use `gh pr create -F PULL_REQUEST.md`").

## Guidelines

- **Accuracy**: Ensure commit hashes and messages strictly match the actual git log.
- **Selective Sections**: Only include sections that are relevant. **Omit** sections like "Related Issues," "Breaking Changes," or "Screenshots" entirely if they do not apply. Do not leave empty headers or "N/A".
- **Insightful Review Points**: Go beyond simple summaries; explain the "Why" behind decisions (e.g., trade-offs, library choices) and highlight critical logic.
- **User Preference**: If a user manually specifies a parent branch or commit range, override the automatic detection logic.

## PR Template Structure (Output Standard)

The agent must output the PR using the following Markdown structure. **Sections marked with (Optional) should be omitted if not applicable.**

```markdown
# Pull Request

## 🔗 Related Issues (Optional: Omit if none)

- Closes #123
- Fixes [JIRA-456]

## 📋 PR Title Rule

<gitmoji> <type>(<scope>): <subject>

## 🎯 Summary

<!-- Explain the purpose of the change and "Why" it was done -->

## ⚠️ Breaking Changes (Optional: Omit if none)

<!-- List compatibility issues only if they exist -->

## 📸 Screenshots (Optional: Omit if no UI changes)

<!-- Include only for UI/UX changes -->

## 💡 Review Points

<!-- Focus on critical logic, trade-offs, and decision background -->

## ✨ Changes

### 🚀 Features / 🐛 Fixes / ⚡ Performance / ♻️ Refactoring & Chores

- [x] Change description (commit_hash)

## 🛠️ Test & Verification

- [ ] Test Case 1: ...
- [ ] Test Case 2: ...

## ✅ Checklist

- [ ] PR title follows conventions
- [ ] Self-review performed
- [ ] Tests added/updated
- [ ] Documentation updated
```

## Constraints & Warnings

1. **Git Repository Required**: This skill only functions within a valid Git environment.
2. **Branch Naming**: Incorrect branch naming (not following `feature/*` etc.) may lead to incorrect parent branch detection.
3. **Manual Review**: Always advise the user to review the generated content before final submission.
