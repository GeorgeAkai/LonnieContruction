"use server";

import { randomUUID } from "node:crypto";
import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import {
  checkPassword,
  createSession,
  destroySession,
  requireAdmin,
} from "@/lib/auth";
import { PROJECTS_TAG } from "@/lib/projects";
import { deleteImage, readProjects, writeProjects } from "@/lib/storage";
import type { Project, ProjectInput } from "@/lib/types";

export type ActionState = { ok: boolean; message?: string } | null;

export async function login(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const password = String(formData.get("password") ?? "");
  if (!checkPassword(password)) {
    // Small delay to slow down guessing.
    await new Promise((r) => setTimeout(r, 600));
    return { ok: false, message: "Incorrect password." };
  }
  await createSession();
  redirect("/admin");
}

export async function logout() {
  await destroySession();
  redirect("/admin");
}

function isOwnImageUrl(url: string) {
  return (
    url.startsWith("/uploads/") ||
    url.startsWith("/demo/") ||
    /^https:\/\/[a-z0-9-]+\.public\.blob\.vercel-storage\.com\//i.test(url)
  );
}

function parseInput(formData: FormData): ProjectInput | string {
  const get = (k: string) => String(formData.get(k) ?? "").trim();
  const input: ProjectInput = {
    title: get("title").slice(0, 120),
    city: get("city").slice(0, 60),
    category: get("category").slice(0, 60),
    description: get("description").slice(0, 1000),
    beforeUrl: get("beforeUrl"),
    afterUrl: get("afterUrl"),
    featured: formData.get("featured") === "on",
  };
  if (!input.title) return "Give the project a title.";
  if (!input.city) return "Which city was this job in?";
  if (!input.beforeUrl || !input.afterUrl)
    return "Add both a before and an after photo.";
  if (!isOwnImageUrl(input.beforeUrl) || !isOwnImageUrl(input.afterUrl))
    return "Photos must be uploaded through this form.";
  return input;
}

export async function saveProject(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAdmin();
  const input = parseInput(formData);
  if (typeof input === "string") return { ok: false, message: input };

  const id = String(formData.get("id") ?? "");
  const projects = await readProjects();
  const now = new Date().toISOString();

  if (id) {
    const i = projects.findIndex((p) => p.id === id);
    if (i === -1) return { ok: false, message: "Project not found." };
    const prev = projects[i];
    projects[i] = { ...prev, ...input, updatedAt: now };
    await writeProjects(projects);
    // Clean up photos that were replaced.
    if (prev.beforeUrl !== input.beforeUrl) await deleteImage(prev.beforeUrl);
    if (prev.afterUrl !== input.afterUrl) await deleteImage(prev.afterUrl);
  } else {
    const project: Project = {
      id: randomUUID(),
      ...input,
      createdAt: now,
      updatedAt: now,
    };
    await writeProjects([project, ...projects]);
  }

  updateTag(PROJECTS_TAG);
  redirect("/admin?saved=1");
}

export async function deleteProject(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const projects = await readProjects();
  const target = projects.find((p) => p.id === id);
  if (!target) return;
  await writeProjects(projects.filter((p) => p.id !== id));
  await Promise.all([
    deleteImage(target.beforeUrl),
    deleteImage(target.afterUrl),
  ]);
  updateTag(PROJECTS_TAG);
}

export async function toggleFeatured(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const projects = await readProjects();
  const target = projects.find((p) => p.id === id);
  if (!target) return;
  target.featured = !target.featured;
  target.updatedAt = new Date().toISOString();
  await writeProjects(projects);
  updateTag(PROJECTS_TAG);
}
