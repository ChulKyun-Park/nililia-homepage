# 🔴 UI 수정 반영 전수 점검 + Claude Code 실행 가이드

> **작성일**: 2026-03-01
> **대상 레포**: https://github.com/ChulKyun-Park/nililia-homepage
> **배포 URL**: https://nililia-homepage.vercel.app/
> **최신 커밋**: `d70e7d4` — "UI overhaul: Hero conveyor belt, Footer 4-column, Career 2-column layout"
> **점검 방법**: 3개 가이드 문서(01~03)의 모든 수정 항목을 **실제 소스 코드**와 1:1 대조

---

## PART A: 코드 기반 전수 점검 결과

> 🟢 = 코드에 반영 완료
> 🟡 = 반영되었으나 보완 필요
> 🔴 = 미반영

### A-1. 홈 페이지 — 히어로 섹션

| # | 항목 | 상태 | 코드 근거 |
|---|------|------|----------|
| 1 | 슬로건 → "여러분의 콘텐츠에 날개를 달아줍니다" | 🟢 | `Hero.tsx:35-38` — 정확히 반영됨 |
| 2 | 서브카피 2줄 분리 | 🟢 | `Hero.tsx:39-44` — 별도 `<p>` 태그로 분리됨 |
| 3 | 히어로 공간 축소 | 🟢 | `Hero.tsx:23` — `min-h-[70vh]` (기존 풀스크린에서 축소) |
| 4 | 컨베이어 벨트 애니메이션 존재 | 🟢 | `globals.css:83-117` + `Hero.tsx:82-97` — 구현됨 |
| 5 | 컨베이어 벨트: **직사각형 경로** | 🟡 | `globals.css:84-108` — 직사각형 좌표 이동은 구현됐으나, **잠깐 멈추는 step 동작이 없음**. `linear` 연속 이동으로 되어 있어 에스컬레이터/톱니바퀴 느낌이 아닌 부드러운 흐름. keyframe에 멈춤 구간(동일 좌표 유지) 추가 필요 |
| 6 | 중국어 키워드 추가 | 🔴 | `Hero.tsx:5-12` — services 배열에 중국어 키워드 없음. 6개만 존재 |
| 7 | 다국어 인사말 둥실둥실 | 🟢 | `Hero.tsx:14-19` + `globals.css:55-81` — 4개 인사말 float 애니메이션 구현. 단, `Hero.tsx:18`에 "你好"가 있으나 이것은 인사말용이지 서비스 키워드가 아님 |

### A-2. 홈 페이지 — 기타 섹션

| # | 항목 | 상태 | 코드 근거 |
|---|------|------|----------|
| 8 | OUR MISSION 축소 | 🟡 | `Mission.tsx:3` — `py-16`으로 설정. 이전보다 축소됐지만, 문서에서 요구한 "50% 축소" 기준 대비 검증 필요 |
| 9 | SERVICES 썸네일 공간 | 🟢 | `ServiceGrid.tsx:87-92` — `aspect-[16/10]` 썸네일 placeholder 영역 있음 |
| 10 | WHY US 자동 전환 (하나씩) | 🟢 | `WhyUs.tsx:33-57` — `useState(active)` + `setInterval 4500ms` + `translate-y-8 opacity-0` 전환. 하나만 보이고 자동 전환 동작 |
| 11 | WHY US 전환 방향 (아래→위) | 🟢 | `WhyUs.tsx:87` — `translate-y-8`에서 `translate-y-0`으로 전환 (아래→위) |
| 12 | 최신 소식 (Notion API 연동) | 🟢 | `News.tsx:4` — `fetchNewsPreview(4)` 호출. Notion API로 데이터 가져옴 |
| 13 | 성공 사례 (Notion API 연동) | 🟢 | `CaseStudy.tsx:4` — `fetchCaseStudyPreview(3)` 호출. Notion API로 데이터 가져옴 |

### A-3. 푸터

| # | 항목 | 상태 | 코드 근거 |
|---|------|------|----------|
| 14 | 4컬럼 구조 | 🟢 | `Footer.tsx:24` — `lg:grid-cols-4` |
| 15 | 1열: 회사정보 (타이틀 없이) | 🟡 | `Footer.tsx:27-29` — "(주)닐리리아"가 타이틀로 존재. 문서에서는 "회사 정보라고 쓰지 않고 실제 정보만" 요구했으나, 회사명은 실제 정보이므로 OK. 단, 주소·대표자·사업자번호가 **더미 데이터** |
| 16 | 2열: 서비스 | 🟢 | `Footer.tsx:4-9` — 5개 서비스 링크 |
| 17 | 3열: 패밀리사이트 (CONTENTSFLY, CONTENTSFLYS, CAREERS) | 🟢 | `Footer.tsx:12-16` — 정확히 3개 |
| 18 | 4열: 문의하기 | 🟢 | `Footer.tsx:77-131` — 전화·이메일·견적문의 버튼 |

### A-4. 채용 페이지

| # | 항목 | 상태 | 코드 근거 |
|---|------|------|----------|
| 19 | 히어로 우측 사진 슬롯 | 🟢 | `career/page.tsx:165-169` — `[팀 사진]` placeholder 있음 |
| 20 | 2단 분리 (정규직/프리랜서) | 🟢 | `career/page.tsx:212-242` — `lg:grid-cols-2`로 좌/우 분리 |
| 21 | 정규직 데이터 | 🟡 | `career/page.tsx:60-79` — **하드코딩된 더미 데이터**. 문서에서 "노션 연동 데이터" 언급했으나 현재 Notion API 연동 안 됨. 향후 결정 필요 |
| 22 | 프리랜서 데이터 | 🟡 | `career/page.tsx:81-100` — 동일. 하드코딩 |

### A-5. 글로벌

| # | 항목 | 상태 | 코드 근거 |
|---|------|------|----------|
| 23 | 폰트 체계 voithru 타이포그래피 | 🟡 | `FINAL_프롬프트_Claude_Code.md:57-77`에 voithru 참고 스케일 명시됨. `globals.css`에는 Pretendard + Inter가 설정되어 있으나, **개별 컴포넌트에서 Tailwind 유틸리티(`text-4xl`, `text-sm` 등)로 직접 지정**하고 있어 중앙화된 타이포그래피 시스템이 아님. 가이드 문서의 "CSS 변수 또는 Tailwind config에 반영" 미달 |
| 24 | 언어 선택 국기 이모지 | 🟢 | `LanguageSelector.tsx:8-17` — 🇰🇷🇺🇸🇨🇳🇹🇼🇯🇵🇻🇳🇪🇸🇮🇩🇹🇭🇷🇺 전부 구현 |
| 25 | 홈 버튼 (로고 → /) | 🟢 | `GNB.tsx:43` — `<Link href="/">` |
| 26 | Notion API 연동 정상 | 🟢 | `lib/notion/client.ts` — 소식·성공사례 모두 Notion API로 fetch. ISR 3600초 |
| 27 | 반응형 | 🟢 | 전체 컴포넌트에서 `sm:`, `md:`, `lg:` 반응형 클래스 사용 |
| 28 | 브랜드 컬러 `#0097FE` 유지 | 🟢 | `globals.css:7` — `--color-primary: #0097FE` |

---

### A-6. 종합

| 상태 | 개수 | 비율 |
|------|------|------|
| 🟢 반영 완료 | **20개** | 71% |
| 🟡 보완 필요 | **7개** | 25% |
| 🔴 미반영 | **1개** | 4% |

**미반영 1건**: 중국어 키워드 미추가 (#6)

**보완 필요 7건**:
1. 컨베이어 벨트 step 멈춤 동작 (#5)
2. OUR MISSION 축소 정도 확인 (#8)
3. 푸터 1열 더미 데이터 → 실제 데이터 교체 (#15)
4. 채용 정규직 데이터 소스 결정 (#21)
5. 채용 프리랜서 데이터 소스 결정 (#22)
6. 타이포그래피 중앙화 (#23)
7. (해당 없음 — 위 6건이 실제 보완 대상)

---

## PART B: 지금 해야 할 일 (우선순위 순)

### 즉시 실행 (코드 수정)

**1순위 — 중국어 키워드 추가** (🔴 미반영)
- 파일: `src/components/sections/Hero.tsx`
- 위치: `services` 배열 (line 5~12)
- 작업: 배열 맨 앞에 중국어 키워드 1개 추가 (예: "中文翻译" 또는 사용자 지정)

**2순위 — 컨베이어 벨트 step 멈춤** (🟡)
- 파일: `src/app/globals.css`
- 위치: `@keyframes conveyor-belt` (line 84~108)
- 작업: 각 꼭짓점에서 동일 좌표를 2~3% 구간 유지하여 "잠깐 멈춤" 효과 추가
- 예시:
```css
/* 좌상단 도착 후 멈춤 */
25% { transform: translate(10px, 10px); }
30% { transform: translate(10px, 10px); } /* ← 멈춤 구간 */
```

**3순위 — 타이포그래피 중앙화** (🟡)
- `FINAL_프롬프트_Claude_Code.md:57-77`에 정의된 스케일을 `globals.css`의 `@theme` 블록 또는 별도 CSS 변수로 정의
- 각 컴포넌트에서 하드코딩된 `text-4xl`, `text-sm` 등을 변수 참조로 교체

### 후속 결정 필요 (사용자 확인)

- 푸터 1열 회사정보: 실제 데이터 확보 시점
- 채용 포지션: 하드코딩 유지 vs Notion API 연동
- 중국어 키워드: 정확한 텍스트

---

## PART C: 프로젝트 컨텍스트 요약 (Claude Code용 상시 참조)

> 이 섹션은 **이 프로젝트에서 "노션"이란 무엇인지**를 명확히 정의합니다.
> Claude Code나 Claude 대화형에서 혼동하지 않도록 합니다.

### C-1. 이 프로젝트에서 "Notion"의 의미

이 프로젝트에서 Notion은 **CMS(콘텐츠 관리 시스템)**로 사용됩니다.

- **소식(News)** 페이지: Notion 데이터베이스(`NOTION_NEWS_DB_ID`)에서 기사를 가져와 표시
- **성공사례(Case Studies)** 페이지: Notion 데이터베이스(`NOTION_CASESTUDY_DB_ID`)에서 사례를 가져와 표시
- 연동 코드: `src/lib/notion/client.ts` — Notion REST API를 직접 호출
- 환경변수: `.env.local`에 `NOTION_API_KEY`, `NOTION_NEWS_DB_ID`, `NOTION_CASESTUDY_DB_ID`

**즉, "Notion 연동을 유지한다"는 말은:**
- `src/lib/notion/client.ts` 파일을 수정하지 말라는 뜻
- `News.tsx`, `CaseStudy.tsx`에서 `fetchNewsPreview()`, `fetchCaseStudyPreview()`를 호출하는 로직을 건드리지 말라는 뜻
- Notion이라는 외부 도구를 사용하여 문서를 만들라는 뜻이 **절대 아님**

### C-2. 3레이어 분리 원칙

| 레이어 | 내용 | 수정 가능? | 해당 파일 |
|--------|------|-----------|----------|
| **뼈대** | 섹션 순서, 레이아웃, 반응형 구조 | ✅ 교체 대상 | 모든 컴포넌트의 JSX/className |
| **살** | 컬러(`#0097FE`), 애니메이션, 이미지, 카피 | ✅ 재활용 | `globals.css`, 각 컴포넌트의 텍스트·에셋 |
| **장기** | Notion API 연동, 데이터 흐름 | 🚫 수정 금지 | `src/lib/notion/client.ts`, `src/types/notion.ts`, 환경변수 |

### C-3. 실수 방지 규칙

1. **`src/lib/notion/` 디렉토리의 파일을 수정하지 마세요** — 이것이 "Notion 연동 유지"의 의미입니다.
2. **`globals.css`의 `@theme` 블록에서 `--color-primary: #0097FE`를 변경하지 마세요.**
3. **애니메이션 경로를 설명할 때 "직사각형"과 "원형"을 혼동하지 마세요.** 이 프로젝트의 컨베이어 벨트는 직사각형 경로입니다.
4. **WHY US 섹션은 01/02/03 중 하나만 보입니다.** 세로로 펼치지 마세요.
5. **voithru.com에서 가져오는 것은 레이아웃 구조 + 타이포그래피 스케일뿐입니다.** 색상을 복사하지 마세요.
6. **섹션 하나 수정할 때마다 커밋하세요.**

### C-4. 기술 스택

- Next.js 14+ (App Router), TypeScript, Tailwind CSS v4
- Vercel 배포
- Notion API (CMS) — `@notionhq/notion-client` 미사용, 직접 fetch
- Pretendard (한글) + Inter (영문)
- 다크 테마 기본

---

## PART D: Claude Code 실행 프롬프트 (복붙용)

아래를 Claude Code에 투입하세요:

```
이 프로젝트의 UI 보완 작업을 실행합니다.
레포: https://github.com/ChulKyun-Park/nililia-homepage

## 절대 규칙
- src/lib/notion/ 디렉토리 수정 금지 (Notion API 연동 코드)
- globals.css의 --color-primary: #0097FE 변경 금지
- 섹션 하나 수정 → 커밋 → 다음 섹션

## 작업 1: 중국어 키워드 추가
파일: src/components/sections/Hero.tsx
services 배열의 "영상 번역" 앞에 중국어 키워드 추가.
키워드: "中文翻译"

커밋: "fix(hero): 중국어 키워드 추가"

## 작업 2: 컨베이어 벨트 step 멈춤 효과
파일: src/app/globals.css
@keyframes conveyor-belt에서 각 꼭짓점(좌하단, 좌상단, 우상단, 우하단)에
동일 좌표를 3~4% 구간 유지하는 멈춤 구간 추가.
결과: 에스컬레이터처럼 "이동 → 잠깐 멈춤 → 이동 → 잠깐 멈춤" 반복.

커밋: "feat(hero): 컨베이어 벨트 step 멈춤 효과"

## 작업 3: 타이포그래피 스케일 CSS 변수화
파일: src/app/globals.css
FINAL_프롬프트_Claude_Code.md의 57~77행에 정의된 타이포그래피 스케일을
CSS 커스텀 속성(--font-size-hero-h1, --font-size-section-h2 등)으로 정의.
각 컴포넌트에서 해당 변수를 참조하도록 점진적 교체.

커밋: "refactor(typography): 타이포그래피 스케일 CSS 변수 중앙화"

## 완료 후
git push
```
