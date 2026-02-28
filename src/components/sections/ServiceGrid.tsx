import Section from "@/components/ui/Section";
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

const services = [
  {
    icon: Video,
    title: "영상 번역",
    description: "자막, 더빙, 보이스오버 등 모든 영상 콘텐츠의 다국어 번역 서비스를 제공합니다.",
  },
  {
    icon: FileText,
    title: "문서 번역",
    description: "계약서, 매뉴얼, 마케팅 자료 등 전문 문서 번역 서비스를 제공합니다.",
  },
  {
    icon: Globe,
    title: "웹/앱 현지화",
    description: "웹사이트와 모바일 앱의 현지화로 글로벌 사용자 경험을 최적화합니다.",
  },
  {
    icon: Gamepad2,
    title: "게임 현지화",
    description: "게임 UI, 스토리, 마케팅 자료까지 완벽한 게임 현지화를 지원합니다.",
  },
  {
    icon: BookOpen,
    title: "웹소설 번역",
    description: "웹소설, 웹툰 등 한류 콘텐츠의 고품질 번역 서비스를 제공합니다.",
  },
  {
    icon: Subtitles,
    title: "SDH 자막",
    description: "청각장애인을 위한 자막(SDH) 제작으로 콘텐츠 접근성을 향상시킵니다.",
  },
];

export default function ServiceGrid() {
  return (
    <Section id="services">
      <SectionHeader
        label="Services"
        title="글로벌 진출을 위한 맞춤 솔루션"
        description="다양한 콘텐츠 유형에 최적화된 전문 번역 및 현지화 서비스를 제공합니다."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <Card key={service.title} className="group cursor-pointer">
              <div className="mb-4 inline-flex rounded-xl bg-primary-light p-3">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted break-keep">
                {service.description}
              </p>
            </Card>
          );
        })}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/services"
          className="text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
        >
          전체 서비스 보기 &rarr;
        </Link>
      </div>
    </Section>
  );
}
