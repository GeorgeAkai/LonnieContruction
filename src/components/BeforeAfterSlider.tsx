"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { ChevronsLeftRight } from "lucide-react";

type Props = {
  before: string;
  after: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
};

const unoptimized = (src: string) => src.endsWith(".svg");

/**
 * Drag (or use arrow keys) to compare before/after photos.
 * `touch-action: pan-y` keeps vertical page scrolling working on phones
 * while horizontal drags move the divider.
 */
export function BeforeAfterSlider({
  before,
  after,
  alt,
  priority,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  className = "aspect-[4/3]",
}: Props) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const update = useCallback((clientX: number) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  }, []);

  return (
    <div
      ref={ref}
      className={`group relative select-none overflow-hidden bg-ink-800 ${className}`}
      style={{ touchAction: "pan-y" }}
      onPointerDown={(e) => {
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        update(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && update(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
    >
      <Image
        src={after}
        alt={`After: ${alt}`}
        fill
        sizes={sizes}
        priority={priority}
        unoptimized={unoptimized(after)}
        draggable={false}
        className="object-cover"
      />
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <Image
          src={before}
          alt={`Before: ${alt}`}
          fill
          sizes={sizes}
          priority={priority}
          unoptimized={unoptimized(before)}
          draggable={false}
          className="object-cover"
        />
      </div>

      <span className="pointer-events-none absolute top-3 left-3 rounded-full bg-black/70 px-2.5 py-1 text-[11px] font-bold tracking-wider text-white uppercase backdrop-blur">
        Before
      </span>
      <span className="pointer-events-none absolute top-3 right-3 rounded-full bg-brand px-2.5 py-1 text-[11px] font-bold tracking-wider text-white uppercase">
        After
      </span>

      <div
        className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_12px_rgba(0,0,0,0.5)]"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-white bg-brand text-white shadow-xl transition-transform group-active:scale-110">
          <ChevronsLeftRight className="h-5 w-5" />
        </div>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={Math.round(pos)}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label={`Compare before and after: ${alt}`}
        className="peer sr-only"
      />
      <div className="pointer-events-none absolute inset-0 ring-brand ring-inset peer-focus-visible:ring-4" />
    </div>
  );
}
