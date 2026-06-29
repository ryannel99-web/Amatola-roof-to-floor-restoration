import type { APIRoute } from 'astro';
import { randomUUID } from 'node:crypto';
import { listProjects, saveProject } from '../../lib/projects';
import { verifySession } from '../../lib/auth';

export const prerender = false;

// These mirror the 6 hardcoded gallery items — images live in /public/images/
// and are served from Vercel's CDN as part of the static build.
const SEED_PROJECTS = [
  {
    title: 'Modern Tile Restoration',
    description: 'Full strip and re-tile of a 15-year-old concrete roof. UV-resistant sealant applied for extended life and long-term weather protection.',
    category: 'Roofing',
    image: { url: '/images/service-roofing.jpg', alt: 'Modern tile restoration' },
  },
  {
    title: 'Exterior Facade Refresh',
    description: 'Complete exterior repaint including surface preparation, crack filling, and two coats of premium weatherproof paint.',
    category: 'Painting',
    image: { url: '/images/service-painting.jpg', alt: 'Exterior facade refresh' },
  },
  {
    title: 'Hardwood Floor Rejuvenation',
    description: 'Sanded, stained and sealed solid hardwood floors in a heritage home — bringing them back to showroom condition.',
    category: 'Floors',
    image: { url: '/images/gallery-floor.jpg', alt: 'Hardwood floor restoration' },
  },
  {
    title: 'Precision Interior Paint',
    description: 'Full interior repaint with premium low-VOC paints across 6 rooms, including ceilings and detailed trim work.',
    category: 'Painting',
    image: { url: '/images/gallery-interior.jpg', alt: 'Precision interior paint' },
  },
  {
    title: 'Structural Home Expansion',
    description: 'New master bedroom and en-suite addition with matching external finishes and full electrical integration.',
    category: 'Alterations',
    image: { url: '/images/gallery-modern-home.jpg', alt: 'Structural home expansion' },
  },
  {
    title: 'Seamless Waterproofing',
    description: 'Flat roof waterproofing membrane application with parapet wall treatment and updated drainage channels.',
    category: 'Waterproofing',
    image: { url: '/images/gallery-waterproofing.jpg', alt: 'Seamless waterproofing' },
  },
] as const;

export const POST: APIRoute = async ({ cookies }) => {
  const c = cookies.get('admin_session');
  if (!c || !(await verifySession(c.value))) return json({ error: 'Unauthorized' }, 401);

  const existing = await listProjects();
  if (existing.length > 0) {
    return json(
      { error: 'Projects already exist — delete all projects first to re-seed.', count: existing.length },
      409
    );
  }

  const now = new Date().toISOString();

  for (const item of SEED_PROJECTS) {
    await saveProject({
      id: randomUUID(),
      title: item.title,
      description: item.description,
      category: item.category,
      isBeforeAfter: false,
      images: [{ url: item.image.url, alt: item.image.alt, isAfter: false }],
      createdAt: now,
      updatedAt: now,
    });
  }

  return json({ created: SEED_PROJECTS.length }, 201);
};

function json(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
