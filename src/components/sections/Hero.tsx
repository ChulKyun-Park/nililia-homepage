"use client";

import { useEffect, useRef, useCallback } from "react";
import Button from "@/components/ui/Button";

/*
  카드 순서 (확정):
  0: 영상 번역      1: 문서 번역      2: 기업 맞춤 번역   ← 초기 Row3 (하단, 크고 선명)
  3: 홈페이지 현지화  4: 앱 현지화                        ← 초기 Row2 (중간)
  5: 웹소설 번역     6: 웹툰 번역      7: 게임 번역       ← 초기 Row1 (상단, 작고 흐릿)
  8: MTPE           9: AI 번역·더빙                      ← 숨김 (위에서 대기)
*/
const SERVICES = [
  { icon: "▶️", title: "영상 번역", desc: "자막 & 더빙" },
  { icon: "📄", title: "문서 번역", desc: "전문 번역" },
  { icon: "🏢", title: "기업 맞춤 번역", desc: "맞춤형 솔루션" },
  { icon: "🌐", title: "홈페이지 현지화", desc: "웹사이트 최적화" },
  { icon: "📱", title: "앱 현지화", desc: "모바일 최적화" },
  { icon: "📖", title: "웹소설 번역", desc: "콘텐츠 현지화" },
  { icon: "🖼️", title: "웹툰 번역", desc: "만화 현지화" },
  { icon: "🎮", title: "게임 번역", desc: "게임 현지화" },
  { icon: "✏️", title: "MTPE", desc: "기계번역 후편집" },
  { icon: "🤖", title: "AI 번역·더빙", desc: "AI 기술 활용" },
];

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
function cl(v: number) { return Math.max(0, Math.min(1, v)); }

const STAGE_W = 540;
const STAGE_H = 400;

interface Slot {
  x: number; y: number; w: number; h: number; op: number; z: number;
}

/*
 * GRID A: 초기 3-2-3 (입체 겹침)
 * Row1(top3, z:1): 카드5,6,7 — 작고 흐릿
 * Row2(mid2, z:2): 카드3,4 — 중간
 * Row3(bot3, z:3): 카드0,1,2 — 크고 선명
 */
const A: Slot[] = [
  { x: -5,  y: 190, w: 195, h: 225, op: 1.0,  z: 3 },
  { x: 195, y: 195, w: 195, h: 225, op: 1.0,  z: 3 },
  { x: 390, y: 188, w: 195, h: 225, op: 0.85, z: 3 },
  { x: 95,  y: 75,  w: 175, h: 200, op: 0.75, z: 2 },
  { x: 290, y: 80,  w: 175, h: 200, op: 0.70, z: 2 },
  { x: 35,  y: -30, w: 145, h: 165, op: 0.45, z: 1 },
  { x: 195, y: -25, w: 145, h: 165, op: 0.50, z: 1 },
  { x: 355, y: -30, w: 145, h: 165, op: 0.40, z: 1 },
  { x: 120, y: -220, w: 145, h: 165, op: 0, z: 0 },
  { x: 290, y: -220, w: 145, h: 165, op: 0, z: 0 },
];

/*
 * GRID B: 323→232 결과
 * 하단3(카드0,1,2) 아래로 퇴장 / 카드8,9 위에서 진입
 * Row1(top2): 카드8,9 / Row2(mid3): 카드5,6,7 / Row3(bot2): 카드3,4
 */
const B: Slot[] = [
  { x: -5,  y: STAGE_H + 40, w: 195, h: 225, op: 0, z: 0 },
  { x: 195, y: STAGE_H + 40, w: 195, h: 225, op: 0, z: 0 },
  { x: 390, y: STAGE_H + 40, w: 195, h: 225, op: 0, z: 0 },
  { x: 80,  y: 190, w: 195, h: 225, op: 1.0, z: 3 },
  { x: 295, y: 195, w: 195, h: 225, op: 1.0, z: 3 },
  { x: 35,  y: 75,  w: 175, h: 200, op: 0.75, z: 2 },
  { x: 210, y: 80,  w: 175, h: 200, op: 0.75, z: 2 },
  { x: 385, y: 75,  w: 175, h: 200, op: 0.65, z: 2 },
  { x: 120, y: -30, w: 145, h: 165, op: 0.45, z: 1 },
  { x: 290, y: -25, w: 145, h: 165, op: 0.50, z: 1 },
];

/*
 * GRID C: 232→323 결과
 * 하단2(카드3,4) 아래로 퇴장 / 카드0,1,2 위에서 재진입
 * Row1(top3): 카드0,1,2 / Row2(mid2): 카드8,9 / Row3(bot3): 카드5,6,7
 */
const C: Slot[] = [
  { x: 35,  y: -30,  w: 145, h: 165, op: 0.45, z: 1 },
  { x: 195, y: -25,  w: 145, h: 165, op: 0.50, z: 1 },
  { x: 355, y: -30,  w: 145, h: 165, op: 0.40, z: 1 },
  { x: 80,  y: STAGE_H + 40, w: 195, h: 225, op: 0, z: 0 },
  { x: 295, y: STAGE_H + 40, w: 195, h: 225, op: 0, z: 0 },
  { x: -5,  y: 190, w: 195, h: 225, op: 1.0,  z: 3 },
  { x: 195, y: 195, w: 195, h: 225, op: 1.0,  z: 3 },
  { x: 390, y: 188, w: 195, h: 225, op: 0.85, z: 3 },
  { x: 95,  y: 75,  w: 175, h: 200, op: 0.75, z: 2 },
  { x: 290, y: 80,  w: 175, h: 200, op: 0.70, z: 2 },
];

const CW = 210, CH = 240, CG = 14;

function CardAnimation() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const frame = useRef(0);
  const scroll = useRef(0);
  const raf = useRef(0);

  const tick = useCallback(() => {
    const FPS = 60, CYCLE = 16 * FPS;
    const T1 = 0.9 * FPS;
    const T2 = 2.8 * FPS;
    const T3 = 3.8 * FPS;
    const T4 = 5.7 * FPS;
    const T5 = 6.7 * FPS;
    const T6 = 8.2 * FPS;
    const T7 = 12.5 * FPS;

    frame.current = (frame.current + 1) % CYCLE;
    const f = frame.current;
    if (f === 0) scroll.current = 0;

    refs.current.forEach((el, i) => {
      if (!el) return;
      const a = A[i], b = B[i], c = C[i];
      let x = 0, y = 0, w = a.w, h = a.h, op = a.op, z = a.z;

      if (f <= T1) {
        const drift = (f / T1) * 18;
        x = a.x; y = a.y + drift; w = a.w; h = a.h; op = a.op; z = a.z;

      } else if (f <= T2) {
        const t = easeInOutCubic(cl((f - T1) / (T2 - T1)));
        x = lerp(a.x, b.x, t);
        y = lerp(a.y + 18, b.y, t);
        w = lerp(a.w, b.w, t);
        h = lerp(a.h, b.h, t);
        op = lerp(a.op, b.op, t);
        z = t < 0.5 ? a.z : b.z;

      } else if (f <= T3) {
        x = b.x; y = b.y; w = b.w; h = b.h; op = b.op; z = b.z;

      } else if (f <= T4) {
        const t = easeInOutCubic(cl((f - T3) / (T4 - T3)));
        x = lerp(b.x, c.x, t);
        y = lerp(b.y, c.y, t);
        w = lerp(b.w, c.w, t);
        h = lerp(b.h, c.h, t);
        op = lerp(b.op, c.op, t);
        z = t < 0.5 ? b.z : c.z;

      } else if (f <= T5) {
        x = c.x; y = c.y; w = c.w; h = c.h; op = c.op; z = c.z;

      } else if (f <= T6) {
        const t = easeInOutCubic(cl((f - T5) / (T6 - T5)));
        const cx = i * (CW + CG);
        const cy = (STAGE_H - CH) / 2;
        x = lerp(c.x, cx, t); y = lerp(c.y, cy, t);
        w = lerp(c.w, CW, t); h = lerp(c.h, CH, t);
        op = lerp(c.op, 1, t); z = 10;

      } else if (f <= T7) {
        scroll.current += 0.55;
        const total = SERVICES.length * (CW + CG);
        let cx = i * (CW + CG) - scroll.current;
        while (cx < -CW - 10) cx += total;
        x = cx; y = (STAGE_H - CH) / 2; w = CW; h = CH; z = 10;
        if (cx < -CW * 0.15) op = 0;
        else if (cx < 10) op = cl((cx + CW * 0.15) / (CW * 0.15 + 10));
        else if (cx > STAGE_W - CW * 0.85) op = cl((STAGE_W - cx) / (CW * 0.85));
        else op = 1;

      } else {
        const t = easeInOutCubic(cl((f - T7) / (CYCLE - T7)));
        const total = SERVICES.length * (CW + CG);
        let cx = i * (CW + CG) - scroll.current;
        while (cx < -CW - 10) cx += total;
        x = lerp(cx, a.x, t);
        y = lerp((STAGE_H - CH) / 2, a.y, t);
        w = lerp(CW, a.w, t); h = lerp(CH, a.h, t);
        op = lerp(1, a.op, t);
        z = Math.round(lerp(10, a.z, t));
        scroll.current *= (1 - t * 0.02);
      }

      const sY = 4 + z * 4;
      const sB = 10 + z * 8;
      const sA = 0.04 + z * 0.025;

      el.style.cssText = `position:absolute;left:${x}px;top:${y}px;width:${w}px;height:${h}px;opacity:${cl(op)};z-index:${z};will-change:left,top,width,height,opacity;border-radius:16px;background:#fff;border:1px solid rgba(0,151,254,0.06);display:flex;flex-direction:column;overflow:hidden;box-shadow:0 ${sY}px ${sB}px rgba(0,0,0,${sA}), 0 2px 4px rgba(0,0,0,0.03)`;
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
          {/* 카드 이미지 영역 — 추후 public/images/cards/ 이미지로 교체 */}
          <div style={{ flex: 1, margin: "0 10px 10px", borderRadius: 10, background: "linear-gradient(135deg, rgba(0,151,254,0.06), rgba(0,151,254,0.12))", overflow: "hidden" }} />
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

            {/* 클리핑 영역 + 4면 그라데이션 페이드 마스크 (부드러운 진입/퇴장) */}
            <div className="absolute overflow-hidden" style={{
              top: 10, left: 40, width: 540, height: 400, borderRadius: 20,
              WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 8%, black 88%, transparent 100%)",
              maskImage: "linear-gradient(to bottom, transparent 0%, black 8%, black 88%, transparent 100%)",
            }}>
              <CardAnimation />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
