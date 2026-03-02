import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import Link from "next/link";
import Image from "next/image";
import {
  Video,
  FileText,
  Globe,
  Gamepad2,
  BookOpen,
  Subtitles,
  ScanSearch,
  Mic,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface ServiceItem {
  icon: LucideIcon;
  title: string;
  description: string;
  thumbnail: string;
  slug: string;
  comingSoon?: boolean;
}

const services: ServiceItem[] = [
  {
    icon: Video,
    title: "영상 번역",
    slug: "video-translation",
    thumbnail: "/images/services/영상번역.png",
    description:
      "자막, 더빙, 보이스오버 등 모든 영상 콘텐츠의 다국어 번역 서비스를 제공합니다.",
  },
  {
    icon: FileText,
    title: "문서 번역",
    slug: "document-translation",
    thumbnail: "/images/services/문서번역.png",
    description:
      "계약서, 매뉴얼, 마케팅 자료 등 전문 문서 번역 서비스를 제공합니다.",
  },
  {
    icon: Globe,
    title: "웹 · 앱 현지화",
    slug: "web-app-localization",
    thumbnail: "/images/services/홈페이지 · 앱 현지화.png",
    description:
      "웹사이트와 모바일 앱의 현지화로 글로벌 사용자 경험을 최적화합니다.",
  },
  {
    icon: Gamepad2,
    title: "게임 현지화",
    slug: "game-localization",
    thumbnail: "/images/services/게임 번역.png",
    description:
      "게임 UI, 스토리, 마케팅 자료까지 완벽한 게임 현지화를 지원합니다.",
  },
  {
    icon: BookOpen,
    title: "웹소설 번역",
    slug: "webnovel-translation",
    thumbnail: "/images/services/웹소설 · 웹소설.png",
    description:
      "웹소설, 웹툰 등 한류 콘텐츠의 고품질 번역 서비스를 제공합니다.",
  },
  {
    icon: Subtitles,
    title: "SDH · 배리어프리 자막 제작",
    slug: "sdh-subtitle",
    thumbnail: "/images/services/SDH · 배리어프리 자막 제작.png",
    description:
      "청각장애인을 위한 자막(SDH) 제작으로 콘텐츠 접근성을 향상시킵니다.",
  },
];

const comingSoonServices: ServiceItem[] = [
  {
    icon: ScanSearch,
    title: "MTPE",
    slug: "mtpe",
    thumbnail: "/images/services/MTPE.png",
    description:
      "AI 기계 번역 결과물을 전문 번역가가 감수·교정하여 빠른 속도와 높은 품질을 동시에 달성합니다.",
    comingSoon: true,
  },
  {
    icon: Mic,
    title: "AI 번역 · 더빙",
    slug: "ai-dubbing",
    thumbnail: "/images/services/AI 번역 · 더빙.png",
    description:
      "AI 음성 합성과 립싱크 기술로 영상 콘텐츠를 다국어로 자연스럽게 더빙합니다.",
    comingSoon: true,
  },
];

function ServiceCard({ service }: { service: ServiceItem }) {
  const Icon = service.icon;
  return (
    <Card
      className={`group overflow-hidden p-0 transition-all ${
        service.comingSoon
          ? "cursor-default opacity-70"
          : "cursor-pointer hover:-translate-y-1"
      }`}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-surface">
        <Image
          src={service.thumbnail}
          alt={service.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <div className="mb-2 inline-flex rounded-lg bg-primary/10 p-1.5">
          <Icon className="h-4 w-4 text-primary" />
        </div>
        <h3 className={`mb-1.5 text-[length:var(--font-size-card-title)] font-bold text-foreground ${!service.comingSoon ? "group-hover:text-primary" : ""} transition-colors`}>
          {service.title}
        </h3>
        <p className="text-[length:var(--font-size-card-desc)] leading-relaxed text-muted break-keep">
          {service.description}
        </p>
      </div>
    </Card>
  );
}

export default function ServiceGrid() {
  return (
    <section className="bg-surface py-24">
      <div className="mx-auto max-w-7xl px-6 lg:pl-12">
        <SectionHeader
          label="Services"
          title="글로벌 진출을 위한 맞춤 솔루션"
          description="다양한 콘텐츠 유형에 최적화된 전문 번역 및 현지화 서비스를 제공합니다."
        />

        {/* Active services */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link key={service.title} href={`/services/${service.slug}`}>
              <ServiceCard service={service} />
            </Link>
          ))}
        </div>

        {/* Coming Soon divider */}
        <div className="mt-12 flex items-center gap-4">
          <span className="inline-flex items-center rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground">
            coming soon
          </span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Coming soon services — 클릭 불가 */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {comingSoonServices.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/services"
            className="text-[length:var(--font-size-card-link)] font-semibold text-primary hover:text-primary-dark transition-colors"
          >
            전체 서비스 보기 &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
