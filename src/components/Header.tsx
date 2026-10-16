"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { Logo } from "./Logo";
import { site } from "@/lib/site";

const links = [
  { href: "#work", label: "Our Work" },
  { href: "#services", label: "Services" },
  { href: "#areas", label: "Service Areas" },
  { href: "#contact", label: "Free Estimate" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-40 bg-white/90 backdrop-blur-md transition-shadow ${scrolled ? "shadow-[0_1px_0_rgba(0,0,0,0.08),0_8px_24px_-12px_rgba(0,0,0,0.2)]" : ""}`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" aria-label="Mid Valley Lath & Plaster home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-semibold text-ink-700 transition-colors hover:text-brand"
            >
              {l.label}
            </a>
          ))}
          <a
            href={site.phoneHref}
            className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-600 active:scale-[0.98]"
          >
            <Phone className="h-4 w-4" /> {site.phone}
          </a>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <a
            href={site.phoneHref}
            aria-label={`Call ${site.phone}`}
            className="grid h-11 w-11 place-items-center rounded-full bg-brand text-white shadow-md shadow-brand/30 active:scale-95"
          >
            <Phone className="h-5 w-5" />
          </a>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            className="grid h-11 w-11 place-items-center rounded-full border border-black/10 active:scale-95"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true">
          <button
            aria-label="Close menu"
            className="absolute inset-0 animate-fade-in bg-black/50"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-x-0 bottom-0 animate-sheet-up rounded-t-3xl bg-white p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
            <div className="mx-auto mb-5 h-1.5 w-12 rounded-full bg-black/15" />
            <div className="mb-4 flex items-center justify-between">
              <Logo />
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid h-10 w-10 place-items-center rounded-full bg-mist"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col" aria-label="Mobile">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-black/5 py-4 font-display text-2xl font-semibold uppercase tracking-wide active:text-brand"
                >
                  {l.label}
                </a>
              ))}
            </nav>
            <a
              href={site.phoneHref}
              className="mt-6 flex h-14 items-center justify-center gap-2 rounded-2xl bg-brand text-lg font-bold text-white active:scale-[0.98]"
            >
              <Phone className="h-5 w-5" /> Call {site.phone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
