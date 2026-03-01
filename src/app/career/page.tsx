import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "채용 | Nililia",
  description:
    "Nililia와 함께 언어의 장벽을 넘어 세계를 연결할 인재를 찾습니다. 채용 정보를 확인하세요.",
  openGraph: {
    title: "채용 | Nililia",
    description:
      "Nililia와 함께 언어의 장벽을 넘어 세계를 연결할 인재를 찾습니다.",
  },
};

export default function CareerPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white flex items-center min-h-[420px] py-4 lg:py-6">
        <div className="mx-auto max-w-7xl px-6 w-full">
          {/* 헤딩 */}
          <div className="text-center mb-16">
            <h1 className="text-3xl font-bold leading-snug text-foreground sm:text-4xl break-keep">
              닐리리아와 함께 할<br />
              멋진 동료를 찾고 있어요!
            </h1>
          </div>

          {/* 2단 카드 */}
          <div className="grid gap-6 sm:grid-cols-2">
            {/* 정규직 채용 */}
            <a
              href="https://nililia.ninehire.site"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-2xl bg-primary p-8 sm:p-10 min-h-[280px] flex flex-col justify-between transition-transform hover:-translate-y-1"
            >
              {/* 배경 장식 */}
              <div className="absolute -right-8 -bottom-8 h-40 w-40 rounded-2xl bg-white/10 rotate-12" />
              <div className="absolute -right-2 -bottom-2 h-28 w-28 rounded-xl bg-white/10 rotate-12" />

              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-white">정규직 채용</h2>
                <p className="mt-4 text-base leading-relaxed text-white/80 break-keep">
                  닐리리아의<br />
                  콘텐츠 세계화를 위한 혁신에<br />
                  함께해 주세요.
                </p>
              </div>
              <div className="relative z-10 mt-6">
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-white group-hover:gap-2 transition-all">
                  지금 지원하세요 <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </a>

            {/* 프리랜서 채용 */}
            <a
              href="https://nililia.ninehire.site"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-2xl bg-amber-600 p-8 sm:p-10 min-h-[280px] flex flex-col justify-between transition-transform hover:-translate-y-1"
            >
              {/* 배경 장식 */}
              <div className="absolute -right-8 -bottom-8 h-40 w-40 rounded-2xl bg-white/10 rotate-12" />
              <div className="absolute -right-2 -bottom-2 h-28 w-28 rounded-xl bg-white/10 rotate-12" />

              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-white">콘텐츠 현지화 프리랜서 채용</h2>
                <p className="mt-4 text-base leading-relaxed text-white/80 break-keep">
                  직접 콘텐츠 세계화에<br />
                  참여하여<br />
                  수익을 얻어보세요.
                </p>
              </div>
              <div className="relative z-10 mt-6">
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-white group-hover:gap-2 transition-all">
                  지금 지원하세요 <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
