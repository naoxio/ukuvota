/* empty css                          */
import { e as createAstro, f as createComponent, r as renderTemplate, h as renderComponent, m as maybeRenderHead } from '../astro_fCW-vF1L.mjs';
import 'kleur/colors';
import 'clsx';
import { a as al } from './donate_1vqIitFd.mjs';
import { $ as $$CreateProcessLayout } from './full-process_-38TdWTR.mjs';

const $$Astro = createAstro();
const $$Review = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Review;
  return renderTemplate`${renderComponent($$result, "CreateProcessLayout", $$CreateProcessLayout, { "step": 4, "title": al("buttons.home"), "description": al("description") }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h2 class="flex justify-center mt-4">${al("process.review")}</h2> ` })} `;
}, "/home/wao/Meteor/Workspace/Nao/evotico/src/pages/create/review.astro", void 0);

const $$file = "/home/wao/Meteor/Workspace/Nao/evotico/src/pages/create/review.astro";
const $$url = "/create/review";

export { $$Review as default, $$file as file, $$url as url };
