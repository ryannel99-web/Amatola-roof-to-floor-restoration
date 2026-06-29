import { c as createComponent } from './astro-component_D4RiP9oT.mjs';
import 'piccolore';
import { I as renderTemplate, u as maybeRenderHead } from './sequence_D_AgsSjh.mjs';
import { r as renderComponent } from './entrypoint_Tujrp4WD.mjs';
import { r as renderScript } from './global_CeWHuK6m.mjs';
import { $ as $$AdminLayout } from './AdminLayout_1G09y7Mc.mjs';
import { v as verifySession } from './auth_2nt-sm7F.mjs';

const prerender = false;
const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Login;
  const cookie = Astro2.cookies.get("admin_session");
  if (cookie && await verifySession(cookie.value)) {
    return Astro2.redirect("/admin");
  }
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Login" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-[calc(100vh-4rem)] flex items-center justify-center px-gutter py-16"> <div class="w-full max-w-md"> <!-- Card --> <div class="bg-white rounded-2xl shadow-lg border border-terracotta/10 p-10"> <div class="text-center mb-8"> <div class="w-16 h-16 bg-brick-red/10 rounded-2xl flex items-center justify-center mx-auto mb-4"> <span class="material-symbols-outlined text-3xl text-brick-red">lock</span> </div> <h1 class="font-headline-lg text-headline-lg text-on-surface">Portfolio Admin</h1> <p class="font-body-md text-body-md text-on-surface-variant mt-1">Enter your password to continue</p> </div> <!-- Form --> <form id="login-form" class="space-y-5"> <div> <label for="password" class="block font-label-md text-label-md text-on-surface mb-2">
Password
</label> <input type="password" id="password" name="password" autocomplete="current-password" required placeholder="Enter admin password" class="w-full px-4 py-4 text-body-lg font-body-lg border border-outline/30 rounded-xl bg-white focus:outline-none focus:border-brick-red transition-colors"> </div> <div id="login-error" class="hidden p-4 bg-error-container text-on-error-container rounded-xl text-body-md font-body-md flex items-center gap-2"> <span class="material-symbols-outlined text-base">error</span> <span id="login-error-text">Incorrect password. Please try again.</span> </div> <button type="submit" id="login-btn" class="w-full py-5 bg-brick-red text-on-primary rounded-xl font-headline-md text-headline-md hover:bg-brick-red/90 transition-all active:scale-[0.98] shadow-md hover:shadow-lg flex items-center justify-center gap-2"> <span class="material-symbols-outlined" id="login-icon">login</span> <span id="login-label">Log In</span> </button> </form> </div> <p class="text-center font-body-md text-body-md text-on-surface-variant mt-6"> <a href="/" class="hover:text-brick-red transition-colors">← Back to website</a> </p> </div> </div> ` })} ${renderScript($$result, "/Users/ryannel/Desktop/amatola-web/src/pages/admin/login.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/ryannel/Desktop/amatola-web/src/pages/admin/login.astro", void 0);

const $$file = "/Users/ryannel/Desktop/amatola-web/src/pages/admin/login.astro";
const $$url = "/admin/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
