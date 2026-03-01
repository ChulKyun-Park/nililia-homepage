"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Button from "@/components/ui/Button";

/* ── Service card data ── */
interface ServiceItem {
  icon: string;
  title: string;
  desc: string;
}

const services: ServiceItem[] = [
  { icon: "\uD83C\uDDE8\uD83C\uDDF3", title: "中文翻译", desc: "중국어 번역" },
  { icon: "\u25B6", title: "영상 번역", desc: "자막 & 번역" },
  { icon: "\uD83D\uDCC4", title: "문서 · 카탈로그", desc: "전문 번역" },
  { icon: "\uD83D\uDCD6", title: "웹소설 · 웹툰", desc: "현지화" },
  { icon: "\uD83D\uDCF1", title: "홈페이지 · 앱", desc: "디지털 최적화" },
  { icon: "\uD83C\uDFAE", title: "게임", desc: "게임 현지화" },
  { icon: "\u267F", title: "SDH · 배리어프리", desc: "접근성 자막" },
];

/* ── Floating greetings (background decoration) ── */
const greetings = [
  { text: "こんにちは", top: "15%", left: "20%", size: "text-xl", delay: "0s" },
  { text: "Hola", top: "60%", left: "62%", size: "text-lg", delay: "1.2s" },
  { text: "Thank you", top: "35%", left: "8%", size: "text-base", delay: "2.5s" },
  { text: "你好", top: "72%", left: "38%", size: "text-xl", delay: "0.8s" },
];

/*
 * Slot-based conveyor belt animation
 *
 * 4 visible slots arranged in a 2×2 grid:
 *   [0] top-left   [1] top-right
 *   [3] bot-left   [2] bot-right
 *
 * Every ~2.5s all cards shift one slot clockwise:
 *   Slot 0 → 1, Slot 1 → 2, Slot 2 → 3, Slot 3 → 0
 * The card leaving slot 2→3 actually exits downward,
 * and a new card enters from below into slot 3's position.
 *
 * We use CSS grid + translate for the snap animation.
 */

/* Grid slot positions (row, col) for a 2-col layout */
const SLOT_POSITIONS = [
  { row: 0, col: 0 }, // 0: top-left
  { row: 0, col: 1 }, // 1: top-right
  { row: 1, col: 1 }, // 2: bot-right
  { row: 1, col: 0 }, // 3: bot-left
];

function ConveyorBelt() {
  // Track which 4 services are currently visible (by index into services[])
  const [visibleIndices, setVisibleIndices] = useState([0, 1, 2, 3]);
  // Track slot assignments: slotCards[slotIndex] = serviceIndex
  const [slotCards, setSlotCards] = useState([0, 1, 2, 3]);
  // For enter/exit animation states
  const [transitioning, setTransitioning] = useState(false);
  // Track the next service to bring in
  const nextServiceRef = useRef(4);
  // Track exiting card info
  const [exitingCard, setExitingCard] = useState<{ serviceIdx: number; fromSlot: number } | null>(null);
  const [enteringCard, setEnteringCard] = useState<{ serviceIdx: number; toSlot: number } | null>(null);

  const advanceSlot = useCallback(() => {
    setTransitioning(true);

    const nextIdx = nextServiceRef.current % services.length;
    nextServiceRef.current = (nextServiceRef.current + 1) % services.length;

    setSlotCards((prev) => {
      // Current mapping: slot0=A, slot1=B, slot2=C, slot3=D
      // After clockwise shift: slot0=D(from3), slot1=A(from0), slot2=B(from1), slot3=new
      // Card in slot2 exits, new card enters at slot3
      const exiting = prev[2]; // card currently at bot-right exits
      setExitingCard({ serviceIdx: exiting, fromSlot: 2 });
      setEnteringCard({ serviceIdx: nextIdx, toSlot: 3 });

      return [
        prev[3], // slot 0 ← was slot 3
        prev[0], // slot 1 ← was slot 0
        prev[1], // slot 2 ← was slot 1
        nextIdx,  // slot 3 ← new card
      ];
    });

    // Clear transition state after animation completes
    setTimeout(() => {
      setTransitioning(false);
      setExitingCard(null);
      setEnteringCard(null);
    }, 500);
  }, []);

  useEffect(() => {
    const interval = setInterval(advanceSlot, 2800);
    return () => clearInterval(interval);
  }, [advanceSlot]);

  return (
    <div className="relative h-[340px] w-[400px] overflow-hidden rounded-2xl border border-dark-border bg-dark-card/30 p-4">
      {/* Background floating greetings */}
      {greetings.map((g) => (
        <span
          key={g.text}
          className={`animate-float absolute font-light text-white/[0.08] ${g.size} pointer-events-none select-none`}
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

      {/* 2×2 grid of service cards */}
      <div className="relative grid h-full grid-cols-2 grid-rows-2 gap-3">
        {SLOT_POSITIONS.map((pos, slotIdx) => {
          const serviceIdx = slotCards[slotIdx];
          const service = services[serviceIdx];
          return (
            <div
              key={`slot-${slotIdx}-${serviceIdx}`}
              className="conveyor-slot-card z-10 flex flex-col rounded-2xl border border-white/15 bg-white/[0.07] p-4 backdrop-blur-sm"
              style={{
                gridRow: pos.row + 1,
                gridColumn: pos.col + 1,
              }}
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-lg text-white shadow-lg">
                {service.icon}
              </div>
              <p className="text-sm font-bold text-white">{service.title}</p>
              <p className="mt-1 text-xs text-white/50">{service.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

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
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-[length:var(--font-size-hero-h1)] break-keep">
              여러분의 콘텐츠에
              <br />
              <span className="text-primary">날개를 달아줍니다</span>
            </h1>
            <p className="mt-6 max-w-lg text-[length:var(--font-size-hero-sub)] leading-relaxed text-white/60 break-keep">
              전문 번역과 현지화 서비스로 글로벌 시장 진출을 지원합니다.
            </p>
            <p className="mt-2 max-w-lg text-[length:var(--font-size-hero-sub)] leading-relaxed text-white/60 break-keep">
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
                className="border-white/20 px-8 py-4 text-[length:var(--font-size-cta-button)] text-white hover:bg-white/10"
              >
                서비스 알아보기
              </Button>
            </div>
          </div>

          {/* Right: Slot-based conveyor belt */}
          <div className="relative hidden md:flex md:justify-center">
            <ConveyorBelt />
          </div>
        </div>
      </div>
    </section>
  );
}
