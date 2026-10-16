"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Camera, Loader2, RefreshCw } from "lucide-react";

const MAX_DIMENSION = 2000;

/** Downscale + re-encode phone photos in the browser so uploads are fast and small. */
async function compress(file: File): Promise<Blob> {
  if (file.type === "image/gif") return file;
  const bitmap = await createImageBitmap(file).catch(() => null);
  if (!bitmap) return file; // Unsupported by canvas (e.g. HEIC on some browsers)
  const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  return new Promise((resolve) =>
    canvas.toBlob((b) => resolve(b ?? file), "image/jpeg", 0.85),
  );
}

export function ImageUploader({
  name,
  label,
  defaultValue = "",
  tone,
}: {
  name: string;
  label: string;
  defaultValue?: string;
  tone: "before" | "after";
}) {
  const [url, setUrl] = useState(defaultValue);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const input = useRef<HTMLInputElement>(null);

  async function onFile(file: File | undefined) {
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      const blob = await compress(file);
      const body = new FormData();
      const type = blob.type || file.type;
      const ext = type.split("/")[1] ?? "jpg";
      body.append("file", new File([blob], `photo.${ext}`, { type }));
      const res = await fetch("/api/upload", { method: "POST", body });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error ?? "Upload failed");
      setUrl(json.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setBusy(false);
      if (input.current) input.current.value = "";
    }
  }

  return (
    <div className="grid gap-1.5">
      <span className="flex items-center gap-2 text-sm font-semibold">
        <span
          className={`h-2.5 w-2.5 rounded-full ${tone === "before" ? "bg-ink" : "bg-brand"}`}
        />
        {label}
      </span>
      <input type="hidden" name={name} value={url} />
      <button
        type="button"
        onClick={() => input.current?.click()}
        disabled={busy}
        className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl border-2 border-dashed border-black/15 bg-mist transition hover:border-brand focus-visible:border-brand focus-visible:outline-none"
      >
        {url ? (
          <>
            <Image
              src={url}
              alt={label}
              fill
              sizes="(min-width: 640px) 320px, 100vw"
              unoptimized={url.endsWith(".svg")}
              className="object-cover"
            />
            <span className="absolute right-2 bottom-2 inline-flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1.5 text-xs font-bold text-white backdrop-blur">
              <RefreshCw className="h-3.5 w-3.5" /> Replace
            </span>
          </>
        ) : (
          <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-ink-700/70">
            <Camera className="h-8 w-8" />
            <span className="text-sm font-semibold">Tap to take or choose a photo</span>
          </span>
        )}
        {busy && (
          <span className="absolute inset-0 grid place-items-center bg-white/70 backdrop-blur-sm">
            <Loader2 className="h-8 w-8 animate-spin text-brand" />
          </span>
        )}
      </button>
      <input
        ref={input}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => onFile(e.target.files?.[0])}
      />
      {error && <p className="text-sm font-semibold text-brand">{error}</p>}
    </div>
  );
}
