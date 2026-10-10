import { useState, useRef, type FormEvent } from 'react';
import type { Project, ProjectImage } from '../../lib/projects';

const PRESET_CATEGORIES = ['Roofing', 'Waterproofing', 'Painting', 'Alterations', 'Floors'];

interface Props {
  project?: Project;
}

type UploadStatus = 'idle' | 'uploading' | 'done' | 'error';
type SaveStatus = 'idle' | 'saving' | 'success' | 'error';

export default function ProjectForm({ project }: Props) {
  // Generate a stable project ID for this form session
  const [projectId] = useState(() => project?.id ?? crypto.randomUUID());

  const [title, setTitle] = useState(project?.title ?? '');
  const [description, setDescription] = useState(project?.description ?? '');
  const [category, setCategory] = useState(() => {
    if (!project?.category) return '';
    return PRESET_CATEGORIES.includes(project.category) ? project.category : '__custom__';
  });
  const [customCategory, setCustomCategory] = useState(() => {
    if (!project?.category) return '';
    return PRESET_CATEGORIES.includes(project.category) ? '' : project.category;
  });
  const [isBeforeAfter, setIsBeforeAfter] = useState(project?.isBeforeAfter ?? false);
  const [images, setImages] = useState<ProjectImage[]>(project?.images ?? []);
  const [removedUrls, setRemovedUrls] = useState<string[]>([]);

  const [uploadStatus, setUploadStatus] = useState<UploadStatus>('idle');
  const [uploadingCount, setUploadingCount] = useState(0);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const [dragOver, setDragOver] = useState(false);
  const [dragOverAfter, setDragOverAfter] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileInputAfterRef = useRef<HTMLInputElement>(null);

  // ── Upload helpers ──────────────────────────────────────────────────────────

  async function uploadFile(file: File, role: 'before' | 'after' | 'photo'): Promise<ProjectImage | null> {
    const fd = new FormData();
    fd.append('file', file);
    fd.append('projectId', projectId);
    fd.append('role', role);

    const res = await fetch('/api/upload', { method: 'POST', body: fd });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error ?? 'Upload failed');

    return {
      url: data.url as string,
      alt: title.trim() || file.name.replace(/\.[^.]+$/, ''),
      isAfter: data.isAfter as boolean,
    };
  }

  async function handleFiles(files: FileList | File[], role: 'before' | 'after' | 'photo') {
    const valid = Array.from(files).filter(f => f.type.startsWith('image/'));
    if (!valid.length) return;

    setUploadStatus('uploading');
    setUploadingCount(valid.length);
    setErrorMsg('');

    const uploaded: ProjectImage[] = [];
    for (const file of valid) {
      try {
        const img = await uploadFile(file, role);
        if (img) {
          uploaded.push(img);
          setUploadingCount(prev => prev - 1);
        }
      } catch (err) {
        setErrorMsg(`Upload failed: ${err instanceof Error ? err.message : String(err)}`);
        setUploadingCount(prev => prev - 1);
      }
    }

    setImages(prev => {
      if (role === 'before') {
        // Replace existing before image
        return [...prev.filter(img => img.isAfter), ...uploaded];
      }
      if (role === 'after') {
        // Replace existing after image
        return [...prev.filter(img => !img.isAfter), ...uploaded];
      }
      return [...prev, ...uploaded];
    });
    setUploadStatus('done');
  }

  function removeImage(url: string) {
    setImages(prev => prev.filter(img => img.url !== url));
    if (url.startsWith('https://')) {
      setRemovedUrls(prev => [...prev, url]);
    }
  }

  // ── Submit ──────────────────────────────────────────────────────────────────

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg('');

    const finalCategory = category === '__custom__' ? customCategory.trim() : category;

    if (!title.trim()) { setErrorMsg('Please enter a project title.'); return; }
    if (!finalCategory) { setErrorMsg('Please select or enter a category.'); return; }
    if (images.length === 0) { setErrorMsg('Please upload at least one photo.'); return; }
    if (isBeforeAfter) {
      if (!images.some(img => !img.isAfter)) { setErrorMsg('Please upload a BEFORE photo.'); return; }
      if (!images.some(img => img.isAfter)) { setErrorMsg('Please upload an AFTER photo.'); return; }
    }

    setSaveStatus('saving');

    try {
      const payload = {
        title: title.trim(),
        description: description.trim(),
        category: finalCategory,
        isBeforeAfter,
        images: images.map(img => ({ ...img, alt: title.trim() || img.alt })),
        removedUrls,
      };

      const url = project ? `/api/projects/${project.id}` : '/api/projects';
      const method = project ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Save failed');

      setSaveStatus('success');
      setTimeout(() => { window.location.href = '/admin'; }, 1200);
    } catch (err) {
      setSaveStatus('error');
      setErrorMsg(err instanceof Error ? err.message : String(err));
    }
  }

  // ── Drop zone helpers ───────────────────────────────────────────────────────

  const dropZoneProps = (role: 'before' | 'after' | 'photo', isAfterZone = false) => ({
    onDragOver: (e: React.DragEvent) => {
      e.preventDefault();
      isAfterZone ? setDragOverAfter(true) : setDragOver(true);
    },
    onDragLeave: () => isAfterZone ? setDragOverAfter(false) : setDragOver(false),
    onDrop: (e: React.DragEvent) => {
      e.preventDefault();
      isAfterZone ? setDragOverAfter(false) : setDragOver(false);
      handleFiles(e.dataTransfer.files, role);
    },
    onClick: () => (isAfterZone ? fileInputAfterRef : fileInputRef).current?.click(),
  });

  const beforeImages = images.filter(img => !img.isAfter);
  const afterImages = images.filter(img => img.isAfter);
  const regularImages = images;

  const isUploading = uploadStatus === 'uploading' && uploadingCount > 0;
  const isSaving = saveStatus === 'saving';

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-8">

      {/* Title */}
      <div>
        <label className="block text-label-md font-label-md text-on-surface mb-2">
          Project Title <span className="text-brick-red">*</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="e.g. Heritage Estate Roof Restoration"
          className="w-full px-4 py-4 text-body-lg font-body-lg border border-outline/30 rounded-xl bg-white focus:outline-none focus:border-brick-red transition-colors"
        />
      </div>

      {/* Category */}
      <div>
        <label className="block text-label-md font-label-md text-on-surface mb-2">
          Category <span className="text-brick-red">*</span>
        </label>
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="w-full px-4 py-4 text-body-md font-body-md border border-outline/30 rounded-xl bg-white focus:outline-none focus:border-brick-red transition-colors appearance-none"
        >
          <option value="">— Select a category —</option>
          {PRESET_CATEGORIES.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
          <option value="__custom__">Other (type your own)</option>
        </select>
        {category === '__custom__' && (
          <input
            type="text"
            value={customCategory}
            onChange={e => setCustomCategory(e.target.value)}
            placeholder="Enter category name"
            className="mt-3 w-full px-4 py-3 text-body-md font-body-md border border-outline/30 rounded-xl bg-white focus:outline-none focus:border-brick-red transition-colors"
          />
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block text-label-md font-label-md text-on-surface mb-2">
          Description <span className="text-on-surface-variant font-normal">(optional)</span>
        </label>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={4}
          placeholder="Briefly describe the work done, materials used, or what makes this project special…"
          className="w-full px-4 py-4 text-body-md font-body-md border border-outline/30 rounded-xl bg-white focus:outline-none focus:border-brick-red transition-colors resize-none"
        />
      </div>

      {/* Before / After toggle */}
      <div className="flex items-center gap-4 p-5 bg-surface-container rounded-xl">
        <button
          type="button"
          role="switch"
          aria-checked={isBeforeAfter}
          onClick={() => {
            setIsBeforeAfter(prev => !prev);
            setImages([]);
          }}
          className={`relative w-14 h-8 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brick-red ${
            isBeforeAfter ? 'bg-brick-red' : 'bg-outline/30'
          }`}
        >
          <span
            className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow transition-transform ${
              isBeforeAfter ? 'translate-x-6' : 'translate-x-0'
            }`}
          />
        </button>
        <div>
          <p className="text-label-md font-label-md text-on-surface">Before / After project</p>
          <p className="text-body-md font-body-md text-on-surface-variant text-sm">
            Upload one photo from before and one from after the work was done
          </p>
        </div>
      </div>

      {/* ── Image upload ──────────────────────────────────────────────────────── */}

      {isBeforeAfter ? (
        <div className="grid sm:grid-cols-2 gap-6">
          {/* BEFORE zone */}
          <div>
            <p className="text-label-md font-label-md text-on-surface mb-3">
              BEFORE Photo <span className="text-brick-red">*</span>
            </p>
            <DropZone
              label="Drop BEFORE photo here"
              icon="hide_image"
              isDragOver={dragOver}
              {...dropZoneProps('before', false)}
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={e => e.target.files && handleFiles(e.target.files, 'before')}
            />
            <ThumbnailRow images={beforeImages} onRemove={removeImage} />
          </div>

          {/* AFTER zone */}
          <div>
            <p className="text-label-md font-label-md text-on-surface mb-3">
              AFTER Photo <span className="text-brick-red">*</span>
            </p>
            <DropZone
              label="Drop AFTER photo here"
              icon="add_photo_alternate"
              isDragOver={dragOverAfter}
              {...dropZoneProps('after', true)}
            />
            <input
              ref={fileInputAfterRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={e => e.target.files && handleFiles(e.target.files, 'after')}
            />
            <ThumbnailRow images={afterImages} onRemove={removeImage} />
          </div>
        </div>
      ) : (
        <div>
          <p className="text-label-md font-label-md text-on-surface mb-3">
            Project Photos <span className="text-brick-red">*</span>
          </p>
          <DropZone
            label={isUploading ? `Uploading ${uploadingCount} photo${uploadingCount !== 1 ? 's' : ''}…` : 'Drop photos here or click to browse'}
            icon={isUploading ? 'progress_activity' : 'add_photo_alternate'}
            isDragOver={dragOver}
            spinning={isUploading}
            {...dropZoneProps('photo', false)}
          />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={e => e.target.files && handleFiles(e.target.files, 'photo')}
          />
          <ThumbnailRow images={regularImages} onRemove={removeImage} />
        </div>
      )}

      {isUploading && isBeforeAfter && (
        <p className="text-body-md font-body-md text-terracotta flex items-center gap-2">
          <span className="material-symbols-outlined text-base animate-spin">progress_activity</span>
          Uploading…
        </p>
      )}

      {/* Error */}
      {errorMsg && (
        <div className="p-4 bg-error-container text-on-error-container rounded-xl text-body-md font-body-md flex items-start gap-3">
          <span className="material-symbols-outlined mt-0.5">error</span>
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Success */}
      {saveStatus === 'success' && (
        <div className="p-4 bg-green-50 text-green-800 rounded-xl text-body-md font-body-md flex items-center gap-3">
          <span className="material-symbols-outlined">check_circle</span>
          Project saved! Redirecting to dashboard…
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 pt-2">
        <button
          type="submit"
          disabled={isSaving || isUploading}
          className="flex-1 py-5 bg-brick-red text-on-primary rounded-xl text-headline-md font-headline-md hover:bg-brick-red/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl active:scale-[0.98]"
        >
          {isSaving ? (
            <>
              <span className="material-symbols-outlined animate-spin">progress_activity</span>
              Saving…
            </>
          ) : (
            <>
              <span className="material-symbols-outlined">save</span>
              {project ? 'Save Changes' : 'Publish Project'}
            </>
          )}
        </button>
        <a
          href="/admin"
          className="py-5 px-8 border border-outline/30 rounded-xl text-label-md font-label-md text-on-surface hover:border-brick-red hover:text-brick-red transition-all text-center"
        >
          Cancel
        </a>
      </div>
    </form>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function DropZone({
  label,
  icon,
  isDragOver,
  spinning = false,
  ...events
}: {
  label: string;
  icon: string;
  isDragOver: boolean;
  spinning?: boolean;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent) => void;
  onClick: () => void;
}) {
  return (
    <div
      {...events}
      className={`file-drop-zone rounded-xl p-10 text-center cursor-pointer select-none transition-colors ${
        isDragOver ? 'bg-surface-container border-brick-red' : 'bg-white'
      }`}
    >
      <span
        className={`material-symbols-outlined text-5xl text-terracotta mb-3 block ${spinning ? 'animate-spin' : ''}`}
      >
        {icon}
      </span>
      <p className="text-body-lg font-body-lg text-on-surface-variant">{label}</p>
      {!spinning && (
        <p className="text-body-md font-body-md text-outline mt-1">JPG, PNG, WEBP up to 20 MB</p>
      )}
    </div>
  );
}

function ThumbnailRow({
  images,
  onRemove,
}: {
  images: ProjectImage[];
  onRemove: (url: string) => void;
}) {
  if (!images.length) return null;

  return (
    <div className="flex flex-wrap gap-3 mt-4">
      {images.map(img => (
        <div key={img.url} className="relative w-24 h-24 rounded-lg overflow-hidden group border border-terracotta/10">
          <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={() => onRemove(img.url)}
            className="absolute inset-0 bg-deep-earth/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-on-primary"
            aria-label="Remove photo"
          >
            <span className="material-symbols-outlined">delete</span>
          </button>
          {img.isAfter !== undefined && (
            <span className="absolute bottom-0 left-0 right-0 text-center text-xs font-bold text-on-primary bg-deep-earth/70 py-0.5">
              {img.isAfter ? 'AFTER' : 'BEFORE'}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
