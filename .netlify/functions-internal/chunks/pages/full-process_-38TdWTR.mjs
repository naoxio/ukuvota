/* empty css                          */
import { e as createAstro, f as createComponent, r as renderTemplate, h as renderComponent, m as maybeRenderHead, g as addAttribute, j as renderSlot } from '../astro_fCW-vF1L.mjs';
import 'kleur/colors';
import 'clsx';
import { a as al, $ as $$BaseLayout } from './donate_1vqIitFd.mjs';

const $$Astro$4 = createAstro();
const $$CreateProcessLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$CreateProcessLayout;
  const { step } = Astro2.props;
  const processCookie = JSON.parse(Astro2.cookies.get("process")?.value || "{}");
  const {
    phases = "",
    title = ""
  } = processCookie;
  console.log(processCookie);
  const steps = [
    { stepNumber: 1, href: "/create" },
    { stepNumber: 2, href: "/create/phases", disabled: !title },
    { stepNumber: 3, href: phases === "full" ? "/create/full-process" : "/create/voting-only", disabled: !title && !phases },
    { stepNumber: 4, href: "/create/review", disabled: !title && !phases }
  ];
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": al("setup.process"), "description": al("description") }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 class="text-center">${al("setup.process")}</h1> <div class="flex justify-center space-x-2 m-2"> ${steps.map(({ stepNumber, href, disabled }) => renderTemplate`<a${addAttribute(href, "href")}${addAttribute(disabled ? "pointer-events-none" : "", "class")}> <div${addAttribute(`w-4 h-4 rounded-full ${step === stepNumber ? "bg-linkbg ring ring-blue-300" : step > stepNumber ? "bg-linkbg" : "bg-gray-300"} ${disabled ? "bg-gray-500" : ""}`, "class")}></div> </a>`)} </div> ${renderSlot($$result2, $$slots["default"])} ` })}`;
}, "/home/wao/Meteor/Workspace/Nao/evotico/src/layouts/CreateProcessLayout.astro", void 0);

const $$Astro$3 = createAstro();
const $$DatetimePicker = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$DatetimePicker;
  const { phase, index } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="flex flex-col justify-center items-center"> <form action="/api/date-change" method="POST"> <input type="hidden" name="phase"${addAttribute(phase, "value")}> <input type="hidden" name="index"${addAttribute(index.toString(), "value")}> <input type="datetime-local" name="date"> <button type="submit">Set Date</button> </form> </div>`;
}, "/home/wao/Meteor/Workspace/Nao/evotico/src/components/datetime/DatetimePicker.astro", void 0);

const $$Astro$2 = createAstro();
const $$DatetimeSlider = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$DatetimeSlider;
  const { phase } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "datetime-slider", "datetime-slider", { "data-phase": phase }, { "default": () => renderTemplate` ${maybeRenderHead()}<span>${al("duration")}:&nbsp;</span> <span id="duration" class="text-success"></span> <br> <input type="range" min="1" max="184" class="range"> ` })} `;
}, "/home/wao/Meteor/Workspace/Nao/evotico/src/components/datetime/DatetimeSlider.astro", void 0);

const $$Astro$1 = createAstro();
const $$TimeSelector = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$TimeSelector;
  const { phase } = Astro2.props;
  const title = al(`phases.${phase}.title`);
  return renderTemplate`${maybeRenderHead()}<div> <h3 class="title">${title}</h3> <h4>${al(`phases.startAt`)}:</h4> ${renderComponent($$result, "DatetimePicker", $$DatetimePicker, { "phase": phase, "index": 0 })} <h4>${al(`phases.endsAt`)}:</h4> ${renderComponent($$result, "DatetimePicker", $$DatetimePicker, { "phase": phase, "index": 1 })} ${renderComponent($$result, "DatetimeSlider", $$DatetimeSlider, { "phase": phase })} <br> </div>`;
}, "/home/wao/Meteor/Workspace/Nao/evotico/src/components/datetime/TimeSelector.astro", void 0);

const $$Astro = createAstro();
const $$FullProcess = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$FullProcess;
  return renderTemplate`${renderComponent($$result, "CreateProcessLayout", $$CreateProcessLayout, { "step": 3 }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h2 class="flex justify-center mt-4">${al("process.timeLeftHeading")}</h2> <br> ${renderComponent($$result2, "TimeSelector", $$TimeSelector, { "phase": "proposal" })} ${renderComponent($$result2, "TimeSelector", $$TimeSelector, { "phase": "voting" })} ` })} `;
}, "/home/wao/Meteor/Workspace/Nao/evotico/src/pages/create/full-process.astro", void 0);

const $$file = "/home/wao/Meteor/Workspace/Nao/evotico/src/pages/create/full-process.astro";
const $$url = "/create/full-process";

const fullProcess = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$FullProcess,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$CreateProcessLayout as $, $$FullProcess as a, $$TimeSelector as b, fullProcess as f };
