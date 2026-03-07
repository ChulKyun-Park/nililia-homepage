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

  // 이전/다음 글 찾기
  const allNews = await fetchAllNews();
  const currentIndex = allNews.findIndex((n) => n.slug === slug);
  const prevItem = currentIndex < allNews.length - 1 ? allNews[currentIndex + 1] : null;
  const nextItem = currentIndex > 0 ? allNews[currentIndex - 1] : null;

  return (
    <>
      {/* 상단 네비게이션 */}
      <div className="bg-hero-bg">
        <div className="mx-auto max-w-5xl px-6">
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

      {/* 히어로: 썸네일 + 메타 */}
      <section className="bg-hero-bg pb-12">
        <div className="mx-auto max-w-5xl px-6">
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
        <div className="mx-auto max-w-5xl px-6 overflow-x-hidden">
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

      {/* 이전/다음 글 네비게이션 */}
      {(prevItem || nextItem) && (
        <section className="border-t border-border">
          <div className="mx-auto max-w-5xl px-6 py-10">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* 이전 글 (오래된 글) */}
              {prevItem ? (
                <Link
                  href={`/news/${prevItem.slug}`}
                  className="group flex items-start gap-3 rounded-xl border border-border p-5 transition-colors hover:border-primary/30 hover:bg-surface"
                >
                  <ChevronLeft className="mt-0.5 h-5 w-5 flex-shrink-0 text-muted transition-colors group-hover:text-primary" />
                  <div className="min-w-0">
                    <span className="text-xs text-muted">이전 글</span>
                    <p className="mt-1 line-clamp-2 text-sm font-medium text-foreground transition-colors group-hover:text-primary break-keep">
                      {prevItem.title}
                    </p>
                  </div>
                </Link>
              ) : (
                <div />
              )}

              {/* 다음 글 (최신 글) */}
              {nextItem ? (
                <Link
                  href={`/news/${nextItem.slug}`}
                  className="group flex items-start gap-3 rounded-xl border border-border p-5 transition-colors hover:border-primary/30 hover:bg-surface sm:flex-row-reverse sm:text-right"
                >
                  <ChevronRight className="mt-0.5 h-5 w-5 flex-shrink-0 text-muted transition-colors group-hover:text-primary" />
                  <div className="min-w-0">
                    <span className="text-xs text-muted">다음 글</span>
                    <p className="mt-1 line-clamp-2 text-sm font-medium text-foreground transition-colors group-hover:text-primary break-keep">
                      {nextItem.title}
                    </p>
                  </div>
                </Link>
              ) : (
                <div />
              )}
            </div>

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
      )}
    </>
  );
}
