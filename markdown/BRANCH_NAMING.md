# Branch Naming Convention

This project follows a consistent branch naming convention to keep the repository organized and traceable.

## Format

```text
<type>/<short-description>
```

- Use lowercase letters and hyphens only (no underscores, no spaces).
- Keep the description concise (2–5 words).
- Use the imperative form: `add-login` not `added-login`.

## Types

| Type       | When to Use                                             | Example                           |
| :--------- | :------------------------------------------------------ | :-------------------------------- |
| `feature`  | New user-facing feature                                 | `feature/mbti-selector`           |
| `fix`      | Bug fix (non-urgent)                                    | `fix/json-parse-error`            |
| `hotfix`   | Urgent fix on production                                | `hotfix/api-key-leak`             |
| `chore`    | Tooling, dependencies, config changes (no product code) | `chore/add-husky`                 |
| `refactor` | Code restructuring without behavior change              | `refactor/extract-prompt-builder` |
| `docs`     | Documentation only                                      | `docs/update-readme`              |
| `test`     | Adding or fixing tests                                  | `test/route-handler-validation`   |
| `release`  | Preparing a new version release                         | `release/v1.0.0`                  |

## Rules

1. **Never commit directly to `main`.** Always work on a branch and open a PR.
2. Branch names must start with one of the types above.
3. Delete branches after merging.
4. For issue-tracked work, optionally suffix the issue number: `fix/score-overflow-#42`.

## Examples

```bash
git checkout -b feature/conversation-history
git checkout -b fix/image-size-validation
git checkout -b chore/setup-github-actions
git checkout -b hotfix/env-key-exposure
```
