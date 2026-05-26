"use client";

import { useState } from "react";
import { AppShell } from "@/components/ui/AppShell";
import { TextField } from "@/components/ui/TextField";
import { CategoryChips } from "@/components/ui/CategoryChips";
import { SpaceRowCard, SpaceCard } from "@/components/SpaceCard";
import { BackIcon, SearchIcon } from "@/components/icons";
import { useRouter } from "next/navigation";
import { useSpaces } from "@/lib/useSpaces";

const tags = ["All", "Hotel", "Apartment", "Villa", "Guest House"];

export default function SearchPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("All");
  const { spaces, loading } = useSpaces();

  const results = spaces.filter((s) => {
    const matchesTag = tag === "All" || s.category === tag;
    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q ||
      s.name.toLowerCase().includes(q) ||
      s.location.toLowerCase().includes(q);
    return matchesTag && matchesQuery;
  });

  const hasQuery = query.trim().length > 0;

  return (
    <AppShell width="wide">
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
          <h1 className="text-[20px] font-semibold">Search</h1>
        </header>

        <div className="mt-5">
          <TextField
            placeholder="Search Spaces..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            trailing={<SearchIcon className="text-muted" />}
            autoFocus
          />
        </div>

        <div className="mt-4">
          <CategoryChips options={tags} value={tag} onChange={setTag} />
        </div>

        {loading && (
          <p className="mt-10 text-center text-[14px] text-muted">
            Loading spaces…
          </p>
        )}

        {loading ? null : !hasQuery ? (
          <section className="mt-7">
            <div className="mb-3 flex items-center gap-2">
              <span className="rounded-pill bg-coral/15 px-2.5 py-1 text-[12px] font-medium text-coral">
                Hot
              </span>
              <h2 className="text-[17px] font-semibold">Find Popular Spaces</h2>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {results.map((s) => (
                <SpaceCard key={s.id} space={s} />
              ))}
            </div>
          </section>
        ) : results.length > 0 ? (
          <section className="mt-6">
            <p className="mb-3 text-[13px] text-muted">
              {results.length} result{results.length > 1 ? "s" : ""} for
              &quot;{query}&quot;
            </p>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
              {results.map((s) => (
                <SpaceRowCard key={s.id} space={s} />
              ))}
            </div>
          </section>
        ) : (
          <NoResults query={query} />
        )}
      </div>
    </AppShell>
  );
}

function NoResults({ query }: { query: string }) {
  return (
    <div className="mt-16 flex flex-1 flex-col items-center px-6 text-center">
      <div className="grid h-24 w-24 place-items-center rounded-full bg-surface">
        <SearchIcon width={40} height={40} className="text-muted" />
      </div>
      <h2 className="mt-6 text-[20px] font-semibold">
        The Place Doesn&apos;t Exist
      </h2>
      <p className="mt-2 max-w-xs text-[14px] leading-relaxed text-muted">
        Try searching a different keywords for the best results.
      </p>
      <p className="mt-3 text-[13px] text-muted/70">
        No matches for &quot;{query}&quot;
      </p>
    </div>
  );
}
