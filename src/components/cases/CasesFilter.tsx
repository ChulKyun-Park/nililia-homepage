"use client";

import { useState, useMemo } from "react";
import Card from "@/components/ui/Card";
import type { NotionCaseStudyItem } from "@/types/notion";

/* ──────────────────────────────────────────────────────
 * Notion field mapping
 * ──────────────────────────────────────────────────────
 *  content_type   → Category (select)
 *  industry_field → Tags (multi_select) — first tag used as industry pill
 *  client_name    → Client (rich_text)
 *  project_title  → Title (rich_text)
 *  languages      → Languages (rich_text)   e.g. "KR → EN"
 *  duration       → Duration (rich_text)    e.g. "3주"
 *  content_volume → Results (rich_text)     e.g. "15종 콘텐츠"
 * ────────────────────────────────────────────────────── */

/* ── Primary Filter: Content Types (sidebar) ── */
const CONTENT_TYPES = [
  "영상",
  "문서",
  "웹소설/웹툰",
  "홈페이지/앱",
  "게임",
  "SDH",
  "MTPE",
] as const;

type ContentType = (typeof CONTENT_TYPES)[number];

/* ── Secondary Filter: Industry / Field per content type ── */
const INDUSTRY_MAP: Record<ContentType, string[]> = {
  "영상":       ["예능", "드라마", "영화", "OTT", "유튜브"],
  "문서":       ["마케팅", "법률", "HR", "세무", "기술"],
  "웹소설/웹툰": ["로맨스", "판타지", "무협", "BL", "액션"],
  "홈페이지/앱": ["이커머스", "SaaS", "핀테크", "헬스케어", "교육"],
  "게임":       ["모바일", "콘솔", "RPG", "캐주얼"],
  "SDH":       ["예능", "드라마", "영화", "다큐멘터리"],
  "MTPE":      ["마케팅", "기술", "법률", "의료"],
};

/** 공백 제거 후 비교 — Notion DB Category 옵션 차이 허용 */
function matchType(itemCategory: string, type: string): boolean {
  return itemCategory.replace(/\s/g, "").toLowerCase() === type.replace(/\s/g, "").toLowerCase();
}

/* ── Case Card ── */
function CaseCard({ item }: { item: NotionCaseStudyItem }) {
  const meta = [item.languages, item.duration, item.results]
    .filter(Boolean)
    .join(" | ");

  return (
    <a href={`/cases/${item.slug}`} className="block h-full">
      <Card className="group flex h-full cursor-pointer flex-col p-6">
        {/* Industry tag (pill) */}
        {item.tags.length > 0 && (
          <span className="inline-block self-start rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted">
            {item.tags[0]}
          </span>
        )}

        {/* Client name — largest, boldest */}
        <h3 className="mt-3 text-lg font-bold text-foreground group-hover:text-primary transition-colors break-keep lg:text-xl">
          {item.client || item.title}
        </h3>

        {/* Project title — one line */}
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

        {/* Meta info — bottom */}
        {meta && (
          <div className="mt-auto pt-4">
            <p className="text-xs text-muted/60">{meta}</p>
          </div>
        )}
      </Card>
    </a>
  );
}

/* ── Skeleton Card (empty state) ── */
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

/* ── Main Component ── */
export default function CasesFilter({
  cases,
}: {
  cases: NotionCaseStudyItem[];
}) {
  const [activeType, setActiveType] = useState<ContentType>("영상");
  const [activeField, setActiveField] = useState("전체");

  /* Available industry fields — static defaults + any extra from actual data */
  const availableFields = useMemo(() => {
    const staticFields = INDUSTRY_MAP[activeType] || [];
    const dataFields = new Set<string>();
    cases
      .filter((c) => matchType(c.category, activeType))
      .forEach((c) => c.tags.forEach((t) => dataFields.add(t)));

    const merged = [...staticFields];
    dataFields.forEach((f) => {
      if (!merged.includes(f)) merged.push(f);
    });
    return merged;
  }, [cases, activeType]);

  /* Filtered cases: content type (primary) + industry field (secondary) */
  const filteredCases = useMemo(() => {
    let result = cases.filter((c) => matchType(c.category, activeType));
    if (activeField !== "전체") {
      result = result.filter((c) => c.tags.some((t) => t === activeField));
    }
    return result;
  }, [cases, activeType, activeField]);

  /* Count per content type — for optional count badge */
  const countByType = useMemo(() => {
    const map: Record<string, number> = {};
    CONTENT_TYPES.forEach((type) => {
      map[type] = cases.filter((c) => matchType(c.category, type)).length;
    });
    return map;
  }, [cases]);

  const handleTypeChange = (type: ContentType) => {
    setActiveType(type);
    setActiveField("전체");
  };

  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* ═══════ LEFT SIDEBAR ═══════ */}
          <aside className="lg:w-44 flex-shrink-0">
            <nav className="flex lg:flex-col gap-1.5 overflow-x-auto lg:overflow-visible pb-3 lg:pb-0 lg:sticky lg:top-24 -mx-1 px-1">
              {CONTENT_TYPES.map((type) => {
                const isActive = activeType === type;
                const count = countByType[type];
                return (
                  <button
                    key={type}
                    onClick={() => handleTypeChange(type)}
                    className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-medium transition-all text-left ${
                      isActive
                        ? "bg-primary text-white shadow-sm"
                        : "text-muted hover:text-foreground hover:bg-surface"
                    }`}
                  >
                    <span>{type}</span>
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
            {/* Top Horizontal Filter — Secondary (Industry / Field) */}
            <div className="mb-8 flex flex-wrap gap-2">
              <button
                onClick={() => setActiveField("전체")}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  activeField === "전체"
                    ? "bg-foreground text-white"
                    : "text-muted hover:text-foreground border border-border"
                }`}
              >
                전체
              </button>
              {availableFields.map((field) => (
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
              /* Empty state — skeletons + message */
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
