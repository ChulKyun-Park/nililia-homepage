"use client";

import { useEffect, useRef, useCallback } from "react";
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
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}

/*
 * 영상 분석 결과:
 * - 카드는 가로 넓은 직사각형 (약 5:4 비율)
 * - Row 1 (위): 2장 + 우측 잘림, 상단 잘림, 작고 흐릿
 * - Row 2 (중간): 2장 + 우측 잘림, 중간 크기
 * - Row 3 (아래): 2장 + 우측 잘림, 가장 크고 선명, 하단 잘림
 * - 카드가 프레임 밖으로 잘려 꽉 찬 느낌
 * - 겹침 50% 이상
 */

const STAGE_W = 540;
const STAGE_H = 400;

interface Slot {
  x: number; y: number; w: number; h: number; opacity: number; z: number;
}

/* 영상 기준 그리드: 큰 카드, 강한 겹침, 프레임 밖 잘림 */
const GRID: Slot[] = [
  /* Row 1 (위): 3장 — 작고 흐릿, 상단 잘림 */
  { x: 20,  y: -40,  w: 210, h: 170, opacity: 0.45, z: 1 },
  { x: 200, y: -30,  w: 200, h: 160, opacity: 0.50, z: 1 },
  { x: 380, y: -35,  w: 210, h: 170, opacity: 0.40, z: 1 },  /* 우측 잘림 */

  /* Row 2 (중간): 2장 — 중간 크기 */
  { x: 80,  y: 85,   w: 240, h: 195, opacity: 0.75, z: 2 },
  { x: 310, y: 90,   w: 230, h: 190, opacity: 0.70, z: 2 },

  /* Row 3 (아래): 3장 — 가장 크고 선명, 하단 잘림 */
  { x: -15, y: 220,  w: 260, h: 215, opacity: 1.0,  z: 3 },
  { x: 210, y: 225,  w: 250, h: 210, opacity: 1.0,  z: 3 },
  { x: 430, y: 215,  w: 260, h: 220, opacity: 0.90, z: 3 },  /* 우측 잘림 */
];

/* 나머지 2장: 숨김 */
const HIDDEN: Slot = { x: 270, y: STAGE_H + 50, w: 250, h: 210, opacity: 0, z: 0 };

function getSlot(i: number): Slot {
  return i < GRID.length ? GRID[i] : HIDDEN;
}

/* 컨베이어 */
const CONV_W = 260, CONV_H = 220, CONV_GAP = 16;

function CardAnimation() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const frameRef = useRef(0);
  const convScrollRef = useRef(0);
  const rafRef = useRef(0);

  const tick = useCallback(() => {
    const FPS = 60, CYCLE = 12 * FPS;
    const P1 = 2.5 * FPS;
    const P2 = 4.5 * FPS;
    const P3 = 9.0 * FPS;

    frameRef.current = (frameRef.current + 1) % CYCLE;
    const f = frameRef.current;
    if (f === 0) convScrollRef.current = 0;

    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const g = getSlot(i);
      let x = 0, y = 0, w = g.w, h = g.h, op = g.opacity, zIdx = g.z;

      if (f <= P1) {
        /* Phase 1: 겹침 그리드 + 느린 하강 */
        const drift = (f / P1) * 15;
        x = g.x; y = g.y + drift;
        w = g.w; h = g.h;
        op = g.opacity; zIdx = g.z;

      } else if (f <= P2) {
        /* Phase 2: 수평 일렬 전환 */
        const t = easeInOutCubic(clamp01((f - P1) / (P2 - P1)));
        const cX = i * (CONV_W + CONV_GAP);
        const cY = (STAGE_H - CONV_H) / 2;
        x = lerp(g.x, cX, t);
        y = lerp(g.y + 15, cY, t);
        w = lerp(g.w, CONV_W, t);
        h = lerp(g.h, CONV_H, t);
        op = lerp(g.opacity, 1, t);
        zIdx = 10;

      } else if (f <= P3) {
        /* Phase 3: 수평 컨베이어 우→좌 */
        convScrollRef.current += 0.6;
        const total = SERVICES.length * (CONV_W + CONV_GAP);
        let cx = i * (CONV_W + CONV_GAP) - convScrollRef.current;
        while (cx < -CONV_W - 10) cx += total;
        x = cx; y = (STAGE_H - CONV_H) / 2;
        w = CONV_W; h = CONV_H; zIdx = 10;
        if (cx < -CONV_W * 0.2) op = 0;
        else if (cx < 10) op = clamp01((cx + CONV_W * 0.2) / (CONV_W * 0.2 + 10));
        else if (cx > STAGE_W - CONV_W * 0.8) op = clamp01((STAGE_W - cx) / (CONV_W * 0.8));
        else op = 1;

      } else {
        /* Phase 4: 복귀 */
        const t = easeInOutCubic(clamp01((f - P3) / (CYCLE - P3)));
        const total = SERVICES.length * (CONV_W + CONV_GAP);
        let cx = i * (CONV_W + CONV_GAP) - convScrollRef.current;
        while (cx < -CONV_W - 10) cx += total;
        x = lerp(cx, g.x, t);
        y = lerp((STAGE_H - CONV_H) / 2, g.y, t);
        w = lerp(CONV_W, g.w, t);
        h = lerp(CONV_H, g.h, t);
        op = lerp(1, g.opacity, t);
        zIdx = Math.round(lerp(10, g.z, t));
        convScrollRef.current *= (1 - t * 0.02);
      }

      el.style.width = w + "px";
      el.style.height = h + "px";
      el.style.left = x + "px";
      el.style.top = y + "px";
      el.style.opacity = String(clamp01(op));
      el.style.zIndex = String(zIdx);
      el.style.boxShadow = `0 6px ${12 + zIdx * 4}px rgba(0,0,0,${0.04 + zIdx * 0.02})`;
    });

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [tick]);

  return (
    <>
      {SERVICES.map((s, i) => (
        <div
          key={s.title}
          ref={(el) => { cardRefs.current[i] = el; }}
          className="absolute rounded-2xl bg-white border border-gray-100 flex flex-col overflow-hidden"
          style={{ willChange: "left, top, width, height, opacity" }}
        >
          <div className="flex items-center gap-2 p-3 pb-0">
            <div className="flex items-center justify-center bg-primary text-white shrink-0"
              style={{ width: 32, height: 32, borderRadius: 10, fontSize: 15, boxShadow: "0 2px 8px rgba(0,151,254,0.2)" }}>
              {s.icon}
            </div>
            <div className="font-bold text-foreground truncate" style={{ fontSize: 13 }}>{s.title}</div>
          </div>
          <div className="px-3 pb-3 pt-1">
            <div className="text-muted" style={{ fontSize: 11 }}>{s.desc}</div>
          </div>
          {/* 카드 내부 장식 영역 */}
          <div className="flex-1 mx-3 mb-3 rounded-lg bg-gradient-to-br from-primary/5 to-primary/10" />
        </div>
      ))}
    </>
  );
}

export default function Hero() {
  return (
    <section className="relative bg-white">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,_rgba(0,151,254,0.06)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,_rgba(0,151,254,0.04)_0%,_transparent_50%)]" />
      </div>

      <style>{`
        @keyframes floating-soft {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-4 lg:py-6">
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1fr_auto] lg:gap-10">
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

          <div className="relative hidden lg:block" style={{ width: 620, height: 420 }}>
            {/* 인삿말 */}
            <div className="pointer-events-none absolute z-40 rounded-xl border border-primary/10 bg-white px-4 py-2 text-xs font-bold text-gray-400 shadow-[0_10px_28px_rgba(0,0,0,0.05)]"
              style={{ top: 5, left: -5, animation: "floating-soft 3.5s ease-in-out infinite 0s" }}>こんにちは</div>
            <div className="pointer-events-none absolute z-40 rounded-xl border border-primary/10 bg-white px-4 py-2 text-xs font-bold text-gray-400 shadow-[0_10px_28px_rgba(0,0,0,0.05)]"
              style={{ bottom: 5, left: -5, animation: "floating-soft 3.8s ease-in-out infinite 0.5s" }}>¡Hola!</div>
            <div className="pointer-events-none absolute z-40 rounded-xl border border-primary/10 bg-white px-4 py-2 text-xs font-bold text-gray-400 shadow-[0_10px_28px_rgba(0,0,0,0.05)]"
              style={{ top: 5, right: -5, animation: "floating-soft 4s ease-in-out infinite 1s" }}>Thank you</div>
            <div className="pointer-events-none absolute z-40 rounded-xl border border-primary/10 bg-white px-4 py-2 text-xs font-bold text-gray-400 shadow-[0_10px_28px_rgba(0,0,0,0.05)]"
              style={{ bottom: 5, right: -5, animation: "floating-soft 3.6s ease-in-out infinite 1.5s" }}>안녕하세요</div>

            {/* overflow:hidden 클리핑 */}
            <div className="absolute overflow-hidden rounded-2xl" style={{ top: 15, left: 40, width: 540, height: 400 }}>
              <CardAnimation />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
