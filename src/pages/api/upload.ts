import type { APIRoute } from 'astro';
import { put } from '@vercel/blob';
import sharp from 'sharp';
import { verifySession } from '../../lib/auth';

export const prerender = false;

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20 MB

export const POST: APIRoute = async ({ request, cookies }) => {
  const c = cookies.get('admin_session');
  if (!c || !(await verifySession(c.value))) return json({ error: 'Unauthorized' }, 401);

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return json({ error: 'Invalid form data' }, 400);
  }

  const file = formData.get('file') as File | null;
  const projectId = formData.get('projectId') as string | null;
  const role = (formData.get('role') as string | null) ?? 'photo'; // 'before' | 'after' | 'photo'

  if (!file) return json({ error: 'No file provided' }, 400);
  if (!projectId) return json({ error: 'No projectId provided' }, 400);
  if (!file.type.startsWith('image/')) return json({ error: 'File must be an image' }, 400);
  if (file.size > MAX_FILE_SIZE) return json({ error: 'File is too large (max 20 MB)' }, 400);

  const buffer = Buffer.from(await file.arrayBuffer());

  // Compress: auto-rotate EXIF, resize to max 1400px, re-encode as progressive JPEG quality 80
  const compressed = await sharp(buffer)
    .rotate()
    .resize(1400, 1400, { fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 80, progressive: true })
    .toBuffer();

  // Before/after images get deterministic filenames so re-uploads overwrite them;
  // regular photos get unique timestamp names.
  const suffix =
    role === 'before' || role === 'after'
      ? role
      : `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

  const blob = await put(`images/${projectId}/${suffix}.jpg`, compressed, {
    access: 'public',
    contentType: 'image/jpeg',
    addRandomSuffix: false,
  });

  return json({ url: blob.url, isAfter: role === 'after' }, 200);
};

function json(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
