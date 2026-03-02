import PageHero from "@/components/sections/PageHero";
import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import { Gamepad2, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "게임 현지화 | Nililia",
  description: "게임 UI, 스토리, 마케팅 자료까지 완벽한 게임 현지화를 지원합니다.",
};

const details = [
  "게임 내 텍스트 및 UI 번역",
  "스토리/대화 현지화",
  "인게임 이미지 및 에셋 현지화",
  "게임 마케팅 콘텐츠 번역",
  "QA 테스트 및 LQA 지원",
];

export default function Page() {
  return (
    <>
      <PageHero
        label="Services"
        title="게임 현지화"
        description="게임 UI, 스토리, 마케팅 자료까지 완벽한 게임 현지화를 지원합니다."
      />
      <Section>
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center">
          <div className="flex-1">
            <div className="mb-4 inline-flex rounded-xl bg-primary-light p-3"><Gamepad2 className="h-7 w-7 text-primary" /></div>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl break-keep">서비스 상세</h2>
            <ul className="mt-6 space-y-3">
              {details.map((d) => (<li key={d} className="flex items-start gap-3"><CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" /><span className="text-sm text-foreground break-keep">{d}</span></li>))}
            </ul>
          </div>
          <div className="flex-1"><div className="flex aspect-[4/3] items-center justify-center rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 text-sm text-muted">게임 현지화 이미지</div></div>
        </div>
      </Section>
    </>
  );
}
