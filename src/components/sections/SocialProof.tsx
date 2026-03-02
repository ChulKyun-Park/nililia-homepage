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

export default function SocialProof() {
  return (
    <section className="bg-white py-24">
      {/* Stats — 레이아웃 기준 적용 */}
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

      {/* Client logo marquee — 예외: 화면 전체 무한루프 */}
      <div className="mt-16 overflow-hidden">
        <p className="mb-8 text-center text-sm font-medium uppercase tracking-wider text-muted">
          국내외 선도 기업이 신뢰합니다
        </p>
        <div className="relative">
          <div className="animate-marquee flex items-center gap-16 whitespace-nowrap">
            {[...clients, ...clients].map((client, i) => (
              <span
                key={`${client}-${i}`}
                className="text-lg font-semibold text-foreground/20 transition-colors hover:text-foreground/40"
              >
                {client}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Link — 레이아웃 기준 적용 */}
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
