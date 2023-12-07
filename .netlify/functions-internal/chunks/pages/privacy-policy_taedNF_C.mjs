/* empty css                          */
import { e as createAstro, f as createComponent, r as renderTemplate, h as renderComponent } from '../astro_fCW-vF1L.mjs';
import 'kleur/colors';
import 'clsx';
import { a as al, $ as $$BaseLayout, d as $$ContentDoc } from './donate_1vqIitFd.mjs';

const $$Astro = createAstro();
const $$PrivacyPolicy = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$PrivacyPolicy;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": al("buttons.home"), "description": al("description") }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ContentDoc", $$ContentDoc, { "file_name": "PrivacyPolicy" })} ` })}`;
}, "/home/wao/Meteor/Workspace/Nao/evotico/src/pages/privacy-policy.astro", void 0);

const $$file = "/home/wao/Meteor/Workspace/Nao/evotico/src/pages/privacy-policy.astro";
const $$url = "/privacy-policy";

export { $$PrivacyPolicy as default, $$file as file, $$url as url };
