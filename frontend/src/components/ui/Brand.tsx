import { cn } from "@/lib/cn";

export function Brand({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className="grid h-8 w-8 place-items-center rounded-xl bg-coral text-white">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M4 11l8-7 8 7v8a1 1 0 0 1-1 1h-4v-5h-6v5H5a1 1 0 0 1-1-1z"
            fill="currentColor"
          />
        </svg>
      </span>
      <span className="text-[17px] font-semibold tracking-tight text-white">
        Jiva Space
      </span>
    </div>
  );
}
