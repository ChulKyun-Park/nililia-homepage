import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Link from "next/link";
import {
  Video,
  FileText,
  Globe,
  Gamepad2,
  BookOpen,
  Subtitles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "서비스 | Nililia",
  description:
    "영상 번역, 문서 번역, 웹/앱 현지화, 게임 현지화, 웹소설 번역, SDH 자막 등 다양한 번역 및 현지화 서비스를 제공합니다.",
  openGraph: {
    title: "서비스 | Nililia",
    description:
      "영상 번역, 문서 번역, 웹/앱 현지화, 게임 현지화, 웹소설 번역, SDH 자막 등 다양한 번역 및 현지화 서비스를 제공합니다.",
  },
};

const services = [
  {
    icon: Video,
    title: "영상 번역",
    slug: "video-translation",
    description: "자막, 더빙, 보이스오버 등 모든 영상 콘텐츠의 다국어 번역 서비스를 제공합니다.",
  },
  {
    icon: FileText,
    title: "문서 번역",
    slug: "document-translation",
    description: "계약서, 매뉴얼, 마케팅 자료 등 전문 문서 번역 서비스를 제공합니다.",
  },
  {
    icon: Globe,
    title: "웹/앱 현지화",
    slug: "web-app-localization",
    description: "웹사이트와 모바일 앱의 현지화로 글로벌 사용자 경험을 최적화합니다.",
  },
  {
    icon: Gamepad2,
    title: "게임 현지화",
    slug: "game-localization",
    description: "게임 UI, 스토리, 마케팅 자료까지 완벽한 게임 현지화를 지원합니다.",
  },
  {
    icon: BookOpen,
    title: "웹소설 번역",
    slug: "webnovel-translation",
    description: "웹소설, 웹툰 등 한류 콘텐츠의 고품질 번역 서비스를 제공합니다.",
  },
  {
    icon: Subtitles,
    title: "SDH 자막",
    slug: "sdh-subtitle",
    description: "청각장애인을 위한 자막(SDH) 제작으로 콘텐츠 접근성을 향상시킵니다.",
  },
];

const process = [
  { step: "01", title: "상담 & 견적", description: "프로젝트 요구사항을 파악하고 맞춤 견적을 제공합니다." },
  { step: "02", title: "전문가 배정", description: "분야별 전문 번역가를 배정하고 프로젝트를 시작합니다." },
  { step: "03", title: "번역 & 감수", description: "AI 초벌 번역 후 전문가가 문맥과 뉘앙스를 완성합니다." },
  { step: "04", title: "납품 & 피드백", description: "최종 결과물을 납품하고, 피드백을 반영하여 품질을 개선합니다." },
];

export default function ServicesPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="bg-gradient-to-br from-foreground via-gray-900 to-gray-800 flex items-center min-h-[420px] py-4 lg:py-6">
        <div className="mx-auto max-w-7xl px-6">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
            Services
          </p>
          <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl break-keep">
            글로벌 진출을 위한
            <br />
            맞춤 솔루션
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70 break-keep">
            다양한 콘텐츠 유형에 최적화된 전문 번역 및 현지화 서비스를 제공합니다.
            AI 기술과 전문가의 노하우로 최상의 품질을 보장합니다.
          </p>
        </div>
      </section>

      {/* Service Cards — 홈과 동일한 그리드 */}
      <Section>
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Link key={service.title} href={`/services/${service.slug}`}>
                  <Card className="group cursor-pointer overflow-hidden p-0 transition-all hover:-translate-y-1 h-full">
                    {/* Thumbnail placeholder */}
                    <div className="flex aspect-[16/10] items-center justify-center bg-surface">
                      <span className="text-xs text-muted">
                        [{service.title} 이미지]
                      </span>
                    </div>
                    <div className="p-4">
                      <div className="mb-2 inline-flex rounded-lg bg-primary/10 p-1.5">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                      <h3 className="mb-1.5 text-base font-bold text-foreground group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-xs leading-relaxed text-muted break-keep">
                        {service.description}
                      </p>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </Section>

      {/* Process */}
      <Section className="bg-surface">
        <SectionHeader
          label="Process"
          title="서비스 진행 프로세스"
          description="체계적인 프로세스로 빠르고 정확한 결과물을 제공합니다."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((item) => (
            <Card key={item.step} className="text-center">
              <span className="text-4xl font-bold text-primary/20">{item.step}</span>
              <h3 className="mt-3 text-lg font-bold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm text-muted break-keep">{item.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Bottom CTA */}
      <section className="bg-gradient-to-r from-primary to-primary-dark py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold text-white break-keep">
            프로젝트에 맞는 솔루션을 찾아보세요
          </h2>
          <p className="mt-4 text-lg text-white/80 break-keep">
            전문 컨설턴트가 최적의 서비스와 견적을 제안해 드립니다.
          </p>
          <div className="mt-8">
            <Button
              href="/contact"
              className="bg-white px-8 py-4 text-base font-bold text-primary hover:bg-white/90"
            >
              무료 상담 신청
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
