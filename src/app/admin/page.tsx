import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import {
  CheckCircle2,
  CloudOff,
  LogOut,
  MapPin,
  Pencil,
  Plus,
  Star,
  Trash2,
} from "lucide-react";
import { AdminFallback, AdminGate } from "@/components/admin/AdminGate";
import { ConfirmSubmit } from "@/components/admin/ConfirmSubmit";
import { getProjects } from "@/lib/projects";
import { useBlob } from "@/lib/storage";
import { deleteProject, logout, toggleFeatured } from "./actions";

export default function AdminPage({ searchParams }: PageProps<"/admin">) {
  return (
    <Suspense fallback={<AdminFallback />}>
      <AdminGate>
        <Dashboard searchParams={searchParams} />
      </AdminGate>
    </Suspense>
  );
}

async function Dashboard({
  searchParams,
}: {
  searchParams: PageProps<"/admin">["searchParams"];
}) {
  const [projects, params] = await Promise.all([getProjects(), searchParams]);
  const onVercelWithoutBlob = process.env.VERCEL && !useBlob;

  return (
    <div className="grid gap-6 pb-24">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold tracking-[0.2em] text-brand uppercase">
            Dashboard
          </p>
          <h1 className="font-display text-3xl font-bold uppercase sm:text-4xl">
            Your projects
          </h1>
          <p className="text-sm text-ink-700/70">
            {projects.length} project{projects.length === 1 ? "" : "s"} on the
            site
          </p>
        </div>
        <form action={logout}>
          <button className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-ink-700 hover:bg-black/5">
            <LogOut className="h-4 w-4" /> Log out
          </button>
        </form>
      </div>

      {params.saved && (
        <p className="flex items-center gap-2 rounded-2xl bg-green-50 p-4 font-semibold text-green-800">
          <CheckCircle2 className="h-5 w-5" /> Project saved — it&apos;s live on
          the site.
        </p>
      )}

      {onVercelWithoutBlob && (
        <div className="flex gap-3 rounded-2xl bg-amber-50 p-4 text-amber-900">
          <CloudOff className="h-5 w-5 shrink-0" />
          <p className="text-sm">
            <b>Photo storage isn&apos;t connected.</b> In Vercel, open your
            project → Storage → Create → Blob, connect it to this project and
            redeploy. Until then uploads won&apos;t be saved.
          </p>
        </div>
      )}

      <Link
        href="/admin/new"
        className="hidden h-13 items-center justify-center gap-2 rounded-2xl bg-brand font-bold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-600 active:scale-[0.98] sm:flex"
      >
        <Plus className="h-5 w-5" /> Add a new project
      </Link>

      <ul className="grid gap-3">
        {projects.map((p) => (
          <li
            key={p.id}
            className="flex gap-3 rounded-3xl bg-white p-3 ring-1 ring-black/5 sm:gap-4"
          >
            <div className="grid w-28 shrink-0 grid-cols-2 gap-0.5 overflow-hidden rounded-2xl sm:w-44">
              {[p.beforeUrl, p.afterUrl].map((src, i) => (
                <div key={src + i} className="relative aspect-[3/4] sm:aspect-square">
                  <Image
                    src={src}
                    alt={i === 0 ? "Before" : "After"}
                    fill
                    sizes="88px"
                    unoptimized={src.endsWith(".svg")}
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="flex min-w-0 flex-1 flex-col">
              <div className="flex items-start gap-2">
                <h2 className="line-clamp-2 flex-1 font-semibold leading-snug">
                  {p.title}
                </h2>
                {p.featured && (
                  <Star className="h-4 w-4 shrink-0 fill-brand text-brand" aria-label="Featured" />
                )}
              </div>
              <p className="mt-1 flex items-center gap-1 text-xs text-ink-700/70">
                <MapPin className="h-3.5 w-3.5" /> {p.city} · {p.category}
              </p>
              {p.id.startsWith("demo-") && (
                <p className="mt-1 text-xs font-semibold text-amber-700">
                  Sample project — replace with your own photos
                </p>
              )}
              <div className="mt-auto flex items-center gap-1 pt-2">
                <Link
                  href={`/admin/${p.id}/edit`}
                  className="inline-flex h-10 items-center gap-1.5 rounded-full bg-ink px-4 text-sm font-bold text-white active:scale-95"
                >
                  <Pencil className="h-4 w-4" /> Edit
                </Link>
                <form action={toggleFeatured}>
                  <input type="hidden" name="id" value={p.id} />
                  <ConfirmSubmit
                    label={p.featured ? "Unfeature" : "Feature"}
                    className="grid h-10 w-10 place-items-center rounded-full hover:bg-black/5 active:scale-95"
                  >
                    <Star className={`h-5 w-5 ${p.featured ? "fill-brand text-brand" : ""}`} />
                  </ConfirmSubmit>
                </form>
                <form action={deleteProject} className="ml-auto">
                  <input type="hidden" name="id" value={p.id} />
                  <ConfirmSubmit
                    label="Delete project"
                    message={`Delete "${p.title}"? This removes its photos too.`}
                    className="grid h-10 w-10 place-items-center rounded-full text-brand hover:bg-brand-50 active:scale-95"
                  >
                    <Trash2 className="h-5 w-5" />
                  </ConfirmSubmit>
                </form>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {projects.length === 0 && (
        <p className="rounded-3xl border-2 border-dashed border-black/10 p-10 text-center text-ink-700/70">
          No projects yet. Add your first before &amp; after!
        </p>
      )}

      {/* Floating action button on phones */}
      <Link
        href="/admin/new"
        aria-label="Add a new project"
        className="fixed right-5 bottom-[calc(1.25rem+env(safe-area-inset-bottom))] z-20 flex h-16 items-center gap-2 rounded-full bg-brand pr-6 pl-5 font-bold text-white shadow-2xl shadow-brand/40 active:scale-95 sm:hidden"
      >
        <Plus className="h-6 w-6" /> New
      </Link>
    </div>
  );
}
