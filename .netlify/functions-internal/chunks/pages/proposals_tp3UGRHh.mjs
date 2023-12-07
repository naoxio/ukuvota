/* empty css                          */
import { e as createAstro, f as createComponent, r as renderTemplate, h as renderComponent, m as maybeRenderHead, j as renderSlot } from '../astro_fCW-vF1L.mjs';
import 'kleur/colors';
import 'clsx';
import { a as al, b as $$Icon, E } from './donate_1vqIitFd.mjs';
import { g as getProcessUrl, $ as $$ProcessLayout } from './index_3yeFIrSX.mjs';
/* empty css                              */

const dropdownOptions = [
  {
    title: al("proposal.zero.title"),
    description: {
      ops: [
        { insert: al("proposal.zero.description") }
      ]
    }
  },
  {
    title: al("proposal.one.title"),
    description: {
      ops: [
        { insert: al("proposal.one.description") }
      ]
    }
  }
];

const $$Astro$3 = createAstro();
const $$AddProposals = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$AddProposals;
  const { processId } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "add-proposal", "add-proposal", { "class": "flex items-center flex-wrap", "data-process": processId }, { "default": () => renderTemplate` ${maybeRenderHead()}<button id="add-button" class="btn p-2">${al("process.addProposal")}</button> <div class="dropdown"> <label tabindex="0" class="btn m-1">${al("addProposalTemplate")}</label> <ul tabindex="0" class="dropdown-content menu p-2 shadow  rounded-box"> ${dropdownOptions.map((option) => renderTemplate`<li> <a class="flex flex-col"> <b class="title">${option.title}</b> <p class="description">${option.description.ops[0].insert}</p> </a> </li>`)} </ul> </div> ` })} `;
}, "/home/wao/Meteor/Workspace/Nao/evotico/src/components/process/AddProposals.astro", void 0);

const $$Astro$2 = createAstro();
const $$AlertList = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$AlertList;
  return renderTemplate`${maybeRenderHead()}<div class="alert-list m-0 p-0 flex flex-col items-center" data-astro-cid-66iibbsw> ${renderSlot($$result, $$slots["default"])} </div>`;
}, "/home/wao/Meteor/Workspace/Nao/evotico/src/components/ui/AlertList.astro", void 0);

const $$Astro$1 = createAstro();
const $$Alert = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Alert;
  const { error, success, warning, icon } = Astro2.props;
  const classList = `alert w-96 shadow-lg m-2 cursor-pointer ${error ? "alert-error" : success ? "alert-success" : warning ? "alert-warning" : ""}`;
  const showAlertId = `show-alert-${Math.random().toString(36).substring(2, 9)}`;
  return renderTemplate`${renderComponent($$result, "alert-element", "alert-element", { "id": showAlertId, "class": classList, "style": "display: none; pointer-events: auto;" }, { "default": () => renderTemplate` ${maybeRenderHead()}<div class="flex justify-around"> ${renderComponent($$result, "Icon", $$Icon, { "width": "32", "name": icon })} <span>${renderSlot($$result, $$slots["default"])}</span> </div> ` })} `;
}, "/home/wao/Meteor/Workspace/Nao/evotico/src/components/ui/Alert.astro", void 0);

const $$Astro = createAstro();
const $$Proposals = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Proposals;
  const { url } = Astro2;
  const processId = Astro2.params.id;
  const process = {};
  const pathname = `${E.locale === "en" ? "" : `/${E.locale}`}${getProcessUrl(process, processId)}`;
  if (pathname !== url.pathname)
    return Astro2.redirect(pathname);
  return renderTemplate`${renderComponent($$result, "ProcessLayout", $$ProcessLayout, { "process": process }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "proposal-list", "proposal-list", {}, { "default": () => renderTemplate` ${maybeRenderHead()}<h2>${al("process.proposals")}</h2> <div class="proposals"> <div class="proposal card outline outline-1 shadow-xl py-2 px-4 my-4"> <div class="view flex justify-between items-center cursor-pointer"> <div class="content flex flex-col w-full"> <div class="flex flex-col"></div> <div class="flex"> <button name="edit" class="btn btn-primary  btn-sm mx-2">${al("edit")}</button> </div> <br> </div> </div> <div class="edit flex justify-between items-center" style="display: none;"> <div class="content flex flex-col w-full"> <h3>${al("process.proposal")}</h3> <input type="text" class="input input-bordered input-sm my-2"> <br> <h4>${al("process.description")}</h4> <br> <div class="quill"></div> <br> <div class="flex"> <button name="save" class="btn btn-primary btn-sm mx-2"> ${al("save")} </button> <button name="delete" class="btn btn-ghost text-error btn-sm mx-2"> ${al("delete")} </button> </div> <br> </div> </div> </div> </div> ${renderComponent($$result2, "AddProposals", $$AddProposals, { "processId": processId })} ${renderComponent($$result2, "AlertList", $$AlertList, {}, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Alert", $$Alert, { "icon": "checkmark-outline", "success": true }, { "default": ($$result4) => renderTemplate`${al("alert.success.websocketConnected")}` })} ${renderComponent($$result3, "Alert", $$Alert, { "icon": "warning", "warning": true }, { "default": ($$result4) => renderTemplate`${al("alert.connecting.connectingToWebsocket")}` })} ${renderComponent($$result3, "Alert", $$Alert, { "icon": "warning", "error": true }, { "default": ($$result4) => renderTemplate`${al("alert.error.errorConnectingToWebsocket")}` })} ` })} ` })} ` })} `;
}, "/home/wao/Meteor/Workspace/Nao/evotico/src/pages/process/[id]/proposals.astro", void 0);

const $$file = "/home/wao/Meteor/Workspace/Nao/evotico/src/pages/process/[id]/proposals.astro";
const $$url = "/process/[id]/proposals";

const proposals = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Proposals,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Proposals as $, $$AlertList as a, $$Alert as b, $$AddProposals as c, proposals as p };
