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
  { year: "2016", event: "(주)닐리리아 설립\n챗봇 플랫폼 특허 등록" },
  { year: "2019", event: "유튜브 다국어 자막 플랫폼 '컨텐츠플라이' 출시\n6개월 만에 매출 1억 원 달성" },
  { year: "2020", event: "누적 작업 콘텐츠 3,000편 달성\nSDH · 배리어프리 자막 서비스 출시" },
  { year: "2021", event: "벤처기업 인증 / 교육 분야 20억 계약 수주\n전문 분야 특화 '컨텐츠플라이S' 출시" },
  { year: "2022", event: "교육 영상 번역 선호도 국내 1위\n연매출 20억 원 / 누적 매출 35억 원 달성" },
  { year: "2023", event: "고객 브랜드 호감도 85% 이상\n주요 고객군 점유도 80% 이상 유지" },
  { year: "2024", event: "엔터·방송·OTT 고객 확대\n피봇 5년 누적 매출 60억 달성" },
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
      {/* Hero */}
      <section className="bg-hero-bg py-8 lg:py-10 min-h-[200px] flex items-center">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h1 className="text-2xl font-bold leading-tight text-foreground sm:text-3xl break-keep">
            닐리리아는 글로벌 콘텐츠 현지화를 선도하는<br />번역 및 현지화 전문 기업입니다.
          </h1>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:pl-12">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left: Text */}
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
                Our Mission
              </p>
              <h2 className="text-3xl font-bold leading-snug text-foreground sm:text-4xl break-keep">
                언어의 경계를 넘어 세계를 연결합니다
              </h2>
              <p className="mt-6 text-[length:var(--font-size-body)] leading-relaxed text-muted break-keep">
                2016년 설립 이래 영상·문서·웹·게임 등 콘텐츠 현지화만 10년
                <br />
                1,300개 이상의 기업·크리에이터와 함께 K-콘텐츠를 세계로 전달합니다.
              </p>
              <p className="mt-4 text-[length:var(--font-size-body)] leading-relaxed text-muted break-keep">
                영상 자막 제작 및 번역, 웹사이트·앱 현지화, 대본 번역,
                <br />
                홈페이지·앱 현지화, 웹소설 현지화, 게임 현지화, 다국어 번역 등
                <br />
                다양한 분야에서 글로벌 기업들의 신뢰를 쌓아가고 있습니다.
              </p>
            </div>

            {/* Right: Image */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="w-[90%] aspect-[4/3] rounded-2xl overflow-hidden">
                <img src="/images/about.png" alt="닐리리아 팀" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
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
                <p className="text-[length:var(--font-size-card-desc)] leading-relaxed text-muted break-keep">
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
                <div className="mt-2 text-[length:var(--font-size-body)] text-muted">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* History */}
      <Section>
        <SectionHeader
          label="History"
          title="닐리리아가 걸어온 길"
        />
        <div className="mx-auto max-w-2xl">
          <div className="relative border-l-2 border-primary/20 pl-8">
            {history.map((item) => (
              <div key={item.year} className="relative mb-10 last:mb-0">
                <div className="absolute -left-[calc(2rem+5px)] top-1 h-3 w-3 rounded-full bg-primary" />
                <span className="text-sm font-bold text-primary">{item.year}</span>
                <p className="mt-1 text-[length:var(--font-size-body)] text-foreground break-keep whitespace-pre-line">{item.event}</p>
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
