import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";

const reasons = [
  {
    number: "01",
    title: "AI + 전문가 하이브리드 시스템",
    description:
      "최첨단 AI 번역 기술과 10년 이상 경력의 전문 번역가가 협업합니다. AI가 초벌 번역을 수행하고, 전문가가 문맥과 뉘앙스를 완성하여 속도와 품질 모두 잡았습니다.",
    tags: ["AI 번역 엔진", "전문가 감수", "품질 보증"],
    imageAlt: "AI와 전문가의 하이브리드 번역 시스템",
    reverse: false,
  },
  {
    number: "02",
    title: "50+ 언어, 글로벌 네트워크",
    description:
      "50개 이상의 언어를 지원하며, 각 언어권에 현지 전문가 네트워크를 보유하고 있습니다. 단순 번역이 아닌, 현지 문화와 정서에 맞는 진정한 현지화를 제공합니다.",
    tags: ["현지 전문가", "문화 적응", "글로벌 커버리지"],
    imageAlt: "글로벌 네트워크 맵",
    reverse: true,
  },
  {
    number: "03",
    title: "빠른 납기, 완벽한 프로세스",
    description:
      "체계적인 프로젝트 관리와 자동화된 워크플로우로 빠른 납기를 보장합니다. 실시간 진행 상황 대시보드를 통해 투명하게 프로젝트를 관리할 수 있습니다.",
    tags: ["자동 워크플로우", "실시간 대시보드", "빠른 납기"],
    imageAlt: "프로젝트 관리 대시보드",
    reverse: false,
  },
];

export default function WhyUs() {
  return (
    <Section className="bg-surface">
      <SectionHeader
        label="Why Us"
        title="왜 Nililia를 선택해야 하나요?"
      />

      <div className="space-y-24">
        {reasons.map((reason) => (
          <div
            key={reason.number}
            className={`flex flex-col items-center gap-12 lg:flex-row ${
              reason.reverse ? "lg:flex-row-reverse" : ""
            }`}
          >
            {/* Text */}
            <div className="flex-1">
              <span className="mb-4 inline-block text-5xl font-bold text-primary/20">
                {reason.number}
              </span>
              <h3 className="text-2xl font-bold text-foreground sm:text-3xl break-keep">
                {reason.title}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-muted break-keep">
                {reason.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {reason.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-primary-light px-4 py-1.5 text-xs font-medium text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Image placeholder */}
            <div className="flex-1">
              <div className="flex aspect-[4/3] items-center justify-center rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 text-muted">
                <span className="text-sm">{reason.imageAlt}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
