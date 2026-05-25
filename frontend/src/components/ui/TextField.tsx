import { cn } from "@/lib/cn";
import type { InputHTMLAttributes, ReactNode } from "react";

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  trailing?: ReactNode;
};

export function TextField({
  label,
  trailing,
  className,
  ...props
}: TextFieldProps) {
  return (
    <label className="block">
      {label && (
        <span className="mb-2 block text-[13px] font-medium text-muted">
          {label}
        </span>
      )}
      <div className="flex items-center gap-2 rounded-2xl bg-surface px-4 py-3.5 ring-1 ring-white/5 focus-within:ring-coral/60">
        <input
          className={cn(
            "w-full bg-transparent text-[15px] text-white placeholder:text-muted/60 focus:outline-none",
            className,
          )}
          {...props}
        />
        {trailing}
      </div>
    </label>
  );
}
