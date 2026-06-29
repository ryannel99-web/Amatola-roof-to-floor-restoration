import { c as createComponent } from './astro-component_D4RiP9oT.mjs';
import 'piccolore';
import { u as maybeRenderHead, _ as addAttribute, I as renderTemplate, bh as renderHead, bi as renderSlot } from './sequence_D_AgsSjh.mjs';
import { r as renderComponent } from './entrypoint_Tujrp4WD.mjs';
import { r as renderScript } from './global_CeWHuK6m.mjs';
import 'clsx';
import { l as listProjects } from './projects_X2r_6wRq.mjs';

const $$Navbar = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Navbar;
  const { activePage = "home" } = Astro2.props;
  const links = [
    { label: "Home", href: "/", key: "home" },
    { label: "Services", href: "/services", key: "services" },
    { label: "About", href: "/about", key: "about" },
    { label: "Gallery", href: "/gallery", key: "gallery" },
    { label: "Contact", href: "/contact", key: "contact" }
  ];
  return renderTemplate`${maybeRenderHead()}<nav class="bg-deep-earth sticky top-0 z-50 shadow-sm"> <div class="max-w-container-max mx-auto flex justify-between items-center px-gutter py-4"> <!-- Logo --> <a href="/" class="flex items-center"> <img src="/logo.svg" alt="Amatola Roof & Floor Restorers" class="h-12 w-auto"> </a> <!-- Desktop nav links --> <div class="hidden md:flex items-center gap-8"> ${links.map((link) => renderTemplate`<a${addAttribute(link.href, "href")}${addAttribute(
    activePage === link.key ? "text-brick-red border-b-2 border-brick-red pb-1 font-label-md text-label-md transition-colors duration-200" : "text-on-primary font-label-md text-label-md hover:text-brick-red transition-colors duration-200",
    "class"
  )}> ${link.label} </a>`)} </div> <!-- CTA buttons --> <div class="flex items-center gap-3"> <a href="https://wa.me/27827842112" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp us" class="flex items-center gap-2 bg-[#25D366] text-white px-4 py-2.5 rounded-lg font-label-md text-label-md hover:bg-[#1ebe5d] transition-all active:scale-95 duration-150"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 shrink-0"> <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"></path> <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.862L.057 23.428a.75.75 0 00.914.914l5.604-1.47A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.705 9.705 0 01-4.93-1.344l-.354-.21-3.664.961.977-3.572-.23-.368A9.713 9.713 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"></path> </svg> <span class="hidden lg:inline">WhatsApp</span> </a> <a href="/quote" class="bg-brick-red text-on-primary px-6 py-2.5 rounded-lg font-label-md text-label-md hover:bg-terracotta transition-all active:scale-95 duration-150">
Get a Free Quote
</a> </div> </div> </nav>`;
}, "/Users/ryannel/Desktop/amatola-web/src/components/Navbar.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<footer class="bg-deep-earth text-on-primary pt-section-gap pb-8"> <div class="max-w-container-max mx-auto px-gutter"> <div class="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16"> <!-- Branding --> <div class="space-y-4"> <a href="/"> <img src="/logo.svg" alt="Amatola Roof & Floor Restorers" class="h-16 w-auto"> </a> <p class="opacity-70 font-body-md text-body-md max-w-xs">
Premium residential restoration services across East London.
          Quality craftsmanship for every home.
</p> </div> <!-- Navigation --> <div class="flex flex-col gap-3"> <h5 class="font-label-md text-label-md text-sand-stone uppercase tracking-widest mb-2">
Navigation
</h5> <a href="/services" class="opacity-80 hover:text-brick-red transition-opacity font-label-md text-label-md">Services</a> <a href="/gallery" class="opacity-80 hover:text-brick-red transition-opacity font-label-md text-label-md">Gallery</a> <a href="/about" class="opacity-80 hover:text-brick-red transition-opacity font-label-md text-label-md">About Us</a> <a href="/contact" class="opacity-80 hover:text-brick-red transition-opacity font-label-md text-label-md">Contact</a> <a href="#" class="opacity-80 hover:text-brick-red transition-opacity font-label-md text-label-md">Privacy Policy</a> <a href="#" class="opacity-80 hover:text-brick-red transition-opacity font-label-md text-label-md">Terms of Service</a> </div> <!-- Location & Hours --> <div class="space-y-4"> <h5 class="font-label-md text-label-md text-sand-stone uppercase tracking-widest mb-2">Location</h5> <div class="flex items-start gap-3 opacity-80"> <span class="material-symbols-outlined text-xl">location_on</span> <p class="font-body-md text-body-md">East London, Eastern Cape,<br>South Africa</p> </div> <div class="flex items-center gap-3 opacity-80"> <span class="material-symbols-outlined text-xl">schedule</span> <p class="font-body-md text-body-md">Mon – Fri: 08:00 – 17:00</p> </div> <div class="flex items-center gap-3 opacity-80"> <span class="material-symbols-outlined text-xl">phone_in_talk</span> <p class="font-body-md text-body-md">082 784 2112 | 043 740 0760</p> </div> <div class="flex items-center gap-3 opacity-80"> <span class="material-symbols-outlined text-xl">mail</span> <p class="font-body-md text-body-md">derek@arfr.co.za</p> </div> </div> </div> <!-- Bottom bar --> <div class="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-center"> <p class="font-label-md text-label-md opacity-60">
© 2024 Amatola Roof &amp; Floor Restorers. All rights reserved.
</p> <div class="flex gap-6 opacity-60 font-label-md text-label-md"> <a href="#" class="hover:text-brick-red transition-colors">Facebook</a> <a href="#" class="hover:text-brick-red transition-colors">WhatsApp</a> </div> </div> </div> </footer>`;
}, "/Users/ryannel/Desktop/amatola-web/src/components/Footer.astro", void 0);

const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Layout;
  const { title, activePage = "home" } = Astro2.props;
  return renderTemplate`<html lang="en" class="scroll-smooth"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="icon" type="image/x-icon" href="/favicon.ico"><title>${title}</title><link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;600;700;800&family=Source+Sans+3:wght@400;600&display=swap" rel="stylesheet"><link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet">${renderHead()}</head> <body class="bg-background text-on-background font-body-md antialiased"> ${renderComponent($$result, "Navbar", $$Navbar, { "activePage": activePage })} ${renderSlot($$result, $$slots["default"])} ${renderComponent($$result, "Footer", $$Footer, {})} <!-- ── Floating WhatsApp button ── --> <a href="https://wa.me/27827842112" target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp" class="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] text-white pl-4 pr-5 py-3 rounded-full shadow-lg hover:bg-[#1ebe5d] hover:scale-105 active:scale-95 transition-all duration-200 group"> <!-- WhatsApp SVG icon --> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 shrink-0"> <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"></path> <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.862L.057 23.428a.75.75 0 00.914.914l5.604-1.47A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.705 9.705 0 01-4.93-1.344l-.354-.21-3.664.961.977-3.572-.23-.368A9.713 9.713 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"></path> </svg> <span class="font-label-md text-label-md">Chat with us</span> </a> </body></html>`;
}, "/Users/ryannel/Desktop/amatola-web/src/layouts/Layout.astro", void 0);

const prerender = false;
const $$Gallery = createComponent(async ($$result, $$props, $$slots) => {
  let projects = [];
  let loadError = "";
  try {
    projects = await listProjects();
  } catch (err) {
    console.error("Gallery listProjects error:", err);
    loadError = "Could not load projects at this time.";
  }
  const categories = ["All", ...new Set(projects.map((p) => p.category))];
  const baProject = projects.find((p) => p.isBeforeAfter);
  const beforeImg = baProject?.images.find((img) => !img.isAfter)?.url ?? "/images/gallery-before.jpg";
  const afterImg = baProject?.images.find((img) => img.isAfter)?.url ?? "/images/gallery-after.jpg";
  const baTitle = baProject?.title ?? "The Heritage Estate";
  const baDescription = baProject?.description ?? "From weather-worn to like new — precision restoration from start to finish.";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Project Gallery | AMATOLA Roof & Floor Restorers", "activePage": "gallery" }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="bg-deep-earth py-section-gap-mobile md:py-section-gap relative overflow-hidden"> <div class="absolute inset-0 opacity-10"> <div class="absolute inset-0 bg-gradient-to-tr from-brick-red to-transparent"></div> </div> <div class="max-w-container-max mx-auto px-gutter relative z-10 text-center"> <h1 class="font-display-lg text-display-lg-mobile md:text-display-lg text-on-primary mb-4">
Our Work
</h1> <p class="font-body-lg text-body-lg text-warm-cream opacity-90 max-w-2xl mx-auto">
Real homes. Real results. Explore our portfolio of professional restorations across South Africa.
</p> </div> </section>  ${projects.length > 0 && renderTemplate`<div class="bg-warm-cream sticky top-[72px] z-40 shadow-sm"> <div class="max-w-container-max mx-auto px-gutter py-4 overflow-x-auto"> <div class="flex items-center justify-start md:justify-center gap-2 min-w-max"> ${categories.map((f, i) => renderTemplate`<button${addAttribute(f, "data-filter")}${addAttribute(`filter-btn px-6 py-2 rounded-full font-label-md text-label-md transition-all ${i === 0 ? "bg-brick-red text-on-primary shadow-sm" : "bg-white text-on-surface border border-terracotta/20 hover:border-brick-red"}`, "class")}> ${f} </button>`)} </div> </div> </div>`} <section class="py-section-gap-mobile md:py-section-gap"> <div class="max-w-container-max mx-auto px-gutter"> ${loadError ? renderTemplate`<div class="text-center py-16"> <span class="material-symbols-outlined text-5xl text-outline mb-4 block">cloud_off</span> <p class="font-body-lg text-body-lg text-on-surface-variant">${loadError}</p> </div>` : projects.length === 0 ? renderTemplate`<div class="text-center py-16"> <span class="material-symbols-outlined text-5xl text-outline mb-4 block">photo_library</span> <p class="font-body-lg text-body-lg text-on-surface-variant">
No projects yet — check back soon.
</p> </div>` : renderTemplate`<div class="masonry-grid" id="gallery-grid"> ${projects.map((project) => {
    const thumb = project.images.find((img) => !img.isAfter) ?? project.images[0];
    if (!thumb) return null;
    return renderTemplate`<div class="masonry-item gallery-item group relative overflow-hidden rounded-xl border border-terracotta/10 cursor-pointer"${addAttribute(project.category, "data-category")}> <img${addAttribute(thumb.url, "src")}${addAttribute(thumb.alt, "alt")} class="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy"> <div class="absolute inset-0 bg-deep-earth/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-on-primary p-6"> <span class="font-label-md text-label-md mb-2 uppercase tracking-widest text-brick-red"> ${project.category} </span> ${project.isBeforeAfter && renderTemplate`<span class="font-label-md text-label-md mb-2 bg-brick-red px-3 py-0.5 rounded-full">
Before / After
</span>`} <h3 class="font-headline-md text-headline-md mb-4 text-center">${project.title}</h3> ${project.description && renderTemplate`<p class="font-body-md text-body-md text-center opacity-80 line-clamp-2"> ${project.description} </p>`} </div> </div>`;
  })} </div>`} </div> </section>  <section class="bg-surface-container py-section-gap-mobile md:py-section-gap overflow-hidden"> <div class="max-w-container-max mx-auto px-gutter"> <div class="text-center mb-16"> <h2 class="font-headline-lg text-headline-lg text-on-surface mb-4">
Transformation You Can See
</h2> <p class="font-body-md text-body-md text-on-surface-variant max-w-xl mx-auto">
From weather-worn to wunderkind. See how we bring value and beauty back to aging properties.
</p> </div> <div class="grid md:grid-cols-2 gap-6 items-center"> <!-- Comparison slider --> <div id="comparison-slider" class="relative select-none overflow-hidden rounded-2xl shadow-xl aspect-video cursor-ew-resize"> <!-- After (full width underneath) --> <div class="absolute inset-0"> <img${addAttribute(afterImg, "src")} alt="After restoration" class="w-full h-full object-cover"> </div> <!-- Before (clipped left half) --> <div id="before-clip" class="absolute inset-0 overflow-hidden" style="width: 50%"> <img${addAttribute(beforeImg, "src")} alt="Before restoration" class="w-full h-full object-cover grayscale opacity-80" style="min-width: 200%;"> </div> <!-- Divider handle --> <div id="slider-line" class="absolute top-0 bottom-0 z-20" style="left: 50%"> <div class="absolute inset-y-0 left-0 w-0.5 -translate-x-px bg-white shadow-lg"></div> <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-xl"> <span class="material-symbols-outlined text-brick-red">unfold_more</span> </div> </div> <!-- Labels --> <span class="absolute top-4 left-4 z-30 bg-deep-earth/60 text-on-primary px-3 py-1 rounded-full font-label-md text-label-md font-bold backdrop-blur-sm">
BEFORE
</span> <span class="absolute top-4 right-4 z-30 bg-brick-red text-on-primary px-3 py-1 rounded-full font-label-md text-label-md font-bold">
AFTER
</span> </div> <!-- Project details --> <div class="space-y-6"> <div class="bg-white p-8 rounded-2xl shadow-sm border border-terracotta/10"> <h3 class="font-headline-md text-headline-md text-brick-red mb-4">
Project: ${baTitle} </h3> <p class="font-body-md text-body-md text-on-surface-variant"> ${baDescription} </p> ${!baProject && renderTemplate`<ul class="mt-6 space-y-5"> <li class="flex items-start gap-4"> <span class="material-symbols-outlined text-brick-red mt-0.5">check_circle</span> <div> <p class="font-label-md text-label-md text-on-surface">Complete Stripping &amp; Recoating</p> <p class="font-body-md text-body-md text-on-surface-variant mt-1">
Removed 15 years of oxidation and applied UV-resistant coatings.
</p> </div> </li> <li class="flex items-start gap-4"> <span class="material-symbols-outlined text-brick-red mt-0.5">check_circle</span> <div> <p class="font-label-md text-label-md text-on-surface">Structural Crack Repair</p> <p class="font-body-md text-body-md text-on-surface-variant mt-1">
Reinforced facade stability and sealed all entry points for moisture.
</p> </div> </li> <li class="flex items-start gap-4"> <span class="material-symbols-outlined text-brick-red mt-0.5">check_circle</span> <div> <p class="font-label-md text-label-md text-on-surface">Waterproofing Warranty</p> <p class="font-body-md text-body-md text-on-surface-variant mt-1">
Issued a 10-year peace-of-mind guarantee on all roof joints.
</p> </div> </li> </ul>`} </div> </div> </div> </div> </section>  <section class="bg-brick-red py-12 relative overflow-hidden"> <div class="max-w-container-max mx-auto px-gutter flex flex-col md:flex-row items-center justify-between gap-8 relative z-10 text-center md:text-left"> <h2 class="font-headline-lg text-headline-lg text-on-primary max-w-xl">
Like what you see? Let's do the same for your home.
</h2> <a href="/quote" class="bg-on-primary text-brick-red px-10 py-4 rounded-xl font-headline-md text-headline-md shadow-xl hover:bg-warm-cream transition-all active:scale-95 whitespace-nowrap">
Request a Quote
</a> </div> <!-- Decorative grid pattern --> <div class="absolute right-0 top-0 h-full w-1/3 opacity-10 pointer-events-none"> <svg class="h-full w-full" viewBox="0 0 100 100"> <defs> <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"> <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" stroke-width="0.5"></path> </pattern> </defs> <rect width="100" height="100" fill="url(#grid)"></rect> </svg> </div> </section> ` })} ${renderScript($$result, "/Users/ryannel/Desktop/amatola-web/src/pages/gallery.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/ryannel/Desktop/amatola-web/src/pages/gallery.astro", void 0);

const $$file = "/Users/ryannel/Desktop/amatola-web/src/pages/gallery.astro";
const $$url = "/gallery";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Gallery,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
