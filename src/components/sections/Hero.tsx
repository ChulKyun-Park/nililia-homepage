"use client";

import Button from "@/components/ui/Button";

/* ── 6 services ── */
interface ServiceItem {
  icon: string;
  title: string;
  desc: string;
  bg: string;
}

const services: ServiceItem[] = [
  { icon: "▶", title: "영상 번역", desc: "자막 & 더빙", bg: "bg-white" },
  { icon: "📄", title: "문서 번역", desc: "전문 번역", bg: "bg-sky-50" },
  { icon: "📖", title: "웹소설 · 웹툰", desc: "현지화", bg: "bg-white" },
  { icon: "📱", title: "홈페이지 · 앱", desc: "디지털 최적화", bg: "bg-sky-50" },
  { icon: "🎮", title: "게임", desc: "게임 현지화", bg: "bg-white" },
  { icon: "♿", title: "SDH · 배리어프리", desc: "접근성 자막", bg: "bg-sky-50" },
];

/* ── Card Component ── */
function ServiceCard({
  service,
  size = "lg",
}: {
  service: ServiceItem;
  size?: "sm" | "lg";
}) {
  const isSmall = size === "sm";
  return (
    <div
      className={`${service.bg} flex-shrink-0 flex flex-col justify-between rounded-2xl border border-primary/10 shadow-sm ${
        isSmall ? "w-[140px] h-[185px] p-4" : "w-[200px] h-[265px] p-6"
      }`}
    >
      <div>
        <div
          className={`flex items-center justify-center rounded-xl bg-primary text-white shadow-lg ${
            isSmall ? "h-9 w-9 text-base" : "h-12 w-12 text-xl"
          }`}
        >
          {service.icon}
        </div>
      </div>
      <div>
        <p
          className={`font-bold text-gray-900 ${
            isSmall ? "text-xs" : "text-base"
          }`}
        >
          {service.title}
        </p>
        <p
          className={`text-gray-500 mt-1 ${
            isSmall ? "text-[10px]" : "text-sm"
          }`}
        >
          {service.desc}
        </p>
      </div>
    </div>
  );
}

/* ── Infinite horizontal scroll row ── */
function ScrollRow({
  items,
  speed,
  size,
  className = "",
}: {
  items: ServiceItem[];
  speed: number;
  size: "sm" | "lg";
  className?: string;
}) {
  const doubled = [...items, ...items];
  const gap = size === "sm" ? 12 : 16;

  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className="flex animate-scroll-left"
        style={{ gap: `${gap}px`, animationDuration: `${speed}s` }}
      >
        {doubled.map((service, i) => (
          <ServiceCard
            key={`${service.title}-${i}`}
            service={service}
            size={size}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Parallax Carousel ── */
function ParallaxCarousel() {
  return (
    <div className="relative w-[480px] max-w-full">
      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-left {
          animation: scroll-left linear infinite;
        }
        @keyframes floating-soft {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>

      {/* Floating greetings */}
      <div
        className="absolute -top-8 left-4 z-30 pointer-events-none rounded-xl border border-primary/10 bg-white px-5 py-2.5 text-sm font-bold text-gray-500 shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
        style={{ animation: "floating-soft 4s ease-in-out infinite 0s" }}
      >
        こんにちは
      </div>
      <div
        className="absolute -top-6 right-8 z-30 pointer-events-none rounded-xl border border-primary/10 bg-white px-5 py-2.5 text-sm font-bold text-gray-500 shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
        style={{ animation: "floating-soft 4s ease-in-out infinite 0.5s" }}
      >
        ¡Hola!
      </div>
      <div
        className="absolute top-1/2 -right-12 z-30 pointer-events-none rounded-xl border border-primary/10 bg-white px-5 py-2.5 text-sm font-bold text-gray-500 shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
        style={{ animation: "floating-soft 4s ease-in-out infinite 1s" }}
      >
        Thank you
      </div>
      <div
        className="absolute bottom-12 -left-14 z-30 pointer-events-none rounded-xl border border-primary/10 bg-white px-5 py-2.5 text-sm font-bold text-gray-500 shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
        style={{ animation: "floating-soft 4s ease-in-out infinite 1.5s" }}
      >
        안녕하세요
      </div>

      {/* Back row — small, faded, slow */}
      <ScrollRow
        items={services}
        speed={35}
        size="sm"
        className="opacity-40 blur-[0.5px] mb-4"
      />

      {/* Front row — large, clear, fast */}
      <ScrollRow items={services} speed={25} size="lg" className="" />
    </div>
  );
}

/* ── Hero Section ── */
export default function Hero() {
  return (
    <section className="relative bg-white py-20 lg:py-32 overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,_rgba(0,151,254,0.06)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,_rgba(0,151,254,0.04)_0%,_transparent_50%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid w-full items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Text */}
          <div>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-[length:var(--font-size-hero-h1)] break-keep">
              여러분의 콘텐츠에
              <br />
              <span className="text-primary">날개를 달아줍니다</span>
            </h1>
            <p className="mt-6 max-w-lg text-[length:var(--font-size-hero-sub)] leading-relaxed text-muted break-keep">
              전문 번역과 현지화 서비스로 글로벌 시장 진출을 지원합니다.
            </p>
            <p className="mt-2 max-w-lg text-[length:var(--font-size-hero-sub)] leading-relaxed text-muted break-keep">
              AI 기술과 전문가의 노하우로 최상의 품질을 보장합니다.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button
                href="/contact"
                variant="primary"
                className="px-8 py-4 text-[length:var(--font-size-cta-button)]"
              >
                무료 상담 받기
              </Button>
              <Button
                href="/services"
                variant="outline"
                className="border-border px-8 py-4 text-[length:var(--font-size-cta-button)] text-foreground hover:bg-surface"
              >
                서비스 알아보기
              </Button>
            </div>
          </div>

          {/* Right: Parallax carousel */}
          <div className="relative hidden lg:flex lg:justify-center overflow-hidden">
            <ParallaxCarousel />
          </div>
        </div>
      </div>
    </section>
  );
}
