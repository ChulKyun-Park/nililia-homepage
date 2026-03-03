/**
 * homePreview.ts
 * ─────────────────────────────────────────────────
 * Notion fetch 함수 — client.ts 수정 금지 영역 보완.
 *
 * 1. 홈 페이지: "홈메뉴 노출" 체크박스 기반 프리뷰
 * 2. Cases 페이지: CMS 가이드 필드명 기준 매핑
 *    (ContentType → category, Field → tags 등)
 *
 * ⚠️  client.ts 는 수정 금지 영역이므로 별도 파일로 분리.
 * ─────────────────────────────────────────────────
 */

import type { NotionNewsItem, NotionCaseStudyItem } from "@/types/notion";

const NOTION_API_BASE = "https://api.notion.com/v1";
const NOTION_VERSION = "2022-06-28";
const REVALIDATE_SECONDS = 0;

const NEWS_DB_ID = process.env.NOTION_NEWS_DB_ID ?? "";
const CASESTUDY_DB_ID = process.env.NOTION_CASESTUDY_DB_ID ?? "";
const POPUP_DB_ID = process.env.NOTION_POPUP_DB_ID ?? "";

/* ── Helpers (client.ts 에서 export 안 되므로 복제) ── */

function getToken(): string {
  const token = process.env.NOTION_API_KEY?.trim();
  if (!token) throw new Error("NOTION_API_KEY is not configured");
  return token;
}

async function queryDatabase(
  databaseId: string,
  body: Record<string, unknown>,
) {
  const res = await fetch(
    `${NOTION_API_BASE}/databases/${databaseId}/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Notion-Version": NOTION_VERSION,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      next: { revalidate: REVALIDATE_SECONDS },
    },
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Notion API error (${res.status}): ${text}`);
  }

  return res.json();
}

function getRichText(prop: unknown): string {
  const arr = prop as Array<{ plain_text?: string }> | undefined;
  return arr?.map((t) => t.plain_text ?? "").join("") ?? "";
}

function getTitle(prop: unknown): string {
  const arr = prop as Array<{ plain_text?: string }> | undefined;
  return arr?.map((t) => t.plain_text ?? "").join("") ?? "";
}

function getDate(prop: unknown): string {
  const d = prop as { start?: string } | null;
  return d?.start ?? "";
}

function getCheckbox(prop: unknown): boolean {
  return prop === true;
}

function getSelect(prop: unknown): string {
  const s = prop as { name?: string } | null;
  return s?.name ?? "";
}

function getMultiSelect(prop: unknown): string[] {
  const arr = prop as Array<{ name?: string }> | undefined;
  return arr?.map((t) => t.name ?? "").filter(Boolean) ?? [];
}

function getFileThumbnail(prop: unknown): string | null {
  const files = prop as Array<{
    file?: { url?: string };
    external?: { url?: string };
  }> | undefined;
  if (!files || files.length === 0) return null;
  return files[0]?.file?.url ?? files[0]?.external?.url ?? null;
}

type NotionProperty = {
  type?: string;
  title?: unknown;
  rich_text?: unknown;
  date?: unknown;
  url?: unknown;
  files?: unknown;
  select?: { name?: string } | null;
  multi_select?: Array<{ name?: string }>;
  checkbox?: boolean;
};

type NotionPage = {
  id: string;
  created_time?: string;
  properties: Record<string, NotionProperty>;
};

/* ══════════════════════════════════════════════════════
 * Mappers — CMS 가이드 필드명 기준
 * ══════════════════════════════════════════════════════
 * News DB:
 *   Title, Slug, Category(select), Thumbnail, Excerpt,
 *   Tags(multi_select), Published, Pinned, Date, Author, PopUp
 *
 * Case Studies DB (CMS 가이드):
 *   필드명(title)  → Name / 고객사명 → client
 *   Task(text)     → 과업명(1줄 요약) → title
 *   ContentType(select) → 영상/문서/웹소설·웹툰/... → category
 *   Field(multi_select) → 분야(마케팅/법률/엔터...) → tags
 *   Languages, Duration, Results(=Volume), Tags, Published,
 *   Pinned, Date, Excerpt, SEO Description, PopUp
 * ══════════════════════════════════════════════════════ */

function mapNewsPage(page: NotionPage): NotionNewsItem {
  const props = page.properties;
  return {
    id: page.id,
    title: getRichText(props.Title?.rich_text),
    excerpt: getRichText(props.Excerpt?.rich_text),
    thumbnail: getFileThumbnail(props.Thumbnail?.files),
    publishedAt: getDate(props.Date?.date),
    slug: getRichText(props.Slug?.rich_text) || page.id,
    category: getSelect(props.Category?.select),
    author: getRichText(props.Author?.rich_text),
    pinned: getCheckbox(props.Pinned?.checkbox),
    tags: getMultiSelect(props.Tags?.multi_select),
  };
}

/**
 * Case Study 매퍼 — CMS 가이드 필드명 사용.
 *
 * client.ts 의 mapCasePage 는 옛 필드명(Category, Title 등)을 사용하므로
 * 현재 DB 스키마(ContentType, Task, Field 등)에 맞게 재매핑.
 */
function mapCasePage(page: NotionPage): NotionCaseStudyItem {
  const props = page.properties;

  // Name: title property (필드명) → client 필드에 매핑
  const nameFromTitle = getTitle(props["필드명"]?.title);
  const nameFromClient = getRichText(props.Client?.rich_text);

  // Task / Title: 과업명
  const taskTitle =
    getRichText(props.Task?.rich_text) ||
    getRichText(props.Title?.rich_text);

  // Field (분야) → tags 로 매핑 (CasesFilter 의 2차 필터에 사용)
  const fieldTags = getMultiSelect(props.Field?.multi_select);
  const regularTags = getMultiSelect(props.Tags?.multi_select);
  // Field 가 있으면 Field 우선, 없으면 Tags 사용
  const mergedTags = fieldTags.length > 0 ? fieldTags : regularTags;

  return {
    id: page.id,
    title: taskTitle,
    excerpt: getRichText(props.Excerpt?.rich_text),
    thumbnail: getFileThumbnail(props.Thumbnail?.files),
    client: nameFromTitle || nameFromClient,
    slug: getRichText(props.Slug?.rich_text) || page.id,
    category: getSelect(props.ContentType?.select),
    languages: getRichText(props.Languages?.rich_text),
    duration: getRichText(props.Duration?.rich_text),
    results: getRichText(props.Results?.rich_text),
    pinned: getCheckbox(props.Pinned?.checkbox),
    tags: mergedTags,
    publishedAt: page.created_time?.slice(0, 10) ?? "",
  };
}

const publishedFilter = {
  property: "Published",
  checkbox: { equals: true },
};

const homeExposureFilter = {
  and: [
    publishedFilter,
    { property: "홈메뉴 노출", checkbox: { equals: true } },
  ],
};

/** News DB — Date 속성 있음 */
const newsSorts = [
  { property: "Pinned", direction: "descending" as const },
  { property: "Date", direction: "descending" as const },
];

/** Case Study DB — Date 속성 없음, created_time 타임스탬프로 대체 */
const caseSorts = [
  { property: "Pinned", direction: "descending" as const },
  { timestamp: "created_time", direction: "descending" as const },
];

/* ══════════════════════════════════════════════════════
 * Public API — 홈 페이지 프리뷰
 * ══════════════════════════════════════════════════════ */

/**
 * 홈 페이지용 소식 프리뷰.
 * "홈메뉴 노출"이 체크된 항목만 가져옴.
 * 체크된 항목이 없으면 최신 Published 항목으로 폴백.
 */
export async function fetchHomeNewsPreview(
  limit = 3,
): Promise<NotionNewsItem[]> {
  if (!NEWS_DB_ID) return [];
  try {
    // 1) "홈메뉴 노출" checked items
    const response = await queryDatabase(NEWS_DB_ID, {
      filter: homeExposureFilter,
      sorts: newsSorts,
      page_size: limit,
    });

    const pages = (response.results ?? []) as NotionPage[];

    if (pages.length > 0) {
      return pages.map(mapNewsPage);
    }

    // 2) Fallback: latest published items
    const fallback = await queryDatabase(NEWS_DB_ID, {
      filter: publishedFilter,
      sorts: newsSorts,
      page_size: limit,
    });

    return ((fallback.results ?? []) as NotionPage[]).map(mapNewsPage);
  } catch (error) {
    console.error("Failed to fetch home news preview:", error);
    return [];
  }
}

/**
 * 홈 페이지용 진행 사례 프리뷰.
 * "홈메뉴 노출"이 체크된 항목만 가져옴.
 * 체크된 항목이 없으면 최신 Published 항목으로 폴백.
 */
export async function fetchHomeCaseStudyPreview(
  limit = 3,
): Promise<NotionCaseStudyItem[]> {
  if (!CASESTUDY_DB_ID) return [];
  try {
    // 1) "홈메뉴 노출" checked items
    const response = await queryDatabase(CASESTUDY_DB_ID, {
      filter: homeExposureFilter,
      sorts: caseSorts,
      page_size: limit,
    });

    const pages = (response.results ?? []) as NotionPage[];

    if (pages.length > 0) {
      return pages.map(mapCasePage);
    }

    // 2) Fallback: latest published items
    const fallback = await queryDatabase(CASESTUDY_DB_ID, {
      filter: publishedFilter,
      sorts: caseSorts,
      page_size: limit,
    });

    return ((fallback.results ?? []) as NotionPage[]).map(mapCasePage);
  } catch (error) {
    console.error("Failed to fetch home case study preview:", error);
    return [];
  }
}

/* ══════════════════════════════════════════════════════
 * Public API — Cases 전체 목록 (CMS 가이드 필드명 기준)
 * ══════════════════════════════════════════════════════ */

/**
 * 진행 사례 전체 목록 — CMS 가이드 필드명 기준 매핑.
 *
 * client.ts 의 fetchAllCaseStudies() 는 옛 필드명을 사용하므로
 * /cases 페이지에서는 이 함수를 사용해야 ContentType→category,
 * Field→tags 매핑이 올바르게 동작.
 */
export async function fetchAllCaseStudiesCorrected(): Promise<
  NotionCaseStudyItem[]
> {
  if (!CASESTUDY_DB_ID) return [];
  try {
    const response = await queryDatabase(CASESTUDY_DB_ID, {
      filter: publishedFilter,
      sorts: caseSorts,
      page_size: 100,
    });
    return ((response.results ?? []) as NotionPage[]).map(mapCasePage);
  } catch (error) {
    console.error("Failed to fetch all case studies (corrected):", error);
    return [];
  }
}

/* ══════════════════════════════════════════════════════
 * 팝업 — News DB (PopUp=true) + 별도 Popup DB 통합
 * ══════════════════════════════════════════════════════ */

export type NotionPopupItem = {
  id: string;
  title: string;
  image: string | null;
  link: string;
  source: "news" | "popup";
};

/**
 * 팝업 아이템 fetch.
 * 1) Popup DB: Published=true, 오늘이 StartDate~EndDate 범위
 * 2) News DB:  Published=true AND PopUp=true
 * Popup DB 우선, News DB 후순.
 */
export async function fetchPopupItems(): Promise<NotionPopupItem[]> {
  const items: NotionPopupItem[] = [];
  const today = new Date().toISOString().slice(0, 10);

  // 1) Popup DB
  if (POPUP_DB_ID) {
    try {
      const response = await queryDatabase(POPUP_DB_ID, {
        filter: {
          and: [
            { property: "Published", checkbox: { equals: true } },
            {
              or: [
                { property: "StartDate", date: { is_empty: true } },
                { property: "StartDate", date: { on_or_before: today } },
              ],
            },
            {
              or: [
                { property: "EndDate", date: { is_empty: true } },
                { property: "EndDate", date: { on_or_after: today } },
              ],
            },
          ],
        },
        page_size: 10,
      });

      for (const page of (response.results ?? []) as NotionPage[]) {
        const props = page.properties;
        items.push({
          id: page.id,
          title: getTitle(props["이름"]?.title),
          image: getFileThumbnail(props.Image?.files),
          link: (props.Link?.url as string) ?? "",
          source: "popup",
        });
      }
    } catch (error) {
      console.error("Failed to fetch popup DB:", error);
    }
  }

  // 2) News DB — PopUp=true
  if (NEWS_DB_ID) {
    try {
      const response = await queryDatabase(NEWS_DB_ID, {
        filter: {
          and: [
            publishedFilter,
            { property: "PopUp", checkbox: { equals: true } },
          ],
        },
        sorts: newsSorts,
        page_size: 5,
      });

      for (const page of (response.results ?? []) as NotionPage[]) {
        const props = page.properties;
        const slug = getRichText(props.Slug?.rich_text) || page.id;
        items.push({
          id: page.id,
          title: getRichText(props.Title?.rich_text),
          image: getFileThumbnail(props.Thumbnail?.files),
          link: `/news/${slug}`,
          source: "news",
        });
      }
    } catch (error) {
      console.error("Failed to fetch news popups:", error);
    }
  }

  return items;
}
