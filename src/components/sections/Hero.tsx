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

/* ── 그리드 Row 정의: 각 행의 실제 카드 크기가 다름 (scale 아님) ── */
const STAGE_W = 520;
const STAGE_H = 380;
const GAP_X = 8;

/* Row별 카드 실제 크기 */
const ROWS = [
  { count: 2, w: 90, h: 115, opacity: 0.5  },  /* 맨 위: 작고 흐릿 */
  { count: 2, w: 110, h: 140, opacity: 0.7  },  /* 중간 위 */
  { count: 3, w: 120, h: 155, opacity: 0.9  },  /* 중간 아래 */
  { count: 3, w: 120, h: 155, opacity: 1.0  },  /* 맨 아래: 하단 잘림 */
];

/* Row 간 Y 간격: 겹치도록 ROW_STEP < 카드 높이 */
const ROW_STEP = 80;
const GRID_START_Y = -20;

/* 수평 컨베이어 상수 */
const CONV_W = 140, CONV_H = 200, CONV_GAP = 12;

interface Slot {
  x: number; y: number; w: number; h: number; opacity: number; z: number; row: number; col: number;
}

function buildGrid(): Slot[] {
  const slots: Slot[] = [];
  let ci = 0;
  for (let ri = 0; ri < ROWS.length; ri++) {
    const r = ROWS[ri];
    const totalW = r.count * r.w + (r.count - 1) * GAP_X;
    const startX = (STAGE_W - totalW) / 2;
    for (let c = 0; c < r.count; c++) {
      if (ci >= SERVICES.length) break;
      slots.push({
        x: startX + c * (r.w + GAP_X),
        y: GRID_START_Y + ri * ROW_STEP,
        w: r.w, h: r.h,
        opacity: r.opacity,
        z: ri + 1,
        row: ri, col: c,
      });
      ci++;
    }
  }
  return slots;
}

function CardAnimation() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const frameRef = useRef(0);
  const convScrollRef = useRef(0);
  const rafRef = useRef(0);
  const gridSlots = useRef(buildGrid()).current;

  const tick = useCallback(() => {
    const FPS = 60, CYCLE = 12 * FPS; /* 12초 사이클 */
    const P1 = 2.5 * FPS;     /* 0~2.5s: 그리드 정지 + 느린 하강 */
    const P2 = 4.5 * FPS;     /* 2.5~4.5s: 수평 일렬로 전환 */
    const P3 = 9.0 * FPS;     /* 4.5~9s: 수평 컨베이어 */
    /* 9~12s: 그리드 복귀 */

    frameRef.current = (frameRef.current + 1) % CYCLE;
    const f = frameRef.current;
    if (f === 0) convScrollRef.current = 0;

    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const g = gridSlots[i];
      if (!g) return;

      let x = 0, y = 0, w = g.w, h = g.h, op = g.opacity, zIdx = g.z;

      if (f <= P1) {
        /* ── Phase 1: 겹침 그리드 + 전체 느린 하강 ── */
        const drift = (f / P1) * 20; /* 2.5초간 20px 하강 */
        x = g.x;
        y = g.y + drift;
        w = g.w; h = g.h;
        op = g.opacity;
        zIdx = g.z;

      } else if (f <= P2) {
        /* ── Phase 2: 그리드 → 수평 일렬 전환 ── */
        const t = easeInOutCubic(clamp01((f - P1) / (P2 - P1)));
        const convX = i * (CONV_W + CONV_GAP);
        const convY = (STAGE_H - CONV_H) / 2;

        x = lerp(g.x, convX, t);
        y = lerp(g.y + 20, convY, t);
        w = lerp(g.w, CONV_W, t);
        h = lerp(g.h, CONV_H, t);
        op = lerp(g.opacity, 1, t);
        zIdx = 10;

      } else if (f <= P3) {
        /* ── Phase 3: 수평 컨베이어 우→좌 ── */
        convScrollRef.current += 0.55;
        const total = SERVICES.length * (CONV_W + CONV_GAP);
        let cx = i * (CONV_W + CONV_GAP) - convScrollRef.current;
        while (cx < -CONV_W - 10) cx += total;

        x = cx;
        y = (STAGE_H - CONV_H) / 2;
        w = CONV_W; h = CONV_H;
        zIdx = 10;

        /* 양쪽 가장자리 페이드 */
        if (cx < -CONV_W * 0.2) op = 0;
        else if (cx < 10) op = clamp01((cx + CONV_W * 0.2) / (CONV_W * 0.2 + 10));
        else if (cx > STAGE_W - CONV_W * 0.8) op = clamp01((STAGE_W - cx) / (CONV_W * 0.8));
        else op = 1;

      } else {
        /* ── Phase 4: 복귀 → 겹침 그리드 ── */
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

      /* 적용: translate3d만, scale/rotate 절대 없음 */
      el.style.width = w + "px";
      el.style.height = h + "px";
      el.style.left = x + "px";
      el.style.top = y + "px";
      el.style.opacity = String(clamp01(op));
      el.style.zIndex = String(zIdx);
      el.style.boxShadow = `0 4px ${8 + (w / CONV_W) * 16}px rgba(0,0,0,${0.03 + (w / CONV_W) * 0.06})`;
    });

    rafRef.current = requestAnimationFrame(tick);
  }, [gridSlots]);

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
          className="absolute rounded-xl bg-white border border-primary/5 flex flex-col justify-between overflow-hidden"
          style={{ willChange: "left, top, width, height, opacity" }}
        >
          <div
            className="flex items-center justify-center bg-primary text-white shrink-0"
            style={{ width: 26, height: 26, borderRadius: 8, margin: "8px 8px 0", fontSize: 12, boxShadow: "0 2px 6px rgba(0,151,254,0.2)" }}
          >
            {s.icon}
          </div>
          <div className="px-2 pb-2 pt-1 min-w-0">
            <div className="font-bold text-foreground truncate" style={{ fontSize: 11 }}>{s.title}</div>
            <div className="text-muted truncate" style={{ fontSize: 9, marginTop: 1 }}>{s.desc}</div>
          </div>
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

          {/* 우측: 인삿말 + 카드 */}
          <div className="relative hidden lg:block" style={{ width: 620, height: 400 }}>
            {/* 인삿말 4개 */}
            <div className="pointer-events-none absolute z-40 rounded-xl border border-primary/10 bg-white px-4 py-2 text-xs font-bold text-gray-400 shadow-[0_10px_28px_rgba(0,0,0,0.05)]"
              style={{ top: 5, left: 0, animation: "floating-soft 3.5s ease-in-out infinite 0s" }}>こんにちは</div>
            <div className="pointer-events-none absolute z-40 rounded-xl border border-primary/10 bg-white px-4 py-2 text-xs font-bold text-gray-400 shadow-[0_10px_28px_rgba(0,0,0,0.05)]"
              style={{ bottom: 5, left: 0, animation: "floating-soft 3.8s ease-in-out infinite 0.5s" }}>¡Hola!</div>
            <div className="pointer-events-none absolute z-40 rounded-xl border border-primary/10 bg-white px-4 py-2 text-xs font-bold text-gray-400 shadow-[0_10px_28px_rgba(0,0,0,0.05)]"
              style={{ top: 5, right: 0, animation: "floating-soft 4s ease-in-out infinite 1s" }}>Thank you</div>
            <div className="pointer-events-none absolute z-40 rounded-xl border border-primary/10 bg-white px-4 py-2 text-xs font-bold text-gray-400 shadow-[0_10px_28px_rgba(0,0,0,0.05)]"
              style={{ bottom: 5, right: 0, animation: "floating-soft 3.6s ease-in-out infinite 1.5s" }}>안녕하세요</div>

            {/* overflow:hidden 클리핑 — 카드가 이 영역 밖으로 나가면 잘림 */}
            <div className="absolute overflow-hidden rounded-2xl" style={{ top: 10, left: 50, width: STAGE_W, height: STAGE_H }}>
              <CardAnimation />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
