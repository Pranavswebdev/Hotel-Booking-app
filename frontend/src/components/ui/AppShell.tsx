import { cn } from "@/lib/cn";

type AppShellProps = {
  children?: React.ReactNode;
  className?: string;
  /**
   * Content width on tablet/desktop. "narrow" keeps a comfortable single
   * column (forms, profile); "wide" lets browse screens use the full space
   * so their responsive grids can expand. Mobile is always full-width.
   */
  width?: "narrow" | "wide";
  /** Full-bleed top (no top padding) for hero-image screens. */
  flush?: boolean;
};

export function AppShell({
  children,
  className,
  width = "narrow",
  flush,
}: AppShellProps) {
  return (
    <div className="min-h-dvh w-full bg-bg">
      <div
        className={cn(
          "mx-auto flex min-h-dvh w-full flex-col",
          width === "narrow" ? "md:max-w-xl" : "md:max-w-3xl lg:max-w-6xl xl:max-w-7xl",
          className,
        )}
      >
        <div className={cn("flex flex-1 flex-col", !flush && "pt-4 md:pt-6")}>
          {children}
        </div>
      </div>
    </div>
  );
}
