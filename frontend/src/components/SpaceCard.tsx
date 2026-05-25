import Image from "next/image";
import Link from "next/link";
import { HeartIcon, StarIcon } from "@/components/icons";
import { formatRp, type Space } from "@/lib/data";

export function SpaceCard({ space }: { space: Space }) {
  return (
    <Link
      href={`/space/${space.id}`}
      className="block overflow-hidden rounded-card bg-surface ring-1 ring-white/5 transition-transform hover:scale-[1.01]"
    >
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={space.image}
          alt={space.name}
          fill
          sizes="(max-width: 768px) 100vw, 360px"
          className="object-cover"
        />
        <span className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-black/40 text-white backdrop-blur">
          <HeartIcon width={18} height={18} />
        </span>
        <span className="absolute left-3 top-3 flex items-center gap-1 rounded-pill bg-black/40 px-2.5 py-1 text-[12px] font-medium text-white backdrop-blur">
          <StarIcon width={13} height={13} className="text-cream" />
          {space.rating}
        </span>
      </div>
      <div className="p-3.5">
        <p className="text-[13px] text-cream">
          {formatRp(space.pricePerNight)}{" "}
          <span className="text-muted">For {space.nights} Nights</span>
        </p>
        <h3 className="mt-1 text-[15px] font-semibold text-white">
          {space.name}
        </h3>
        <p className="mt-0.5 text-[12px] text-muted">{space.location}</p>
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
