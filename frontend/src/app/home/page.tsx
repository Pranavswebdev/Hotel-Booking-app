"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AppShell } from "@/components/ui/AppShell";
import { BottomNav } from "@/components/ui/BottomNav";
import { CategoryChips } from "@/components/ui/CategoryChips";
import { SpaceCard, SpaceRowCard } from "@/components/SpaceCard";
import {
  LocationIcon,
  ProfileIcon,
  SearchIcon,
  StarIcon,
} from "@/components/icons";
import { formatRp } from "@/lib/data";
import { useSpaces } from "@/lib/useSpaces";

const filters = ["Near You", "Hotel", "Apartment", "Guest House", "Villa"];

export default function HomePage() {
  const [filter, setFilter] = useState("Near You");
  const { spaces, loading, error } = useSpaces();

  const visible =
    filter === "Near You"
      ? spaces
      : spaces.filter((s) => s.category === filter);

  const featured = [...spaces].sort((a, b) => b.rating - a.rating)[0];
  const apartments = spaces.filter((s) => s.category === "Apartment");
  const cibubur = spaces.filter((s) => s.location.includes("Cibubur"));

  return (
    <AppShell width="wide">
      <div className="flex flex-1 flex-col px-6 pb-4 md:px-8 lg:px-10">
        <header className="mt-3 flex items-center justify-between">
          <div>
            <p className="text-[13px] text-muted">Welcome back 👋</p>
            <h1 className="mt-0.5 text-[24px] font-semibold md:text-[28px]">
              Where To?
            </h1>
            <span className="mt-1 flex items-center gap-1 text-[13px] text-muted">
              <LocationIcon width={15} height={15} className="text-coral" />
              East Jakarta, Indonesia
            </span>
          </div>
          <Link
            href="/profile"
            className="grid h-11 w-11 place-items-center rounded-full bg-surface text-cream ring-1 ring-white/10"
            aria-label="Profile"
          >
            <ProfileIcon width={22} height={22} />
          </Link>
        </header>

        <Link
          href="/search"
          className="mt-5 flex items-center gap-3 rounded-2xl bg-surface px-4 py-3.5 text-[14px] text-muted ring-1 ring-white/5 transition-colors hover:ring-coral/40 md:max-w-xl"
        >
          <SearchIcon width={18} height={18} />
          Search Spaces...
        </Link>

        <div className="mt-5">
          <CategoryChips options={filters} value={filter} onChange={setFilter} />
        </div>

        {loading && (
          <p className="mt-10 text-center text-[14px] text-muted">
            Loading spaces…
          </p>
        )}
        {error && (
          <p className="mt-10 text-center text-[14px] text-coral">
            Couldn&apos;t load spaces: {error}
          </p>
        )}

        {!loading && !error && (filter === "Near You" ? (
          <>
            {featured && (
              <Link
                href={`/space/${featured.id}`}
                className="group relative mt-6 block aspect-[16/11] w-full overflow-hidden rounded-card shadow-xl shadow-black/30 ring-1 ring-white/10 sm:aspect-[16/8] lg:aspect-[21/7]"
              >
                <Image
                  src={featured.image}
                  alt={featured.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 1200px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <span className="absolute left-4 top-4 rounded-pill bg-coral px-3 py-1 text-[11px] font-semibold text-white">
                  Featured Stay
                </span>
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
                  <div>
                    <span className="flex items-center gap-1 text-[12px] text-cream">
                      <StarIcon width={13} height={13} />
                      {featured.rating} · {featured.category}
                    </span>
                    <h2 className="mt-1 text-[20px] font-semibold md:text-[24px]">
                      {featured.name}
                    </h2>
                    <p className="text-[13px] text-white/70">
                      {featured.location}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-[18px] font-semibold text-cream md:text-[22px]">
                      {formatRp(featured.pricePerNight)}
                    </p>
                    <span className="text-[12px] text-white/70">/ night</span>
                  </div>
                </div>
              </Link>
            )}

            <Section title="Apartment Near East Jakarta" action="See all">
              <div className="no-scrollbar -mx-6 flex gap-4 overflow-x-auto px-6 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 lg:grid-cols-3 xl:grid-cols-4">
                {apartments.map((s) => (
                  <div key={s.id} className="w-64 shrink-0 md:w-auto">
                    <SpaceCard space={s} />
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Places To Stay in Cibubur" action="See all">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                {cibubur.map((s) => (
                  <SpaceRowCard key={s.id} space={s} />
                ))}
              </div>
            </Section>

            <Section title="Explore All Spaces">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {spaces.map((s) => (
                  <SpaceCard key={s.id} space={s} />
                ))}
              </div>
            </Section>
          </>
        ) : (
          <Section title={`${filter} Spaces`}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {visible.map((s) => (
                <SpaceCard key={s.id} space={s} />
              ))}
            </div>
          </Section>
        ))}
      </div>
      <BottomNav />
    </AppShell>
  );
}

function Section({
  title,
  action,
  children,
}: {
  title: string;
  action?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-8">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-[17px] font-semibold md:text-[19px]">{title}</h2>
        {action && (
          <span className="text-[13px] font-medium text-coral">{action}</span>
        )}
      </div>
      {children}
    </section>
  );
}
