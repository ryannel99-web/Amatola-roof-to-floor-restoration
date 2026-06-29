import type { APIRoute } from 'astro';
import { randomUUID } from 'node:crypto';
import { listProjects, saveProject } from '../../../lib/projects';
import { verifySession } from '../../../lib/auth';

export const prerender = false;

export const GET: APIRoute = async () => {
  try {
    const projects = await listProjects();
    return json({ projects }, 200);
  } catch (err) {
    console.error('GET /api/projects:', err);
    return json({ error: 'Failed to load projects' }, 500);
  }
};

export const POST: APIRoute = async ({ request, cookies }) => {
  if (!await authed(cookies)) return json({ error: 'Unauthorized' }, 401);

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid JSON' }, 400);
  }

  const { title, description, category, isBeforeAfter, images } = body as {
    title?: string;
    description?: string;
    category?: string;
    isBeforeAfter?: boolean;
    images?: unknown[];
  };

  if (!title?.trim()) return json({ error: 'title is required' }, 400);
  if (!category?.trim()) return json({ error: 'category is required' }, 400);
  if (!images?.length) return json({ error: 'at least one image is required' }, 400);

  const now = new Date().toISOString();
  const project = {
    id: randomUUID(),
    title: title.trim(),
    description: (description ?? '').trim(),
    category: category.trim(),
    isBeforeAfter: Boolean(isBeforeAfter),
    images: images as import('../../../lib/projects').ProjectImage[],
    createdAt: now,
    updatedAt: now,
  };

  await saveProject(project);
  return json({ project }, 201);
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
