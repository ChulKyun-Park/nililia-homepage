"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const languages = [
  { code: "KR", label: "한국어", flag: "https://flagcdn.com/w40/kr.png" },
  { code: "EN", label: "English", flag: "https://flagcdn.com/w40/us.png" },
  { code: "CN", label: "中文(简体)", flag: "https://flagcdn.com/w40/cn.png" },
  { code: "TW", label: "中文(繁體)", flag: "https://flagcdn.com/w40/tw.png" },
  { code: "JP", label: "日本語", flag: "https://flagcdn.com/w40/jp.png" },
  { code: "VN", label: "Tiếng Việt", flag: "https://flagcdn.com/w40/vn.png" },
  { code: "ES", label: "Español", flag: "https://flagcdn.com/w40/es.png" },
  { code: "ID", label: "Bahasa Indonesia", flag: "https://flagcdn.com/w40/id.png" },
  { code: "TH", label: "ภาษาไทย", flag: "https://flagcdn.com/w40/th.png" },
  { code: "RU", label: "Русский", flag: "https://flagcdn.com/w40/ru.png" },
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
            <img src={lang.flag} alt={lang.code} className="h-4 w-6 rounded-sm object-cover" loading="eager" />
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
        <img src={selected.flag} alt={selected.code} className="h-4 w-6 rounded-sm object-cover" loading="eager" />
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
                <img src={lang.flag} alt={lang.code} className="h-4 w-6 rounded-sm object-cover" loading="eager" />
                <span>{lang.label}</span>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
