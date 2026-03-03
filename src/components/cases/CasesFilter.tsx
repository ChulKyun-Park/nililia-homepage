"use client";

import { useState, useMemo } from "react";
import Card from "@/components/ui/Card";
import type { NotionCaseStudyItem } from "@/types/notion";

/* ──────────────────────────────────────────────────────
 * Notion DB  →  UI field mapping (CMS 가이드 기준)
 * ──────────────────────────────────────────────────────
 *  ContentType  → category  (select)   — 사이드바 필터
 *  Field        → tags      (multi_select) — 2차 칩 필터
 *  필드명(title) → client   (title)    — 고객사명/카드 타이틀
 *  Task         → title     (rich_text) — 과업명(1줄 요약)
 *  Languages    → languages (rich_text) — e.g. "KR → EN"
 *  Duration     → duration  (rich_text) — e.g. "3주"
 *  Results      → results   (rich_text) — e.g. "15종 콘텐츠"
 *  Pinned       → pinned    (checkbox)  — pinned=true items first
 *  Published    → published (checkbox)  — only true shown (server-side)
 * ────────────────────────────────────────────────────── */

/* ── Sidebar items — CMS 가이드 ContentType 옵션 기준 ── */
const ALL = "전체";
const SIDEBAR_ITEMS = [
  ALL,
  "영상",
  "문서",
  "SDH",
  "홈페이지 · 앱",
  "웹소설 · 웹툰",
  "게임",
  "MTPE",
  "AI 번역 · 더빙",
] as const;

type SidebarItem = (typeof SIDEBAR_ITEMS)[number];

/* ── Fallback field chips per content type ── */
const FALLBACK_FIELDS: Record<string, string[]> = {
  "영상":          ["예능", "드라마", "영화"],
  "문서":          ["마케팅", "기술", "법률", "의료"],
  "홈페이지 · 앱": ["랜딩", "앱", "웹"],
  "웹소설 · 웹툰": ["웹툰", "웹소설"],
  "게임":          ["모바일", "콘솔", "RPG", "캐주얼"],
  // SDH, MTPE, AI 번역 · 더빙: no fallback — "전체" only is fine
};

/** Whitespace-insensitive category comparison */
function matchType(itemCategory: string, type: string): boolean {
  return (
    itemCategory.replace(/\s/g, "").toLowerCase() ===
    type.replace(/\s/g, "").toLowerCase()
  );
}

/* ══════════════════════════════════════════════════════
 * Case Card
 * ══════════════════════════════════════════════════════ */
function CaseCard({ item }: { item: NotionCaseStudyItem }) {
  const meta = [item.languages, item.duration, item.results]
    .filter(Boolean)
    .join(" | ");

  return (
    <a href={`/cases/${item.slug}`} className="block h-full">
      <Card className="group flex h-full cursor-pointer flex-col p-6">
        {/* Field tag (pill) — first tag */}
        {item.tags.length > 0 && (
          <span className="inline-block self-start rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted">
            {item.tags[0]}
          </span>
        )}

        {/* Client name — bold, largest */}
        <h3 className="mt-3 text-lg font-bold text-foreground group-hover:text-primary transition-colors break-keep lg:text-xl">
          {item.client || item.title}
        </h3>

        {/* Task title — one-line summary */}
        {item.title && item.client && (
          <p className="mt-1 line-clamp-1 text-sm text-muted break-keep">
            {item.title}
          </p>
        )}

        {/* Excerpt — optional, max 2 lines */}
        {item.excerpt && (
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted/80 break-keep">
            {item.excerpt}
          </p>
        )}

        {/* Meta line — bottom-anchored */}
        {meta && (
          <div className="mt-auto pt-4">
            <p className="text-xs text-muted/60">{meta}</p>
          </div>
        )}
      </Card>
    </a>
  );
}

/* ── Skeleton Card ── */
function SkeletonCard() {
  return (
    <Card className="flex flex-col p-6">
      <div className="h-5 w-16 rounded-full bg-surface" />
      <div className="mt-4 h-6 w-3/5 rounded bg-surface" />
      <div className="mt-2 h-4 w-full rounded bg-surface" />
      <div className="mt-auto pt-4">
        <div className="h-3 w-2/5 rounded bg-surface" />
      </div>
    </Card>
  );
}

/* ══════════════════════════════════════════════════════
 * Main Component
 * ══════════════════════════════════════════════════════ */
export default function CasesFilter({
  cases,
}: {
  cases: NotionCaseStudyItem[];
}) {
  const [activeSidebar, setActiveSidebar] = useState<SidebarItem>(ALL);
  const [activeField, setActiveField] = useState(ALL);

  /* ── Cases scoped by primary filter (content type) ── */
  const scopedCases = useMemo(() => {
    if (activeSidebar === ALL) return cases;
    return cases.filter((c) => matchType(c.category, activeSidebar));
  }, [cases, activeSidebar]);

  /* ── Raw data fields — extracted from scoped cases' Tags ── */
  const rawDataFields = useMemo(() => {
    const set = new Set<string>();
    scopedCases.forEach((c) => c.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort((a, b) => a.localeCompare(b, "ko"));
  }, [scopedCases]);

  /* ── Displayed field chips — data fields OR fallback ── */
  const { displayedFields, usingFallback } = useMemo(() => {
    // If we have real data fields, use them
    if (rawDataFields.length > 0) {
      return { displayedFields: rawDataFields, usingFallback: false };
    }

    // Otherwise, compute fallback
    if (activeSidebar === ALL) {
      // Union of all fallback fields (deduped)
      const union = new Set<string>();
      Object.values(FALLBACK_FIELDS).forEach((arr) =>
        arr.forEach((f) => union.add(f))
      );
      return {
        displayedFields: Array.from(union).sort((a, b) =>
          a.localeCompare(b, "ko")
        ),
        usingFallback: true,
      };
    }

    // Specific content type fallback
    const fb = FALLBACK_FIELDS[activeSidebar] || [];
    return { displayedFields: fb, usingFallback: true };
  }, [rawDataFields, activeSidebar]);

  /* ── Final filtered list: scoped + field filter ── */
  const filteredCases = useMemo(() => {
    let result = scopedCases;
    if (activeField !== ALL) {
      result = result.filter((c) => c.tags.includes(activeField));
    }
    // Sort: pinned first, then by publishedAt desc
    return [...result].sort((a, b) => {
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
      return (b.publishedAt || "").localeCompare(a.publishedAt || "");
    });
  }, [scopedCases, activeField]);

  /* ── Per-type count (for badge) ── */
  const countByItem = useMemo(() => {
    const map: Record<string, number> = {};
    map[ALL] = cases.length;
    SIDEBAR_ITEMS.forEach((item) => {
      if (item === ALL) return;
      map[item] = cases.filter((c) => matchType(c.category, item)).length;
    });
    return map;
  }, [cases]);

  /* ── Handlers ── */
  const handleSidebarChange = (item: SidebarItem) => {
    setActiveSidebar(item);
    setActiveField(ALL); // reset secondary when primary changes
  };

  return (
    <section className="bg-white py-12 lg:py-16">

      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* ═══════ LEFT SIDEBAR — Primary Filter ═══════ */}
          <aside className="lg:w-44 flex-shrink-0">
            <nav className="flex lg:flex-col gap-1.5 overflow-x-auto lg:overflow-visible pb-3 lg:pb-0 lg:sticky lg:top-24 -mx-1 px-1">
              {SIDEBAR_ITEMS.map((item) => {
                const isActive = activeSidebar === item;
                const count = countByItem[item];
                return (
                  <button
                    key={item}
                    onClick={() => handleSidebarChange(item)}
                    className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-medium transition-all text-left ${
                      isActive
                        ? "bg-primary text-white shadow-sm"
                        : "text-muted hover:text-foreground hover:bg-surface"
                    }`}
                  >
                    <span>{item}</span>
                    {count > 0 && (
                      <span
                        className={`ml-auto text-xs ${
                          isActive ? "text-white/70" : "text-muted/50"
                        }`}
                      >
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* ═══════ RIGHT CONTENT AREA ═══════ */}
          <div className="flex-1 min-w-0">
            {/* Top Chips — Secondary Filter (Field / Industry) */}
            <div className="mb-8 flex flex-wrap gap-2">
              <button
                onClick={() => setActiveField(ALL)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  activeField === ALL
                    ? "bg-foreground text-white"
                    : "text-muted hover:text-foreground border border-border"
                }`}
              >
                전체
              </button>
              {displayedFields.map((field) => (
                <button
                  key={field}
                  onClick={() => setActiveField(field)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                    activeField === field
                      ? "bg-foreground text-white"
                      : "text-muted hover:text-foreground border border-border"
                  }`}
                >
                  {field}
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="mb-8 border-t border-border" />

            {/* Card Grid */}
            {filteredCases.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredCases.map((item) => (
                  <CaseCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              /* Empty state */
              <div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {[1, 2, 3].map((i) => (
                    <SkeletonCard key={i} />
                  ))}
                </div>
                <p className="mt-8 text-center text-sm text-muted">
                  해당 분류의 진행 사례가 준비 중입니다.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
