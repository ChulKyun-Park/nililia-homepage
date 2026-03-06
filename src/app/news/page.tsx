import type { Metadata } from "next";
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
      {/* 히어로 */}
      <section className="bg-white pb-4 pt-12 lg:pt-16">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
            닐리리아 소식
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted sm:text-base">
            번역 · 현지화 업계의 최신 소식과 인사이트를 만나보세요.
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
