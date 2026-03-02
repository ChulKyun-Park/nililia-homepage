import PageHero from "@/components/sections/PageHero";
import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import { FileText, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "문서 번역 | Nililia",
  description: "계약서, 매뉴얼, 마케팅 자료 등 전문 문서 번역 서비스를 제공합니다.",
};

const details = [
  "법률/계약서 전문 번역",
  "기술 매뉴얼 및 사양서 번역",
  "마케팅/광고 카피 현지화",
  "학술 논문 및 보고서 번역",
  "금융/의료 전문 문서 번역",
];

export default function Page() {
  return (
    <>
      <PageHero
        label="Services"
        title="문서 번역"
        description="계약서, 매뉴얼, 마케팅 자료 등 전문 문서 번역 서비스를 제공합니다."
      />
      <Section>
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center">
          <div className="flex-1">
            <div className="mb-4 inline-flex rounded-xl bg-primary-light p-3"><FileText className="h-7 w-7 text-primary" /></div>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl break-keep">서비스 상세</h2>
            <ul className="mt-6 space-y-3">
              {details.map((d) => (<li key={d} className="flex items-start gap-3"><CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" /><span className="text-sm text-foreground break-keep">{d}</span></li>))}
            </ul>
          </div>
          <div className="flex-1"><div className="flex aspect-[4/3] items-center justify-center rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 text-sm text-muted">문서 번역 이미지</div></div>
        </div>
      </Section>
    </>
  );
}
