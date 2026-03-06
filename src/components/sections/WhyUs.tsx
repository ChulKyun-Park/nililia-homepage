"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const reasons = [
  {
    number: "01",
    title: "천만 유튜버가 검증한 품질",
    description:
      "쯔양, 문복희 등 구독자 천만 이상의 크리에이터가 닐리리아를 선택합니다. 이들의 콘텐츠는 단순 정보 전달이 아니라 개성과 재치가 생명입니다. 그 결을 살리는 번역이 가능하기 때문에 계속 함께합니다.",
    tags: ["천만 유튜버 3채널", "크리에이터 재구매율 88%", "맥락 번역"],
    image: "/images/현지화파트너.png",
    imageAlt: "크리에이터 콘텐츠 번역",
  },
  {
    number: "02",
    title: "단어가 아니라 맥락을 옮깁니다",
    description:
      "K-드라마의 뉘앙스, 예능의 재치, 게임의 세계관 — 콘텐츠마다 번역이 달라야 합니다. 도메인별 전문 번역가를 배정하고, 10년간 축적한 1,300만+ 문장 쌍 데이터로 일관된 품질을 보장합니다.",
    tags: ["도메인 전문가 배정", "1,300만+ 문장 쌍", "10년 노하우"],
    image: "/images/맥락을.png",
    imageAlt: "자막 번역 작업 현장",
  },
  {
    number: "03",
    title: "크리에이터부터 엔터·방송·OTT까지",
    description:
      "컨텐츠플라이로 크리에이터 채널을, 컨텐츠플라이S로 기업 프로젝트를 관리합니다. 하나의 팀에서 콘텐츠 유형을 가리지 않고 일관된 품질을 보장합니다.",
    tags: ["컨텐츠플라이", "컨텐츠플라이S", "B2C + B2B 통합"],
    image: "/images/글로벌.png",
    imageAlt: "B2C와 B2B 통합 서비스",
  },
  {
    number: "04",
    title: "빠른 납기, 투명한 프로세스",
    description:
      "자동화된 워크플로우와 실시간 대시보드로 프로젝트 진행 상황을 투명하게 공유합니다. 시리즈물 대량 작업도 일관된 품질과 납기를 보장합니다.",
    tags: ["자동 워크플로우", "실시간 대시보드", "대량 처리"],
    image: "/images/빠른납기.png",
    imageAlt: "프로젝트 관리 대시보드",
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
            WHY NILILIA
          </span>
          <h2 className="text-[length:var(--font-size-section-h2)] font-bold tracking-tight text-foreground break-keep">
            왜 닐리리아인가?
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
              <h3 className="text-[length:var(--font-size-section-h2)] font-bold text-gray-900 break-keep">
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

            {/* Right: Image — 80% 크기 */}
            <div
              key={`img-${current}`}
              className={`hidden lg:flex flex-1 items-center justify-center ${direction === "up" ? "slide-enter-up-delayed" : "slide-enter-down-delayed"}`}
            >
              <div
                className="relative overflow-hidden rounded-2xl"
                style={{ width: "80%", aspectRatio: "4/3" }}
              >
                <Image
                  src={reason.image}
                  alt={reason.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 40vw, 0vw"
                />
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
