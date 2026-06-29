import { c as createComponent } from './astro-component_D4RiP9oT.mjs';
import 'piccolore';
import { I as renderTemplate, u as maybeRenderHead } from './sequence_D_AgsSjh.mjs';
import { r as renderComponent } from './entrypoint_Tujrp4WD.mjs';
import { $ as $$AdminLayout } from './AdminLayout_1G09y7Mc.mjs';
import { P as ProjectForm } from './ProjectForm_DR4Hb6D3.mjs';
import { g as getProject } from './projects_X2r_6wRq.mjs';

const prerender = false;
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  if (!id) return Astro2.redirect("/admin");
  let project = null;
  let loadError = "";
  try {
    project = await getProject(id);
  } catch (err) {
    loadError = "Could not load project. It may have been deleted.";
    console.error("Edit page getProject error:", err);
  }
  if (!project && !loadError) {
    return Astro2.redirect("/admin");
  }
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": project ? `Edit: ${project.title}` : "Edit Project" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-container-max mx-auto px-gutter py-10"> <!-- Back link + title --> <div class="mb-10"> <a href="/admin" class="inline-flex items-center gap-2 font-label-md text-label-md text-on-surface-variant hover:text-brick-red transition-colors mb-4"> <span class="material-symbols-outlined text-base">arrow_back</span>
Back to dashboard
</a> <h1 class="font-display-lg-mobile text-display-lg-mobile text-on-surface">Edit Project</h1> ${project && renderTemplate`<p class="font-body-md text-body-md text-on-surface-variant mt-2">
Editing: <strong>${project.title}</strong> </p>`} </div> ${loadError ? renderTemplate`<div class="p-6 bg-error-container text-on-error-container rounded-2xl text-body-md font-body-md flex items-center gap-3"> <span class="material-symbols-outlined">error</span> ${loadError} </div>` : renderTemplate`${renderComponent($$result2, "ProjectForm", ProjectForm, { "project": project, "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/ryannel/Desktop/amatola-web/src/components/admin/ProjectForm", "client:component-export": "default" })}`} </div> ` })}`;
}, "/Users/ryannel/Desktop/amatola-web/src/pages/admin/edit/[id].astro", void 0);

const $$file = "/Users/ryannel/Desktop/amatola-web/src/pages/admin/edit/[id].astro";
const $$url = "/admin/edit/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
