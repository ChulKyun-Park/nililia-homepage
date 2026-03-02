"use client";

import { useState, useEffect, useCallback } from "react";

const reasons = [
  {
    number: "01",
    title: "100개 기업이 선택한 현지화 파트너",
    description:
      "2016년 설립 이래 방송사·엔터·OTT·크리에이터까지, 콘텐츠 현지화만 10년. 누적 매출 60억 원, 재구매율 88%는 약속이 아니라 결과로 쌓은 숫자입니다.",
    tags: ["10년 업력", "누적 고객 1,300+", "재구매율 88%"],
    imagePlaceholder: "100개 기업이 선택한 현지화 파트너",
  },
  {
    number: "02",
    title: "10+ 언어, 글로벌 네트워크",
    description:
      "10개 이상의 언어를 지원하며, 각 언어권에 현지 전문가 네트워크를 보유하고 있습니다. 단순 번역이 아닌, 현지 문화와 정서에 맞는 진정한 현지화를 제공합니다.",
    tags: ["현지 전문가", "문화 적응", "글로벌 커버리지"],
    imagePlaceholder: "글로벌 네트워크 맵",
  },
  {
    number: "03",
    title: "단어가 아니라 맥락을 옮깁니다",
    description:
      "K-드라마의 뉘앙스, 예능의 재치, 크리에이터의 개성 — 콘텐츠마다 번역이 달라야 합니다. 도메인별 전문 번역가를 배정하고, 10년간 축적한 1,300만+ 문장 쌍 데이터로 일관된 현지화 품질을 보장합니다.",
    tags: ["콘텐츠 특화", "도메인 전문가 배정", "1,300만+ 데이터"],
    imagePlaceholder: "콘텐츠 도메인별 전문 번역",
  },
  {
    number: "04",
    title: "빠른 납기, 완벽한 프로세스",
    description:
      "체계적인 프로젝트 관리와 자동화된 워크플로우로 빠른 납기를 보장합니다. 실시간 진행 상황 대시보드를 통해 투명하게 프로젝트를 관리할 수 있습니다.",
    tags: ["자동 워크플로우", "실시간 대시보드", "빠른 납기"],
    imagePlaceholder: "프로젝트 관리 대시보드",
  },
];

export default function WhyUs() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<"up" | "down">("up");
  const [isAnimating, setIsAnimating] = useState(false);

  const total = reasons.length;

  const goTo = useCallback(
    (index: number, dir: "up" | "down") => {
      if (isAnimating) return;
      setDirection(dir);
      setIsAnimating(true);
      setCurrent(index);
      setTimeout(() => setIsAnimating(false), 700);
    },
    [isAnimating],
  );

  const goNext = useCallback(() => {
    goTo((current + 1) % total, "up");
  }, [current, total, goTo]);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(goNext, 4000);
    return () => clearInterval(timer);
  }, [goNext]);

  const reason = reasons[current];

  return (
    <section
      className="bg-white py-24 overflow-hidden"
    >
      <style>{`
        @keyframes whyus-slide-up-enter {
          0% { opacity: 0; transform: translateY(120px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes whyus-slide-down-enter {
          0% { opacity: 0; transform: translateY(-120px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .slide-enter-up {
          animation: whyus-slide-up-enter 1.2s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .slide-enter-down {
          animation: whyus-slide-down-enter 1.2s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .slide-enter-up-delayed {
          animation: whyus-slide-up-enter 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.15s both;
        }
        .slide-enter-down-delayed {
          animation: whyus-slide-down-enter 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.15s both;
        }
      `}</style>

      <div className="mx-auto max-w-7xl px-6 lg:pl-12">
        {/* Header */}
        <div className="mb-16">
          <span className="mb-3 inline-block text-[length:var(--font-size-section-label)] font-semibold uppercase tracking-wider text-primary">
            Why NILILIA
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-[length:var(--font-size-section-h2)] break-keep">
            왜 NILILIA를 선택해야 하나요?
          </h2>
        </div>

        {/* Content: 좌측 텍스트 + 우측 이미지 + 세로 토글 */}
        <div className="relative">
          <div className="flex gap-8 lg:gap-12">
            {/* Left: Text */}
            <div
              key={`text-${current}`}
              className={`flex-1 flex flex-col justify-center ${direction === "up" ? "slide-enter-up" : "slide-enter-down"}`}
              style={{ minHeight: "320px" }}
            >
              <span className="mb-2 text-4xl font-bold text-primary/30">
                {reason.number}
              </span>
              <h3 className="text-2xl font-bold text-gray-900 sm:text-3xl break-keep">
                {reason.title}
              </h3>
              <p className="mt-4 max-w-lg text-[length:var(--font-size-body)] leading-relaxed text-gray-500 break-keep">
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

            {/* Right: Image placeholder — 80% 크기 */}
            <div
              key={`img-${current}`}
              className={`hidden lg:flex flex-1 items-center justify-center ${direction === "up" ? "slide-enter-up-delayed" : "slide-enter-down-delayed"}`}
            >
              <div
                className="flex items-center justify-center rounded-2xl bg-surface"
                style={{ width: "80%", aspectRatio: "4/3" }}
              >
                <span className="text-sm text-muted">
                  [{reason.imagePlaceholder}]
                </span>
              </div>
            </div>

            {/* 세로 토글 (우측 끝) */}
            <div className="hidden lg:flex flex-col items-center justify-center gap-3">
              {reasons.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i, i > current ? "up" : "down")}
                  className={`rounded-full transition-all duration-300 ${
                    i === current
                      ? "h-8 w-2.5 bg-primary"
                      : "h-2.5 w-2.5 bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`슬라이드 ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* 모바일 토글 (하단 가로) */}
          <div className="mt-10 flex items-center justify-center gap-2 lg:hidden">
            {reasons.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i, i > current ? "up" : "down")}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-8 bg-primary"
                    : "w-2.5 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`슬라이드 ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
