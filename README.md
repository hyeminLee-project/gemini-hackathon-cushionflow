<div align="center">

# 🛡️ CushionFlow

### AI-Powered Workplace Communication Optimizer

**Zero Workplace Conflict, Smooth Communication Starts Here**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![Gemini](https://img.shields.io/badge/Gemini-2.5_Flash-4285F4?logo=google)](https://ai.google.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Bun](https://img.shields.io/badge/Bun-runtime-F9F1E1?logo=bun)](https://bun.sh/)
[![CI](https://github.com/hyeminLee-project/gemini-hackathon-cushionflow/actions/workflows/ci.yml/badge.svg)](https://github.com/hyeminLee-project/gemini-hackathon-cushionflow/actions)
[![Coverage](https://img.shields.io/badge/coverage-76%25-yellow)](https://github.com/hyeminLee-project/gemini-hackathon-cushionflow)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Release](https://img.shields.io/github/v/release/hyeminLee-project/gemini-hackathon-cushionflow)](https://github.com/hyeminLee-project/gemini-hackathon-cushionflow/releases)

[🌐 Live Demo](https://cushionflowai.com) · [Features](#-features) · [Getting Started](#-getting-started) · [Architecture](#-architecture)

</div>

---

## 💡 Why CushionFlow?

> _"My manager is on vacation… but I need to send an urgent report."_
>
> _"I have to point out my boss's mistake — how do I say it?"_

Every workplace has moments where **one wrong word can damage a relationship**. Say it too bluntly and you risk conflict. Say it too softly and your point gets lost.

**CushionFlow** analyzes the recipient's communication style (MBTI) and situational context, then suggests the optimal **cushion language** — delivering your message clearly while preserving the relationship.

Built with Google Gemini 2.5 Flash for intelligent, context-aware message transformation.

---

## ✨ Features

| Feature                        | Description                                                                                                     |
| :----------------------------- | :-------------------------------------------------------------------------------------------------------------- |
| 🧠 **MBTI-Based Optimization** | Tailors messages for all 16 MBTI personality types                                                              |
| 🎯 **Context-Aware Analysis**  | Supports 6 situational contexts: vacation report, boss's mistake, urgent request, rejection, apology, and favor |
| 📊 **Acceptance Score**        | Compares acceptance scores (0–100) between original and optimized messages                                      |
| 🔍 **Multi-Agent Insights**    | Business & communication expert analysis reports                                                                |
| 🖼️ **Multimodal Input**        | Attach chat screenshots for deeper context understanding                                                        |
| 📋 **One-Click Copy**          | Copy the suggested message with one click                                                                       |

---

## 🎬 Demo

<div align="center">

![CushionFlow Demo](docs/demo.gif)

[▶ Watch full demo on YouTube](https://youtu.be/TpiD1BH1OB8)

</div>

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────┐
│                   Client                     │
│          Next.js App Router (React 19)       │
│                                              │
│  ┌─────────┐ ┌──────────┐ ┌───────────┐     │
│  │ Message  │ │   MBTI   │ │  Context  │     │
│  │  Input   │ │ Selector │ │  Picker   │     │
│  └────┬─────┘ └────┬─────┘ └─────┬─────┘    │
│       └──────────────┼──────────────┘        │
│                      ▼                       │
│             POST /api/cushion                │
├─────────────────────────────────────────────┤
│                   Server                     │
│                                              │
│  ┌──────────────────────────────────────┐    │
│  │         API Route Handler            │    │
│  │  • Input validation                  │    │
│  │  • System prompt builder             │    │
│  │  • Response parsing                  │    │
│  └──────────────┬───────────────────────┘    │
│                 │                             │
│                 ▼                             │
│  ┌──────────────────────────────────────┐    │
│  │      Google Gemini 2.5 Flash         │    │
│  │  • MBTI-aware prompt engineering     │    │
│  │  • Multimodal analysis (text+image)  │    │
│  └──────────────────────────────────────┘    │
└─────────────────────────────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (v1.0+)
- [Google Gemini API Key](https://aistudio.google.com/apikey)

### Installation

```bash
# Clone the repo
git clone https://github.com/hyeminLee-project/gemini-hackathon-cushionflow.git
cd gemini-hackathon-cushionflow

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env.local
# Add your GEMINI_API_KEY to .env.local

# Start dev server
make dev
```

Open [http://localhost:3000](http://localhost:3000) and start cushioning your messages!

### 🐳 Docker

```bash
make docker-up
```

---

## 📋 Commands

| Command          | Description              |
| :--------------- | :----------------------- |
| `make dev`       | Start development server |
| `make build`     | Production build         |
| `make lint`      | Run ESLint               |
| `make typecheck` | TypeScript type check    |
| `make format`    | Prettier formatting      |
| `make docker-up` | Run with Docker          |

---

## 🛠️ Tech Stack

| Category      | Technology                 |
| :------------ | :------------------------- |
| **Framework** | Next.js 16 (App Router)    |
| **Language**  | TypeScript 5 (strict mode) |
| **UI**        | React 19 + Tailwind CSS 4  |
| **AI**        | Google Gemini 2.5 Flash    |
| **Icons**     | Lucide React               |
| **Runtime**   | Bun                        |

---

## 🤝 Contributing

Contributions are welcome! Check out our [good first issues](https://github.com/hyeminLee-project/gemini-hackathon-cushionflow/labels/good%20first%20issue) to get started.

1. Fork the repository
2. Create your feature branch (`git checkout -b feat/amazing-feature`)
3. Commit your changes following [Conventional Commits](https://www.conventionalcommits.org/)
4. Push to the branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

**If CushionFlow helps you communicate better, give it a ⭐!**

Originally prototyped at [Google Gemini Seoul Hackathon 2026](https://ai.google.dev/competition) 🇰🇷

</div>
