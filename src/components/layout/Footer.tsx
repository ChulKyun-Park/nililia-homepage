import Link from "next/link";
import Container from "@/components/ui/Container";

const footerLinks = {
  company: {
    title: "회사정보",
    links: [
      { label: "회사소개", href: "/about" },
      { label: "미션", href: "/about" },
      { label: "채용", href: "/career" },
    ],
  },
  services: {
    title: "서비스",
    links: [
      { label: "영상 번역", href: "/services" },
      { label: "문서 번역", href: "/services" },
      { label: "웹/앱 현지화", href: "/services" },
      { label: "게임 현지화", href: "/services" },
    ],
  },
  resources: {
    title: "소식",
    links: [
      { label: "블로그", href: "/news" },
      { label: "성공사례", href: "/cases" },
    ],
  },
  contact: {
    title: "연락처",
    links: [
      { label: "문의하기", href: "/contact" },
      { label: "hello@nililia.com", href: "mailto:hello@nililia.com" },
    ],
  },
};

export default function Footer() {
  return (
    <>
      <footer className="border-t border-white/10 bg-dark-bg text-white">
        <Container>
          <div className="grid grid-cols-2 gap-8 py-16 md:grid-cols-4">
            {Object.values(footerLinks).map((section) => (
              <div key={section.title}>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/40">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
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
            ))}
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-8 text-sm text-white/40 md:flex-row">
            <p>
              &copy; {new Date().getFullYear()} Nililia. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-white transition-colors">
                이용약관
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                개인정보처리방침
              </Link>
            </div>
          </div>
        </Container>
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
