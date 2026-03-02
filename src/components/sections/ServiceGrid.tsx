import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import Link from "next/link";
import {
  Video,
  FileText,
  Globe,
  Gamepad2,
  BookOpen,
  Subtitles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface ServiceItem {
  icon: LucideIcon;
  title: string;
  description: string;
  /** Replace with actual image path when available */
  thumbnail: string;
}

const services: ServiceItem[] = [
  {
    icon: Video,
    title: "영상 번역",
    thumbnail: "/images/services/video-translation.jpg",
    description:
      "자막, 더빙, 보이스오버 등 모든 영상 콘텐츠의 다국어 번역 서비스를 제공합니다.",
  },
  {
    icon: FileText,
    title: "문서 번역",
    thumbnail: "/images/services/document-translation.jpg",
    description:
      "계약서, 매뉴얼, 마케팅 자료 등 전문 문서 번역 서비스를 제공합니다.",
  },
  {
    icon: Globe,
    title: "웹/앱 현지화",
    thumbnail: "/images/services/web-app-localization.jpg",
    description:
      "웹사이트와 모바일 앱의 현지화로 글로벌 사용자 경험을 최적화합니다.",
  },
  {
    icon: Gamepad2,
    title: "게임 현지화",
    thumbnail: "/images/services/game-localization.jpg",
    description:
      "게임 UI, 스토리, 마케팅 자료까지 완벽한 게임 현지화를 지원합니다.",
  },
  {
    icon: BookOpen,
    title: "웹소설 번역",
    thumbnail: "/images/services/webnovel-translation.jpg",
    description:
      "웹소설, 웹툰 등 한류 콘텐츠의 고품질 번역 서비스를 제공합니다.",
  },
  {
    icon: Subtitles,
    title: "SDH 자막",
    thumbnail: "/images/services/sdh-subtitle.jpg",
    description:
      "청각장애인을 위한 자막(SDH) 제작으로 콘텐츠 접근성을 향상시킵니다.",
  },
];

export default function ServiceGrid() {
  return (
    <section className="bg-surface py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          label="Services"
          title="글로벌 진출을 위한 맞춤 솔루션"
          description="다양한 콘텐츠 유형에 최적화된 전문 번역 및 현지화 서비스를 제공합니다."
        />

        <div className="mx-auto max-w-5xl">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Card
                key={service.title}
                className="group cursor-pointer overflow-hidden p-0 transition-all hover:-translate-y-1"
              >
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
            );
          })}
        </div>
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/services"
            className="text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
          >
            전체 서비스 보기 &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
