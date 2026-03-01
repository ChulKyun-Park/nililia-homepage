import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({
  children,
  className,
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-white p-6 shadow-sm transition-shadow hover:shadow-md",
        className,
      )}
    >
      {children}
    </div>
  );
}
