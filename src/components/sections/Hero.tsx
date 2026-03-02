"use client";

import { useEffect, useRef, useCallback } from "react";

const SERVICES = [
  { icon: "▶️", title: "영상 번역", desc: "자막 & 더빙", img: "/images/hero/영상 번역.jpg" },
  { icon: "📄", title: "문서 번역", desc: "전문 번역", img: "/images/hero/문서 번역.jpg" },
  { icon: "📺", title: "SDH 자막 제작", desc: "청각장애인 자막", img: "/images/hero/SDH · 배리어프리 자막 제작.jpg" },
  { icon: "🌐", title: "홈페이지 현지화", desc: "웹사이트 최적화", img: "/images/hero/홈페이지 현지화.jpg" },
  { icon: "📱", title: "앱 현지화", desc: "모바일 최적화", img: "/images/hero/앱 현지화.png" },
  { icon: "📖", title: "웹소설 번역", desc: "웹소설 현지화", img: "/images/hero/웹소설 번역.png" },
  { icon: "🖼️", title: "웹툰 번역", desc: "콘텐츠 현지화", img: "/images/hero/웹툰 번역.jpg" },
  { icon: "🎮", title: "게임 번역", desc: "게임 현지화", img: "/images/hero/게임 번역.png" },
  { icon: "✏️", title: "MTPE", desc: "기계번역 후편집", img: "/images/hero/MTPE.png" },
  { icon: "🏢", title: "기업 맞춤 번역", desc: "맞춤형 솔루션", img: "/images/hero/기업 맞춤 번역.png" },
];

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
function cl(v: number) { return Math.max(0, Math.min(1, v)); }

const STAGE_W = 665;
const STAGE_H = 380;

interface Slot {
  x: number; y: number; w: number; h: number; op: number; z: number;
}

/*
 * 참조 영상 분석 기반 레이아웃
 * 카드 비율 ≈ 6:7 (가로:세로, 약간 세로가 김)
 * Row3(앞) = 1.0x: 180×210  |  Row2(중) = 0.8x: 144×168  |  Row1(뒤) = 0.64x: 115×134
 * Row 간 y가 빽빽 — 아래 Row가 위 Row를 50%+ 덮음
 * 각 Row 가운데 정렬, gap 12px
 *
 * Row3: 3×180+2×12=564 → start=(700-564)/2=68
 * Row2: 2×144+12=300 → start=(700-300)/2=200
 * Row1: 3×115+2×10=365 → start=(700-365)/2=168
 */
const A: Slot[] = [
  // Row3 (앞, z:3, 171×200)
  { x: 65,  y: 185, w: 171, h: 200, op: 1.0,  z: 3 },
  { x: 247, y: 190, w: 171, h: 200, op: 1.0,  z: 3 },
  { x: 429, y: 183, w: 171, h: 200, op: 0.90, z: 3 },
  // Row2 (중, z:2, 137×160)
  { x: 190, y: 78,  w: 137, h: 160, op: 0.70, z: 2 },
  { x: 338, y: 83,  w: 137, h: 160, op: 0.65, z: 2 },
  // Row1 (뒤, z:1, 109×127)
  { x: 160, y: -17, w: 109, h: 127, op: 0.40, z: 1 },
  { x: 278, y: -13, w: 109, h: 127, op: 0.45, z: 1 },
  { x: 397, y: -17, w: 109, h: 127, op: 0.35, z: 1 },
  // 숨김 (위에서 대기)
  { x: 219, y: -171, w: 109, h: 127, op: 0, z: 0 },
  { x: 337, y: -171, w: 109, h: 127, op: 0, z: 0 },
];

const B: Slot[] = [
  // 카드0,1,2 → 아래로 퇴장
  { x: 65,  y: STAGE_H + 50, w: 171, h: 200, op: 0, z: 0 },
  { x: 247, y: STAGE_H + 50, w: 171, h: 200, op: 0, z: 0 },
  { x: 429, y: STAGE_H + 50, w: 171, h: 200, op: 0, z: 0 },
  // 카드3,4 → Row3
  { x: 156, y: 185, w: 171, h: 200, op: 1.0, z: 3 },
  { x: 338, y: 190, w: 171, h: 200, op: 1.0, z: 3 },
  // 카드5,6,7 → Row2
  { x: 116, y: 78,  w: 137, h: 160, op: 0.70, z: 2 },
  { x: 264, y: 83,  w: 137, h: 160, op: 0.70, z: 2 },
  { x: 412, y: 78,  w: 137, h: 160, op: 0.60, z: 2 },
  // 카드8,9 → Row1
  { x: 219, y: -17, w: 109, h: 127, op: 0.40, z: 1 },
  { x: 337, y: -13, w: 109, h: 127, op: 0.45, z: 1 },
];

const C: Slot[] = [
  // 카드0,1,2 → Row1 (위에서 재진입)
  { x: 160, y: -17, w: 109, h: 127, op: 0.40, z: 1 },
  { x: 278, y: -13, w: 109, h: 127, op: 0.45, z: 1 },
  { x: 397, y: -17, w: 109, h: 127, op: 0.35, z: 1 },
  // 카드3,4 → 아래로 퇴장
  { x: 156, y: STAGE_H + 50, w: 171, h: 200, op: 0, z: 0 },
  { x: 338, y: STAGE_H + 50, w: 171, h: 200, op: 0, z: 0 },
  // 카드5,6,7 → Row3
  { x: 65,  y: 185, w: 171, h: 200, op: 1.0,  z: 3 },
  { x: 247, y: 190, w: 171, h: 200, op: 1.0,  z: 3 },
  { x: 429, y: 183, w: 171, h: 200, op: 0.90, z: 3 },
  // 카드8,9 → Row2
  { x: 190, y: 78,  w: 137, h: 160, op: 0.70, z: 2 },
  { x: 338, y: 83,  w: 137, h: 160, op: 0.65, z: 2 },
];

/* 컨베이어: 기준 크기 */
const CW = 171, CH = 200, CG = 13;
const N = SERVICES.length;

function CardAnimation() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const frame = useRef(0);
  const scroll = useRef(0);
  const snapX = useRef<number[]>(new Array(N).fill(0));
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

    const justLeftConveyor = (f === Math.floor(T7) + 1);

    refs.current.forEach((el, i) => {
      if (!el) return;
      const a = A[i], b = B[i], c = C[i];
      let x = 0, y = 0, w = a.w, h = a.h, op = a.op, z = a.z;

      if (f <= T1) {
        /* Phase1: 323 정지 + 미세 하강 */
        const drift = (f / T1) * 12;
        x = a.x; y = a.y + drift; w = a.w; h = a.h; op = a.op; z = a.z;

      } else if (f <= T2) {
        /* Phase2: 323→232 캐스케이드 */
        const t = easeInOutCubic(cl((f - T1) / (T2 - T1)));
        x = lerp(a.x, b.x, t);
        y = lerp(a.y + 12, b.y, t);
        w = lerp(a.w, b.w, t);
        h = lerp(a.h, b.h, t);
        op = lerp(a.op, b.op, t);
        z = t < 0.5 ? a.z : b.z;

      } else if (f <= T3) {
        /* Phase3: 232 정지 */
        x = b.x; y = b.y; w = b.w; h = b.h; op = b.op; z = b.z;

      } else if (f <= T4) {
        /* Phase4: 232→323 캐스케이드 */
        const t = easeInOutCubic(cl((f - T3) / (T4 - T3)));
        x = lerp(b.x, c.x, t);
        y = lerp(b.y, c.y, t);
        w = lerp(b.w, c.w, t);
        h = lerp(b.h, c.h, t);
        op = lerp(b.op, c.op, t);
        z = t < 0.5 ? b.z : c.z;

      } else if (f <= T5) {
        /* Phase5: 323 정지 */
        x = c.x; y = c.y; w = c.w; h = c.h; op = c.op; z = c.z;

      } else if (f <= T6) {
        /* Phase6: 한 줄 정렬 */
        const t = easeInOutCubic(cl((f - T5) / (T6 - T5)));
        const cx = i * (CW + CG);
        const cy = (STAGE_H - CH) / 2;
        x = lerp(c.x, cx, t); y = lerp(c.y, cy, t);
        w = lerp(c.w, CW, t); h = lerp(c.h, CH, t);
        op = lerp(c.op, 1, t); z = 10;

      } else if (f <= T7) {
        /* Phase7: 우→좌 컨베이어 */
        scroll.current += 0.52;
        const total = N * (CW + CG);
        let cx = i * (CW + CG) - scroll.current;
        while (cx < -CW - 20) cx += total;
        x = cx; y = (STAGE_H - CH) / 2; w = CW; h = CH; z = 10;
        /* 프레임 끝선에서 자연스럽게 잘리도록:
           overflow:hidden + 블러 오버레이가 클리핑 담당.
           opacity는 완전히 화면 밖인 카드만 숨김. */
        if (cx + CW < -5) op = 0;          // 완전히 좌측 밖
        else if (cx > STAGE_W + 5) op = 0;  // 완전히 우측 밖
        else op = 1;                         // 나머지는 보임 (프레임이 잘라줌)

      } else {
        /* Phase8: 323 재조립 (snap 기반) */
        if (justLeftConveyor) {
          const total = N * (CW + CG);
          let cx = i * (CW + CG) - scroll.current;
          while (cx < -CW - 10) cx += total;
          snapX.current[i] = cx;
        }
        const t = easeInOutCubic(cl((f - T7) / (CYCLE - T7)));
        x = lerp(snapX.current[i], a.x, t);
        y = lerp((STAGE_H - CH) / 2, a.y, t);
        w = lerp(CW, a.w, t); h = lerp(CH, a.h, t);
        op = lerp(1, a.op, t);
        z = a.z; // 즉시 목표 z — lerp하면 카드끼리 z 교차→깜빡임
      }

      el.style.cssText = `position:absolute;left:${x}px;top:${y}px;width:${w}px;height:${h}px;opacity:${cl(op)};z-index:${z};will-change:left,top,width,height,opacity;border-radius:16px;background:#fff;border:1px solid rgba(0,151,254,0.08);display:flex;flex-direction:column;overflow:hidden;box-shadow:none`;
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
          <div style={{ flex: 1, margin: "0 10px 10px", borderRadius: 10, overflow: "hidden", background: "rgba(0,151,254,0.04)" }}>
            <img src={svc.img} alt={svc.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>
        </div>
      ))}
    </>
  );
}

export default function Hero() {
  return (
    <section className="relative bg-hero-bg">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,_rgba(0,151,254,0.08)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,_rgba(0,151,254,0.06)_0%,_transparent_50%)]" />
      </div>

      <style>{`
        @keyframes float-s { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
      `}</style>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-12">
        <div className="relative w-full" style={{ minHeight: 420 }}>
          {/* 카드 애니메이션 — absolute, 우측 정렬 */}
          <div className="absolute right-0 top-1/2 hidden lg:block" style={{ width: 722, height: 399, transform: "translateY(-50%) scale(0.95)", transformOrigin: "right center" }}>
            <div className="pointer-events-none absolute z-40 rounded-xl border border-primary/10 bg-white px-5 py-2.5 text-sm font-bold text-gray-400 shadow-[0_8px_24px_rgba(0,0,0,0.05)]"
              style={{ top: 145, left: 8, animation: "float-s 3.5s ease-in-out infinite 0s" }}>こんにちは</div>
            <div className="pointer-events-none absolute z-40 rounded-xl border border-primary/10 bg-white px-5 py-2.5 text-sm font-bold text-gray-400 shadow-[0_8px_24px_rgba(0,0,0,0.05)]"
              style={{ bottom: 35, left: 42, animation: "float-s 3.8s ease-in-out infinite 0.5s" }}>¡Hola!</div>
            <div className="pointer-events-none absolute z-40 rounded-xl border border-primary/10 bg-white px-5 py-2.5 text-sm font-bold text-gray-400 shadow-[0_8px_24px_rgba(0,0,0,0.05)]"
              style={{ top: 68, right: 22, animation: "float-s 4s ease-in-out infinite 1s" }}>Thank you</div>
            <div className="pointer-events-none absolute z-40 rounded-xl border border-primary/10 bg-white px-5 py-2.5 text-sm font-bold text-gray-400 shadow-[0_8px_24px_rgba(0,0,0,0.05)]"
              style={{ bottom: 55, right: 50, animation: "float-s 3.6s ease-in-out infinite 1.5s" }}>สวัสดี</div>

            <div className="absolute" style={{ top: 10, left: 27, width: 665, height: 380, overflow: "hidden" }}>
              <CardAnimation />
            </div>
          </div>

          {/* 텍스트 — relative, 카드 위에 겹침 */}
          <div className="relative z-20 flex min-h-[420px] items-center">
            <div className="max-w-xl lg:pl-12">
            <h1 className="text-[length:var(--font-size-hero-h1)] font-bold leading-tight tracking-tight text-foreground break-keep">
              여러분의 콘텐츠에<br />
              <span className="text-primary">날개를 달아줍니다</span>
            </h1>
            <div className="mt-10" />
            <p className="text-[length:var(--font-size-hero-sub)] leading-relaxed text-muted break-keep">
              전문 번역과 현지화 서비스로 글로벌 시장 진출을 지원합니다.
            </p>
            <p className="mt-2 text-[length:var(--font-size-hero-sub)] leading-relaxed text-muted break-keep">
              AI 기술과 전문가의 노하우로 최상의 품질을 보장합니다.
            </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
