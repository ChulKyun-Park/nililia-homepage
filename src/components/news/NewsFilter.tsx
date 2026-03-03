"use client";

import { useState, useMemo, useRef, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Card from "@/components/ui/Card";
import type { NotionNewsItem } from "@/types/notion";

const ITEMS_PER_PAGE = 10;

/** 공백 제거 후 비교 — Notion DB 옵션("업계동향")과 UI 탭("업계 동향") 차이 허용 */
function matchCategory(itemCat: string, tabCat: string): boolean {
  return itemCat.replace(/\s/g, "") === tabCat.replace(/\s/g, "");
}

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

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  // 표시할 페이지 번호 범위 계산 (최대 5개)
  const maxVisible = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  const endPage = Math.min(totalPages, startPage + maxVisible - 1);
  if (endPage - startPage + 1 < maxVisible) {
    startPage = Math.max(1, endPage - maxVisible + 1);
  }

  const pages: number[] = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <nav className="mt-12 flex items-center justify-center gap-1" aria-label="페이지네이션">
      {/* 이전 */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex h-10 w-10 items-center justify-center rounded-lg text-muted transition-colors hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="이전 페이지"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {/* 페이지 번호 */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm transition-colors ${
            page === currentPage
              ? "font-bold text-primary"
              : "text-muted hover:text-foreground"
          }`}
          aria-label={`${page}페이지`}
          aria-current={page === currentPage ? "page" : undefined}
        >
          {page}
        </button>
      ))}

      {/* 다음 */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex h-10 w-10 items-center justify-center rounded-lg text-muted transition-colors hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="다음 페이지"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </nav>
  );
}

export default function NewsFilter({ news }: { news: NotionNewsItem[] }) {
  const [activeCategory, setActiveCategory] = useState("전체");
  const [currentPage, setCurrentPage] = useState(1);
  const listSectionRef = useRef<HTMLElement>(null);

  // Pinned 항목 분리 (최대 5개)
  const pinnedItems = useMemo(() => news.filter((n) => n.pinned).slice(0, 5), [news]);

  // 고정 카테고리 목록 (Notion DB Category select 옵션과 일치해야 함)
  const categories = ["전체", "공지", "번역 팁", "업계 동향", "기술", "ETC"];

  // 필터링된 일반 글 (pinned 포함 — 전체 목록에서 카테고리만 필터)
  const filteredNews = useMemo(() => {
    if (activeCategory === "전체") return news;
    return news.filter((n) => matchCategory(n.category, activeCategory));
  }, [news, activeCategory]);

  // 페이지네이션 계산
  const totalPages = Math.max(1, Math.ceil(filteredNews.length / ITEMS_PER_PAGE));
  const paginatedNews = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredNews.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredNews, currentPage]);

  // 카테고리 변경 시 1페이지로 리셋
  const handleCategoryChange = useCallback((cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  }, []);

  // 페이지 변경 시 일반 글 영역 상단으로 스크롤
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    listSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

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
      <section ref={listSectionRef} className="bg-surface py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="lg:pl-12">
            {/* 카테고리 탭 */}
            <div className="mb-10 flex flex-wrap gap-2 border-b border-border pb-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
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

            {/* 1단 카드 리스트 */}
            {paginatedNews.length > 0 ? (
              <>
                <div className="space-y-6">
                  {paginatedNews.map((item) => (
                    <NewsCard key={item.id} item={item} />
                  ))}
                </div>

                {/* 페이지네이션 */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </>
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
