import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { fetchAllCaseStudies } from "@/lib/notion/client";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "성공사례 | Nililia",
  description:
    "다양한 산업 분야의 글로벌 진출을 성공적으로 지원한 Nililia의 성공 사례를 확인하세요.",
  openGraph: {
    title: "성공사례 | Nililia",
    description:
      "다양한 산업 분야의 글로벌 진출을 성공적으로 지원한 Nililia의 성공 사례를 확인하세요.",
  },
};

export default async function CasesPage() {
  const cases = await fetchAllCaseStudies();

  return (
    <>
      {/* Page Hero */}
      <section className="bg-gradient-to-br from-foreground via-gray-900 to-gray-800 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
            Case Studies
          </p>
          <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl break-keep">
            성공 사례
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70 break-keep">
            다양한 산업 분야의 글로벌 진출을 성공적으로 지원한 사례를 확인하세요.
          </p>
        </div>
      </section>

      {/* Cases List */}
      <Section>
        {cases.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {cases.map((item) => (
              <Card key={item.id} className="group overflow-hidden p-0">
                <div className="aspect-[16/10] overflow-hidden bg-surface">
                  {item.thumbnail ? (
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-muted">
                      No Image
                    </div>
                  )}
                </div>
                <div className="p-6">
                  {item.company && (
                    <span className="inline-block rounded-full bg-primary-light px-3 py-1 text-xs font-medium text-primary">
                      {item.company}
                    </span>
                  )}
                  <h3 className="mt-3 text-lg font-bold text-foreground group-hover:text-primary transition-colors break-keep">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="mt-2 text-sm leading-relaxed text-muted break-keep">
                      {item.description}
                    </p>
                  )}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <SectionHeader
              title="성공 사례 준비 중"
              description="곧 다양한 성공 사례를 공유할 예정입니다."
            />
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="overflow-hidden p-0">
                  <div className="aspect-[16/10] bg-surface" />
                  <div className="p-6">
                    <div className="h-5 w-20 rounded-full bg-surface" />
                    <div className="mt-3 h-5 w-full rounded bg-surface" />
                    <div className="mt-2 h-4 w-3/4 rounded bg-surface" />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </Section>

      {/* Bottom CTA */}
      <section className="bg-gradient-to-r from-primary to-primary-dark py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold text-white break-keep">
            다음 성공 사례의 주인공이 되세요
          </h2>
          <p className="mt-4 text-lg text-white/80 break-keep">
            Nililia와 함께 글로벌 시장을 개척하세요.
          </p>
          <div className="mt-8">
            <Button
              href="/contact"
              className="bg-white px-8 py-4 text-base font-bold text-primary hover:bg-white/90"
            >
              무료 상담 신청
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
