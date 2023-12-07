/* empty css                          */
import { e as createAstro, f as createComponent, r as renderTemplate, m as maybeRenderHead, s as spreadAttributes, g as addAttribute, u as unescapeHTML, h as renderComponent, F as Fragment, i as renderHead, j as renderSlot } from '../astro_fCW-vF1L.mjs';
import 'kleur/colors';
import 'clsx';
import { optimize } from 'svgo';
/* empty css                                 */

var Hn = Object.defineProperty;
var Xn = (e, t, r) => t in e ? Hn(e, t, { enumerable: true, configurable: true, writable: true, value: r }) : e[t] = r;
var de = (e, t, r) => (Xn(e, typeof t != "symbol" ? t + "" : t, r), r), ye = (e, t, r) => {
  if (!t.has(e))
    throw TypeError("Cannot " + r);
};
var l = (e, t, r) => (ye(e, t, "read from private field"), r ? r.call(e) : t.get(e)), d = (e, t, r) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, r);
}, R = (e, t, r, n) => (ye(e, t, "write to private field"), n ? n.call(e, r) : t.set(e, r), r);
var T = (e, t, r) => (ye(e, t, "access private method"), r);
var L = "astro-i18n", gr = `${L}.config`, we = "github.com/alexandre-fernandez/astro-i18n/issues";
var Re = class extends Error {
  constructor(t) {
    super(t ? `${L}: Unreachable code executed (at "${t}"), please open an issue at "${we}".` : `${L}: Unreachable code executed, please open an issue at "${we}".`);
  }
}, hr = Re;
function m() {
  throw new hr();
}
function dr(e = new Error("Something went wrong.")) {
  throw e;
}
var Ft, yr, ut = class {
  constructor(t) {
    d(this, Ft);
    de(this, "regexp");
    this.regexp = new RegExp(t.source, t.flags);
  }
  static fromString(t, r) {
    return new ut(new RegExp(t, r));
  }
  get source() {
    return this.regexp.source;
  }
  get flags() {
    return this.regexp.flags;
  }
  add(t) {
    return this.regexp = new RegExp(`${this.regexp.source}${t.source}`, this.regexp.flags), this;
  }
  test(t) {
    return this.regexp.test(t);
  }
  exec(t, r) {
    let n = T(this, Ft, yr).call(this, t), s = n.next();
    for (; !s.done && r(s.value) !== ut.BREAK; )
      s = n.next();
    return this;
  }
  match(t) {
    let r = null;
    return this.exec(t, (n) => (r = n, ut.BREAK)), r;
  }
  clone() {
    return new ut(new RegExp(this.regexp.source, this.regexp.flags));
  }
  toMatcher() {
    return this.match.bind(this);
  }
}, Mt = ut;
Ft = /* @__PURE__ */ new WeakSet(), yr = function* (t) {
  let r = this.regexp;
  r.flags.includes("g") || (r = new RegExp(this.regexp.source, `${this.regexp.flags}g`));
  let n = r.exec(t);
  for (; n !== null; )
    n && (yield { range: [n.index, n.index + n[0].length], match: [...n] }), n = r.exec(t);
}, de(Mt, "BREAK", "break");
var u = Mt;
var Tt = class {
  #e;
  #t;
  constructor({ source: t, flags: r }) {
    this.#e = t, this.#t = r;
  }
  static fromRegex(t) {
    return new Tt(t.regexp);
  }
  appendPattern(t) {
    return this.#e = `${this.#e}${t}`, this;
  }
  matchTrimifiable() {
    return this.#e = `\\s*${this.#e}\\s*`, this;
  }
  assertStarting() {
    return this.#e = `^${this.#e}`, this;
  }
  assertEnding() {
    return this.#e = `${this.#e}$`, this;
  }
  addGroup() {
    return this.#e = `(${this.#e})`, this;
  }
  addGlobalFlag() {
    return this.#t.includes("g") || (this.#t = `${this.#t}g`), this;
  }
  build() {
    return new u(new RegExp(this.#e, this.#t));
  }
}, N = Tt;
function z(e, t, r) {
  if (!t(e)) {
    let n = "";
    throw e ? typeof e == "object" ? n = `
${e.constructor.name}
${JSON.stringify(e, null, 4)}` : typeof e == "symbol" ? n = `Symbol("${e.description}")` : n = typeof e == "string" ? `"${e}"` : `${e}` : n = `${e}`, !r && t.name.startsWith("is") && (r = t.name.slice(2)), new TypeError(r ? `Unexpected type (expecting \`${r}\`), found: ${n}` : `Unexpected type, found: ${n}`);
  }
}
function wr(e) {
  return typeof e == "number" && !Number.isNaN(e);
}
function Rr(e) {
  return e instanceof Date && !Number.isNaN(e.getTime());
}
function rt(e) {
  return Array.isArray(e);
}
function Y(e) {
  return rt(e) && e.every((t) => typeof t == "string");
}
function p(e) {
  return !!e && typeof e == "object";
}
function xe(e) {
  return p(e) ? Object.getPrototypeOf(e) === Object.prototype : false;
}
var pt, nt, At, bt = class {
  static get path() {
    return T(this, nt, At).call(this, "path");
  }
  static get posix() {
    return this.path.then(({ posix: t }) => t);
  }
  static get fs() {
    return T(this, nt, At).call(this, "fs");
  }
  static get url() {
    return T(this, nt, At).call(this, "url");
  }
  static get module() {
    return T(this, nt, At).call(this, "module");
  }
};
pt = /* @__PURE__ */ new WeakMap(), nt = /* @__PURE__ */ new WeakSet(), At = async function(t) {
  if (l(this, pt)[t])
    return l(this, pt)[t];
  let r = await import(`node:${t}`);
  return l(this, pt)[t] = r, r;
}, d(bt, nt), d(bt, pt, {});
var A = bt;
async function mt(e) {
  let { sep: t, posix: r } = await A.path;
  return e.split(t).join(r.sep);
}
async function st(e) {
  let t = await Zn(e), r = e.split(t);
  return r.pop(), r.join(t);
}
function xr(e) {
  switch (e) {
    case "":
      return true;
    case "/":
      return true;
    case "\\":
      return true;
    default:
      return !/[/\\]/.test(e);
  }
}
async function Zn(e) {
  let { sep: t } = await A.path, r = e.split("/").length - 1, n = e.split("\\").length - 1;
  return r > n ? "/" : n > r ? "\\" : t;
}
function I(e, t, r) {
  let { mode: n, mutable: s } = { mode: "replace", mutable: true, ...r }, i = s ? e : structuredClone(e);
  for (let [o, c] of Object.entries(t)) {
    let a = i[o];
    if (Object.hasOwn(i, o)) {
      Te(a) && Te(c) ? I(a, c) : n === "replace" && (i[o] = t[o]);
      continue;
    }
    i[o] = t[o];
  }
  return s ? void 0 : i;
}
function H(e, t, r) {
  let n = typeof t == "string" ? [t] : t, s = e;
  for (let [i, o] of n.entries()) {
    if (i === n.length - 1) {
      s[o] = r;
      break;
    }
    Te(s[o]) || (s[o] = {}), s = s[o];
  }
}
function Te(e) {
  return typeof e != "object" ? false : Object.getPrototypeOf(e) === Object.prototype;
}
var be = class extends Error {
  constructor(t) {
    super(t ? `Peer dependency \`${t}\` was not found, if it's not already done try installing it.` : "A dependency was not found.");
  }
}, Tr = be;
var Ae = class extends Error {
  constructor(t) {
    super(t ? `No file was found for the given path (${t}).` : "No file was found for the given path.");
  }
}, Pe = Ae;
var Ee = class extends Error {
  constructor(t = []) {
    super(t.length > 0 ? `Invalid file type, supported formats are: "${t.join('", "')}"` : "Invalid file type, format not supported.");
  }
}, Se = Ee;
var Oe = class extends Error {
  constructor(t) {
    super(t ? `Invalid format, could not parse JSON (${t}).` : "Invalid format, could not parse JSON.");
  }
}, br = Oe;
async function V(e) {
  if (!e)
    return false;
  let { existsSync: t, lstatSync: r } = await A.fs;
  return t(e) && r(e).isDirectory();
}
async function gt(e) {
  if (!e)
    return false;
  let { existsSync: t, lstatSync: r } = await A.fs;
  return t(e) && !r(e).isDirectory();
}
async function Ar(e) {
  let { accessSync: t, constants: r } = await A.fs;
  try {
    return t(e, r.R_OK), true;
  } catch {
    return false;
  }
}
async function Ne(e, t) {
  let { readdirSync: r } = await A.fs, n = r(e);
  await t(await mt(e), n);
  for (let s of n) {
    let i = `${e}/${s}`;
    await V(i) && await Ne(i, t);
  }
}
async function Pr(e) {
  let t = null;
  t = await import('esbuild');
  let r = /\.(js|cjs|mjs|ts)$/;
  if (!gt(e))
    throw new Pe(e);
  if (!r.test(e))
    throw new Se(["js", "cjs", "mjs", "ts"]);
  try {
    let { outputFiles: n } = await t.build({ entryPoints: [e], bundle: true, external: ["esbuild"], format: "cjs", platform: "node", write: false }), s = new TextDecoder().decode(n[0]?.contents);
    return s ? Qn(s, e.replace(r, ".cjs")) : {};
  } catch {
    throw new Tr("esbuild");
  }
}
async function X(e) {
  if (!gt(e))
    throw new Pe(e);
  if (!/\.json$/.test(e))
    throw new Se(["json"]);
  let { readFileSync: t } = await A.fs, r = t(e, { encoding: "utf8" });
  try {
    return JSON.parse(r);
  } catch {
    throw new br(e);
  }
}
async function Qn(e, t) {
  let { Module: r } = await A.module, n = t.split("/").slice(0, -1).join("/"), s = { module: new r(t), require(i) {
    return this.module.require(i);
  } };
  return s.module.paths = r._nodeModulePaths(n), s.module.filename = t, s.module.exports = {}, s.require = (i) => s.module.require(i), Object.assign(s.require, { resolve: (i) => r._resolveFilename(i, s.module) }), new Function("exports", "require", "module", "__filename", "__dirname", e)(s.module.exports, s.require, s.module, t, n), s.module.exports;
}
var $ = "break", Er = ["json", "js", "cjs", "mjs", "ts"], Pt = "i18n", Z = "pages";
var _e = class extends Error {
  constructor() {
    super(`Could not find astro "${Z}" directory.`);
  }
}, Sr = _e;
var Or = new u(/(\/[^\s/]+)?(\/[^\s/]+)\.astro$/), Dt = new u(/^---\n([\S\s]+)\n---\n/), Nr = new u(/export\s*(?:const\s+prerender|var\s+prerender|let\s+prerender|prerender)(?:\s*=\s*)?(true|false)?|export\s*?{\s*?prerender\s*?}/), _r = new u(/export\s+(?:async\s+)?(?:function\s+|const\s+|var\s+|let\s+)getStaticPaths|export\s*{\s*getStaticPaths\s*}/);
var Le = class {
  #e;
  #t;
  #r;
  #a;
  #c;
  #o = void 0;
  #n = void 0;
  #s = null;
  #i = null;
  constructor({ name: t, route: r, path: n, translations: s, routes: i }) {
    this.#e = t, this.#t = r, this.#r = n, this.#a = s, this.#c = i;
  }
  get name() {
    return this.#e;
  }
  get route() {
    return this.#t;
  }
  get path() {
    return this.#r;
  }
  get translations() {
    return this.#a;
  }
  get routes() {
    return this.#c;
  }
  async getContent() {
    if (this.#s)
      return this.#s;
    let { readFileSync: t } = await A.fs;
    return this.#s = t(this.#r, { encoding: "utf8" }), this.#i = Dt.match(this.#s)?.match[0] || null, this.#s;
  }
  async getFrontmatter() {
    return this.#i ? this.#i : (this.getContent(), this.#i);
  }
  async hasGetStaticPaths() {
    if (typeof this.#o < "u")
      return this.#o;
    let { readFileSync: t } = await A.fs, r = t(this.#r, { encoding: "utf8" }), n = Dt.match(r)?.match[0];
    return this.#o = n ? _r.test(n) : false, this.#o;
  }
  async prerender() {
    if (typeof this.#n < "u")
      return this.#n;
    let { readFileSync: t } = await A.fs, r = t(this.#r, { encoding: "utf8" }), n = Dt.match(r)?.match[0];
    if (!n)
      return this.#n = false, this.#n;
    let { match: s } = Nr.match(n) || {};
    return s ? s[1] ? this.#n = s[1] === "true" : this.#n = true : this.#n = null, this.#n;
  }
  async getProxy(t, r) {
    let n = this.path.lastIndexOf("src/pages");
    if (n = n < 0 ? null : n + 9, !n)
      return null;
    let s = "";
    t = t.replace(/\/$/, "") || "/";
    let i = this.#r.slice(n), o = t.split("/").length - 1, c = `${"../".repeat(o)}${i.slice(1)}`;
    if (s += `---
import Page from "${c}"
`, await this.hasGetStaticPaths()) {
      let { locale: f, route: h } = r.internals.splitLocaleAndRoute(t);
      s += `import { getStaticPaths as proxyGetStaticPaths } from "${c}"
/* @ts-ignore */
export const getStaticPaths = (props) => proxyGetStaticPaths({ ...props, astroI18n: `, s += `{ locale: "${f}", route: "${h}", primaryLocale: "${r.primaryLocale}", secondaryLocales: ["${r.secondaryLocales.join('", "')}"] } })
`;
    }
    let a = await this.prerender();
    return typeof a == "boolean" && (s += a ? `export const prerender = true
` : `export const prerender = false
`), s += `const { props } = Astro
---
<Page {...props} />`, s;
  }
}, Ce = Le;
var ke = class extends Error {
  constructor(t) {
    super(t ? `Invalid pattern (${t.source}) given, the pattern should match the route name at index 1 (optional), the route locale at index 2 and the translated name at index 3 (optional).` : "Invalid pattern given, the pattern should match the route name at index 1 (optional), the route locale at index 2 and the translated name at index 3 (optional).");
  }
}, Lr = ke;
function G(e, t = true) {
  if (t) {
    if (!p(e))
      return false;
    for (let r of Object.values(e))
      if (!G(r, false))
        return false;
    return true;
  }
  if (typeof e == "string")
    return true;
  if (!p(e))
    return false;
  for (let r of Object.values(e))
    if (!G(r, false))
      return false;
  return true;
}
async function kr(e, t = {}) {
  let { join: r } = await A.path, n = `${e}/src/${Z}`;
  if (!await V(n))
    throw new Sr();
  let s = {}, i = (t.secondaryLocales || []).map((y) => `/src/${Z}/${y}`), o = { i18n: Pt, pages: Pt, ...t.translationDirectory }, c = [t.primaryLocale || "en", ...t.secondaryLocales || []], a = u.fromString(`(\\/[^\\/\\s]+)?(?:\\/_?${o.pages})?\\/_?(${c.join("|")})(\\.[^\\.\\s]+)?\\.json$`), f = u.fromString(`_?${o.pages}`), h = t.showPrimaryLocale ? r(n, t.primaryLocale || "en") : n;
  await Ne(h, async (y, O) => {
    if (!i.some((b) => y.includes(b)))
      for (let b of O) {
        let P = `${y}/${b}`;
        if (await V(P))
          continue;
        let x = P.replace(n, "");
        if (x.endsWith(".astro")) {
          let { match: U, range: he } = Or.match(x) || {};
          if (!U || !U[2] || !he)
            continue;
          let q = "index", ft = "/";
          if (U[1] ? U[2] === "/index" ? (q = U[1].replace("/", ""), ft = `${x.slice(0, he[0])}/${q}`) : (q = U[2].replace("/", ""), ft = `${x.slice(0, he[0] + U[1].length)}/${q}`) : U[2] !== "/index" && (q = U[2].replace("/", ""), ft = `/${q}`), q.startsWith("_"))
            continue;
          s[ft] = { ...s[ft], name: q, route: ft, path: P };
          continue;
        }
        if (!x.endsWith(".json"))
          continue;
        let { match: C, range: jt } = a.match(x) || {};
        if (!C || !jt)
          continue;
        let D = `${x.slice(0, jt[0])}${C[1] || "/"}`;
        f.test(D) && (D = "/");
        let vt = C[2] || m(), pr = D.split("/").slice(-1).join("") || "index", mr = C[3] ? C[3].replace(".", "") : null, ge = await X(P);
        z(ge, G, `${vt}.PageTranslations`), I(ge, s[D]?.translations?.[vt] || {});
        let qn = { ...s[D]?.translations, [vt]: ge }, Yn = mr ? { ...s[D]?.routes, [vt]: { [pr]: mr } } : { ...s[D]?.routes };
        s[D] = { ...s[D], name: pr, route: D, translations: qn, routes: Yn };
      }
  });
  let g = [];
  for (let y of Object.values(s))
    !y.path || !y.name || !y.route || g.push({ translations: {}, routes: {}, ...y });
  let w = `${e}/src/${o.i18n}/${Z}`;
  if (!await V(w))
    return g.map((y) => new Ce(y));
  for (let y of g) {
    let O = `${w}${y.route}`.replace(/\/$/, "");
    if (!await V(O))
      continue;
    let b = await Cr(O, y.name, a);
    for (let { translations: P, routes: x } of b)
      I(y.translations, P), I(y.routes, x);
    if (O = `${O}/${o.pages}`, !!await V(O)) {
      b = await Cr(O, y.name, a);
      for (let { translations: P, routes: x } of b)
        I(y.translations, P), I(y.routes, x);
    }
  }
  return g.map((y) => new Ce(y));
}
async function Cr(e, t, r) {
  let { readdirSync: n } = await A.fs, s = [];
  for (let i of n(e, { encoding: "utf8" })) {
    let { match: o } = r.match(`/${i}`) || {};
    if (!o)
      continue;
    let c = o[2] || dr(new Lr()), a = o[3] ? o[3].replace(".", "") : null, f = await X(`${e}/${i}`);
    z(f, G, `${c}.PageTranslations`), s.push({ translations: { [c]: f }, routes: a ? { [c]: { [t]: a } } : {} });
  }
  return s;
}
var Ie = class extends Error {
  constructor(t) {
    super(t ? `Unable to find project root. ${t}` : "Unable to find project root.");
  }
}, Ir = Ie;
var $r = u.fromString(`${L}\\.config\\.(${Er.join("|")})`), jr = u.fromString("astro\\.config\\.(js|cjs|mjs|ts)");
var vr = new u(/[/\\]?node_modules/), Mr = new u(/.+?node_modules/), Fr = new u(/(?:package|deno)\.json/), Dr = new u(/package\.json/), Vr = new u(/deno\.jsonc?/), Ur = new u(/deps\.ts/);
var Vt = ".", B = "common";
var ts = N.fromRegex($r).assertEnding().build(), zr = N.fromRegex(jr).assertEnding().build();
function Gr(e) {
  let t = { routes: [], extra: [], common: void 0 };
  for (let r of Object.keys(e)) {
    if (r.startsWith("/")) {
      t.routes.push(r);
      continue;
    }
    if (r === B) {
      t.common = B;
      continue;
    }
    t.extra.push(r);
  }
  return t;
}
async function Br(e, t = {}) {
  let r = `${e}/src/${t.translationDirectory?.i18n || Pt}`, n = {};
  if (!await V(r))
    return n;
  let { readdirSync: s } = await A.fs, i = [t.primaryLocale || "en", ...t.secondaryLocales || []], o = u.fromString(`(${i.join("|")})\\.json`);
  for (let c of s(r)) {
    if (c === Z)
      continue;
    let a = `${r}/${c}`;
    if (await V(a))
      for (let f of s(a)) {
        let { match: h } = o.match(f) || {};
        if (!h?.[1])
          continue;
        let g = h[1], w = await X(`${a}/${f}`);
        z(w, G, `${g}.GroupTranslations`), H(n, [c, g], w);
      }
  }
  return n;
}
async function Ut(e) {
  return ht(Wr(e), ts.regexp);
}
async function Jr(e) {
  let t = await ht(Wr(e), zr.regexp);
  if (!t)
    return null;
  let { readdirSync: r } = await A.fs, n = await st(t), s = r(n), i = s.find((a) => Dr.test(a));
  if (i) {
    let a = await X(`${n}/${i}`);
    if (xe(a) && xe(a.dependencies) && a.dependencies[L])
      return n;
  }
  return s.find((a) => Vr.test(a)) || s.find((a) => Ur.test(a)) ? n : null;
}
async function Kr(e) {
  let { readdirSync: t } = await A.fs;
  return typeof t(e).find((r) => zr.test(r)) == "string";
}
function Wr(e) {
  let { match: t } = Mr.match(e) || {};
  return t ? t[0]?.replace(vr.regexp, "") || "/" : e;
}
async function ht(e, t, r = 1, n = true) {
  let { readdirSync: s } = await A.fs;
  if (await gt(e))
    return t.test(e) ? e : n ? ht(await st(e), t, 1, false) : null;
  if (!await Ar(e) || xr(e))
    return null;
  let i = s(e), o = i.find((a) => t.test(a));
  if (o)
    return `${e}/${o}`;
  if (r > 0 && !(typeof i.find((f) => Fr.test(f)) == "string"))
    return ht(await st(e), t, 1, false);
  let c = i.filter((a) => {
    switch (a) {
      case "node_modules":
        return false;
      case "src":
        return false;
      case "public":
        return false;
      case "dist":
        return false;
      case "build":
        return false;
      default:
        return !a.startsWith(".");
    }
  });
  for (let a of c) {
    let f = `${e}/${a}`;
    if (await gt(e))
      continue;
    let h = await ht(f, t, -1, false);
    if (typeof h == "string")
      return h;
  }
  return r > 0 ? ht(await st(e), t, 1, false) : null;
}
var $e = class extends Error {
  constructor() {
    super(`Unable to find ${gr}.`);
  }
}, qr = $e;
function Yr(e) {
  if (!p(e))
    return false;
  for (let t of Object.values(e)) {
    if (!p(t))
      return false;
    for (let r of Object.values(t))
      if (typeof r != "string")
        return false;
  }
  return true;
}
function Hr(e) {
  if (!p(e))
    return false;
  for (let t of Object.values(e)) {
    if (!p(t))
      return false;
    for (let r of Object.values(t))
      if (!G(r))
        return false;
  }
  return true;
}
function Xr(e) {
  if (!rt(e))
    return false;
  for (let t of e) {
    if (!p(t))
      return false;
    let r = Object.entries(t);
    if (r.length < 2)
      return false;
    for (let [n, s] of r)
      switch (n) {
        case "groups": {
          if (!Y(s))
            return false;
          break;
        }
        case "routes": {
          if (!Y(s))
            return false;
          break;
        }
        default:
          return false;
      }
  }
  return true;
}
function Zr(e) {
  if (!p(e))
    return false;
  for (let [t, r] of Object.entries(e))
    if (t !== "i18n" && t !== "pages" || typeof r != "string")
      return false;
  return true;
}
function Qr(e) {
  if (!p(e))
    return false;
  for (let [t, r] of Object.entries(e))
    switch (t) {
      case "primaryLocale": {
        if (typeof r != "string")
          return false;
        break;
      }
      case "secondaryLocales": {
        if (!Y(r))
          return false;
        break;
      }
      case "fallbackLocale": {
        if (typeof r != "string")
          return false;
        break;
      }
      case "showPrimaryLocale": {
        if (typeof r != "boolean")
          return false;
        break;
      }
      case "trailingSlash": {
        if (r !== "always" && r !== "never")
          return false;
        break;
      }
      case "run": {
        if (r !== "server" && r !== "client+server")
          return false;
        break;
      }
      case "translations": {
        if (!Hr(r))
          return false;
        break;
      }
      case "translationLoadingRules": {
        if (!Xr(r))
          return false;
        break;
      }
      case "translationDirectory": {
        if (!Zr(r))
          return false;
        break;
      }
      case "routes": {
        if (!Yr(r))
          return false;
        break;
      }
      default:
        return false;
    }
  return true;
}
function tn(e) {
  if (!p(e))
    return false;
  for (let [t, r] of Object.entries(e))
    switch (t) {
      case "primaryLocale": {
        if (typeof r != "string")
          return false;
        break;
      }
      case "secondaryLocales": {
        if (!Y(r))
          return false;
        break;
      }
      case "showPrimaryLocale": {
        if (typeof r != "boolean")
          return false;
        break;
      }
      case "trailingSlash": {
        if (r !== "always" && r !== "never")
          return false;
        break;
      }
      default:
        return false;
    }
  return true;
}
var je = class extends Error {
  constructor(t) {
    super(t ? `Your primaryLocale ("${t}") cannot be contained in your secondaryLocales array.` : "Your primaryLocale cannot be contained in your secondaryLocales array.");
  }
}, en = je;
var Et = class {
  primaryLocale;
  secondaryLocales;
  fallbackLocale;
  showPrimaryLocale;
  trailingSlash;
  run;
  translations;
  translationLoadingRules;
  translationDirectory;
  routes;
  path;
  constructor({ primaryLocale: t, secondaryLocales: r, fallbackLocale: n, showPrimaryLocale: s, trailingSlash: i, run: o, translations: c, translationLoadingRules: a, translationDirectory: f, routes: h } = {}, g = "") {
    if (this.primaryLocale = t || "en", this.secondaryLocales = r || [], this.fallbackLocale = n ?? (t || ""), this.showPrimaryLocale = s || false, this.trailingSlash = i || "never", this.run = o || "client+server", this.translations = c || {}, this.translationLoadingRules = a || [], this.translationDirectory = f || {}, this.routes = h || {}, this.path = g || "", this.secondaryLocales.includes(this.primaryLocale))
      throw new en(this.primaryLocale);
  }
  get pages() {
    return Object.keys(this.translations).filter((t) => t.startsWith("/"));
  }
  static async fromFilesystem(t = null) {
    let { fileURLToPath: r } = await A.url;
    if (!t) {
      let s = "";
      typeof process < "u" && (s = process.env.PWD || ""), t = await Ut(await mt(s));
    }
    if (!t) {
      let s = "";
      typeof process < "u" && (s = process.cwd()), t = await Ut(await mt(s));
    }
    if (!t) {
      let s = "";
      typeof import.meta == "object" && typeof import.meta.url == "string" ? s = r(import.meta.url) : typeof __filename == "string" && (s = __filename), s && (t = await Ut(await mt(s)));
    }
    if (!t)
      throw new qr();
    let n = t.endsWith(".json") ? await X(t) : (await Pr(t)).default;
    return z(n, Qr, "AstroI18nConfig"), new Et(n, t).loadFilesystemTranslations();
  }
  async loadFilesystemTranslations() {
    if (!this.path)
      return this;
    let t = await st(this.path);
    if (!await Kr(t)) {
      let s = await Jr(this.path);
      if (!s)
        throw new Ir();
      t = s;
    }
    let r = await kr(t, this);
    for (let s of r)
      this.translations[s.route] || (this.translations[s.route] = {}), I(this.translations[s.route] || m(), s.translations), this.routes || (this.routes = {}), I(this.routes, s.routes);
    let n = await Br(t, this);
    return I(this.translations, n), this;
  }
  toClientSideObject() {
    return { primaryLocale: this.primaryLocale, secondaryLocales: this.secondaryLocales, showPrimaryLocale: this.showPrimaryLocale, trailingSlash: this.trailingSlash };
  }
  toObject() {
    return { primaryLocale: this.primaryLocale, secondaryLocales: this.secondaryLocales, fallbackLocale: this.fallbackLocale, showPrimaryLocale: this.showPrimaryLocale, trailingSlash: this.trailingSlash, run: this.run, translations: this.translations, translationLoadingRules: this.translationLoadingRules, translationDirectory: this.translationDirectory, routes: this.routes };
  }
  toString() {
    return JSON.stringify(this.toObject(), null, "	");
  }
}, dt = Et;
var rn = ((n) => (n.NONE = "none", n.NODE = "node", n.BROWSER = "browser", n))(rn || {}), ot = rn;
var rs = new u(/[$A-Z_a-z]/), zt = N.fromRegex(rs).appendPattern("[\\w$]*").build(), nn = new u(/-?\d+(?:\.\d+)?/), sn = new u(/^\s*$/), ve = new u(/{{(.+)}}/), Gt = new u(/{#(.+)#}/), on = u.fromString(`\\(\\s*(${zt.source})\\s*\\)`), an = u.fromString(`>\\s*(${zt.source})\\s*(\\()?`), cn = new u(/(?:function)?\s*[\w$]*\s*\(([\S\s]*?)\)\s*(?:=>)?\s*{?([\S\s]*)/);
var Me = class extends Error {
  constructor(t = "") {
    if (t) {
      let n = t.slice(0, 20);
      n.length === 20 && (t = `${n.slice(0, 20 - 3)}...`);
    }
    super(t ? `Cannot parse unknown value (${t}).` : "Cannot parse unknown value");
  }
}, Bt = Me;
var Fe = class extends Error {
  constructor(t = "") {
    super(t ? `Cannot procces untrimmed value ("${t}").` : "Cannot procces untrimmed value");
  }
}, Jt = Fe;
var Kt = N.fromRegex(nn).assertStarting().build().toMatcher(), Wt = N.fromRegex(zt).assertStarting().build().toMatcher();
function ln(e) {
  return sn.test(e) ? { range: [0, 0], match: [""] } : null;
}
function qt(e) {
  return e.startsWith("undefined") ? { range: [0, 9], match: ["undefined"] } : null;
}
function Yt(e) {
  return e.startsWith("null") ? { range: [0, 4], match: ["null"] } : null;
}
function Ht(e) {
  return e.startsWith("true") ? { range: [0, 4], match: ["true"] } : e.startsWith("false") ? { range: [0, 5], match: ["false"] } : null;
}
function Xt(e) {
  let t = e[0];
  if (t !== '"' && t !== "'" && t !== "`")
    return null;
  let r = e.slice(1).indexOf(t);
  return r === -1 ? null : (r += 2, { range: [0, r], match: [e.slice(0, r)] });
}
function fn(e) {
  if (!e.startsWith("{"))
    return null;
  let t = 0;
  for (let r = 0; r < e.length; r += 1) {
    let n = e[r];
    if (n === "{" ? t += 1 : n === "}" && (t -= 1), t === 0) {
      let s = r + 1;
      return { range: [0, s], match: [e.slice(0, s)] };
    }
  }
  return null;
}
function Zt(e) {
  if (!e.startsWith("["))
    return null;
  let t = 0;
  for (let r = 0; r < e.length; r += 1) {
    let n = e[r];
    if (n === "[" ? t += 1 : n === "]" && (t -= 1), t === 0) {
      let s = r + 1;
      return { range: [0, s], match: [e.slice(0, s)] };
    }
  }
  return null;
}
function j(e, t) {
  let r = 0, n = false, s = null;
  for (let i = 0; i < e.length; i += 1) {
    let o = e[i] || m(), c = o === '"' || o === "'" || o === "`", a = false, f = false;
    if (o === "{" || o === "[" ? (r += 1, a = true) : o === "}" || o === "]" ? (r -= 1, f = true) : !n && c ? (r += 1, n = true, s = o, a = true) : n && o === s && (r -= 1, n = false, s = null, f = true), t(o, i, r, a, f) === $)
      break;
  }
}
var ns = N.fromRegex(on).assertStarting().build().toMatcher(), ss = N.fromRegex(an).assertStarting().build().toMatcher();
function Ve(e) {
  e = e.trim();
  let t = e, { value: r, type: n, end: s } = os(e);
  e = e.slice(s).trim();
  let i = null, o = ns(e);
  if (o) {
    let { match: a, range: f } = o;
    i = a[1] || m(), e = e.slice(f[1]).trim();
  }
  let c = [];
  for (; e.length > 0; ) {
    e[0] === ")" && (e = e.slice(1));
    let { match: a, range: f } = ss(e) || {};
    if (!a?.[1] || !f)
      break;
    if (e = e.slice(f[1]).trim(), !a[2]) {
      c.push({ name: a[1], args: [] });
      continue;
    }
    let { args: h, end: g } = is(e);
    e = e.slice(g).trim(), c.push({ name: a[1], args: h });
  }
  return { raw: t, value: r, type: n, alias: i, formatters: c };
}
function it(e) {
  let t = [];
  e = e.trim();
  let { type: r, value: n, alias: s, formatters: i } = Ve(e);
  for (let o of i)
    for (let c of o.args)
      for (let a of it(c))
        t.push(a);
  switch (r) {
    case 4: {
      t.push(s || n);
      break;
    }
    case 6: {
      let o = "", c = true;
      j(e, (a, f, h, g) => {
        if (h === 0) {
          for (let w of it(o))
            t.push(w);
          return $;
        }
        if (c) {
          if (g && a === "{" || /\s/.test(a))
            return null;
          if (a === ":")
            return c = false, null;
        } else if (a === ",") {
          for (let w of it(o))
            t.push(w);
          return o = "", c = true, null;
        }
        return c || (o += a), null;
      });
      break;
    }
    case 7: {
      let o = "";
      j(e, (c, a, f, h) => {
        if (f === 0) {
          for (let g of it(o))
            t.push(g);
          return $;
        }
        if (h && c === "[")
          return null;
        if (c === ",") {
          for (let g of it(o))
            t.push(g);
          return o = "", null;
        }
        return o += c, null;
      });
      break;
    }
  }
  return t;
}
function os(e) {
  if (/^\s+\S/.test(e))
    throw new Jt(e);
  let t = ln(e);
  if (t)
    return { value: "undefined", type: 0, end: t.range[1] };
  if (t = qt(e), t)
    return { value: t.match[0] || m(), type: 0, end: t.range[1] };
  if (t = Yt(e), t)
    return { value: t.match[0] || m(), type: 1, end: t.range[1] };
  if (t = Ht(e), t)
    return { value: t.match[0] || m(), type: 2, end: t.range[1] };
  if (t = Kt(e), t)
    return { value: t.match[0] || m(), type: 3, end: t.range[1] };
  if (t = Wt(e), t)
    return { value: t.match[0] || m(), type: 4, end: t.range[1] };
  if (t = Xt(e), t)
    return { value: t.match[0] || m(), type: 5, end: t.range[1] };
  if (t = fn(e), t)
    return { value: t.match[0] || m(), type: 6, end: t.range[1] };
  if (t = Zt(e), t)
    return { value: t.match[0] || m(), type: 7, end: t.range[1] };
  throw new Bt(e);
}
function is(e) {
  let t = { args: [], end: 0 }, r = "", n = false;
  return j(e, (s, i, o) => (s === "(" && (n = true), o > 0 ? (r += s, null) : s === "," ? (t.args.push(r.trim()), r = "", null) : s === ")" ? (n && (r += s), t.args.push(r.trim()), t.end = i + 1, r = "", $) : (r += s, null))), t;
}
function un(e, t, r, n, s, i) {
  let o;
  switch (r) {
    case 0: {
      o = void 0;
      break;
    }
    case 1: {
      o = null;
      break;
    }
    case 2: {
      if (e === "true") {
        o = true;
        break;
      }
      if (e === "false") {
        o = false;
        break;
      }
    }
    case 3: {
      o = e.includes(".") ? Number.parseFloat(e) : Number.parseInt(e, 10);
      break;
    }
    case 4: {
      if (t) {
        o = s[t];
        break;
      }
      o = s[e];
      break;
    }
    case 5: {
      o = e.slice(1, -1);
      break;
    }
    case 6: {
      o = as(e, s, i);
      break;
    }
    case 7: {
      o = cs(e, s, i);
      break;
    }
    default:
      throw new Bt(e);
  }
  for (let { name: c, args: a } of n) {
    let f = i[c];
    if (!f)
      return;
    let h = a.map((g) => new Q(g, s, i).value);
    o = f(o, ...h);
  }
  return o;
}
function as(e, t, r) {
  let n = {}, s = "", i = "", o = true;
  return j(e, (c, a, f, h) => {
    if (f === 0)
      return n[s] = new Q(i, t, r).value, $;
    if (f === 1) {
      if (o) {
        if (h || /\s/.test(c))
          return null;
        if (c === ":")
          return o = false, null;
        s += c;
      } else if (c === ",")
        return n[s] = new Q(i, t, r).value, s = "", i = "", o = true, null;
    }
    return o || (i += c), null;
  }), n;
}
function cs(e, t, r) {
  let n = [], s = "";
  return j(e, (i, o, c, a) => {
    if (c === 0)
      return n.push(new Q(s, t, r).value), $;
    if (c === 1) {
      if (a)
        return null;
      if (i === ",")
        return n.push(new Q(s, t, r).value), s = "", null;
    }
    return s += i, null;
  }), n;
}
var Ue = class {
  raw;
  value;
  alias = null;
  constructor(t, r, n) {
    let { raw: s, value: i, type: o, alias: c, formatters: a } = Ve(t);
    this.raw = s, this.alias = c, this.value = un(i, c, o, a, r, n);
  }
}, Q = Ue;
var ze = class extends Error {
  constructor(t) {
    super(t ? `Variant priority must be of type number (found: (${t})).` : "Variant priority must be of type number.");
  }
}, pn = ze;
var Ge = class extends Error {
  constructor(t) {
    super(t ? `Invalid variant property key (${t}), it must be a valid variable name.` : "Invalid variant property value, it must be a valid variable name.");
  }
}, mn = Ge;
var gn = "undefined, null, number, string, boolean and flat arrays of these types.", Be = class extends Error {
  constructor(t) {
    super(t ? `Invalid variant property value (${t}), accepted types are: ${gn}.` : `Invalid variant property value, accepted types are: ${gn}.`);
  }
}, at = Be;
function St(e) {
  if (/^\s/.test(e))
    throw new Jt(e);
  let t = qt(e);
  if (t)
    return { value: t.match[0] || m(), type: 0, end: t.range[1] };
  if (t = Yt(e), t)
    return { value: t.match[0] || m(), type: 1, end: t.range[1] };
  if (t = Ht(e), t)
    return { value: t.match[0] || m(), type: 2, end: t.range[1] };
  if (t = Kt(e), t)
    return { value: t.match[0] || m(), type: 3, end: t.range[1] };
  if (t = Xt(e), t)
    return { value: t.match[0] || m(), type: 5, end: t.range[1] };
  if (t = Zt(e), t)
    return { value: t.match[0] || m(), type: 7, end: t.range[1] };
  throw new at(e);
}
function Je(e) {
  return e === null || typeof e > "u" || typeof e == "boolean" || typeof e == "number" || typeof e == "string";
}
function hn(e) {
  return Array.isArray(e) ? e.every((t) => Je(t)) : false;
}
function Ot(e, t) {
  let r;
  switch (t) {
    case 0: {
      r = void 0;
      break;
    }
    case 1: {
      r = null;
      break;
    }
    case 2: {
      if (e === "true") {
        r = true;
        break;
      }
      if (e === "false") {
        r = false;
        break;
      }
    }
    case 3: {
      r = e.includes(".") ? Number.parseFloat(e) : Number.parseInt(e, 10);
      break;
    }
    case 5: {
      r = e.slice(1, -1);
      break;
    }
    case 7: {
      r = ls(e);
      break;
    }
    default:
      throw new at(e);
  }
  return r;
}
function ls(e) {
  let t = [], r = "";
  return j(e, (n, s, i, o) => {
    if (i === 0) {
      let { value: c, type: a } = St(r.trim()), f = Ot(c, a);
      if (!Je(f))
        throw new at(r);
      return t.push(f), $;
    }
    if (i === 1) {
      if (o)
        return null;
      if (n === ",") {
        let { value: c, type: a } = St(r.trim());
        return t.push(Ot(c, a)), r = "", null;
      }
    }
    return r += n, null;
  }), t;
}
var dn = "$priority";
var Nt = class {
  raw;
  priority;
  properties;
  value;
  constructor({ raw: t, priority: r, properties: n, value: s } = {}) {
    this.raw = t || "", this.priority = r || 0, this.properties = n || [], this.value = s || "";
  }
  static fromString(t, r) {
    let n = new Nt();
    n.value = r;
    let s = t.trim();
    n.raw = s;
    let i = "", o = "", c = true;
    return j(s, (a, f, h) => {
      let g = f === s.length - 1;
      if (c)
        return /\s/.test(a) ? null : a === ":" ? (c = false, null) : (i += a, null);
      if (h > 0)
        return o += a, null;
      if (g && (o += a), a === "," || g) {
        let w = Wt(i.trim())?.match[0];
        if (!w)
          throw new mn(i);
        let { value: y, type: O } = St(o.trim());
        if (w === dn) {
          let x = Ot(y, O);
          if (typeof x != "number")
            throw new pn(y);
          return n.priority = x * 1e-3, null;
        }
        let b = Ot(y, O), P = Array.isArray(b) ? b : [b];
        if (!hn(P))
          throw new at(o);
        return n.properties.push({ name: w, values: P }), i = "", o = "", c = true, null;
      }
      return o += a, null;
    }), n;
  }
  calculateMatchingScore(t) {
    let r = 0;
    for (let { name: n, values: s } of this.properties) {
      if (!Object.hasOwn(t, n))
        continue;
      let i = t[n], o = [];
      for (let c of s) {
        if (typeof i == "number" && typeof c == "number") {
          let a = i - c;
          if (a === 0) {
            o.push(1e3);
            continue;
          }
          o.push(Math.abs(1e3 / a) - 1);
          continue;
        }
        i === c && o.push(1e3);
      }
      o.length !== 0 && (r += Math.max(...o));
    }
    return r > 0 ? r + this.priority : r;
  }
}, Qt = Nt;
var Ke = class extends Error {
  constructor() {
    super("Cannot use a variant on a key which value is not a string.");
  }
}, yn = Ke;
function We(e, t = "", r = {}) {
  for (let [n, s] of Object.entries(e)) {
    if (typeof s == "string") {
      let { match: i, range: o } = ve.match(n) || {};
      if (!i?.[1] || !o) {
        let a = `${t}${Vt}${n}`.replace(/^\./, "");
        if (r[a]) {
          r[a].default = s;
          continue;
        }
        r[a] = { default: s, variants: [] };
        continue;
      }
      let c = `${t}${Vt}${n.slice(0, o[0]) + n.slice(o[1])}`.replace(/^\./, "");
      if (r[c]) {
        r[c].variants.push(Qt.fromString(i[1], s));
        continue;
      }
      r[c] = { variants: [Qt.fromString(i[1], s)] };
      continue;
    }
    if (ve.test(n))
      throw new yn();
    We(s, `${t}${Vt}${n}`.replace(/^\./, ""), r);
  }
  return r;
}
function wn(e, t, r) {
  let n = [];
  Gt.exec(e, ({ match: i, range: o }) => {
    if (!i[1])
      return;
    let { value: c } = new Q(i[1], t, r);
    n.push({ value: fs(c), range: o });
  });
  let s = e;
  for (let i = n.length - 1; i >= 0; i -= 1) {
    let { value: o, range: c } = n[i] || m();
    s = s.slice(0, c[0]) + o + s.slice(c[1]);
  }
  return s;
}
function fs(e) {
  switch (typeof e) {
    case "undefined":
      return "";
    case "string":
      return e;
    case "bigint":
      return e.toString();
    case "number":
      return e.toString();
    case "boolean":
      return e.toString();
    case "symbol":
      return `Symbol(${e.description})` || "Symbol";
    case "function":
      return e.name;
    case "object":
      return e ? Object.hasOwn(e, "toString") && typeof e.toString == "function" ? e.toString() : JSON.stringify(e, null, "	") : "";
    default:
      return "";
  }
}
function Rn(e) {
  for (let t of Object.values(e))
    for (let r of Object.values(t))
      for (let n of Object.values(r))
        n.variants = n.variants.map((s) => new Qt(s));
  return e;
}
var yt = new u(/\[(\.{3})?([\w-]+)]/), xn = new u(/(?:https?:\/{2})?[\w#%+.:=@~-]{1,256}\.[\d()A-Za-z]{1,6}\b[\w#%&()+./:=?@~-]*/);
var _t = class {
  #e = {};
  #t;
  constructor(t = {}, r = {}) {
    this.#t = t, this.#e = r;
  }
  static fromConfig({ translations: t, translationLoadingRules: r }) {
    return new _t().addTranslations(t).addTranslationLoadingRules(r);
  }
  get(t, r, n, s = "", i = {}, o = {}, c = false) {
    let a = this.#r(t, r, n, c);
    !a && s && s !== n && (a = this.#r(t, r, s, c));
    let f = { score: 0, value: a?.default || t };
    for (let h of a?.variants || []) {
      let g = h.calculateMatchingScore(i);
      g > f.score && (f.score = g, f.value = h.value);
    }
    return wn(f.value, i, o);
  }
  getRouteGroups() {
    return Object.keys(this.#t).filter((t) => t.startsWith("/"));
  }
  getParamRouteGroups() {
    return Object.keys(this.#t).filter((t) => t.startsWith("/") && yt.test(t));
  }
  getLocaleTranslationVariables(t) {
    let r = {};
    for (let n of Object.values(this.#t)) {
      if (!n[t])
        continue;
      let s = Object.entries(n[t] || m());
      for (let [i, { default: o, variants: c }] of s) {
        let a = { interpolationVars: [], variantVars: [], isVariantRequired: false }, f = [];
        if (o === void 0 ? a.isVariantRequired = true : f.push(o), c.length > 0) {
          let b = {};
          for (let { value: P, properties: x } of c) {
            f.push(P);
            for (let { name: C, values: jt } of x)
              b[C] = [...b[C] || [], ...jt];
          }
          a.variantVars = Object.entries(b).map(([P, x]) => ({ name: P, values: x }));
        }
        for (let b of f)
          Gt.exec(b, ({ match: P }) => {
            P[1] && (a.interpolationVars = [.../* @__PURE__ */ new Set([...a.interpolationVars, ...it(P[1])])]);
          });
        if (!r[i]) {
          r[i] = a;
          continue;
        }
        let { interpolationVars: h, variantVars: g, isVariantRequired: w } = r[i] || {}, y = [.../* @__PURE__ */ new Set([...h || [], ...a.interpolationVars])], O = [];
        for (let b of a.variantVars) {
          let P = g?.find((x) => x.name === b.name);
          O.push(P ? { name: b.name, values: [.../* @__PURE__ */ new Set([...P?.values || [], ...b.values])] } : b);
        }
        r[i] = { interpolationVars: y, variantVars: O, isVariantRequired: (w || false) && a.isVariantRequired };
      }
    }
    return r;
  }
  addTranslations(t) {
    for (let [r, n] of Object.entries(t)) {
      let s = Object.entries(n);
      if (s.length === 0 && !this.#t[r]) {
        this.#t[r] = {};
        continue;
      }
      for (let [i, o] of s)
        H(this.#t, [r, i], We(o));
    }
    return this;
  }
  addTranslationLoadingRules(t) {
    if (t.length === 0)
      return this;
    let { routes: r } = Gr(this.#t);
    for (let n of t) {
      let s = [];
      for (let i of n.groups) {
        let o = u.fromString(i);
        s.push(...Object.keys(this.#t).filter((c) => o.test(c)));
      }
      for (let i of n.routes) {
        let o = u.fromString(i), c = r.filter((a) => o.test(a));
        for (let a of c) {
          if (!this.#e[a]) {
            this.#e[a] = [...new Set(s)];
            continue;
          }
          this.#e[a] = [.../* @__PURE__ */ new Set([...this.#e[a] || m(), ...s])];
        }
      }
    }
    return this;
  }
  clear() {
    this.#e = {}, this.#t = {};
  }
  toClientSideObject(t) {
    let r = {};
    if (this.#e[t])
      for (let n of this.#e[t] || m())
        r[n] = this.#t[n] || {};
    return this.#t[t] && (r[t] = this.#t[t] || {}), this.#t[B] && (r[B] = this.#t[B] || {}), r;
  }
  toObject() {
    return { loadDirectives: this.#e, translations: this.#t };
  }
  toString() {
    return JSON.stringify(this.toObject(), null, "	");
  }
  #r(t, r, n, s = false) {
    let i = null;
    if (s) {
      let o = this.getRouteGroups();
      for (let c of o)
        for (let a of this.#e[c] || []) {
          let f = this.#t[a]?.[n]?.[t];
          if (f) {
            i = f;
            break;
          }
        }
      if (!i)
        for (let c of o)
          this.#t[c]?.[n]?.[t] && (i = this.#t[c]?.[n]?.[t] || m());
    } else {
      for (let o of this.#e[r] || []) {
        let c = this.#t[o]?.[n]?.[t];
        if (c) {
          i = c;
          break;
        }
      }
      !i && this.#t[r]?.[n]?.[t] && (i = this.#t[r]?.[n]?.[t] || m());
    }
    return !i && this.#t[B]?.[n]?.[t] && (i = this.#t[B]?.[n]?.[t] || m()), i;
  }
}, te = _t;
var qe = class extends Error {
  constructor(t) {
    super(t ? `Invalid date (${t}).` : "Invalid date.");
  }
}, Tn = qe;
var Ye = class extends TypeError {
  constructor(t, r) {
    t ? super(r ? `Invalid formatter (${r}) parameter: ${t}` : `Invalid formatter parameter: ${t}`) : super(r ? `Invalid formatter (${r}) parameter.` : "Invalid formatter parameter.");
  }
}, wt = Ye;
var He = class extends TypeError {
  constructor(t, r) {
    t ? super(r ? `Invalid formatter (${r}) value: ${t}` : `Invalid formatter value: ${t}`) : super(r ? `Invalid formatter (${r}) value.` : "Invalid formatter value.");
  }
}, ct = He;
function Xe(e) {
  if (typeof e != "string")
    throw new ct(`Received value is not a string, found "${e}".`, "upper");
  return e.toUpperCase();
}
function Ze(e) {
  if (typeof e != "string")
    throw new ct(`Received value is not a string, found "${e}".`, "lower");
  return e.toLowerCase();
}
function bn(e) {
  if (typeof e != "string")
    throw new ct(`Received value is not a string, found "${e}".`, "capitalize");
  return `${e.slice(0, 1).toUpperCase()}${e.slice(1).toLowerCase()}`;
}
function An(e, t) {
  return e ?? t;
}
function Qe(e, t) {
  return e || t;
}
function Pn(e, t) {
  return typeof e == "string" ? e : t;
}
function En(e, t = true) {
  if (typeof e == "symbol")
    throw new ct(`Received value cannot be a symbol, found "${e.toString()}".`, "json");
  if (typeof t != "boolean")
    throw new wt(`format must be a boolean, found "${t}".`, "json");
  return t ? JSON.stringify(e, null, "	") : JSON.stringify(e);
}
function Sn(e, t = {}, r = E.locale) {
  if (typeof e == "string" && (e = Number.parseFloat(e)), !wr(e))
    throw new ct(`Received value is not a number, found "${e}".`, "intl_format_number");
  if (!p(t))
    throw new wt(`options must be an object, found "${t}".`, "intl_format_number");
  if (typeof r != "string")
    throw new wt(`locale must be a string, found "${r}".`, "intl_format_number");
  return new Intl.NumberFormat(r, t).format(e);
}
function On(e, t = {}, r = E.locale) {
  if (typeof e != "string" && typeof e != "number" && !(e instanceof Date))
    throw new ct(`Received value is not a string, number or Date, found "${e}".`, "intl_format_date");
  if (e = e instanceof Date ? e : new Date(e), !Rr(e))
    throw new Tn(e);
  if (!p(t))
    throw new wt(`options must be an object, found "${t}".`, "intl_format_date");
  if (typeof r != "string")
    throw new wt(`locale must be a string, found "${r}".`, "intl_format_date");
  return new Intl.DateTimeFormat(r, t);
}
var us = N.fromRegex(cn).assertStarting().assertEnding().build().toMatcher();
function Nn(e) {
  let t = us(e.toString());
  if (!t)
    return { args: [], body: "" };
  let [, r, n] = t.match;
  return { args: ps(r || ""), body: ms(n || "") };
}
function _n(e) {
  let t = {};
  for (let [r, n] of Object.entries(e))
    t[r] = new Function(...n.args, n.body);
  return t;
}
function ps(e) {
  return e.trim().split(",").map((t) => t.trim());
}
function ms(e) {
  return e.trim().endsWith("}") ? e.slice(0, -1) : e;
}
var tr = class {
  #e = { upper: Xe, uppercase: Xe, lower: Ze, lowercase: Ze, capitalize: bn, json: En, default_nullish: An, default: Qe, default_falsy: Qe, default_non_string: Pn, intl_format_number: Sn, intl_format_date: On };
  #t;
  #r;
  constructor(t = {}) {
    this.#t = t, this.#r = { ...this.#e, ...this.#t };
  }
  get default() {
    return this.#e;
  }
  get custom() {
    return this.#t;
  }
  addFormaters(t) {
    for (let [r, n] of Object.entries(t))
      this.#r[r] || (this.#r[r] = n, this.#t[r] = n);
    return this;
  }
  clear() {
    this.#t = {}, this.#r = {};
  }
  toClientSideObject() {
    let t = {};
    for (let [r, n] of Object.entries(this.#t))
      t[r] = Nn(n);
    return t;
  }
  toObject() {
    return this.#r;
  }
  toString() {
    return JSON.stringify(this.toObject(), null, "	");
  }
}, ee = tr;
var er = class extends Error {
  constructor(t) {
    super(t ? `Invalid environment: ${t}` : "Invalid environment.");
  }
}, Ln = er;
var Lt = class {
  #e;
  #t;
  constructor(t = {}, r = "") {
    this.#t = t, this.#e = r;
  }
  static fromConfig({ routes: t, primaryLocale: r }) {
    return new Lt({}, r).addSegments(t);
  }
  get(t, r, n) {
    return this.#t[r]?.[t]?.[n] || null;
  }
  getSegmentLocales(t) {
    let r = [];
    for (let [n, s] of Object.entries(this.#t))
      s[t] && r.push(n);
    return r;
  }
  addSegments(t) {
    let r = Object.entries(t);
    for (let [n, s] of r) {
      let i = r.filter(([o]) => o !== n && o !== this.#e);
      for (let [o, c] of Object.entries(s)) {
        H(this.#t, [this.#e, o, n], c), H(this.#t, [n, c, this.#e], o);
        for (let [a, f] of i)
          f[o] && H(this.#t, [n, c, a], f[o]);
      }
    }
    return this;
  }
  clear() {
    this.#e = "", this.#t = {};
  }
  toClientSideObject() {
    return { ...this.#t };
  }
  toObject() {
    return { primaryLocale: this.#e, segments: this.#t };
  }
  toString() {
    return JSON.stringify(this.toObject(), null, "	");
  }
}, re = Lt;
var rr = class extends Error {
  constructor() {
    super("Cannot initialize astro-i18n, it already has been initialized.");
  }
}, Cn = rr;
var nr = class extends Error {
  constructor(t) {
    super(t ? `Cannot use filesystem: ${t}` : "Cannot use filesystem.");
  }
}, kn = nr;
var sr = class extends Error {
  constructor() {
    super(`Could not find the serialized ${L} state in the DOM. Check your ${L} config.`);
  }
}, In = sr;
function $n(e) {
  if (!p(e))
    return false;
  for (let t of Object.values(e)) {
    if (!p(t))
      return false;
    for (let r of Object.values(t)) {
      if (!p(r))
        return false;
      for (let n of Object.values(r))
        if (typeof n != "string")
          return false;
    }
  }
  return true;
}
function jn(e) {
  if (!p(e))
    return false;
  for (let t of Object.values(e)) {
    if (!p(t))
      return false;
    let r = Object.entries(t);
    if (r.length < 2)
      return false;
    for (let [n, s] of r)
      switch (n) {
        case "args": {
          if (!Y(s))
            return false;
          break;
        }
        case "body": {
          if (typeof s != "string")
            return false;
          break;
        }
      }
  }
  return true;
}
function vn(e) {
  if (!p(e))
    return false;
  for (let t of Object.values(e)) {
    if (!p(t))
      return false;
    for (let r of Object.values(t))
      if (!gs(r))
        return false;
  }
  return true;
}
function gs(e) {
  if (!p(e))
    return false;
  for (let t of Object.values(e)) {
    if (!p(t))
      return false;
    for (let [r, n] of Object.entries(t))
      switch (r) {
        case "default": {
          if (typeof n != "string")
            return false;
          break;
        }
        case "variants": {
          if (!rt(n) || !n.every((s) => hs(s)))
            return false;
          break;
        }
        default:
          return false;
      }
  }
  return true;
}
function hs(e) {
  if (!p(e))
    return false;
  let t = Object.entries(e);
  if (t.length < 4)
    return false;
  for (let [r, n] of t)
    switch (r) {
      case "raw": {
        if (typeof n != "string")
          return false;
        break;
      }
      case "priority": {
        if (typeof n != "number")
          return false;
        break;
      }
      case "properties": {
        if (!rt(n) || !n.every((s) => ds(s)))
          return false;
        break;
      }
      case "value": {
        if (typeof n != "string")
          return false;
        break;
      }
      default:
        return false;
    }
  return true;
}
function ds(e) {
  if (!p(e))
    return false;
  let t = Object.entries(e);
  if (t.length < 2)
    return false;
  for (let [r, n] of t)
    switch (r) {
      case "name": {
        if (typeof n != "string")
          return false;
        break;
      }
      case "values": {
        if (!rt(n) || !n.every((s) => typeof s == "boolean" || typeof s == "string" || typeof s == "number" || s == null))
          return false;
        break;
      }
      default:
        return false;
    }
  return true;
}
function Mn(e) {
  if (!p(e))
    return false;
  let t = Object.entries(e);
  if (t.length < 5)
    return false;
  for (let [r, n] of t)
    switch (r) {
      case "locale": {
        if (typeof n != "string")
          return false;
        break;
      }
      case "route": {
        if (typeof n != "string")
          return false;
        break;
      }
      case "config": {
        if (!tn(n))
          return false;
        break;
      }
      case "translations": {
        if (!vn(n))
          return false;
        break;
      }
      case "segments": {
        if (!$n(n))
          return false;
        break;
      }
      case "formatters": {
        if (!jn(n))
          return false;
        break;
      }
      default:
        return false;
    }
  return true;
}
function or(e) {
  return xn.test(e);
}
function Fn(e) {
  let t = "", r = 0;
  return yt.exec(e, ({ match: n, range: [s, i] }) => {
    if (t += e.slice(r, s), !n[2]) {
      r = i;
      return;
    }
    t += n[1] ? "[\\w/-]+" : "[\\w-]+", r = i;
  }), t += e.slice(r), u.fromString(t.replaceAll("/", "\\/"));
}
var ir = class extends Error {
  constructor() {
    super("Cannot perform operation, astro-i18n is not initialized.");
  }
}, ar = ir;
var cr = class extends Error {
  constructor() {
    super("Could not redirect, is this code running in the server ?");
  }
}, Dn = cr;
var Ct, tt, J, K, S, _, k, v, M, W, et, F, lt, ie, Vn, ae, Un, ce, zn, le, Gn, fe, Bn, Rt, se, kt, lr, It, fr, xt, oe, $t, ur, ue, Jn, pe, Kn, me = class {
  constructor() {
    d(this, ie);
    d(this, ae);
    d(this, ce);
    d(this, le);
    d(this, fe);
    d(this, Rt);
    d(this, kt);
    d(this, It);
    d(this, xt);
    d(this, $t);
    d(this, ue);
    d(this, pe);
    d(this, tt, void 0);
    d(this, J, "");
    d(this, K, "");
    d(this, S, new dt());
    d(this, _, new te());
    d(this, k, new re());
    d(this, v, new ee());
    d(this, M, false);
    d(this, W, false);
    d(this, et, {});
    d(this, F, null);
    d(this, lt, "");
    typeof process == "object" && typeof process.versions == "object" && typeof process.versions.node < "u" ? R(this, tt, ot.NODE) : typeof window > "u" ? R(this, tt, ot.NONE) : (R(this, tt, ot.BROWSER), l(this, S).run === "client+server" && T(this, ie, Vn).call(this));
  }
  get environment() {
    return l(this, tt).toString();
  }
  get route() {
    return l(this, W) ? "" : l(this, K);
  }
  set route(t) {
    or(t) && (t = new URL(t).pathname), t = decodeURI(t);
    let { locale: r, route: n } = T(this, xt, oe).call(this, t);
    R(this, K, n), R(this, J, r || T(this, It, fr).call(this, T(this, $t, ur).call(this, n)) || this.primaryLocale);
  }
  get pages() {
    return l(this, _).getRouteGroups();
  }
  get page() {
    return T(this, Rt, se).call(this, this.route);
  }
  get locale() {
    return l(this, J);
  }
  get locales() {
    return [l(this, S).primaryLocale, ...l(this, S).secondaryLocales];
  }
  get primaryLocale() {
    return l(this, S).primaryLocale;
  }
  get secondaryLocales() {
    return l(this, S).secondaryLocales;
  }
  get fallbackLocale() {
    return l(this, S).fallbackLocale;
  }
  get isInitialized() {
    return l(this, M);
  }
  get internals() {
    return { toHtml: T(this, ue, Jn).bind(this), config: l(this, S), segments: l(this, k), translations: l(this, _), splitLocaleAndRoute: T(this, xt, oe).bind(this), toString: T(this, pe, Kn).bind(this), waitInitialization: T(this, ae, Un).bind(this), setPrivateProperties: T(this, fe, Bn).bind(this), reinitalize: T(this, ce, zn).bind(this), getAndClearRedirection: T(this, le, Gn).bind(this) };
  }
  t(t, r = {}, n = {}) {
    if (!l(this, M))
      throw new ar();
    let { route: s, locale: i, fallbackLocale: o } = n;
    if (l(this, W))
      return l(this, _).get(t, "", i || this.locale, o || this.fallbackLocale, r, l(this, v).toObject(), true);
    let c = s ? T(this, Rt, se).call(this, s) : T(this, Rt, se).call(this, this.route);
    return l(this, _).get(t, c || "", i || this.locale, o || this.fallbackLocale, r, l(this, v).toObject());
  }
  l(t, r = {}, n = {}) {
    if (!l(this, M))
      throw new ar();
    let { targetLocale: s, routeLocale: i, showPrimaryLocale: o, query: c } = n, a = T(this, $t, ur).call(this, decodeURI(t)), f = this.locales.includes(a[0] || "") && a.shift() || "", h = i || f || T(this, It, fr).call(this, a) || this.primaryLocale, g = s || this.locale, w = a.map((x) => l(this, k).get(x, h, g) || x).join("/"), y = Object.entries(r);
    if (y.length > 0)
      for (let [x, C] of y)
        w = w.replace(`[${x}]`, String(C).replace("/", ""));
    if ((o === void 0 ? l(this, S).showPrimaryLocale || g !== this.primaryLocale : o) && (w = w ? `${g}/${w}` : g), l(this, S).trailingSlash === "always" && (w += "/"), w = w.startsWith("/") ? w : `/${w}`, !c)
      return w;
    let b = {};
    for (let [x, C] of Object.entries(c))
      b[x] = String(C);
    let P = new URLSearchParams(b).toString();
    return P ? `${w}?${P}` : w;
  }
  addTranslations(t) {
    return l(this, _).addTranslations(t), T(this, kt, lr).call(this), this;
  }
  addFormatters(t) {
    return l(this, v).addFormaters(t), this;
  }
  addTranslationLoadingRules(t) {
    return l(this, _).addTranslationLoadingRules(t), this;
  }
  addRoutes(t) {
    return l(this, k).addSegments(t), T(this, kt, lr).call(this), this;
  }
  extractRouteLocale(t) {
    return T(this, xt, oe).call(this, t).locale;
  }
  redirect(t, r = 301) {
    if (this.environment === ot.BROWSER)
      throw new Dn();
    if (typeof t == "string") {
      let n = or(t) ? new URL(t) : new URL(`${l(this, lt)}/${t.replace(/^\//, "")}`);
      R(this, F, Response.redirect(n, r));
      return;
    }
    R(this, F, Response.redirect(t, r));
  }
  async initialize(t = void 0, r = {}) {
    if (l(this, M))
      throw new Cn();
    switch (l(this, tt)) {
      case ot.NODE: {
        R(this, S, typeof t == "object" ? await new dt(t).loadFilesystemTranslations() : await dt.fromFilesystem(t));
        break;
      }
      case ot.NONE: {
        if (typeof t == "string")
          throw new kn("Cannot load config from filesystem in a non-node environment.");
        R(this, S, new dt(t || {}));
        break;
      }
      default:
        throw new Ln("Cannot initialize in a browser environment.");
    }
    R(this, _, te.fromConfig(l(this, S))), R(this, k, re.fromConfig(l(this, S))), R(this, v, new ee(r)), R(this, M, true);
  }
}, ne = me;
Ct = /* @__PURE__ */ new WeakMap(), tt = /* @__PURE__ */ new WeakMap(), J = /* @__PURE__ */ new WeakMap(), K = /* @__PURE__ */ new WeakMap(), S = /* @__PURE__ */ new WeakMap(), _ = /* @__PURE__ */ new WeakMap(), k = /* @__PURE__ */ new WeakMap(), v = /* @__PURE__ */ new WeakMap(), M = /* @__PURE__ */ new WeakMap(), W = /* @__PURE__ */ new WeakMap(), et = /* @__PURE__ */ new WeakMap(), F = /* @__PURE__ */ new WeakMap(), lt = /* @__PURE__ */ new WeakMap(), ie = /* @__PURE__ */ new WeakSet(), Vn = function() {
  let t = document.querySelector(`#${l(me, Ct)}`);
  if (!t || !t.textContent)
    throw new In();
  let r = JSON.parse(t.textContent);
  z(r, Mn), R(this, J, r.locale), R(this, K, r.route), R(this, S, new dt(r.config)), R(this, _, new te(Rn(r.translations))), R(this, k, new re(r.segments, r.config.primaryLocale)), R(this, v, new ee(_n(r.formatters))), R(this, M, true), t.remove();
}, ae = /* @__PURE__ */ new WeakSet(), Un = async function() {
  let t = (r) => {
    l(this, M) ? r() : setTimeout(() => t(r), 25);
  };
  return new Promise(t);
}, ce = /* @__PURE__ */ new WeakSet(), zn = async function(t = void 0, r = {}) {
  R(this, M, false), l(this, _).clear(), l(this, k).clear(), l(this, v).clear(), await this.initialize(t, r);
}, le = /* @__PURE__ */ new WeakSet(), Gn = function() {
  let t = l(this, F);
  return R(this, F, null), t;
}, fe = /* @__PURE__ */ new WeakSet(), Bn = function(t = {}) {
  let { route: r, locale: n, isGetStaticPaths: s, origin: i } = { route: l(this, K), locale: l(this, J), isGetStaticPaths: l(this, W), origin: l(this, lt), ...t };
  R(this, K, r), R(this, J, n), R(this, W, s), R(this, lt, i);
}, Rt = /* @__PURE__ */ new WeakSet(), se = function(t) {
  if (l(this, W))
    return null;
  if (l(this, et)[t])
    return l(this, et)[t] || m();
  let r = this.l(t, void 0, { targetLocale: this.primaryLocale });
  if (this.pages.includes(r))
    return r;
  let n = null;
  for (let s of this.pages)
    if (yt.test(s) && Fn(s).test(t)) {
      n = s;
      break;
    }
  return !n || !this.pages.includes(n) ? null : (l(this, et)[t] = n, n);
}, kt = /* @__PURE__ */ new WeakSet(), lr = function() {
  R(this, et, {});
}, It = /* @__PURE__ */ new WeakSet(), fr = function(t) {
  let r = {};
  for (let s of t)
    for (let i of l(this, k).getSegmentLocales(s))
      r[i] || (r[i] = 0), r[i] += 1;
  let n = { locale: "", score: 0, isExAequo: true };
  for (let [s, i] of Object.entries(r)) {
    if (i > n.score) {
      n.locale = s, n.score = i, n.isExAequo = false;
      continue;
    }
    i === n.score && (n.isExAequo = true);
  }
  return n.isExAequo ? null : n.locale || null;
}, xt = /* @__PURE__ */ new WeakSet(), oe = function(t) {
  t.startsWith("/") || (t = `/${t}`);
  let r = u.fromString(`\\/(${this.locales.join("|")})(?:\\/.*)?$`), { match: n } = r.match(t) || {}, s = n?.[1] || null;
  return { locale: s, route: s ? t.replace(`/${s}`, "").replace(/\/$/, "") || "/" : t.replace(/\/$/, "") || "/" };
}, $t = /* @__PURE__ */ new WeakSet(), ur = function(t) {
  return t.replace(/^\//, "").replace(/\/$/, "").split("/");
}, ue = /* @__PURE__ */ new WeakSet(), Jn = function() {
  let t = { locale: l(this, J), route: l(this, K), config: l(this, S).toClientSideObject(), translations: l(this, _).toClientSideObject(this.route), segments: l(this, k).toClientSideObject(), formatters: l(this, v).toClientSideObject() };
  return `<script id="${l(me, Ct)}" type="application/json">${JSON.stringify(t)}</script>`;
}, pe = /* @__PURE__ */ new WeakSet(), Kn = function() {
  let t = {};
  for (let [r, n] of Object.entries(l(this, v).toObject()))
    t[r] = n.name;
  return JSON.stringify({ environment: this.environment, route: this.route, locale: this.locale, locales: this.locales, primaryLocale: this.primaryLocale, secondaryLocales: this.secondaryLocales, fallbackLocale: this.fallbackLocale, isInitialized: this.isInitialized, "#redirection": l(this, F) instanceof Response ? { url: l(this, F).url, status: l(this, F).status } : l(this, F), "#origin": l(this, lt), "#isGetStaticPaths": l(this, W), "#routePageCache": l(this, et), "#config": l(this, S).toObject(), "#translations": l(this, _).toObject(), "#segments": l(this, k).toObject(), "#formatters": t }, null, "	");
}, d(ne, Ct, `__${L}__`);
var Wn = ne;
var E = new Wn();
function ys(e, t) {
  return e || (e = void 0), p(e) && Object.keys(e).length === 0 && (e = void 0), E.initialize(e, t), async (r, n) => {
    if (E.isInitialized || await E.internals.waitInitialization(), E.internals.setPrivateProperties({ isGetStaticPaths: false, origin: r.url.origin }), E.route = r.url.pathname, E.internals.config.run !== "client+server")
      return n();
    let s = await n(), i = E.internals.getAndClearRedirection();
    if (i)
      return i;
    let o = await s.clone().text();
    if (!o.startsWith("<!DOCTYPE html>"))
      return s;
    let c = o.indexOf("</head>");
    return c > 0 && (o = o.slice(0, c) + E.internals.toHtml() + o.slice(c)), new Response(o, { status: s.status, statusText: s.statusText, headers: s.headers });
  };
}
var al = E.t.bind(E), cl = E.l.bind(E);

const __vite_glob_1_0 = "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"1em\" height=\"1em\" preserveAspectRatio=\"xMidYMid meet\" viewBox=\"0 0 32 32\"><path d=\"M17 15V8h-2v7H8v2h7v7h2v-7h7v-2z\" fill=\"currentColor\"/></svg>";

const __vite_glob_1_1 = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\n<svg\n   id=\"emoji\"\n   viewBox=\"0 0 72 72\"\n   version=\"1.1\"\n   sodipodi:docname=\"Angry.svg\"\n   inkscape:version=\"1.2.1 (9c6d41e410, 2022-07-14)\"\n   xmlns:inkscape=\"http://www.inkscape.org/namespaces/inkscape\"\n   xmlns:sodipodi=\"http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd\"\n   xmlns=\"http://www.w3.org/2000/svg\"\n   xmlns:svg=\"http://www.w3.org/2000/svg\">\n  <defs\n     id=\"defs24\" />\n  <sodipodi:namedview\n     id=\"namedview22\"\n     pagecolor=\"#ffffff\"\n     bordercolor=\"#000000\"\n     borderopacity=\"0.25\"\n     inkscape:showpageshadow=\"2\"\n     inkscape:pageopacity=\"0.0\"\n     inkscape:pagecheckerboard=\"0\"\n     inkscape:deskcolor=\"#d1d1d1\"\n     showgrid=\"false\"\n     inkscape:zoom=\"11.152778\"\n     inkscape:cx=\"32.234122\"\n     inkscape:cy=\"36.089664\"\n     inkscape:window-width=\"952\"\n     inkscape:window-height=\"968\"\n     inkscape:window-x=\"0\"\n     inkscape:window-y=\"30\"\n     inkscape:window-maximized=\"0\"\n     inkscape:current-layer=\"color\" />\n  <g\n     id=\"color\">\n    <path\n       fill=\"#E27022\"\n       d=\"M36,13c-12.6823,0-23,10.3177-23,23c0,12.6822,10.3177,23,23,23c12.6822,0,23-10.3178,23-23 C59,23.3177,48.6822,13,36,13z\"\n       id=\"path2\"\n       style=\"fill:#f2a038;fill-opacity:1\" />\n  </g>\n  <g\n     id=\"hair\" />\n  <g\n     id=\"skin\" />\n  <g\n     id=\"skin-shadow\" />\n  <g\n     id=\"line\">\n    <circle\n       cx=\"36\"\n       cy=\"36\"\n       r=\"23\"\n       fill=\"none\"\n       stroke=\"#000000\"\n       stroke-miterlimit=\"10\"\n       stroke-width=\"2\"\n       id=\"circle8\" />\n    <path\n       fill=\"none\"\n       stroke=\"#000000\"\n       stroke-linecap=\"round\"\n       stroke-linejoin=\"round\"\n       stroke-miterlimit=\"10\"\n       stroke-width=\"2\"\n       d=\"M28,46c1.5805-2.5575,4.9043-4.1349,8.4211-4.0038C39.6499,42.1166,42.5622,43.6595,44,46\"\n       id=\"path10\" />\n    <path\n       d=\"M30,32.9252c0,1.6567-1.3448,3-3,3c-1.6553,0-3-1.3433-3-3c0-1.6553,1.3447-3,3-3C28.6552,29.9252,30,31.27,30,32.9252\"\n       id=\"path12\" />\n    <path\n       d=\"M48,32.9252c0,1.6567-1.3447,3-3,3s-3-1.3433-3-3c0-1.6553,1.3447-3,3-3S48,31.27,48,32.9252\"\n       id=\"path14\" />\n    <line\n       x1=\"23\"\n       x2=\"30\"\n       y1=\"24\"\n       y2=\"28\"\n       fill=\"none\"\n       stroke=\"#000000\"\n       stroke-linecap=\"round\"\n       stroke-linejoin=\"round\"\n       stroke-miterlimit=\"10\"\n       stroke-width=\"2\"\n       id=\"line16\" />\n    <line\n       x1=\"49\"\n       x2=\"42\"\n       y1=\"24\"\n       y2=\"28\"\n       fill=\"none\"\n       stroke=\"#000000\"\n       stroke-linecap=\"round\"\n       stroke-linejoin=\"round\"\n       stroke-miterlimit=\"10\"\n       stroke-width=\"2\"\n       id=\"line18\" />\n  </g>\n</svg>\n";

const __vite_glob_1_2 = "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"1em\" height=\"1em\" preserveAspectRatio=\"xMidYMid meet\" viewBox=\"0 0 32 32\"><path d=\"M19 10h7v2h-7z\" fill=\"currentColor\"/><path d=\"M19 15h7v2h-7z\" fill=\"currentColor\"/><path d=\"M19 20h7v2h-7z\" fill=\"currentColor\"/><path d=\"M6 10h7v2H6z\" fill=\"currentColor\"/><path d=\"M6 15h7v2H6z\" fill=\"currentColor\"/><path d=\"M6 20h7v2H6z\" fill=\"currentColor\"/><path d=\"M28 5H4a2.002 2.002 0 0 0-2 2v18a2.002 2.002 0 0 0 2 2h24a2.002 2.002 0 0 0 2-2V7a2.002 2.002 0 0 0-2-2zM4 7h11v18H4zm13 18V7h11v18z\" fill=\"currentColor\"/></svg>";

const __vite_glob_1_3 = "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"1em\" height=\"1em\" preserveAspectRatio=\"xMidYMid meet\" viewBox=\"0 0 32 32\"><path d=\"M29 26H3a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h6.46l1.71-2.55A1 1 0 0 1 12 4h8a1 1 0 0 1 .83.45L22.54 7H29a1 1 0 0 1 1 1v17a1 1 0 0 1-1 1zM4 24h24V9h-6a1 1 0 0 1-.83-.45L19.46 6h-6.92l-1.71 2.55A1 1 0 0 1 10 9H4z\" fill=\"currentColor\"/><path d=\"M16 22a6 6 0 1 1 6-6a6 6 0 0 1-6 6zm0-10a4 4 0 1 0 4 4a4 4 0 0 0-4-4z\" fill=\"currentColor\"/></svg>";

const __vite_glob_1_4 = "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"1em\" height=\"1em\" preserveAspectRatio=\"xMidYMid meet\" viewBox=\"0 0 32 32\"><path d=\"M27.562 26L17.17 8.928l2.366-3.888L17.828 4L16 7.005L14.17 4l-1.708 1.04l2.366 3.888L4.438 26H2v2h28v-2zM16 10.85L25.22 26H17v-8h-2v8H6.78z\" fill=\"currentColor\"/></svg>";

const __vite_glob_1_5 = "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"1em\" height=\"1em\" preserveAspectRatio=\"xMidYMid meet\" viewBox=\"0 0 32 32\"><path d=\"M14 21.414l-5-5.001L10.413 15L14 18.586L21.585 11L23 12.415l-9 8.999z\" fill=\"currentColor\"/><path d=\"M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2zm0 26a12 12 0 1 1 12-12a12 12 0 0 1-12 12z\" fill=\"currentColor\"/></svg>";

const __vite_glob_1_6 = "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"1em\" height=\"1em\" preserveAspectRatio=\"xMidYMid meet\" viewBox=\"0 0 32 32\"><path d=\"M24 9.4L22.6 8L16 14.6L9.4 8L8 9.4l6.6 6.6L8 22.6L9.4 24l6.6-6.6l6.6 6.6l1.4-1.4l-6.6-6.6L24 9.4z\" fill=\"currentColor\"/></svg>";

const __vite_glob_1_7 = "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"1em\" height=\"1em\" preserveAspectRatio=\"xMidYMid meet\" viewBox=\"0 0 32 32\"><path d=\"M30 25l-1.414-1.414L26 26.172V18h-2v8.172l-2.586-2.586L20 25l5 5l5-5z\" fill=\"currentColor\"/><path d=\"M18 28H8V4h8v6a2.006 2.006 0 0 0 2 2h6v3h2v-5a.91.91 0 0 0-.3-.7l-7-7A.909.909 0 0 0 18 2H8a2.006 2.006 0 0 0-2 2v24a2.006 2.006 0 0 0 2 2h10zm0-23.6l5.6 5.6H18z\" fill=\"currentColor\"/></svg>";

const __vite_glob_1_8 = "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"1em\" height=\"1em\" preserveAspectRatio=\"xMidYMid meet\" viewBox=\"0 0 32 32\"><path d=\"M2 26h28v2H2z\" fill=\"currentColor\"/><path d=\"M25.4 9c.8-.8.8-2 0-2.8l-3.6-3.6c-.8-.8-2-.8-2.8 0l-15 15V24h6.4l15-15zm-5-5L24 7.6l-3 3L17.4 7l3-3zM6 22v-3.6l10-10l3.6 3.6l-10 10H6z\" fill=\"currentColor\"/></svg>";

const __vite_glob_1_9 = "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"1em\" height=\"1em\" preserveAspectRatio=\"xMidYMid meet\" viewBox=\"0 0 32 32\"><path d=\"M16 24a8 8 0 0 0 6.85-3.89l-1.71-1a6 6 0 0 1-10.28 0l-1.71 1A8 8 0 0 0 16 24z\" fill=\"currentColor\"/><path d=\"M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2zm0 2a12 12 0 0 1 10.89 7H25a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1H5.11A12 12 0 0 1 16 4zm0 24A12 12 0 0 1 4 16a11.86 11.86 0 0 1 .4-3H7v2a2 2 0 0 0 2 2h3.31a2 2 0 0 0 2-1.67l.52-3.33h2.34l.55 3.33a2 2 0 0 0 2 1.67H23a2 2 0 0 0 2-2v-2h2.6a11.86 11.86 0 0 1 .4 3a12 12 0 0 1-12 12z\" fill=\"currentColor\"/></svg>";

const __vite_glob_1_10 = "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"1em\" height=\"1em\" preserveAspectRatio=\"xMidYMid meet\" viewBox=\"0 0 32 32\"><path d=\"M22.45 6a5.47 5.47 0 0 1 3.91 1.64a5.7 5.7 0 0 1 0 8L16 26.13L5.64 15.64a5.7 5.7 0 0 1 0-8a5.48 5.48 0 0 1 7.82 0l2.54 2.6l2.53-2.58A5.44 5.44 0 0 1 22.45 6m0-2a7.47 7.47 0 0 0-5.34 2.24L16 7.36l-1.11-1.12a7.49 7.49 0 0 0-10.68 0a7.72 7.72 0 0 0 0 10.82L16 29l11.79-11.94a7.72 7.72 0 0 0 0-10.82A7.49 7.49 0 0 0 22.45 4z\" fill=\"currentColor\"/></svg>";

const __vite_glob_1_11 = "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"1em\" height=\"1em\" preserveAspectRatio=\"xMidYMid meet\" viewBox=\"0 0 32 32\"><path d=\"M11.61 29.92a1 1 0 0 1-.6-1.07L12.83 17H8a1 1 0 0 1-1-1.23l3-13A1 1 0 0 1 11 2h10a1 1 0 0 1 .78.37a1 1 0 0 1 .2.85L20.25 11H25a1 1 0 0 1 .9.56a1 1 0 0 1-.11 1l-13 17A1 1 0 0 1 12 30a1.09 1.09 0 0 1-.39-.08zM17.75 13l2-9H11.8L9.26 15h5.91l-1.59 10.28L23 13z\" fill=\"currentColor\"/></svg>";

const __vite_glob_1_12 = "<svg id=\"emoji\" viewBox=\"0 0 72 72\" xmlns=\"http://www.w3.org/2000/svg\">\n  <g id=\"color\">\n    <circle cx=\"36\" cy=\"36\" r=\"23\" fill=\"#fcea2b\"/>\n    <path fill=\"#fff\" d=\"M50.595,41.64a11.5554,11.5554,0,0,1-.87,4.49c-12.49,3.03-25.43.34-27.49-.13a11.4347,11.4347,0,0,1-.83-4.36h.11s14.8,3.59,28.89.07Z\"/>\n    <path fill=\"#ea5a47\" d=\"M49.7251,46.13c-1.79,4.27-6.35,7.23-13.69,7.23-7.41,0-12.03-3.03-13.8-7.36C24.2951,46.47,37.235,49.16,49.7251,46.13Z\"/>\n  </g>\n  <g id=\"hair\"/>\n  <g id=\"skin\"/>\n  <g id=\"skin-shadow\"/>\n  <g id=\"line\">\n    <circle cx=\"36\" cy=\"36\" r=\"23\" fill=\"none\" stroke=\"#000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"/>\n    <ellipse cx=\"28.5684\" cy=\"30.818\" rx=\"3\" ry=\"5.4038\"/>\n    <ellipse cx=\"43.4316\" cy=\"30.8216\" rx=\"3\" ry=\"5.4038\"/>\n    <path fill=\"none\" stroke=\"#000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M50.595,41.64a11.5554,11.5554,0,0,1-.87,4.49c-12.49,3.03-25.43.34-27.49-.13a11.4347,11.4347,0,0,1-.83-4.36h.11s14.8,3.59,28.89.07Z\"/>\n    <path fill=\"none\" stroke=\"#000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M49.7251,46.13c-1.79,4.27-6.35,7.23-13.69,7.23-7.41,0-12.03-3.03-13.8-7.36C24.2951,46.47,37.235,49.16,49.7251,46.13Z\"/>\n  </g>\n</svg>\n";

const __vite_glob_1_13 = "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"1em\" height=\"1em\" preserveAspectRatio=\"xMidYMid meet\" viewBox=\"0 0 32 32\"><path d=\"M17 22v-8h-4v2h2v6h-3v2h8v-2h-3z\" fill=\"currentColor\"/><path d=\"M16 8a1.5 1.5 0 1 0 1.5 1.5A1.5 1.5 0 0 0 16 8z\" fill=\"currentColor\"/><path d=\"M16 30a14 14 0 1 1 14-14a14 14 0 0 1-14 14zm0-26a12 12 0 1 0 12 12A12 12 0 0 0 16 4z\" fill=\"currentColor\"/></svg>";

const __vite_glob_1_14 = "<svg id=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 32\"><defs><style>.cls-1{fill:none;}</style></defs><title>link</title><path d=\"M29.25,6.76a6,6,0,0,0-8.5,0l1.42,1.42a4,4,0,1,1,5.67,5.67l-8,8a4,4,0,1,1-5.67-5.66l1.41-1.42-1.41-1.42-1.42,1.42a6,6,0,0,0,0,8.5A6,6,0,0,0,17,25a6,6,0,0,0,4.27-1.76l8-8A6,6,0,0,0,29.25,6.76Z\"/><path d=\"M4.19,24.82a4,4,0,0,1,0-5.67l8-8a4,4,0,0,1,5.67,0A3.94,3.94,0,0,1,19,14a4,4,0,0,1-1.17,2.85L15.71,19l1.42,1.42,2.12-2.12a6,6,0,0,0-8.51-8.51l-8,8a6,6,0,0,0,0,8.51A6,6,0,0,0,7,28a6.07,6.07,0,0,0,4.28-1.76L9.86,24.82A4,4,0,0,1,4.19,24.82Z\"/><rect id=\"_Transparent_Rectangle_\" data-name=\"&lt;Transparent Rectangle&gt;\" class=\"cls-1\" width=\"32\" height=\"32\"/></svg>";

const __vite_glob_1_15 = "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"1em\" height=\"1em\" preserveAspectRatio=\"xMidYMid meet\" viewBox=\"0 0 32 32\"><path d=\"M10 6h18v2H10z\" fill=\"currentColor\"/><path d=\"M10 24h18v2H10z\" fill=\"currentColor\"/><path d=\"M10 15h18v2H10z\" fill=\"currentColor\"/><path d=\"M4 15h2v2H4z\" fill=\"currentColor\"/><path d=\"M4 6h2v2H4z\" fill=\"currentColor\"/><path d=\"M4 24h2v2H4z\" fill=\"currentColor\"/></svg>";

const __vite_glob_1_16 = "<svg id=\"emoji\" viewBox=\"0 0 72 72\" xmlns=\"http://www.w3.org/2000/svg\">\n  <g id=\"color\">\n    <circle cx=\"36\" cy=\"36\" r=\"23\" fill=\"#FCEA2B\"/>\n    <path fill=\"#D22F27\" d=\"M26.4992,27.4384c-1.2653-3.3541-6.441-3.5687-6.1168,1.3178c0.0431,0.6485,0.281,1.2724,0.6414,1.8135 l5.3179,6.4224l0,0l5.2212-6.266c0.5796-0.6964,0.9224-1.5779,0.905-2.4853c-0.0863-4.3523-5.0509-4.0351-6.1274-0.8036\"/>\n    <path fill=\"#D22F27\" d=\"M45.8012,27.4384c-1.2547-3.3541-6.3873-3.5687-6.0658,1.3178c0.0428,0.6485,0.2787,1.2724,0.6361,1.8135 l5.2737,6.4224l0,0l5.1777-6.266c0.5747-0.6964,0.9147-1.5779,0.8974-2.4853c-0.0856-4.3523-5.0089-4.0351-6.0763-0.8036\"/>\n    <path fill=\"#FFFFFF\" d=\"M48.5859,42.6735c0,5.6296-4.1784,10.1046-12.5541,10.1046c-8.3738,0-12.6069-4.4888-12.6069-10.1047 C23.4249,42.6734,36.4503,45.7045,48.5859,42.6735z\"/>\n  </g>\n  <g id=\"hair\"/>\n  <g id=\"skin\"/>\n  <g id=\"skin-shadow\"/>\n  <g id=\"line\">\n    <circle cx=\"36\" cy=\"36\" r=\"23\" fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" stroke-width=\"2\"/>\n    <path fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" stroke-width=\"2\" d=\"M48.5859,42.6735c0,5.6296-4.1784,10.1046-12.5541,10.1046c-8.3738,0-12.6069-4.4888-12.6069-10.1047 C23.4249,42.6734,36.4503,45.7045,48.5859,42.6735z\"/>\n    <path fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" stroke-width=\"2\" d=\"M26.4992,27.4384c-1.2653-3.3541-6.441-3.5687-6.1168,1.3178c0.0431,0.6485,0.281,1.2724,0.6414,1.8135l5.3179,6.4224l0,0 l5.2212-6.266c0.5796-0.6964,0.9224-1.5779,0.905-2.4853c-0.0863-4.3523-5.0509-4.0351-6.1274-0.8036\"/>\n    <path fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" stroke-width=\"2\" d=\"M45.8012,27.4384c-1.2547-3.3541-6.3873-3.5687-6.0658,1.3178c0.0428,0.6485,0.2787,1.2724,0.6361,1.8135l5.2737,6.4224l0,0 l5.1777-6.266c0.5747-0.6964,0.9147-1.5779,0.8974-2.4853c-0.0856-4.3523-5.0089-4.0351-6.0763-0.8036\"/>\n  </g>\n</svg>\n";

const __vite_glob_1_17 = "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"1em\" height=\"1em\" preserveAspectRatio=\"xMidYMid meet\" viewBox=\"0 0 32 32\"><path d=\"M13.502 5.414a15.075 15.075 0 0 0 11.594 18.194a11.113 11.113 0 0 1-7.975 3.39c-.138 0-.278.005-.418 0a11.094 11.094 0 0 1-3.2-21.584M14.98 3a1.002 1.002 0 0 0-.175.016a13.096 13.096 0 0 0 1.825 25.981c.164.006.328 0 .49 0a13.072 13.072 0 0 0 10.703-5.555a1.01 1.01 0 0 0-.783-1.565A13.08 13.08 0 0 1 15.89 4.38A1.015 1.015 0 0 0 14.98 3z\" fill=\"currentColor\"/></svg>";

const __vite_glob_1_18 = "<svg id=\"emoji\" viewBox=\"0 0 72 72\" xmlns=\"http://www.w3.org/2000/svg\">\n  <g id=\"color\">\n    <circle cx=\"36\" cy=\"36\" r=\"23\" fill=\"#FCEA2B\"/>\n  </g>\n  <g id=\"hair\"/>\n  <g id=\"skin\"/>\n  <g id=\"skin-shadow\"/>\n  <g id=\"line\">\n    <circle cx=\"36\" cy=\"36\" r=\"23\" fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" stroke-width=\"2\"/>\n    <path d=\"M30,31c0,1.6568-1.3448,3-3,3c-1.6553,0-3-1.3433-3-3c0-1.6552,1.3447-3,3-3C28.6552,28,30,29.3448,30,31\"/>\n    <path d=\"M48,31c0,1.6568-1.3447,3-3,3s-3-1.3433-3-3c0-1.6552,1.3447-3,3-3S48,29.3448,48,31\"/>\n  </g>\n</svg>\n";

const __vite_glob_1_19 = "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"1em\" height=\"1em\" preserveAspectRatio=\"xMidYMid meet\" viewBox=\"0 0 32 32\"><path d=\"M24 28v-2h2v2z\" fill=\"currentColor\"/><path d=\"M18 24v-2h2v2z\" fill=\"currentColor\"/><path d=\"M18 30h4v-2h-2v-2h-2v4z\" fill=\"currentColor\"/><path d=\"M26 26v-4h2v4z\" fill=\"currentColor\"/><path d=\"M28 26h2v4h-4v-2h2v-2z\" fill=\"currentColor\"/><path d=\"M26 20v-2h4v4h-2v-2h-2z\" fill=\"currentColor\"/><path d=\"M24 20h-2v4h-2v2h4v-6z\" fill=\"currentColor\"/><path d=\"M18 20v-2h4v2z\" fill=\"currentColor\"/><path d=\"M6 22h4v4H6z\" fill=\"currentColor\"/><path d=\"M14 30H2V18h12zM4 28h8v-8H4z\" fill=\"currentColor\"/><path d=\"M22 6h4v4h-4z\" fill=\"currentColor\"/><path d=\"M30 14H18V2h12zm-10-2h8V4h-8z\" fill=\"currentColor\"/><path d=\"M6 6h4v4H6z\" fill=\"currentColor\"/><path d=\"M14 14H2V2h12zM4 12h8V4H4z\" fill=\"currentColor\"/></svg>";

const __vite_glob_1_20 = "<svg id=\"emoji\" viewBox=\"0 0 72 72\" xmlns=\"http://www.w3.org/2000/svg\">\n  <g id=\"color\">\n    <path fill=\"#D22F27\" d=\"M48.8559,16c3-2,4-5,3-9c7,2,6,10,3,15\"/>\n    <path fill=\"#D22F27\" d=\"M23.1441,16c-3-2-4-5-3-9c-7,2-6,10-3,15\"/>\n    <path fill=\"#EA5A47\" d=\"M36,13c-12.6823,0-23,10.3177-23,23s10.3177,23,23,23c12.6822,0,23-10.3178,23-23 C59,23.3176,48.6822,13,36,13z\"/>\n  </g>\n  <g id=\"hair\"/>\n  <g id=\"skin\"/>\n  <g id=\"skin-shadow\"/>\n  <g id=\"line\">\n    <circle cx=\"36\" cy=\"36\" r=\"23\" fill=\"none\" stroke=\"#000000\" stroke-miterlimit=\"10\" stroke-width=\"2\"/>\n    <path d=\"M30,32.9252c0,1.6567-1.3448,3-3,3c-1.6553,0-3-1.3433-3-3c0-1.6553,1.3447-3,3-3C28.6552,29.9252,30,31.27,30,32.9252\"/>\n    <path d=\"M48,32.9252c0,1.6567-1.3447,3-3,3s-3-1.3433-3-3c0-1.6553,1.3447-3,3-3S48,31.27,48,32.9252\"/>\n    <line x1=\"23\" x2=\"30\" y1=\"25\" y2=\"29\" fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" stroke-width=\"2\"/>\n    <line x1=\"49\" x2=\"42\" y1=\"25\" y2=\"29\" fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" stroke-width=\"2\"/>\n    <path fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" stroke-width=\"2\" d=\"M48.8559,16c3-2,4-5,3-9c7,2,6,10,3,15\"/>\n    <path fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" stroke-width=\"2\" d=\"M23.1441,16c-3-2-4-5-3-9c-7,2-6,10-3,15\"/>\n    <path fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" stroke-width=\"2\" d=\"M29.5,44c1.2841-0.6376,3.9847-1.0308,6.8421-0.9981c2.6235,0.03,4.9897,0.4146,6.1579,0.9981\"/>\n  </g>\n</svg>\n";

const __vite_glob_1_21 = "<svg id=\"emoji\" viewBox=\"0 0 72 72\" xmlns=\"http://www.w3.org/2000/svg\">\n  <g id=\"color\">\n    <path fill=\"#FCEA2B\" d=\"M36,13c-12.6823,0-23,10.3177-23,23c0,12.6822,10.3177,23,23,23c12.6822,0,23-10.3178,23-23 C59,23.3177,48.6822,13,36,13z\"/>\n  </g>\n  <g id=\"hair\"/>\n  <g id=\"skin\"/>\n  <g id=\"skin-shadow\"/>\n  <g id=\"line\">\n    <circle cx=\"36\" cy=\"36\" r=\"23\" fill=\"none\" stroke=\"#000000\" stroke-miterlimit=\"10\" stroke-width=\"2\"/>\n    <path d=\"M30,31c0,1.6568-1.3448,3-3,3c-1.6553,0-3-1.3433-3-3c0-1.6552,1.3447-3,3-3C28.6552,28,30,29.3448,30,31\"/>\n    <path d=\"M48,31c0,1.6568-1.3447,3-3,3s-3-1.3433-3-3c0-1.6552,1.3447-3,3-3S48,29.3448,48,31\"/>\n    <path fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" stroke-width=\"2\" d=\"M28,46c1.5805-2.5575,4.9043-4.1349,8.4211-4.0038C39.6499,42.1166,42.5622,43.6595,44,46\"/>\n  </g>\n</svg>\n";

const __vite_glob_1_22 = "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"1em\" height=\"1em\" preserveAspectRatio=\"xMidYMid meet\" viewBox=\"0 0 32 32\"><path d=\"M27.71 9.29l-5-5A1 1 0 0 0 22 4H6a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V10a1 1 0 0 0-.29-.71zM12 6h8v4h-8zm8 20h-8v-8h8zm2 0v-8a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8H6V6h4v4a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6.41l4 4V26z\" fill=\"currentColor\"/></svg>";

const __vite_glob_1_23 = "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"1em\" height=\"1em\" preserveAspectRatio=\"xMidYMid meet\" viewBox=\"0 0 32 32\"><path d=\"M27 16.76V16v-.77l1.92-1.68A2 2 0 0 0 29.3 11l-2.36-4a2 2 0 0 0-1.73-1a2 2 0 0 0-.64.1l-2.43.82a11.35 11.35 0 0 0-1.31-.75l-.51-2.52a2 2 0 0 0-2-1.61h-4.68a2 2 0 0 0-2 1.61l-.51 2.52a11.48 11.48 0 0 0-1.32.75l-2.38-.86A2 2 0 0 0 6.79 6a2 2 0 0 0-1.73 1L2.7 11a2 2 0 0 0 .41 2.51L5 15.24v1.53l-1.89 1.68A2 2 0 0 0 2.7 21l2.36 4a2 2 0 0 0 1.73 1a2 2 0 0 0 .64-.1l2.43-.82a11.35 11.35 0 0 0 1.31.75l.51 2.52a2 2 0 0 0 2 1.61h4.72a2 2 0 0 0 2-1.61l.51-2.52a11.48 11.48 0 0 0 1.32-.75l2.42.82a2 2 0 0 0 .64.1a2 2 0 0 0 1.73-1l2.28-4a2 2 0 0 0-.41-2.51zM25.21 24l-3.43-1.16a8.86 8.86 0 0 1-2.71 1.57L18.36 28h-4.72l-.71-3.55a9.36 9.36 0 0 1-2.7-1.57L6.79 24l-2.36-4l2.72-2.4a8.9 8.9 0 0 1 0-3.13L4.43 12l2.36-4l3.43 1.16a8.86 8.86 0 0 1 2.71-1.57L13.64 4h4.72l.71 3.55a9.36 9.36 0 0 1 2.7 1.57L25.21 8l2.36 4l-2.72 2.4a8.9 8.9 0 0 1 0 3.13L27.57 20z\" fill=\"currentColor\"/><path d=\"M16 22a6 6 0 1 1 6-6a5.94 5.94 0 0 1-6 6zm0-10a3.91 3.91 0 0 0-4 4a3.91 3.91 0 0 0 4 4a3.91 3.91 0 0 0 4-4a3.91 3.91 0 0 0-4-4z\" fill=\"currentColor\"/></svg>";

const __vite_glob_1_24 = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"1em\" height=\"1em\" viewBox=\"0 0 32 32\"><path fill=\"currentColor\" d=\"M23 20a5 5 0 0 0-3.89 1.89l-7.31-4.57a4.46 4.46 0 0 0 0-2.64l7.31-4.57A5 5 0 1 0 18 7a4.79 4.79 0 0 0 .2 1.32l-7.31 4.57a5 5 0 1 0 0 6.22l7.31 4.57A4.79 4.79 0 0 0 18 25a5 5 0 1 0 5-5Zm0-16a3 3 0 1 1-3 3a3 3 0 0 1 3-3ZM7 19a3 3 0 1 1 3-3a3 3 0 0 1-3 3Zm16 9a3 3 0 1 1 3-3a3 3 0 0 1-3 3Z\"/></svg>";

const __vite_glob_1_25 = "<svg id=\"emoji\" viewBox=\"0 0 72 72\" xmlns=\"http://www.w3.org/2000/svg\">\n  <g id=\"color\">\n    <circle cx=\"36.0001\" cy=\"36\" r=\"22.9999\" fill=\"#FCEA2B\"/>\n  </g>\n  <g id=\"hair\"/>\n  <g id=\"skin\"/>\n  <g id=\"skin-shadow\"/>\n  <g id=\"line\">\n    <circle cx=\"36\" cy=\"36\" r=\"23\" fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"/>\n    <path fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M45.8149,44.9293 c-2.8995,1.6362-6.2482,2.5699-9.8149,2.5699s-6.9153-0.9336-9.8149-2.5699\"/>\n    <path d=\"M30,31c0,1.6568-1.3448,3-3,3c-1.6553,0-3-1.3433-3-3c0-1.6552,1.3447-3,3-3C28.6552,28,30,29.3448,30,31\"/>\n    <path d=\"M48,31c0,1.6568-1.3447,3-3,3s-3-1.3433-3-3c0-1.6552,1.3447-3,3-3S48,29.3448,48,31\"/>\n  </g>\n</svg>\n";

const __vite_glob_1_26 = "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"1em\" height=\"1em\" preserveAspectRatio=\"xMidYMid meet\" viewBox=\"0 0 32 32\"><path d=\"M16 12.005a4 4 0 1 1-4 4a4.005 4.005 0 0 1 4-4m0-2a6 6 0 1 0 6 6a6 6 0 0 0-6-6z\" fill=\"currentColor\"/><path d=\"M5.394 6.813l1.414-1.415l3.506 3.506L8.9 10.318z\" fill=\"currentColor\"/><path d=\"M2 15.005h5v2H2z\" fill=\"currentColor\"/><path d=\"M5.394 25.197L8.9 21.691l1.414 1.415l-3.506 3.505z\" fill=\"currentColor\"/><path d=\"M15 25.005h2v5h-2z\" fill=\"currentColor\"/><path d=\"M21.687 23.106l1.414-1.415l3.506 3.506l-1.414 1.414z\" fill=\"currentColor\"/><path d=\"M25 15.005h5v2h-5z\" fill=\"currentColor\"/><path d=\"M21.687 8.904l3.506-3.506l1.414 1.415l-3.506 3.505z\" fill=\"currentColor\"/><path d=\"M15 2.005h2v5h-2z\" fill=\"currentColor\"/></svg>";

const __vite_glob_1_27 = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"1em\" height=\"1em\" viewBox=\"0 0 32 32\"><path fill=\"currentColor\" d=\"M12 12h2v12h-2zm6 0h2v12h-2z\"/><path fill=\"currentColor\" d=\"M4 6v2h2v20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8h2V6zm4 22V8h16v20zm4-26h8v2h-8z\"/></svg>";

const __vite_glob_1_28 = "<svg id=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 32\"><defs><style>.cls-1{fill:none;}</style></defs><title>unlink</title><rect x=\"5\" y=\"3.59\" width=\"2\" height=\"4.83\" transform=\"translate(-2.49 6) rotate(-45.01)\"/><rect x=\"25\" y=\"23.58\" width=\"2\" height=\"4.83\" transform=\"translate(-10.77 25.99) rotate(-44.99)\"/><rect x=\"11\" y=\"2\" width=\"2\" height=\"4\"/><rect x=\"2\" y=\"11\" width=\"4\" height=\"2\"/><rect x=\"26\" y=\"19\" width=\"4\" height=\"2\"/><rect x=\"19\" y=\"26\" width=\"2\" height=\"4\"/><path d=\"M16.58,21.07l-3.71,3.72a4,4,0,1,1-5.66-5.66l3.72-3.72L9.51,14,5.8,17.72a6,6,0,0,0-.06,8.54A6,6,0,0,0,10,28a6.07,6.07,0,0,0,4.32-1.8L18,22.49Z\"/><path d=\"M15.41,10.93l3.72-3.72a4,4,0,1,1,5.66,5.66l-3.72,3.72L22.49,18l3.71-3.72a6,6,0,0,0,.06-8.54A6,6,0,0,0,22,4a6.07,6.07,0,0,0-4.32,1.8L14,9.51Z\"/><rect id=\"_Transparent_Rectangle_\" data-name=\"&lt;Transparent Rectangle&gt;\" class=\"cls-1\" width=\"32\" height=\"32\"/></svg>";

const __vite_glob_1_29 = "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"1em\" height=\"1em\" preserveAspectRatio=\"xMidYMid meet\" viewBox=\"0 0 32 32\"><path d=\"M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2zm0 26a12 12 0 1 1 12-12a12 12 0 0 1-12 12z\" fill=\"currentColor\"/><path d=\"M15 8h2v11h-2z\" fill=\"currentColor\"/><path d=\"M16 22a1.5 1.5 0 1 0 1.5 1.5A1.5 1.5 0 0 0 16 22z\" fill=\"currentColor\"/></svg>";

const SPRITESHEET_NAMESPACE = `astroicon`;

const baseURL = "https://api.astroicon.dev/v1/";
const requests = /* @__PURE__ */ new Map();
const fetchCache = /* @__PURE__ */ new Map();
async function get(pack, name) {
  const url = new URL(`./${pack}/${name}`, baseURL).toString();
  if (requests.has(url)) {
    return await requests.get(url);
  }
  if (fetchCache.has(url)) {
    return fetchCache.get(url);
  }
  let request = async () => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(await res.text());
    }
    const contentType = res.headers.get("Content-Type");
    if (!contentType.includes("svg")) {
      throw new Error(`[astro-icon] Unable to load "${name}" because it did not resolve to an SVG!

Recieved the following "Content-Type":
${contentType}`);
    }
    const svg = await res.text();
    fetchCache.set(url, svg);
    requests.delete(url);
    return svg;
  };
  let promise = request();
  requests.set(url, promise);
  return await promise;
}

const splitAttrsTokenizer = /([a-z0-9_\:\-]*)\s*?=\s*?(['"]?)(.*?)\2\s+/gim;
const domParserTokenizer = /(?:<(\/?)([a-zA-Z][a-zA-Z0-9\:]*)(?:\s([^>]*?))?((?:\s*\/)?)>|(<\!\-\-)([\s\S]*?)(\-\->)|(<\!\[CDATA\[)([\s\S]*?)(\]\]>))/gm;
const splitAttrs = (str) => {
  let res = {};
  let token;
  if (str) {
    splitAttrsTokenizer.lastIndex = 0;
    str = " " + (str || "") + " ";
    while (token = splitAttrsTokenizer.exec(str)) {
      res[token[1]] = token[3];
    }
  }
  return res;
};
function optimizeSvg(contents, name, options) {
  return optimize(contents, {
    plugins: [
      "removeDoctype",
      "removeXMLProcInst",
      "removeComments",
      "removeMetadata",
      "removeXMLNS",
      "removeEditorsNSData",
      "cleanupAttrs",
      "minifyStyles",
      "convertStyleToAttrs",
      {
        name: "cleanupIDs",
        params: { prefix: `${SPRITESHEET_NAMESPACE}:${name}` }
      },
      "removeRasterImages",
      "removeUselessDefs",
      "cleanupNumericValues",
      "cleanupListOfValues",
      "convertColors",
      "removeUnknownsAndDefaults",
      "removeNonInheritableGroupAttrs",
      "removeUselessStrokeAndFill",
      "removeViewBox",
      "cleanupEnableBackground",
      "removeHiddenElems",
      "removeEmptyText",
      "convertShapeToPath",
      "moveElemsAttrsToGroup",
      "moveGroupAttrsToElems",
      "collapseGroups",
      "convertPathData",
      "convertTransform",
      "removeEmptyAttrs",
      "removeEmptyContainers",
      "mergePaths",
      "removeUnusedNS",
      "sortAttrs",
      "removeTitle",
      "removeDesc",
      "removeDimensions",
      "removeStyleElement",
      "removeScriptElement"
    ]
  }).data;
}
const preprocessCache = /* @__PURE__ */ new Map();
function preprocess(contents, name, { optimize }) {
  if (preprocessCache.has(contents)) {
    return preprocessCache.get(contents);
  }
  if (optimize) {
    contents = optimizeSvg(contents, name);
  }
  domParserTokenizer.lastIndex = 0;
  let result = contents;
  let token;
  if (contents) {
    while (token = domParserTokenizer.exec(contents)) {
      const tag = token[2];
      if (tag === "svg") {
        const attrs = splitAttrs(token[3]);
        result = contents.slice(domParserTokenizer.lastIndex).replace(/<\/svg>/gim, "").trim();
        const value = { innerHTML: result, defaultProps: attrs };
        preprocessCache.set(contents, value);
        return value;
      }
    }
  }
}
function normalizeProps(inputProps) {
  const size = inputProps.size;
  delete inputProps.size;
  const w = inputProps.width ?? size;
  const h = inputProps.height ?? size;
  const width = w ? toAttributeSize(w) : void 0;
  const height = h ? toAttributeSize(h) : void 0;
  return { ...inputProps, width, height };
}
const toAttributeSize = (size) => String(size).replace(/(?<=[0-9])x$/, "em");
async function load(name, inputProps, optimize) {
  const key = name;
  if (!name) {
    throw new Error("<Icon> requires a name!");
  }
  let svg = "";
  let filepath = "";
  if (name.includes(":")) {
    const [pack, ..._name] = name.split(":");
    name = _name.join(":");
    filepath = `/src/icons/${pack}`;
    let get$1;
    try {
      const files = /* #__PURE__ */ Object.assign({


});
      const keys = Object.fromEntries(
        Object.keys(files).map((key2) => [key2.replace(/\.[cm]?[jt]s$/, ""), key2])
      );
      if (!(filepath in keys)) {
        throw new Error(`Could not find the file "${filepath}"`);
      }
      const mod = files[keys[filepath]];
      if (typeof mod.default !== "function") {
        throw new Error(
          `[astro-icon] "${filepath}" did not export a default function!`
        );
      }
      get$1 = mod.default;
    } catch (e) {
    }
    if (typeof get$1 === "undefined") {
      get$1 = get.bind(null, pack);
    }
    const contents = await get$1(name, inputProps);
    if (!contents) {
      throw new Error(
        `<Icon pack="${pack}" name="${name}" /> did not return an icon!`
      );
    }
    if (!/<svg/gim.test(contents)) {
      throw new Error(
        `Unable to process "<Icon pack="${pack}" name="${name}" />" because an SVG string was not returned!

Recieved the following content:
${contents}`
      );
    }
    svg = contents;
  } else {
    filepath = `/src/icons/${name}.svg`;
    try {
      const files = /* #__PURE__ */ Object.assign({"/src/icons/add.svg": __vite_glob_1_0,"/src/icons/angry.svg": __vite_glob_1_1,"/src/icons/book.svg": __vite_glob_1_2,"/src/icons/camera.svg": __vite_glob_1_3,"/src/icons/campsite.svg": __vite_glob_1_4,"/src/icons/checkmark-outline.svg": __vite_glob_1_5,"/src/icons/close.svg": __vite_glob_1_6,"/src/icons/document-download.svg": __vite_glob_1_7,"/src/icons/edit.svg": __vite_glob_1_8,"/src/icons/face-cool.svg": __vite_glob_1_9,"/src/icons/favorite.svg": __vite_glob_1_10,"/src/icons/flash.svg": __vite_glob_1_11,"/src/icons/happy.svg": __vite_glob_1_12,"/src/icons/information.svg": __vite_glob_1_13,"/src/icons/link.svg": __vite_glob_1_14,"/src/icons/list.svg": __vite_glob_1_15,"/src/icons/loving.svg": __vite_glob_1_16,"/src/icons/moon.svg": __vite_glob_1_17,"/src/icons/neutral.svg": __vite_glob_1_18,"/src/icons/qr-code.svg": __vite_glob_1_19,"/src/icons/rage.svg": __vite_glob_1_20,"/src/icons/sad.svg": __vite_glob_1_21,"/src/icons/save.svg": __vite_glob_1_22,"/src/icons/settings.svg": __vite_glob_1_23,"/src/icons/share.svg": __vite_glob_1_24,"/src/icons/smiling.svg": __vite_glob_1_25,"/src/icons/sun.svg": __vite_glob_1_26,"/src/icons/trash-can.svg": __vite_glob_1_27,"/src/icons/unlink.svg": __vite_glob_1_28,"/src/icons/warning.svg": __vite_glob_1_29


});
      if (!(filepath in files)) {
        throw new Error(`Could not find the file "${filepath}"`);
      }
      const contents = files[filepath];
      if (!/<svg/gim.test(contents)) {
        throw new Error(
          `Unable to process "${filepath}" because it is not an SVG!

Recieved the following content:
${contents}`
        );
      }
      svg = contents;
    } catch (e) {
      throw new Error(
        `[astro-icon] Unable to load "${filepath}". Does the file exist?`
      );
    }
  }
  const { innerHTML, defaultProps } = preprocess(svg, key, { optimize });
  if (!innerHTML.trim()) {
    throw new Error(`Unable to parse "${filepath}"!`);
  }
  return {
    innerHTML,
    props: { ...defaultProps, ...normalizeProps(inputProps) }
  };
}

const $$Astro$7 = createAstro();
const $$Icon = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$Icon;
  let { name, pack, title, optimize = true, class: className, ...inputProps } = Astro2.props;
  let props = {};
  if (pack) {
    name = `${pack}:${name}`;
  }
  let innerHTML = "";
  try {
    const svg = await load(name, { ...inputProps, class: className }, optimize);
    innerHTML = svg.innerHTML;
    props = svg.props;
  } catch (e) {
    {
      throw new Error(`[astro-icon] Unable to load icon "${name}"!
${e}`);
    }
  }
  return renderTemplate`${maybeRenderHead()}<svg${spreadAttributes(props)}${addAttribute(name, "astro-icon")}>${unescapeHTML((title ? `<title>${title}</title>` : "") + innerHTML)}</svg>`;
}, "/home/wao/Meteor/Workspace/Nao/evotico/node_modules/astro-icon/lib/Icon.astro", void 0);

const sprites = /* @__PURE__ */ new WeakMap();
function trackSprite(request, name) {
  let currentSet = sprites.get(request);
  if (!currentSet) {
    currentSet = /* @__PURE__ */ new Set([name]);
  } else {
    currentSet.add(name);
  }
  sprites.set(request, currentSet);
}
const warned = /* @__PURE__ */ new Set();
async function getUsedSprites(request) {
  const currentSet = sprites.get(request);
  if (currentSet) {
    return Array.from(currentSet);
  }
  if (!warned.has(request)) {
    const { pathname } = new URL(request.url);
    console.log(`[astro-icon] No sprites found while rendering "${pathname}"`);
    warned.add(request);
  }
  return [];
}

const $$Astro$6 = createAstro();
const $$Spritesheet = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Spritesheet;
  const { optimize = true, style, ...props } = Astro2.props;
  const names = await getUsedSprites(Astro2.request);
  const icons = await Promise.all(names.map((name) => {
    return load(name, {}, optimize).then((res) => ({ ...res, name })).catch((e) => {
      {
        throw new Error(`[astro-icon] Unable to load icon "${name}"!
${e}`);
      }
    });
  }));
  return renderTemplate`${maybeRenderHead()}<svg${addAttribute(`position: absolute; width: 0; height: 0; overflow: hidden; ${style ?? ""}`.trim(), "style")}${spreadAttributes({ "aria-hidden": true, ...props })} astro-icon-spritesheet> ${icons.map((icon) => renderTemplate`<symbol${spreadAttributes(icon.props)}${addAttribute(`${SPRITESHEET_NAMESPACE}:${icon.name}`, "id")}>${unescapeHTML(icon.innerHTML)}</symbol>`)} </svg>`;
}, "/home/wao/Meteor/Workspace/Nao/evotico/node_modules/astro-icon/lib/Spritesheet.astro", void 0);

const $$Astro$5 = createAstro();
const $$SpriteProvider = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$SpriteProvider;
  const content = await Astro2.slots.render("default");
  return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(content)}` })}${renderComponent($$result, "Spritesheet", $$Spritesheet, {})}`;
}, "/home/wao/Meteor/Workspace/Nao/evotico/node_modules/astro-icon/lib/SpriteProvider.astro", void 0);

const $$Astro$4 = createAstro();
const $$Sprite = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Sprite;
  let { name, pack, title, class: className, x, y, ...inputProps } = Astro2.props;
  const props = normalizeProps(inputProps);
  if (pack) {
    name = `${pack}:${name}`;
  }
  const href = `#${SPRITESHEET_NAMESPACE}:${name}`;
  trackSprite(Astro2.request, name);
  return renderTemplate`${maybeRenderHead()}<svg${spreadAttributes(props)}${addAttribute(className, "class")}${addAttribute(name, "astro-icon")}> ${title ? renderTemplate`<title>${title}</title>` : ""} <use${spreadAttributes({ "xlink:href": href, width: props.width, height: props.height, x, y })}></use> </svg>`;
}, "/home/wao/Meteor/Workspace/Nao/evotico/node_modules/astro-icon/lib/Sprite.astro", void 0);

Object.assign($$Sprite, { Provider: $$SpriteProvider });

const $$Astro$3 = createAstro();
const $$Header = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Header;
  const supportedLanguages = E.locales;
  const currentLanguage = E.locale;
  const primaryLocale = E.primaryLocale;
  console.log(primaryLocale);
  const { pathname } = Astro2.url;
  const theme = Astro2.cookies.get("theme")?.value || "light";
  const removeLanguageFromPath = (path) => {
    const pathSegments = path.split("/").filter(Boolean);
    if (supportedLanguages.includes(pathSegments[0])) {
      pathSegments.shift();
    }
    return "/" + pathSegments.join("/");
  };
  const pathnameWithoutLanguage = removeLanguageFromPath(pathname);
  return renderTemplate`${maybeRenderHead()}<header> <div class="navbar bg-base-100"> <div class="flex-1 items-center"> <a${addAttribute("btn btn-link " + (pathname.includes("/about") ? "selected" : ""), "class")}${addAttribute(cl("/about"), "href")}> ${al("buttons.about")} </a> <a${addAttribute("btn btn-link " + (pathname.includes("/dashboard") ? "selected" : ""), "class")}${addAttribute(cl("/dashboard"), "href")}> ${al("buttons.dashboard")} </a> </div> <div class="flex-none items-center"> <select class="select select-xs mx-2" onchange="location = this.value"> ${supportedLanguages.map((lang) => renderTemplate`<option${addAttribute(lang === currentLanguage, "selected")}${addAttribute(`${lang !== primaryLocale ? lang : ""}${pathnameWithoutLanguage}`, "value")}> ${lang} </option>`)} </select> <form action="/api/theme" method="POST"> <input type="hidden" name="theme"${addAttribute(theme === "light" ? "dark" : "light", "value")}> <button type="submit" class="btn btn-ghost btn-sm"> ${theme === "dark" ? renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "class": "icon-sun", "width": "22", "name": "sun" })}` : renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "class": "icon-moon", "width": "22", "name": "moon" })}`} </button> </form> </div> </div> </header>`;
}, "/home/wao/Meteor/Workspace/Nao/evotico/src/components/navigation/Header.astro", void 0);

const $$Astro$2 = createAstro();
const $$BaseLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const supportedLanguages = E.locales;
  const { title, description } = Astro2.props;
  const { url } = Astro2;
  const display_title = `Evotico ${title ? `- ${title}` : ""}`;
  const theme = Astro2.cookies.get("theme")?.value || "light";
  if (url.hash.includes("#/app/")) {
    const newHash = url.hash.replace("#/app/", "");
    const cleanHash = newHash.split("/")[0];
    Astro2.redirect(`${url.href}/process/${cleanHash}`);
  }
  return renderTemplate`<html${addAttribute(E.locale, "lang")}${addAttribute(theme, "data-theme")}${addAttribute(theme, "class")}> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover,user-scalable=no"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="description"${addAttribute(description, "content")}><meta name="keywords" content="evotico, ukuvota, voting, democracy, consensus, collaborative"><meta name="author" content="NaoX"><meta name="generator"${addAttribute(Astro2.generator, "content")}><link rel="apple-touch-icon" sizes="180x180" href="/metadata/apple-touch-icon.png"><link rel="icon" type="image/png" sizes="32x32" href="/metadata/favicon-32x32.png"><link rel="icon" type="image/png" sizes="16x16" href="/metadata/favicon-16x16.png"><link rel="manifest" href="/metadata/site.webmanifest"><title>${display_title}</title><meta name="generator"${addAttribute(Astro2.generator, "content")}>${supportedLanguages.map((supportedLanguage) => renderTemplate`<link rel="alternate"${addAttribute(supportedLanguage, "hreflang")}${addAttribute(cl(url.href), "href")}>`)}<!-- SEO --><meta name="robots" content="index,follow"><meta name="googlebot" content="index,follow"><!-- Open Graph --><meta property="og:title"${addAttribute(display_title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:image"${addAttribute(`${url.origin}social_logo.png`, "content")}><meta property="og:url"${addAttribute(url.origin, "content")}><meta property="og:type" content="website"><!-- Twitter Card --><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"${addAttribute(display_title, "content")}><meta name="twitter:description"${addAttribute(description, "content")}><meta name="twitter:image"${addAttribute(`${url.origin}social_logo.png`, "content")}>${renderHead()}</head> <body> ${renderComponent($$result, "Header", $$Header, {})} <main> ${renderSlot($$result, $$slots["default"])} </main> <br> </body></html>`;
}, "/home/wao/Meteor/Workspace/Nao/evotico/src/layouts/BaseLayout.astro", void 0);

const __variableDynamicImportRuntimeHelper = (glob, path) => {
    const v = glob[path];
    if (v) {
        return typeof v === 'function' ? v() : Promise.resolve(v);
    }
    return new Promise((_, reject) => {
        (typeof queueMicrotask === 'function' ? queueMicrotask : setTimeout)(reject.bind(null, new Error('Unknown variable dynamic import: ' + path)));
    });
};

const $$Astro$1 = createAstro();
const $$ContentDoc = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ContentDoc;
  const { file_name } = Astro2.props;
  const content = await __variableDynamicImportRuntimeHelper((/* #__PURE__ */ Object.assign({"../../content/de/Donate.md": () => import('../Donate_I_ioY9dK.mjs'),"../../content/de/Guide.md": () => import('../Guide_FeZz4iAv.mjs'),"../../content/de/Introduction.md": () => import('../Introduction_CZ50Zv64.mjs'),"../../content/de/NegativeScoreWeighting.md": () => import('../NegativeScoreWeighting_Z_9fDrpC.mjs'),"../../content/de/PrivacyPolicy.md": () => import('../PrivacyPolicy_NOCchV5W.mjs'),"../../content/en/Donate.md": () => import('../Donate_QbqG0RYk.mjs'),"../../content/en/Guide.md": () => import('../Guide_DouCiwe4.mjs'),"../../content/en/Introduction.md": () => import('../Introduction_eCqMcOD_.mjs'),"../../content/en/NegativeScoreWeighting.md": () => import('../NegativeScoreWeighting_q-C15cwp.mjs'),"../../content/en/PrivacyPolicy.md": () => import('../PrivacyPolicy_IAf_C33c.mjs')})), `../../content/${E.locale}/${file_name}.md`);
  return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(content.compiledContent())}` })}`;
}, "/home/wao/Meteor/Workspace/Nao/evotico/src/components/ui/ContentDoc.astro", void 0);

const $$Astro = createAstro();
const $$Donate = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Donate;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": al("donate"), "description": al("description") }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ContentDoc", $$ContentDoc, { "file_name": "Donate" })} ` })}`;
}, "/home/wao/Meteor/Workspace/Nao/evotico/src/pages/donate.astro", void 0);

const $$file = "/home/wao/Meteor/Workspace/Nao/evotico/src/pages/donate.astro";
const $$url = "/donate";

const donate = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Donate,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$BaseLayout as $, E, al as a, $$Icon as b, cl as c, $$ContentDoc as d, $$Donate as e, donate as f, ys as y };
