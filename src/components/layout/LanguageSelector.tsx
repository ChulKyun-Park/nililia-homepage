"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const languages = [
  { code: "KR", label: "한국어", flag: "\u{1F1F0}\u{1F1F7}" },
  { code: "EN", label: "English", flag: "\u{1F1FA}\u{1F1F8}" },
  { code: "CN", label: "中文(简体)", flag: "\u{1F1E8}\u{1F1F3}" },
  { code: "TW", label: "中文(繁體)", flag: "\u{1F1F9}\u{1F1FC}" },
  { code: "JP", label: "日本語", flag: "\u{1F1EF}\u{1F1F5}" },
  { code: "VN", label: "Tiếng Việt", flag: "\u{1F1FB}\u{1F1F3}" },
  { code: "ES", label: "Español", flag: "\u{1F1EA}\u{1F1F8}" },
  { code: "ID", label: "Bahasa Indonesia", flag: "\u{1F1EE}\u{1F1E9}" },
  { code: "TH", label: "ภาษาไทย", flag: "\u{1F1F9}\u{1F1ED}" },
  { code: "RU", label: "Русский", flag: "\u{1F1F7}\u{1F1FA}" },
];

interface LanguageSelectorProps {
  className?: string;
  /** Render as full-width list (mobile) instead of dropdown */
  variant?: "dropdown" | "list";
}

export default function LanguageSelector({
  className,
  variant = "dropdown",
}: LanguageSelectorProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(languages[0]);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSelect = (lang: (typeof languages)[0]) => {
    setSelected(lang);
    setOpen(false);
    // TODO: i18n 라우팅 연동 시 여기에 언어 변경 로직 추가
  };

  // Mobile list variant
  if (variant === "list") {
    return (
      <div className={cn("flex flex-wrap gap-2", className)}>
        {languages.map((lang) => (
          <button
            key={lang.code}
            type="button"
            onClick={() => handleSelect(lang)}
            className={cn(
              "inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
              selected.code === lang.code
                ? "bg-primary text-white"
                : "bg-surface text-muted hover:bg-border hover:text-foreground",
            )}
          >
            <span>{lang.flag}</span>
            <span>{lang.code}</span>
          </button>
        ))}
      </div>
    );
  }

  // Desktop dropdown variant
  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
      >
        <span className="text-base leading-none">{selected.flag}</span>
        <span>{selected.code}</span>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 transition-transform",
            open && "rotate-180",
          )}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-1 min-w-[200px] rounded-xl border border-border bg-white py-1 shadow-xl">
          {languages.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => handleSelect(lang)}
              className={cn(
                "flex w-full items-center justify-between px-4 py-2.5 text-sm transition-colors hover:bg-surface",
                selected.code === lang.code
                  ? "font-semibold text-primary"
                  : "text-foreground",
              )}
            >
              <span className="inline-flex items-center gap-2">
                <span className="text-base leading-none">{lang.flag}</span>
                <span>{lang.label}</span>
              </span>
              <span className="text-xs text-muted">{lang.code}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
