import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import { Video, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "영상 번역 | Nililia",
  description: "자막, 더빙, 보이스오버 등 모든 영상 콘텐츠의 다국어 번역 서비스를 제공합니다.",
};

const details = [
  "자막 번역 및 타이밍 싱크",
  "전문 성우를 활용한 더빙 서비스",
  "보이스오버 녹음 및 편집",
  "넷플릭스, 유튜브 등 플랫폼 포맷 지원",
  "실시간 스트리밍 자막 서비스",
];

export default function Page() {
  return (
    <>
      <section className="bg-hero-bg flex items-center min-h-[420px] py-4 lg:py-6">
        <div className="mx-auto w-full max-w-7xl px-6">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">Services</p>
          <h1 className="text-4xl font-bold leading-tight text-foreground sm:text-5xl break-keep">영상 번역</h1>
          <p className="mt-6 max-w-2xl text-[length:var(--font-size-body)] leading-relaxed text-muted break-keep">
            자막, 더빙, 보이스오버 등 모든 영상 콘텐츠의 다국어 번역 서비스를 제공합니다.
          </p>
        </div>
      </section>
      <Section>
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center">
          <div className="flex-1">
            <div className="mb-4 inline-flex rounded-xl bg-primary-light p-3"><Video className="h-7 w-7 text-primary" /></div>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl break-keep">서비스 상세</h2>
            <ul className="mt-6 space-y-3">
              {details.map((d) => (<li key={d} className="flex items-start gap-3"><CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" /><span className="text-sm text-foreground break-keep">{d}</span></li>))}
            </ul>
          </div>
          <div className="flex-1"><div className="flex aspect-[4/3] items-center justify-center rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 text-sm text-muted">영상 번역 이미지</div></div>
        </div>
      </Section>
    </>
  );
}
