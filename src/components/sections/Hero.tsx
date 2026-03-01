"use client";

import Button from "@/components/ui/Button";

/* ── 10 services ── */
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
  { icon: "🤖", title: "AI 번역", desc: "고속 번역", bg: "bg-white" },
  { icon: "🎙️", title: "AI 더빙", desc: "음성 합성", bg: "bg-sky-50" },
  { icon: "📝", title: "MTPE", desc: "기계번역 후편집", bg: "bg-white" },
  { icon: "🌐", title: "통번역", desc: "회의·행사 통역", bg: "bg-sky-50" },
];

/* ── Card Component ── */
function ServiceCard({ service }: { service: ServiceItem }) {
  return (
    <div
      className={`${service.bg} flex-shrink-0 flex flex-col justify-between rounded-2xl border border-primary/10 shadow-sm w-[130px] h-[160px] p-4`}
    >
      <div>
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white text-base shadow-lg">
          {service.icon}
        </div>
      </div>
      <div>
        <p className="text-xs font-bold text-gray-900">{service.title}</p>
        <p className="mt-0.5 text-[10px] text-gray-500">{service.desc}</p>
      </div>
    </div>
  );
}

/* ── Card Row (3 or 2 cards) ── */
function CardRow({
  items,
  className = "",
}: {
  items: ServiceItem[];
  className?: string;
}) {
  return (
    <div className={`flex justify-center gap-3 ${className}`}>
      {items.map((item, i) => (
        <ServiceCard key={`${item.title}-${i}`} service={item} />
      ))}
    </div>
  );
}

/* ── Masonry Carousel ── */
function MasonryCarousel() {
  // 3-2-3-2 pattern rows
  const rows: ServiceItem[][] = [
    services.slice(0, 3), // row 1: 3 cards
    services.slice(3, 5), // row 2: 2 cards
    services.slice(5, 8), // row 3: 3 cards
    services.slice(8, 10), // row 4: 2 cards
  ];

  const doubled = [...rows, ...rows];

  return (
    <div className="relative w-[440px] max-w-full overflow-hidden" style={{ height: "500px" }}>
      <style>{`
        @keyframes scroll-up-masonry {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .animate-scroll-up-masonry {
          animation: scroll-up-masonry 30s linear infinite;
        }
        .animate-scroll-up-masonry:hover {
          animation-play-state: paused;
        }
        @keyframes floating-soft {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>

      {/* Floating greetings */}
      <div
        className="absolute -top-2 left-2 z-30 pointer-events-none rounded-xl border border-primary/10 bg-white px-4 py-2 text-sm font-bold text-gray-500 shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
        style={{ animation: "floating-soft 4s ease-in-out infinite 0s" }}
      >
        こんにちは
      </div>
      <div
        className="absolute top-4 right-0 z-30 pointer-events-none rounded-xl border border-primary/10 bg-white px-4 py-2 text-sm font-bold text-gray-500 shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
        style={{ animation: "floating-soft 4s ease-in-out infinite 0.5s" }}
      >
        ¡Hola!
      </div>
      <div
        className="absolute top-1/2 -right-8 z-30 pointer-events-none rounded-xl border border-primary/10 bg-white px-4 py-2 text-sm font-bold text-gray-500 shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
        style={{ animation: "floating-soft 4s ease-in-out infinite 1s" }}
      >
        Thank you
      </div>
      <div
        className="absolute bottom-16 -left-6 z-30 pointer-events-none rounded-xl border border-primary/10 bg-white px-4 py-2 text-sm font-bold text-gray-500 shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
        style={{ animation: "floating-soft 4s ease-in-out infinite 1.5s" }}
      >
        안녕하세요
      </div>

      {/* Top fade mask */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 z-20 h-16 bg-gradient-to-b from-white to-transparent" />
      {/* Bottom fade mask */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 h-16 bg-gradient-to-t from-white to-transparent" />

      {/* Scrolling rows */}
      <div className="animate-scroll-up-masonry flex flex-col gap-3">
        {doubled.map((row, rowIdx) => (
          <CardRow key={rowIdx} items={row} />
        ))}
      </div>
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

          {/* Right: Masonry carousel */}
          <div className="relative hidden lg:flex lg:justify-center overflow-hidden">
            <MasonryCarousel />
          </div>
        </div>
      </div>
    </section>
  );
}
