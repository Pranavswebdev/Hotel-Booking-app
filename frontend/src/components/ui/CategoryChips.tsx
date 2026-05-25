"use client";

import { cn } from "@/lib/cn";

type CategoryChipsProps = {
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
};

export function CategoryChips({ options, value, onChange }: CategoryChipsProps) {
  return (
    <div className="no-scrollbar flex gap-2 overflow-x-auto">
      {options.map((opt) => {
        const active = opt === value;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={cn(
              "whitespace-nowrap rounded-pill px-4 py-2 text-[13px] font-medium transition-colors",
              active
                ? "bg-cream text-bg"
                : "bg-surface text-muted ring-1 ring-white/5 hover:text-white",
            )}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}
