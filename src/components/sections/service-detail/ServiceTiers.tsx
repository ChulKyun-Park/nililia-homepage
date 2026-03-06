import Section from "@/components/ui/Section";

const tiers = [
  {
    name: "일반",
    badge: "컨텐츠플라이",
    highlight: false,
    items: [
      { label: "콘텐츠", value: "영상" },
      { label: "번역가 등급", value: "일반 ~ 상위" },
      { label: "작업 공정", value: "주문 후 즉시 착수" },
      { label: "수정 정책", value: "오역·오탈자 수정" },
      { label: "추천 고객", value: "빠른 결과물이 필요한 프로젝트" },
    ],
  },
  {
    name: "프리미엄",
    badge: "컨텐츠플라이",
    highlight: true,
    items: [
      { label: "콘텐츠", value: "영상" },
      { label: "번역가 등급", value: "상위 등급" },
      { label: "작업 공정", value: "PM 사전 체크 후 착수" },
      { label: "수정 정책", value: "고객 요청 1회 수정" },
      { label: "추천 고객", value: "콘텐츠의 재미에 영향을 미치는 프로젝트" },
    ],
  },
  {
    name: "고품질 프리미엄",
    badge: "컨텐츠플라이S",
    highlight: false,
    items: [
      { label: "콘텐츠", value: "영상 · 웹소설 · SDH · 문서 · 홈페이지 · 앱 등" },
      { label: "번역가 등급", value: "상위 ~ 최상위" },
      { label: "작업 공정", value: "전담 매니저 1:1 밀착 케어" },
      { label: "수정 정책", value: "고객 요청 반영" },
      { label: "추천 고객", value: "작품의 개성 또는 전문 지식을 요하는 프로젝트" },
    ],
  },
];

export default function ServiceTiers() {
  return (
    <Section className="bg-surface">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10">
          <span className="mb-2 inline-block text-[length:var(--font-size-section-label)] font-semibold uppercase tracking-wider text-primary">
            Service Tiers
          </span>
          <h2 className="text-[length:var(--font-size-section-h2)] font-bold tracking-tight text-foreground break-keep">
            프로젝트에 맞는 등급을 선택하세요
          </h2>
          <p className="mt-3 text-[length:var(--font-size-body)] text-muted break-keep">
            콘텐츠 유형과 요구 품질에 따라 3단계 서비스를 운영합니다.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-2xl border p-6 ${
                tier.highlight
                  ? "border-primary bg-white shadow-md ring-1 ring-primary/20"
                  : "border-border bg-white"
              }`}
            >
              <div className="mb-4">
                <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  {tier.badge}
                </span>
                <h3 className="mt-2 text-lg font-bold text-foreground">{tier.name}</h3>
              </div>
              <div className="space-y-3">
                {tier.items.map((item) => (
                  <div key={item.label}>
                    <p className="text-xs font-semibold text-muted">{item.label}</p>
                    <p className="mt-0.5 text-sm text-foreground break-keep">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
