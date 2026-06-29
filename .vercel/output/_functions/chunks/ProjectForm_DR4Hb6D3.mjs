import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState, useRef } from 'react';

const PRESET_CATEGORIES = ["Roofing", "Waterproofing", "Painting", "Alterations", "Floors"];
function ProjectForm({ project }) {
  const [projectId] = useState(() => project?.id ?? crypto.randomUUID());
  const [title, setTitle] = useState(project?.title ?? "");
  const [description, setDescription] = useState(project?.description ?? "");
  const [category, setCategory] = useState(() => {
    if (!project?.category) return "";
    return PRESET_CATEGORIES.includes(project.category) ? project.category : "__custom__";
  });
  const [customCategory, setCustomCategory] = useState(() => {
    if (!project?.category) return "";
    return PRESET_CATEGORIES.includes(project.category) ? "" : project.category;
  });
  const [isBeforeAfter, setIsBeforeAfter] = useState(project?.isBeforeAfter ?? false);
  const [images, setImages] = useState(project?.images ?? []);
  const [removedUrls, setRemovedUrls] = useState([]);
  const [uploadStatus, setUploadStatus] = useState("idle");
  const [uploadingCount, setUploadingCount] = useState(0);
  const [saveStatus, setSaveStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [dragOverAfter, setDragOverAfter] = useState(false);
  const fileInputRef = useRef(null);
  const fileInputAfterRef = useRef(null);
  async function uploadFile(file, role) {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("projectId", projectId);
    fd.append("role", role);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error ?? "Upload failed");
    return {
      url: data.url,
      alt: title.trim() || file.name.replace(/\.[^.]+$/, ""),
      isAfter: data.isAfter
    };
  }
  async function handleFiles(files, role) {
    const valid = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (!valid.length) return;
    setUploadStatus("uploading");
    setUploadingCount(valid.length);
    setErrorMsg("");
    const uploaded = [];
    for (const file of valid) {
      try {
        const img = await uploadFile(file, role);
        if (img) {
          uploaded.push(img);
          setUploadingCount((prev) => prev - 1);
        }
      } catch (err) {
        setErrorMsg(`Upload failed: ${err instanceof Error ? err.message : String(err)}`);
        setUploadingCount((prev) => prev - 1);
      }
    }
    setImages((prev) => {
      if (role === "before") {
        return [...prev.filter((img) => img.isAfter), ...uploaded];
      }
      if (role === "after") {
        return [...prev.filter((img) => !img.isAfter), ...uploaded];
      }
      return [...prev, ...uploaded];
    });
    setUploadStatus("done");
  }
  function removeImage(url) {
    setImages((prev) => prev.filter((img) => img.url !== url));
    if (url.startsWith("https://")) {
      setRemovedUrls((prev) => [...prev, url]);
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg("");
    const finalCategory = category === "__custom__" ? customCategory.trim() : category;
    if (!title.trim()) {
      setErrorMsg("Please enter a project title.");
      return;
    }
    if (!finalCategory) {
      setErrorMsg("Please select or enter a category.");
      return;
    }
    if (images.length === 0) {
      setErrorMsg("Please upload at least one photo.");
      return;
    }
    if (isBeforeAfter) {
      if (!images.some((img) => !img.isAfter)) {
        setErrorMsg("Please upload a BEFORE photo.");
        return;
      }
      if (!images.some((img) => img.isAfter)) {
        setErrorMsg("Please upload an AFTER photo.");
        return;
      }
    }
    setSaveStatus("saving");
    try {
      const payload = {
        title: title.trim(),
        description: description.trim(),
        category: finalCategory,
        isBeforeAfter,
        images: images.map((img) => ({ ...img, alt: title.trim() || img.alt })),
        removedUrls
      };
      const url = project ? `/api/projects/${project.id}` : "/api/projects";
      const method = project ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Save failed");
      setSaveStatus("success");
      setTimeout(() => {
        window.location.href = "/admin";
      }, 1200);
    } catch (err) {
      setSaveStatus("error");
      setErrorMsg(err instanceof Error ? err.message : String(err));
    }
  }
  const dropZoneProps = (role, isAfterZone = false) => ({
    onDragOver: (e) => {
      e.preventDefault();
      isAfterZone ? setDragOverAfter(true) : setDragOver(true);
    },
    onDragLeave: () => isAfterZone ? setDragOverAfter(false) : setDragOver(false),
    onDrop: (e) => {
      e.preventDefault();
      isAfterZone ? setDragOverAfter(false) : setDragOver(false);
      handleFiles(e.dataTransfer.files, role);
    },
    onClick: () => (isAfterZone ? fileInputAfterRef : fileInputRef).current?.click()
  });
  const beforeImages = images.filter((img) => !img.isAfter);
  const afterImages = images.filter((img) => img.isAfter);
  const regularImages = images;
  const isUploading = uploadStatus === "uploading" && uploadingCount > 0;
  const isSaving = saveStatus === "saving";
  return /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "max-w-2xl mx-auto space-y-8", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("label", { className: "block text-label-md font-label-md text-on-surface mb-2", children: [
        "Project Title ",
        /* @__PURE__ */ jsx("span", { className: "text-brick-red", children: "*" })
      ] }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          value: title,
          onChange: (e) => setTitle(e.target.value),
          placeholder: "e.g. Heritage Estate Roof Restoration",
          className: "w-full px-4 py-4 text-body-lg font-body-lg border border-outline/30 rounded-xl bg-white focus:outline-none focus:border-brick-red transition-colors"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("label", { className: "block text-label-md font-label-md text-on-surface mb-2", children: [
        "Category ",
        /* @__PURE__ */ jsx("span", { className: "text-brick-red", children: "*" })
      ] }),
      /* @__PURE__ */ jsxs(
        "select",
        {
          value: category,
          onChange: (e) => setCategory(e.target.value),
          className: "w-full px-4 py-4 text-body-md font-body-md border border-outline/30 rounded-xl bg-white focus:outline-none focus:border-brick-red transition-colors appearance-none",
          children: [
            /* @__PURE__ */ jsx("option", { value: "", children: "— Select a category —" }),
            PRESET_CATEGORIES.map((c) => /* @__PURE__ */ jsx("option", { value: c, children: c }, c)),
            /* @__PURE__ */ jsx("option", { value: "__custom__", children: "Other (type your own)" })
          ]
        }
      ),
      category === "__custom__" && /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          value: customCategory,
          onChange: (e) => setCustomCategory(e.target.value),
          placeholder: "Enter category name",
          className: "mt-3 w-full px-4 py-3 text-body-md font-body-md border border-outline/30 rounded-xl bg-white focus:outline-none focus:border-brick-red transition-colors"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("label", { className: "block text-label-md font-label-md text-on-surface mb-2", children: [
        "Description ",
        /* @__PURE__ */ jsx("span", { className: "text-on-surface-variant font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ jsx(
        "textarea",
        {
          value: description,
          onChange: (e) => setDescription(e.target.value),
          rows: 4,
          placeholder: "Briefly describe the work done, materials used, or what makes this project special…",
          className: "w-full px-4 py-4 text-body-md font-body-md border border-outline/30 rounded-xl bg-white focus:outline-none focus:border-brick-red transition-colors resize-none"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 p-5 bg-surface-container rounded-xl", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          role: "switch",
          "aria-checked": isBeforeAfter,
          onClick: () => {
            setIsBeforeAfter((prev) => !prev);
            setImages([]);
          },
          className: `relative w-14 h-8 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brick-red ${isBeforeAfter ? "bg-brick-red" : "bg-outline/30"}`,
          children: /* @__PURE__ */ jsx(
            "span",
            {
              className: `absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow transition-transform ${isBeforeAfter ? "translate-x-6" : "translate-x-0"}`
            }
          )
        }
      ),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-label-md font-label-md text-on-surface", children: "Before / After project" }),
        /* @__PURE__ */ jsx("p", { className: "text-body-md font-body-md text-on-surface-variant text-sm", children: "Upload one photo from before and one from after the work was done" })
      ] })
    ] }),
    isBeforeAfter ? /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("p", { className: "text-label-md font-label-md text-on-surface mb-3", children: [
          "BEFORE Photo ",
          /* @__PURE__ */ jsx("span", { className: "text-brick-red", children: "*" })
        ] }),
        /* @__PURE__ */ jsx(
          DropZone,
          {
            label: "Drop BEFORE photo here",
            icon: "hide_image",
            isDragOver: dragOver,
            ...dropZoneProps("before", false)
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            ref: fileInputRef,
            type: "file",
            accept: "image/*",
            className: "hidden",
            onChange: (e) => e.target.files && handleFiles(e.target.files, "before")
          }
        ),
        /* @__PURE__ */ jsx(ThumbnailRow, { images: beforeImages, onRemove: removeImage })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("p", { className: "text-label-md font-label-md text-on-surface mb-3", children: [
          "AFTER Photo ",
          /* @__PURE__ */ jsx("span", { className: "text-brick-red", children: "*" })
        ] }),
        /* @__PURE__ */ jsx(
          DropZone,
          {
            label: "Drop AFTER photo here",
            icon: "add_photo_alternate",
            isDragOver: dragOverAfter,
            ...dropZoneProps("after", true)
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            ref: fileInputAfterRef,
            type: "file",
            accept: "image/*",
            className: "hidden",
            onChange: (e) => e.target.files && handleFiles(e.target.files, "after")
          }
        ),
        /* @__PURE__ */ jsx(ThumbnailRow, { images: afterImages, onRemove: removeImage })
      ] })
    ] }) : /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("p", { className: "text-label-md font-label-md text-on-surface mb-3", children: [
        "Project Photos ",
        /* @__PURE__ */ jsx("span", { className: "text-brick-red", children: "*" })
      ] }),
      /* @__PURE__ */ jsx(
        DropZone,
        {
          label: isUploading ? `Uploading ${uploadingCount} photo${uploadingCount !== 1 ? "s" : ""}…` : "Drop photos here or click to browse",
          icon: isUploading ? "progress_activity" : "add_photo_alternate",
          isDragOver: dragOver,
          spinning: isUploading,
          ...dropZoneProps("photo", false)
        }
      ),
      /* @__PURE__ */ jsx(
        "input",
        {
          ref: fileInputRef,
          type: "file",
          accept: "image/*",
          multiple: true,
          className: "hidden",
          onChange: (e) => e.target.files && handleFiles(e.target.files, "photo")
        }
      ),
      /* @__PURE__ */ jsx(ThumbnailRow, { images: regularImages, onRemove: removeImage })
    ] }),
    isUploading && isBeforeAfter && /* @__PURE__ */ jsxs("p", { className: "text-body-md font-body-md text-terracotta flex items-center gap-2", children: [
      /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-base animate-spin", children: "progress_activity" }),
      "Uploading…"
    ] }),
    errorMsg && /* @__PURE__ */ jsxs("div", { className: "p-4 bg-error-container text-on-error-container rounded-xl text-body-md font-body-md flex items-start gap-3", children: [
      /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined mt-0.5", children: "error" }),
      /* @__PURE__ */ jsx("span", { children: errorMsg })
    ] }),
    saveStatus === "success" && /* @__PURE__ */ jsxs("div", { className: "p-4 bg-green-50 text-green-800 rounded-xl text-body-md font-body-md flex items-center gap-3", children: [
      /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined", children: "check_circle" }),
      "Project saved! Redirecting to dashboard…"
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 pt-2", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          disabled: isSaving || isUploading,
          className: "flex-1 py-5 bg-brick-red text-on-primary rounded-xl text-headline-md font-headline-md hover:bg-brick-red/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl active:scale-[0.98]",
          children: isSaving ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined animate-spin", children: "progress_activity" }),
            "Saving…"
          ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined", children: "save" }),
            project ? "Save Changes" : "Publish Project"
          ] })
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/admin",
          className: "py-5 px-8 border border-outline/30 rounded-xl text-label-md font-label-md text-on-surface hover:border-brick-red hover:text-brick-red transition-all text-center",
          children: "Cancel"
        }
      )
    ] })
  ] });
}
function DropZone({
  label,
  icon,
  isDragOver,
  spinning = false,
  ...events
}) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ...events,
      className: `file-drop-zone rounded-xl p-10 text-center cursor-pointer select-none transition-colors ${isDragOver ? "bg-surface-container border-brick-red" : "bg-white"}`,
      children: [
        /* @__PURE__ */ jsx(
          "span",
          {
            className: `material-symbols-outlined text-5xl text-terracotta mb-3 block ${spinning ? "animate-spin" : ""}`,
            children: icon
          }
        ),
        /* @__PURE__ */ jsx("p", { className: "text-body-lg font-body-lg text-on-surface-variant", children: label }),
        !spinning && /* @__PURE__ */ jsx("p", { className: "text-body-md font-body-md text-outline mt-1", children: "JPG, PNG, WEBP up to 20 MB" })
      ]
    }
  );
}
function ThumbnailRow({
  images,
  onRemove
}) {
  if (!images.length) return null;
  return /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-3 mt-4", children: images.map((img) => /* @__PURE__ */ jsxs("div", { className: "relative w-24 h-24 rounded-lg overflow-hidden group border border-terracotta/10", children: [
    /* @__PURE__ */ jsx("img", { src: img.url, alt: img.alt, className: "w-full h-full object-cover" }),
    /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        onClick: () => onRemove(img.url),
        className: "absolute inset-0 bg-deep-earth/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-on-primary",
        "aria-label": "Remove photo",
        children: /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined", children: "delete" })
      }
    ),
    img.isAfter !== void 0 && /* @__PURE__ */ jsx("span", { className: "absolute bottom-0 left-0 right-0 text-center text-xs font-bold text-on-primary bg-deep-earth/70 py-0.5", children: img.isAfter ? "AFTER" : "BEFORE" })
  ] }, img.url)) });
}

export { ProjectForm as P };
