---
name: git-commit
description: >
  Stages changes and writes a Git commit message following the project's commit convention.
  Use when committing code, when the user says "commit this", "커밋해줘", "write a commit message",
  or after completing a unit of work.
allowed-tools: Bash(git diff --staged), Bash(git add *), Bash(git commit *)
---

# Commit Skill

Write a commit message that follows CushionFlow's convention: Gitmoji + Conventional Commits.

## Steps

### 1. Review staged changes

```bash
git diff --staged
```

If nothing is staged, check `git status` and suggest files to stage.

### 2. Pick the right type and emoji

| Emoji | Type       | When to use        |
| :---: | :--------- | :----------------- |
|  ✨   | `feat`     | New feature        |
|  🐛   | `fix`      | Bug fix            |
|  📝   | `docs`     | Documentation      |
|  🎨   | `style`    | Formatting only    |
|  ♻️   | `refactor` | Restructuring code |
|  ✅   | `test`     | Tests              |
|  🔧   | `chore`    | Config, tooling    |
|  🚀   | `perf`     | Performance        |
|  🌐   | `i18n`     | Translations       |
|  🔒   | `security` | Security hardening |

Full reference: [gitmoji.dev](https://gitmoji.dev/)

### 3. Write the message

Format:

```text
<emoji> <type>(<scope>): <description>
```

Rules:

- English only
- Imperative mood ("add" not "added")
- Lowercase first letter
- No period at the end
- Under 50 characters for the subject
- Optional body for "why" context

### 4. Commit

```bash
git commit -m "<message>"
```

## Examples

```text
✨ feat(api): add rate limiting to cushion endpoint
🐛 fix(db): await Supabase insert before response
♻️ refactor(hooks): extract image upload logic
```
