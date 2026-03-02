# 채팅방 핸드오프 문서 — 2026.03.02 세션 #2

---

## 1. 프로젝트 기본 정보

| 항목 | 값 |
|------|---|
| 레포 | https://github.com/ChulKyun-Park/nililia-homepage |
| 배포 | https://nililia-homepage.vercel.app |
| 스택 | Next.js 14+ / TypeScript / Tailwind CSS v4 / Notion API / Vercel |
| 벤치마킹 대상 | https://voithru.com/ |
| 리빌드 전략 | A 방식 (프레임 복제 → 스타일 교체) — 확정, 재논의 불필요 |
| 노션 토큰 | 프로젝트 파일 `NOTION_TOKEN.txt` 참조 |
| GitHub 토큰 | 프로젝트 설정 참조 (문서에 기록 금지) |
| 3-레이어 원칙 | Layer 1(뼈대) 교체 / Layer 2(스타일) 유지 / Layer 3(기능) 절대 수정 금지 |

---

## 2. 핵심 규칙 (반드시 숙지)

### 2-1. 프로젝트 지침 (최상위)
- `Claude 행동 규칙` 문서: 요청한 것만 한다 / 금지 행위 / 의사결정 플로우차트
- `LAYOUT_GUIDE.md` (레포 루트): 히어로 레이아웃 기준 + 작업 규칙

### 2-2. 작업 규칙 — 이번 세션에서 확립됨
1. **허락 후 수정**: 코드 수정 전 반드시 사용자 확인. 승인 없이 commit/push 금지
2. **공통 컴포넌트 우선**: 개별 파일 하나씩 수정 금지. 1곳 수정 → 전체 반영
3. **용어**: "서브 페이지" 사용 금지 → "메뉴 페이지" 또는 "서비스 상세 페이지"로 구분
4. **언어**: TypeScript + CSS만 사용. JavaScript 사용 금지 (브라우저 javascript_tool 포함)
5. **확인 방법**: 코드 수정으로 확인. 브라우저 javascript_tool로 확인하지 않음

### 2-3. 사용자 성향
- 명확하고 직접적인 소통 선호
- 불필요한 확인 질문, 장황한 설명 싫어함
- 실수 반복에 엄격 — 같은 실수 2번 하면 강하게 지적
- "왜 이렇게 했는가"에 대한 근거를 요구함
- 획일화·통일성 중시

---

## 3. 이번 세션 완료 작업 (커밋 순서)

### 3-1. 홈 히어로 상하 여백 (2446e6a)
- `py-16` → `py-12` (홈 탭 히어로만)

### 3-2. WhyUs 넘버링 + 애니메이션 (451c8f5)
- 넘버링: `text-2xl`(24px) → `text-4xl`(36px) — 1.5배
- 슬라이드 애니메이션: `0.8s` → `1.2s` — 1.5배 느리게

### 3-3. 명칭 변경 + 푸터 링크 (2989d10)
- 홈 히어로 카드: "SDH · 배리어프리 자막 제작" → "SDH 자막 제작"
- 푸터: "SDH · 배리어프리 자막 제작" → "SDH · 배리어프리 자막"
- 푸터 서비스 링크: 6개는 개별 상세페이지, MTPE/AI 더빙은 `/services`

### 3-4. 본문 텍스트 크기 통일 (672ec77 + c72090e)
- CSS 변수 `--font-size-body: 1.175rem` (~19px) 생성
- 21개 파일 + 5개 누락 파일 본문 텍스트에 적용
- 적용 대상: SocialProof, ServiceGrid, WhyUs, NewsCaseStudy, 메뉴 페이지 히어로, 메뉴 페이지 본문

### 3-5. 서비스 그리드 폰트 별도 조정 (2cffa5f)
- 서비스 그리드는 19px가 아닌 기존 크기 × 1.2
- CSS 변수: `--font-size-card-title: 1.2rem`, `--font-size-card-desc: 0.9rem`, `--font-size-card-link: 1.05rem`

### 3-6. 히어로 텍스트 좌측 위치 통일 — 삽질 과정 포함 (a61d35f ~ b094f23)

**문제**: 메뉴 페이지 히어로 텍스트 좌측 위치가 홈 탭과 달랐음

**삽질 과정** (사용자 지적으로 수정 반복):
1. `w-full` 추가 (7f8153e) — flex 컨테이너 내부 width 문제 해결했으나 좌측 여백 불일치 미해결
2. `lg:pl-12` 제거 (ce415d3) — 오히려 더 왼쪽으로 밀림 (홈 히어로에는 `lg:pl-12`가 있었음)
3. `lg:pl-12` 복원 (d0ce995) — 원상복구했으나 여전히 홈과 불일치

**근본 원인 규명**:
- 홈 히어로: `px-6`(24px) 외부 + `lg:pl-12`(48px) 내부 = **72px**
- PageHero: `px-6 lg:pl-12` 한 div에 → `lg:pl-12`가 `px-6` left를 덮어씀 = **48px만**
- **24px 차이**

**최종 해결** (f456d30 + b094f23):
1. `PageHero.tsx` 공통 컴포넌트 생성 → 14개 페이지 전부 이 컴포넌트 사용
2. 2단 구조로 수정: `px-6` 외부 + `lg:pl-12` 내부 = 72px (홈과 동일)

### 3-7. LAYOUT_GUIDE.md 생성 (fef18be)
- 히어로 레이아웃 기준 (홈 탭 = 기준)
- 작업 규칙 (허락 후 수정, 공통 컴포넌트 우선)
- 용어 정의, 폰트 크기 기준, 체크리스트

---

## 4. 현재 아키텍처 — 주요 공통 컴포넌트

| 컴포넌트 | 파일 | 역할 | 사용 페이지 수 |
|---------|------|------|-------------|
| `PageHero` | `src/components/sections/PageHero.tsx` | 메뉴/서비스 상세 페이지 히어로 | 14 |
| `Container` | `src/components/ui/Container.tsx` | 본문 섹션 컨테이너 (`lg:pl-12` 포함) | 다수 |
| `Section` | `src/components/ui/Section.tsx` | 본문 섹션 래퍼 | 다수 |
| `SectionHeader` | `src/components/ui/SectionHeader.tsx` | 섹션 제목 | 다수 |

### PageHero 사용 현황 (14개)
- 메뉴 페이지: about, services, cases, news, contact, career (6개)
- 서비스 상세: video-translation, document-translation, web-app-localization, game-localization, webnovel-translation, sdh-subtitle, mtpe, ai-dubbing (8개)
- career만 `children` prop 사용 (grid 2단 레이아웃)

---

## 5. 히어로 좌측 여백 구조 (최종)

```
홈 히어로 (Hero.tsx)
├── div.mx-auto.max-w-7xl.px-6.py-12        ← padding-left: 24px
│   └── div.max-w-xl.lg:pl-12               ← padding-left: 48px (lg)
│       └── 텍스트                            총: 72px

PageHero.tsx (메뉴 + 서비스 상세)
├── section.bg-hero-bg
│   └── div.mx-auto.w-full.max-w-7xl.px-6   ← padding-left: 24px
│       └── div.lg:pl-12                     ← padding-left: 48px (lg)
│           └── 텍스트                        총: 72px ✅ 홈과 동일
```

---

## 6. CSS 변수 현황 (globals.css)

```css
--color-hero-bg: #F8FBFF;
--font-size-hero-h1: 3.5rem;
--font-size-hero-sub: 1.175rem;
--font-size-body: 1.175rem;
--font-size-card-title: 1.2rem;
--font-size-card-desc: 0.9rem;
--font-size-card-link: 1.05rem;
```

---

## 7. 이전 세션(#1)에서 완료된 작업 요약

- 서비스 텍스트 표준화
- MTPE/AI 더빙 카드 coming soon 처리
- 푸터 CONTENTSFLY 링크 업데이트
- WhyUs 애니메이션 초기 강화
- 히어로/소셜프루프 여백 조정
- Voithru 벤치마킹 분석 (서비스 카드 static PNG, GIF는 상세페이지만)
- 히어로 배경색 반복 조정: #EEF6FF → #F4F9FF → #F3F9FF → #F8FBFF
- 블러 오버레이 제거, 카드 그림자 제거
- 애니메이션 박스 95% scale + 우측 고정

---

## 8. 미완료 / 향후 작업

- 히어로 좌측 여백 통일 후 **사용자 확인 대기 중** (b094f23 배포 후 확인 필요)
- 서비스 상세 페이지 콘텐츠 보강 (이미지, 상세 설명 등)
- Notion API 연동 (뉴스/성공사례 동적 데이터)
- 실제 클라이언트 로고, 크리에이터 정보 교체

---

## 9. 사용자가 강하게 지적한 사항 (재발 방지)

1. **마음대로 수정하지 마라** — 반드시 허락 받고 진행
2. **개별 파일 하나씩 수정하지 마라** — 공통 컴포넌트/가이드로 일괄 관리
3. **"서브 페이지"라고 부르지 마라** — 회사소개, 서비스 등은 엄연한 메뉴 페이지
4. **JavaScript 쓰지 마라** — TypeScript + CSS만
5. **홈 탭이 기준이다** — 다른 페이지를 먼저 보지 말고 홈 탭 구조를 기준으로 맞춰라
6. **같은 실수 반복하지 마라** — lg:pl-12 제거했다 복원했다 반복한 것 강하게 지적받음
