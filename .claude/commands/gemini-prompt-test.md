---
name: gemini-prompt-test
description: >
  Test Gemini API prompt behavior by sending a sample message through the cushion API.
  Use when the user says "프롬프트 테스트", "test the prompt", "Gemini 테스트",
  or after modifying src/lib/prompts.ts.
allowed-tools: Bash(curl *), Read
---

# Gemini Prompt Test

Test the CushionFlow API with a sample request to verify Gemini prompt behavior.

## Current Prompt

Read the current prompt template:

```bash
cat src/lib/prompts.ts
```

## Test Execution

### Step 1: Verify dev server is running

Check if the dev server is running on port 3000. If not, inform the user to run `make dev` first.

### Step 2: Send test request

```bash
curl -s http://localhost:3000/api/cushion \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "originalMessage": "팀장님, 왜 아직도 안 하셨어요?",
    "mbti": "INFP",
    "context": "상사 실수 지적"
  }' | jq .
```

### Step 3: Validate response

Check the response contains:

- `score` (number, 0-100)
- `suggestion` (non-empty string)
- `insights` (array with 3-4 items)
- `koreanTranslation` (string or null)

### Step 4: Report

```
📊 Score: {score}
📝 Suggestion length: {chars} chars
🔍 Insights count: {count}
🌐 Translation: {present/null}
```

## Optional: Multi-locale Test

If the user wants to test i18n, run the same request with `"locale": "en"` and verify insights are in English.

## Constraints

- Requires dev server running (`make dev`)
- Requires `GEMINI_API_KEY` in `.env.local`
- Each test consumes Gemini API quota
