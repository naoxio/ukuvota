/* empty css                          */
import { e as createAstro, f as createComponent, r as renderTemplate, h as renderComponent, m as maybeRenderHead } from '../astro_fCW-vF1L.mjs';
import 'kleur/colors';
import 'clsx';
import { a as al } from './donate_1vqIitFd.mjs';
import { b as $$TimeSelector, $ as $$CreateProcessLayout } from './full-process_-38TdWTR.mjs';
import { c as $$AddProposals } from './proposals_tp3UGRHh.mjs';

const $$Astro$1 = createAstro();
const $$EditProposalList = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$EditProposalList;
  return renderTemplate`${renderComponent($$result, "proposal-list", "proposal-list", { "class": "flex flex-col justify-around align-center items-center" })} `;
}, "/home/wao/Meteor/Workspace/Nao/evotico/src/components/process/EditProposalList.astro", void 0);

const $$Astro = createAstro();
const $$VotingOnly = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$VotingOnly;
  return renderTemplate`${renderComponent($$result, "CreateProcessLayout", $$CreateProcessLayout, { "step": 3 }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h2>${al("setup.selectTimeForVoting")}</h2> <br> ${renderComponent($$result2, "TimeSelector", $$TimeSelector, { "phase": "voting" })} <br> <h2>${al("setup.proposals")}</h2> ${renderComponent($$result2, "EditProposalList", $$EditProposalList, {})} <br> ${renderComponent($$result2, "AddProposals", $$AddProposals, {})} ` })}`;
}, "/home/wao/Meteor/Workspace/Nao/evotico/src/pages/create/voting-only.astro", void 0);

const $$file = "/home/wao/Meteor/Workspace/Nao/evotico/src/pages/create/voting-only.astro";
const $$url = "/create/voting-only";

export { $$VotingOnly as default, $$file as file, $$url as url };
