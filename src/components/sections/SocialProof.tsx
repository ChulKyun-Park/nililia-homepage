import Link from "next/link";

const stats = [
  { value: "50+", label: "기업 고객" },
  { value: "150M+", label: "번역 단어" },
  { value: "10+", label: "지원 언어" },
  { value: "90%", label: "고객 만족도" },
];

const clients = [
  "Samsung", "LG", "Hyundai", "SK", "Naver",
  "Kakao", "CJ", "Lotte", "KT", "Nexon",
];

const creators = [
  "Channel 1", "Channel 2", "Channel 3", "Channel 4", "Channel 5",
  "Channel 6", "Channel 7", "Channel 8", "Channel 9", "Channel 10",
];

function MarqueeBox({ label }: { label: string }) {
  return (
    <div className="flex-none rounded-lg border border-primary/10 bg-primary/5 px-6 py-3 text-center text-sm font-bold text-foreground/30">
      {label}
    </div>
  );
}

export default function SocialProof() {
  // 3배 복제로 끊김 방지
  const tripleClients = [...clients, ...clients, ...clients];
  const tripleCreators = [...creators, ...creators, ...creators];

  return (
    <section className="bg-white py-16">
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

      <style>{`
        .marquee-track {
          display: flex;
          width: max-content;
          will-change: transform;
        }
        .marquee-left {
          animation: sp-marquee-left 20s linear infinite;
        }
        .marquee-right {
          animation: sp-marquee-right 22s linear infinite;
        }
        @keyframes sp-marquee-left {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-33.333%, 0, 0); }
        }
        @keyframes sp-marquee-right {
          0% { transform: translate3d(-33.333%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
      `}</style>

      {/* Company marquee */}
      <div className="mt-16 overflow-hidden">
        <p className="mb-8 text-center text-sm font-medium uppercase tracking-wider text-muted">
          국내외 선도 기업이 신뢰합니다
        </p>
        <div className="overflow-hidden">
          <div className="marquee-track marquee-left" style={{ gap: "52px" }}>
            {tripleClients.map((client, i) => (
              <MarqueeBox key={`comp-${i}`} label={client} />
            ))}
          </div>
        </div>
      </div>

      {/* Creators marquee — 동일 박스 스타일, 반대 방향 */}
      <div className="mt-16 overflow-hidden">
        <p className="mb-8 text-center text-sm font-medium uppercase tracking-wider text-muted">
          크리에이터들도 함께합니다
        </p>
        <div className="overflow-hidden">
          <div className="marquee-track marquee-right" style={{ gap: "52px" }}>
            {tripleCreators.map((creator, i) => (
              <MarqueeBox key={`cre-${i}`} label={creator} />
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
