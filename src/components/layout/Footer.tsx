import Link from "next/link";
import { Phone, Mail } from "lucide-react";

const serviceLinks = [
  { label: "영상 번역", href: "/services" },
  { label: "문서 번역", href: "/services" },
  { label: "웹소설 · 웹툰", href: "/services" },
  { label: "SDH 자막 제작", href: "/services" },
  { label: "홈페이지 · 앱 현지화", href: "/services" },
  { label: "게임 번역", href: "/services" },
  { label: "MTPE", href: "/services" },
  { label: "AI 번역 · 더빙", href: "/services" },
];

const familySites = [
  { label: "CONTENTSFLY", href: "#" },
  { label: "CONTENTSFLYS", href: "#" },
  { label: "CAREERS", href: "/career" },
];

/* SNS 아이콘 — 인라인 SVG */
const socialLinks = [
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: "Blog",
    href: "#",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "#",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "#",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <>
      <footer className="border-t border-border bg-surface text-foreground">
        <div className="mx-auto max-w-7xl px-6">
          {/* 4-column grid */}
          <div className="grid grid-cols-1 gap-10 py-16 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.8fr]">
            {/* Column 1: Company Info */}
            <div>
              <h3 className="mb-5 text-lg font-bold text-foreground">
                (주)닐릴리아
              </h3>
              <ul className="space-y-2 text-[length:var(--font-size-footer)] leading-relaxed text-muted">
                <li>경기도 안양시 동안구 시민대로 327번길 11-41, 6층</li>
                <li>대표자 : 박철균 | 사업자 등록번호 : 481-81-00251</li>
                <li>
                  고객센터 :{" "}
                  <a
                    href="tel:070-5227-1571"
                    className="font-medium text-foreground hover:text-primary transition-colors"
                  >
                    070-5227-1571
                  </a>
                </li>
              </ul>

              {/* Copyright */}
              <p className="mt-6 text-xs text-muted">
                &copy; {new Date().getFullYear()} Nililia Inc. All rights
                reserved.
              </p>

              {/* SNS Icons */}
              <div className="mt-4 flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="text-muted transition-colors hover:text-primary"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2: Services */}
            <div>
              <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-muted">
                번역 · 현지화
              </h3>
              <ul className="space-y-2">
                {serviceLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[length:var(--font-size-footer)] text-muted transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Family Sites */}
            <div>
              <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-muted">
                패밀리 사이트
              </h3>
              <ul className="space-y-2.5">
                {familySites.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Contact */}
            <div>
              <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-muted">
                문의하기
              </h3>
              <p className="mb-4 text-xs text-muted">
                문의 가능 시간 : 10:00 ~ 19:00
              </p>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2 text-muted">
                  <Phone className="h-4 w-4 text-primary/60" />
                  <span>번역 문의</span>
                  <a
                    href="tel:070-5227-1571"
                    className="font-medium text-foreground hover:text-primary transition-colors"
                  >
                    070-5227-1571
                  </a>
                </li>
                <li className="flex items-center gap-2 text-muted">
                  <Mail className="h-4 w-4 text-primary/60" />
                  <span>기업 번역 문의</span>
                  <a
                    href="mailto:sales@nililia.com"
                    className="font-medium text-foreground hover:text-primary transition-colors"
                  >
                    sales@nililia.com
                  </a>
                </li>
                <li className="flex items-center gap-2 text-muted">
                  <Mail className="h-4 w-4 text-primary/60" />
                  <span>사업 제휴 문의</span>
                  <a
                    href="mailto:partnership@nililia.com"
                    className="font-medium text-foreground hover:text-primary transition-colors"
                  >
                    partnership@nililia.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col items-center justify-between gap-4 border-t border-border py-8 text-sm text-muted md:flex-row">
            <div className="flex gap-6">
              <Link
                href="#"
                className="transition-colors hover:text-foreground"
              >
                이용약관
              </Link>
              <Link
                href="#"
                className="transition-colors hover:text-foreground"
              >
                개인정보처리방침
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating CTA */}
      <div className="fixed bottom-6 right-6 z-40">
        <Link
          href="/contact"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/30 transition-all hover:scale-110 hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/40"
          aria-label="문의하기"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </Link>
      </div>
    </>
  );
}
