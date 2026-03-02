import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import { ScanSearch, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "MTPE | Nililia",
  description: "AI 기계 번역과 전문가 감수를 결합한 MTPE 서비스로, 대규모 프로젝트도 빠르고 정확하게 처리합니다.",
};

const details = [
  "AI 엔진이 초벌 번역을 수행하고, 해당 분야 전문 번역가가 문맥과 뉘앙스를 보정합니다",
  "프로젝트별 맞춤 용어집(TB)과 번역 메모리(TM) 구축으로 일관성을 유지합니다",
  "순수 인력 번역 대비 납기를 단축하면서도 전문가 수준의 품질을 확보합니다",
  "기술 문서, 법률 자료, 마케팅 콘텐츠 등 분야별 특화 엔진을 적용합니다",
  "Light PE부터 Full PE까지, 프로젝트 목적에 맞는 교정 수준을 선택할 수 있습니다",
];

export default function Page() {
  return (
    <>
      <section className="bg-surface flex items-center min-h-[420px] py-4 lg:py-6">
        <div className="mx-auto max-w-7xl px-6 lg:pl-12">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">Services</p>
          <h1 className="text-4xl font-bold leading-tight text-foreground sm:text-5xl break-keep">MTPE</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted break-keep">
            AI 기계 번역과 전문가 감수를 결합한 MTPE 서비스로, 대규모 프로젝트도 빠르고 정확하게 처리합니다.
          </p>
        </div>
      </section>
      <Section>
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center">
          <div className="flex-1">
            <div className="mb-4 inline-flex rounded-xl bg-primary-light p-3"><ScanSearch className="h-7 w-7 text-primary" /></div>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl break-keep">서비스 상세</h2>
            <ul className="mt-6 space-y-3">
              {details.map((d) => (<li key={d} className="flex items-start gap-3"><CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" /><span className="text-sm text-foreground break-keep">{d}</span></li>))}
            </ul>
            <div className="mt-8"><Button href="/contact" variant="primary" className="px-8 py-4 text-base">무료 상담 신청</Button></div>
          </div>
          <div className="flex-1"><div className="flex aspect-[4/3] items-center justify-center rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 text-sm text-muted">MTPE 이미지</div></div>
        </div>
      </Section>
    </>
  );
}
