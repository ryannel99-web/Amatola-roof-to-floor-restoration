import { del, list, put } from '@vercel/blob';

async function listProjects() {
  const { blobs } = await list({ prefix: "projects/" });
  const jsonBlobs = blobs.filter((b) => b.pathname.endsWith(".json"));
  const results = await Promise.allSettled(
    jsonBlobs.map(async (blob) => {
      const res = await fetch(blob.url, { cache: "no-store" });
      if (!res.ok) throw new Error(`Failed to fetch ${blob.url}`);
      return res.json();
    })
  );
  return results.filter((r) => r.status === "fulfilled").map((r) => r.value).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}
async function getProject(id) {
  const { blobs } = await list({ prefix: `projects/${id}.json` });
  if (blobs.length === 0) return null;
  const res = await fetch(blobs[0].url, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}
async function saveProject(project) {
  await put(`projects/${project.id}.json`, JSON.stringify(project, null, 2), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false
  });
}
async function deleteProject(id) {
  const project = await getProject(id);
  if (project) {
    const blobImageUrls = project.images.map((img) => img.url).filter((url) => url.startsWith("https://"));
    if (blobImageUrls.length > 0) {
      await del(blobImageUrls);
    }
  }
  const { blobs } = await list({ prefix: `projects/${id}.json` });
  if (blobs.length > 0) {
    await del(blobs.map((b) => b.url));
  }
}
async function deleteImageUrls(urls) {
  const blobUrls = urls.filter((url) => url.startsWith("https://"));
  if (blobUrls.length > 0) {
    await del(blobUrls);
  }
}

export { deleteImageUrls as a, deleteProject as d, getProject as g, listProjects as l, saveProject as s };
