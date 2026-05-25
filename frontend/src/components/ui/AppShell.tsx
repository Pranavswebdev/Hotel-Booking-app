import { cn } from "@/lib/cn";
import { StatusBar } from "./StatusBar";

type AppShellProps = {
  children?: React.ReactNode;
  className?: string;
  /** Hide the iOS status bar (e.g. full-bleed screens). */
  hideStatusBar?: boolean;
};

/**
 * Responsive app frame. On phones it fills the viewport. On tablet/desktop it
 * centers in a phone-style canvas so the Figma mobile design stays faithful
 * while remaining usable on larger screens.
 */
export function AppShell({ children, className, hideStatusBar }: AppShellProps) {
  return (
    <div className="min-h-dvh w-full bg-black/40 md:flex md:items-center md:justify-center md:py-8">
      <div
        className={cn(
          "relative mx-auto flex min-h-dvh w-full flex-col bg-bg",
          "md:min-h-0 md:h-[852px] md:w-[393px] md:rounded-[44px] md:shadow-2xl md:ring-1 md:ring-white/10 md:overflow-hidden",
          className,
        )}
      >
        {!hideStatusBar && <StatusBar />}
        <div className="flex flex-1 flex-col overflow-y-auto no-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
}
