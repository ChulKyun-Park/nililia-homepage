import type { Metadata } from "next";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import {
  Briefcase,
  Globe,
  Lightbulb,
  Heart,
  MapPin,
  Clock,
  Users,
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

interface Position {
  title: string;
  team: string;
  location: string;
  type: string;
}

const fullTimePositions: Position[] = [
  {
    title: "프로젝트 매니저 (PM)",
    team: "프로젝트 관리팀",
    location: "서울 (하이브리드)",
    type: "정규직",
  },
  {
    title: "AI 번역 엔지니어",
    team: "기술팀",
    location: "서울 (하이브리드)",
    type: "정규직",
  },
  {
    title: "QA 리뷰어 (한/영)",
    team: "품질관리팀",
    location: "서울 (하이브리드)",
    type: "정규직",
  },
];

const freelancePositions: Position[] = [
  {
    title: "영상 번역가 (한→영)",
    team: "번역팀",
    location: "원격 근무",
    type: "프리랜서",
  },
  {
    title: "게임 현지화 번역가 (한→일)",
    team: "게임팀",
    location: "원격 근무",
    type: "프리랜서",
  },
  {
    title: "문서 번역가 (한→중)",
    team: "번역팀",
    location: "원격 근무",
    type: "프리랜서",
  },
];

function PositionCard({ position }: { position: Position }) {
  return (
    <Card
      variant="dark"
      className="group cursor-pointer transition-all hover:-translate-y-0.5"
    >
      <h4 className="text-base font-bold text-white group-hover:text-primary transition-colors">
        {position.title}
      </h4>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-dark-muted">
        <span className="flex items-center gap-1">
          <Users className="h-3.5 w-3.5" />
          {position.team}
        </span>
        <span className="flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5" />
          {position.location}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" />
          {position.type}
        </span>
      </div>
    </Card>
  );
}

export default function CareerPage() {
  return (
    <>
      {/* Hero — 2-column: text + image placeholder */}
      <section className="bg-dark-bg py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left: Text */}
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
                Careers
              </p>
              <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl break-keep">
                함께 세계를 연결할
                <br />
                인재를 찾습니다
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/60 break-keep">
                Nililia는 언어와 기술의 힘으로 콘텐츠의 글로벌 진출을 돕는
                전문 기업입니다.
              </p>
              <p className="mt-2 max-w-lg text-lg leading-relaxed text-white/60 break-keep">
                열정 있는 동료와 함께 성장할 기회를 만나보세요.
              </p>
              <div className="mt-8">
                <Button
                  href="mailto:hello@nililia.com?subject=입사 지원"
                  variant="primary"
                  className="px-8 py-4 text-base"
                >
                  입사 지원하기
                </Button>
              </div>
            </div>

            {/* Right: Image placeholder */}
            <div className="hidden lg:block">
              <div className="flex aspect-[4/3] items-center justify-center rounded-2xl border border-dark-border bg-dark-card">
                <span className="text-sm text-dark-muted">[팀 사진]</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-dark-surface py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader
            label="Why Nililia"
            title="Nililia에서 일하는 이유"
            description="글로벌 현지화 시장의 최전선에서 함께 성장하세요."
            variant="dark"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <Card key={benefit.title} variant="dark" className="text-center">
                  <div className="mx-auto mb-4 inline-flex rounded-xl bg-primary/10 p-3">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-white">{benefit.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-dark-muted break-keep">
                    {benefit.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Positions — 2-column: 정규직 + 프리랜서 */}
      <section className="bg-dark-bg py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader
            label="Open Positions"
            title="채용 중인 포지션"
            description="현재 모집 중인 정규직 및 프리랜서 포지션을 확인하세요."
            variant="dark"
          />

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
            {/* 정규직 */}
            <div>
              <h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-white">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-xs font-bold text-primary">
                  F
                </span>
                정규직
              </h3>
              <div className="space-y-4">
                {fullTimePositions.map((pos) => (
                  <PositionCard key={pos.title} position={pos} />
                ))}
              </div>
            </div>

            {/* 프리랜서 */}
            <div>
              <h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-white">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-xs font-bold text-primary">
                  P
                </span>
                프리랜서
              </h3>
              <div className="space-y-4">
                {freelancePositions.map((pos) => (
                  <PositionCard key={pos.title} position={pos} />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="mb-6 text-sm text-dark-muted break-keep">
              원하시는 포지션이 없으신가요? 입사 지원서를 보내주시면 적합한
              포지션이 열릴 때 우선 연락드리겠습니다.
            </p>
            <Button
              href="mailto:hello@nililia.com?subject=입사 지원"
              variant="primary"
              className="px-8 py-4 text-base"
            >
              입사 지원하기
            </Button>
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
