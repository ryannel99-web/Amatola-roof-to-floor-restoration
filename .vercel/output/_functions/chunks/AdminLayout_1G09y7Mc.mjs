import { c as createComponent } from './astro-component_D4RiP9oT.mjs';
import 'piccolore';
import { bh as renderHead, bi as renderSlot, I as renderTemplate } from './sequence_D_AgsSjh.mjs';
import 'clsx';
import { r as renderScript } from './global_CeWHuK6m.mjs';

const $$AdminLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$AdminLayout;
  const { title = "Admin" } = Astro2.props;
  return renderTemplate`<html lang="en" class="scroll-smooth"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="icon" type="image/x-icon" href="/favicon.ico"><title>${title} — Portfolio Admin</title><link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;600;700;800&family=Source+Sans+3:wght@400;600&display=swap" rel="stylesheet"><link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet">${renderHead()}</head> <body class="bg-background text-on-background font-body-md antialiased min-h-screen flex flex-col"> <!-- Admin top bar --> <header class="bg-deep-earth text-on-primary sticky top-0 z-50 shadow-lg"> <div class="max-w-container-max mx-auto px-gutter h-16 flex items-center justify-between gap-4"> <div class="flex items-center gap-3"> <a href="/" class="flex items-center gap-3 hover:opacity-80 transition-opacity"> <img src="/logo.svg" alt="Amatola" class="h-7" onerror="this.style.display='none'"> <span class="font-headline-md text-headline-md">Amatola</span> </a> <span class="text-label-md font-label-md bg-brick-red px-2.5 py-0.5 rounded-md tracking-wide">
ADMIN
</span> </div> <nav class="flex items-center gap-2"> <a href="/admin" class="hidden sm:flex items-center gap-1.5 font-label-md text-label-md px-4 py-2 rounded-lg hover:bg-white/10 transition-colors"> <span class="material-symbols-outlined text-base">grid_view</span>
Dashboard
</a> <a href="/admin/new" class="hidden sm:flex items-center gap-1.5 font-label-md text-label-md px-4 py-2 rounded-lg hover:bg-white/10 transition-colors"> <span class="material-symbols-outlined text-base">add_photo_alternate</span>
New Project
</a> <button id="logout-btn" class="flex items-center gap-1.5 font-label-md text-label-md px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"> <span class="material-symbols-outlined text-base">logout</span> <span class="hidden sm:inline">Logout</span> </button> </nav> </div> </header> <main class="flex-1"> ${renderSlot($$result, $$slots["default"])} </main> ${renderScript($$result, "/Users/ryannel/Desktop/amatola-web/src/layouts/AdminLayout.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "/Users/ryannel/Desktop/amatola-web/src/layouts/AdminLayout.astro", void 0);

export { $$AdminLayout as $ };
