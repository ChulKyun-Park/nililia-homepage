<p align="center">
  <img src="public/images/NILILIA.png" alt="NILILIA" height="60" />
</p>

<h3 align="center">번역 · 현지화 전문 기업 홈페이지</h3>

<p align="center">
  <a href="https://nililia-homepage.vercel.app">Live</a>&nbsp;&nbsp;·&nbsp;&nbsp;
  <a href="https://github.com/ChulKyun-Park/nililia-homepage">Repo</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-000?logo=next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Notion_API-CMS-000?logo=notion" />
  <img src="https://img.shields.io/badge/Vercel-deployed-000?logo=vercel" />
</p>

---

## 프로젝트 소개

**(주)닐리리아**는 영상 번역, 문서 번역, 웹/앱 현지화, 게임 번역 등 **10개 서비스**를 제공하는 번역·로컬리제이션 전문 기업의 공식 홈페이지입니다.

---

## 기술 스택

| 영역 | 기술 |
|------|------|
| 프레임워크 | Next.js 16 (App Router, Turbopack) |
| 언어 | TypeScript 5 |
| 스타일링 | Tailwind CSS v4 |
| CMS | Notion API (REST 직접 호출, ISR 60s) |
| 배포 | Vercel |
| 폰트 | Pretendard (한글) + Inter (영문) |
| 테마 | 라이트 모드 (`#0097FE` 포인트) |

---

## 주요 기능

| 기능 | 설명 |
|------|------|
| Notion CMS 연동 | 소식/성공사례를 Notion DB에서 관리, ISR 60초 간격 자동 갱신 |
| 회사소개서 다운로드 | GNB 버튼 → 리드 캡처 팝업 폼 → Notion DB 저장 → PDF 다운로드 |
| 문의하기 폼 | 소속기관명/담당자명/메일/연락처/분야/정기작업/상담내용 → Notion DB 연동 |
| 히어로 카드 애니메이션 | 3-2-3 캐스케이드 + 컨베이어 (16초 사이클, CSS keyframes) |
| 서비스 상세 페이지 | 8개 서비스별 전용 페이지 (히어로 → 지원 언어 → Why → 프로세스 → CTA) |
| 반응형 디자인 | 모바일(375px) / 태블릿(768px) / 데스크탑(1280px+) 완전 대응 |
| 다국어 UI | 10개 언어 국기 선택기 (한/영/중간체/중번체/일/베/스/인니/태/러) |
| Server Components 우선 | 클라이언트 번들 최소화, 인터랙션 필요 시만 Client Component |

---

## 폴더 구조

```
src/
├── app/
│   ├── layout.tsx                # 전체 레이아웃 (GNB + Footer)
│   ├── page.tsx                  # 홈 (섹션 조합)
│   ├── globals.css               # 디자인 토큰, keyframes
│   ├── icon.svg                  # 파비콘 (N 레터마크)
│   ├── about/page.tsx            # 회사소개
│   ├── career/page.tsx           # 채용
│   ├── cases/page.tsx            # 성공사례 (Notion)
│   ├── contact/page.tsx          # 문의하기
│   ├── news/
│   │   ├── page.tsx              # 소식 목록 (Notion)
│   │   └── [slug]/page.tsx       # 소식 상세
│   ├── services/
│   │   ├── page.tsx              # 서비스 목록
│   │   └── {slug}/page.tsx       # 서비스 상세 x8
│   └── api/
│       ├── brochure/route.ts     # 회사소개서 리드 저장 API
│       └── contact/route.ts      # 문의하기 폼 저장 API
├── components/
│   ├── layout/                   # GNB, Footer, LanguageSelector
│   ├── sections/                 # Hero, SocialProof, Mission, ServiceGrid,
│   │                             # WhyUs, PageHero, NewsCaseStudy, BottomCTA,
│   │                             # ServiceWhy, ServiceProcess, SupportedLanguages
│   ├── ui/                       # Button, Card, Container, Section, SectionHeader
│   ├── brochure/                 # BrochureModal (회사소개서 다운로드 팝업)
│   ├── contact/                  # ContactForm (문의하기 폼)
│   ├── news/                     # NewsFilter, BlockRenderer
│   └── cases/                    # CasesFilter
├── lib/notion/
│   ├── client.ts                 # Notion API 코어 (뉴스/사례)
│   ├── homePreview.ts            # 홈 프리뷰 fetch
│   ├── brochureLead.ts           # 회사소개서 리드 저장
│   └── contactLead.ts            # 문의하기 리드 저장
└── types/
    └── notion.ts                 # Notion 타입 정의

public/
├── images/                       # 서비스 이미지, 로고, 소셜프루프
└── files/                        # 다운로드 파일 (회사소개서 PDF 등)
```

---

## 시작하기

```bash
git clone https://github.com/ChulKyun-Park/nililia-homepage.git
cd nililia-homepage
npm install
cp .env.example .env.local
```

`.env.local`에 아래 값을 입력:

```
NOTION_API_KEY=
NOTION_NEWS_DB_ID=
NOTION_CASESTUDY_DB_ID=
NOTION_POPUP_DB_ID=
NOTION_BROCHURE_LEADS_DB_ID=
NOTION_CONTACT_DB_ID=
```

```bash
npm run dev
```

http://localhost:3000

---

## 페이지 구성

| # | 섹션 | 설명 |
|---|------|------|
| 1 | GNB | 로고 + 메뉴 + 문의하기 CTA + 회사소개서 다운로드 (sticky) |
| 2 | 히어로 | 카드 애니메이션 (3-2-3 캐스케이드 + 컨베이어) |
| 3 | 사회적 증거 | 숫자 강조 + 클라이언트 로고 마퀴 |
| 4 | 미션 | OUR MISSION 카피 |
| 5 | 서비스 그리드 | 10개 서비스 카드 |
| 6-8 | Why Us | 01 → 02 → 03 자동 전환 |
| 9 | 소식 | Notion DB 연동 (ISR 60s) |
| 10 | 성공사례 | Notion DB 연동 (ISR 60s) |
| 11 | 하단 CTA | 문의 유도 |
| 12 | 푸터 | 4컬럼 + SNS + 이용약관 |

---

## 브랜드 컬러

| 용도 | 색상 |
|------|------|
| Primary | `#0097FE` |
| Primary Dark | `#0078CB` |
| Primary Light | `#E6F4FF` |
| 배경 | `#FFFFFF` / `#F9FAFB` |
| 텍스트 (타이틀) | `#111827` |
| 텍스트 (본문) | `#6B7280` |

> 다크 배경 금지 (CTA 섹션 그라데이션 제외)

---

## 관련 문서

| 문서 | 용도 |
|------|------|
| [`CLAUDE.md`](CLAUDE.md) | 개발 가이드 (컬러, 타이포, 애니메이션 스펙, 수정 금지 영역) |
| [`LAYOUT_GUIDE.md`](LAYOUT_GUIDE.md) | 레이아웃 기준 (히어로, 컨테이너, 여백) |

---

## 라이선스

Private — NILILIA Inc. 2026
