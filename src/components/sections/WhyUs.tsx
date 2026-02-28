"use client";

import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

const reasons = [
  {
    number: "01",
    title: "AI + 전문가 하이브리드 시스템",
    description:
      "최첨단 AI 번역 기술과 10년 이상 경력의 전문 번역가가 협업합니다. AI가 초벌 번역을 수행하고, 전문가가 문맥과 뉘앙스를 완성하여 속도와 품질 모두 잡았습니다.",
    tags: ["AI 번역 엔진", "전문가 감수", "품질 보증"],
    imageAlt: "AI와 전문가의 하이브리드 번역 시스템",
  },
  {
    number: "02",
    title: "50+ 언어, 글로벌 네트워크",
    description:
      "50개 이상의 언어를 지원하며, 각 언어권에 현지 전문가 네트워크를 보유하고 있습니다. 단순 번역이 아닌, 현지 문화와 정서에 맞는 진정한 현지화를 제공합니다.",
    tags: ["현지 전문가", "문화 적응", "글로벌 커버리지"],
    imageAlt: "글로벌 네트워크 맵",
  },
  {
    number: "03",
    title: "빠른 납기, 완벽한 프로세스",
    description:
      "체계적인 프로젝트 관리와 자동화된 워크플로우로 빠른 납기를 보장합니다. 실시간 진행 상황 대시보드를 통해 투명하게 프로젝트를 관리할 수 있습니다.",
    tags: ["자동 워크플로우", "실시간 대시보드", "빠른 납기"],
    imageAlt: "프로젝트 관리 대시보드",
  },
];

export default function WhyUs() {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setActive((prev) => (prev + 1) % reasons.length);
  }, []);

  // Auto-advance every 5 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  const current = reasons[active];

  return (
    <section
      className="bg-dark-bg py-24"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
            Why Us
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl break-keep">
            왜 Nililia를 선택해야 하나요?
          </h2>
        </div>

        {/* Content — Left text + Right image */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Text */}
          <div className="relative min-h-[320px]">
            {reasons.map((reason, idx) => (
              <div
                key={reason.number}
                className={cn(
                  "transition-all duration-500",
                  idx === active
                    ? "relative opacity-100"
                    : "pointer-events-none absolute inset-0 opacity-0",
                )}
              >
                <span className="mb-4 inline-block text-6xl font-bold text-primary/20">
                  {reason.number}
                </span>
                <h3 className="text-2xl font-bold text-white sm:text-3xl break-keep">
                  {reason.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-dark-muted break-keep">
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
            ))}
          </div>

          {/* Right: Image placeholder */}
          <div className="relative min-h-[320px]">
            {reasons.map((reason, idx) => (
              <div
                key={reason.number}
                className={cn(
                  "transition-all duration-500",
                  idx === active
                    ? "relative opacity-100"
                    : "pointer-events-none absolute inset-0 opacity-0",
                )}
              >
                <div className="flex aspect-[4/3] items-center justify-center rounded-2xl border border-dark-border bg-dark-card">
                  <span className="text-sm text-dark-muted">
                    {reason.imageAlt}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Indicator dots */}
        <div className="mt-12 flex items-center justify-center gap-3">
          {reasons.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActive(idx)}
              aria-label={`Why Us ${idx + 1}번째 항목`}
              className={cn(
                "h-2.5 rounded-full transition-all duration-300",
                idx === active
                  ? "w-8 bg-primary"
                  : "w-2.5 bg-white/20 hover:bg-white/40",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
