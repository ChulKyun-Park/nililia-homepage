import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import { Heart, Award, TrendingUp, Users, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "회사소개 | Nililia",
  description:
    "닐리리아는 2016년 설립 이래 콘텐츠 현지화만 10년. 1,300개 이상의 기업·크리에이터와 함께 K-콘텐츠를 세계로 전달해 온 현지화 전문 기업입니다.",
  openGraph: {
    title: "회사소개 | Nililia",
    description:
      "닐리리아는 2016년 설립 이래 콘텐츠 현지화만 10년. 1,300개 이상의 기업·크리에이터와 함께 K-콘텐츠를 세계로 전달해 온 현지화 전문 기업입니다.",
  },
};

const values = [
  {
    icon: Heart,
    title: "고객 중심",
    description: "재구매율 88%, 고객 만족도 91%. 모든 결정의 중심에 고객을 둡니다.",
  },
  {
    icon: Award,
    title: "품질 책임제",
    description: "언어별 인하우스 품질 책임자가 번역·감수·최종 검수 3단계를 직접 통제합니다.",
  },
  {
    icon: TrendingUp,
    title: "지속적 혁신",
    description: "1,300만+ 문장 쌍 데이터를 축적하며, 번역 품질의 기준을 끊임없이 높여갑니다.",
  },
  {
    icon: Users,
    title: "협업 구조",
    description: "인하우스 10명 + 프리랜서 350명. 검증된 인력풀로 대량 물량에도 품질을 유지합니다.",
  },
  {
    icon: Globe,
    title: "글로벌 네트워크",
    description: "10개 이상 언어, 각 언어권 현지 전문가와 함께합니다.",
  },
];

const history = [
  { year: "2016", event: "(주)닐리리아 설립.\n챗봇 플랫폼 특허 등록." },
  { year: "2019", event: "유튜브 다국어 자막 플랫폼 '컨텐츠플라이' 출시.\n6개월 만에 매출 1억 원 달성." },
  { year: "2020", event: "누적 작업 콘텐츠 3,000편 달성.\nSDH · 배리어프리 자막 서비스 출시." },
  { year: "2021", event: "벤처기업 인증. 교육 분야 20억 계약 수주.\n전문 분야 특화 '컨텐츠플라이S' 출시." },
  { year: "2022", event: "교육 영상 번역 선호도 국내 1위.\n연매출 20억 원, 누적 매출 35억 원 달성." },
  { year: "2023", event: "고객 브랜드 호감도 85% 이상.\n주요 고객군 점유도 80% 이상 유지." },
  { year: "2024", event: "엔터·방송·OTT 고객 확대.\n피봇 5년 누적 매출 60억 달성." },
];

const teamStats = [
  { icon: Users, value: "360+", label: "전문 번역가" },
  { icon: TrendingUp, value: "1,300+", label: "누적 고객사" },
  { icon: Award, value: "60억+", label: "누적 매출" },
  { icon: Globe, value: "10+", label: "지원 언어" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About Us"
        title={<>언어 장벽 없이<br />콘텐츠가 날아오르는 세상</>}
        description="닐리리아는 2016년 설립 이래 영상·문서·웹·게임 등 콘텐츠 현지화만 10년. 1,300개 이상의 기업·크리에이터와 함께 K-콘텐츠를 세계로 전달해 온 현지화 전문 기업입니다."
      />

      {/* Mission */}
      <section className="bg-gradient-to-r from-primary to-primary-dark py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/70">
            Our Mission
          </p>
          <h2 className="text-3xl font-bold leading-snug text-white sm:text-4xl break-keep">
            언어의 경계를 넘어
            <br className="hidden sm:block" />
            세계를 연결합니다
          </h2>
          <p className="mt-6 text-lg text-white/80 break-keep">
            닐리리아는 2016년 설립 이후, 전문 번역가와 체계적인 품질 관리 시스템을 결합하여
            고품질 현지화 서비스를 제공하여왔습니다.
            영상 자막 제작, 번역, 웹사이트·앱 현지화, 대본 번역, 웹소설 현지화, 게임 현지화 등
            다양한 분야에서 글로벌 기업들의 신뢰를 쌓아가고 있습니다.
          </p>
        </div>
      </section>

      {/* Core Values */}
      <Section>
        <SectionHeader
          label="Core Values"
          title="우리의 핵심 가치"
        />
        <div className="grid gap-8 sm:grid-cols-3">
          {values.slice(0, 3).map((value) => {
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
        <div className="mt-8 grid gap-8 sm:grid-cols-2 sm:mx-auto sm:max-w-2xl">
          {values.slice(3).map((value) => {
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
          description="10개 이상의 언어를 지원하는 360명+ 전문 번역가 네트워크를 보유하고 있습니다."
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
