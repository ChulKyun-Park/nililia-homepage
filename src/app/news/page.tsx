import type { Metadata } from "next";
import Image from "next/image";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import NewsFilter from "@/components/news/NewsFilter";
import { fetchAllNews } from "@/lib/notion/client";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "소식 | 닐리리아",
  description:
    "닐리리아의 최신 소식, 업계 동향, 인사이트를 확인하세요.",
  openGraph: {
    title: "소식 | 닐리리아",
    description:
      "닐리리아의 최신 소식, 업계 동향, 인사이트를 확인하세요.",
  },
};

export default async function NewsPage() {
  const news = await fetchAllNews();

  return (
    <>
      {/* Hero — 예외 페이지: 기존 h-[250px] + 배경 이미지 유지 */}
      <section className="relative bg-hero-bg py-8 lg:py-10 h-[250px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/최신소식.png" alt="" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <h1 className="text-[length:var(--font-size-page-hero)] font-bold leading-tight text-white break-keep">
            최신 소식
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-[length:var(--font-size-body)] leading-relaxed text-white/80 break-keep">
            닐리리아의 최신 소식과 번역 · 현지화 업계 인사이트를 만나보세요.
          </p>
        </div>
      </section>

      {news.length > 0 ? (
        <NewsFilter news={news} />
      ) : (
        <section className="bg-surface py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="lg:pl-12">
              <SectionHeader
                title="소식 준비 중"
                description="곧 다양한 소식을 공유할 예정입니다."
              />
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="overflow-hidden p-0">
                    <div className="flex flex-col sm:flex-row">
                      <div className="aspect-[16/10] sm:w-64 flex-shrink-0 bg-surface" />
                      <div className="flex-1 p-6 space-y-3">
                        <div className="h-3 w-20 rounded bg-surface" />
                        <div className="h-5 w-3/4 rounded bg-surface" />
                        <div className="h-4 w-1/2 rounded bg-surface" />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
