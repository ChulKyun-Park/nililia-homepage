import Link from "next/link";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-dark focus-visible:outline-primary",
  secondary:
    "bg-primary-light text-foreground hover:bg-primary-light/80 focus-visible:outline-primary",
  outline:
    "border-2 border-primary text-primary hover:bg-primary-light focus-visible:outline-primary",
};

const base =
  "inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none";

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  className,
}: ButtonProps) {
  const classes = cn(base, variantClasses[variant], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
