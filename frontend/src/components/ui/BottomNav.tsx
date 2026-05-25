"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import {
  ChatIcon,
  DiscoverIcon,
  HomeIcon,
  ProfileIcon,
} from "@/components/icons";

const tabs = [
  { href: "/home", label: "Home", Icon: HomeIcon },
  { href: "/discover", label: "Discover", Icon: DiscoverIcon },
  { href: "/chat", label: "Chat", Icon: ChatIcon },
  { href: "/profile", label: "Profile", Icon: ProfileIcon },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="sticky bottom-0 z-10 mt-auto border-t border-white/5 bg-bg/95 px-6 pb-6 pt-3 backdrop-blur">
      <ul className="flex items-center justify-between">
        {tabs.map(({ href, label, Icon }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  "flex flex-col items-center gap-1 text-[11px] transition-colors",
                  active ? "text-coral" : "text-muted hover:text-white",
                )}
              >
                <Icon width={22} height={22} />
                <span>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
