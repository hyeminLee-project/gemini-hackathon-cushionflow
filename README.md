This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# gemini-hackathon
# 🛡️ CushionFlow
**사내 갈등 제로, 완벽한 커뮤니케이션의 시작**

직장 내 심리적 부담이 큰 메시지를 수신자의 커뮤니케이션 스타일과 
상황 맥락에 맞춰 최적화된 언어로 변환해주는 AI 에이전트입니다.

## 🎯 해결하는 문제
휴가 중 상사에게 긴급 보고, 상사 실수 지적 등 
**말하기 어려운 직장 내 상황**에서 관계를 해치지 않고 
핵심을 전달하는 최적의 메시지를 생성합니다.

## ✨ 주요 기능
- 수신자 커뮤니케이션 스타일(MBTI) 기반 메시지 최적화
- 상황 맥락 분석 (휴가 중 보고, 상사 실수 지적, 긴급 요청 등)
- 메시지 수용도 점수 (0-100) 비교
- 비즈니스/커뮤니케이션 관점 에이전트 분석

## 🛠️ 기술 스택
- Next.js 15 (App Router)
- Gemini 2.5 Flash API
- Tailwind CSS

## 🚀 실행 방법
1. 레포 클론
2. `npm install`
3. `.env` 파일 생성 후 `GEMINI_API_KEY=발급받은키` 추가
4. `npm run dev`
5. http://localhost:3000 접속