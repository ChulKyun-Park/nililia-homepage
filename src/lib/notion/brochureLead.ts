const NOTION_API_BASE = "https://api.notion.com/v1";
const NOTION_VERSION = "2022-06-28";

function getToken(): string {
  const token = process.env.NOTION_API_KEY?.trim();
  if (!token) throw new Error("NOTION_API_KEY is not configured");
  return token;
}

function getDbId(): string {
  const id = process.env.NOTION_BROCHURE_LEADS_DB_ID?.trim();
  if (!id) throw new Error("NOTION_BROCHURE_LEADS_DB_ID is not configured");
  return id;
}

export async function createBrochureLead(data: {
  name: string;
  email: string;
  phone: string;
  privacyConsent: boolean;
}) {
  const res = await fetch(`${NOTION_API_BASE}/pages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      parent: { database_id: getDbId() },
      properties: {
        "업체명/담당자명": {
          title: [{ text: { content: data.name } }],
        },
        "이메일": {
          email: data.email,
        },
        "연락처": {
          phone_number: data.phone,
        },
        "개인정보동의": {
          checkbox: data.privacyConsent,
        },
      },
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Notion API error (${res.status}): ${text}`);
  }

  return res.json();
}
