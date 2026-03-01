"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const reasons = [
  {
    number: "01",
    title: "AI + 전문가 하이브리드 시스템",
    description:
      "최첨단 AI 번역 기술과 10년 이상 경력의 전문 번역가가 협업합니다. AI가 초벌 번역을 수행하고, 전문가가 문맥과 뉘앙스를 완성하여 속도와 품질 모두 잡았습니다.",
    tags: ["AI 번역 엔진", "전문가 감수", "품질 보증"],
    imagePlaceholder: "AI + Expert",
  },
  {
    number: "02",
    title: "50+ 언어, 글로벌 네트워크",
    description:
      "50개 이상의 언어를 지원하며, 각 언어권에 현지 전문가 네트워크를 보유하고 있습니다. 단순 번역이 아닌, 현지 문화와 정서에 맞는 진정한 현지화를 제공합니다.",
    tags: ["현지 전문가", "문화 적응", "글로벌 커버리지"],
    imagePlaceholder: "Global Network",
  },
  {
    number: "03",
    title: "빠른 납기, 완벽한 프로세스",
    description:
      "체계적인 프로젝트 관리와 자동화된 워크플로우로 빠른 납기를 보장합니다. 실시간 진행 상황 대시보드를 통해 투명하게 프로젝트를 관리할 수 있습니다.",
    tags: ["자동 워크플로우", "실시간 대시보드", "빠른 납기"],
    imagePlaceholder: "Fast Delivery",
  },
];

export default function WhyUs() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = reasons.length;

  const goNext = useCallback(
    () => setCurrent((prev) => (prev + 1) % total),
    [total]
  );

  const goPrev = useCallback(
    () => setCurrent((prev) => (prev - 1 + total) % total),
    [total]
  );

  // Auto-play
  useEffect(() => {
    if (paused) return;
    const id = setInterval(goNext, 4000);
    return () => clearInterval(id);
  }, [paused, goNext]);

  const reason = reasons[current];

  return (
    <section
      className="bg-slate-50 py-24"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <style>{`
        @keyframes slide-up-in {
          0% { opacity: 0; transform: translateY(24px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up-in {
          animation: slide-up-in 0.5s ease-out both;
        }
      `}</style>

      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="mb-3 inline-block text-[length:var(--font-size-section-label)] font-semibold uppercase tracking-wider text-primary">
            Why Us
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-[length:var(--font-size-section-h2)] break-keep">
            왜 Nililia를 선택해야 하나요?
          </h2>
        </div>

        {/* Content: 2-column */}
        <div className="relative mx-auto max-w-5xl">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Left: Text */}
            <div key={current} className="animate-slide-up-in">
              <span className="mb-4 inline-block text-7xl font-extrabold text-primary/15 sm:text-8xl">
                {reason.number}
              </span>
              <h3 className="text-2xl font-bold text-gray-900 sm:text-3xl break-keep">
                {reason.title}
              </h3>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-gray-500 break-keep">
                {reason.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {reason.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Image placeholder */}
            <div
              key={`img-${current}`}
              className="animate-slide-up-in flex aspect-[4/3] items-center justify-center rounded-3xl border border-primary/10 bg-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.06)]"
            >
              <span className="text-lg font-semibold text-muted">
                {reason.imagePlaceholder}
              </span>
            </div>
          </div>

          {/* Controls: Arrows + Dots */}
          <div className="mt-10 flex items-center justify-center gap-6">
            {/* Prev Arrow */}
            <button
              type="button"
              onClick={goPrev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-muted shadow-sm transition-colors hover:border-primary hover:text-primary"
              aria-label="이전"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {reasons.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrent(i)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-8 bg-primary"
                      : "w-2.5 bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`슬라이드 ${i + 1}`}
                />
              ))}
            </div>

            {/* Next Arrow */}
            <button
              type="button"
              onClick={goNext}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-muted shadow-sm transition-colors hover:border-primary hover:text-primary"
              aria-label="다음"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
