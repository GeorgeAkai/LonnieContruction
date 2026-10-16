/** Simplified Mid Valley mark: red sun rising behind a valley "V". */
export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <rect width="48" height="48" rx="10" fill="#d7261e" />
      <path d="M12 22a12 12 0 0 1 24 0Z" fill="#fff" />
      <path
        d="M6 24h10l8 16 8-16h10"
        fill="none"
        stroke="#0d0d0d"
        strokeWidth="4.5"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-lg font-bold uppercase tracking-wide ${inverted ? "text-white" : "text-ink"}`}
        >
          Mid Valley
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand">
          Lath &amp; Plaster
        </span>
      </span>
    </span>
  );
}
