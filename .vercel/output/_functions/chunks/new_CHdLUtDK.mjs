import { c as createComponent } from './astro-component_D4RiP9oT.mjs';
import 'piccolore';
import { I as renderTemplate, u as maybeRenderHead } from './sequence_D_AgsSjh.mjs';
import { r as renderComponent } from './entrypoint_Tujrp4WD.mjs';
import { $ as $$AdminLayout } from './AdminLayout_1G09y7Mc.mjs';
import { P as ProjectForm } from './ProjectForm_DR4Hb6D3.mjs';

const prerender = false;
const $$New = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "New Project" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-container-max mx-auto px-gutter py-10"> <!-- Back link + title --> <div class="mb-10"> <a href="/admin" class="inline-flex items-center gap-2 font-label-md text-label-md text-on-surface-variant hover:text-brick-red transition-colors mb-4"> <span class="material-symbols-outlined text-base">arrow_back</span>
Back to dashboard
</a> <h1 class="font-display-lg-mobile text-display-lg-mobile text-on-surface">Add New Project</h1> <p class="font-body-md text-body-md text-on-surface-variant mt-2">
Fill in the details and upload your photos. Everything saves to the live site automatically.
</p> </div> ${renderComponent($$result2, "ProjectForm", ProjectForm, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/ryannel/Desktop/amatola-web/src/components/admin/ProjectForm", "client:component-export": "default" })} </div> ` })}`;
}, "/Users/ryannel/Desktop/amatola-web/src/pages/admin/new.astro", void 0);

const $$file = "/Users/ryannel/Desktop/amatola-web/src/pages/admin/new.astro";
const $$url = "/admin/new";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$New,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
