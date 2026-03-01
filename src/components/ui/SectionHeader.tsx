import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeader({
  label,
  title,
  description,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-12",
        align === "center" && "text-center",
        className,
      )}
    >
      {label && (
        <span className="mb-3 inline-block text-[length:var(--font-size-section-label)] font-semibold uppercase tracking-wider text-primary">
          {label}
        </span>
      )}
      <h2
        className="text-3xl font-bold tracking-tight text-foreground sm:text-[length:var(--font-size-section-h2)] break-keep"
      >
        {title}
      </h2>
      {description && (
        <p
          className="mt-4 max-w-2xl text-[length:var(--font-size-section-body)] text-muted mx-auto break-keep"
        >
          {description}
        </p>
      )}
    </div>
  );
}
