import { randomUUID } from 'node:crypto';
import { l as listProjects, s as saveProject } from './projects_X2r_6wRq.mjs';
import { v as verifySession } from './auth_2nt-sm7F.mjs';

const prerender = false;
const GET = async () => {
  try {
    const projects = await listProjects();
    return json({ projects }, 200);
  } catch (err) {
    console.error("GET /api/projects:", err);
    return json({ error: "Failed to load projects" }, 500);
  }
};
const POST = async ({ request, cookies }) => {
  if (!await authed(cookies)) return json({ error: "Unauthorized" }, 401);
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }
  const { title, description, category, isBeforeAfter, images } = body;
  if (!title?.trim()) return json({ error: "title is required" }, 400);
  if (!category?.trim()) return json({ error: "category is required" }, 400);
  if (!images?.length) return json({ error: "at least one image is required" }, 400);
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const project = {
    id: randomUUID(),
    title: title.trim(),
    description: (description ?? "").trim(),
    category: category.trim(),
    isBeforeAfter: Boolean(isBeforeAfter),
    images,
    createdAt: now,
    updatedAt: now
  };
  await saveProject(project);
  return json({ project }, 201);
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
  GET,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
