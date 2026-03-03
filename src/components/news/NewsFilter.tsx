"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Card from "@/components/ui/Card";
import type { NotionNewsItem } from "@/types/notion";

function NewsCard({ item }: { item: NotionNewsItem }) {
  return (
    <Link href={`/news/${item.slug}`}>
      <Card className="group overflow-hidden p-0">
        <div className="flex flex-col sm:flex-row">
          {/* Thumbnail */}
          <div className="aspect-[16/10] sm:aspect-auto sm:h-auto sm:w-64 flex-shrink-0 overflow-hidden bg-surface">
            {item.thumbnail ? (
              <img
                src={item.thumbnail}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full min-h-[160px] w-full items-center justify-center text-sm text-muted">
                No Image
              </div>
            )}
          </div>
          {/* Text */}
          <div className="flex flex-1 flex-col justify-center p-5 sm:p-6">
            <div className="flex items-center gap-3">
              {item.category && (
                <span className="inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                  {item.category}
                </span>
              )}
              {item.publishedAt && (
                <time className="text-xs text-muted">
                  {new Date(item.publishedAt).toLocaleDateString("ko-KR")}
                </time>
              )}
            </div>
            <h3 className="mt-2 line-clamp-2 text-[length:var(--font-size-card-title)] font-bold text-foreground group-hover:text-primary transition-colors break-keep">
              {item.title}
            </h3>
            {item.excerpt && (
              <p className="mt-2 line-clamp-2 text-[length:var(--font-size-body)] text-muted break-keep">
                {item.excerpt}
              </p>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}

function PinnedCard({ item }: { item: NotionNewsItem }) {
  return (
    <Link href={`/news/${item.slug}`} className="block h-full">
      <Card className="group h-full overflow-hidden p-0">
        <div className="aspect-[16/10] overflow-hidden bg-surface">
          {item.thumbnail ? (
            <img
              src={item.thumbnail}
              alt={item.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-muted">
              No Image
            </div>
          )}
        </div>
        <div className="p-5">
          {item.category && (
            <span className="inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
              {item.category}
            </span>
          )}
          <h3 className="mt-2 line-clamp-2 text-base font-bold text-foreground group-hover:text-primary transition-colors break-keep">
            {item.title}
          </h3>
          {item.excerpt && (
            <p className="mt-2 line-clamp-3 text-sm text-muted break-keep">
              {item.excerpt}
            </p>
          )}
          {item.publishedAt && (
            <time className="mt-3 block text-xs text-muted">
              {new Date(item.publishedAt).toLocaleDateString("ko-KR")}
            </time>
          )}
        </div>
      </Card>
    </Link>
  );
}

export default function NewsFilter({ news }: { news: NotionNewsItem[] }) {
  const [activeCategory, setActiveCategory] = useState("전체");

  // Pinned 항목 분리 (최대 5개)
  const pinnedItems = useMemo(() => news.filter((n) => n.pinned).slice(0, 5), [news]);

  // 카테고리 목록 동적 추출
  const categories = useMemo(() => {
    const cats = new Set<string>();
    news.forEach((n) => {
      if (n.category) cats.add(n.category);
    });
    return ["전체", ...Array.from(cats)];
  }, [news]);

  // 필터링된 일반 글 (pinned 제외)
  const filteredNews = useMemo(() => {
    const nonPinned = news.filter((n) => !n.pinned);
    if (activeCategory === "전체") return nonPinned;
    return nonPinned.filter((n) => n.category === activeCategory);
  }, [news, activeCategory]);

  return (
    <>
      {/* Pinned 영역 */}
      {pinnedItems.length > 0 && (
        <section className="bg-white py-12">
          <div className="mx-auto max-w-7xl px-6">
            <div className="lg:pl-12 border-b border-border pb-12">
              <p className="mb-6 text-sm font-semibold uppercase tracking-wider text-primary">
                Pinned
              </p>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {pinnedItems.map((item) => (
                  <PinnedCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 카테고리 탭 + 카드 리스트 */}
      <section className="bg-surface py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="lg:pl-12">
            {/* 카테고리 탭 */}
            {categories.length > 1 && (
              <div className="mb-10 flex flex-wrap gap-2 border-b border-border pb-4">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      activeCategory === cat
                        ? "bg-primary text-white"
                        : "bg-white text-muted hover:text-foreground border border-border"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}

            {/* 1단 카드 리스트 */}
            {filteredNews.length > 0 ? (
              <div className="space-y-6">
                {filteredNews.map((item) => (
                  <NewsCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="overflow-hidden p-0">
                    <div className="flex flex-col sm:flex-row">
                      <div className="aspect-[16/10] sm:w-64 flex-shrink-0 bg-border/20" />
                      <div className="flex-1 p-6 space-y-3">
                        <div className="h-3 w-20 rounded bg-border/20" />
                        <div className="h-5 w-3/4 rounded bg-border/20" />
                        <div className="h-4 w-1/2 rounded bg-border/20" />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
