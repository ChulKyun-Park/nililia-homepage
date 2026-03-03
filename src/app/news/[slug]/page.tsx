import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { fetchNewsBySlug, fetchPageBlocks } from "@/lib/notion/client";
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

  return (
    <>
      {/* 상단 네비게이션 */}
      <div className="bg-hero-bg">
        <div className="mx-auto max-w-7xl px-6">
          <div className="lg:pl-12 py-4">
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
        <div className="mx-auto max-w-7xl px-6">
          <div className="lg:pl-12 max-w-3xl">
            {/* 메타 정보 */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {item.category && (
                <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {item.category}
                </span>
              )}
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
        </div>
      </section>

      {/* 본문 */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="lg:pl-12 max-w-3xl">
            {blocks.length > 0 ? (
              <BlockRenderer blocks={blocks} />
            ) : (
              item.excerpt && (
                <p className="text-[length:var(--font-size-body)] leading-relaxed text-foreground break-keep">
                  {item.excerpt}
                </p>
              )
            )}
          </div>
        </div>
      </section>
    </>
  );
}
