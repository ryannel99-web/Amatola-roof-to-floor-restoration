import { d as deleteProject, g as getProject, a as deleteImageUrls, s as saveProject } from './projects_X2r_6wRq.mjs';
import { v as verifySession } from './auth_2nt-sm7F.mjs';

const prerender = false;
const PUT = async ({ request, cookies, params }) => {
  if (!await authed(cookies)) return json({ error: "Unauthorized" }, 401);
  const { id } = params;
  if (!id) return json({ error: "Missing id" }, 400);
  const existing = await getProject(id);
  if (!existing) return json({ error: "Project not found" }, 404);
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }
  const { title, description, category, isBeforeAfter, images, removedUrls = [] } = body;
  if (Array.isArray(removedUrls) && removedUrls.length > 0) {
    await deleteImageUrls(removedUrls);
  }
  const updated = {
    ...existing,
    title: title?.trim() ?? existing.title,
    description: (description ?? existing.description).trim(),
    category: category?.trim() ?? existing.category,
    isBeforeAfter: isBeforeAfter !== void 0 ? Boolean(isBeforeAfter) : existing.isBeforeAfter,
    images: images ?? existing.images,
    updatedAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  await saveProject(updated);
  return json({ project: updated }, 200);
};
const DELETE = async ({ cookies, params }) => {
  if (!await authed(cookies)) return json({ error: "Unauthorized" }, 401);
  const { id } = params;
  if (!id) return json({ error: "Missing id" }, 400);
  await deleteProject(id);
  return json({ ok: true }, 200);
};
async function authed(cookies) {
  const c = cookies.get("admin_session");
  return c ? verifySession(c.value) : false;
}
function json(data, status) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" }
  });
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE,
  PUT,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
