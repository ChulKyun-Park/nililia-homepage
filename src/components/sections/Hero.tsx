"use client";

import Button from "@/components/ui/Button";

/* ── 10 services (정확한 목록) ── */
interface ServiceItem {
  icon: string;
  title: string;
  desc: string;
  bg: string;
}

const services: ServiceItem[] = [
  { icon: "▶",  title: "영상 번역",       desc: "자막 & 더빙",     bg: "bg-white" },
  { icon: "📄", title: "문서 번역",       desc: "전문 번역",       bg: "bg-sky-50" },
  { icon: "🏢", title: "기업 맞춤 번역",   desc: "맞춤형 솔루션",   bg: "bg-white" },
  { icon: "🌐", title: "홈페이지 현지화",  desc: "웹사이트 최적화",  bg: "bg-sky-50" },
  { icon: "📱", title: "앱 현지화",       desc: "모바일 최적화",    bg: "bg-white" },
  { icon: "📖", title: "웹소설 번역",     desc: "콘텐츠 현지화",    bg: "bg-sky-50" },
  { icon: "🖼️", title: "웹툰 번역",      desc: "만화 현지화",     bg: "bg-white" },
  { icon: "🎮", title: "게임 번역",       desc: "게임 현지화",     bg: "bg-sky-50" },
  { icon: "🤖", title: "AI 번역 · 더빙",  desc: "AI 기술 활용",    bg: "bg-white" },
  { icon: "✏️", title: "MTPE",           desc: "기계번역 후편집",  bg: "bg-sky-50" },
];

/* ── Card Component ── */
function ServiceCard({ service }: { service: ServiceItem }) {
  return (
    <div
      className={`${service.bg} flex-shrink-0 flex flex-col justify-between rounded-2xl border border-primary/10 shadow-sm w-[150px] h-[185px] p-5`}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white text-lg shadow-lg">
        {service.icon}
      </div>
      <div>
        <p className="text-sm font-bold text-gray-900">{service.title}</p>
        <p className="mt-0.5 text-xs text-gray-500">{service.desc}</p>
      </div>
    </div>
  );
}

/* ── Card Row (3 or 2 cards, centered) ── */
function CardRow({ items }: { items: ServiceItem[] }) {
  return (
    <div className="flex justify-center gap-4">
      {items.map((item) => (
        <ServiceCard key={item.title} service={item} />
      ))}
    </div>
  );
}

/* ── 3-2-3-2 Masonry Vertical Carousel ── */
function MasonryCarousel() {
  /*
    행 배치:
    Row 1 (3개): 영상 번역 / 문서 번역 / 기업 맞춤 번역
    Row 2 (2개): 홈페이지 현지화 / 앱 현지화
    Row 3 (3개): 웹소설 번역 / 웹툰 번역 / 게임 번역
    Row 4 (2개): AI 번역·더빙 / MTPE
  */
  const rows: ServiceItem[][] = [
    services.slice(0, 3),
    services.slice(3, 5),
    services.slice(5, 8),
    services.slice(8, 10),
  ];

  return (
    <div className="relative w-[520px] max-w-full overflow-hidden" style={{ height: "560px" }}>
      <style>{`
        @keyframes masonry-scroll-up {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .masonry-scroll {
          animation: masonry-scroll-up 30s linear infinite;
        }
        .masonry-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Top fade */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-20 bg-gradient-to-b from-white to-transparent" />
      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20 bg-gradient-to-t from-white to-transparent" />

      {/* Scrolling content: rows × 2 for seamless loop */}
      <div className="masonry-scroll flex flex-col gap-4">
        {/* First copy */}
        {rows.map((row, i) => (
          <CardRow key={`a-${i}`} items={row} />
        ))}
        {/* Duplicate copy */}
        {rows.map((row, i) => (
          <CardRow key={`b-${i}`} items={row} />
        ))}
      </div>
    </div>
  );
}

/* ── Hero Section ── */
export default function Hero() {
  return (
    <section className="relative bg-white py-20 lg:py-32 overflow-visible">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,_rgba(0,151,254,0.06)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,_rgba(0,151,254,0.04)_0%,_transparent_50%)]" />
      </div>

      {/* Floating greetings — 섹션 레벨에 배치 (잘림 방지) */}
      <style>{`
        @keyframes floating-soft {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
      <div className="pointer-events-none absolute inset-0 z-20 hidden lg:block">
        <div
          className="absolute rounded-xl border border-primary/10 bg-white px-5 py-2.5 text-sm font-bold text-gray-500 shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
          style={{ top: "8%", right: "6%", animation: "floating-soft 4s ease-in-out infinite 0s" }}
        >
          こんにちは
        </div>
        <div
          className="absolute rounded-xl border border-primary/10 bg-white px-5 py-2.5 text-sm font-bold text-gray-500 shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
          style={{ top: "22%", right: "2%", animation: "floating-soft 4s ease-in-out infinite 0.5s" }}
        >
          ¡Hola!
        </div>
        <div
          className="absolute rounded-xl border border-primary/10 bg-white px-5 py-2.5 text-sm font-bold text-gray-500 shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
          style={{ top: "60%", right: "3%", animation: "floating-soft 4s ease-in-out infinite 1s" }}
        >
          Thank you
        </div>
        <div
          className="absolute rounded-xl border border-primary/10 bg-white px-5 py-2.5 text-sm font-bold text-gray-500 shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
          style={{ top: "75%", right: "18%", animation: "floating-soft 4s ease-in-out infinite 1.5s" }}
        >
          안녕하세요
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[1fr_auto] lg:gap-16">
          {/* Left: Text — 자연스러운 폭 */}
          <div className="max-w-xl">
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
          <div className="relative hidden lg:block overflow-hidden">
            <MasonryCarousel />
          </div>
        </div>
      </div>
    </section>
  );
}
