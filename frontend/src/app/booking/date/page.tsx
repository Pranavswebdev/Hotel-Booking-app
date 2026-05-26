"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AppShell } from "@/components/ui/AppShell";
import { Button } from "@/components/ui/Button";
import { BackIcon } from "@/components/icons";
import { Calendar, type DateRange } from "@/components/Calendar";

function nights(range: DateRange) {
  if (!range.start || !range.end) return 0;
  return Math.round(
    (range.end.getTime() - range.start.getTime()) / 86400000,
  );
}

function BookingDateContent() {
  const router = useRouter();
  const params = useSearchParams();
  const spaceId = params.get("space") ?? "";
  const [range, setRange] = useState<DateRange>({ start: null, end: null });

  const n = nights(range);

  return (
    <AppShell>
      <div className="flex flex-1 flex-col px-6 pb-6">
        <header className="mt-3 flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="grid h-10 w-10 place-items-center rounded-full bg-surface ring-1 ring-white/5"
            aria-label="Go back"
          >
            <BackIcon />
          </button>
          <h1 className="text-[20px] font-semibold">Choose Booking Date</h1>
        </header>

        <div className="mt-6">
          <Calendar value={range} onChange={setRange} />
        </div>

        {n > 0 && (
          <p className="mt-4 text-center text-[14px] text-muted">
            <span className="font-semibold text-white">{n}</span> night
            {n > 1 ? "s" : ""} selected
          </p>
        )}

        <Button
          className="mt-auto"
          fullWidth
          disabled={n === 0}
          onClick={() => {
            const qs = new URLSearchParams({
              space: spaceId,
              nights: String(n),
              checkIn: range.start?.toISOString().slice(0, 10) ?? "",
              checkOut: range.end?.toISOString().slice(0, 10) ?? "",
            });
            router.push(`/booking/payment?${qs.toString()}`);
          }}
        >
          Continue
        </Button>
      </div>
    </AppShell>
  );
}

export default function BookingDatePage() {
  return (
    <Suspense fallback={<AppShell />}>
      <BookingDateContent />
    </Suspense>
  );
}
