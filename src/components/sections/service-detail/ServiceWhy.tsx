import Section from "@/components/ui/Section";
import Image from "next/image";

export interface WhyItem {
  title: string;
  description: string;
}

interface ServiceWhyProps {
  label?: string;
  title: string;
  description?: string;
  items: WhyItem[];
  imageSrc?: string;
  imageAlt?: string;
}

export default function ServiceWhy({
  label = "Why Nililia",
  title,
  description,
  items,
  imageSrc,
  imageAlt = "",
}: ServiceWhyProps) {
  return (
    <Section className="bg-surface">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Left — numbered reasons */}
        <div>
          <span className="mb-3 inline-block text-[length:var(--font-size-section-label)] font-semibold uppercase tracking-wider text-primary">
            {label}
          </span>
          <h2 className="text-[length:var(--font-size-section-h2)] font-bold tracking-tight text-foreground break-keep">
            {title}
          </h2>
          {description && (
            <p className="mt-3 text-[length:var(--font-size-section-body)] text-muted break-keep">
              {description}
            </p>
          )}
          <div className="mt-8 space-y-6">
            {items.map((item, idx) => (
              <div key={idx} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-[length:var(--font-size-card-title)] font-semibold text-foreground break-keep">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-[length:var(--font-size-card-desc)] leading-relaxed text-muted break-keep">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — image */}
        <div className="flex justify-center lg:justify-end">
          {imageSrc ? (
            <div className="relative w-full max-w-lg aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          ) : (
            <div className="flex w-full max-w-lg aspect-[4/3] items-center justify-center rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 text-sm text-muted">
              이미지 영역
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
