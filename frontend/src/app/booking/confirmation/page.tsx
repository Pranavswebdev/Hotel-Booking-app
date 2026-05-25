"use client";

import { useRouter } from "next/navigation";
import { AppShell } from "@/components/ui/AppShell";
import { Button } from "@/components/ui/Button";

export default function ConfirmationPage() {
  const router = useRouter();

  return (
    <AppShell>
      <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
        <div className="relative grid h-28 w-28 place-items-center">
          <span className="absolute inset-0 rounded-full bg-coral/15" />
          <span className="absolute inset-3 rounded-full bg-coral/25" />
          <span className="relative grid h-16 w-16 place-items-center rounded-full bg-coral text-white">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12.5l4.5 4.5L19 7.5"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>

        <h1 className="mt-8 text-[26px] font-semibold leading-tight">
          Successfully
          <br />
          Booked a Space!
        </h1>
        <p className="mt-3 max-w-xs text-[14px] leading-relaxed text-muted">
          Thanks for putting your trust on us, we hope you enjoyed it!
        </p>
      </div>

      <div className="px-6 pb-8">
        <Button fullWidth onClick={() => router.push("/home")}>
          Back
        </Button>
      </div>
    </AppShell>
  );
}
