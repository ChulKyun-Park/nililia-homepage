import Image from "next/image";

const stats = [
  { value: "50+", label: "기업 고객" },
  { value: "150M+", label: "번역 단어" },
  { value: "10+", label: "지원 언어" },
  { value: "90%", label: "고객 만족도" },
];

const companyLogos = [
  "CUBE엔터.png",
  "EBS.png",
  "GF엔터.png",
  "JTBC.png",
  "JYP.png",
  "KBS.png",
  "LG U+.png",
  "LG.png",
  "MBC.png",
  "koz.png",
  "kt스튜디오.png",
  "고려대의료원.png",
  "고양시.png",
  "다이아TV.png",
  "딩고.png",
  "마이크로소프트.png",
  "비디오빌리지.png",
  "비스포크랩.png",
  "샌드박스.png",
  "스카이라이프티비.png",
  "스튜디오XU.png",
  "에버모어엔터.png",
  "유데미.png",
  "채널A.png",
  "카카오엔터.png",
  "콜로소.png",
  "클래스101.png",
  "테라코믹스.png",
  "트레저헌터.png",
  "티빙.png",
  "파라스타엔터.png",
  "하이헷 엔터.png",
  "한스바이오메드.png",
];

const creators = [
  "경식스필름.png",
  "권유리.png",
  "당구라.png",
  "띠부.png",
  "로하.png",
  "루퐁이네.png",
  "맵하니.png",
  "문복희.png",
  "밀키복이탄이.png",
  "반보영.png",
  "배지연's.png",
  "사나고.png",
  "샤랄라스튜디오.png",
  "슈앤트리.png",
  "신현지시리즈.png",
  "앵쩡.png",
  "어반플로우.png",
  "여수언니정혜영.png",
  "옥뷰티.png",
  "와인마시는아톰.png",
  "워너비보라.png",
  "잼스터.png",
  "젤라.png",
  "지지야먹자.png",
  "지편한세상.png",
  "지효쏭.png",
  "쯔양.png",
  "카우치 포테이토 클럽.png",
  "플랜디.png",
  "햄지.png",
  "히밥.png",
];

function CreatorAvatar({ filename }: { filename: string }) {
  const name = filename.replace(/\.[^.]+$/, "");
  return (
    <div className="flex-none flex items-center mx-[30px]">
      <div className="h-10 w-10 overflow-hidden rounded-full">
        <Image
          src={`/images/socialproof/creator/${filename}`}
          alt={name}
          width={120}
          height={120}
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}

function CompanyLogo({ filename }: { filename: string }) {
  const name = filename.replace(/\.[^.]+$/, "");
  return (
    <div className="flex-none flex items-center justify-center h-8 mx-[31px]">
      <Image
        src={`/images/socialproof/company/${filename}`}
        alt={name}
        width={120}
        height={48}
        className="h-7 w-auto object-contain"
      />
    </div>
  );
}

export default function SocialProof() {
  // 3배 복제로 끊김 방지
  const doubleLogos = [...companyLogos, ...companyLogos];
  const doubleCreators = [...creators, ...creators];

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
              <div className="mt-2 text-[length:var(--font-size-body)] text-muted">{stat.label}</div>
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
          animation: sp-marquee-left 60s linear infinite;
        }
        .marquee-right {
          animation: sp-marquee-right 45s linear infinite;
        }
        @keyframes sp-marquee-left {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes sp-marquee-right {
          0% { transform: translate3d(-50%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
      `}</style>

      {/* Company marquee */}
      <div className="mt-16 overflow-hidden">
        <p className="mb-8 text-center text-[length:var(--font-size-body)] font-medium uppercase tracking-wider text-muted">
          국내외 선도 기업이 신뢰합니다
        </p>
        <div className="overflow-hidden">
          <div className="marquee-track marquee-left">
            {doubleLogos.map((logo, i) => (
              <CompanyLogo key={`comp-${i}`} filename={logo} />
            ))}
          </div>
        </div>
      </div>

      {/* Creators marquee — 동일 박스 스타일, 반대 방향 */}
      <div className="mt-16 overflow-hidden">
        <p className="mb-8 text-center text-[length:var(--font-size-body)] font-medium uppercase tracking-wider text-muted">
          크리에이터들도 함께합니다
        </p>
        <div className="overflow-hidden">
          <div className="marquee-track marquee-right">
            {doubleCreators.map((creator, i) => (
              <CreatorAvatar key={`cre-${i}`} filename={creator} />
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
