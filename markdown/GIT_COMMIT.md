# Commit Convention

CushionFlow uses Conventional Commits with Gitmoji prefixes.

## Structure

```text
<emoji> <type>(<scope>): <description>
```

- **emoji**: Visual indicator from [gitmoji.dev](https://gitmoji.dev/)
- **type**: Category of the change
- **scope**: Optional module name in parentheses
- **description**: Imperative, lowercase, no period, under 50 chars

## Types & Emoji Reference

| Emoji | Type       | Use when...                           |
| :---: | :--------- | :------------------------------------ |
|  ✨   | `feat`     | Adding a new feature                  |
|  🐛   | `fix`      | Fixing a bug                          |
|  📝   | `docs`     | Updating documentation                |
|  🎨   | `style`    | Formatting, no logic change           |
|  ♻️   | `refactor` | Restructuring without behavior change |
|  ✅   | `test`     | Adding or updating tests              |
|  🔧   | `chore`    | Build config, tooling, dependencies   |
|  🚀   | `perf`     | Performance improvement               |
|  🔒   | `security` | Security fix or hardening             |
|  🌐   | `i18n`     | Internationalization                  |
|  🔖   | `release`  | Version tag                           |

## Rules

- Write in English
- Use imperative mood: "add" not "added"
- First letter lowercase
- No trailing period
- Body explains "why", not "what"
- Reference issues in footer: `Closes #42`

## Examples

```text
✨ feat(api): add rate limiting to cushion endpoint

🐛 fix(db): await Supabase insert before response

♻️ refactor(hooks): extract image upload logic into useImageUpload

🌐 feat(i18n): add Japanese and Chinese translations
```
