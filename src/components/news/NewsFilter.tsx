"use client";

import { useState, useMemo, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import type { NotionNewsItem } from "@/types/notion";

const ITEMS_PER_PAGE = 6;

/** 공백 제거 후 비교 — Notion DB 옵션("업계동향")과 UI 탭("업계 동향") 차이 허용 */
function matchCategory(itemCat: string, tabCat: string): boolean {
  return itemCat.replace(/\s/g, "") === tabCat.replace(/\s/g, "");
}

/* ───── Best (Pinned) 카드 ───── */
function BestCard({ item }: { item: NotionNewsItem }) {
  return (
    <Link href={`/news/${item.slug}`} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-surface">
        {item.thumbnail ? (
          <Image
            src={item.thumbnail}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
            <span className="text-4xl font-bold text-primary/20">N</span>
          </div>
        )}
      </div>
      <p className="mt-3 line-clamp-2 text-sm font-semibold text-foreground group-hover:text-primary transition-colors break-keep leading-snug">
        {item.title}
      </p>
    </Link>
  );
}

/* ───── 글 목록 아이템 ───── */
function NewsListItem({ item }: { item: NotionNewsItem }) {
  return (
    <Link
      href={`/news/${item.slug}`}
      className="group flex items-start gap-6 border-b border-border py-6 last:border-b-0"
    >
      {/* 왼쪽: 텍스트 */}
      <div className="flex-1 min-w-0">
        {item.categories.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {item.categories.map((cat) => (
              <span key={cat} className="text-xs font-medium text-primary">
                {cat}
              </span>
            ))}
          </div>
        )}
        <h3 className="mt-1 line-clamp-2 text-base font-bold text-foreground group-hover:text-primary transition-colors break-keep sm:text-lg">
          {item.title}
        </h3>
        {item.excerpt && (
          <p className="mt-1 line-clamp-1 text-sm text-muted break-keep">
            {item.excerpt}
          </p>
        )}
        {item.publishedAt && (
          <time className="mt-2 block text-xs text-muted/70">
            {new Date(item.publishedAt).toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
          </time>
        )}
      </div>

      {/* 오른쪽: 썸네일 */}
      {item.thumbnail && (
        <div className="relative hidden sm:block h-24 w-36 flex-shrink-0 overflow-hidden rounded-xl bg-surface">
          <Image
            src={item.thumbnail}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
    </Link>
  );
}

/* ───── 페이지네이션 ───── */
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
    <nav
      className="mt-10 flex items-center justify-center gap-1"
      aria-label="페이지네이션"
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex h-9 w-9 items-center justify-center rounded-lg text-muted transition-colors hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="이전 페이지"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm transition-colors ${
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

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex h-9 w-9 items-center justify-center rounded-lg text-muted transition-colors hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="다음 페이지"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
}

/* ───── 메인 컴포넌트 ───── */
export default function NewsFilter({ news }: { news: NotionNewsItem[] }) {
  const [activeCategory, setActiveCategory] = useState("전체");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const listSectionRef = useRef<HTMLElement>(null);

  // Pinned 항목 분리 (최대 3개 — Best 섹션)
  const pinnedItems = useMemo(
    () => news.filter((n) => n.pinned).slice(0, 3),
    [news],
  );

  // 카테고리를 Notion 데이터에서 동적 생성 — "전체" + 실제 사용된 카테고리만
  const categories = useMemo(() => {
    const uniqueCats = [
      ...new Set(news.flatMap((n) => n.categories).filter(Boolean)),
    ];
    return ["전체", ...uniqueCats];
  }, [news]);

  // 필터링 (카테고리 + 검색)
  const filteredNews = useMemo(() => {
    let result = news;
    if (activeCategory !== "전체") {
      result = result.filter((n) =>
        n.categories.some((cat) => matchCategory(cat, activeCategory)),
      );
    }
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.excerpt.toLowerCase().includes(q),
      );
    }
    return result;
  }, [news, activeCategory, searchQuery]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredNews.length / ITEMS_PER_PAGE),
  );
  const paginatedNews = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredNews.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredNews, currentPage]);

  const handleCategoryChange = useCallback((cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    listSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  return (
    <>
      {/* ─── Best 섹션 (Pinned) ─── */}
      {pinnedItems.length > 0 && (
        <section className="bg-white py-12 lg:py-16">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-xl font-bold text-foreground sm:text-2xl">
              Best
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pinnedItems.map((item) => (
                <BestCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── 구분선 ─── */}
      <div className="mx-auto max-w-5xl px-6">
        <hr className="border-border" />
      </div>

      {/* ─── 카테고리 필터 + 검색 + 글 목록 ─── */}
      <section ref={listSectionRef} className="bg-white py-10 lg:py-14">
        <div className="mx-auto max-w-5xl px-6">
          {/* 필터 행 */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* 카테고리 탭 */}
            <div className="flex flex-wrap gap-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-3.5 py-2 text-sm font-medium transition-colors ${
                    activeCategory === cat
                      ? "text-primary border-b-2 border-primary"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* 검색바 */}
            <div className="relative w-full sm:w-56">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="검색"
                className="w-full rounded-lg border border-border bg-white py-2 pl-3 pr-9 text-sm text-foreground placeholder:text-muted/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted/50" />
            </div>
          </div>

          {/* 정렬 라벨 */}
          <div className="mt-6 flex justify-end text-xs text-muted">
            <span className="font-medium text-foreground">• 최신순</span>
          </div>

          {/* 글 리스트 */}
          {paginatedNews.length > 0 ? (
            <div className="mt-2">
              {paginatedNews.map((item) => (
                <NewsListItem key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-muted">
                {searchQuery
                  ? "검색 결과가 없습니다."
                  : "등록된 소식이 없습니다."}
              </p>
            </div>
          )}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </section>
    </>
  );
}
