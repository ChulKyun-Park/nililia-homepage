import Link from "next/link";
import Card from "@/components/ui/Card";
import { fetchNewsPreview } from "@/lib/notion/client";
import { fetchCaseStudyPreview } from "@/lib/notion/client";

export default async function NewsCaseStudy() {
  const [news, cases] = await Promise.all([
    fetchNewsPreview(3),
    fetchCaseStudyPreview(3),
  ]);

  return (
    <section className="bg-surface py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* 2-column grid */}
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left: News */}
          <div>
            <div className="mb-8">
              <span className="mb-2 inline-block text-[length:var(--font-size-section-label)] font-semibold uppercase tracking-wider text-primary">
                News
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl break-keep">
                최신 소식
              </h2>
            </div>

            {news.length > 0 ? (
              <div className="space-y-4">
                {news.map((item) => (
                  <Card
                    key={item.id}
                    className="group flex flex-row items-start gap-4 overflow-hidden p-4"
                  >
                    {/* Thumbnail */}
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-surface">
                      {item.thumbnail ? (
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs text-muted">
                          No Image
                        </div>
                      )}
                    </div>
                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      {item.publishedAt && (
                        <time className="text-xs text-muted">
                          {new Date(item.publishedAt).toLocaleDateString(
                            "ko-KR"
                          )}
                        </time>
                      )}
                      <h3 className="mt-1 line-clamp-2 text-base font-bold text-foreground group-hover:text-primary transition-colors break-keep">
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="mt-1 line-clamp-1 text-sm text-muted break-keep">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Card
                    key={i}
                    className="flex flex-row items-start gap-4 p-4"
                  >
                    <div className="h-24 w-24 flex-shrink-0 rounded-xl bg-border/30" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3 w-16 rounded bg-border/30" />
                      <div className="h-5 w-full rounded bg-border/30" />
                      <div className="h-4 w-3/4 rounded bg-border/30" />
                    </div>
                  </Card>
                ))}
              </div>
            )}

            <div className="mt-6">
              <Link
                href="/news"
                className="text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
              >
                전체 소식 보기 &rarr;
              </Link>
            </div>
          </div>

          {/* Right: Case Studies */}
          <div>
            <div className="mb-8">
              <span className="mb-2 inline-block text-[length:var(--font-size-section-label)] font-semibold uppercase tracking-wider text-primary">
                Case Studies
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl break-keep">
                성공 사례
              </h2>
            </div>

            {cases.length > 0 ? (
              <div className="space-y-4">
                {cases.map((item) => (
                  <Card
                    key={item.id}
                    className="group flex flex-row items-start gap-4 overflow-hidden p-4"
                  >
                    {/* Thumbnail */}
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-surface">
                      {item.thumbnail ? (
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs text-muted">
                          No Image
                        </div>
                      )}
                    </div>
                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      {item.company && (
                        <span className="inline-block rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                          {item.company}
                        </span>
                      )}
                      <h3 className="mt-1 line-clamp-2 text-base font-bold text-foreground group-hover:text-primary transition-colors break-keep">
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="mt-1 line-clamp-1 text-sm text-muted break-keep">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Card
                    key={i}
                    className="flex flex-row items-start gap-4 p-4"
                  >
                    <div className="h-24 w-24 flex-shrink-0 rounded-xl bg-border/30" />
                    <div className="flex-1 space-y-2">
                      <div className="h-5 w-20 rounded-full bg-border/30" />
                      <div className="h-5 w-full rounded bg-border/30" />
                      <div className="h-4 w-3/4 rounded bg-border/30" />
                    </div>
                  </Card>
                ))}
              </div>
            )}

            <div className="mt-6">
              <Link
                href="/cases"
                className="text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
              >
                전체 사례 보기 &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
