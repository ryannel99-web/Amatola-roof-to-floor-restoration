import { c as createComponent } from './astro-component_D4RiP9oT.mjs';
import 'piccolore';
import { I as renderTemplate, u as maybeRenderHead } from './sequence_D_AgsSjh.mjs';
import { r as renderComponent } from './entrypoint_Tujrp4WD.mjs';
import { $ as $$AdminLayout } from './AdminLayout_1G09y7Mc.mjs';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState } from 'react';
import { l as listProjects } from './projects_X2r_6wRq.mjs';

function ProjectList({ initialProjects }) {
  const [projects, setProjects] = useState(initialProjects);
  const [seeding, setSeeding] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [confirmId, setConfirmId] = useState(null);
  const [error, setError] = useState("");
  async function handleSeed() {
    setSeeding(true);
    setError("");
    try {
      const res = await fetch("/api/seed", { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Seed failed");
      window.location.reload();
    } catch (err) {
      setError(String(err));
      setSeeding(false);
    }
  }
  async function handleDelete(id) {
    setDeletingId(id);
    setError("");
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Delete failed");
      }
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      setError(String(err));
    } finally {
      setDeletingId(null);
      setConfirmId(null);
    }
  }
  if (projects.length === 0) {
    return /* @__PURE__ */ jsxs("div", { className: "text-center py-24 px-4", children: [
      /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-6xl text-terracotta mb-4 block", children: "photo_library" }),
      /* @__PURE__ */ jsx("h2", { className: "text-headline-md font-headline-md text-on-surface mb-3", children: "No projects yet" }),
      /* @__PURE__ */ jsx("p", { className: "text-body-md font-body-md text-on-surface-variant mb-8 max-w-md mx-auto", children: "Load the 6 sample projects from the existing site, or add your first real project now." }),
      error && /* @__PURE__ */ jsx("p", { className: "text-error text-body-md font-body-md mb-4", children: error }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-4", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleSeed,
            disabled: seeding,
            className: "px-8 py-4 bg-deep-earth text-on-primary rounded-xl text-label-md font-label-md hover:bg-deep-earth/80 transition-all disabled:opacity-50 flex items-center gap-2",
            children: seeding ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-base animate-spin", children: "progress_activity" }),
              "Loading samples…"
            ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-base", children: "download" }),
              "Load 6 Sample Projects"
            ] })
          }
        ),
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: "/admin/new",
            className: "px-8 py-4 bg-brick-red text-on-primary rounded-xl text-label-md font-label-md hover:bg-brick-red/90 transition-all flex items-center gap-2",
            children: [
              /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-base", children: "add_photo_alternate" }),
              "Add First Project"
            ]
          }
        )
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { children: [
    error && /* @__PURE__ */ jsx("div", { className: "mb-6 p-4 bg-error-container text-on-error-container rounded-xl text-body-md font-body-md", children: error }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: projects.map((project) => {
      const thumb = project.images.find((img) => !img.isAfter) ?? project.images[0];
      const isDeleting = deletingId === project.id;
      const isConfirming = confirmId === project.id;
      return /* @__PURE__ */ jsxs(
        "div",
        {
          className: "bg-white rounded-2xl border border-terracotta/10 overflow-hidden shadow-sm hover:shadow-md transition-shadow",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "aspect-video bg-surface-container overflow-hidden relative", children: [
              thumb ? /* @__PURE__ */ jsx(
                "img",
                {
                  src: thumb.url,
                  alt: thumb.alt,
                  className: "w-full h-full object-cover"
                }
              ) : /* @__PURE__ */ jsx("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-4xl text-outline", children: "image" }) }),
              project.isBeforeAfter && /* @__PURE__ */ jsx("span", { className: "absolute top-2 right-2 bg-brick-red text-on-primary text-xs px-2 py-0.5 rounded-full font-label-md", children: "Before / After" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "p-5", children: [
              /* @__PURE__ */ jsx("div", { className: "flex items-start justify-between gap-2 mb-1", children: /* @__PURE__ */ jsx("h3", { className: "text-headline-md font-headline-md text-on-surface leading-tight line-clamp-2 flex-1", children: project.title }) }),
              /* @__PURE__ */ jsx("span", { className: "inline-block text-label-md font-label-md text-terracotta bg-surface-container px-3 py-0.5 rounded-full mb-3", children: project.category }),
              project.description && /* @__PURE__ */ jsx("p", { className: "text-body-md font-body-md text-on-surface-variant line-clamp-2 mb-4", children: project.description }),
              isConfirming ? /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx("p", { className: "text-body-md font-body-md text-on-surface text-sm font-semibold", children: "Delete this project?" }),
                /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => handleDelete(project.id),
                      disabled: isDeleting,
                      className: "flex-1 py-2 bg-error text-on-error rounded-lg text-label-md font-label-md hover:bg-error/90 transition-all disabled:opacity-50 flex items-center justify-center gap-1",
                      children: isDeleting ? /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-sm animate-spin", children: "progress_activity" }) : "Yes, delete"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => setConfirmId(null),
                      className: "flex-1 py-2 border border-outline/30 rounded-lg text-label-md font-label-md hover:bg-surface-container transition-all",
                      children: "Cancel"
                    }
                  )
                ] })
              ] }) : /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxs(
                  "a",
                  {
                    href: `/admin/edit/${project.id}`,
                    className: "flex-1 py-2 border border-terracotta/20 rounded-lg text-label-md font-label-md text-on-surface hover:border-brick-red hover:text-brick-red transition-all text-center flex items-center justify-center gap-1",
                    children: [
                      /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-sm", children: "edit" }),
                      "Edit"
                    ]
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => setConfirmId(project.id),
                    className: "py-2 px-3 border border-terracotta/20 rounded-lg text-label-md font-label-md text-on-surface hover:border-error hover:text-error transition-all flex items-center justify-center gap-1",
                    children: /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-sm", children: "delete" })
                  }
                )
              ] })
            ] })
          ]
        },
        project.id
      );
    }) })
  ] });
}

const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  let projects = [];
  let loadError = "";
  try {
    projects = await listProjects();
  } catch (err) {
    loadError = "Could not load projects. Check that BLOB_READ_WRITE_TOKEN is set in your environment.";
    console.error("Admin index listProjects error:", err);
  }
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Dashboard" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-container-max mx-auto px-gutter py-10"> <!-- Header row --> <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10"> <div> <h1 class="font-display-lg-mobile text-display-lg-mobile text-on-surface">Portfolio</h1> <p class="font-body-md text-body-md text-on-surface-variant mt-1"> ${projects.length === 0 ? "No projects yet" : `${projects.length} project${projects.length !== 1 ? "s" : ""}`} </p> </div> ${projects.length > 0 && renderTemplate`<a href="/admin/new" class="inline-flex items-center gap-2 px-8 py-4 bg-brick-red text-on-primary rounded-xl font-headline-md text-headline-md hover:bg-brick-red/90 transition-all shadow-md hover:shadow-lg active:scale-[0.98]"> <span class="material-symbols-outlined">add_photo_alternate</span>
Add New Project
</a>`} </div> ${loadError ? renderTemplate`<div class="p-6 bg-error-container text-on-error-container rounded-2xl text-body-md font-body-md flex items-start gap-3"> <span class="material-symbols-outlined mt-0.5">error</span> <div> <p class="font-semibold mb-1">Configuration error</p> <p>${loadError}</p> </div> </div>` : renderTemplate`${renderComponent($$result2, "ProjectList", ProjectList, { "initialProjects": projects, "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/ryannel/Desktop/amatola-web/src/components/admin/ProjectList", "client:component-export": "default" })}`} </div> ` })}`;
}, "/Users/ryannel/Desktop/amatola-web/src/pages/admin/index.astro", void 0);

const $$file = "/Users/ryannel/Desktop/amatola-web/src/pages/admin/index.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
