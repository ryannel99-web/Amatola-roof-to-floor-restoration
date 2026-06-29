import { put } from '@vercel/blob';
import sharp from 'sharp';
import { v as verifySession } from './auth_2nt-sm7F.mjs';

const prerender = false;
const MAX_FILE_SIZE = 20 * 1024 * 1024;
const POST = async ({ request, cookies }) => {
  const c = cookies.get("admin_session");
  if (!c || !await verifySession(c.value)) return json({ error: "Unauthorized" }, 401);
  let formData;
  try {
    formData = await request.formData();
  } catch {
    return json({ error: "Invalid form data" }, 400);
  }
  const file = formData.get("file");
  const projectId = formData.get("projectId");
  const role = formData.get("role") ?? "photo";
  if (!file) return json({ error: "No file provided" }, 400);
  if (!projectId) return json({ error: "No projectId provided" }, 400);
  if (!file.type.startsWith("image/")) return json({ error: "File must be an image" }, 400);
  if (file.size > MAX_FILE_SIZE) return json({ error: "File is too large (max 20 MB)" }, 400);
  const buffer = Buffer.from(await file.arrayBuffer());
  const compressed = await sharp(buffer).rotate().resize(1400, 1400, { fit: "inside", withoutEnlargement: true }).jpeg({ quality: 80, progressive: true }).toBuffer();
  const suffix = role === "before" || role === "after" ? role : `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  const blob = await put(`images/${projectId}/${suffix}.jpg`, compressed, {
    access: "public",
    contentType: "image/jpeg",
    addRandomSuffix: false
  });
  return json({ url: blob.url, isAfter: role === "after" }, 200);
};
function json(data, status) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" }
  });
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
