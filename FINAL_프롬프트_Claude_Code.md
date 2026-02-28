모든 작업을 자율적으로 계획하고 실행하라. 중간에 질문하지 말고, 판단이 필요하면 최선의 선택을 하고 진행하라. 완료 후 결과만 보고하라.

# 홈페이지 빌드

## 프로젝트 개요
voithru.com의 레이아웃 구조(뼈대)를 참고하여 회사 홈페이지를 Next.js로 구축한다.
벤치마킹 사이트의 구조만 차용하고, 콘텐츠·스타일·기능은 우리 것을 사용한다.
기존 프로젝트 `../nililia`의 에셋과 코드를 최대한 재활용할 것.

## 기존 프로젝트에서 재활용
- `../nililia/DESIGN_GUIDE.md` → 색감, 폰트, 스타일 가이드
- `../nililia/tailwind.config.ts` → 컬러 팔레트, 테마 설정
- `../nililia/lib/` → Notion API 연동 코드
- `../nililia/components/` → 재활용 가능한 UI 컴포넌트

## 기술 스택
- Next.js 14+ (App Router), TypeScript, Tailwind CSS
- Vercel 배포
- Notion API (CMS)
- Repository: https://github.com/ChulKyun-Park/nililia-homepage

## 페이지 섹션 구조 (위→아래)

1. **GNB** — sticky 상단 바. 좌: 로고 / 중앙~우: 메뉴(회사소개, 서비스, 성공사례, 소식, 문의) / 우: CTA "문의하기" / 모바일: 햄버거
2. **히어로** — 풀스크린 배경(CSS 그라데이션) + H1 메인카피 + 서브카피 + CTA 버튼
3. **사회적 증거** — 숫자 강조("OOO+ 기업이 신뢰합니다") + 클라이언트 로고 무한 스크롤(CSS marquee) + "성공 사례 보기" 링크
4. **미션** — 풀와이드 배경 + 미션 카피 중앙 정렬
5. **서비스 카드 그리드** — 섹션 제목 + 카드 그리드(3열 or 2열, 이미지+제목+설명+링크) + "전체 보기"
6. **Why Us 01** — 넘버링(01) + 좌: 텍스트 / 우: 이미지 + 하단 키워드 태그 3개
7. **Why Us 02** — 동일 패턴(02), 좌우 반전
8. **Why Us 03** — 동일 패턴(03)
9. **소식 (Notion 연동)** — 최신 3~4개 카드(이미지+제목+날짜+요약) + "전체 보기"
10. **성공 사례 (Notion 연동)** — 3~4개 카드(이미지+기업명+요약) + "전체 보기"
11. **하단 CTA** — 중앙 텍스트 + CTA 버튼
12. **푸터** — 4컬럼(회사정보/서비스/소식/연락처) + 이용약관 + 개인정보처리방침

## Notion API 연동

환경 변수 (.env.local):
```
NOTION_API_KEY=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
NOTION_NEWS_DB_ID=309a518039db806db6f7e06a543e95b8
NOTION_CASESTUDY_DB_ID=309a518039db807db43bcaad4fbf87e1
```

- @notionhq/notion-client 사용
- Server Component에서 직접 fetch
- ISR: revalidate = 3600
- 에러 시 빈 배열 반환 + 에러 로그

## 스타일
- 색감/폰트: `../nililia/DESIGN_GUIDE.md`와 `../nililia/tailwind.config.ts` 참고
- 기본 폰트: Pretendard (한글) + Inter (영문)
- 모던 B2B SaaS 느낌, 다크모드 미지원
- 반응형: 모바일(~768px) / 태블릿(~1024px) / 데스크탑(1024px~)

## 타이포그래피 스케일 (voithru.com 참고, 데스크탑 기준)
벤치마킹 사이트의 폰트 사이즈 비율을 따를 것. 아래는 데스크탑 기준이며, 모바일은 약 60~75% 축소 적용.

| 용도 | 데스크탑 사이즈 | 모바일 사이즈 | weight | 비고 |
|------|---------------|-------------|--------|------|
| GNB 메뉴 | 16px | 16px | 500 (medium) | |
| GNB CTA 버튼 | 15~16px | 15px | 600 (semibold) | |
| 히어로 H1 (메인 카피) | 48~56px | 28~32px | 700 (bold) | 가장 큰 텍스트 |
| 히어로 서브카피 | 18~20px | 15~16px | 400 (regular) | |
| 섹션 라벨 (Our Mission 등) | 14~16px | 12~14px | 500~600 | 영문 대문자, letter-spacing 넓게 |
| 섹션 제목 (H2) | 36~42px | 24~28px | 700 (bold) | |
| 섹션 설명 본문 | 16~18px | 14~16px | 400 (regular) | line-height: 1.6~1.8 |
| 숫자 강조 (2400+) | 48~64px | 36~48px | 800 (extrabold) | 사회적 증거 섹션 |
| 카드 제목 | 18~22px | 16~18px | 600 (semibold) | |
| 카드 설명 | 14~16px | 13~15px | 400 (regular) | |
| Why Us 넘버링 (01,02,03) | 72~96px | 48~64px | 800 (extrabold) | 아주 크고 연한 색 또는 outline |
| Why Us 제목 | 28~36px | 22~26px | 700 (bold) | |
| Why Us 키워드 태그 | 14~15px | 13~14px | 500 (medium) | 칩/배지 스타일 |
| CTA 버튼 텍스트 | 16~18px | 15~16px | 600 (semibold) | |
| 푸터 텍스트 | 13~14px | 12~13px | 400 (regular) | |
| 푸터 제목 (Service 등) | 14~15px | 13~14px | 600 (semibold) | |

## 이미지 처리
이미지는 전부 플레이스홀더로 처리한다.
- 히어로: CSS 그라데이션 배경
- 서비스 카드/Why Us: 회색 박스에 텍스트 레이블 (예: "[서비스 이미지]")
- 로고 마퀴: 임시 텍스트 로고
- 실제 이미지는 나중에 public/images/에 넣고 교체할 예정이므로 이미지 경로를 상수로 분리해서 교체가 쉽도록 할 것

## 폴더 구조
```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── layout/ (GNB.tsx, Footer.tsx)
│   ├── sections/ (Hero, SocialProof, Mission, ServiceGrid, WhyUs, News, CaseStudy, BottomCTA)
│   └── ui/ (Button, Card, Marquee)
├── lib/
│   └── notion.ts
└── types/
    └── notion.ts
```

## 실행 순서
1. `npx create-next-app@latest . --typescript --tailwind --app --src-dir`
2. `../nililia`에서 디자인 가이드·Notion 코드·tailwind 설정 참고/복사
3. 섹션별 컴포넌트 구현 (S1→S12)
4. Notion 연동 (소식 + 성공사례)
5. 반응형 확인
6. git commit + push

## 주의
- Tailwind CSS만 사용 (별도 CSS 파일 최소화)
- Server Component 우선, 인터랙션 필요 시만 Client Component
- SEO: 메타데이터, OG 태그 설정
- .env.local은 .gitignore에 포함할 것