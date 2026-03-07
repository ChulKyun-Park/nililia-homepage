import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { fetchNewsBySlug, fetchAllNews, fetchPageBlocks } from "@/lib/notion/client";
import BlockRenderer from "@/components/notion/BlockRenderer";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await fetchNewsBySlug(slug);
  if (!item) return { title: "소식 | 닐리리아" };
  return {
    title: `${item.title} | 닐리리아`,
    description: item.excerpt || undefined,
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = await fetchNewsBySlug(slug);
  if (!item) notFound();

  const blocks = await fetchPageBlocks(item.id);

  // 같은 카테고리의 이전/다음 글 찾기
  const allNews = await fetchAllNews();
  const sameCategoryNews = allNews.filter((n) =>
    n.categories.some((cat) => item.categories.includes(cat))
  );
  const currentIndex = sameCategoryNews.findIndex((n) => n.slug === slug);
  // allNews는 최신순 정렬 → index+1 = 이전(오래된) 글, index-1 = 다음(최신) 글
  const prevItem = currentIndex >= 0 && currentIndex < sameCategoryNews.length - 1
    ? sameCategoryNews[currentIndex + 1]
    : null;
  const nextItem = currentIndex > 0
    ? sameCategoryNews[currentIndex - 1]
    : null;

  return (
    <>
      {/* 상단 네비게이션 */}
      <div className="bg-hero-bg">
        <div className="mx-auto max-w-3xl px-6">
          <div className="py-4">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              소식 목록
            </Link>
          </div>
        </div>
      </div>

      {/* 히어로: 메타 + 제목 + 태그 + 썸네일 */}
      <section className="bg-hero-bg pb-12">
        <div className="mx-auto max-w-3xl px-6">
          {/* 메타 정보 */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {item.categories.length > 0 && item.categories.map((cat) => (
              <span key={cat} className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                {cat}
              </span>
            ))}
            {item.publishedAt && (
              <time className="text-sm text-muted">
                {new Date(item.publishedAt).toLocaleDateString("ko-KR")}
              </time>
            )}
            {item.author && (
              <span className="text-sm text-muted">· {item.author}</span>
            )}
          </div>

          {/* 제목 */}
          <h1 className="text-3xl font-bold leading-tight text-foreground sm:text-4xl break-keep">
            {item.title}
          </h1>

          {/* 태그 */}
          {item.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border px-3 py-1 text-xs text-muted"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* 썸네일 */}
          {item.thumbnail && (
            <div className="mt-8 overflow-hidden rounded-2xl">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full object-cover"
              />
            </div>
          )}
        </div>
      </section>

      {/* 본문 */}
      <section className="pt-10 pb-16">
        <div className="mx-auto max-w-3xl px-6 overflow-x-hidden">
          {blocks.length > 0 ? (
            <BlockRenderer blocks={blocks} />
          ) : (
            item.excerpt && (
              <p className="text-base leading-relaxed text-foreground break-keep">
                {item.excerpt}
              </p>
            )
          )}
        </div>
      </section>

      {/* 이전/다음 글 + 목록 버튼 */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-3xl px-6 py-8">
          {/* 이전/다음 글 */}
          {(prevItem || nextItem) && (
            <div className="divide-y divide-border border-y border-border">
              {prevItem && (
                <Link
                  href={`/news/${prevItem.slug}`}
                  className="group flex items-center gap-3 py-4 transition-colors"
                >
                  <ChevronLeft className="h-4 w-4 flex-shrink-0 text-muted transition-colors group-hover:text-primary" />
                  <span className="text-xs text-muted flex-shrink-0 w-12">이전 글</span>
                  <p className="line-clamp-1 text-sm text-foreground transition-colors group-hover:text-primary break-keep">
                    {prevItem.title}
                  </p>
                </Link>
              )}
              {nextItem && (
                <Link
                  href={`/news/${nextItem.slug}`}
                  className="group flex items-center gap-3 py-4 transition-colors"
                >
                  <ChevronRight className="h-4 w-4 flex-shrink-0 text-muted transition-colors group-hover:text-primary" />
                  <span className="text-xs text-muted flex-shrink-0 w-12">다음 글</span>
                  <p className="line-clamp-1 text-sm text-foreground transition-colors group-hover:text-primary break-keep">
                    {nextItem.title}
                  </p>
                </Link>
              )}
            </div>
          )}

          {/* 목록 버튼 */}
          <div className="mt-8 flex justify-center">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-2.5 text-sm font-medium text-muted transition-colors hover:border-primary hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              소식 목록
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
