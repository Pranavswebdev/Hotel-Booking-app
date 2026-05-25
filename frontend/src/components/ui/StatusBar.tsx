export function StatusBar() {
  return (
    <div className="flex items-center justify-between px-6 pt-3 pb-1 text-white">
      <span className="text-[15px] font-semibold">9:41</span>
      <div className="flex items-center gap-1.5">
        <svg width="17" height="11" viewBox="0 0 17 11" fill="white">
          <rect x="0" y="6" width="3" height="5" rx="1" />
          <rect x="4.5" y="4" width="3" height="7" rx="1" />
          <rect x="9" y="2" width="3" height="9" rx="1" />
          <rect x="13.5" y="0" width="3" height="11" rx="1" />
        </svg>
        <svg width="16" height="11" viewBox="0 0 16 11" fill="white">
          <path d="M8 2.5c2 0 3.8.8 5.1 2l1-1.2A9 9 0 0 0 8 .8 9 9 0 0 0 1.9 3.3l1 1.2A7.5 7.5 0 0 1 8 2.5z" />
          <path d="M8 6c1.1 0 2.1.4 2.8 1.1l1-1.2A6 6 0 0 0 8 4.3a6 6 0 0 0-3.8 1.6l1 1.2A4 4 0 0 1 8 6z" />
          <circle cx="8" cy="9.2" r="1.6" />
        </svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect
            x="0.5"
            y="0.5"
            width="21"
            height="11"
            rx="3"
            stroke="white"
            opacity="0.5"
          />
          <rect x="2" y="2" width="17" height="8" rx="1.5" fill="white" />
          <rect x="23" y="4" width="1.5" height="4" rx="0.75" fill="white" opacity="0.5" />
        </svg>
      </div>
    </div>
  );
}
