import Image from "next/image";
import fs from "fs";
import path from "path";

const stats = [
  { value: "50+", label: "기업 고객" },
  { value: "150M+", label: "번역 단어" },
  { value: "10+", label: "지원 언어" },
  { value: "90%", label: "고객 만족도" },
];

const companyDir = path.join(process.cwd(), "public/images/socialproof/company");
const companyLogos = fs.readdirSync(companyDir)
  .filter((f) => /\.(png|jpg|jpeg|svg)$/i.test(f))
  .sort();

const creatorDir = path.join(process.cwd(), "public/images/socialproof/creator");
const creators = fs.readdirSync(creatorDir)
  .filter((f) => /\.(png|jpg|jpeg|svg)$/i.test(f))
  .sort();

function CreatorAvatar({ filename }: { filename: string }) {
  const name = filename.replace(/\.[^.]+$/, "");
  return (
    <div className="flex-none flex items-center mx-[36px]">
      <div className="h-12 w-12 overflow-hidden rounded-full">
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
  const name = filename.replace(/\.[^.]+$/, "").replace(/^\d+_/, "");
  return (
    <div className="flex-none flex items-center justify-center h-8 mx-[37px]">
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
