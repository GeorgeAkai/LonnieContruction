import { promises as fs } from "node:fs";
import path from "node:path";
import { LOCAL_UPLOAD_DIR } from "@/lib/storage";

const TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".avif": "image/avif",
};

/** Serves photos saved by the local-filesystem storage fallback. */
export async function GET(
  _request: Request,
  { params }: RouteContext<"/uploads/[file]">,
) {
  const name = path.basename((await params).file);
  const type = TYPES[path.extname(name).toLowerCase()];
  if (!type) return new Response("Not found", { status: 404 });
  try {
    const data = await fs.readFile(path.join(LOCAL_UPLOAD_DIR, name));
    return new Response(data, {
      headers: {
        "Content-Type": type,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
