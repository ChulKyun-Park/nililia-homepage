"use client";

import { useEffect, useRef } from "react";
import Button from "@/components/ui/Button";

/* ── Lottie Player (lottie-web path 로딩, 호버 멈춤 없음) ── */
function HeroLottie() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let anim: import("lottie-web").AnimationItem | null = null;

    import("lottie-web").then((lottie) => {
      if (!containerRef.current) return;
      anim = lottie.default.loadAnimation({
        container: containerRef.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "/animations/hero-scene.json",
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      });
    });

    return () => {
      anim?.destroy();
    };
  }, []);

  return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />;
}

/* ── Hero Section ── */
export default function Hero() {
  return (
    <section className="relative bg-white pt-6 pb-16 lg:pt-10 lg:pb-24 overflow-visible">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,_rgba(0,151,254,0.06)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,_rgba(0,151,254,0.04)_0%,_transparent_50%)]" />
      </div>

      <style>{`
        @keyframes floating-soft {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[1fr_auto] lg:gap-16">
          {/* Left: Text */}
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

          {/* Right: Lottie + 인삿말 (애니메이션 왼쪽에 배치) */}
          <div className="relative hidden lg:block" style={{ width: 560, height: 500 }}>
            {/* 인삿말 — 애니메이션 컨테이너 기준 왼쪽 */}
            <div className="pointer-events-none absolute z-20">
              <div
                className="absolute rounded-xl border border-primary/10 bg-white px-5 py-2.5 text-sm font-bold text-gray-500 shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
                style={{ top: 20, left: -100, animation: "floating-soft 4s ease-in-out infinite 0s" }}
              >
                こんにちは
              </div>
              <div
                className="absolute rounded-xl border border-primary/10 bg-white px-5 py-2.5 text-sm font-bold text-gray-500 shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
                style={{ top: 140, left: -80, animation: "floating-soft 4s ease-in-out infinite 0.5s" }}
              >
                ¡Hola!
              </div>
              <div
                className="absolute rounded-xl border border-primary/10 bg-white px-5 py-2.5 text-sm font-bold text-gray-500 shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
                style={{ top: 280, left: -110, animation: "floating-soft 4s ease-in-out infinite 1s" }}
              >
                Thank you
              </div>
              <div
                className="absolute rounded-xl border border-primary/10 bg-white px-5 py-2.5 text-sm font-bold text-gray-500 shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
                style={{ top: 400, left: -70, animation: "floating-soft 4s ease-in-out infinite 1.5s" }}
              >
                안녕하세요
              </div>
            </div>

            {/* Lottie 애니메이션 */}
            <div className="overflow-hidden rounded-2xl" style={{ width: "100%", height: "100%" }}>
              <HeroLottie />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
