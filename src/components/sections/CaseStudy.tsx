import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import Link from "next/link";
import { fetchCaseStudyPreview } from "@/lib/notion/client";

export default async function CaseStudy() {
  const cases = await fetchCaseStudyPreview(3);

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          label="Case Studies"
          title="성공 사례"
          description="다양한 산업 분야의 글로벌 진출을 성공적으로 지원한 사례를 확인하세요."
        />

        {cases.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cases.slice(0, 3).map((item) => (
              <Card
                key={item.id}
                className="group overflow-hidden p-0"
              >
                {/* Thumbnail */}
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
                <div className="p-5">
                  {item.company && (
                    <span className="inline-block rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {item.company}
                    </span>
                  )}
                  <h3 className="mt-3 line-clamp-2 text-lg font-bold text-foreground group-hover:text-primary transition-colors break-keep">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="mt-2 line-clamp-2 text-sm text-muted break-keep">
                      {item.description}
                    </p>
                  )}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden p-0">
                <div className="aspect-[16/10] bg-surface" />
                <div className="p-5">
                  <div className="h-5 w-20 rounded-full bg-surface" />
                  <div className="mt-3 h-5 w-full rounded bg-surface" />
                  <div className="mt-2 h-4 w-3/4 rounded bg-surface" />
                </div>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <Link
            href="/cases"
            className="text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
          >
            전체 사례 보기 &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
