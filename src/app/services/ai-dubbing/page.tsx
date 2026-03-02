import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import { Mic, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "AI 번역 · 더빙 | Nililia",
  description: "AI 음성 합성과 립싱크 기술로 영상 콘텐츠를 다국어로 자연스럽게 더빙하여 글로벌 시청자에게 전달합니다.",
};

const details = [
  "원본 화자의 음색과 톤을 보존한 AI 음성 클로닝으로 자연스러운 다국어 더빙을 제공합니다",
  "립싱크 기술을 적용하여 입 모양과 음성이 자연스럽게 일치하는 영상을 제작합니다",
  "유튜브, OTT, 교육 콘텐츠, 기업 홍보 영상 등 다양한 포맷에 대응합니다",
  "전통 더빙 대비 제작 시간과 비용을 획기적으로 절감하면서도 품질을 유지합니다",
  "전문 번역가의 스크립트 감수를 거쳐 문화적 뉘앙스와 전문 용어의 정확성을 보장합니다",
];

export default function Page() {
  return (
    <>
      <section className="bg-hero-bg flex items-center min-h-[420px] py-4 lg:py-6">
        <div className="mx-auto max-w-7xl px-6 lg:pl-12">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">Services</p>
          <h1 className="text-4xl font-bold leading-tight text-foreground sm:text-5xl break-keep">AI 번역 · 더빙</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted break-keep">
            AI 음성 합성과 립싱크 기술로 영상 콘텐츠를 다국어로 자연스럽게 더빙하여 글로벌 시청자에게 전달합니다.
          </p>
        </div>
      </section>
      <Section>
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center">
          <div className="flex-1">
            <div className="mb-4 inline-flex rounded-xl bg-primary-light p-3"><Mic className="h-7 w-7 text-primary" /></div>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl break-keep">서비스 상세</h2>
            <ul className="mt-6 space-y-3">
              {details.map((d) => (<li key={d} className="flex items-start gap-3"><CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" /><span className="text-sm text-foreground break-keep">{d}</span></li>))}
            </ul>
          </div>
          <div className="flex-1"><div className="flex aspect-[4/3] items-center justify-center rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 text-sm text-muted">AI 번역 · 더빙 이미지</div></div>
        </div>
      </Section>
    </>
  );
}
