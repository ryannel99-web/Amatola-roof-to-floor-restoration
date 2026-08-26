import type { APIRoute } from 'astro';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';

export const prerender = false;

const UPLOADS_DIR = path.resolve(process.env.UPLOADS_DIR ?? './uploads');

export const GET: APIRoute = async ({ params }) => {
  const requested = params.path ?? '';
  const filePath = path.join(UPLOADS_DIR, requested);

  // Guard against path traversal escaping the uploads directory.
  if (!filePath.startsWith(UPLOADS_DIR + path.sep)) {
    return new Response('Not found', { status: 404 });
  }

  try {
    await stat(filePath);
    const data = await readFile(filePath);
    return new Response(data, {
      status: 200,
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch {
    return new Response('Not found', { status: 404 });
  }
};
