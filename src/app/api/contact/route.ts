import { NextRequest, NextResponse } from "next/server";
import { createContactLead } from "@/lib/notion/contactLead";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      organization,
      contactName,
      email,
      phone,
      field,
      workType,
      message,
      privacyConsent,
    } = body;

    if (!organization || !contactName || !email || !phone) {
      return NextResponse.json(
        { error: "필수 항목을 모두 입력해 주세요." },
        { status: 400 },
      );
    }

    if (!privacyConsent) {
      return NextResponse.json(
        { error: "개인정보 수집 및 이용에 동의해 주세요." },
        { status: 400 },
      );
    }

    await createContactLead({
      organization,
      contactName,
      email,
      phone,
      field: field || "",
      workType: workType || "",
      message: message || "",
      privacyConsent: true,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "요청 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요." },
      { status: 500 },
    );
  }
}
