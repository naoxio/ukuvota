/* empty css                          */
import { e as createAstro, f as createComponent, r as renderTemplate, h as renderComponent, m as maybeRenderHead, g as addAttribute } from '../astro_fCW-vF1L.mjs';
import 'kleur/colors';
import { g as getProcessUrl, $ as $$ProcessLayout } from './index_3yeFIrSX.mjs';
import { E, b as $$Icon, a as al } from './donate_1vqIitFd.mjs';
import { a as $$AlertList, b as $$Alert } from './proposals_tp3UGRHh.mjs';
/* empty css                            */

const $$Astro = createAstro();
const $$Results = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Results;
  const { url } = Astro2;
  const processId = Astro2.params.id;
  const process = {};
  const pathname = `${E.locale === "en" ? "" : `/${E.locale}`}${getProcessUrl(process, processId)}`;
  if (pathname !== url.pathname)
    return Astro2.redirect(pathname);
  const emojis = ["rage", "angry", "sad", "neutral", "smiling", "happy", "loving"];
  if (process && !("voters" in process)) {
    process.voters = [];
  }
  return renderTemplate`${renderComponent($$result, "ProcessLayout", $$ProcessLayout, { "process": process, "data-astro-cid-7c4g7qho": true }, { "default": ($$result2) => renderTemplate`${renderComponent($$result2, "results-card", "results-card", { "data-astro-cid-7c4g7qho": true }, { "default": () => renderTemplate`${maybeRenderHead()}<div class="hide" data-astro-cid-7c4g7qho>${emojis.map((emoji) => renderTemplate`${renderComponent($$result2, "Icon", $$Icon, { "class": "emoji", "name": emoji, "width": "48", "data-astro-cid-7c4g7qho": true })}`)}</div><div class="tabs flex flex-nowrap w-full justify-between" data-astro-cid-7c4g7qho><a class="tab tab-bordered tab-active w-full h-12" data-astro-cid-7c4g7qho>${renderComponent($$result2, "Icon", $$Icon, { "width": "16", "name": "face-cool", "data-astro-cid-7c4g7qho": true })}</a><a class="tab tab-bordered w-full h-12" data-astro-cid-7c4g7qho>${renderComponent($$result2, "Icon", $$Icon, { "width": "16", "name": "list", "data-astro-cid-7c4g7qho": true })}</a></div><div class="tab-content hide" data-astro-cid-7c4g7qho><span class="flex justify-between items-center" data-astro-cid-7c4g7qho><h2 data-astro-cid-7c4g7qho>${al("process.results")}</h2><button class="repeat-button btn btn-sm" data-astro-cid-7c4g7qho>${al("repeatProcess")}</button></span><h3 data-astro-cid-7c4g7qho><span class="voter-label" data-astro-cid-7c4g7qho>${al("process.voters")}</span><span class="num-voters" data-astro-cid-7c4g7qho>(${process.voters.length})</span>:
</h3><div class="flex justify-around flex-wrap" data-astro-cid-7c4g7qho>${process.voters.map((voter) => renderTemplate`<div${addAttribute(voter.id, "id")} class="flex items-center p-2 voter" data-astro-cid-7c4g7qho><input type="checkbox" checked class="checkbox checkbox-xs" data-astro-cid-7c4g7qho><span class="p-1 cursor-pointer select-none" data-astro-cid-7c4g7qho>${voter.name}</span></div>`)}</div><br data-astro-cid-7c4g7qho><div class="overflow-x-auto" data-astro-cid-7c4g7qho><table class="table w-full" data-astro-cid-7c4g7qho><!-- head --><thead data-astro-cid-7c4g7qho><tr class="table-row-one" data-astro-cid-7c4g7qho><th data-astro-cid-7c4g7qho></th><th class="whitespace-normal break-words" data-astro-cid-7c4g7qho>${al("process.proposal")}</th><th class="whitespace-normal break-words" data-astro-cid-7c4g7qho>${al("process.averageScore")}</th><th class="whitespace-normal break-words" data-astro-cid-7c4g7qho>${al("process.totalScore")}</th></tr></thead><tbody data-astro-cid-7c4g7qho></tbody></table></div><br data-astro-cid-7c4g7qho><div class="card" data-astro-cid-7c4g7qho><h3 data-astro-cid-7c4g7qho>${al("process.exportData")}</h3><div class="flex justify-around exports" data-astro-cid-7c4g7qho><button class="export-markdown btn btn-ghost" data-astro-cid-7c4g7qho>${renderComponent($$result2, "Icon", $$Icon, { "width": "28", "name": "document-download", "data-astro-cid-7c4g7qho": true })}</button><button class="export-image btn btn-ghost" data-astro-cid-7c4g7qho>${renderComponent($$result2, "Icon", $$Icon, { "width": "28", "name": "camera", "data-astro-cid-7c4g7qho": true })}</button></div></div></div><div class="tab-content hide" data-astro-cid-7c4g7qho><div data-astro-cid-7c4g7qho><br data-astro-cid-7c4g7qho><br data-astro-cid-7c4g7qho><div class="overflow-x-auto" data-astro-cid-7c4g7qho><table class="table w-full" data-astro-cid-7c4g7qho><!-- head --><thead data-astro-cid-7c4g7qho></thead><tbody data-astro-cid-7c4g7qho></tbody></table></div><br data-astro-cid-7c4g7qho></div></div>${renderComponent($$result2, "AlertList", $$AlertList, { "data-astro-cid-7c4g7qho": true }, { "default": ($$result3) => renderTemplate`${renderComponent($$result3, "Alert", $$Alert, { "icon": "checkmark-outline", "success": true, "data-astro-cid-7c4g7qho": true }, { "default": ($$result4) => renderTemplate`${al("alert.success.repeatProcess")}` })}${renderComponent($$result3, "Alert", $$Alert, { "icon": "warning", "error": true, "data-astro-cid-7c4g7qho": true }, { "default": ($$result4) => renderTemplate`${al("alert.error.missingProposals")}` })}` })}` })}` })}`;
}, "/home/wao/Meteor/Workspace/Nao/evotico/src/pages/process/[id]/results.astro", void 0);

const $$file = "/home/wao/Meteor/Workspace/Nao/evotico/src/pages/process/[id]/results.astro";
const $$url = "/process/[id]/results";

export { $$Results as default, $$file as file, $$url as url };
