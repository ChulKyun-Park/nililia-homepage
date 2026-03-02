import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import Image from "next/image";
import { fetchAllNews } from "@/lib/notion/client";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "소식 | 닐리리아",
  description:
    "닐리리아의 최신 소식, 업계 동향, 인사이트를 확인하세요.",
  openGraph: {
    title: "소식 | 닐리리아",
    description:
      "닐리리아의 최신 소식, 업계 동향, 인사이트를 확인하세요.",
  },
};

export default async function NewsPage() {
  const news = await fetchAllNews();

  return (
    <>
      {/* Hero */}
      <section className="relative bg-hero-bg py-8 lg:py-10 h-[250px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/최신소식.png" alt="" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <h1 className="text-[length:var(--font-size-page-hero)] font-bold leading-tight text-white break-keep">
            최신 소식
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-[length:var(--font-size-body)] leading-relaxed text-white/80 break-keep">
            닐리리아의 최신 소식과 번역 · 현지화 업계 인사이트를 만나보세요.
          </p>
        </div>
      </section>

      {/* News List */}
      <Section>
        {news.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {news.map((item) => (
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
                  {item.publishedAt && (
                    <time className="text-xs text-muted">
                      {new Date(item.publishedAt).toLocaleDateString("ko-KR")}
                    </time>
                  )}
                  <h3 className="mt-2 text-[length:var(--font-size-card-title)] font-bold text-foreground group-hover:text-primary transition-colors break-keep">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="mt-2 text-[length:var(--font-size-body)] leading-relaxed text-muted break-keep">
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
              title="소식 준비 중"
              description="곧 다양한 소식을 공유할 예정입니다."
            />
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="overflow-hidden p-0">
                  <div className="aspect-[16/10] bg-surface" />
                  <div className="p-6">
                    <div className="h-3 w-16 rounded bg-surface" />
                    <div className="mt-3 h-5 w-full rounded bg-surface" />
                    <div className="mt-2 h-4 w-3/4 rounded bg-surface" />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </Section>
    </>
  );
}
