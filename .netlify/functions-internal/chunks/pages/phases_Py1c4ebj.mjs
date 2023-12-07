/* empty css                          */
import { e as createAstro, f as createComponent, r as renderTemplate, h as renderComponent, m as maybeRenderHead } from '../astro_fCW-vF1L.mjs';
import 'kleur/colors';
import 'clsx';
import { a as al } from './donate_1vqIitFd.mjs';
import { $ as $$CreateProcessLayout } from './full-process_-38TdWTR.mjs';

const $$Astro = createAstro();
const $$Phases = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Phases;
  return renderTemplate`${renderComponent($$result, "CreateProcessLayout", $$CreateProcessLayout, { "step": 2 }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<form action="/api/process-store" method="POST"> <input type="hidden" name="step" value="2"> <div class="flex justify-around flex-wrap"> <button type="submit" name="phase" value="full" class="btn btn-primary m-2">${al("process.phases.full")}</button> <button type="submit" name="phase" value="voting" class="btn btn-primary m-2">${al("process.phases.voting")}</button> </div> </form> ` })}`;
}, "/home/wao/Meteor/Workspace/Nao/evotico/src/pages/create/phases.astro", void 0);

const $$file = "/home/wao/Meteor/Workspace/Nao/evotico/src/pages/create/phases.astro";
const $$url = "/create/phases";

export { $$Phases as default, $$file as file, $$url as url };
