import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = (props: IconProps) => ({
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  ...props,
});

export const SearchIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3-3" />
  </svg>
);

export const StarIcon = (p: IconProps) => (
  <svg {...base(p)} fill="currentColor" stroke="none">
    <path d="M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.8 6.2 20.9l1.1-6.5L2.6 9.8l6.5-.9z" />
  </svg>
);

export const HeartIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 20s-7-4.4-9.3-8.4C1.2 8.9 2.6 5.5 6 5.5c2 0 3.2 1.2 4 2.3.8-1.1 2-2.3 4-2.3 3.4 0 4.8 3.4 3.3 6.1C19 15.6 12 20 12 20z" />
  </svg>
);

export const LocationIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

export const BackIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M15 19l-7-7 7-7" />
  </svg>
);

export const ChevronRightIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M9 6l6 6-6 6" />
  </svg>
);

export const GuestIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6" />
  </svg>
);

export const BedIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3 7v10M3 12h18v5M21 17v-3a3 3 0 0 0-3-3H9" />
    <circle cx="6.5" cy="9.5" r="1.5" />
  </svg>
);

export const BathIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z" />
    <path d="M6 12V6a2 2 0 0 1 2-2c1 0 1.6.6 2 1.5M6 19l-1 2M19 19l1 2" />
  </svg>
);

export const HomeIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 11l8-7 8 7" />
    <path d="M6 10v9h12v-9" />
  </svg>
);

export const DiscoverIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M15.5 8.5l-2 5-5 2 2-5z" fill="currentColor" stroke="none" />
  </svg>
);

export const ChatIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 5h16v11H8l-4 4z" />
  </svg>
);

export const ProfileIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="8" r="4" />
    <path d="M5 20c0-3.3 3.1-6 7-6s7 2.7 7 6" />
  </svg>
);

export const GoogleIcon = (p: IconProps) => (
  <svg width={20} height={20} viewBox="0 0 24 24" {...p}>
    <path
      fill="#FFC107"
      d="M21.8 10H12v4h5.6c-.8 2.3-3 4-5.6 4a6 6 0 1 1 0-12c1.5 0 2.9.6 4 1.5l2.8-2.8A10 10 0 1 0 22 12c0-.7-.1-1.4-.2-2z"
    />
    <path
      fill="#FF3D00"
      d="M3.2 7.3l3.3 2.4A6 6 0 0 1 12 6c1.5 0 2.9.6 4 1.5l2.8-2.8A10 10 0 0 0 3.2 7.3z"
    />
    <path
      fill="#4CAF50"
      d="M12 22c2.6 0 5-.9 6.8-2.5l-3.1-2.6c-1 .7-2.3 1.1-3.7 1.1-2.6 0-4.8-1.7-5.6-4l-3.3 2.5A10 10 0 0 0 12 22z"
    />
    <path
      fill="#1976D2"
      d="M21.8 10H12v4h5.6a6 6 0 0 1-2 2.9l3.1 2.6C20.5 17.9 22 15.2 22 12c0-.7-.1-1.4-.2-2z"
    />
  </svg>
);

export const AppleIcon = (p: IconProps) => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M16.4 12.6c0-2.2 1.8-3.3 1.9-3.3-1-1.5-2.6-1.7-3.2-1.7-1.4-.1-2.7.8-3.3.8-.7 0-1.7-.8-2.8-.8-1.5 0-2.8.8-3.6 2.2-1.5 2.6-.4 6.5 1.1 8.6.7 1 1.6 2.2 2.7 2.1 1.1 0 1.5-.7 2.8-.7s1.6.7 2.8.7c1.1 0 1.9-1 2.6-2 .8-1.2 1.2-2.3 1.2-2.4-.1 0-2.2-.9-2.2-3.3zM14.3 5.9c.6-.7 1-1.7.9-2.7-.9 0-1.9.6-2.5 1.3-.5.6-1 1.6-.9 2.6 1 .1 1.9-.5 2.5-1.2z" />
  </svg>
);

export const PlusIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const MinusIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 12h14" />
  </svg>
);
