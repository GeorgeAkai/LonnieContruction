"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Loader2, Save } from "lucide-react";
import { saveProject } from "@/app/admin/actions";
import { CATEGORIES, type Project } from "@/lib/types";
import { site } from "@/lib/site";
import { ImageUploader } from "./ImageUploader";

const field =
  "h-13 w-full rounded-2xl border border-black/10 bg-white px-4 text-base outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/15";

export function ProjectForm({ project }: { project?: Project }) {
  const [state, action, pending] = useActionState(saveProject, null);

  return (
    <form action={action} className="grid gap-5">
      {project && <input type="hidden" name="id" value={project.id} />}

      <div className="grid gap-4 sm:grid-cols-2">
        <ImageUploader
          name="beforeUrl"
          label="Before photo"
          tone="before"
          defaultValue={project?.beforeUrl}
        />
        <ImageUploader
          name="afterUrl"
          label="After photo"
          tone="after"
          defaultValue={project?.afterUrl}
        />
      </div>

      <label className="grid gap-1.5">
        <span className="text-sm font-semibold">Project title</span>
        <input
          name="title"
          required
          maxLength={120}
          defaultValue={project?.title}
          placeholder="e.g. Ranch home crack repair & color coat"
          className={field}
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5">
          <span className="text-sm font-semibold">City</span>
          <input
            name="city"
            required
            list="cities"
            defaultValue={project?.city ?? "Chico"}
            className={field}
          />
          <datalist id="cities">
            {site.serviceAreas.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
        </label>
        <label className="grid gap-1.5">
          <span className="text-sm font-semibold">Type of work</span>
          <select
            name="category"
            defaultValue={project?.category ?? CATEGORIES[0]}
            className={field}
          >
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
      </div>

      <label className="grid gap-1.5">
        <span className="text-sm font-semibold">Description (optional)</span>
        <textarea
          name="description"
          rows={4}
          maxLength={1000}
          defaultValue={project?.description}
          placeholder="What was wrong, what you did, what finish you used…"
          className={`${field} h-auto py-3`}
        />
      </label>

      <label className="flex items-center justify-between gap-4 rounded-2xl bg-white p-4 ring-1 ring-black/10">
        <span>
          <span className="block font-semibold">Feature this project</span>
          <span className="block text-sm text-ink-700/70">
            Featured projects show first — the top one appears in the hero.
          </span>
        </span>
        <input
          type="checkbox"
          name="featured"
          defaultChecked={project?.featured}
          className="peer sr-only"
        />
        <span className="relative h-8 w-14 shrink-0 rounded-full bg-black/15 transition peer-checked:bg-brand peer-focus-visible:ring-4 peer-focus-visible:ring-brand/20 after:absolute after:top-1 after:left-1 after:h-6 after:w-6 after:rounded-full after:bg-white after:shadow after:transition peer-checked:after:translate-x-6" />
      </label>

      {state?.message && (
        <p role="alert" className="rounded-2xl bg-brand-50 p-4 font-semibold text-brand-700">
          {state.message}
        </p>
      )}

      <div className="sticky bottom-0 -mx-4 grid grid-cols-[auto_1fr] gap-3 border-t border-black/5 bg-mist/95 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur sm:static sm:mx-0 sm:flex sm:justify-end sm:border-0 sm:bg-transparent sm:p-0">
        <Link
          href="/admin"
          className="flex h-13 items-center justify-center rounded-2xl bg-white px-6 font-bold ring-1 ring-black/10"
        >
          Cancel
        </Link>
        <button
          disabled={pending}
          className="flex h-13 items-center justify-center gap-2 rounded-2xl bg-brand px-8 font-bold text-white transition hover:bg-brand-600 active:scale-[0.98] disabled:opacity-60"
        >
          {pending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
          {project ? "Save changes" : "Add project"}
        </button>
      </div>
    </form>
  );
}
