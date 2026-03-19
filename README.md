# 🛡️ CushionFlow

**사내 갈등 제로, 완벽한 커뮤니케이션의 시작**
**Zero Workplace Conflict. Perfect Communication, Every Time.**

직장 내 심리적 부담이 큰 메시지를 수신자의 커뮤니케이션 스타일과 상황 맥락에 맞춰 최적화된 언어로 변환해주는 AI 에이전트입니다.

An AI agent that transforms high-stakes workplace messages into optimized communication — tailored to the recipient's communication style and situational context.

---

## 🎯 해결하는 문제 / Problem We Solve

휴가 중 상사에게 긴급 보고, 상사 실수 지적 등 **말하기 어려운 직장 내 상황**에서 관계를 해치지 않고 핵심을 전달하는 최적의 메시지를 생성합니다.

Urgent reports to a manager on vacation, pointing out a superior's mistake, last-minute escalations — **these moments carry enormous social risk.** CushionFlow helps you deliver the message without damaging the relationship.

---

## ✨ 주요 기능 / Key Features

- 수신자 커뮤니케이션 스타일(MBTI) 기반 메시지 최적화
  Message optimization based on recipient's communication style (MBTI)
- 상황 맥락 분석 (휴가 중 보고, 상사 실수 지적, 긴급 요청 등)
  Situational context analysis (vacation interruption, correcting superiors, urgent requests, etc.)
- 메시지 수용도 점수 (0-100) 비교
  Message acceptance score (0–100) before & after comparison
- 비즈니스/커뮤니케이션 관점 에이전트 분석
  Agent analysis from a business & communication perspective
- 대화 캡처 이미지 첨부 (멀티모달)
  Attach conversation screenshot for multimodal analysis
- 쿠션어 제안 원클릭 복사
  One-click copy for suggested message

---

## 🛠️ 기술 스택 / Tech Stack

- Next.js 16 (App Router), React 19, TypeScript 5
- Google Gemini 2.5 Flash API (`@google/generative-ai`)
- Tailwind CSS 4
- Bun

---

## 🚀 실행 방법 / Getting Started

```bash
# 1. 레포 클론 / Clone the repo
git clone https://github.com/hyeminLee-project/gemini-hackathon-cushionflow.git
cd gemini-hackathon-cushionflow

# 2. 패키지 설치 / Install dependencies
bun install

# 3. 환경 변수 설정 / Set up environment variables
cp .env.example .env.local
# .env.local에 GEMINI_API_KEY 입력 / Add your GEMINI_API_KEY

# 4. 개발 서버 실행 / Start dev server
make dev
# or: bun run dev
```

http://localhost:3000 접속 / Open http://localhost:3000

---

## 🐳 Docker로 실행 / Run with Docker

```bash
make docker-up
```

---

## 📋 주요 명령어 / Commands

| Command | Description |
| :--- | :--- |
| `make dev` | 개발 서버 실행 |
| `make build` | 프로덕션 빌드 |
| `make lint` | ESLint 실행 |
| `make typecheck` | TypeScript 타입 체크 |
| `make format` | Prettier 포매팅 |
| `make docker-up` | Docker 컨테이너 실행 |
