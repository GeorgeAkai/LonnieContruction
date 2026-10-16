import { isAuthenticated } from "@/lib/auth";
import { ALLOWED_IMAGE_TYPES, saveImage } from "@/lib/storage";

// Images are resized in the browser before upload, so they stay well under
// Vercel's 4.5 MB request body limit.
const MAX_BYTES = 4 * 1024 * 1024;

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return Response.json({ error: "No file uploaded" }, { status: 400 });
  }
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return Response.json(
      { error: "Please upload a JPG, PNG or WebP photo" },
      { status: 415 },
    );
  }
  if (file.size > MAX_BYTES) {
    return Response.json({ error: "Photo is too large" }, { status: 413 });
  }

  try {
    const url = await saveImage(file);
    return Response.json({ url });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Upload failed" }, { status: 500 });
  }
}
