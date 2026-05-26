"use client";

import { useState } from "react";
import { AppShell } from "@/components/ui/AppShell";
import { BottomNav } from "@/components/ui/BottomNav";
import { TextField } from "@/components/ui/TextField";
import { Button } from "@/components/ui/Button";
import { LocationIcon, SearchIcon } from "@/components/icons";

export default function DiscoverPage() {
  const [query, setQuery] = useState("");
  const [pin, setPin] = useState<{ x: number; y: number } | null>(null);
  const [selected, setSelected] = useState("");

  function handleMapClick(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPin({ x, y });
    setSelected("East Jakarta, Indonesia");
  }

  return (
    <AppShell width="wide">
      <div className="flex flex-1 flex-col px-6 pb-4">
        <header className="mt-3">
          <h1 className="text-[24px] font-semibold">Where To?</h1>
        </header>

        <div className="mt-5">
          <TextField
            placeholder="Click the map or search here..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            trailing={<SearchIcon className="text-muted" />}
          />
        </div>

        <div
          onClick={handleMapClick}
          className="relative mt-5 flex-1 cursor-crosshair overflow-hidden rounded-card ring-1 ring-white/5"
          style={{
            background:
              "linear-gradient(135deg,#2f3a34 0%,#28302c 40%,#34332f 100%)",
          }}
        >
          <svg className="absolute inset-0 h-full w-full opacity-30">
            <defs>
              <pattern
                id="roads"
                width="60"
                height="60"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M0 30h60M30 0v60"
                  stroke="#c1c1c1"
                  strokeWidth="1.5"
                  fill="none"
                />
                <path
                  d="M0 0l60 60"
                  stroke="#c1c1c1"
                  strokeWidth="0.8"
                  fill="none"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#roads)" />
          </svg>

          {pin && (
            <span
              className="absolute -translate-x-1/2 -translate-y-full text-coral drop-shadow-lg"
              style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
            >
              <LocationIcon width={36} height={36} className="fill-coral/20" />
            </span>
          )}

          {!pin && (
            <p className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-8 text-center text-[14px] text-white/70">
              Tap anywhere on the map to drop a pin
            </p>
          )}

          {selected && (
            <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-bg/90 px-4 py-3 backdrop-blur">
              <span className="flex items-center gap-2 text-[14px] font-medium">
                <LocationIcon width={16} height={16} className="text-coral" />
                {selected}
              </span>
            </div>
          )}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            onClick={() => {
              setPin(null);
              setSelected("");
            }}
          >
            Reset Location
          </Button>
          <Button disabled={!selected}>Set Location</Button>
        </div>
      </div>
      <BottomNav />
    </AppShell>
  );
}
