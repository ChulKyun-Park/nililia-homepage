import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: "light" | "dark";
}

export default function Card({
  children,
  className,
  variant = "light",
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-6 shadow-sm transition-shadow hover:shadow-md",
        variant === "dark"
          ? "border-dark-border bg-dark-card"
          : "border-border bg-white",
        className,
      )}
    >
      {children}
    </div>
  );
}
