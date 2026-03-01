# 프로젝트 기본 가이드 — Claude Code 상시 참조 문서

> **이 문서는 Claude Code에 프롬프트를 투입할 때 반드시 함께 제공해야 합니다.**
> **수정 작업의 내용이 바뀌어도 이 문서의 규칙은 항상 적용됩니다.**
> **최종 업데이트**: 2026-03-01

---

## 1. 프로젝트 개요

| 항목 | 내용 |
|------|------|
| 프로젝트 | 번역/로컬리제이션 서비스 회사 웹사이트 |
| 레포 | https://github.com/ChulKyun-Park/nililia-homepage |
| 배포 | https://nililia-homepage.vercel.app/ |
| 프레임워크 | Next.js 14+ (App Router), TypeScript, Tailwind CSS v4 |
| 배포 플랫폼 | Vercel |
| CMS | Notion API (REST 직접 호출) |
| 폰트 | Pretendard (한글) + Inter (영문) |
| 테마 | **라이트 모드** (흰색 배경 + #0097FE 포인트 + 회색 텍스트) |
| 브랜드 컬러 | `#0097FE` |

---

## 2. 프로젝트 파일 구조

```
src/
├── app/
│   ├── layout.tsx          ← 전체 레이아웃 (GNB + Footer 포함)
│   ├── page.tsx            ← 홈페이지 (섹션 컴포넌트 조합)
│   ├── globals.css         ← 테마 토큰, 애니메이션 keyframes
│   ├── about/page.tsx      ← 회사소개
│   ├── career/page.tsx     ← 채용
│   ├── cases/page.tsx      ← 성공사례 (Notion API)
│   ├── contact/page.tsx    ← 문의
│   ├── news/page.tsx       ← 소식 (Notion API)
│   └── services/page.tsx   ← 서비스
├── components/
│   ├── layout/
│   │   ├── GNB.tsx         ← 상단 내비게이션
│   │   ├── Footer.tsx      ← 푸터 (4컬럼)
│   │   └── LanguageSelector.tsx ← 언어 선택 (국기 이모지 포함)
│   ├── sections/
│   │   ├── Hero.tsx        ← 히어로 (컨베이어 벨트 + 다국어 인사말)
│   │   ├── SocialProof.tsx ← 사회적 증거 (로고 마퀴)
│   │   ├── Mission.tsx     ← OUR MISSION
│   │   ├── ServiceGrid.tsx ← 서비스 카드 그리드 (썸네일 슬롯 포함)
│   │   ├── WhyUs.tsx       ← WHY US (자동 전환 01→02→03)
│   │   ├── News.tsx        ← 최신 소식 (Notion API 연동)
│   │   ├── CaseStudy.tsx   ← 성공 사례 (Notion API 연동)
│   │   └── BottomCTA.tsx   ← 하단 CTA
│   └── ui/                 ← 공통 UI 컴포넌트 (Button, Card, Container 등)
├── lib/
│   └── notion/
│       └── client.ts       ← ⛔ Notion API 연동 코드 (수정 금지)
└── types/
    └── notion.ts           ← ⛔ Notion 타입 정의 (수정 금지)
```

---

## 3. "Notion"의 의미 — 혼동 금지

> ⚠️ **이 프로젝트에서 "Notion"은 외부 도구가 아니라 CMS 백엔드입니다.**

### 이 프로젝트에서 Notion이란:

- **소식(News)** 페이지의 데이터 소스 — `src/lib/notion/client.ts`의 `fetchNewsPreview()`, `fetchAllNews()`
- **성공사례(Case Studies)** 페이지의 데이터 소스 — `src/lib/notion/client.ts`의 `fetchCaseStudyPreview()`, `fetchAllCaseStudies()`
- Notion REST API를 직접 호출하는 서버 사이드 코드
- 환경변수: `NOTION_API_KEY`, `NOTION_NEWS_DB_ID`, `NOTION_CASESTUDY_DB_ID` (`.env.local`)

### "Notion 연동을 유지한다"의 의미:

- ✅ `src/lib/notion/client.ts` 파일을 **수정하지 않는다**
- ✅ `src/types/notion.ts` 파일을 **수정하지 않는다**
- ✅ `News.tsx`, `CaseStudy.tsx`에서 fetch 함수를 호출하는 로직을 **건드리지 않는다**
- ✅ 환경변수를 **변경하지 않는다**

### "Notion 연동을 유지한다"가 아닌 것:

- ❌ Notion이라는 외부 서비스에 문서를 만들라는 뜻이 아님
- ❌ Notion MCP 도구를 사용하라는 뜻이 아님
- ❌ Notion 워크스페이스에서 뭔가를 검색하라는 뜻이 아님

---

## 4. 3레이어 분리 원칙

| 레이어 | 내용 | 수정 가능? | 해당 파일 |
|--------|------|-----------|----------|
| **뼈대 (구조)** | 섹션 순서, 레이아웃 패턴, CTA 위치, 반응형 구조 | ✅ 수정/교체 대상 | 컴포넌트 JSX, className |
| **살 (스타일)** | 컬러(`#0097FE`), 애니메이션, 이미지, 카피 | ✅ 재활용 (값 변경 금지) | `globals.css` @theme 블록, 각 컴포넌트 텍스트 |
| **장기 (기능)** | Notion API 연동, 데이터 흐름 | ⛔ **절대 수정 금지** | `src/lib/notion/`, `src/types/notion.ts`, `.env.local` |

---

## 5. 절대 규칙

### 🚫 금지

1. `src/lib/notion/` 디렉토리의 파일을 수정하지 마세요.
2. `src/types/notion.ts`를 수정하지 마세요.
3. `globals.css`의 `--color-primary: #0097FE`를 변경하지 마세요.
4. voithru.com의 색상 코드를 우리 사이트에 적용하지 마세요. 구조만 참고합니다.
5. 한 번에 여러 섹션을 동시에 수정하지 마세요.
6. 기존 컴포넌트를 새로 작성하지 마세요. 재활용 우선입니다.
7. 픽셀 단위 완벽 복제를 하지 마세요. 구조적 흐름만 참고합니다.
8. **다크 테마/네이비 배경을 사용하지 마세요.** 이 사이트는 라이트 테마입니다.
   - 배경: `#FFFFFF` (흰색) 또는 `#F9FAFB` (연한 회색)
   - 텍스트: `#111827` (타이틀) / `#6B7280` (본문)
   - 포인트: `#0097FE` (하늘색)
   - `bg-dark-*`, `text-white` (배경 위 흰 글씨) 등 다크 테마 클래스 사용 금지
   - 참고: `../nililia/DESIGN_GUIDE.md`

### ✅ 필수

1. 섹션 하나 수정할 때마다 Git 커밋하세요.
2. 커밋 후 Notion API 연동(소식·성공사례)이 정상 동작하는지 확인하세요.
3. 반응형(모바일/태블릿/데스크탑)이 깨지지 않았는지 확인하세요.
4. 애니메이션 수정 시 트리거 타이밍이 정상인지 확인하세요.
5. 기존 프로젝트의 브레이크포인트(`sm:768px`, `md:`, `lg:1024px`)를 사용하세요.

---

## 6. 실수 방지 — 이전에 발생한 문제와 대책

| 실수 | 증상 | 방지 규칙 |
|------|------|----------|
| 원형/직사각형 경로 혼동 | 컨베이어 벨트가 원을 그리며 회전 | 애니메이션 경로 설명 시 **반드시 ASCII 다이어그램 포함** |
| 폰트 소스 오류 | voithru 타이포그래피 대신 기존 폰트 유지 | 폰트 체계는 voithru.com 타이포그래피 스케일 따름. 디자인 가이드보다 프롬프트 지시가 우선 |
| WHY US 세로 펼침 | 01/02/03이 동시에 보임 | **하나만 보이고 자동 전환**. `overflow-hidden` + `absolute` 비활성 슬라이드 |
| voithru 색상 복사 | 벤치마킹 사이트 색상이 적용됨 | `#0097FE` 등 기존 CSS 변수만 사용 |
| 기능 레이어 손상 | Notion 연동 깨짐 | `src/lib/notion/`, `src/types/notion.ts` 절대 수정 금지 |
| 커밋 없이 대규모 변경 | 롤백 불가 | 섹션 하나마다 커밋 |
| 컨텍스트 과부하로 응답 멈춤 | Claude 응답 생성 실패 | 작업을 페이지/영역별로 분할 투입 |

---

## 7. 벤치마킹 대상

- **사이트**: voithru.com (보이스루)
- **가져오는 것**: 레이아웃 구조(뼈대) + 타이포그래피 스케일
- **가져오지 않는 것**: 색상, 이미지, 카피, 브랜드 요소, 기능

---

## 8. 타이포그래피 스케일 (voithru.com 참고, 데스크탑 기준)

아래는 `FINAL_프롬프트_Claude_Code.md`에 정의된 스케일입니다.
모바일은 약 60~75% 축소 적용.

| 용도 | 데스크탑 | 모바일 | weight |
|------|---------|--------|--------|
| 히어로 H1 | 48~56px | 28~32px | 700 |
| 히어로 서브카피 | 18~20px | 15~16px | 400 |
| 섹션 라벨 (Our Mission 등) | 14~16px | 12~14px | 500~600 |
| 섹션 제목 H2 | 36~42px | 24~28px | 700 |
| 섹션 설명 본문 | 16~18px | 14~16px | 400 |
| 숫자 강조 (2400+) | 48~64px | 36~48px | 800 |
| 카드 제목 | 18~22px | 16~18px | 600 |
| 카드 설명 | 14~16px | 13~15px | 400 |
| Why Us 넘버링 | 72~96px | 48~64px | 800 |
| Why Us 제목 | 28~36px | 22~26px | 700 |
| CTA 버튼 | 16~18px | 15~16px | 600 |
| 푸터 텍스트 | 13~14px | 12~13px | 400 |
| GNB 메뉴 | 16px | 16px | 500 |

---

*이 문서는 프로젝트가 존재하는 한 삭제하지 마세요. 모든 Claude Code 세션의 기본 컨텍스트입니다.*
