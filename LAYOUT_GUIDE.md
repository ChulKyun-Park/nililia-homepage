# 레이아웃 가이드 — nililia-homepage

> **이 문서는 프로젝트 전체 레이아웃의 단일 기준점(Single Source of Truth)이다.**
> 모든 페이지·섹션은 이 가이드를 따른다. 예외 없음.

---

## 0. 작업 규칙

### 0-1. 허락 후 수정 원칙

**코드 수정 전 반드시 사용자 확인을 받는다.**

- 원인 분석 → 수정 방안 제시 → **사용자 승인** → 수정 실행
- "이렇게 수정하겠습니다"가 아니라 "이렇게 수정해도 될까요?"
- 승인 없이 `git commit`, `git push` 금지

### 0-2. 공통 컴포넌트 우선 원칙

- 동일 패턴이 2개 이상 페이지에 존재하면 **공통 컴포넌트**로 관리한다.
- 개별 파일을 하나씩 수정하지 않는다.
- 컴포넌트 1곳 수정 → 전체 반영이 기본이다.

### 0-3. 용어 정의

| 용어 | 의미 |
|------|------|
| 홈 탭 | `/` (메인 페이지) |
| 메뉴 페이지 | 회사소개(`/about`), 서비스(`/services`), 성공사례(`/cases`), 소식(`/news`), 채용(`/career`), 문의(`/contact`) |
| 서비스 상세 페이지 | `/services/video-translation`, `/services/document-translation` 등 8개 |
| 서브 페이지 | ❌ 사용 금지. "메뉴 페이지" 또는 "서비스 상세 페이지"로 구분하여 칭한다 |

---

## 1. 히어로 섹션 레이아웃 기준

### 1-1. 기준: 홈 탭 히어로 섹션

홈 탭(`/`)의 히어로 섹션이 **모든 페이지 히어로의 기준**이다.

```
홈 히어로 구조 (Hero.tsx)
─────────────────────────
외부 컨테이너:  mx-auto max-w-7xl px-6     → left padding 24px
내부 텍스트:    max-w-xl lg:pl-12           → 추가 left padding 48px (lg 이상)
─────────────────────────
총 좌측 여백 (lg): 24px + 48px = 72px
```

### 1-2. 메뉴 페이지 · 서비스 상세 페이지 히어로

`PageHero.tsx` 공통 컴포넌트를 사용한다. 구조는 홈 히어로와 **동일**해야 한다:

```
PageHero 구조 (올바른 구조)
─────────────────────────
외부 컨테이너:  mx-auto w-full max-w-7xl px-6   → left padding 24px
내부 래퍼:      lg:pl-12                          → 추가 left padding 48px (lg 이상)
─────────────────────────
총 좌측 여백 (lg): 24px + 48px = 72px  ← 홈 히어로와 동일
```

**잘못된 구조 (절대 사용 금지):**
```
❌  mx-auto w-full max-w-7xl px-6 lg:pl-12
    → lg:pl-12가 px-6의 left를 덮어씀 → 48px만 적용 → 홈과 24px 차이
```

### 1-3. 상하 여백

| 페이지 | 상하 여백 |
|--------|----------|
| 홈 탭 | `py-12` (48px) — 홈만 예외 |
| 그 외 전체 | `py-4 lg:py-6` (16px / 24px) |

### 1-4. 배경색

모든 히어로 섹션: `bg-hero-bg` (`--color-hero-bg: #F8FBFF`)

---

## 2. 컨테이너 레이아웃 기준

### 2-1. 표준 컨테이너

```
mx-auto max-w-7xl px-6
```

- `lg:pl-12`는 컨테이너에 직접 붙이지 않는다.
- 필요 시 **내부 래퍼**에 `lg:pl-12`를 적용한다.

### 2-2. Container.tsx 컴포넌트

`Container.tsx`에 `lg:pl-12`가 포함되어 있음. 이는 본문 섹션용이며, 히어로 섹션과는 별개.

---

## 3. 폰트 크기 기준

### 3-1. CSS 변수 (globals.css)

| 변수 | 값 | 용도 |
|------|---|------|
| `--font-size-hero-h1` | 3.5rem | 홈 히어로 제목 |
| `--font-size-hero-sub` | 1.175rem | 홈 히어로 설명 |
| `--font-size-body` | 1.175rem | 전체 본문 텍스트 |
| `--font-size-card-title` | 1.2rem | 서비스 카드 제목 |
| `--font-size-card-desc` | 0.9rem | 서비스 카드 설명 |
| `--font-size-card-link` | 1.05rem | 서비스 카드 링크 |

### 3-2. 크기 변경 시

- CSS 변수 1곳만 수정 → 전체 반영
- 개별 파일에서 `text-sm`, `text-base` 등 Tailwind 클래스 직접 지정 금지 (변수 사용)

---

## 4. 공통 컴포넌트 목록

| 컴포넌트 | 파일 | 사용처 |
|---------|------|--------|
| `PageHero` | `src/components/sections/PageHero.tsx` | 메뉴 페이지 + 서비스 상세 페이지 히어로 (14개) |
| `Container` | `src/components/ui/Container.tsx` | 본문 섹션 컨테이너 |
| `Section` | `src/components/ui/Section.tsx` | 본문 섹션 래퍼 |
| `SectionHeader` | `src/components/ui/SectionHeader.tsx` | 섹션 제목 |

---

## 5. 체크리스트: 수정 전 확인사항

1. ✅ 수정 방안을 사용자에게 제시했는가?
2. ✅ 사용자 승인을 받았는가?
3. ✅ 공통 컴포넌트로 해결 가능한가? (가능하면 개별 파일 수정 금지)
4. ✅ 홈 탭 기준과 일치하는가?
5. ✅ TypeScript + CSS만 사용했는가? (JavaScript 사용 금지)
