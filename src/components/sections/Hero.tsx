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
function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
function cl(v: number) { return Math.max(0, Math.min(1, v)); }

/*
 * 프레임 분석 결과 (840x608 영상):
 * - 카드 비율: 약 7:8 (가로:세로) — 거의 정사각형, 약간 세로가 김
 * - Row1(위): 3장, 상단+우측 잘림, 가장 작고 흐릿
 * - Row2(중간): 2장+우측잘림, 중간 크기
 * - Row3(아래): 3장, 하단+우측 잘림, 가장 크고 선명
 * - 아래 Row가 위 Row를 50%+ 겹침
 * - 컨베이어: 카드 동일 크기, 정사각형에 가까움
 */

const STAGE_W = 540;
const STAGE_H = 400;

interface Slot {
  x: number; y: number; w: number; h: number; op: number; z: number;
}

/* 그리드: 3-2-3 = 8개 배치, 나머지 2개 숨김 */
const GRID: Slot[] = [
  /* Row 1: 3장, 상단 잘림 (y가 음수), 작고 흐릿 */
  { x: 35,  y: -30,  w: 145, h: 165, op: 0.45, z: 1 },
  { x: 195, y: -25,  w: 145, h: 165, op: 0.50, z: 1 },
  { x: 355, y: -30,  w: 145, h: 165, op: 0.40, z: 1 },  /* 우측 잘림 */

  /* Row 2: 2장, 중간 크기 */
  { x: 95,  y: 75,  w: 175, h: 200, op: 0.75, z: 2 },
  { x: 290, y: 80,  w: 175, h: 200, op: 0.70, z: 2 },

  /* Row 3: 3장, 하단 잘림, 가장 크고 선명 */
  { x: -5,  y: 190, w: 195, h: 225, op: 1.0,  z: 3 },
  { x: 195, y: 195, w: 195, h: 225, op: 1.0,  z: 3 },
  { x: 390, y: 188, w: 195, h: 225, op: 0.85, z: 3 },  /* 우측 잘림 */
];

const HIDDEN: Slot = { x: 270, y: STAGE_H + 40, w: 195, h: 225, op: 0, z: 0 };
function g(i: number): Slot { return i < GRID.length ? GRID[i] : HIDDEN; }

/* 순환 후 2-3-2 그리드 (카드별 목적지) */
const GRID2: (Slot | null)[] = [
  /* 카드 0,1,2: 위로 퇴장 */
  { x: 35,  y: -220, w: 145, h: 165, op: 0, z: 0 },
  { x: 195, y: -220, w: 145, h: 165, op: 0, z: 0 },
  { x: 355, y: -220, w: 145, h: 165, op: 0, z: 0 },
  /* 카드 3,4: Row2 → 새 Row1 (2장, 작고 흐릿) */
  { x: 120, y: -30,  w: 145, h: 165, op: 0.45, z: 1 },
  { x: 290, y: -25,  w: 145, h: 165, op: 0.50, z: 1 },
  /* 카드 5,6,7: Row3 → 새 Row2 (3장, 중간) */
  { x: 35,  y: 75,   w: 175, h: 200, op: 0.75, z: 2 },
  { x: 210, y: 80,   w: 175, h: 200, op: 0.75, z: 2 },
  { x: 385, y: 75,   w: 175, h: 200, op: 0.65, z: 2 },
  /* 카드 8,9: 아래서 등장 → 새 Row3 (2장, 크고 선명) */
  { x: 80,  y: 190,  w: 195, h: 225, op: 1.0,  z: 3 },
  { x: 295, y: 195,  w: 195, h: 225, op: 1.0,  z: 3 },
];
function g2(i: number): Slot { return GRID2[i] || HIDDEN; }

/* 컨베이어: 정사각형에 가까운 카드 */
const CW = 210, CH = 240, CG = 14;

function CardAnimation() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const frame = useRef(0);
  const scroll = useRef(0);
  const raf = useRef(0);

  const tick = useCallback(() => {
    const FPS = 60, CYCLE = 13 * FPS;
    const P1  = 1.3 * FPS;   /* 3-2-3 하강 (1.5배 빠르게) */
    const P1B = 3.5 * FPS;   /* 행 순환: 3-2-3 → 2-3-2 */
    const P2  = 5.0 * FPS;   /* 일렬 전환 */
    const P3  = 9.5 * FPS;   /* 컨베이어 */

    frame.current = (frame.current + 1) % CYCLE;
    const f = frame.current;
    if (f === 0) scroll.current = 0;

    refs.current.forEach((el, i) => {
      if (!el) return;
      const s = g(i);
      const s2 = g2(i);
      let x = 0, y = 0, w = s.w, h = s.h, op = s.op, z = s.z;

      if (f <= P1) {
        /* Phase 1: 3-2-3 겹침 그리드 + 하강 */
        const d = (f / P1) * 18;
        x = s.x; y = s.y + d; w = s.w; h = s.h; op = s.op; z = s.z;

      } else if (f <= P1B) {
        /* Phase 1.5: 행 순환 3-2-3 → 2-3-2 */
        const t = easeInOutCubic(cl((f - P1) / (P1B - P1)));
        x = lerp(s.x, s2.x, t);
        y = lerp(s.y + 18, s2.y, t);
        w = lerp(s.w, s2.w, t);
        h = lerp(s.h, s2.h, t);
        op = lerp(s.op, s2.op, t);
        z = t < 0.5 ? s.z : s2.z;

      } else if (f <= P2) {
        /* Phase 2: 2-3-2 → 일렬 컨베이어 전환 */
        const t = easeInOutCubic(cl((f - P1B) / (P2 - P1B)));
        const cx = i * (CW + CG);
        const cy = (STAGE_H - CH) / 2;
        x = lerp(s2.x, cx, t);
        y = lerp(s2.y, cy, t);
        w = lerp(s2.w, CW, t);
        h = lerp(s2.h, CH, t);
        op = lerp(s2.op, 1, t);
        z = 10;

      } else if (f <= P3) {
        /* Phase 3: 수평 컨베이어 우→좌 */
        scroll.current += 0.55;
        const total = SERVICES.length * (CW + CG);
        let cx = i * (CW + CG) - scroll.current;
        while (cx < -CW - 10) cx += total;
        x = cx; y = (STAGE_H - CH) / 2; w = CW; h = CH; z = 10;
        /* 가장자리 페이드 */
        if (cx < -CW * 0.15) op = 0;
        else if (cx < 10) op = cl((cx + CW * 0.15) / (CW * 0.15 + 10));
        else if (cx > STAGE_W - CW * 0.85) op = cl((STAGE_W - cx) / (CW * 0.85));
        else op = 1;

      } else {
        /* Phase 4: 복귀 → 3-2-3 */
        const t = easeInOutCubic(cl((f - P3) / (CYCLE - P3)));
        const total = SERVICES.length * (CW + CG);
        let cx = i * (CW + CG) - scroll.current;
        while (cx < -CW - 10) cx += total;
        x = lerp(cx, s.x, t);
        y = lerp((STAGE_H - CH) / 2, s.y, t);
        w = lerp(CW, s.w, t);
        h = lerp(CH, s.h, t);
        op = lerp(1, s.op, t);
        z = Math.round(lerp(10, s.z, t));
        scroll.current *= (1 - t * 0.02);
      }

      el.style.cssText = `position:absolute;left:${x}px;top:${y}px;width:${w}px;height:${h}px;opacity:${cl(op)};z-index:${z};will-change:left,top,width,height,opacity;border-radius:16px;background:#fff;border:1px solid rgba(0,151,254,0.06);display:flex;flex-direction:column;overflow:hidden;box-shadow:0 ${4+z*2}px ${8+z*4}px rgba(0,0,0,${0.03+z*0.015})`;
    });

    raf.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [tick]);

  return (
    <>
      {SERVICES.map((svc, i) => (
        <div key={svc.title} ref={el => { refs.current[i] = el; }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 12px 0" }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: "#0097FE", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, flexShrink: 0, boxShadow: "0 2px 6px rgba(0,151,254,0.2)" }}>
              {svc.icon}
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#1a1a1a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{svc.title}</div>
          </div>
          <div style={{ fontSize: 10, color: "#888", padding: "4px 12px 8px" }}>{svc.desc}</div>
          {/* 카드 내부 장식: 그라데이션 영역 */}
          <div style={{ flex: 1, margin: "0 10px 10px", borderRadius: 10, background: "linear-gradient(135deg, rgba(0,151,254,0.06), rgba(0,151,254,0.12))" }} />
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
        @keyframes float-s { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
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
            <div className="pointer-events-none absolute z-40 rounded-xl border border-primary/10 bg-white px-3 py-1.5 text-xs font-bold text-gray-400 shadow-[0_8px_24px_rgba(0,0,0,0.05)]"
              style={{ top: 5, left: 0, animation: "float-s 3.5s ease-in-out infinite 0s" }}>こんにちは</div>
            <div className="pointer-events-none absolute z-40 rounded-xl border border-primary/10 bg-white px-3 py-1.5 text-xs font-bold text-gray-400 shadow-[0_8px_24px_rgba(0,0,0,0.05)]"
              style={{ bottom: 0, left: 0, animation: "float-s 3.8s ease-in-out infinite 0.5s" }}>¡Hola!</div>
            <div className="pointer-events-none absolute z-40 rounded-xl border border-primary/10 bg-white px-3 py-1.5 text-xs font-bold text-gray-400 shadow-[0_8px_24px_rgba(0,0,0,0.05)]"
              style={{ top: 5, right: 0, animation: "float-s 4s ease-in-out infinite 1s" }}>Thank you</div>
            <div className="pointer-events-none absolute z-40 rounded-xl border border-primary/10 bg-white px-3 py-1.5 text-xs font-bold text-gray-400 shadow-[0_8px_24px_rgba(0,0,0,0.05)]"
              style={{ bottom: 0, right: 0, animation: "float-s 3.6s ease-in-out infinite 1.5s" }}>안녕하세요</div>

            {/* 클리핑 영역: overflow hidden */}
            <div className="absolute overflow-hidden" style={{ top: 10, left: 40, width: 540, height: 400, borderRadius: 20 }}>
              <CardAnimation />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
