import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import Link from "next/link";
import { fetchNewsPreview } from "@/lib/notion/client";

export default async function News() {
  const news = await fetchNewsPreview(4);

  return (
    <section className="bg-surface py-24">
      <div className="mx-auto max-w-7xl px-6 lg:pl-12">
        <SectionHeader
          label="News"
          title="최신 소식"
          description="닐리리아의 최신 소식과 인사이트를 만나보세요."
        />

        {news.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {news.slice(0, 4).map((item) => (
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
                  {item.publishedAt && (
                    <time className="text-xs text-muted">
                      {new Date(item.publishedAt).toLocaleDateString("ko-KR")}
                    </time>
                  )}
                  <h3 className="mt-2 line-clamp-2 text-base font-bold text-foreground group-hover:text-primary transition-colors break-keep">
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
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="overflow-hidden p-0">
                <div className="aspect-[16/10] bg-surface" />
                <div className="p-5">
                  <div className="h-3 w-16 rounded bg-surface" />
                  <div className="mt-3 h-5 w-full rounded bg-surface" />
                  <div className="mt-2 h-4 w-3/4 rounded bg-surface" />
                </div>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <Link
            href="/news"
            className="text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
          >
            전체 소식 보기 &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
