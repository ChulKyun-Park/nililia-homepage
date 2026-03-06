import { NextRequest, NextResponse } from "next/server";
import { createBrochureLead } from "@/lib/notion/brochureLead";

const BROCHURE_URL = "/files/닐리리아_회사소개서.pdf";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, countryCode, phone, privacyConsent } = body;

    if (!name || !email || !phone) {
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

    const fullPhone = `${countryCode || "+82"} ${phone}`;

    await createBrochureLead({
      name,
      email,
      phone: fullPhone,
      privacyConsent: true,
    });

    return NextResponse.json({ downloadUrl: BROCHURE_URL });
  } catch (error) {
    console.error("Brochure API error:", error);
    return NextResponse.json(
      { error: "요청 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요." },
      { status: 500 },
    );
  }
}
