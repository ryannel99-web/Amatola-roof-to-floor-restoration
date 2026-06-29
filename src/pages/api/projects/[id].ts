import type { APIRoute } from 'astro';
import { getProject, saveProject, deleteProject, deleteImageUrls } from '../../../lib/projects';
import { verifySession } from '../../../lib/auth';

export const prerender = false;

export const PUT: APIRoute = async ({ request, cookies, params }) => {
  if (!await authed(cookies)) return json({ error: 'Unauthorized' }, 401);

  const { id } = params;
  if (!id) return json({ error: 'Missing id' }, 400);

  const existing = await getProject(id);
  if (!existing) return json({ error: 'Project not found' }, 404);

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid JSON' }, 400);
  }

  const { title, description, category, isBeforeAfter, images, removedUrls = [] } = body as {
    title?: string;
    description?: string;
    category?: string;
    isBeforeAfter?: boolean;
    images?: import('../../../lib/projects').ProjectImage[];
    removedUrls?: string[];
  };

  if (Array.isArray(removedUrls) && removedUrls.length > 0) {
    await deleteImageUrls(removedUrls);
  }

  const updated = {
    ...existing,
    title: title?.trim() ?? existing.title,
    description: (description ?? existing.description).trim(),
    category: category?.trim() ?? existing.category,
    isBeforeAfter: isBeforeAfter !== undefined ? Boolean(isBeforeAfter) : existing.isBeforeAfter,
    images: images ?? existing.images,
    updatedAt: new Date().toISOString(),
  };

  await saveProject(updated);
  return json({ project: updated }, 200);
};

export const DELETE: APIRoute = async ({ cookies, params }) => {
  if (!await authed(cookies)) return json({ error: 'Unauthorized' }, 401);

  const { id } = params;
  if (!id) return json({ error: 'Missing id' }, 400);

  await deleteProject(id);
  return json({ ok: true }, 200);
};

async function authed(cookies: Parameters<APIRoute>[0]['cookies']): Promise<boolean> {
  const c = cookies.get('admin_session');
  return c ? verifySession(c.value) : false;
}

function json(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
