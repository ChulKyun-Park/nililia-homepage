"use client";

import { useEffect, useRef, useMemo, useCallback } from "react";
import Button from "@/components/ui/Button";

/* ── 서비스 카드 데이터 ── */
const SERVICES = [
  { icon: "📖", title: "웹소설 번역", desc: "콘텐츠 현지화" },
  { icon: "🖼️", title: "웹툰 번역", desc: "만화 현지화" },
  { icon: "🎮", title: "게임 번역", desc: "게임 현지화" },
  { icon: "🤖", title: "AI 번역·더빙", desc: "AI 기술 활용" },
  { icon: "✏️", title: "MTPE", desc: "기계번역 후편집" },
  { icon: "▶️", title: "영상 번역", desc: "자막 & 더빙" },
  { icon: "📄", title: "문서 번역", desc: "전문 번역" },
  { icon: "🏢", title: "기업 맞춤 번역", desc: "맞춤형 솔루션" },
  { icon: "🌐", title: "홈페이지 현지화", desc: "웹사이트 최적화" },
  { icon: "📱", title: "앱 현지화", desc: "모바일 최적화" },
];

/* ── 수학 유틸 ── */
function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
function easeOutQuart(t: number) {
  return 1 - Math.pow(1 - t, 4);
}
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

/* ── 카드 애니메이션 ── */
function CardAnimation() {
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const frameRef = useRef(0);
  const convScrollRef = useRef(0);
  const rafRef = useRef(0);

  /* 상수 */
  const CARD_W = 130, CARD_H = 160;
  const CONV_W = 280, CONV_H = 350, CONV_GAP = 20;
  const STAGE_W = 560, STAGE_H = 500;
  const CONV_Y = (STAGE_H - CONV_H) / 2;

  /* 그리드 슬롯: 2-3-2-3 */
  const gridSlots = useMemo(() => {
    const GAP_X = 12, GAP_Y = 10;
    const rows = [
      { count: 2, y: 0 },
      { count: 3, y: CARD_H + GAP_Y },
      { count: 2, y: (CARD_H + GAP_Y) * 2 },
      { count: 3, y: (CARD_H + GAP_Y) * 3 },
    ];
    const slots: { x: number; y: number; col: number; row: number }[] = [];
    let ci = 0;
    for (let ri = 0; ri < rows.length; ri++) {
      const row = rows[ri];
      const totalW = row.count * CARD_W + (row.count - 1) * GAP_X;
      const startX = (STAGE_W - totalW) / 2;
      for (let c = 0; c < row.count; c++) {
        if (ci >= SERVICES.length) break;
        slots.push({ x: startX + c * (CARD_W + GAP_X), y: row.y, col: c, row: ri });
        ci++;
      }
    }
    return slots;
  }, []);

  const tick = useCallback(() => {
    const FPS = 60, CYCLE = 10 * FPS;
    const P1 = 1.5 * FPS;
    const P2 = 4.0 * FPS;
    const P3 = 4.5 * FPS;
    const P4S = 8.5 * FPS;

    frameRef.current = (frameRef.current + 1) % CYCLE;
    const f = frameRef.current;
    if (f === 0) convScrollRef.current = 0;

    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const g = gridSlots[i] || gridSlots[gridSlots.length - 1];
      const cX = i * (CONV_W + CONV_GAP);
      let x = 0, y = 0, w = CARD_W, h = CARD_H, op = 1, rot = 0;

      if (f <= P1) {
        /* Phase 1: 그리드 정지 */
        x = g.x; y = g.y; w = CARD_W; h = CARD_H;
      } else if (f <= P2) {
        /* Phase 2: 캐스캐이드 하강 + 확대 */
        const dur = P2 - P1;
        const delay = g.col * 0.08 + g.row * 0.06;
        const t = easeInOutCubic(clamp(((f - P1) / dur - delay) / (1 - delay), 0, 1));
        x = lerp(g.x, STAGE_W / 2 - CONV_W / 2 + ((i % 3) - 1) * 100, t);
        y = lerp(g.y, STAGE_H * 0.55 + Math.floor(i / 3) * 50, t);
        w = lerp(CARD_W, CONV_W * 0.7, t);
        h = lerp(CARD_H, CONV_H * 0.7, t);
        rot = Math.sin(t * Math.PI) * (i % 2 === 0 ? 3 : -3);
      } else if (f <= P3) {
        /* Phase 2→3 전환: 수평 한 줄 정렬 */
        const t = easeOutQuart((f - P2) / (P3 - P2));
        const fX = STAGE_W / 2 - CONV_W / 2 + ((i % 3) - 1) * 100;
        const fY = STAGE_H * 0.55 + Math.floor(i / 3) * 50;
        x = lerp(fX, cX - convScrollRef.current, t);
        y = lerp(fY, CONV_Y, t);
        w = lerp(CONV_W * 0.7, CONV_W, t);
        h = lerp(CONV_H * 0.7, CONV_H, t);
      } else if (f <= P4S) {
        /* Phase 3: 수평 컨베이어 */
        convScrollRef.current += 1.2;
        const total = SERVICES.length * (CONV_W + CONV_GAP);
        let cx = cX - convScrollRef.current;
        while (cx < -CONV_W) cx += total;
        x = cx; y = CONV_Y; w = CONV_W; h = CONV_H;
        if (x < -60 || x > STAGE_W + 60) op = 0;
        else if (x < 0) op = (x + 60) / 60;
        else if (x > STAGE_W - CONV_W) op = clamp((STAGE_W + 60 - x - CONV_W) / 60, 0, 1);
      } else {
        /* Phase 4: 축소 → 그리드 복귀 */
        const t = easeInOutCubic((f - P4S) / (CYCLE - P4S));
        const total = SERVICES.length * (CONV_W + CONV_GAP);
        let cx = cX - convScrollRef.current;
        while (cx < -CONV_W) cx += total;
        x = lerp(cx, g.x, t);
        y = lerp(CONV_Y, g.y, t);
        w = lerp(CONV_W, CARD_W, t);
        h = lerp(CONV_H, CARD_H, t);
        convScrollRef.current *= (1 - t * 0.04);
      }

      /* 적용 */
      el.style.width = w + "px";
      el.style.height = h + "px";
      el.style.transform = `translate3d(${x}px,${y}px,0) rotate(${rot}deg)`;
      el.style.opacity = String(op);

      const s = clamp((w - CARD_W) / (CONV_W - CARD_W), 0, 1);
      el.style.boxShadow = `0 ${4 + s * 14}px ${8 + s * 28}px rgba(0,0,0,${0.04 + s * 0.08})`;

      /* 내부 요소 스케일 */
      const icon = el.querySelector<HTMLElement>("[data-icon]");
      const title = el.querySelector<HTMLElement>("[data-title]");
      const desc = el.querySelector<HTMLElement>("[data-desc]");
      const fs = 1 + s * 0.5;
      if (icon) { icon.style.width = (36 * fs) + "px"; icon.style.height = (36 * fs) + "px"; icon.style.fontSize = (16 * fs) + "px"; icon.style.borderRadius = (12 * fs) + "px"; }
      if (title) title.style.fontSize = (13 * fs) + "px";
      if (desc) desc.style.fontSize = (10 * fs) + "px";
    });

    rafRef.current = requestAnimationFrame(tick);
  }, [gridSlots]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [tick]);

  return (
    <div ref={stageRef} className="relative hidden lg:block" style={{ width: 560, height: 500 }}>
      {SERVICES.map((s, i) => (
        <div
          key={s.title}
          ref={(el) => { cardRefs.current[i] = el; }}
          className="absolute rounded-2xl bg-white border border-primary/5 flex flex-col justify-between"
          style={{ willChange: "transform, opacity", backfaceVisibility: "hidden" }}
        >
          <div
            data-icon
            className="flex items-center justify-center bg-primary text-white"
            style={{ width: 36, height: 36, borderRadius: 12, margin: "14px 14px 0", fontSize: 16, boxShadow: "0 3px 10px rgba(0,151,254,0.25)" }}
          >
            {s.icon}
          </div>
          <div className="px-3.5 pb-3.5 pt-2.5">
            <div data-title className="font-bold text-foreground" style={{ fontSize: 13 }}>{s.title}</div>
            <div data-desc className="text-muted" style={{ fontSize: 10, marginTop: 2 }}>{s.desc}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Hero Section ── */
export default function Hero() {
  return (
    <section className="relative bg-white overflow-visible">
      {/* 배경 그라디언트 */}
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

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-0 pb-0 lg:pb-0">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[1fr_auto] lg:gap-16" style={{ minHeight: "calc(100vh - 80px)" }}>
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
              <Button href="/contact" variant="primary" className="px-8 py-4 text-[length:var(--font-size-cta-button)]">
                무료 상담 받기
              </Button>
              <Button href="/services" variant="outline" className="border-border px-8 py-4 text-[length:var(--font-size-cta-button)] text-foreground hover:bg-surface">
                서비스 알아보기
              </Button>
            </div>
          </div>

          {/* Right: 카드 애니메이션 + 인삿말 */}
          <div className="relative hidden lg:block" style={{ width: 560, height: 500 }}>
            {/* 인삿말: 좌상단 */}
            <div
              className="pointer-events-none absolute z-30 rounded-xl border border-primary/10 bg-white px-5 py-2.5 text-sm font-bold text-gray-500 shadow-[0_16px_40px_rgba(0,0,0,0.06)]"
              style={{ top: 20, left: -90, animation: "floating-soft 3.5s ease-in-out infinite 0s" }}
            >
              こんにちは
            </div>
            {/* 인삿말: 좌하단 */}
            <div
              className="pointer-events-none absolute z-30 rounded-xl border border-primary/10 bg-white px-5 py-2.5 text-sm font-bold text-gray-500 shadow-[0_16px_40px_rgba(0,0,0,0.06)]"
              style={{ bottom: 40, left: -70, animation: "floating-soft 3.8s ease-in-out infinite 0.5s" }}
            >
              ¡Hola!
            </div>
            {/* 인삿말: 우상단 */}
            <div
              className="pointer-events-none absolute z-30 rounded-xl border border-primary/10 bg-white px-5 py-2.5 text-sm font-bold text-gray-500 shadow-[0_16px_40px_rgba(0,0,0,0.06)]"
              style={{ top: 30, right: -80, animation: "floating-soft 4s ease-in-out infinite 1s" }}
            >
              Thank you
            </div>
            {/* 인삿말: 우하단 */}
            <div
              className="pointer-events-none absolute z-30 rounded-xl border border-primary/10 bg-white px-5 py-2.5 text-sm font-bold text-gray-500 shadow-[0_16px_40px_rgba(0,0,0,0.06)]"
              style={{ bottom: 50, right: -60, animation: "floating-soft 3.6s ease-in-out infinite 1.5s" }}
            >
              안녕하세요
            </div>

            {/* 카드 애니메이션 — 배경 없음, 카드만 떠다님 */}
            <CardAnimation />
          </div>
        </div>
      </div>
    </section>
  );
}
