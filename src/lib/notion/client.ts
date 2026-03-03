import type { NotionNewsItem, NotionCaseStudyItem } from "@/types/notion";

const NOTION_API_BASE = "https://api.notion.com/v1";
const NOTION_VERSION = "2022-06-28";
const REVALIDATE_SECONDS = 0;

const NEWS_DB_ID = process.env.NOTION_NEWS_DB_ID ?? "";
const CASESTUDY_DB_ID = process.env.NOTION_CASESTUDY_DB_ID ?? "";

function getToken(): string {
  const token = process.env.NOTION_API_KEY?.trim();
  if (!token) throw new Error("NOTION_API_KEY is not configured");
  return token;
}

async function queryDatabase(databaseId: string, body: Record<string, unknown>) {
  const res = await fetch(`${NOTION_API_BASE}/databases/${databaseId}/query`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    next: { revalidate: REVALIDATE_SECONDS },
  });

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
  properties: Record<string, NotionProperty>;
};

/** Published=true 필터 */
const publishedFilter = {
  property: "Published",
  checkbox: { equals: true },
};

/** Pinned 우선 + Date 최신순 정렬 */
const defaultSorts = [
  { property: "Pinned", direction: "descending" as const },
  { property: "Date", direction: "descending" as const },
];

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

function mapCasePage(page: NotionPage): NotionCaseStudyItem {
  const props = page.properties;
  return {
    id: page.id,
    title: getRichText(props.Title?.rich_text),
    excerpt: getRichText(props.Excerpt?.rich_text),
    thumbnail: getFileThumbnail(props.Thumbnail?.files),
    client: getRichText(props.Client?.rich_text),
    slug: getRichText(props.Slug?.rich_text) || page.id,
    category: getSelect(props.Category?.select),
    languages: getRichText(props.Languages?.rich_text),
    duration: getRichText(props.Duration?.rich_text),
    results: getRichText(props.Results?.rich_text),
    pinned: getCheckbox(props.Pinned?.checkbox),
    tags: getMultiSelect(props.Tags?.multi_select),
    publishedAt: getDate(props.Date?.date),
  };
}

/** Fetch latest N news items (for homepage preview) */
export async function fetchNewsPreview(limit = 4): Promise<NotionNewsItem[]> {
  if (!NEWS_DB_ID) return [];
  try {
    const response = await queryDatabase(NEWS_DB_ID, {
      filter: publishedFilter,
      sorts: defaultSorts,
      page_size: limit,
    });
    return ((response.results ?? []) as NotionPage[]).map(mapNewsPage);
  } catch (error) {
    console.error("Failed to fetch news:", error);
    return [];
  }
}

/** Fetch all news items (for /news page) */
export async function fetchAllNews(): Promise<NotionNewsItem[]> {
  if (!NEWS_DB_ID) return [];
  try {
    const response = await queryDatabase(NEWS_DB_ID, {
      filter: publishedFilter,
      sorts: defaultSorts,
      page_size: 100,
    });
    return ((response.results ?? []) as NotionPage[]).map(mapNewsPage);
  } catch (error) {
    console.error("Failed to fetch all news:", error);
    return [];
  }
}

/** Fetch latest N case study items (for homepage preview) */
export async function fetchCaseStudyPreview(limit = 3): Promise<NotionCaseStudyItem[]> {
  if (!CASESTUDY_DB_ID) return [];
  try {
    const response = await queryDatabase(CASESTUDY_DB_ID, {
      filter: publishedFilter,
      sorts: defaultSorts,
      page_size: limit,
    });
    return ((response.results ?? []) as NotionPage[]).map(mapCasePage);
  } catch (error) {
    console.error("Failed to fetch case studies:", error);
    return [];
  }
}

/** Fetch all case studies (for /cases page) */
export async function fetchAllCaseStudies(): Promise<NotionCaseStudyItem[]> {
  if (!CASESTUDY_DB_ID) return [];
  try {
    const response = await queryDatabase(CASESTUDY_DB_ID, {
      filter: publishedFilter,
      sorts: defaultSorts,
      page_size: 100,
    });
    return ((response.results ?? []) as NotionPage[]).map(mapCasePage);
  } catch (error) {
    console.error("Failed to fetch all case studies:", error);
    return [];
  }
}

/** Fetch a single news item by slug */
export async function fetchNewsBySlug(slug: string): Promise<NotionNewsItem | null> {
  if (!NEWS_DB_ID) return null;
  try {
    const response = await queryDatabase(NEWS_DB_ID, {
      filter: {
        and: [
          publishedFilter,
          { property: "Slug", rich_text: { equals: slug } },
        ],
      },
      page_size: 1,
    });
    const pages = (response.results ?? []) as NotionPage[];
    if (pages.length === 0) return null;
    return mapNewsPage(pages[0]);
  } catch (error) {
    console.error("Failed to fetch news by slug:", error);
    return null;
  }
}

/** Notion block types */
export type NotionBlock = {
  id: string;
  type: string;
  has_children: boolean;
  [key: string]: unknown;
};

/** Fetch page blocks (content) */
export async function fetchPageBlocks(pageId: string): Promise<NotionBlock[]> {
  try {
    const res = await fetch(`${NOTION_API_BASE}/blocks/${pageId}/children?page_size=100`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Notion-Version": NOTION_VERSION,
      },
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.results ?? []) as NotionBlock[];
  } catch (error) {
    console.error("Failed to fetch page blocks:", error);
    return [];
  }
}
