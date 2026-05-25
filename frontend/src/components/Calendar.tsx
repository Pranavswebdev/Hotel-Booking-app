"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { ChevronRightIcon } from "@/components/icons";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export type DateRange = { start: Date | null; end: Date | null };

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function inRange(d: Date, range: DateRange) {
  if (!range.start || !range.end) return false;
  return d > range.start && d < range.end;
}

export function Calendar({
  value,
  onChange,
}: {
  value: DateRange;
  onChange: (range: DateRange) => void;
}) {
  // Figma shows April 2025.
  const [view, setView] = useState(new Date(2025, 3, 1));

  const year = view.getFullYear();
  const month = view.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: Array<Date | null> = [
    ...Array.from({ length: firstDay }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1)),
  ];

  function pick(date: Date) {
    const { start, end } = value;
    if (!start || (start && end)) {
      onChange({ start: date, end: null });
    } else if (date > start) {
      onChange({ start, end: date });
    } else {
      onChange({ start: date, end: null });
    }
  }

  function shiftMonth(delta: number) {
    setView(new Date(year, month + delta, 1));
  }

  return (
    <div className="rounded-card bg-surface p-4 ring-1 ring-white/5">
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => shiftMonth(-1)}
          className="grid h-8 w-8 place-items-center rounded-full text-muted hover:text-white"
          aria-label="Previous month"
        >
          <ChevronRightIcon className="rotate-180" width={18} height={18} />
        </button>
        <div className="text-center">
          <p className="text-[13px] text-muted">{year}</p>
          <p className="text-[16px] font-semibold">{MONTHS[month]}</p>
        </div>
        <button
          type="button"
          onClick={() => shiftMonth(1)}
          className="grid h-8 w-8 place-items-center rounded-full text-muted hover:text-white"
          aria-label="Next month"
        >
          <ChevronRightIcon width={18} height={18} />
        </button>
      </div>

      <div className="mb-2 grid grid-cols-7 text-center text-[12px] text-muted">
        {WEEKDAYS.map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-1.5 text-center text-[14px]">
        {cells.map((date, i) => {
          if (!date) return <span key={i} />;
          const isStart = value.start && sameDay(date, value.start);
          const isEnd = value.end && sameDay(date, value.end);
          const isBetween = inRange(date, value);
          const isEdge = isStart || isEnd;
          return (
            <button
              key={i}
              type="button"
              onClick={() => pick(date)}
              className={cn(
                "mx-auto grid h-9 w-9 place-items-center rounded-full transition-colors",
                isEdge && "bg-coral font-semibold text-white",
                isBetween && "bg-coral/20 text-white",
                !isEdge && !isBetween && "text-white/90 hover:bg-white/10",
              )}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
