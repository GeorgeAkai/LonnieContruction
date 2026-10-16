import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { readProjects } from "./storage";

export const PROJECTS_TAG = "projects";

/** Cached project list. Mutations call updateTag(PROJECTS_TAG). */
export async function getProjects() {
  "use cache";
  cacheTag(PROJECTS_TAG);
  cacheLife("days");

  const projects = await readProjects();
  return [...projects].sort(
    (a, b) =>
      Number(b.featured) - Number(a.featured) ||
      b.createdAt.localeCompare(a.createdAt),
  );
}
