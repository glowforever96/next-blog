# soonyong.devlog

프론트엔드 개발자 **권순용**의 개인 개발 블로그입니다.
React, Next.js, TypeScript 등 웹 개발 관련 학습과 경험을 기록하고 공유합니다.

🔗 **Live**: [https://www.glowforever96.dev](https://www.glowforever96.dev)

---

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript, React 19
- **Styling**: Tailwind CSS v4, shadcn/ui (Radix UI)
- **Content**: MDX (`next-mdx-remote`, `gray-matter`, `rehype-pretty-code`, `shiki`)
- **Database**: Neon Postgres + Drizzle ORM
- **Form/Validation**: React Hook Form, Zod
- **State**: Zustand
- **Theme**: next-themes (다크 모드 지원)
- **Package Manager**: pnpm

## Features

- 📝 MDX 기반 포스트 작성 및 코드 하이라이팅 (Shiki)
- 🗂️ 카테고리 / 태그 필터링과 사이드바 네비게이션
- 🔍 포스트 검색 (`cmdk`)
- 👀 포스트 조회수 집계 (IP 기반 중복 제거)
- 💬 댓글 / 방명록 기능 (비밀번호 기반 수정·삭제)
- 📊 읽기 진행률 인디케이터
- 🌗 라이트 / 다크 테마 토글
- 🔎 SEO 최적화 (Open Graph, Twitter Card, sitemap, robots, canonical)
- 🇰🇷 한국어 콘텐츠 및 Pretendard 폰트

## Project Structure

[FSD (Feature-Sliced Design)](https://feature-sliced.design/) 아키텍처를 따릅니다.

```
.
├── app/            # Next.js App Router (페이지, API 라우트, sitemap/robots)
├── widgets/        # 페이지를 구성하는 큰 단위의 UI (header, footer, sidebar, posts-list, about)
├── features/       # 사용자 인터랙션 단위 (search, guestbook, comments, theme-toggle, reading-progress)
├── entities/       # 도메인 모델 (post, guestbook)
├── shared/         # 공통 유틸, UI 컴포넌트, 타입
├── content/posts/  # MDX 포스트 원본
├── db/             # Drizzle 스키마 및 클라이언트
├── public/         # 정적 자산
└── fonts/          # Pretendard 폰트
```

## Getting Started

### 1. 의존성 설치

```bash
pnpm install
```

### 2. 환경 변수 설정

루트에 `.env.local` 파일을 생성합니다.

```env
DATABASE_URL="postgres://..."   # Neon Postgres 연결 문자열
```

### 3. 데이터베이스 마이그레이션

```bash
pnpm drizzle-kit generate
pnpm drizzle-kit migrate
```

### 4. 개발 서버 실행

```bash
pnpm dev
```

[http://localhost:3000](http://localhost:3000) 에서 확인할 수 있습니다.

## Scripts

| 명령어         | 설명                              |
| -------------- | --------------------------------- |
| `pnpm dev`     | 개발 서버 실행 (Turbopack)        |
| `pnpm build`   | 프로덕션 빌드                     |
| `pnpm start`   | 빌드 결과물 실행                  |
| `pnpm lint`    | ESLint 검사                       |

## Writing a Post

`content/posts/` 디렉토리에 MDX 파일을 추가합니다. Frontmatter 예시:

```mdx
---
title: "포스트 제목"
description: "한 줄 요약"
date: "2025-01-01"
category: "react"
tags: ["react", "nextjs"]
thumbnail: "/images/thumbnail.webp"
---

본문 내용...
```

## License

[MIT](./LICENSE)
