import { cn } from "@/lib/cn";
import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "cream" | "outline" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  fullWidth?: boolean;
};

const variants: Record<Variant, string> = {
  primary: "bg-coral text-white hover:bg-coral-dark active:scale-[0.99]",
  cream: "bg-cream text-bg hover:opacity-90 active:scale-[0.99]",
  outline:
    "border border-white/20 bg-transparent text-white hover:bg-white/5 active:scale-[0.99]",
  ghost: "bg-transparent text-muted hover:text-white",
};

export function Button({
  variant = "primary",
  fullWidth,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-pill px-6 py-3.5 text-[15px] font-semibold transition-all disabled:opacity-50",
        fullWidth && "w-full",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
