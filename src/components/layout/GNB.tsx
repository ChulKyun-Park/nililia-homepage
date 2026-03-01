"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu, X, Download, Home } from "lucide-react";
import Button from "@/components/ui/Button";
import LanguageSelector from "@/components/layout/LanguageSelector";

const navLinks = [
  { label: "홈", href: "/", icon: true },
  { label: "회사소개", href: "/about" },
  { label: "서비스", href: "/services" },
  { label: "성공사례", href: "/cases" },
  { label: "소식", href: "/news" },
  { label: "채용", href: "/career" },
] as const;

export default function GNB() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-white/10 bg-dark-bg/95 backdrop-blur supports-[backdrop-filter]:bg-dark-bg/80"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:h-20">
        {/* Left: Logo */}
        <Link href="/" className="shrink-0">
          <span className="text-xl font-bold text-primary">NILILIA</span>
        </Link>

        {/* Center: Navigation */}
        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[length:var(--font-size-gnb)] font-medium text-white/60 transition-colors hover:text-white"
              aria-label={link.label}
            >
              {"icon" in link ? (
                <Home className="h-[18px] w-[18px]" />
              ) : (
                link.label
              )}
            </Link>
          ))}
        </nav>

        {/* Right: Language + CTA Buttons */}
        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSelector />
          <Button
            href="/contact"
            variant="primary"
            className="px-5 py-2.5 text-sm"
          >
            문의하기
          </Button>
          <a
            href="#"
            className="inline-flex items-center gap-1.5 rounded-xl border border-white/20 px-4 py-2.5 text-sm font-medium text-white/80 transition-colors hover:border-white/40 hover:text-white"
          >
            <Download className="h-4 w-4" />
            회사소개서
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-lg p-2 text-white/60 hover:bg-white/10 lg:hidden"
          aria-label="메뉴 열기"
        >
          {mobileOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-white/10 bg-dark-bg lg:hidden">
          <nav className="mx-auto max-w-7xl px-6 py-4">
            {/* Navigation Links */}
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-4 py-3 text-base font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-primary"
                  aria-label={link.label}
                >
                  {"icon" in link ? (
                    <>
                      <Home className="h-5 w-5" />
                      <span>{link.label}</span>
                    </>
                  ) : (
                    link.label
                  )}
                </Link>
              ))}
            </div>

            {/* Divider */}
            <div className="my-4 border-t border-white/10" />

            {/* Language Selector */}
            <div className="px-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/40">
                Language
              </p>
              <LanguageSelector variant="list" />
            </div>

            {/* Divider */}
            <div className="my-4 border-t border-white/10" />

            {/* CTA Buttons */}
            <div className="space-y-3 px-4">
              <Button
                href="/contact"
                variant="primary"
                className="w-full justify-center py-3"
              >
                문의하기
              </Button>
              <a
                href="#"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 px-4 py-3 text-sm font-medium text-white/80 transition-colors hover:bg-white/5"
              >
                <Download className="h-4 w-4" />
                회사소개서 다운로드
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
