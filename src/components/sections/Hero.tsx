"use client";

import { useEffect, useRef, useMemo, useCallback } from "react";
import Button from "@/components/ui/Button";

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
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const frameRef = useRef(0);
  const convScrollRef = useRef(0);
  const rafRef = useRef(0);

  /* 상수 */
  const CARD_W = 130, CARD_H = 80;
  const CONV_W = 240, CONV_H = 175, CONV_GAP = 18;
  const STAGE_W = 560, STAGE_H = 420;
  const CONV_Y = (STAGE_H - CONV_H) / 2;

  /* 그리드: 2-2-3-3, 겹침 배치 (Row 간격 = 카드높이의 60%) */
  const gridSlots = useMemo(() => {
    const GAP_X = 10;
    const ROW_STEP = CARD_H * 0.6; /* 겹침 핵심: 48px 간격 (80의 60%) */
    const rowDefs = [
      { count: 2, scale: 0.65, opacity: 0.5, z: 1 },
      { count: 2, scale: 0.80, opacity: 0.7, z: 2 },
      { count: 3, scale: 0.95, opacity: 0.9, z: 3 },
      { count: 3, scale: 1.00, opacity: 1.0, z: 4 },
    ];
    const slots: { x: number; y: number; col: number; row: number; scale: number; opacity: number; z: number }[] = [];
    let ci = 0;
    for (let ri = 0; ri < rowDefs.length; ri++) {
      const rd = rowDefs[ri];
      const scaledW = CARD_W * rd.scale;
      const scaledGap = GAP_X * rd.scale;
      const totalW = rd.count * scaledW + (rd.count - 1) * scaledGap;
      const startX = (STAGE_W - totalW) / 2;
      for (let c = 0; c < rd.count; c++) {
        if (ci >= SERVICES.length) break;
        slots.push({
          x: startX + c * (scaledW + scaledGap) + (scaledW - CARD_W) / 2,
          y: ri * ROW_STEP + 40,
          col: c,
          row: ri,
          scale: rd.scale,
          opacity: rd.opacity,
          z: rd.z,
        });
        ci++;
      }
    }
    return slots;
  }, []);

  const tick = useCallback(() => {
    const FPS = 60, CYCLE = 10 * FPS;
    /* 속도 조정: Phase2 빠르게(2.5s), Phase3 느리게 */
    const P1 = 1.2 * FPS;      /* 그리드 정지 */
    const P2 = 2.5 * FPS;      /* 캐스캐이드 끝 (1.3초만에 완료) */
    const P3 = 3.0 * FPS;      /* 수평 정렬 완료 */
    const P4S = 8.5 * FPS;     /* 복귀 시작 */

    frameRef.current = (frameRef.current + 1) % CYCLE;
    const f = frameRef.current;
    if (f === 0) convScrollRef.current = 0;

    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const g = gridSlots[i] || gridSlots[gridSlots.length - 1];
      const cX = i * (CONV_W + CONV_GAP);
      let x = 0, y = 0, w = CARD_W, h = CARD_H, op = 1, rot = 0, sc = 1, zIdx = 10;

      if (f <= P1) {
        /* Phase 1: 그리드 정지 — 겹침 + scale + opacity */
        x = g.x; y = g.y; w = CARD_W; h = CARD_H;
        sc = g.scale; op = g.opacity; zIdx = g.z;

      } else if (f <= P2) {
        /* Phase 2: 캐스캐이드 하강 + 확대 (1.3초) */
        const dur = P2 - P1;
        const delay = g.col * 0.06 + g.row * 0.04;
        const t = easeInOutCubic(clamp(((f - P1) / dur - delay) / (1 - delay), 0, 1));
        x = lerp(g.x, STAGE_W / 2 - CONV_W / 2 + ((i % 3) - 1) * 90, t);
        y = lerp(g.y, STAGE_H * 0.5 + Math.floor(i / 3) * 40, t);
        w = lerp(CARD_W, CONV_W * 0.7, t);
        h = lerp(CARD_H, CONV_H * 0.7, t);
        sc = lerp(g.scale, 1, t);
        op = lerp(g.opacity, 1, t);
        rot = Math.sin(t * Math.PI) * (i % 2 === 0 ? 3 : -3);
        zIdx = Math.round(lerp(g.z, 10, t));

      } else if (f <= P3) {
        /* Phase 2→3: 수평 한 줄 정렬 */
        const t = easeOutQuart((f - P2) / (P3 - P2));
        const fX = STAGE_W / 2 - CONV_W / 2 + ((i % 3) - 1) * 90;
        const fY = STAGE_H * 0.5 + Math.floor(i / 3) * 40;
        x = lerp(fX, cX - convScrollRef.current, t);
        y = lerp(fY, CONV_Y, t);
        w = lerp(CONV_W * 0.7, CONV_W, t);
        h = lerp(CONV_H * 0.7, CONV_H, t);
        sc = 1; op = 1; zIdx = 10;

      } else if (f <= P4S) {
        /* Phase 3: 수평 컨베이어 (느리게: 0.5) */
        convScrollRef.current += 0.5;
        const total = SERVICES.length * (CONV_W + CONV_GAP);
        let cx = cX - convScrollRef.current;
        while (cx < -CONV_W) cx += total;
        x = cx; y = CONV_Y; w = CONV_W; h = CONV_H;
        sc = 1; zIdx = 10;
        if (x < -40 || x > STAGE_W + 40) op = 0;
        else if (x < 0) op = (x + 40) / 40;
        else if (x > STAGE_W - CONV_W) op = clamp((STAGE_W + 40 - x - CONV_W) / 40, 0, 1);

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
        sc = lerp(1, g.scale, t);
        op = lerp(1, g.opacity, t);
        zIdx = Math.round(lerp(10, g.z, t));
        convScrollRef.current *= (1 - t * 0.04);
      }

      el.style.width = w + "px";
      el.style.height = h + "px";
      el.style.transform = `translate3d(${x}px,${y}px,0) rotate(${rot}deg) scale(${sc})`;
      el.style.opacity = String(op);
      el.style.zIndex = String(zIdx);

      const s = clamp((w - CARD_W) / (CONV_W - CARD_W), 0, 1);
      el.style.boxShadow = `0 ${4 + s * 14}px ${8 + s * 28}px rgba(0,0,0,${0.04 + s * 0.08})`;

      const icon = el.querySelector<HTMLElement>("[data-icon]");
      const title = el.querySelector<HTMLElement>("[data-title]");
      const desc = el.querySelector<HTMLElement>("[data-desc]");
      const fs = 1 + s * 0.5;
      if (icon) { icon.style.width = (32 * fs) + "px"; icon.style.height = (32 * fs) + "px"; icon.style.fontSize = (14 * fs) + "px"; icon.style.borderRadius = (10 * fs) + "px"; }
      if (title) title.style.fontSize = (12 * fs) + "px";
      if (desc) desc.style.fontSize = (9 * fs) + "px";
    });

    rafRef.current = requestAnimationFrame(tick);
  }, [gridSlots]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [tick]);

  return (
    <div className="absolute inset-0">
      {SERVICES.map((s, i) => (
        <div
          key={s.title}
          ref={(el) => { cardRefs.current[i] = el; }}
          className="absolute rounded-2xl bg-white border border-primary/5 flex flex-col justify-between overflow-hidden"
          style={{ willChange: "transform, opacity", backfaceVisibility: "hidden", transformOrigin: "center bottom" }}
        >
          <div
            data-icon
            className="flex items-center justify-center bg-primary text-white"
            style={{ width: 32, height: 32, borderRadius: 10, margin: "10px 10px 0", fontSize: 14, boxShadow: "0 2px 8px rgba(0,151,254,0.25)" }}
          >
            {s.icon}
          </div>
          <div className="px-2.5 pb-2.5 pt-1">
            <div data-title className="font-bold text-foreground" style={{ fontSize: 12 }}>{s.title}</div>
            <div data-desc className="text-muted" style={{ fontSize: 9, marginTop: 1 }}>{s.desc}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative bg-white overflow-visible">
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

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-4 pb-4 lg:pt-6 lg:pb-6">
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1fr_auto] lg:gap-12">
          <div className="max-w-xl">
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-[length:var(--font-size-hero-h1)] break-keep">
              여러분의 콘텐츠에<br />
              <span className="text-primary">날개를 달아줍니다</span>
            </h1>
            <p className="mt-5 max-w-lg text-[length:var(--font-size-hero-sub)] leading-relaxed text-muted break-keep">
              전문 번역과 현지화 서비스로 글로벌 시장 진출을 지원합니다.
            </p>
            <p className="mt-2 max-w-lg text-[length:var(--font-size-hero-sub)] leading-relaxed text-muted break-keep">
              AI 기술과 전문가의 노하우로 최상의 품질을 보장합니다.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/contact" variant="primary" className="px-8 py-4 text-[length:var(--font-size-cta-button)]">
                무료 상담 받기
              </Button>
              <Button href="/services" variant="outline" className="border-border px-8 py-4 text-[length:var(--font-size-cta-button)] text-foreground hover:bg-surface">
                서비스 알아보기
              </Button>
            </div>
          </div>

          <div className="relative hidden lg:block" style={{ width: 560, height: 420 }}>
            <div className="pointer-events-none absolute z-30 rounded-xl border border-primary/10 bg-white px-4 py-2 text-sm font-bold text-gray-500 shadow-[0_12px_32px_rgba(0,0,0,0.06)]"
              style={{ top: 10, left: -80, animation: "floating-soft 3.5s ease-in-out infinite 0s" }}>こんにちは</div>
            <div className="pointer-events-none absolute z-30 rounded-xl border border-primary/10 bg-white px-4 py-2 text-sm font-bold text-gray-500 shadow-[0_12px_32px_rgba(0,0,0,0.06)]"
              style={{ bottom: 20, left: -60, animation: "floating-soft 3.8s ease-in-out infinite 0.5s" }}>¡Hola!</div>
            <div className="pointer-events-none absolute z-30 rounded-xl border border-primary/10 bg-white px-4 py-2 text-sm font-bold text-gray-500 shadow-[0_12px_32px_rgba(0,0,0,0.06)]"
              style={{ top: 15, right: -70, animation: "floating-soft 4s ease-in-out infinite 1s" }}>Thank you</div>
            <div className="pointer-events-none absolute z-30 rounded-xl border border-primary/10 bg-white px-4 py-2 text-sm font-bold text-gray-500 shadow-[0_12px_32px_rgba(0,0,0,0.06)]"
              style={{ bottom: 25, right: -50, animation: "floating-soft 3.6s ease-in-out infinite 1.5s" }}>안녕하세요</div>

            <CardAnimation />
          </div>
        </div>
      </div>
    </section>
  );
}
