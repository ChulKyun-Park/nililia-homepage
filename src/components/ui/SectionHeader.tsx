import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  variant?: "light" | "dark";
  className?: string;
}

export default function SectionHeader({
  label,
  title,
  description,
  align = "center",
  variant = "light",
  className,
}: SectionHeaderProps) {
  const isDark = variant === "dark";

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
        className={cn(
          "text-3xl font-bold tracking-tight sm:text-[length:var(--font-size-section-h2)] break-keep",
          isDark ? "text-white" : "text-foreground",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 max-w-2xl text-[length:var(--font-size-section-body)] mx-auto break-keep",
            isDark ? "text-white/60" : "text-muted",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
