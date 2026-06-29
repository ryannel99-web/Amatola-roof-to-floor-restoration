import { useState } from 'react';
import type { Project } from '../../lib/projects';

interface Props {
  initialProjects: Project[];
}

export default function ProjectList({ initialProjects }: Props) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [seeding, setSeeding] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [error, setError] = useState('');

  async function handleSeed() {
    setSeeding(true);
    setError('');
    try {
      const res = await fetch('/api/seed', { method: 'POST' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Seed failed');
      window.location.reload();
    } catch (err) {
      setError(String(err));
      setSeeding(false);
    }
  }

  async function handleDelete(id: string) {
    setDeletingId(id);
    setError('');
    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? 'Delete failed');
      }
      setProjects(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      setError(String(err));
    } finally {
      setDeletingId(null);
      setConfirmId(null);
    }
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-24 px-4">
        <span className="material-symbols-outlined text-6xl text-terracotta mb-4 block">photo_library</span>
        <h2 className="text-headline-md font-headline-md text-on-surface mb-3">No projects yet</h2>
        <p className="text-body-md font-body-md text-on-surface-variant mb-8 max-w-md mx-auto">
          Load the 6 sample projects from the existing site, or add your first real project now.
        </p>
        {error && (
          <p className="text-error text-body-md font-body-md mb-4">{error}</p>
        )}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleSeed}
            disabled={seeding}
            className="px-8 py-4 bg-deep-earth text-on-primary rounded-xl text-label-md font-label-md hover:bg-deep-earth/80 transition-all disabled:opacity-50 flex items-center gap-2"
          >
            {seeding ? (
              <>
                <span className="material-symbols-outlined text-base animate-spin">progress_activity</span>
                Loading samples…
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-base">download</span>
                Load 6 Sample Projects
              </>
            )}
          </button>
          <a
            href="/admin/new"
            className="px-8 py-4 bg-brick-red text-on-primary rounded-xl text-label-md font-label-md hover:bg-brick-red/90 transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-base">add_photo_alternate</span>
            Add First Project
          </a>
        </div>
      </div>
    );
  }

  return (
    <div>
      {error && (
        <div className="mb-6 p-4 bg-error-container text-on-error-container rounded-xl text-body-md font-body-md">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => {
          const thumb = project.images.find(img => !img.isAfter) ?? project.images[0];
          const isDeleting = deletingId === project.id;
          const isConfirming = confirmId === project.id;

          return (
            <div
              key={project.id}
              className="bg-white rounded-2xl border border-terracotta/10 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Thumbnail */}
              <div className="aspect-video bg-surface-container overflow-hidden relative">
                {thumb ? (
                  <img
                    src={thumb.url}
                    alt={thumb.alt}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-4xl text-outline">image</span>
                  </div>
                )}
                {project.isBeforeAfter && (
                  <span className="absolute top-2 right-2 bg-brick-red text-on-primary text-xs px-2 py-0.5 rounded-full font-label-md">
                    Before / After
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="text-headline-md font-headline-md text-on-surface leading-tight line-clamp-2 flex-1">
                    {project.title}
                  </h3>
                </div>
                <span className="inline-block text-label-md font-label-md text-terracotta bg-surface-container px-3 py-0.5 rounded-full mb-3">
                  {project.category}
                </span>
                {project.description && (
                  <p className="text-body-md font-body-md text-on-surface-variant line-clamp-2 mb-4">
                    {project.description}
                  </p>
                )}

                {/* Actions */}
                {isConfirming ? (
                  <div className="space-y-2">
                    <p className="text-body-md font-body-md text-on-surface text-sm font-semibold">
                      Delete this project?
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDelete(project.id)}
                        disabled={isDeleting}
                        className="flex-1 py-2 bg-error text-on-error rounded-lg text-label-md font-label-md hover:bg-error/90 transition-all disabled:opacity-50 flex items-center justify-center gap-1"
                      >
                        {isDeleting ? (
                          <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
                        ) : (
                          'Yes, delete'
                        )}
                      </button>
                      <button
                        onClick={() => setConfirmId(null)}
                        className="flex-1 py-2 border border-outline/30 rounded-lg text-label-md font-label-md hover:bg-surface-container transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <a
                      href={`/admin/edit/${project.id}`}
                      className="flex-1 py-2 border border-terracotta/20 rounded-lg text-label-md font-label-md text-on-surface hover:border-brick-red hover:text-brick-red transition-all text-center flex items-center justify-center gap-1"
                    >
                      <span className="material-symbols-outlined text-sm">edit</span>
                      Edit
                    </a>
                    <button
                      onClick={() => setConfirmId(project.id)}
                      className="py-2 px-3 border border-terracotta/20 rounded-lg text-label-md font-label-md text-on-surface hover:border-error hover:text-error transition-all flex items-center justify-center gap-1"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
