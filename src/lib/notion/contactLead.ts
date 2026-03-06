const NOTION_API_BASE = "https://api.notion.com/v1";
const NOTION_VERSION = "2022-06-28";

function getToken(): string {
  const token = process.env.NOTION_API_KEY?.trim();
  if (!token) throw new Error("NOTION_API_KEY is not configured");
  return token;
}

function getDbId(): string {
  const id = process.env.NOTION_CONTACT_DB_ID?.trim();
  if (!id) throw new Error("NOTION_CONTACT_DB_ID is not configured");
  return id;
}

export interface ContactLeadData {
  organization: string;
  contactName: string;
  email: string;
  phone: string;
  field: string;
  workType: string;
  message: string;
  privacyConsent: boolean;
}

export async function createContactLead(data: ContactLeadData) {
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
        "소속기관명": {
          title: [{ text: { content: data.organization } }],
        },
        "담당자명": {
          rich_text: [{ text: { content: data.contactName } }],
        },
        "담당자 메일주소": {
          email: data.email,
        },
        "담당자 연락처": {
          phone_number: data.phone,
        },
        "로컬리제이션 분야": {
          select: data.field ? { name: data.field } : null,
        },
        "정기 작업 유무": {
          select: data.workType ? { name: data.workType } : null,
        },
        "상담 내용": {
          rich_text: [{ text: { content: data.message } }],
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
