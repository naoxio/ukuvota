/* empty css                          */
import { e as createAstro, f as createComponent, r as renderTemplate, h as renderComponent, m as maybeRenderHead } from '../astro_fCW-vF1L.mjs';
import 'kleur/colors';
import 'clsx';
import { a as $$AlertList, b as $$Alert } from './proposals_tp3UGRHh.mjs';
import { g as getProcessUrl, $ as $$ProcessLayout } from './index_3yeFIrSX.mjs';
import { E, a as al, b as $$Icon } from './donate_1vqIitFd.mjs';
/* empty css                           */

const $$Astro = createAstro();
const $$Voting = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Voting;
  const { url } = Astro2;
  const processId = Astro2.params.id;
  const process = {};
  const pathname = `${E.locale === "en" ? "" : `/${E.locale}`}${getProcessUrl(process, processId)}`;
  if (pathname !== url.pathname)
    return Astro2.redirect(pathname);
  const emojiNames = ["rage", "angry", "sad", "neutral", "smiling", "happy", "loving"];
  return renderTemplate`${renderComponent($$result, "ProcessLayout", $$ProcessLayout, { "process": process, "data-astro-cid-p5zg7bgj": true }, { "default": ($$result2) => renderTemplate`${renderComponent($$result2, "voting-list", "voting-list", { "data-astro-cid-p5zg7bgj": true }, { "default": () => renderTemplate`${maybeRenderHead()}<span class="flex justify-end" data-astro-cid-p5zg7bgj><span data-astro-cid-p5zg7bgj>${al("process.voters")}:&nbsp;</span><span class="no-voters" data-astro-cid-p5zg7bgj>${process.voters ? process.voters.length : "0"}</span></span><div class="proposal-list" data-astro-cid-p5zg7bgj><div class="proposal card outline outline-1 shadow-xl py-2 px-4 my-4" data-astro-cid-p5zg7bgj><h3 data-astro-cid-p5zg7bgj></h3><p data-astro-cid-p5zg7bgj></p><br data-astro-cid-p5zg7bgj><div class="flex justify-between" data-astro-cid-p5zg7bgj>${emojiNames.map((name) => renderTemplate`<button class="btn btn-ghost btn-circle emoji-btn" data-astro-cid-p5zg7bgj>${renderComponent($$result2, "Icon", $$Icon, { "class": "icon " + (name === "neutral" ? "" : "gray"), "name": name, "data-astro-cid-p5zg7bgj": true })}</button>`)}</div></div></div><br data-astro-cid-p5zg7bgj><p data-astro-cid-p5zg7bgj>${al("process.voterName")}</p><div class="text-center flex items-center" data-astro-cid-p5zg7bgj><input id="sender-name" type="text" class="input w-full m-2" data-astro-cid-p5zg7bgj><button id="submit-vote" class="btn btn-primary p-2" data-astro-cid-p5zg7bgj>${al("process.submitVote")}</button></div>${renderComponent($$result2, "AlertList", $$AlertList, { "data-astro-cid-p5zg7bgj": true }, { "default": ($$result3) => renderTemplate`${renderComponent($$result3, "Alert", $$Alert, { "icon": "checkmark-outline", "success": true, "data-astro-cid-p5zg7bgj": true }, { "default": ($$result4) => renderTemplate`${al("alert.success.submitVote")}<span class="name" data-astro-cid-p5zg7bgj></span>` })}${renderComponent($$result3, "Alert", $$Alert, { "icon": "checkmark-outline", "error": true, "data-astro-cid-p5zg7bgj": true }, { "default": ($$result4) => renderTemplate`${al("alert.error.emptyName")}` })}` })}` })}` })}`;
}, "/home/wao/Meteor/Workspace/Nao/evotico/src/pages/process/[id]/voting.astro", void 0);

const $$file = "/home/wao/Meteor/Workspace/Nao/evotico/src/pages/process/[id]/voting.astro";
const $$url = "/process/[id]/voting";

export { $$Voting as default, $$file as file, $$url as url };
