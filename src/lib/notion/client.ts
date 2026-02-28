import type { NotionNewsItem, NotionCaseStudyItem } from "@/types/notion";

const NOTION_API_BASE = "https://api.notion.com/v1";
const NOTION_VERSION = "2022-06-28";
const REVALIDATE_SECONDS = 3600;

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

function getUrl(prop: unknown): string | null {
  if (typeof prop === "string") return prop;
  return null;
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
};

type NotionPage = {
  id: string;
  properties: Record<string, NotionProperty>;
};

export async function fetchNewsList(): Promise<NotionNewsItem[]> {
  if (!NEWS_DB_ID) return [];

  try {
    const response = await queryDatabase(NEWS_DB_ID, {
      sorts: [{ property: "PublishedAt", direction: "descending" }],
      page_size: 4,
    });

    return ((response.results ?? []) as NotionPage[]).map((page) => {
      const props = page.properties;
      return {
        id: page.id,
        title: getTitle(props.Title?.title ?? props.Name?.title),
        description: getRichText(props.Description?.rich_text ?? props.Summary?.rich_text),
        thumbnail: getFileThumbnail(props.Thumbnail?.files) ?? getUrl(props.Thumbnail?.url),
        publishedAt: getDate(props.PublishedAt?.date),
        slug: getRichText(props.Slug?.rich_text) || page.id,
      };
    });
  } catch (error) {
    console.error("Failed to fetch news:", error);
    return [];
  }
}

export async function fetchCaseStudyList(): Promise<NotionCaseStudyItem[]> {
  if (!CASESTUDY_DB_ID) return [];

  try {
    const response = await queryDatabase(CASESTUDY_DB_ID, {
      sorts: [{ property: "PublishedAt", direction: "descending" }],
      page_size: 4,
    });

    return ((response.results ?? []) as NotionPage[]).map((page) => {
      const props = page.properties;
      return {
        id: page.id,
        title: getTitle(props.Title?.title ?? props.Name?.title),
        description: getRichText(props.Description?.rich_text ?? props.Summary?.rich_text),
        thumbnail: getFileThumbnail(props.Thumbnail?.files) ?? getUrl(props.Thumbnail?.url),
        company: getRichText(props.Company?.rich_text) ?? props.Company?.select?.name ?? "",
        slug: getRichText(props.Slug?.rich_text) || page.id,
      };
    });
  } catch (error) {
    console.error("Failed to fetch case studies:", error);
    return [];
  }
}
