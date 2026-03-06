import { ReactNode } from "react";
import Image from "next/image";

interface PageHeroProps {
  label: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  /** 우측 이미지 경로 — 전달 시 2컬럼(좌텍스트+우이미지) 레이아웃 */
  imageSrc?: string;
  imageAlt?: string;
}

export default function PageHero({
  label,
  title,
  description,
  children,
  imageSrc,
  imageAlt,
}: PageHeroProps) {
  return (
    <section className="bg-hero-bg flex items-center min-h-[320px] py-8 lg:py-10">
      <div className="mx-auto w-full max-w-7xl px-6">
        {children ? (
          <div className="lg:pl-12">{children}</div>
        ) : imageSrc ? (
          /* ── 2컬럼: 좌 텍스트 + 우 이미지 (Tier 1 레이아웃 + Tier 2 폰트) ── */
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12 lg:pl-12">
            <div>
              <p className="mb-4 text-[length:var(--font-size-section-label)] font-semibold uppercase tracking-wider text-primary">
                {label}
              </p>
              <h1 className="text-[length:var(--font-size-page-hero)] font-bold leading-tight text-foreground break-keep">
                {title}
              </h1>
              {description && (
                <p className="mt-4 max-w-2xl text-[length:var(--font-size-body)] leading-relaxed text-muted break-keep">
                  {description}
                </p>
              )}
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-lg aspect-[16/10] overflow-hidden rounded-2xl">
                <Image
                  src={imageSrc}
                  alt={imageAlt || ""}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        ) : (
          /* ── 텍스트 전용 (contact 등) ── */
          <div className="lg:pl-12">
            <p className="mb-4 text-[length:var(--font-size-section-label)] font-semibold uppercase tracking-wider text-primary">
              {label}
            </p>
            <h1 className="text-[length:var(--font-size-page-hero)] font-bold leading-tight text-foreground break-keep">
              {title}
            </h1>
            {description && (
              <p className="mt-4 max-w-2xl text-[length:var(--font-size-body)] leading-relaxed text-muted break-keep">
                {description}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
