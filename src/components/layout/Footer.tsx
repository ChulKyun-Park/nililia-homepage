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
    label: "네이버 블로그",
    href: "#",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <rect width="24" height="24" rx="6" />
        <path d="M6.5 6v12h3.2v-5.6L14.3 18h3.2V6h-3.2v5.6L9.7 6H6.5z" fill="white" />
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
    label: "Facebook",
    href: "#",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
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
          <div className="grid grid-cols-1 gap-5 py-8 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.5fr]">
            {/* Column 1: Company Info */}
            <div>
              <h3 className="mb-5 text-lg font-bold text-foreground">
                (주)닐리리아
              </h3>
              <ul className="space-y-1 text-sm leading-relaxed text-muted">
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
              <p className="mt-2 text-sm text-muted">
                &copy; {new Date().getFullYear()} Nililia Inc. All rights
                reserved.
              </p>

              {/* SNS Icons */}
              <div className="mt-2 flex items-center gap-3">
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
              <h3 className="mb-3 text-sm font-medium text-foreground">
                Services
              </h3>
              <ul className="space-y-1">
                {serviceLinks.map((link) => (
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

            {/* Column 3: Family Sites */}
            <div>
              <h3 className="mb-3 text-sm font-medium text-foreground">
                Family Sites
              </h3>
              <ul className="space-y-1">
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
              <h3 className="mb-3 text-sm font-medium text-foreground">
                Contact
              </h3>
              <p className="mb-2 text-sm text-muted">
                문의 가능 시간 : 10:00 ~ 19:00
              </p>
              <ul className="space-y-2 text-sm">
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
                  <span>기업 문의</span>
                  <a
                    href="mailto:sales@nililia.com"
                    className="font-medium text-foreground hover:text-primary transition-colors"
                  >
                    sales@nililia.com
                  </a>
                </li>
                <li className="flex items-center gap-2 text-muted">
                  <Mail className="h-4 w-4 text-primary/60" />
                  <span>제휴 문의</span>
                  <a
                    href="mailto:partnership@nililia.com"
                    className="font-medium text-foreground hover:text-primary transition-colors"
                  >
                    partnership@nililia.com
                  </a>
                </li>
                <li className="flex items-center gap-2 text-muted">
                  <Mail className="h-4 w-4 text-primary/60" />
                  <span>채용 문의</span>
                  <a
                    href="mailto:recruit@nililia.com"
                    className="font-medium text-foreground hover:text-primary transition-colors"
                  >
                    recruit@nililia.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* 이용약관 · 개인정보처리방침 */}
          <div className="flex gap-6 border-t border-border py-4 text-sm text-muted">
            <Link href="#" className="transition-colors hover:text-foreground">
              이용약관
            </Link>
            <Link href="#" className="transition-colors hover:text-foreground">
              개인정보처리방침
            </Link>
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
