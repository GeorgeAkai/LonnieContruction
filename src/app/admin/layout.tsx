import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Logo } from "@/components/Logo";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return (
    <div className="min-h-dvh bg-mist">
      <header className="sticky top-0 z-30 border-b border-black/5 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4">
          <Link href="/admin" aria-label="Admin home">
            <Logo />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-full bg-mist px-3 py-2 text-sm font-semibold"
          >
            View site <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-4 py-6 sm:py-10">{children}</main>
    </div>
  );
}
