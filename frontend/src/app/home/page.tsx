"use client";

import { useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/ui/AppShell";
import { BottomNav } from "@/components/ui/BottomNav";
import { CategoryChips } from "@/components/ui/CategoryChips";
import { SpaceCard, SpaceRowCard } from "@/components/SpaceCard";
import { LocationIcon, SearchIcon } from "@/components/icons";
import { spaces } from "@/lib/data";

const filters = ["Near You", "Hotel", "Apartment", "Guest House", "Villa"];

export default function HomePage() {
  const [filter, setFilter] = useState("Near You");

  const visible =
    filter === "Near You"
      ? spaces
      : spaces.filter((s) => s.category === filter);

  const apartments = spaces.filter((s) => s.category === "Apartment");
  const cibubur = spaces.filter((s) => s.location.includes("Cibubur"));

  return (
    <AppShell>
      <div className="flex flex-1 flex-col px-6 pb-4">
        <header className="mt-3 flex items-center justify-between">
          <div>
            <h1 className="text-[24px] font-semibold">Where To?</h1>
            <span className="mt-1 flex items-center gap-1 text-[13px] text-muted">
              <LocationIcon width={15} height={15} className="text-coral" />
              East Jakarta, Indonesia
            </span>
          </div>
        </header>

        <Link
          href="/search"
          className="mt-5 flex items-center gap-3 rounded-2xl bg-surface px-4 py-3.5 text-[14px] text-muted ring-1 ring-white/5"
        >
          <SearchIcon width={18} height={18} />
          Search Spaces...
        </Link>

        <div className="mt-5">
          <CategoryChips options={filters} value={filter} onChange={setFilter} />
        </div>

        {filter === "Near You" ? (
          <>
            <Section title="Apartment Near East Jakarta">
              <div className="no-scrollbar -mx-6 flex gap-4 overflow-x-auto px-6 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 lg:grid-cols-3">
                {apartments.map((s) => (
                  <div key={s.id} className="w-60 shrink-0 md:w-auto">
                    <SpaceCard space={s} />
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Places To Stay in Cibubur">
              <div className="space-y-3">
                {cibubur.map((s) => (
                  <SpaceRowCard key={s.id} space={s} />
                ))}
              </div>
            </Section>
          </>
        ) : (
          <Section title={`${filter} Spaces`}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((s) => (
                <SpaceCard key={s.id} space={s} />
              ))}
            </div>
          </Section>
        )}
      </div>
      <BottomNav />
    </AppShell>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-7">
      <h2 className="mb-3 text-[17px] font-semibold">{title}</h2>
      {children}
    </section>
  );
}
