import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import {
  Briefcase,
  Globe,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "채용 | Nililia",
  description:
    "Nililia와 함께 언어의 장벽을 넘어 세계를 연결할 인재를 찾습니다. 채용 정보를 확인하세요.",
  openGraph: {
    title: "채용 | Nililia",
    description:
      "Nililia와 함께 언어의 장벽을 넘어 세계를 연결할 인재를 찾습니다.",
  },
};

export default function CareerPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-hero-bg py-8 lg:py-10 min-h-[200px] flex items-center">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h1 className="text-2xl font-bold leading-tight text-foreground sm:text-3xl break-keep">
            글로벌 시장을 움직이는 콘텐츠,
            <br />
            그 변화를 함께 만들 동료를 찾습니다.
            <br />
            닐리리아에서 시작하세요.
          </h1>
        </div>
      </section>

      {/* Image */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-6">
          <div className="flex aspect-[16/9] items-center justify-center rounded-2xl border border-border bg-surface overflow-hidden">
            <span className="text-sm text-muted">[팀 사진]</span>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-12 text-center text-2xl font-bold text-foreground sm:text-3xl break-keep">
            글로벌 현지화 시장의 최전선에서 함께 성장하세요
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
              <h3 className="text-xl font-bold text-foreground">정규직 채용</h3>
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
              <h3 className="text-xl font-bold text-foreground">프리랜서 채용</h3>
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
          <h2 className="text-3xl font-bold text-white break-keep">
            궁금한 점이 있으신가요?
          </h2>
          <p className="mt-4 text-lg text-white/80 break-keep">
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
