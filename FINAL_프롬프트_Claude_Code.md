# 초기 빌드 프롬프트 (아카이브)

> **이 문서는 프로젝트 초기 빌드 시 사용한 프롬프트 기록입니다.**
> 현재 운영 가이드는 [`CLAUDE.md`](CLAUDE.md)를 참조하세요.
> **최종 업데이트**: 2026-03-02

---

## 빌드 지시사항

모든 작업을 자율적으로 계획하고 실행하라.
중간에 질문하지 말고, 판단이 필요하면 최선의 선택을 하고 진행하라.
완료 후 결과만 보고하라.

---

## 프로젝트 개요

voithru.com의 레이아웃 구조(뼈대)를 참고하여 회사 홈페이지를 Next.js로 구축한다.
벤치마킹 사이트의 구조만 차용하고, 콘텐츠·스타일·기능은 자체 제작.

---

## 기술 스택

- Next.js 14+ (App Router), TypeScript, Tailwind CSS v4
- Vercel 배포 / Notion API (CMS)
- Repository: https://github.com/ChulKyun-Park/nililia-homepage

---

## 페이지 섹션 구조 (위→아래)

1. **GNB** — sticky. 좌: 로고 / 중앙~우: 메뉴 / 우: CTA / 모바일: 햄버거
2. **히어로** — 카드 애니메이션 + H1 + CTA 버튼
3. **사회적 증거** — 숫자 강조 + 로고 마퀴
4. **미션** — 풀와이드 배경 + 미션 카피
5. **서비스 카드 그리드** — 3열/2열, 이미지+제목+설명
6. **Why Us 01** — 넘버링 + 좌텍스트/우이미지
7. **Why Us 02** — 좌우 반전
8. **Why Us 03** — 동일 패턴
9. **소식** — Notion 연동 (ISR 1h)
10. **성공사례** — Notion 연동 (ISR 1h)
11. **하단 CTA** — 중앙 텍스트 + 버튼
12. **푸터** — 4컬럼 + 법적 링크

---

## Notion API 연동

```
NOTION_API_KEY=ntn_443170308755...
NOTION_NEWS_DB_ID=309a518039db806db6f7e06a543e95b8
NOTION_CASESTUDY_DB_ID=309a518039db807db43bcaad4fbf87e1
```

- @notionhq/notion-client 사용
- Server Component에서 직접 fetch
- ISR: revalidate = 3600
- 에러 시 빈 배열 반환 + 에러 로그

---

## 스타일 규칙

- Pretendard (한글) + Inter (영문)
- 모던 B2B SaaS, 다크모드 미지원
- 반응형: 모바일(~768) / 태블릿(~1024) / 데스크탑(1024~)
- 색상·타이포 상세 → [`CLAUDE.md`](CLAUDE.md) §4, §5 참조

---

## 타이포그래피 스케일

| 용도 | 데스크탑 | 모바일 | weight |
|------|---------|--------|--------|
| 히어로 H1 | 48–56px | 28–32px | 700 |
| 히어로 서브카피 | 18–20px | 15–16px | 400 |
| 섹션 라벨 | 14–16px | 12–14px | 500–600 |
| 섹션 제목 H2 | 36–42px | 24–28px | 700 |
| 본문 | 16–18px | 14–16px | 400 |
| 숫자 강조 | 48–64px | 36–48px | 800 |
| 카드 제목 | 18–22px | 16–18px | 600 |
| Why Us 넘버링 | 72–96px | 48–64px | 800 |
| CTA 버튼 | 16–18px | 15–16px | 600 |
| GNB 메뉴 | 16px | 16px | 500 |
| 푸터 | 13–14px | 12–13px | 400 |

---

## 주의사항

- Tailwind CSS만 사용 (별도 CSS 최소화)
- Server Component 우선, 인터랙션 필요 시만 Client Component
- SEO: 메타데이터, OG 태그 설정
- .env.local은 .gitignore에 포함

---

*이 문서는 아카이브 목적입니다. 실제 작업 시에는 CLAUDE.md를 참조하세요.*
