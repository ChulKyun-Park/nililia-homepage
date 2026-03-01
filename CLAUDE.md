# CLAUDE.md — Claude Code 상시 참조 가이드

> **최종 업데이트**: 2026-03-02
> 이 문서는 모든 Claude Code 세션의 기본 컨텍스트입니다. 삭제 금지.

---

## 1. 프로젝트 개요

| 항목 | 값 |
|------|---|
| 프로젝트 | 번역/로컬리제이션 서비스 회사 홈페이지 |
| 레포 | https://github.com/ChulKyun-Park/nililia-homepage |
| 배포 | https://nililia-homepage.vercel.app |
| 스택 | Next.js 14+ / TypeScript / Tailwind CSS v4 / Notion API / Vercel |
| 폰트 | Pretendard (한글) + Inter (영문) |
| 테마 | 라이트 모드 (흰색 배경 + `#0097FE` 포인트) |
| 벤치마킹 | [voithru.com](https://voithru.com/) — 구조(뼈대)만 참고 |

---

## 2. 수정 금지 영역 (⛔)

| 파일 | 이유 |
|------|------|
| `src/lib/notion/client.ts` | Notion API 연동 코드 |
| `src/types/notion.ts` | Notion 타입 정의 |
| `.env.local` 환경변수 | API 키, DB ID |

"Notion 연동 유지" = 위 파일 + News/CaseStudy의 fetch 호출 로직 수정 금지.

---

## 3. 파일 구조

```
src/
├── app/
│   ├── layout.tsx          # 전체 레이아웃 (GNB + Footer)
│   ├── page.tsx            # 홈 (섹션 조합)
│   ├── globals.css         # 테마 토큰, keyframes
│   ├── about/page.tsx      # 회사소개
│   ├── career/page.tsx     # 채용
│   ├── cases/page.tsx      # 성공사례 (Notion)
│   ├── contact/page.tsx    # 문의
│   ├── news/page.tsx       # 소식 (Notion)
│   └── services/page.tsx   # 서비스
├── components/
│   ├── layout/             # GNB, Footer, LanguageSelector
│   ├── sections/           # Hero, SocialProof, Mission, ServiceGrid,
│   │                       # WhyUs, News, CaseStudy, BottomCTA
│   └── ui/                 # Button, Card, Container
├── lib/notion/client.ts    # ⛔
└── types/notion.ts         # ⛔

public/images/              # 서비스 이미지 (한글 파일명)
```

---

## 4. 색상 규칙

```
[허용]
배경:        #FFFFFF, #F9FAFB (surface)
타이틀:      #111827 (Gray 900)
본문:        #6B7280 (Gray 500)
포인트:      #0097FE (primary)
포인트 연한: #E6F4FF 또는 rgba(0,151,254,0.05)
CTA 배경:    bg-gradient-to-r from-primary to-primary-dark (유일한 진한 배경)

[금지]
네이비/다크 배경 (#0B0F1A, #141926 등)
bg-dark-*, text-white (CTA 제외)
다크 모드 토큰
```

---

## 5. 타이포그래피 스케일

| 용도 | 데스크탑 | 모바일 | weight |
|------|---------|--------|--------|
| 히어로 H1 | 48–56px | 28–32px | 700 |
| 히어로 서브카피 | 18–20px | 15–16px | 400 |
| 섹션 라벨 | 14–16px | 12–14px | 500–600 |
| 섹션 제목 H2 | 36–42px | 24–28px | 700 |
| 본문 | 16–18px | 14–16px | 400 |
| 숫자 강조 | 48–64px | 36–48px | 800 |
| 카드 제목 | 18–22px | 16–18px | 600 |
| 카드 설명 | 14–16px | 13–15px | 400 |
| Why Us 넘버링 | 72–96px | 48–64px | 800 |
| CTA 버튼 | 16–18px | 15–16px | 600 |
| GNB 메뉴 | 16px | 16px | 500 |
| 푸터 | 13–14px | 12–13px | 400 |

---

## 6. 히어로 카드 애니메이션 사양

### 레이아웃
- 스테이지: 700×400, overflow:hidden
- 카드 비율: 6:7 (width:height)
- 행 크기비: 1.0 : 0.8 : 0.64 (Row3 > Row2 > Row1)
- Row3(앞, 3장): 180×210, y=195, z=3
- Row2(중, 2장): 144×168, y=82, z=2
- Row1(뒤, 3장): 115×134, y=-18, z=1
- 행간 50%+ 수직 겹침

### 애니메이션 사이클 (16초)
1. **323 정지** (0.9s) — 12px 드리프트
2. **323→232 캐스케이드** (1.9s)
3. **232 정지** (1.0s)
4. **232→323 캐스케이드** (1.9s)
5. **323 정지** (1.0s)
6. **한 줄 정렬** (1.5s)
7. **컨베이어 우→좌** (4.3s, 0.55px/frame)
8. **323 재조립** (3.5s, snapX 기반)

### 서비스 목록 (10장)
영상번역, 문서번역, SDH자막제작, 홈페이지현지화, 앱현지화, 웹소설번역, 웹툰번역, 게임번역, MTPE, 기업맞춤번역

---

## 7. 에셋 참조

| 에셋 | 위치 |
|------|------|
| 로고 PNG | `public/images/NILILIA.png` |
| 로고 SVG | `public/images/NILILIA_LOGO.svg` |
| 서비스 이미지 | `public/images/{서비스명}.jpg/.png` |
| 채용 이미지 | `public/images/careers_img.png` |

---

## 8. 과거 실수 기록

### 사고 #1 — Notion 페이지 자의적 생성 (2026-03-01)
컨텍스트 문서를 보고 Notion에 정리해야 한다고 판단 → 불필요한 페이지 생성.
**재발 방지**: 명시적 "~해줘" 지시 없이 도구 사용 금지.

---

## 9. 수정 후 체크리스트

- [ ] `npm run build` 에러 없음
- [ ] Notion API 데이터 정상 렌더링
- [ ] `--color-primary: #0097FE` 변경 없음
- [ ] `src/lib/notion/` 수정 없음
- [ ] 모바일 375px 레이아웃 정상
- [ ] bg-dark-* 클래스 0개
- [ ] 배포 사이트 실제 확인 (코드만 보고 판단 금지)

---

*이 문서는 프로젝트가 존재하는 한 삭제하지 마세요.*
