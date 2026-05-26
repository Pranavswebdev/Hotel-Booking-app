"use client";

import { useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { AppShell } from "@/components/ui/AppShell";
import { Button } from "@/components/ui/Button";
import {
  BackIcon,
  BathIcon,
  BedIcon,
  GuestIcon,
  HeartIcon,
  LocationIcon,
  StarIcon,
} from "@/components/icons";
import { formatRp } from "@/lib/data";
import { useSpace } from "@/lib/useSpaces";

const TOTAL_PHOTOS = 27;

export default function SpaceDetailsPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { space, loading } = useSpace(params.id);
  const [photo] = useState(1);

  if (loading) {
    return (
      <AppShell>
        <div className="flex flex-1 items-center justify-center">
          <p className="text-muted">Loading…</p>
        </div>
      </AppShell>
    );
  }

  if (!space) {
    return (
      <AppShell>
        <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
          <p className="text-muted">This space could not be found.</p>
          <Button onClick={() => router.push("/home")}>Back to Home</Button>
        </div>
      </AppShell>
    );
  }

  const facts = [
    { Icon: GuestIcon, label: `${space.guests} Guests` },
    { Icon: BedIcon, label: `${space.bedrooms} bedroom` },
    { Icon: BedIcon, label: `${space.beds} beds` },
    { Icon: BathIcon, label: `${space.baths} private bath` },
  ];

  return (
    <AppShell flush>
      <div className="flex flex-1 flex-col">
        <div className="relative h-[46vh] min-h-[320px] w-full">
          <Image
            src={space.image}
            alt={space.name}
            fill
            sizes="(max-width: 768px) 100vw, 576px"
            className="object-cover"
            priority
          />
          <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5 pt-7">
            <button
              type="button"
              onClick={() => router.back()}
              className="grid h-10 w-10 place-items-center rounded-full bg-black/40 text-white backdrop-blur"
              aria-label="Go back"
            >
              <BackIcon />
            </button>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-full bg-black/40 text-white backdrop-blur"
              aria-label="Save"
            >
              <HeartIcon />
            </button>
          </div>
          <span className="absolute bottom-4 right-5 rounded-pill bg-black/50 px-3 py-1 text-[12px] font-medium text-white backdrop-blur">
            {photo} / {TOTAL_PHOTOS}
          </span>
        </div>

        <div className="-mt-6 flex flex-1 flex-col rounded-t-[28px] bg-bg px-6 pt-6">
          <h1 className="text-[22px] font-semibold leading-snug">
            Twin Bed Special Room In {space.name}
          </h1>

          <div className="mt-2 flex items-center gap-2 text-[13px]">
            <span className="flex items-center gap-1 text-cream">
              <StarIcon width={14} height={14} />
              {space.rating}
            </span>
            <span className="text-muted">15 Reviews</span>
          </div>

          <span className="mt-3 flex items-center gap-1.5 text-[13px] text-muted">
            <LocationIcon width={15} height={15} className="text-coral" />
            {space.location}
          </span>

          <div className="mt-5 flex items-center gap-3 rounded-2xl bg-surface p-3 ring-1 ring-white/5">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-coral/15 text-coral">
              <LocationIcon width={18} height={18} />
            </span>
            <div>
              <p className="text-[14px] font-medium">{space.name} Cibubur</p>
              <p className="text-[12px] text-muted">Verified host</p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            {facts.map(({ Icon, label }, i) => (
              <div
                key={i}
                className="flex items-center gap-2 rounded-2xl bg-surface px-4 py-3 text-[13px] ring-1 ring-white/5"
              >
                <Icon width={18} height={18} className="text-cream" />
                {label}
              </div>
            ))}
          </div>

          <div className="mt-5">
            <h2 className="text-[15px] font-semibold">Self check-in</h2>
            <p className="mt-1 text-[13px] leading-relaxed text-muted">
              Check by yourself with the code that will sent after Reserved.
            </p>
          </div>

          <div className="mt-auto flex items-center justify-between gap-4 py-5">
            <div>
              <p className="text-[20px] font-semibold text-cream">
                {formatRp(space.pricePerNight)}
              </p>
              <span className="text-[12px] text-muted">/ night</span>
            </div>
            <Button
              className="px-10"
              onClick={() => router.push(`/booking/date?space=${space.id}`)}
            >
              Reserve
            </Button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
