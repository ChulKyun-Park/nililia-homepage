import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import { BookOpen, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "웹소설 번역 | Nililia",
  description: "웹소설, 웹툰 등 한류 콘텐츠의 고품질 번역 서비스를 제공합니다.",
};

const details = [
  "웹소설 연재 번역",
  "웹툰 대사 번역 및 레터링",
  "장르별 전문 번역가 매칭",
  "대량 에피소드 일괄 처리",
  "독자 피드백 반영 품질 관리",
];

export default function Page() {
  return (
    <>
      <section className="bg-gradient-to-br from-foreground via-gray-900 to-gray-800 flex items-center min-h-[420px] py-4 lg:py-6">
        <div className="mx-auto max-w-7xl px-6 lg:pl-12">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">Services</p>
          <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl break-keep">웹소설 번역</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70 break-keep">
            웹소설, 웹툰 등 한류 콘텐츠의 고품질 번역 서비스를 제공합니다.
          </p>
        </div>
      </section>
      <Section>
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center">
          <div className="flex-1">
            <div className="mb-4 inline-flex rounded-xl bg-primary-light p-3"><BookOpen className="h-7 w-7 text-primary" /></div>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl break-keep">서비스 상세</h2>
            <ul className="mt-6 space-y-3">
              {details.map((d) => (<li key={d} className="flex items-start gap-3"><CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" /><span className="text-sm text-foreground break-keep">{d}</span></li>))}
            </ul>
            <div className="mt-8"><Button href="/contact" variant="primary" className="px-8 py-4 text-base">무료 상담 신청</Button></div>
          </div>
          <div className="flex-1"><div className="flex aspect-[4/3] items-center justify-center rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 text-sm text-muted">웹소설 번역 이미지</div></div>
        </div>
      </Section>
    </>
  );
}
