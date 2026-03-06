import type { Metadata } from "next";
import Image from "next/image";
import NewsFilter from "@/components/news/NewsFilter";
import { fetchAllNews } from "@/lib/notion/client";

export const revalidate = 60;

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
      {/* Hero */}
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
        <section className="bg-white py-24">
          <div className="mx-auto max-w-5xl px-6 text-center">
            <p className="text-muted">
              곧 다양한 소식을 공유할 예정입니다.
            </p>
          </div>
        </section>
      )}
    </>
  );
}
