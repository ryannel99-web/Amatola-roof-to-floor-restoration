import { list, put, del } from '@vercel/blob';

export interface ProjectImage {
  url: string;
  alt: string;
  isAfter: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  isBeforeAfter: boolean;
  images: ProjectImage[];
  createdAt: string;
  updatedAt: string;
}

export async function listProjects(): Promise<Project[]> {
  const { blobs } = await list({ prefix: 'projects/' });
  const jsonBlobs = blobs.filter(b => b.pathname.endsWith('.json'));

  const results = await Promise.allSettled(
    jsonBlobs.map(async blob => {
      const res = await fetch(blob.url, { cache: 'no-store' });
      if (!res.ok) throw new Error(`Failed to fetch ${blob.url}`);
      return res.json() as Promise<Project>;
    })
  );

  return results
    .filter((r): r is PromiseFulfilledResult<Project> => r.status === 'fulfilled')
    .map(r => r.value)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getProject(id: string): Promise<Project | null> {
  const { blobs } = await list({ prefix: `projects/${id}.json` });
  if (blobs.length === 0) return null;

  const res = await fetch(blobs[0].url, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json() as Promise<Project>;
}

export async function saveProject(project: Project): Promise<void> {
  await put(`projects/${project.id}.json`, JSON.stringify(project, null, 2), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
  });
}

export async function deleteProject(id: string): Promise<void> {
  const project = await getProject(id);

  // Delete blob-hosted images (those with https:// URLs)
  if (project) {
    const blobImageUrls = project.images
      .map(img => img.url)
      .filter(url => url.startsWith('https://'));
    if (blobImageUrls.length > 0) {
      await del(blobImageUrls);
    }
  }

  // Delete the project JSON
  const { blobs } = await list({ prefix: `projects/${id}.json` });
  if (blobs.length > 0) {
    await del(blobs.map(b => b.url));
  }
}

export async function deleteImageUrls(urls: string[]): Promise<void> {
  const blobUrls = urls.filter(url => url.startsWith('https://'));
  if (blobUrls.length > 0) {
    await del(blobUrls);
  }
}
