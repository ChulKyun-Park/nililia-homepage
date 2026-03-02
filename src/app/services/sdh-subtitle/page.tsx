import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import { Subtitles, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "SDH · 배리어프리 자막 제작 | Nililia",
  description: "청각장애인을 위한 자막(SDH) 제작으로 콘텐츠 접근성을 향상시킵니다.",
};

const details = [
  "SDH(Subtitles for the Deaf and Hard of Hearing) 제작",
  "음향 효과 및 음악 설명 포함",
  "화자 식별 자막",
  "접근성 기준 준수",
  "다국어 SDH · 배리어프리 자막 제작",
];

export default function Page() {
  return (
    <>
      <section className="bg-hero-bg flex items-center min-h-[420px] py-4 lg:py-6">
        <div className="mx-auto max-w-7xl px-6 lg:pl-12">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">Services</p>
          <h1 className="text-4xl font-bold leading-tight text-foreground sm:text-5xl break-keep">SDH · 배리어프리 자막 제작</h1>
          <p className="mt-6 max-w-2xl text-[length:var(--font-size-body)] leading-relaxed text-muted break-keep">
            청각장애인을 위한 자막(SDH) 제작으로 콘텐츠 접근성을 향상시킵니다.
          </p>
        </div>
      </section>
      <Section>
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center">
          <div className="flex-1">
            <div className="mb-4 inline-flex rounded-xl bg-primary-light p-3"><Subtitles className="h-7 w-7 text-primary" /></div>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl break-keep">서비스 상세</h2>
            <ul className="mt-6 space-y-3">
              {details.map((d) => (<li key={d} className="flex items-start gap-3"><CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" /><span className="text-sm text-foreground break-keep">{d}</span></li>))}
            </ul>
          </div>
          <div className="flex-1"><div className="flex aspect-[4/3] items-center justify-center rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 text-sm text-muted">SDH · 배리어프리 자막 제작 이미지</div></div>
        </div>
      </Section>
    </>
  );
}
