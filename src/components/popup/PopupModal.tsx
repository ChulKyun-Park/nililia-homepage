"use client";

import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { NotionPopupItem } from "@/lib/notion/homePreview";

const STORAGE_KEY_PREFIX = "popup_dismissed_";

function getTodayKey(): string {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${STORAGE_KEY_PREFIX}${yyyy}-${mm}-${dd}`;
}

export default function PopupModal({ popups }: { popups: NotionPopupItem[] }) {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (popups.length === 0) return;
    try {
      const dismissed = localStorage.getItem(getTodayKey());
      if (!dismissed) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, [popups]);

  const handleClose = useCallback(() => {
    setVisible(false);
  }, []);

  const handleDismissToday = useCallback(() => {
    try {
      localStorage.setItem(getTodayKey(), "1");
    } catch {}
    setVisible(false);
  }, []);

  const prev = useCallback(() => {
    setCurrent((c) => (c > 0 ? c - 1 : popups.length - 1));
  }, [popups.length]);

  const next = useCallback(() => {
    setCurrent((c) => (c < popups.length - 1 ? c + 1 : 0));
  }, [popups.length]);

  if (!visible || popups.length === 0) return null;

  const item = popups[current];

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/30 text-white transition-colors hover:bg-black/50"
          aria-label="닫기"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Content — clickable */}
        <a
          href={item.link || undefined}
          target={item.source === "popup" && item.link?.startsWith("http") ? "_blank" : undefined}
          rel={item.source === "popup" ? "noopener noreferrer" : undefined}
          className="block"
        >
          {item.image ? (
            <div className="aspect-[4/5] w-full overflow-hidden bg-surface">
              <img
                src={item.image}
                alt={item.title || "팝업 이미지"}
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <div className="flex aspect-[4/5] w-full items-center justify-center bg-primary/5 p-8">
              <p className="text-center text-lg font-bold text-foreground break-keep">
                {item.title}
              </p>
            </div>
          )}

          {/* Title bar for news-sourced popups with image */}
          {item.source === "news" && item.title && item.image && (
            <div className="border-t border-border px-5 py-3">
              <p className="line-clamp-2 text-sm font-semibold text-foreground break-keep">
                {item.title}
              </p>
            </div>
          )}
        </a>

        {/* Navigation arrows */}
        {popups.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/30 text-white transition-colors hover:bg-black/50"
              aria-label="이전"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/30 text-white transition-colors hover:bg-black/50"
              aria-label="다음"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        {/* Footer: dot indicator + dismiss */}
        <div className="flex items-center justify-between border-t border-border px-4 py-3">
          <button
            onClick={handleDismissToday}
            className="text-xs text-muted hover:text-foreground transition-colors"
          >
            오늘 하루 안 보기
          </button>

          {popups.length > 1 && (
            <div className="flex items-center gap-1.5">
              {popups.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === current
                      ? "w-4 bg-primary"
                      : "w-1.5 bg-border hover:bg-muted"
                  }`}
                  aria-label={`팝업 ${i + 1}`}
                />
              ))}
            </div>
          )}

          <button
            onClick={handleClose}
            className="text-xs text-muted hover:text-foreground transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
