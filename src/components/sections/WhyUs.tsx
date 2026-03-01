"use client";

const reasons = [
  {
    number: "01",
    title: "AI + 전문가 하이브리드 시스템",
    description:
      "최첨단 AI 번역 기술과 10년 이상 경력의 전문 번역가가 협업합니다. AI가 초벌 번역을 수행하고, 전문가가 문맥과 뉘앙스를 완성하여 속도와 품질 모두 잡았습니다.",
    tags: ["AI 번역 엔진", "전문가 감수", "품질 보증"],
    bg: "bg-white",
  },
  {
    number: "02",
    title: "50+ 언어, 글로벌 네트워크",
    description:
      "50개 이상의 언어를 지원하며, 각 언어권에 현지 전문가 네트워크를 보유하고 있습니다. 단순 번역이 아닌, 현지 문화와 정서에 맞는 진정한 현지화를 제공합니다.",
    tags: ["현지 전문가", "문화 적응", "글로벌 커버리지"],
    bg: "bg-sky-50",
  },
  {
    number: "03",
    title: "빠른 납기, 완벽한 프로세스",
    description:
      "체계적인 프로젝트 관리와 자동화된 워크플로우로 빠른 납기를 보장합니다. 실시간 진행 상황 대시보드를 통해 투명하게 프로젝트를 관리할 수 있습니다.",
    tags: ["자동 워크플로우", "실시간 대시보드", "빠른 납기"],
    bg: "bg-primary/5",
  },
];

function ReasonSlide({ reason }: { reason: (typeof reasons)[number] }) {
  return (
    <div
      className={`${reason.bg} flex-shrink-0 w-full flex flex-col justify-center px-10 sm:px-16 py-12`}
      style={{ height: "400px" }}
    >
      <span className="mb-4 inline-block text-6xl font-bold text-primary/15">
        {reason.number}
      </span>
      <h3 className="text-2xl font-bold text-gray-900 sm:text-3xl break-keep">
        {reason.title}
      </h3>
      <p className="mt-4 max-w-lg text-base leading-relaxed text-gray-500 break-keep">
        {reason.description}
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        {reason.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function WhyUs() {
  const doubled = [...reasons, ...reasons];

  return (
    <section className="bg-slate-50 py-24">
      <style>{`
        @keyframes scroll-up {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .animate-scroll-up {
          animation: scroll-up linear infinite;
        }
        .animate-scroll-up:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
            Why Us
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl break-keep">
            왜 Nililia를 선택해야 하나요?
          </h2>
        </div>

        {/* Vertical scroll carousel */}
        <div
          className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-3xl border border-primary/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)]"
          style={{ height: "400px" }}
        >
          <div
            className="animate-scroll-up flex flex-col"
            style={{ animationDuration: `${reasons.length * 4}s` }}
          >
            {doubled.map((reason, i) => (
              <ReasonSlide
                key={`${reason.number}-${i}`}
                reason={reason}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
