"use client";

import Button from "@/components/ui/Button";

const services = [
  "영상 번역",
  "문서 · 카탈로그",
  "웹소설 · 웹툰",
  "홈페이지 · 앱",
  "게임",
  "SDH · 배리어프리",
];

const greetings = [
  { text: "こんにちは", top: "20%", left: "25%", size: "text-2xl", delay: "0s" },
  { text: "Hola", top: "55%", left: "58%", size: "text-xl", delay: "1.2s" },
  { text: "Thank you", top: "38%", left: "12%", size: "text-lg", delay: "2.5s" },
  { text: "你好", top: "68%", left: "35%", size: "text-2xl", delay: "0.8s" },
];

export default function Hero() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-dark-bg">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,_rgba(0,151,254,0.12)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,_rgba(0,151,254,0.08)_0%,_transparent_50%)]" />
      </div>

      <div className="relative mx-auto flex max-w-7xl items-center px-6 py-20 lg:py-24">
        <div className="grid w-full items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Text */}
          <div>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl break-keep">
              여러분의 콘텐츠에
              <br />
              <span className="text-primary">날개를 달아줍니다</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/60 break-keep">
              전문 번역과 현지화 서비스로 글로벌 시장 진출을 지원합니다.
            </p>
            <p className="mt-2 max-w-lg text-lg leading-relaxed text-white/60 break-keep">
              AI 기술과 전문가의 노하우로 최상의 품질을 보장합니다.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button
                href="/contact"
                variant="primary"
                className="px-8 py-4 text-base"
              >
                무료 상담 받기
              </Button>
              <Button
                href="/services"
                variant="outline"
                className="border-white/20 px-8 py-4 text-base text-white hover:bg-white/10"
              >
                서비스 알아보기
              </Button>
            </div>
          </div>

          {/* Right: Conveyor belt visual */}
          <div className="relative hidden md:flex md:justify-center">
            <div className="relative h-[350px] w-[420px] overflow-hidden rounded-2xl border border-dark-border bg-dark-card/30">
              {/* Floating multilingual greetings */}
              {greetings.map((g) => (
                <span
                  key={g.text}
                  className={`animate-float absolute font-light text-white/[0.12] ${g.size} pointer-events-none select-none`}
                  style={{
                    top: g.top,
                    left: g.left,
                    animationDelay: g.delay,
                    animationDuration: `${3 + Math.random() * 2}s`,
                  }}
                >
                  {g.text}
                </span>
              ))}

              {/* Conveyor belt cards */}
              {services.map((label, i) => (
                <div
                  key={label}
                  className="conveyor-card z-10 flex items-center justify-center rounded-lg border border-white/15 bg-white/[0.07] px-5 py-3 backdrop-blur-sm"
                  style={{
                    animationDelay: `${i * -2}s`,
                    width: "155px",
                    height: "50px",
                  }}
                >
                  <span className="whitespace-nowrap text-sm font-medium text-white">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
