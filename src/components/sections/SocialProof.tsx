import Link from "next/link";

const stats = [
  { value: "50+", label: "기업 고객" },
  { value: "150M+", label: "번역 단어" },
  { value: "10+", label: "지원 언어" },
  { value: "90%", label: "고객 만족도" },
];

const clients = [
  "Samsung",
  "LG",
  "Hyundai",
  "SK",
  "Naver",
  "Kakao",
  "CJ",
  "Lotte",
  "KT",
  "Nexon",
];

const creators = [
  "Channel 1",
  "Channel 2",
  "Channel 3",
  "Channel 4",
  "Channel 5",
  "Channel 6",
  "Channel 7",
  "Channel 8",
  "Channel 9",
  "Channel 10",
];

export default function SocialProof() {
  return (
    <section className="bg-white py-24">
      {/* Stats */}
      <div className="mx-auto max-w-7xl px-6 lg:pl-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-primary sm:text-4xl">
                {stat.value}
              </div>
              <div className="mt-2 text-sm text-muted">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Company marquee — 좌→우 무한루프 */}
      <div className="mt-16 overflow-hidden">
        <p className="mb-8 text-center text-sm font-medium uppercase tracking-wider text-muted">
          국내외 선도 기업이 신뢰합니다
        </p>
        <div className="relative">
          <div className="animate-marquee flex items-center gap-10 whitespace-nowrap">
            {[...clients, ...clients].map((client, i) => (
              <div
                key={`comp-${i}`}
                className="flex-none rounded-xl border border-primary/10 bg-primary/5 px-12 py-6 text-center font-bold text-foreground/30 shadow-sm min-w-[200px]"
              >
                {client}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Creators marquee — 우→좌 무한루프 (반대 방향) */}
      <div className="mt-16 overflow-hidden">
        <p className="mb-8 text-center text-sm font-medium uppercase tracking-wider text-muted">
          크리에이터들도 함께합니다
        </p>
        <div className="relative">
          <div className="animate-marquee-reverse flex items-center gap-10 whitespace-nowrap">
            {[...creators, ...creators].map((creator, i) => (
              <div
                key={`cre-${i}`}
                className="flex-none flex flex-col items-center gap-3 min-w-[140px]"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-primary/10 bg-primary/5 shadow-inner">
                  <svg className="h-7 w-7 fill-current text-foreground/30" viewBox="0 0 24 24">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                  </svg>
                </div>
                <p className="text-xs font-bold text-foreground/30">{creator}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Link */}
      <div className="mx-auto max-w-7xl px-6 lg:pl-12">
        <div className="mt-10 text-center">
          <Link
            href="/cases"
            className="text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
          >
            성공 사례 보기 &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
