import Link from "next/link";
import { Phone, Mail, MessageSquare } from "lucide-react";

const translationLinks = [
  { label: "영상 번역", href: "/services" },
  { label: "문서 번역", href: "/services" },
  { label: "웹소설 · 웹툰 번역", href: "/services" },
  { label: "게임 번역", href: "/services" },
  { label: "SDH 자막 제작", href: "/services" },
];

const techLinks = [
  { label: "TMS", href: "/services" },
  { label: "MTPE", href: "/services" },
];

const familySites = [
  { label: "CONTENTSFLY", href: "#" },
  { label: "CONTENTSFLYS", href: "#" },
  { label: "CAREERS", href: "/career" },
];

export default function Footer() {
  return (
    <>
      <footer className="border-t border-white/10 bg-dark-bg text-white">
        <div className="mx-auto max-w-7xl px-6">
          {/* 4-column grid */}
          <div className="grid grid-cols-1 gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
            {/* Column 1: Company Info */}
            <div>
              <h3 className="mb-5 text-lg font-bold text-white">
                (주)닐리리아
              </h3>
              <ul className="space-y-2.5 text-[length:var(--font-size-footer)] leading-relaxed text-white/50">
                <li>서울특별시 강남구 테헤란로 123, 4층</li>
                <li>대표자: 홍길동</li>
                <li>사업자등록번호: 000-00-00000</li>
                <li>통신판매업신고: 제2024-서울강남-00000호</li>
              </ul>
            </div>

            {/* Column 2: Services (번역 + 기술 분리) */}
            <div>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">
                번역 · 현지화
              </h4>
              <ul className="space-y-2">
                {translationLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[length:var(--font-size-footer)] text-white/60 transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <h4 className="mb-3 mt-5 text-xs font-semibold uppercase tracking-wider text-white/40">
                기술
              </h4>
              <ul className="space-y-2">
                {techLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[length:var(--font-size-footer)] text-white/60 transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Family Sites */}
            <div>
              <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white/40">
                패밀리 사이트
              </h3>
              <ul className="space-y-2.5">
                {familySites.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Contact */}
            <div>
              <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white/40">
                문의하기
              </h3>
              <p className="mb-4 text-xs text-white/40">
                문의 가능 시간: 평일 10:00 ~ 19:00
              </p>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2 text-white/60">
                  <Phone className="h-4 w-4 text-primary/60" />
                  <span>번역 문의</span>
                  <a
                    href="tel:070-0000-0000"
                    className="font-medium text-white/80 hover:text-primary transition-colors"
                  >
                    070-0000-0000
                  </a>
                </li>
                <li className="flex items-center gap-2 text-white/60">
                  <Mail className="h-4 w-4 text-primary/60" />
                  <span>기업 번역</span>
                  <a
                    href="mailto:sales@nililia.com"
                    className="font-medium text-white/80 hover:text-primary transition-colors"
                  >
                    sales@nililia.com
                  </a>
                </li>
                <li className="flex items-center gap-2 text-white/60">
                  <Mail className="h-4 w-4 text-primary/60" />
                  <span>사업 제휴</span>
                  <a
                    href="mailto:business@nililia.com"
                    className="font-medium text-white/80 hover:text-primary transition-colors"
                  >
                    business@nililia.com
                  </a>
                </li>
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-primary-dark"
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                  견적 문의
                </Link>
                <a
                  href="tel:070-0000-0000"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 px-4 py-2 text-xs font-semibold text-white/80 transition-colors hover:bg-white/10"
                >
                  <Phone className="h-3.5 w-3.5" />
                  전화 문의
                </a>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-8 text-sm text-white/40 md:flex-row">
            <p>
              &copy; {new Date().getFullYear()} Nililia. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="#"
                className="transition-colors hover:text-white"
              >
                이용약관
              </Link>
              <Link
                href="#"
                className="transition-colors hover:text-white"
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
