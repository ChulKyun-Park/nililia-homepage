import type { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/ui/Button";
import {
  Briefcase,
  Globe,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "채용 | 닐리리아",
  description:
    "닐리리아와 함께 언어의 장벽을 넘어 세계를 연결할 인재를 찾습니다. 채용 정보를 확인하세요.",
  openGraph: {
    title: "채용 | 닐리리아",
    description:
      "닐리리아와 함께 언어의 장벽을 넘어 세계를 연결할 인재를 찾습니다.",
  },
};

export default function CareerPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-hero-bg py-8 lg:py-10 h-[250px] flex items-center">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h1 className="text-[length:var(--font-size-page-hero)] font-bold leading-tight text-foreground break-keep">
            닐리리아에서 시작하세요.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-[length:var(--font-size-body)] leading-relaxed text-muted break-keep">
            글로벌 시장을 움직이는 콘텐츠, 그 변화를 함께 만들 동료를 찾습니다.
          </p>
        </div>
      </section>

      {/* Mission-style section */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:pl-12">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left: Text */}
            <div>
              <h2 className="text-[length:var(--font-size-section-h2)] font-bold leading-snug text-foreground break-keep">
                함께 세계를 연결할 인재를 찾습니다
              </h2>
              <p className="mt-6 text-[length:var(--font-size-body)] leading-relaxed text-muted break-keep">
                닐리리아는 언어와 기술의 힘으로 콘텐츠의 글로벌 진출을 돕는 전문 기업입니다.
                <br />
                열정 있는 동료와 함께 성장할 기회를 만나보세요.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["글로벌 환경", "성장 기회", "유연한 근무", "경쟁력 있는 보상"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Image */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="w-[90%] aspect-[4/3] rounded-2xl overflow-hidden">
                <img src="/images/careers.png" alt="닐리리아 팀" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-12 text-center text-[length:var(--font-size-section-h2)] font-bold text-foreground break-keep">
            닐리리아와 함께 세상을 연결하세요!
          </h2>

          <div className="grid gap-6 sm:grid-cols-2">
            {/* 정규직 채용 */}
            <a
              href="https://nililia.ninehire.site"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-border bg-white p-8 transition-shadow hover:shadow-lg"
            >
              <div className="mb-6 inline-flex rounded-xl bg-primary/10 p-3">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-[length:var(--font-size-card-title)] font-bold text-foreground">정규직 채용</h3>
              <p className="mt-2 text-[length:var(--font-size-card-desc)] leading-relaxed text-muted break-keep">
                닐리리아의 글로벌화에 합류하세요.
              </p>
              <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                지금 지원하기 <ArrowRight className="h-4 w-4" />
              </span>
            </a>

            {/* 프리랜서 채용 */}
            <a
              href="https://nililia.ninehire.site"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-border bg-white p-8 transition-shadow hover:shadow-lg"
            >
              <div className="mb-6 inline-flex rounded-xl bg-primary/10 p-3">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-[length:var(--font-size-card-title)] font-bold text-foreground">프리랜서 채용</h3>
              <p className="mt-2 text-[length:var(--font-size-card-desc)] leading-relaxed text-muted break-keep">
                글로벌 프로젝트에 참여해 보세요.
              </p>
              <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                지금 지원하기 <ArrowRight className="h-4 w-4" />
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-gradient-to-r from-primary to-primary-dark py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-[length:var(--font-size-section-h2)] font-bold text-white break-keep">
            궁금한 점이 있으신가요?
          </h2>
          <p className="mt-4 text-[length:var(--font-size-body)] text-white/80 break-keep">
            채용 관련 문의는 언제든지 환영합니다.
          </p>
          <div className="mt-8">
            <Button
              href="/contact"
              className="bg-white px-8 py-4 text-base font-bold text-primary hover:bg-white/90"
            >
              문의하기
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
