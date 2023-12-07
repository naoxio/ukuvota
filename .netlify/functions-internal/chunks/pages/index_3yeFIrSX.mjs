/* empty css                          */
import { e as createAstro, f as createComponent, r as renderTemplate, m as maybeRenderHead, g as addAttribute, h as renderComponent, j as renderSlot } from '../astro_fCW-vF1L.mjs';
import 'kleur/colors';
import 'clsx';
import { c as cl, b as $$Icon, a as al, d as $$ContentDoc, E, $ as $$BaseLayout, e as $$Donate } from './donate_1vqIitFd.mjs';
import $$PrivacyPolicy from './privacy-policy_taedNF_C.mjs';
/* empty css                          */
import QRCode from 'qrcode';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import { $ as $$Proposals } from './proposals_tp3UGRHh.mjs';
import $$Results from './results_DGGjeaIt.mjs';
import $$Voting from './voting_7-yYArPP.mjs';
import { $ as $$CreateProcessLayout, a as $$FullProcess } from './full-process_-38TdWTR.mjs';
import $$VotingOnly from './voting-only_RmIejVr0.mjs';
import $$Create from './create_n_Nc2dGA.mjs';
import $$Phases from './phases_Py1c4ebj.mjs';
import $$Review from './review_1umGYx6N.mjs';
/* empty css                          */

const $$Astro$t = createAstro();
const $$Index$n = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$t, $$props, $$slots);
  Astro2.self = $$Index$n;
  let url = cl("/dashboard");
  const firstVisit = Astro2.cookies.get("firstVisit");
  if (!firstVisit) {
    Astro2.cookies.set("firstVisit", "true", { path: "/", httpOnly: true });
    url = cl("/about");
  }
  return Astro2.redirect(url);
}, "/home/wao/Meteor/Workspace/Nao/evotico/src/pages/index.astro", void 0);

const $$file$n = "/home/wao/Meteor/Workspace/Nao/evotico/src/pages/index.astro";
const $$url$n = "";

const index$n = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index$n,
    file: $$file$n,
    url: $$url$n
}, Symbol.toStringTag, { value: 'Module' }));

const options = [];
for (let i = 1; i <= 6; i++) {
  options.push({
    value: String(i),
    label: `x${i}`
  });
}
options.push({
  value: "-1",
  label: ""
});

const $$Astro$s = createAstro();
const $$Modal = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$s, $$props, $$slots);
  Astro2.self = $$Modal;
  const { id, icon = "information", btn } = Astro2.props;
  return renderTemplate`${btn ? renderTemplate`${maybeRenderHead()}<button class="btn btn-sm"><label${addAttribute(id, "for")}>${btn}</label></button>` : renderTemplate`<label${addAttribute(id, "for")} class="btn btn-ghost btn-sm btn-circle">${renderComponent($$result, "Icon", $$Icon, { "width": "22", "name": icon })}</label>`}<input type="checkbox"${addAttribute(id, "id")} class="modal-toggle"><label${addAttribute(id, "for")} class="modal"><label class="modal-box"><label${addAttribute(id, "for")} class="btn btn-sm btn-circle absolute right-2 top-2">${renderComponent($$result, "Icon", $$Icon, { "width": "22", "name": "close" })}</label>${renderSlot($$result, $$slots["default"])}</label></label>`;
}, "/home/wao/Meteor/Workspace/Nao/evotico/src/components/ui/Modal.astro", void 0);

const $$Astro$r = createAstro();
const $$QRCode = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$r, $$props, $$slots);
  Astro2.self = $$QRCode;
  const { text } = Astro2.props;
  const generateQR = async (text2) => {
    return await QRCode.toDataURL(text2);
  };
  const qr = await generateQR(text);
  return renderTemplate`${maybeRenderHead()}<img${addAttribute(qr, "src")}>`;
}, "/home/wao/Meteor/Workspace/Nao/evotico/src/components/ui/QRCode.astro", void 0);

const $$Astro$q = createAstro();
const $$ProcessTimeLabel = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$q, $$props, $$slots);
  Astro2.self = $$ProcessTimeLabel;
  const { phase, dates } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "process-time-label", "process-time-label", { "data-start": dates[0] }, { "default": () => renderTemplate` ${maybeRenderHead()}<span>${al(`phases.${phase}.title`)}:&nbsp;</span> ${+/* @__PURE__ */ new Date() < dates[0] ? renderTemplate`<br><span>${al(`phases.start`)}:&nbsp;</span><span id="start-date" class="link-success"></span><br><span>${al(`phases.lastFor`)}:&nbsp;</span><!--Countdown type="success" dates={dates} /-->` : +/* @__PURE__ */ new Date() < dates[1] ? renderTemplate`<!--Countdown dates={dates} type="warning" /--><span>&nbsp;(${al("remainingTime")})</span>` : renderTemplate`<span class="text-info">${al("done")}</span>`} <br> ` })} `;
}, "/home/wao/Meteor/Workspace/Nao/evotico/src/components/datetime/ProcessTimeLabel.astro", void 0);

const getQuillHTML = (content) => {
  if (typeof content === "string") {
    return content;
  }
  if ("ops" in content && Array.isArray(content.ops)) {
    const cfg = {};
    const converter = new QuillDeltaToHtmlConverter(content.ops, cfg);
    const html = converter.convert();
    return html;
  }
  return "";
};

const $$Astro$p = createAstro();
const $$ProcessInfo = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$p, $$props, $$slots);
  Astro2.self = $$ProcessInfo;
  const { url } = Astro2;
  const { uuid } = Astro2.props;
  const processDetails = await fetch(`/api/process/${uuid}`).then((res) => res.json());
  const {
    title,
    description,
    weighting,
    shareable = true,
    proposalDates,
    votingDates
  } = processDetails;
  const weightLabel = weighting ? options[Number(weighting) - 1].label : null;
  const descriptionHTML = getQuillHTML(description);
  return renderTemplate`${maybeRenderHead()}<div class="flex flex-col pb-3"> <h1>${title}</h1> <p class="topic-description">${descriptionHTML}</p> <div class="flex justify-end items-center"> ${al("process.weighting")}&nbsp;
${weightLabel}&nbsp;
${renderComponent($$result, "Modal", $$Modal, { "id": "weightingInfo" }, { "default": ($$result2) => renderTemplate` <h3>${al("process.weighting")}</h3> ${renderComponent($$result2, "ContentDoc", $$ContentDoc, { "file_name": "NegativeScoreWeighting" })} ` })} </div> <div> ${proposalDates && proposalDates[0] > 0 && renderTemplate`${renderComponent($$result, "ProcessTimeLabel", $$ProcessTimeLabel, { "phase": "proposal", "dates": proposalDates })}`} <br> ${votingDates && renderTemplate`${renderComponent($$result, "ProcessTimeLabel", $$ProcessTimeLabel, { "phase": "voting", "dates": votingDates })}`} <br> </div> ${shareable && renderTemplate`<div class="w-full pr-2"> <p>${al("process.shareableUrl")}</p> <div class="flex items-center"> <input id="shareableUrl" type="text" class="input w-full" readonly${addAttribute(url.href, "value")}>
&nbsp; &nbsp;
${renderComponent($$result, "Modal", $$Modal, { "id": "shareableQrCode", "icon": "qr-code" }, { "default": ($$result2) => renderTemplate` <h3>${al("process.qrcode")}</h3> <div class="flex justify-center"> ${renderComponent($$result2, "QRCode", $$QRCode, { "text": url.href })} </div> <br> ` })} </div> </div>`} </div>`;
}, "/home/wao/Meteor/Workspace/Nao/evotico/src/components/process/ProcessInfo.astro", void 0);

const $$Astro$o = createAstro();
const $$Index$m = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$o, $$props, $$slots);
  Astro2.self = $$Index$m;
  console.log(E.locales);
  const processesCookie = Astro2.cookies.get("processes") || "";
  let allProcesses = processesCookie ? JSON.parse(processesCookie) : [];
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": al("buttons.dashboard"), "description": al("description"), "data-astro-cid-y55gmoyq": true }, { "default": ($$result2) => renderTemplate`${allProcesses.length > 0 ? renderTemplate`${maybeRenderHead()}<div data-astro-cid-y55gmoyq> ${allProcesses.map((uuid) => renderTemplate`${renderComponent($$result2, "ProcessInfo", $$ProcessInfo, { "uuid": uuid, "data-astro-cid-y55gmoyq": true })}`)} <form action="/api/export" method="get" data-astro-cid-y55gmoyq> <button class="btn-floating" id="exportButton" type="submit" data-astro-cid-y55gmoyq> ${al("export")} </button> </form> </div>` : renderTemplate`<div class="empty-state" data-astro-cid-y55gmoyq> <p data-astro-cid-y55gmoyq>${al("noProcesses")}</p> <p data-astro-cid-y55gmoyq>${al("beginProcess")}</p> <div class="absolute right-5 bottom-20" data-astro-cid-y55gmoyq> <label for="modalToggle" class="btn btn-primary btn-circle fixed right-5 bottom-20" data-astro-cid-y55gmoyq> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current" data-astro-cid-y55gmoyq> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v14m7-7H5" data-astro-cid-y55gmoyq></path> </svg> </label> <input type="checkbox" id="modalToggle" class="modal-toggle" data-astro-cid-y55gmoyq> <div class="modal modal-bottom sm:modal-middle" data-astro-cid-y55gmoyq> <div class="modal-box" data-astro-cid-y55gmoyq> <label for="modalToggle" class="btn btn-sm btn-circle absolute right-2 top-2" data-astro-cid-y55gmoyq>✕</label> <p class="font-bold text-lg" data-astro-cid-y55gmoyq>${al("options")}</p> <br data-astro-cid-y55gmoyq> <a${addAttribute(cl("/create"), "href")} class="btn btn-primary mb-4" data-astro-cid-y55gmoyq> ${al("createNewProcess")} </a> <form class="mt-4" action="/api/add-by-uuid" method="post" data-astro-cid-y55gmoyq> <input${addAttribute(al("enterUUID"), "placeholder")} type="text" name="uuid" class="input input-bordered" required data-astro-cid-y55gmoyq> <button type="submit" class="btn btn-primary m-2" data-astro-cid-y55gmoyq> ${al("add")} </button> </form> <form class="flex items-center mt-4" action="/api/import-csv" method="post" enctype="multipart/form-data" data-astro-cid-y55gmoyq> <input type="file" class="file-input" name="file" accept=".csv" required data-astro-cid-y55gmoyq> <br data-astro-cid-y55gmoyq> <button type="submit" class="btn m-2 btn-primary" data-astro-cid-y55gmoyq> ${al("import")} </button> </form> </div> </div> </div> <input type="file" class="hidden" id="fileInput" accept=".csv" data-astro-cid-y55gmoyq> </div>`}` })} `;
}, "/home/wao/Meteor/Workspace/Nao/evotico/src/pages/dashboard/index.astro", void 0);

const $$file$m = "/home/wao/Meteor/Workspace/Nao/evotico/src/pages/dashboard/index.astro";
const $$url$m = "/dashboard";

const index$m = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index$m,
    file: $$file$m,
    url: $$url$m
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$n = createAstro();
const $$Index$l = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$n, $$props, $$slots);
  Astro2.self = $$Index$l;
  return Astro2.redirect(cl("/"));
}, "/home/wao/Meteor/Workspace/Nao/evotico/src/pages/process/index.astro", void 0);

const $$file$l = "/home/wao/Meteor/Workspace/Nao/evotico/src/pages/process/index.astro";
const $$url$l = "/process";

const index$l = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index$l,
    file: $$file$l,
    url: $$url$l
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$m = createAstro();
const $$ProcessLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$m, $$props, $$slots);
  Astro2.self = $$ProcessLayout;
  const { process } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": process ? process.title : null, "simpleHeader": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div style="display: none; opacity: 0;"> <div id="temp"></div> </div> ${process && renderTemplate`${renderComponent($$result2, "ProcessInfo", $$ProcessInfo, { "uuid": process.id })}`}${renderSlot($$result2, $$slots["default"])} ` })}`;
}, "/home/wao/Meteor/Workspace/Nao/evotico/src/layouts/ProcessLayout.astro", void 0);

function getProcessUrl(process, processId) {
  switch (true) {
    case process === null:
      return "/";
    case (+/* @__PURE__ */ new Date() >= process.proposalDates[0] && +/* @__PURE__ */ new Date() < process.proposalDates[1]):
      return `/process/${processId}/proposals`;
    case (+/* @__PURE__ */ new Date() >= process.votingDates[0] && +/* @__PURE__ */ new Date() < process.votingDates[1]):
      return `/process/${processId}/voting`;
    case +/* @__PURE__ */ new Date() >= process.votingDates[1]:
      return `/process/${processId}/results`;
    default:
      return `/process/${processId}`;
  }
}

const $$Astro$l = createAstro();
const $$Index$k = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$l, $$props, $$slots);
  Astro2.self = $$Index$k;
  const { url } = Astro2;
  const processId = Astro2.params.id;
  const process = {};
  const pathname = `${E.locale === "en" ? "" : `/${E.locale}`}${getProcessUrl(process, processId)}`;
  if (pathname !== url.pathname)
    return Astro2.redirect(pathname);
  return renderTemplate`${renderComponent($$result, "ProcessLayout", $$ProcessLayout, { "process": process }, { "default": ($$result2) => renderTemplate`${process && +/* @__PURE__ */ new Date() >= process.proposalDates[1] && +/* @__PURE__ */ new Date() < process.votingDates[0] && renderTemplate`${maybeRenderHead()}<div> <h2>${al("process.proposals")}</h2> ${renderComponent($$result2, "proposal-list", "proposal-list", { "data-proposals": process.proposals }, { "default": () => renderTemplate` <div class="proposals-container"></div> ` })} </div>`}` })} `;
}, "/home/wao/Meteor/Workspace/Nao/evotico/src/pages/process/[id]/index.astro", void 0);

const $$file$k = "/home/wao/Meteor/Workspace/Nao/evotico/src/pages/process/[id]/index.astro";
const $$url$k = "/process/[id]";

const index$k = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index$k,
    file: $$file$k,
    url: $$url$k
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$k = createAstro();
const $$Index$j = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$k, $$props, $$slots);
  Astro2.self = $$Index$j;
  const checkFormData = async () => {
    if ("formData" in Astro2.request) {
      try {
        const formData = await Astro2.request.formData();
        if (formData && "noGuide" in formData) {
          const noGuide = formData.get("noGuide");
          Astro2.cookies.set("noGuide", noGuide === "on" ? "true" : "false");
        }
      } catch (error) {
      }
    }
  };
  checkFormData();
  const processCookie = JSON.parse(Astro2.cookies.get("process")?.value || "{}");
  const { weighting = "", title = "", nojsdescription = "", quillopsdescription = "" } = processCookie;
  const hasExistingProcessData = Object.keys(processCookie).length > 0;
  return renderTemplate`${renderComponent($$result, "CreateProcessLayout", $$CreateProcessLayout, { "step": 1 }, { "default": ($$result2) => renderTemplate`${hasExistingProcessData ? renderTemplate`${maybeRenderHead()}<input type="checkbox" id="existingProcessModal" class="modal-toggle" checked><label for="existingProcessModal" class="modal"> <label class="modal-box"> <label for="existingProcessModal" class="btn btn-sm btn-circle absolute right-2 top-2"> ${renderComponent($$result2, "Icon", $$Icon, { "width": "22", "name": "close" })} </label> <h3>${al("process.continueEditing")}</h3> <p>${al("process.existingProcessPrompt")}</p> <div class="process-details"> ${title && renderTemplate`<p><strong>${al("process.topic")}:</strong> ${title}</p>`} ${nojsdescription && renderTemplate`<p><strong>${al("process.description")}:</strong> ${nojsdescription}</p>`} ${weighting && renderTemplate`<p><strong>${al("process.weighting")}:</strong> ${weighting}</p>`} </div> <div class="flex justify-center"> <a href="/edit-existing" class="btn m-2">${al("process.continue")}</a> <a href="/start-new" class="btn m-2">${al("process.startNew")}</a> </div> </label> </label>` : null}<form action="/api/process-store" method="POST"> <input type="hidden" name="step" value="1"> <div id="scrollTopicQuestion"></div> <p>${al("process.topic")}</p> <input id="topicQuestion" name="topicQuestion" class="input input-bordered w-full" type="text"${addAttribute(title, "value")} required${addAttribute(al("alert.error.topicQuestion"), "title")}> <br> <br> <p>${al("process.description")}</p> <div id="description">Loading QuillEditor...</div> <noscript> <textarea id="nojsdescription" name="nojsdescription" class="textarea textarea-bordered w-full">${nojsdescription}</textarea> </noscript> <input id="quillops" name="quillopsdescription" class="hidden"${addAttribute(quillopsdescription, "value")}> <br> <!--details class="text-center">
      <summary class="cursor-pointer text-indianared mt-6 ">{ t('process.advancedOptions') }</summary--> <div class="flex justify-between items-center"> <span>${al("process.weighting")}</span> <span class="flex justify-center items-center"> <select id="select" name="weighting" class="select mx-2 select-bordered mt-2"${addAttribute(weighting, "value")}> ${options.map((weight) => renderTemplate`<option${addAttribute(weight.value, "value")}> ${Number(weight.value) > 0 ? renderTemplate`<span>${weight.label}</span>` : renderTemplate`<span>&infin;</span>`} </option>`)} </select> ${renderComponent($$result2, "Modal", $$Modal, { "id": "weightingInfo" }, { "default": ($$result3) => renderTemplate` <h3>${al("process.weighting")}</h3> ${renderComponent($$result3, "ContentDoc", $$ContentDoc, { "file_name": "NegativeScoreWeighting" })} ` })} </span> </div> <br> <div class="flex justify-center"> <input type="submit" class="btn btn-primary" value="Next"> </div> </form> ` })} `;
}, "/home/wao/Meteor/Workspace/Nao/evotico/src/pages/create/index.astro", void 0);

const $$file$j = "/home/wao/Meteor/Workspace/Nao/evotico/src/pages/create/index.astro";
const $$url$j = "/create";

const index$j = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index$j,
    file: $$file$j,
    url: $$url$j
}, Symbol.toStringTag, { value: 'Module' }));

const logo = new Proxy({"src":"/_astro/logo.d-ZtP7yb.png","width":674,"height":713,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							
							return target[name];
						}
					});

const $$Astro$j = createAstro();
const $$Footer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$j, $$props, $$slots);
  Astro2.self = $$Footer;
  return renderTemplate`${maybeRenderHead()}<footer data-astro-cid-b2avyow5> <span data-astro-cid-b2avyow5> <a class="link link-primary" href="https://naox.io" data-astro-cid-b2avyow5>NaoX</a> <span data-astro-cid-b2avyow5> © 2023</span> </span> <span data-astro-cid-b2avyow5>&nbsp;-&nbsp;</span> <span data-astro-cid-b2avyow5> <a class="link link-primary" href="/privacy-policy" data-astro-cid-b2avyow5>${al("policy")}</a> </span> </footer> `;
}, "/home/wao/Meteor/Workspace/Nao/evotico/src/components/navigation/Footer.astro", void 0);

const $$Astro$i = createAstro();
const $$Index$i = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$i, $$props, $$slots);
  Astro2.self = $$Index$i;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": al("buttons.about"), "description": al("description") }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex items-center flex-col"> <img width="220" class="m-10" id="logo" alt="Evotico logo"${addAttribute(logo.src, "src")}> <h1>Evotico</h1> <h2>${al("homepage.subheader")}</h2> </div> ${renderComponent($$result2, "ContentDoc", $$ContentDoc, { "file_name": "Introduction" })} <div class="flex justify-center"> <a class="btn text-btn m-2"${addAttribute(cl("/guide"), "href")}>${al("homepage.getStarted")}</a> </div> <br> ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "/home/wao/Meteor/Workspace/Nao/evotico/src/pages/about/index.astro", void 0);

const $$file$i = "/home/wao/Meteor/Workspace/Nao/evotico/src/pages/about/index.astro";
const $$url$i = "/about";

const index$i = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index$i,
    file: $$file$i,
    url: $$url$i
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$h = createAstro();
const $$Index$h = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$h, $$props, $$slots);
  Astro2.self = $$Index$h;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container mx-auto p-4"> ${renderComponent($$result2, "ContentDoc", $$ContentDoc, { "file_name": "Guide" })} <form${addAttribute(cl("/create"), "action")} method="POST"> <div class="form-control mt-4"> <label class="cursor-pointer label" for="noGuide"> <span class="label-text">${al("checkboxLabel")}</span> <input type="checkbox" name="noGuide" class="checkbox checkbox-primary" checked> </label> </div> <div class="flex justify-center"> <button type="submit" class="btn text-btn m-2">${al("createProcessButton")}</button> </div> </form> </div> ` })}`;
}, "/home/wao/Meteor/Workspace/Nao/evotico/src/pages/guide/index.astro", void 0);

const $$file$h = "/home/wao/Meteor/Workspace/Nao/evotico/src/pages/guide/index.astro";
const $$url$h = "/guide";

const index$h = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index$h,
    file: $$file$h,
    url: $$url$h
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$g = createAstro();
const $$Index$g = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$g, $$props, $$slots);
  Astro2.self = $$Index$g;
  const { props } = Astro2;
  return renderTemplate`${renderComponent($$result, "Page", $$Index$n, { ...props })}`;
}, "/home/wao/Meteor/Workspace/Nao/evotico/src/pages/de/index.astro", void 0);

const $$file$g = "/home/wao/Meteor/Workspace/Nao/evotico/src/pages/de/index.astro";
const $$url$g = "/de";

const index$g = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index$g,
    file: $$file$g,
    url: $$url$g
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$f = createAstro();
const $$Index$f = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$f, $$props, $$slots);
  Astro2.self = $$Index$f;
  const { props } = Astro2;
  return renderTemplate`${renderComponent($$result, "Page", $$PrivacyPolicy, { ...props })}`;
}, "/home/wao/Meteor/Workspace/Nao/evotico/src/pages/de/privacy-policy/index.astro", void 0);

const $$file$f = "/home/wao/Meteor/Workspace/Nao/evotico/src/pages/de/privacy-policy/index.astro";
const $$url$f = "/de/privacy-policy";

const index$f = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index$f,
    file: $$file$f,
    url: $$url$f
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$e = createAstro();
const $$Index$e = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$e, $$props, $$slots);
  Astro2.self = $$Index$e;
  const { props } = Astro2;
  return renderTemplate`${renderComponent($$result, "Page", $$Index$m, { ...props })}`;
}, "/home/wao/Meteor/Workspace/Nao/evotico/src/pages/de/dashboard/index.astro", void 0);

const $$file$e = "/home/wao/Meteor/Workspace/Nao/evotico/src/pages/de/dashboard/index.astro";
const $$url$e = "/de/dashboard";

const index$e = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index$e,
    file: $$file$e,
    url: $$url$e
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$d = createAstro();
const $$Index$d = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$d, $$props, $$slots);
  Astro2.self = $$Index$d;
  const { props } = Astro2;
  return renderTemplate`${renderComponent($$result, "Page", $$Index$l, { ...props })}`;
}, "/home/wao/Meteor/Workspace/Nao/evotico/src/pages/de/process/index.astro", void 0);

const $$file$d = "/home/wao/Meteor/Workspace/Nao/evotico/src/pages/de/process/index.astro";
const $$url$d = "/de/process";

const index$d = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index$d,
    file: $$file$d,
    url: $$url$d
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$c = createAstro();
const $$Index$c = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$c, $$props, $$slots);
  Astro2.self = $$Index$c;
  const { props } = Astro2;
  return renderTemplate`${renderComponent($$result, "Page", $$Index$k, { ...props })}`;
}, "/home/wao/Meteor/Workspace/Nao/evotico/src/pages/de/process/[id]/index.astro", void 0);

const $$file$c = "/home/wao/Meteor/Workspace/Nao/evotico/src/pages/de/process/[id]/index.astro";
const $$url$c = "/de/process/[id]";

const index$c = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index$c,
    file: $$file$c,
    url: $$url$c
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$b = createAstro();
const $$Index$b = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$b, $$props, $$slots);
  Astro2.self = $$Index$b;
  const { props } = Astro2;
  return renderTemplate`${renderComponent($$result, "Page", $$Proposals, { ...props })}`;
}, "/home/wao/Meteor/Workspace/Nao/evotico/src/pages/de/process/[id]/proposals/index.astro", void 0);

const $$file$b = "/home/wao/Meteor/Workspace/Nao/evotico/src/pages/de/process/[id]/proposals/index.astro";
const $$url$b = "/de/process/[id]/proposals";

const index$b = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index$b,
    file: $$file$b,
    url: $$url$b
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$a = createAstro();
const $$Index$a = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$Index$a;
  const { props } = Astro2;
  return renderTemplate`${renderComponent($$result, "Page", $$Results, { ...props })}`;
}, "/home/wao/Meteor/Workspace/Nao/evotico/src/pages/de/process/[id]/results/index.astro", void 0);

const $$file$a = "/home/wao/Meteor/Workspace/Nao/evotico/src/pages/de/process/[id]/results/index.astro";
const $$url$a = "/de/process/[id]/results";

const index$a = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index$a,
    file: $$file$a,
    url: $$url$a
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$9 = createAstro();
const $$Index$9 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$Index$9;
  const { props } = Astro2;
  return renderTemplate`${renderComponent($$result, "Page", $$Voting, { ...props })}`;
}, "/home/wao/Meteor/Workspace/Nao/evotico/src/pages/de/process/[id]/voting/index.astro", void 0);

const $$file$9 = "/home/wao/Meteor/Workspace/Nao/evotico/src/pages/de/process/[id]/voting/index.astro";
const $$url$9 = "/de/process/[id]/voting";

const index$9 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index$9,
    file: $$file$9,
    url: $$url$9
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$8 = createAstro();
const $$Index$8 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$Index$8;
  const { props } = Astro2;
  return renderTemplate`${renderComponent($$result, "Page", $$Index$j, { ...props })}`;
}, "/home/wao/Meteor/Workspace/Nao/evotico/src/pages/de/create/index.astro", void 0);

const $$file$8 = "/home/wao/Meteor/Workspace/Nao/evotico/src/pages/de/create/index.astro";
const $$url$8 = "/de/create";

const index$8 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index$8,
    file: $$file$8,
    url: $$url$8
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$7 = createAstro();
const $$Index$7 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$Index$7;
  const { props } = Astro2;
  return renderTemplate`${renderComponent($$result, "Page", $$FullProcess, { ...props })}`;
}, "/home/wao/Meteor/Workspace/Nao/evotico/src/pages/de/create/full-process/index.astro", void 0);

const $$file$7 = "/home/wao/Meteor/Workspace/Nao/evotico/src/pages/de/create/full-process/index.astro";
const $$url$7 = "/de/create/full-process";

const index$7 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index$7,
    file: $$file$7,
    url: $$url$7
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$6 = createAstro();
const $$Index$6 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Index$6;
  const { props } = Astro2;
  return renderTemplate`${renderComponent($$result, "Page", $$VotingOnly, { ...props })}`;
}, "/home/wao/Meteor/Workspace/Nao/evotico/src/pages/de/create/voting-only/index.astro", void 0);

const $$file$6 = "/home/wao/Meteor/Workspace/Nao/evotico/src/pages/de/create/voting-only/index.astro";
const $$url$6 = "/de/create/voting-only";

const index$6 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index$6,
    file: $$file$6,
    url: $$url$6
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$5 = createAstro();
const prerender$1 = false;
const $$Index$5 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Index$5;
  const { props } = Astro2;
  return renderTemplate`${renderComponent($$result, "Page", $$Create, { ...props })}`;
}, "/home/wao/Meteor/Workspace/Nao/evotico/src/pages/de/create/create/index.astro", void 0);

const $$file$5 = "/home/wao/Meteor/Workspace/Nao/evotico/src/pages/de/create/create/index.astro";
const $$url$5 = "/de/create/create";

const index$5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index$5,
    file: $$file$5,
    prerender: prerender$1,
    url: $$url$5
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$4 = createAstro();
const $$Index$4 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Index$4;
  const { props } = Astro2;
  return renderTemplate`${renderComponent($$result, "Page", $$Phases, { ...props })}`;
}, "/home/wao/Meteor/Workspace/Nao/evotico/src/pages/de/create/phases/index.astro", void 0);

const $$file$4 = "/home/wao/Meteor/Workspace/Nao/evotico/src/pages/de/create/phases/index.astro";
const $$url$4 = "/de/create/phases";

const index$4 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index$4,
    file: $$file$4,
    url: $$url$4
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$3 = createAstro();
const prerender = false;
const $$Index$3 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Index$3;
  const { props } = Astro2;
  return renderTemplate`${renderComponent($$result, "Page", $$Review, { ...props })}`;
}, "/home/wao/Meteor/Workspace/Nao/evotico/src/pages/de/create/review/index.astro", void 0);

const $$file$3 = "/home/wao/Meteor/Workspace/Nao/evotico/src/pages/de/create/review/index.astro";
const $$url$3 = "/de/create/review";

const index$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index$3,
    file: $$file$3,
    prerender,
    url: $$url$3
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$2 = createAstro();
const $$Index$2 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Index$2;
  const { props } = Astro2;
  return renderTemplate`${renderComponent($$result, "Page", $$Donate, { ...props })}`;
}, "/home/wao/Meteor/Workspace/Nao/evotico/src/pages/de/donate/index.astro", void 0);

const $$file$2 = "/home/wao/Meteor/Workspace/Nao/evotico/src/pages/de/donate/index.astro";
const $$url$2 = "/de/donate";

const index$2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index$2,
    file: $$file$2,
    url: $$url$2
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$1 = createAstro();
const $$Index$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Index$1;
  const { props } = Astro2;
  return renderTemplate`${renderComponent($$result, "Page", $$Index$i, { ...props })}`;
}, "/home/wao/Meteor/Workspace/Nao/evotico/src/pages/de/about/index.astro", void 0);

const $$file$1 = "/home/wao/Meteor/Workspace/Nao/evotico/src/pages/de/about/index.astro";
const $$url$1 = "/de/about";

const index$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index$1,
    file: $$file$1,
    url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const { props } = Astro2;
  return renderTemplate`${renderComponent($$result, "Page", $$Index$h, { ...props })}`;
}, "/home/wao/Meteor/Workspace/Nao/evotico/src/pages/de/guide/index.astro", void 0);

const $$file = "/home/wao/Meteor/Workspace/Nao/evotico/src/pages/de/guide/index.astro";
const $$url = "/de/guide";

const index = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$ProcessLayout as $, index$m as a, index$l as b, index$k as c, index$j as d, index$i as e, index$h as f, getProcessUrl as g, index$g as h, index$n as i, index$f as j, index$e as k, index$d as l, index$c as m, index$b as n, index$a as o, index$9 as p, index$8 as q, index$7 as r, index$6 as s, index$5 as t, index$4 as u, index$3 as v, index$2 as w, index$1 as x, index as y };
