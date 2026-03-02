import { ReactNode } from "react";

interface PageHeroProps {
  label: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}

export default function PageHero({ label, title, description, children }: PageHeroProps) {
  return (
    <section className="bg-hero-bg flex items-center min-h-[420px] py-4 lg:py-6">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="lg:pl-12">
          {children ? (
            children
          ) : (
            <>
              <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
                {label}
              </p>
              <h1 className="text-4xl font-bold leading-tight text-foreground sm:text-5xl break-keep">
                {title}
              </h1>
              {description && (
                <p className="mt-6 max-w-2xl text-[length:var(--font-size-body)] leading-relaxed text-muted break-keep">
                  {description}
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
