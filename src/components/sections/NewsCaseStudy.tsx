import Card from "@/components/ui/Card";
import { fetchHomeNewsPreview, fetchHomeCaseStudyPreview } from "@/lib/notion/homePreview";

export default async function NewsCaseStudy() {
  const [news, cases] = await Promise.all([
    fetchHomeNewsPreview(3),
    fetchHomeCaseStudyPreview(3),
  ]);

  return (
    <section className="bg-surface py-24">
      <div className="mx-auto max-w-7xl px-6 lg:pl-12">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-8">
              <span className="mb-2 inline-block text-[length:var(--font-size-section-label)] font-semibold uppercase tracking-wider text-primary">
                News
              </span>
              <h2 className="text-[length:var(--font-size-section-h2)] font-bold tracking-tight text-foreground break-keep">
                최신 소식
              </h2>
            </div>

            {news.length > 0 ? (
              <div className="space-y-4">
                {news.map((item) => (
                  <a key={item.id} href={`/news/${item.slug}`} className="block">
                    <Card className="group flex flex-row items-start gap-4 overflow-hidden p-4">
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
                      <div className="flex-1 min-w-0">
                        {item.publishedAt && (
                          <time className="text-xs text-muted">
                            {new Date(item.publishedAt).toLocaleDateString(
                              "ko-KR"
                            )}
                          </time>
                        )}
                        <h3 className="mt-1 line-clamp-2 text-[length:var(--font-size-body)] font-bold text-foreground group-hover:text-primary transition-colors break-keep">
                          {item.title}
                        </h3>
                        {item.excerpt && (
                          <p className="mt-1 line-clamp-1 text-[length:var(--font-size-body)] text-muted break-keep">
                            {item.excerpt}
                          </p>
                        )}
                      </div>
                    </Card>
                  </a>
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
              <a
                href="/news"
                className="text-[length:var(--font-size-card-link)] font-semibold text-primary hover:text-primary-dark transition-colors"
              >
                전체 소식 보기 &rarr;
              </a>
            </div>
          </div>

          <div>
            <div className="mb-8">
              <span className="mb-2 inline-block text-[length:var(--font-size-section-label)] font-semibold uppercase tracking-wider text-primary">
                Case Studies
              </span>
              <h2 className="text-[length:var(--font-size-section-h2)] font-bold tracking-tight text-foreground break-keep">
                진행 사례
              </h2>
            </div>

            {cases.length > 0 ? (
              <div className="space-y-4">
                {cases.map((item) => (
                  <a key={item.id} href="/cases" className="block">
                    <Card className="group flex flex-row items-start gap-4 overflow-hidden p-4">
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
                      <div className="flex-1 min-w-0">
                        {item.client && (
                          <span className="inline-block rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                            {item.client}
                          </span>
                        )}
                        <h3 className="mt-1 line-clamp-2 text-[length:var(--font-size-body)] font-bold text-foreground group-hover:text-primary transition-colors break-keep">
                          {item.title}
                        </h3>
                        {item.excerpt && (
                          <p className="mt-1 line-clamp-1 text-[length:var(--font-size-body)] text-muted break-keep">
                            {item.excerpt}
                          </p>
                        )}
                      </div>
                    </Card>
                  </a>
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
              <a
                href="/cases"
                className="text-[length:var(--font-size-card-link)] font-semibold text-primary hover:text-primary-dark transition-colors"
              >
                전체 사례 보기 &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
