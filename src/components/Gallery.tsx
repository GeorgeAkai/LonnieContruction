"use client";

import { useEffect, useMemo, useState } from "react";
import { MapPin, Maximize2, Phone, X } from "lucide-react";
import { BeforeAfterSlider } from "./BeforeAfterSlider";
import type { Project } from "@/lib/types";
import { site } from "@/lib/site";

export function Gallery({ projects }: { projects: Project[] }) {
  const cities = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((p) => p.city))).sort()],
    [projects],
  );
  const [city, setCity] = useState("All");
  const [active, setActive] = useState<Project | null>(null);

  const shown =
    city === "All" ? projects : projects.filter((p) => p.city === city);

  useEffect(() => {
    if (!active) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  if (projects.length === 0) {
    return (
      <div className="rounded-3xl border-2 border-dashed border-black/10 p-10 text-center text-ink-700">
        New project photos are on the way. Call{" "}
        <a href={site.phoneHref} className="font-bold text-brand">
          {site.phone}
        </a>{" "}
        to see examples of our work.
      </div>
    );
  }

  return (
    <>
      {cities.length > 2 && (
        <div
          className="no-scrollbar -mx-4 mb-6 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0"
          role="tablist"
          aria-label="Filter by city"
        >
          {cities.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={city === c}
              onClick={() => setCity(c)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition active:scale-95 ${
                city === c
                  ? "bg-ink text-white"
                  : "bg-mist text-ink-700 hover:bg-black/10"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3">
        {shown.map((p, i) => (
          <article
            key={p.id}
            className="w-[85%] shrink-0 snap-center overflow-hidden rounded-3xl bg-white shadow-[0_10px_30px_-12px_rgba(0,0,0,0.25)] ring-1 ring-black/5 sm:w-auto"
          >
            <BeforeAfterSlider
              before={p.beforeUrl}
              after={p.afterUrl}
              alt={p.title}
              priority={i < 2}
            />
            <div className="p-5">
              <div className="mb-2 flex flex-wrap items-center gap-2 text-xs font-semibold">
                <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2.5 py-1 text-brand-700">
                  <MapPin className="h-3.5 w-3.5" /> {p.city}
                </span>
                {p.category && (
                  <span className="rounded-full bg-mist px-2.5 py-1 text-ink-700">
                    {p.category}
                  </span>
                )}
              </div>
              <h3 className="font-display text-xl leading-tight font-semibold uppercase">
                {p.title}
              </h3>
              {p.description && (
                <p className="mt-2 line-clamp-2 text-sm text-ink-700/80">
                  {p.description}
                </p>
              )}
              <button
                onClick={() => setActive(p)}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:text-brand-700"
              >
                <Maximize2 className="h-4 w-4" /> View full project
              </button>
            </div>
          </article>
        ))}
      </div>
      <p className="mt-3 text-center text-xs text-ink-700/60 sm:hidden">
        Swipe for more projects · drag the red handle to compare
      </p>

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
        >
          <button
            aria-label="Close"
            className="absolute inset-0 animate-fade-in bg-black/70 backdrop-blur-sm"
            onClick={() => setActive(null)}
          />
          <div className="relative max-h-[92dvh] w-full max-w-4xl animate-sheet-up overflow-y-auto rounded-t-3xl bg-white sm:animate-fade-up sm:rounded-3xl">
            <div className="flex items-center justify-between px-4 py-2.5">
              <span className="text-xs font-bold tracking-[0.2em] text-ink-700/60 uppercase">
                Before &amp; After
              </span>
              <button
                onClick={() => setActive(null)}
                aria-label="Close"
                className="grid h-10 w-10 place-items-center rounded-full bg-mist active:scale-95"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <BeforeAfterSlider
              before={active.beforeUrl}
              after={active.afterUrl}
              alt={active.title}
              sizes="(min-width: 896px) 896px, 100vw"
              className="aspect-[4/3] sm:aspect-[16/10]"
            />
            <div className="p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
              <p className="mb-1 text-sm font-semibold text-brand">
                {active.city}, CA · {active.category}
              </p>
              <h3 className="font-display text-2xl font-semibold uppercase">
                {active.title}
              </h3>
              {active.description && (
                <p className="mt-3 whitespace-pre-line text-ink-700">
                  {active.description}
                </p>
              )}
              <a
                href={site.phoneHref}
                className="mt-6 flex h-13 items-center justify-center gap-2 rounded-2xl bg-brand font-bold text-white active:scale-[0.98] sm:inline-flex sm:px-8"
              >
                <Phone className="h-5 w-5" /> Call for a Free Estimate
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
