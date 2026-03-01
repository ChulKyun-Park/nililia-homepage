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
function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

/*
 * 애니메이션 흐름 (영상 기준):
 * Phase 1 (0~2s):    3-2-3 겹침 그리드 정지
 * Phase 2 (2~5s):    행이 아래로 캐스캐이드 (위 행 퇴장, 아래서 새 행 등장) → 일렬로 전환
 * Phase 3 (5~8.5s):  수평 컨베이어 우→좌
 * Phase 4 (8.5~10s): 다시 3-2-3 그리드로 복귀
 */

function CardAnimation() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const frameRef = useRef(0);
  const convScrollRef = useRef(0);
  const rafRef = useRef(0);

  const STAGE_W = 520, STAGE_H = 380;
  const CARD_W = 120, CARD_H = 75;
  const CONV_W = 200, CONV_H = 150, CONV_GAP = 14;

  /* 3-2-3 겹침 그리드 슬롯 */
  const gridSlots = useMemo(() => {
    const GAP_X = 8;
    const ROW_STEP = 52; /* 카드 높이(75)보다 작아서 겹침 발생 */
    const rowDefs = [
      { count: 3, scale: 0.7, opacity: 0.55, z: 1 },
      { count: 2, scale: 0.85, opacity: 0.75, z: 2 },
      { count: 3, scale: 1.0, opacity: 1.0, z: 3 },
    ];
    /* 나머지 2장은 3번째 row 아래에 숨김 (순환용) */
    const slots: { x: number; y: number; scale: number; opacity: number; z: number; row: number }[] = [];
    let ci = 0;
    for (let ri = 0; ri < rowDefs.length; ri++) {
      const rd = rowDefs[ri];
      const sw = CARD_W * rd.scale;
      const sg = GAP_X * rd.scale;
      const totalW = rd.count * sw + (rd.count - 1) * sg;
      const startX = (STAGE_W - totalW) / 2;
      for (let c = 0; c < rd.count; c++) {
        if (ci >= 8) break;
        slots.push({
          x: startX + c * (sw + sg) + (sw - CARD_W) / 2,
          y: 30 + ri * ROW_STEP,
          scale: rd.scale,
          opacity: rd.opacity,
          z: rd.z,
          row: ri,
        });
        ci++;
      }
    }
    /* 나머지 카드 (9, 10번): 화면 아래 숨김 */
    for (let k = ci; k < SERVICES.length; k++) {
      slots.push({ x: STAGE_W / 2 - CARD_W / 2, y: STAGE_H + 50, scale: 1, opacity: 0, z: 0, row: 4 });
    }
    return slots;
  }, []);

  const tick = useCallback(() => {
    const FPS = 60, CYCLE = 10 * FPS;
    const P1_END = 2.0 * FPS;    /* 그리드 정지 */
    const P2_END = 4.5 * FPS;    /* 캐스캐이드 → 일렬 전환 */
    const P3_END = 8.5 * FPS;    /* 수평 컨베이어 */
    /* P3_END ~ CYCLE: 복귀 */

    frameRef.current = (frameRef.current + 1) % CYCLE;
    const f = frameRef.current;
    if (f === 0) convScrollRef.current = 0;

    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const g = gridSlots[i];
      let x = 0, y = 0, w = CARD_W, h = CARD_H, op = 1, sc = 1, zIdx = 10;

      if (f <= P1_END) {
        /* ── Phase 1: 3-2-3 겹침 그리드 정지 ── */
        x = g.x; y = g.y; w = CARD_W; h = CARD_H;
        sc = g.scale; op = g.opacity; zIdx = g.z;

      } else if (f <= P2_END) {
        /* ── Phase 2: 캐스캐이드 하강 → 일렬 전환 ── */
        const dur = P2_END - P1_END;
        const t = easeInOutCubic(clamp((f - P1_END) / dur, 0, 1));

        /* 그리드 위치에서 일렬 위치로 보간 */
        const convX = i * (CONV_W + CONV_GAP);
        const convY = (STAGE_H - CONV_H) / 2;

        /* 중간 단계: 먼저 아래로 내려가면서 확대 */
        const midY = g.y + 60 * t;
        const halfT = clamp(t * 2, 0, 1); /* 전반: 하강 */
        const halfT2 = clamp(t * 2 - 1, 0, 1); /* 후반: 일렬 정렬 */

        if (t < 0.5) {
          /* 전반: 아래로 캐스캐이드 + 확대 */
          x = lerp(g.x, STAGE_W / 2 - CARD_W / 2 + ((i % 3) - 1) * (CARD_W + 10), halfT);
          y = midY;
          w = CARD_W; h = CARD_H;
          sc = lerp(g.scale, 1.0, halfT);
          op = lerp(g.opacity, 1.0, halfT);
          zIdx = Math.round(lerp(g.z, 10, halfT));
        } else {
          /* 후반: 일렬로 정렬 */
          const fromX = STAGE_W / 2 - CARD_W / 2 + ((i % 3) - 1) * (CARD_W + 10);
          const fromY = g.y + 60 * 0.5;
          x = lerp(fromX, convX, halfT2);
          y = lerp(fromY, convY, halfT2);
          w = lerp(CARD_W, CONV_W, halfT2);
          h = lerp(CARD_H, CONV_H, halfT2);
          sc = 1; op = 1; zIdx = 10;
        }

      } else if (f <= P3_END) {
        /* ── Phase 3: 수평 컨베이어 우→좌 ── */
        convScrollRef.current += 0.6;
        const total = SERVICES.length * (CONV_W + CONV_GAP);
        let cx = i * (CONV_W + CONV_GAP) - convScrollRef.current;
        /* 무한 루프 */
        while (cx < -CONV_W - 20) cx += total;

        x = cx; y = (STAGE_H - CONV_H) / 2;
        w = CONV_W; h = CONV_H;
        sc = 1; zIdx = 10;

        /* 양쪽 가장자리 페이드 */
        if (cx < -CONV_W * 0.3) op = 0;
        else if (cx < 10) op = clamp((cx + CONV_W * 0.3) / (CONV_W * 0.3), 0, 1);
        else if (cx > STAGE_W - CONV_W - 10) op = clamp((STAGE_W - cx - CONV_W * 0.7) / (CONV_W * 0.3), 0, 1);
        else op = 1;

      } else {
        /* ── Phase 4: 복귀 → 3-2-3 그리드 ── */
        const dur = CYCLE - P3_END;
        const t = easeInOutCubic(clamp((f - P3_END) / dur, 0, 1));

        const total = SERVICES.length * (CONV_W + CONV_GAP);
        let cx = i * (CONV_W + CONV_GAP) - convScrollRef.current;
        while (cx < -CONV_W - 20) cx += total;

        x = lerp(cx, g.x, t);
        y = lerp((STAGE_H - CONV_H) / 2, g.y, t);
        w = lerp(CONV_W, CARD_W, t);
        h = lerp(CONV_H, CARD_H, t);
        sc = lerp(1, g.scale, t);
        op = lerp(1, g.opacity, t);
        zIdx = Math.round(lerp(10, g.z, t));
        convScrollRef.current *= (1 - t * 0.03);
      }

      el.style.width = w + "px";
      el.style.height = h + "px";
      el.style.transform = `translate3d(${x}px,${y}px,0) scale(${sc})`;
      el.style.opacity = String(clamp(op, 0, 1));
      el.style.zIndex = String(zIdx);

      const s = clamp((w - CARD_W) / (CONV_W - CARD_W), 0, 1);
      el.style.boxShadow = `0 ${3 + s * 10}px ${6 + s * 20}px rgba(0,0,0,${0.03 + s * 0.07})`;

      const icon = el.querySelector<HTMLElement>("[data-icon]");
      const title = el.querySelector<HTMLElement>("[data-title]");
      const desc = el.querySelector<HTMLElement>("[data-desc]");
      const fs = 1 + s * 0.4;
      if (icon) { icon.style.width = (28 * fs) + "px"; icon.style.height = (28 * fs) + "px"; icon.style.fontSize = (13 * fs) + "px"; icon.style.borderRadius = (8 * fs) + "px"; }
      if (title) title.style.fontSize = (11 * fs) + "px";
      if (desc) desc.style.fontSize = (9 * fs) + "px";
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
          style={{ willChange: "transform, opacity", backfaceVisibility: "hidden", transformOrigin: "center center" }}
        >
          <div
            data-icon
            className="flex items-center justify-center bg-primary text-white"
            style={{ width: 28, height: 28, borderRadius: 8, margin: "8px 8px 0", fontSize: 13, boxShadow: "0 2px 6px rgba(0,151,254,0.2)" }}
          >
            {s.icon}
          </div>
          <div className="px-2 pb-2 pt-1">
            <div data-title className="font-bold text-foreground" style={{ fontSize: 11 }}>{s.title}</div>
            <div data-desc className="text-muted" style={{ fontSize: 9, marginTop: 1 }}>{s.desc}</div>
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

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-6 lg:py-8">
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1fr_auto] lg:gap-12">
          {/* 좌측 텍스트 */}
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

          {/* 우측: 카드 + 인삿말 */}
          <div className="relative hidden lg:block" style={{ width: 640, height: 380 }}>
            {/* 인삿말: 좌상단 */}
            <div className="pointer-events-none absolute z-40 rounded-xl border border-primary/10 bg-white px-4 py-2 text-xs font-bold text-gray-400 shadow-[0_10px_28px_rgba(0,0,0,0.05)]"
              style={{ top: 0, left: -10, animation: "floating-soft 3.5s ease-in-out infinite 0s" }}>こんにちは</div>
            {/* 인삿말: 좌하단 */}
            <div className="pointer-events-none absolute z-40 rounded-xl border border-primary/10 bg-white px-4 py-2 text-xs font-bold text-gray-400 shadow-[0_10px_28px_rgba(0,0,0,0.05)]"
              style={{ bottom: 0, left: -10, animation: "floating-soft 3.8s ease-in-out infinite 0.5s" }}>¡Hola!</div>
            {/* 인삿말: 우상단 */}
            <div className="pointer-events-none absolute z-40 rounded-xl border border-primary/10 bg-white px-4 py-2 text-xs font-bold text-gray-400 shadow-[0_10px_28px_rgba(0,0,0,0.05)]"
              style={{ top: 0, right: -10, animation: "floating-soft 4s ease-in-out infinite 1s" }}>Thank you</div>
            {/* 인삿말: 우하단 */}
            <div className="pointer-events-none absolute z-40 rounded-xl border border-primary/10 bg-white px-4 py-2 text-xs font-bold text-gray-400 shadow-[0_10px_28px_rgba(0,0,0,0.05)]"
              style={{ bottom: 0, right: -10, animation: "floating-soft 3.6s ease-in-out infinite 1.5s" }}>안녕하세요</div>

            {/* 카드 스테이지: overflow hidden → 밖으로 나가면 잘림 */}
            <div className="absolute rounded-2xl overflow-hidden" style={{ top: 30, left: 50, width: 520, height: 320 }}>
              <CardAnimation />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
