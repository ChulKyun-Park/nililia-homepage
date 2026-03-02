import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import { Target, Eye, Heart, Users, Award, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "회사소개 | Nililia",
  description:
    "Nililia는 AI 기술과 전문가의 노하우를 결합하여 최상의 번역 및 현지화 서비스를 제공합니다.",
  openGraph: {
    title: "회사소개 | Nililia",
    description:
      "Nililia는 AI 기술과 전문가의 노하우를 결합하여 최상의 번역 및 현지화 서비스를 제공합니다.",
  },
};

const values = [
  {
    icon: Target,
    title: "정확성",
    description: "AI와 전문가의 이중 검증으로 오역 제로에 도전합니다.",
  },
  {
    icon: Eye,
    title: "투명성",
    description: "프로젝트 진행 상황을 실시간으로 공유하고, 명확한 가격 정책을 운영합니다.",
  },
  {
    icon: Heart,
    title: "고객 중심",
    description: "고객의 비즈니스 목표를 이해하고, 최적의 현지화 전략을 제안합니다.",
  },
];

const history = [
  { year: "2018", event: "Nililia 설립, 영상 번역 서비스 시작" },
  { year: "2019", event: "문서 번역 및 웹 · 앱 현지화 서비스 론칭" },
  { year: "2020", event: "게임 현지화 전문팀 구성, 50+ 언어 지원 시작" },
  { year: "2021", event: "AI 번역 엔진 자체 개발 착수" },
  { year: "2022", event: "AI 하이브리드 번역 시스템 출시, 글로벌 파트너 100+ 달성" },
  { year: "2023", event: "웹소설 · 웹툰 번역 서비스 시작, 파트너 300+ 돌파" },
  { year: "2024", event: "SDH · 배리어프리 자막 서비스 론칭, 글로벌 파트너 500+ 달성" },
];

const teamStats = [
  { icon: Users, value: "300+", label: "전문 번역가" },
  { icon: TrendingUp, value: "50+", label: "기업 고객" },
  { icon: Award, value: "150M+", label: "번역 단어" },
  { icon: Target, value: "10+", label: "지원 언어" },
];

export default function AboutPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="bg-surface flex items-center min-h-[420px] py-4 lg:py-6">
        <div className="mx-auto max-w-7xl px-6 lg:pl-12">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
            About Us
          </p>
          <h1 className="text-4xl font-bold leading-tight text-foreground sm:text-5xl break-keep">
            언어의 장벽을 넘어,
            <br />
            세계와 연결하는 기업
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted break-keep">
            Nililia는 AI 기술과 전문가의 노하우를 결합하여 최상의 번역 및 현지화 서비스를 제공합니다.
            2018년 설립 이후, 500개 이상의 기업과 함께 글로벌 시장 진출을 성공적으로 지원해 왔습니다.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-gradient-to-r from-primary to-primary-dark py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/70">
            Our Mission
          </p>
          <h2 className="text-3xl font-bold leading-snug text-white sm:text-4xl break-keep">
            모든 콘텐츠가 언어의 경계를 넘어
            <br className="hidden sm:block" />
            전 세계에 전달되는 세상을 만듭니다
          </h2>
          <p className="mt-6 text-lg text-white/80 break-keep">
            기술과 전문성의 조화로 완벽한 현지화 경험을 제공합니다.
          </p>
        </div>
      </section>

      {/* Core Values */}
      <Section>
        <SectionHeader
          label="Core Values"
          title="우리가 소중히 여기는 가치"
        />
        <div className="grid gap-8 sm:grid-cols-3">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <div key={value.title} className="text-center">
                <div className="mx-auto mb-4 inline-flex rounded-2xl bg-primary-light p-4">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-foreground">
                  {value.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted break-keep">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Team Stats */}
      <Section className="bg-surface">
        <SectionHeader
          label="Our Team"
          title="글로벌 전문가 네트워크"
          description="전 세계 50개 이상의 언어를 지원하는 전문 번역가 네트워크를 보유하고 있습니다."
        />
        <div className="grid gap-8 sm:grid-cols-4">
          {teamStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="rounded-2xl border border-border bg-white p-8 text-center">
                <Icon className="mx-auto mb-4 h-10 w-10 text-primary" />
                <div className="text-4xl font-bold text-primary">{stat.value}</div>
                <div className="mt-2 text-sm text-muted">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* History */}
      <Section>
        <SectionHeader
          label="History"
          title="Nililia의 발자취"
        />
        <div className="mx-auto max-w-2xl">
          <div className="relative border-l-2 border-primary/20 pl-8">
            {history.map((item) => (
              <div key={item.year} className="relative mb-10 last:mb-0">
                <div className="absolute -left-[calc(2rem+5px)] top-1 h-3 w-3 rounded-full bg-primary" />
                <span className="text-sm font-bold text-primary">{item.year}</span>
                <p className="mt-1 text-base text-foreground break-keep">{item.event}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Bottom CTA */}
      <section className="bg-gradient-to-r from-primary to-primary-dark py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold text-white break-keep">
            함께 글로벌 시장을 개척하세요
          </h2>
          <p className="mt-4 text-lg text-white/80 break-keep">
            Nililia와 함께라면 언어의 장벽 없는 글로벌 비즈니스가 가능합니다.
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
