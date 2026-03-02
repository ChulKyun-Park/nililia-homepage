import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import { Globe, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "웹 · 앱 현지화 | Nililia",
  description: "웹사이트와 모바일 앱의 현지화로 글로벌 사용자 경험을 최적화합니다.",
};

const details = [
  "UI/UX 텍스트 현지화",
  "다국어 SEO 최적화",
  "CMS 연동 자동 번역",
  "A/B 테스트용 다국어 콘텐츠",
  "RTL 언어 레이아웃 지원",
];

export default function Page() {
  return (
    <>
      <section className="bg-surface flex items-center min-h-[420px] py-4 lg:py-6">
        <div className="mx-auto max-w-7xl px-6 lg:pl-12">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">Services</p>
          <h1 className="text-4xl font-bold leading-tight text-foreground sm:text-5xl break-keep">웹 · 앱 현지화</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted break-keep">
            웹사이트와 모바일 앱의 현지화로 글로벌 사용자 경험을 최적화합니다.
          </p>
        </div>
      </section>
      <Section>
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center">
          <div className="flex-1">
            <div className="mb-4 inline-flex rounded-xl bg-primary-light p-3"><Globe className="h-7 w-7 text-primary" /></div>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl break-keep">서비스 상세</h2>
            <ul className="mt-6 space-y-3">
              {details.map((d) => (<li key={d} className="flex items-start gap-3"><CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" /><span className="text-sm text-foreground break-keep">{d}</span></li>))}
            </ul>
            <div className="mt-8"><Button href="/contact" variant="primary" className="px-8 py-4 text-base">무료 상담 신청</Button></div>
          </div>
          <div className="flex-1"><div className="flex aspect-[4/3] items-center justify-center rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 text-sm text-muted">웹 · 앱 현지화 이미지</div></div>
        </div>
      </Section>
    </>
  );
}
