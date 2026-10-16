import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { del, list, put } from "@vercel/blob";
import type { Project } from "./types";
import { seedProjects } from "./seed";

/**
 * Storage backends:
 * - Vercel Blob (production): enabled when BLOB_READ_WRITE_TOKEN is set.
 *   Photos are stored as public blobs; the project list is stored as a JSON
 *   blob. Each save writes a new uniquely-named JSON file (so CDN caching can
 *   never serve a stale list) and removes the older ones.
 * - Local filesystem (development): data/projects.json + data/uploads,
 *   served by the /uploads/[file] route.
 */
export const useBlob = Boolean(process.env.BLOB_READ_WRITE_TOKEN);

const DATA_PREFIX = "data/projects";
const LOCAL_DATA_FILE = path.join(process.cwd(), "data", "projects.json");
export const LOCAL_UPLOAD_DIR = path.join(process.cwd(), "data", "uploads");

export async function readProjects(): Promise<Project[]> {
  if (useBlob) {
    const { blobs } = await list({ prefix: DATA_PREFIX });
    if (blobs.length === 0) return seedProjects;
    const latest = blobs.sort(
      (a, b) => +new Date(b.uploadedAt) - +new Date(a.uploadedAt),
    )[0];
    const res = await fetch(latest.url, { cache: "no-store" });
    if (!res.ok) throw new Error(`Failed to load projects (${res.status})`);
    return (await res.json()) as Project[];
  }

  try {
    return JSON.parse(await fs.readFile(LOCAL_DATA_FILE, "utf8")) as Project[];
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return seedProjects;
    throw err;
  }
}

export async function writeProjects(projects: Project[]): Promise<void> {
  const body = JSON.stringify(projects, null, 2);

  if (useBlob) {
    const { blobs: old } = await list({ prefix: DATA_PREFIX });
    await put(`${DATA_PREFIX}.json`, body, {
      access: "public",
      addRandomSuffix: true,
      contentType: "application/json",
    });
    if (old.length) await del(old.map((b) => b.url));
    return;
  }

  await fs.mkdir(path.dirname(LOCAL_DATA_FILE), { recursive: true });
  await fs.writeFile(LOCAL_DATA_FILE, body);
}

const EXT_BY_TYPE: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/avif": "avif",
};

export const ALLOWED_IMAGE_TYPES = Object.keys(EXT_BY_TYPE);

export async function saveImage(file: File): Promise<string> {
  const ext = EXT_BY_TYPE[file.type];
  if (!ext) throw new Error("Unsupported image type");
  const name = `${randomUUID()}.${ext}`;

  if (useBlob) {
    const blob = await put(`projects/${name}`, file, {
      access: "public",
      contentType: file.type,
    });
    return blob.url;
  }

  await fs.mkdir(LOCAL_UPLOAD_DIR, { recursive: true });
  await fs.writeFile(
    path.join(LOCAL_UPLOAD_DIR, name),
    Buffer.from(await file.arrayBuffer()),
  );
  return `/uploads/${name}`;
}

/** Deletes an uploaded photo. Ignores bundled demo images and unknown URLs. */
export async function deleteImage(url: string): Promise<void> {
  if (!url) return;
  try {
    if (url.includes(".blob.vercel-storage.com/")) {
      if (useBlob) await del(url);
      return;
    }
    if (url.startsWith("/uploads/")) {
      const file = path.join(LOCAL_UPLOAD_DIR, path.basename(url));
      await fs.unlink(file);
    }
  } catch (err) {
    console.warn("Could not delete image", url, err);
  }
}
