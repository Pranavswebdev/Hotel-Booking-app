import Image from "next/image";
import Link from "next/link";
import { HeartIcon, StarIcon } from "@/components/icons";
import { formatRp, type Space } from "@/lib/data";

export function SpaceCard({ space }: { space: Space }) {
  return (
    <Link
      href={`/space/${space.id}`}
      className="group block overflow-hidden rounded-card bg-surface shadow-lg shadow-black/20 ring-1 ring-white/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40 hover:ring-white/15"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={space.image}
          alt={space.name}
          fill
          sizes="(max-width: 768px) 100vw, 360px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
        <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-black/35 text-white ring-1 ring-white/15 backdrop-blur transition-colors hover:text-coral">
          <HeartIcon width={18} height={18} />
        </span>
        <span className="absolute left-3 top-3 flex items-center gap-1 rounded-pill bg-black/45 px-2.5 py-1 text-[12px] font-semibold text-white ring-1 ring-white/10 backdrop-blur">
          <StarIcon width={13} height={13} className="text-cream" />
          {space.rating}
        </span>
        <span className="absolute bottom-3 left-3 rounded-pill bg-cream/95 px-2.5 py-1 text-[11px] font-semibold text-bg">
          {space.category}
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-[15px] font-semibold text-white">{space.name}</h3>
        <p className="mt-0.5 text-[12px] text-muted">{space.location}</p>
        <p className="mt-2.5 text-[15px] font-semibold text-cream">
          {formatRp(space.pricePerNight)}
          <span className="text-[12px] font-normal text-muted">
            {" "}
            / {space.nights} {space.nights > 1 ? "nights" : "night"}
          </span>
        </p>
      </div>
    </Link>
  );
}

export function SpaceRowCard({ space }: { space: Space }) {
  return (
    <Link
      href={`/space/${space.id}`}
      className="flex gap-3 overflow-hidden rounded-card bg-surface p-2.5 ring-1 ring-white/5"
    >
      <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-2xl">
        <Image
          src={space.image}
          alt={space.name}
          fill
          sizes="96px"
          className="object-cover"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center">
        <h3 className="truncate text-[14px] font-semibold text-white">
          {space.name}
        </h3>
        <p className="mt-0.5 text-[12px] text-cream">
          {formatRp(space.pricePerNight)}{" "}
          <span className="text-muted">for {space.nights} Nights</span>
        </p>
        <span className="mt-1 flex items-center gap-1 text-[12px] text-muted">
          <StarIcon width={12} height={12} className="text-cream" />
          {space.rating}
        </span>
      </div>
    </Link>
  );
}
