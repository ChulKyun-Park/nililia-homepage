import type { Metadata } from "next";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import {
  Briefcase,
  Globe,
  Lightbulb,
  Heart,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "채용 | Nililia",
  description:
    "Nililia와 함께 언어의 장벽을 넘어 세계를 연결할 인재를 찾습니다. 채용 정보를 확인하세요.",
  openGraph: {
    title: "채용 | Nililia",
    description:
      "Nililia와 함께 언어의 장벽을 넘어 세계를 연결할 인재를 찾습니다.",
  },
};

const benefits = [
  {
    icon: Globe,
    title: "글로벌 환경",
    description:
      "전 세계 50개 이상의 언어를 다루며, 다양한 문화와 소통하는 경험을 쌓을 수 있습니다.",
  },
  {
    icon: Lightbulb,
    title: "성장 기회",
    description:
      "AI 기술과 번역 전문성을 함께 배우며, 업계 최전선에서 커리어를 발전시킬 수 있습니다.",
  },
  {
    icon: Heart,
    title: "유연한 근무",
    description:
      "자율 출퇴근, 원격 근무 등 유연한 근무 환경을 제공합니다.",
  },
  {
    icon: Briefcase,
    title: "경쟁력 있는 보상",
    description:
      "업계 최고 수준의 급여와 복지 혜택을 제공합니다.",
  },
];

export default function CareerPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white flex items-center min-h-[420px] py-4 lg:py-6">
        <div className="mx-auto max-w-7xl px-6 lg:pl-12">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left: Text */}
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
                Careers
              </p>
              <h1 className="text-4xl font-bold leading-tight text-foreground sm:text-5xl break-keep">
                함께 세계를 연결할
                <br />
                인재를 찾습니다
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted break-keep">
                Nililia는 언어와 기술의 힘으로 콘텐츠의 글로벌 진출을 돕는
                전문 기업입니다.
              </p>
              <p className="mt-2 max-w-lg text-lg leading-relaxed text-muted break-keep">
                열정 있는 동료와 함께 성장할 기회를 만나보세요.
              </p>
              <div className="mt-8">
                <Button
                  href="https://nililia.ninehire.site"
                  variant="primary"
                  className="px-8 py-4 text-base"
                >
                  입사 지원하기
                </Button>
              </div>
            </div>

            {/* Right: Image placeholder */}
            <div className="hidden lg:block">
              <div className="flex aspect-[4/3] items-center justify-center rounded-2xl border border-border bg-surface">
                <span className="text-sm text-muted">[팀 사진]</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-surface py-24">
        <div className="mx-auto max-w-7xl px-6 lg:pl-12">
          <SectionHeader
            label="Why Nililia"
            title="Nililia에서 일하는 이유"
            description="글로벌 현지화 시장의 최전선에서 함께 성장하세요."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <Card key={benefit.title} className="text-center">
                  <div className="mx-auto mb-4 inline-flex rounded-xl bg-primary/10 p-3">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground">{benefit.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted break-keep">
                    {benefit.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Positions — 2단 카드 */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:pl-12">
          <SectionHeader
            label="Open Positions"
            title="채용 중인 포지션"
          />

          <div className="grid gap-6 sm:grid-cols-2">
            {/* 정규직 채용 */}
            <a
              href="https://nililia.ninehire.site"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-2xl bg-primary p-8 sm:p-10 min-h-[280px] flex flex-col justify-between transition-transform hover:-translate-y-1"
            >
              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-white">정규직 채용</h2>
                <p className="mt-4 text-base leading-relaxed text-white/80 break-keep">
                  닐리리아의<br />
                  콘텐츠 현지화를 함께 이끌어갈<br />
                  동료를 찾고 있습니다.
                </p>
              </div>
              <div className="relative z-10 mt-6">
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-white group-hover:gap-2 transition-all">
                  지금 지원하세요 <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </a>

            {/* 프리랜서 채용 */}
            <a
              href="https://nililia.ninehire.site"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-2xl bg-amber-600 p-8 sm:p-10 min-h-[280px] flex flex-col justify-between transition-transform hover:-translate-y-1"
            >
              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-white">콘텐츠 현지화 프리랜서 채용</h2>
                <p className="mt-4 text-base leading-relaxed text-white/80 break-keep">
                  전문 역량을 활용해<br />
                  콘텐츠 세계화에 참여하고<br />
                  수익을 만들어보세요.
                </p>
              </div>
              <div className="relative z-10 mt-6">
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-white group-hover:gap-2 transition-all">
                  지금 지원하세요 <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-gradient-to-r from-primary to-primary-dark py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold text-white break-keep">
            궁금한 점이 있으신가요?
          </h2>
          <p className="mt-4 text-lg text-white/80 break-keep">
            채용 관련 문의는 언제든지 환영합니다.
          </p>
          <div className="mt-8">
            <Button
              href="/contact"
              className="bg-white px-8 py-4 text-base font-bold text-primary hover:bg-white/90"
            >
              문의하기
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
