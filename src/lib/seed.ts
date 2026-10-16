import type { Project } from "./types";

/**
 * Sample projects shown until the first real project is saved from /admin.
 * They use illustrated placeholder images in /public/demo — delete or edit
 * them from the admin dashboard once real photos are uploaded.
 */
const created = "2026-01-01T00:00:00.000Z";

export const seedProjects: Project[] = [
  {
    id: "demo-chico-ranch",
    title: "Ranch Home Crack Repair & Color Coat",
    city: "Chico",
    category: "Stucco Repair",
    description:
      "Settlement cracks and a failed patch around the hose bib were cut out, re-lathed and blended, then the whole elevation got a fresh sand-finish color coat.",
    beforeUrl: "/demo/chico-ranch-before.svg",
    afterUrl: "/demo/chico-ranch-after.svg",
    featured: true,
    createdAt: created,
    updatedAt: created,
  },
  {
    id: "demo-oroville-arch",
    title: "Spanish Arch Entry Re-Stucco",
    city: "Oroville",
    category: "Re-Stucco",
    description:
      "Tired, water-stained stucco stripped back to lath around the arched entry and re-skinned with a smooth Santa Barbara finish and crisp dark trim.",
    beforeUrl: "/demo/oroville-arch-before.svg",
    afterUrl: "/demo/oroville-arch-after.svg",
    featured: true,
    createdAt: created,
    updatedAt: created,
  },
  {
    id: "demo-paradise-rebuild",
    title: "Fire Rebuild — Full Three-Coat Exterior",
    city: "Paradise",
    category: "Fire Rebuild",
    description:
      "New paper, wire and weep screed with a full three-coat cement plaster system for a fire-resistant, low-maintenance exterior.",
    beforeUrl: "/demo/paradise-rebuild-before.svg",
    afterUrl: "/demo/paradise-rebuild-after.svg",
    featured: false,
    createdAt: created,
    updatedAt: created,
  },
];
