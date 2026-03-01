<p align="center">
  <img src="public/images/NILILIA.png" alt="NILILIA" height="60" />
</p>

<h3 align="center">번역 · 현지화 전문 기업 홈페이지</h3>

<p align="center">
  <a href="https://nililia-homepage.vercel.app">🌐 Live</a>&nbsp;&nbsp;·&nbsp;&nbsp;
  <a href="https://github.com/ChulKyun-Park/nililia-homepage">📂 Repo</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14+-000?logo=next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Notion_API-CMS-000?logo=notion" />
  <img src="https://img.shields.io/badge/Vercel-deployed-000?logo=vercel" />
</p>

---

## ✨ 프로젝트 소개

NILILIA는 영상 번역, 문서 번역, 웹/앱 현지화, 게임 번역 등 **10개 서비스**를 제공하는 번역·로컬리제이션 전문 기업의 공식 홈페이지입니다.

**벤치마킹**: [voithru.com](https://voithru.com/)의 레이아웃 구조(뼈대)를 참고하되, 스타일·콘텐츠·기능은 자체 제작.

---

## 🛠 기술 스택

| 영역 | 기술 |
|------|------|
| 프레임워크 | Next.js 14+ (App Router) |
| 언어 | TypeScript |
| 스타일링 | Tailwind CSS v4 |
| CMS | Notion API (REST 직접 호출) |
| 배포 | Vercel |
| 폰트 | Pretendard (한글) + Inter (영문) |
| 테마 | 라이트 모드 (`#0097FE` 포인트) |

---

## 📁 폴더 구조

```
src/
├── app/
│   ├── layout.tsx            # 전체 레이아웃
│   ├── page.tsx              # 홈 (섹션 조합)
│   ├── globals.css           # 테마 토큰
│   ├── about/page.tsx        # 회사소개
│   ├── career/page.tsx       # 채용
│   ├── cases/page.tsx        # 성공사례 (Notion)
│   ├── contact/page.tsx      # 문의
│   ├── news/page.tsx         # 소식 (Notion)
│   └── services/page.tsx     # 서비스
├── components/
│   ├── layout/               # GNB, Footer, LanguageSelector
│   ├── sections/             # Hero, SocialProof, Mission, ServiceGrid,
│   │                         # WhyUs, News, CaseStudy, BottomCTA
│   └── ui/                   # Button, Card, Container
├── lib/notion/client.ts      # ⛔ Notion API (수정 금지)
└── types/notion.ts           # ⛔ 타입 정의 (수정 금지)

public/images/                # 서비스 이미지, 로고
```

---

## 🚀 시작하기

```bash
# 클론
git clone https://github.com/ChulKyun-Park/nililia-homepage.git
cd nililia-homepage

# 의존성 설치
npm install

# 환경변수 설정
cp .env.example .env.local
# NOTION_API_KEY, NOTION_NEWS_DB_ID, NOTION_CASESTUDY_DB_ID 입력

# 개발 서버
npm run dev
```

→ http://localhost:3000

---

## 📄 페이지 구성

| # | 섹션 | 설명 |
|---|------|------|
| 1 | **GNB** | 로고 + 메뉴 + CTA (sticky) |
| 2 | **히어로** | 카드 애니메이션 (3-2-3 캐스케이드 + 컨베이어) + 다국어 인사말 |
| 3 | **사회적 증거** | 숫자 강조 + 클라이언트 로고 마퀴 |
| 4 | **미션** | OUR MISSION 카피 |
| 5 | **서비스 그리드** | 10개 서비스 카드 |
| 6–8 | **Why Us** | 01 → 02 → 03 자동 전환 |
| 9 | **소식** | Notion DB 연동 (ISR 1h) |
| 10 | **성공사례** | Notion DB 연동 (ISR 1h) |
| 11 | **하단 CTA** | 문의 유도 |
| 12 | **푸터** | 4컬럼 + 이용약관 |

---

## 🎨 브랜드 컬러

| 용도 | 색상 |
|------|------|
| Primary | `#0097FE` |
| Primary Light | `#E6F4FF` |
| 배경 | `#FFFFFF` / `#F9FAFB` |
| 텍스트 (타이틀) | `#111827` |
| 텍스트 (본문) | `#6B7280` |

> ⚠️ 다크 배경 금지 (CTA 섹션 그라데이션 제외)

---

## 📝 관련 문서

| 문서 | 용도 |
|------|------|
| [`CLAUDE.md`](CLAUDE.md) | Claude Code 상시 참조 가이드 |
| [`FINAL_프롬프트_Claude_Code.md`](FINAL_프롬프트_Claude_Code.md) | 초기 빌드 프롬프트 (아카이브) |

---

## 📜 라이선스

Private — NILILIA © 2026
