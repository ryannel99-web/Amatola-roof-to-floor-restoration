import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';

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

const DATA_DIR = path.resolve(process.env.DATA_DIR ?? './data', 'projects');
const UPLOADS_DIR = path.resolve(process.env.UPLOADS_DIR ?? './uploads');

async function ensureDataDir(): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
}

export async function listProjects(): Promise<Project[]> {
  await ensureDataDir();
  const files = (await readdir(DATA_DIR)).filter(f => f.endsWith('.json'));

  const results = await Promise.allSettled(
    files.map(async file => {
      const raw = await readFile(path.join(DATA_DIR, file), 'utf-8');
      return JSON.parse(raw) as Project;
    })
  );

  return results
    .filter((r): r is PromiseFulfilledResult<Project> => r.status === 'fulfilled')
    .map(r => r.value)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getProject(id: string): Promise<Project | null> {
  try {
    const raw = await readFile(path.join(DATA_DIR, `${id}.json`), 'utf-8');
    return JSON.parse(raw) as Project;
  } catch {
    return null;
  }
}

export async function saveProject(project: Project): Promise<void> {
  await ensureDataDir();
  await writeFile(path.join(DATA_DIR, `${project.id}.json`), JSON.stringify(project, null, 2), 'utf-8');
}

export async function deleteProject(id: string): Promise<void> {
  const project = await getProject(id);

  // Delete locally-stored images (those served from /uploads/)
  if (project) {
    const uploadUrls = project.images.map(img => img.url).filter(url => url.startsWith('/uploads/'));
    await deleteImageUrls(uploadUrls);
  }

  await rm(path.join(DATA_DIR, `${id}.json`), { force: true });
}

export async function deleteImageUrls(urls: string[]): Promise<void> {
  await Promise.allSettled(
    urls
      .filter(url => url.startsWith('/uploads/'))
      .map(url => rm(path.join(UPLOADS_DIR, url.slice('/uploads/'.length)), { force: true }))
  );
}
