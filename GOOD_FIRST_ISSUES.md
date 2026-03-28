# Good First Issues for CushionFlow

GitHub Issues 탭에서 아래 이슈들을 생성하고 "good first issue" 라벨을 붙여주세요.
(라벨: good first issue, enhancement, documentation 등)

---

## Issue 1: Add English translation for demo GIF
**Labels:** good first issue, documentation
**Title:** Add English subtitle version of demo GIF

The current demo GIF (`docs/demo.gif`) has Korean subtitles. We need an English version for international users.

**Tasks:**
- Create English-captioned demo GIF or screenshots
- Update README.md to show English demo by default
- Optionally add language toggle in docs

---

## Issue 2: Add more MBTI-specific response examples
**Labels:** good first issue, enhancement
**Title:** Add example cushioned messages for each MBTI type

Help users understand how CushionFlow adapts messages differently for each MBTI type by adding example before/after messages.

**Tasks:**
- Create a `/docs/examples` directory
- Add at least 4 MBTI type examples (e.g., INTJ, ENFP, ISTJ, INFP)
- Show original message → cushioned message comparison

---

## Issue 3: Add dark/light theme toggle
**Labels:** good first issue, enhancement, UI
**Title:** Add dark/light mode toggle to the UI

Currently the app uses a dark theme only. Add a theme toggle so users can switch between dark and light mode.

**Tasks:**
- Add theme toggle button in the header
- Implement theme switching with Tailwind CSS dark mode
- Persist user preference (cookie or localStorage)

---

## Issue 4: Add unit tests for prompt builder
**Labels:** good first issue, testing
**Title:** Increase test coverage for system prompt builder

The prompt builder (`src/lib/prompt.ts` or similar) needs more test coverage. Currently at 76%.

**Tasks:**
- Add tests for each MBTI type prompt generation
- Add tests for each situational context
- Add edge case tests (empty input, very long messages)

---

## Issue 5: Add share button for cushioned messages
**Labels:** good first issue, enhancement, UI
**Title:** Add social share button for cushioned results

After generating a cushioned message, users should be able to share the result on Twitter/X with a pre-filled tweet.

**Tasks:**
- Add a "Share on X" button next to the copy button
- Pre-fill tweet with: "I just cushioned my message with CushionFlow! 🛡️ Try it: cushionflowai.com #CushionFlow"
- Optionally add LinkedIn share button
