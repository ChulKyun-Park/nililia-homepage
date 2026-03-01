"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Button from "@/components/ui/Button";

/* ── 6 services (no Chinese) ── */
interface ServiceItem {
  icon: string;
  title: string;
  desc: string;
}

const services: ServiceItem[] = [
  { icon: "▶", title: "영상 번역", desc: "자막 & 번역" },
  { icon: "📄", title: "문서 · 카탈로그", desc: "전문 번역" },
  { icon: "📖", title: "웹소설 · 웹툰", desc: "현지화" },
  { icon: "📱", title: "홈페이지 · 앱", desc: "디지털 최적화" },
  { icon: "🎮", title: "게임", desc: "게임 현지화" },
  { icon: "♿", title: "SDH · 배리어프리", desc: "접근성 자막" },
];

/*
 * Greetings positioned OUTSIDE the conveyor container.
 * White balloon/tag style with shadow (ref: FloatingTag from nililia repo).
 */
const greetings = [
  { text: "こんにちは", pos: "-top-5 -left-4", delay: "0s" },
  { text: "Hola", pos: "-top-5 -right-4", delay: "0.5s" },
  { text: "Thank you", pos: "top-1/3 -right-28", delay: "1s" },
  { text: "안녕하세요", pos: "top-2/3 -left-24", delay: "1.5s" },
];

/*
 * Slot-based conveyor belt — "bottom-to-top" visible motion
 *
 * 2×2 grid (clockwise order):
 *   [0] top-left   [1] top-right
 *   [3] bot-left   [2] bot-right
 *
 * Every 2.8s one tick fires:
 *   slot 3 → slot 0  (SLIDE UP — visible transition)
 *   new card → slot 3 (SLIDE IN from below — visible transition)
 *   slot 0 → slot 1  (INSTANT — no transition)
 *   slot 1 → slot 2  (INSTANT — no transition)
 *   slot 2 → exits   (INSTANT — removed immediately)
 *
 * The user only sees cards sliding upward from bottom-left.
 */

/* ── Absolute position for each slot within the container ── */
const SLOT_POS: Record<number, { top: string; left: string }> = {
  0: { top: "0px", left: "0px" },
  1: { top: "0px", left: "calc(50% + 6px)" },
  2: { top: "calc(50% + 6px)", left: "calc(50% + 6px)" },
  3: { top: "calc(50% + 6px)", left: "0px" },
};

/* Exit: below bot-right (slot 2 x-position) */
const EXIT_POS = { top: "calc(100% + 20px)", left: "calc(50% + 6px)" };
/* Enter: below bot-left (slot 3 x-position) */
const ENTER_POS = { top: "calc(100% + 20px)", left: "0px" };

const CARD_SIZE = { width: "calc(50% - 6px)", height: "calc(50% - 6px)" };
const TRANSITION = "top 0.45s cubic-bezier(0.25,0.46,0.45,0.94), left 0.45s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.45s ease";

interface CardState {
  key: number;
  serviceIdx: number;
  slot: number;
  exiting: boolean;
  entering: boolean; // true = placed at ENTER_POS with no transition, then animated in
  sliding: boolean; // true = this card slides with CSS transition (slot3→0)
}

function ConveyorBelt() {
  const keyRef = useRef(4);
  const nextRef = useRef(4 % services.length);

  const [cards, setCards] = useState<CardState[]>([
    { key: 0, serviceIdx: 0, slot: 0, exiting: false, entering: false, sliding: false },
    { key: 1, serviceIdx: 1, slot: 1, exiting: false, entering: false, sliding: false },
    { key: 2, serviceIdx: 2, slot: 2, exiting: false, entering: false, sliding: false },
    { key: 3, serviceIdx: 3, slot: 3, exiting: false, entering: false, sliding: false },
  ]);

  /* Two-phase entering animation:
   * 1. Card renders at ENTER_POS with transition:none (invisible below)
   * 2. After browser paints, entering=false + sliding=true → card animates to slot 3 */
  useEffect(() => {
    const hasEntering = cards.some((c) => c.entering);
    if (!hasEntering) return;

    // Double rAF ensures the browser has painted the initial position
    const raf1 = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setCards((prev) =>
          prev.map((c) =>
            c.entering ? { ...c, entering: false, sliding: true } : c,
          ),
        );
      });
    });

    return () => cancelAnimationFrame(raf1);
  }, [cards]);

  const advance = useCallback(() => {
    const nextIdx = nextRef.current;
    nextRef.current = (nextRef.current + 1) % services.length;
    const newKey = keyRef.current++;

    setCards((prev) => {
      const atSlot = (s: number) =>
        prev.find((c) => c.slot === s && !c.exiting)!;

      const s0 = atSlot(0);
      const s1 = atSlot(1);
      const s2 = atSlot(2);
      const s3 = atSlot(3);

      return [
        { ...s3, slot: 0, sliding: true }, // slot 3 → 0 (SLIDE UP)
        { ...s0, slot: 1, sliding: false }, // slot 0 → 1 (instant)
        { ...s1, slot: 2, sliding: false }, // slot 1 → 2 (instant)
        // slot 2 removed instantly (no exit animation)
        {
          key: newKey,
          serviceIdx: nextIdx,
          slot: 3,
          exiting: false,
          entering: true,
          sliding: false,
        }, // new → slot 3 (SLIDE IN via entering two-phase)
      ];
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(advance, 2800);
    return () => clearInterval(interval);
  }, [advance]);

  return (
    <div className="relative">
      {/* Floating greetings — balloon/tag style OUTSIDE the container */}
      {greetings.map((g) => (
        <div
          key={g.text}
          className={`absolute ${g.pos} z-30 pointer-events-none select-none rounded-xl border border-border bg-white px-4 py-2 text-sm font-medium text-gray-500 shadow-md`}
          style={{ animation: `floating-soft 4s ease-in-out infinite ${g.delay}` }}
        >
          {g.text}
        </div>
      ))}

      {/* Conveyor belt container */}
      <div className="relative h-[340px] w-[400px] overflow-hidden rounded-2xl border border-border bg-surface/50">
        {cards.map((card) => {
          const service = services[card.serviceIdx];
          let pos: { top: string; left: string };
          let style: React.CSSProperties;

          if (card.entering) {
            // Phase 1: render at ENTER_POS with no transition
            pos = ENTER_POS;
            style = {
              ...pos,
              ...CARD_SIZE,
              transition: "none",
            };
          } else if (card.sliding) {
            // Sliding card (slot3→0 or entering→slot3): animate with transition
            pos = SLOT_POS[card.slot];
            style = {
              ...pos,
              ...CARD_SIZE,
              transition: TRANSITION,
            };
          } else {
            // All other cards: instant position (no transition)
            pos = SLOT_POS[card.slot];
            style = {
              ...pos,
              ...CARD_SIZE,
              transition: "none",
            };
          }

          return (
            <div
              key={card.key}
              className="absolute flex flex-col rounded-2xl border border-primary/10 bg-white p-4 shadow-sm"
              style={style}
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-lg text-white">
                {service.icon}
              </div>
              <p className="text-sm font-bold text-gray-900">
                {service.title}
              </p>
              <p className="mt-1 text-xs text-gray-500">{service.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative flex min-h-[70vh] items-center bg-white">
      {/* Subtle background gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,_rgba(0,151,254,0.06)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,_rgba(0,151,254,0.04)_0%,_transparent_50%)]" />
      </div>

      <div className="relative mx-auto flex max-w-7xl items-center px-6 py-20 lg:py-24">
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

          {/* Right: Slot-based conveyor belt */}
          <div className="relative hidden md:flex md:justify-center">
            <ConveyorBelt />
          </div>
        </div>
      </div>
    </section>
  );
}
