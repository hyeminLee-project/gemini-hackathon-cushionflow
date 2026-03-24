---
name: env-check
description: >
  Verify all required environment variables are set and valid.
  Use when the user says "환경변수 확인", "check env", "env 검증",
  or when debugging API errors or deployment issues.
allowed-tools: Bash(grep *), Read
---

# Environment Variable Check

Verify all required environment variables for CushionFlow.

## Steps

### Step 1: Check .env.local exists

```bash
test -f .env.local && echo "✅ .env.local exists" || echo "❌ .env.local not found — run: cp .env.example .env.local"
```

### Step 2: Verify required variables

Check these variables are set (DO NOT print values — security risk):

| Variable                           | Required | Purpose                     |
| :--------------------------------- | :------- | :-------------------------- |
| `GEMINI_API_KEY`                   | ✅       | Google Gemini API access    |
| `NEXT_PUBLIC_SUPABASESUPABASE_URL` | ✅       | Supabase project URL        |
| `SUPABASE_SERVICE_ROLE_KEY`        | ✅       | Supabase server-side access |

```bash
grep -q "GEMINI_API_KEY=." .env.local && echo "✅ GEMINI_API_KEY" || echo "❌ GEMINI_API_KEY missing"
grep -q "NEXT_PUBLIC_SUPABASESUPABASE_URL=." .env.local && echo "✅ SUPABASE_URL" || echo "❌ SUPABASE_URL missing"
grep -q "SUPABASE_SERVICE_ROLE_KEY=." .env.local && echo "✅ SUPABASE_SERVICE_ROLE_KEY" || echo "❌ SUPABASE_SERVICE_ROLE_KEY missing"
```

### Step 3: Compare with .env.example

```bash
diff <(grep -oP '^[A-Z_]+' .env.example | sort) <(grep -oP '^[A-Z_]+' .env.local | sort)
```

Report any variables in `.env.example` that are missing from `.env.local`.

### Step 4: Check Vercel environment (if deployed)

If `vercel` CLI is available:

```bash
vercel env ls 2>/dev/null | head -20
```

### Report

```
Environment Check:
✅ GEMINI_API_KEY — set
✅ SUPABASE_URL — set
✅ SUPABASE_SERVICE_ROLE_KEY — set
📄 .env.local — 3/3 required variables present
```

## Constraints

- NEVER print or log actual environment variable values
- Only check for presence, not validity of keys
