import type { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/ui/Button";
import CasesFilter from "@/components/cases/CasesFilter";
import { fetchAllCaseStudiesCorrected } from "@/lib/notion/homePreview";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "진행사례 | 닐리리아",
  description:
    "다양한 산업 분야의 글로벌 진출을 성공적으로 지원한 닐리리아의 진행 사례를 확인하세요.",
  openGraph: {
    title: "진행사례 | 닐리리아",
    description:
      "다양한 산업 분야의 글로벌 진출을 성공적으로 지원한 닐리리아의 진행 사례를 확인하세요.",
  },
};

export default async function CasesPage() {
  const cases = await fetchAllCaseStudiesCorrected();

  return (
    <>
      <section className="relative bg-hero-bg py-8 lg:py-10 h-[250px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/채용CTA.png"
            alt=""
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <h1 className="text-[length:var(--font-size-page-hero)] font-bold leading-tight text-white break-keep">
            진행 사례
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-[length:var(--font-size-body)] leading-relaxed text-white/80 break-keep">
            다양한 산업 분야의 글로벌 진출을 성공적으로 지원한 사례를 확인하세요.
          </p>
        </div>
      </section>

      <CasesFilter cases={cases} />

      <section className="bg-gradient-to-r from-primary to-primary-dark py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-[length:var(--font-size-section-h2)] font-bold text-white break-keep">
            다음 진행 사례의 주인공이 되세요
          </h2>
          <p className="mt-4 text-[length:var(--font-size-body)] text-white/80 break-keep">
            닐리리아와 함께 글로벌 시장을 개척하세요.
          </p>
          <div className="mt-8">
            <Button
              href="/contact"
              className="bg-white px-8 py-4 text-base font-bold text-primary hover:bg-white/90"
            >
              무료 상담 신청
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
