import * as adapter from '@astrojs/netlify/netlify-functions.js';
import { renderers } from './renderers.mjs';
import { manifest } from './manifest_w_p6MVg4.mjs';

const _page0  = () => import('./chunks/generic_qyTY8pl1.mjs');
const _page1  = () => import('./chunks/index_0BjUuvuI.mjs');
const _page2  = () => import('./chunks/privacy-policy_g_Co6tdP.mjs');
const _page3  = () => import('./chunks/index_EItga2Uh.mjs');
const _page4  = () => import('./chunks/index_UGsDkY0L.mjs');
const _page5  = () => import('./chunks/index_CgcGmL7W.mjs');
const _page6  = () => import('./chunks/proposals_D1Z4CTrI.mjs');
const _page7  = () => import('./chunks/results_nh2drPvI.mjs');
const _page8  = () => import('./chunks/voting_9-LU5njN.mjs');
const _page9  = () => import('./chunks/index_7n7GvOCV.mjs');
const _page10  = () => import('./chunks/full-process_11lsbuXC.mjs');
const _page11  = () => import('./chunks/voting-only_Ss2hgtQl.mjs');
const _page12  = () => import('./chunks/create_udnzVMpr.mjs');
const _page13  = () => import('./chunks/phases_FGBaRkU8.mjs');
const _page14  = () => import('./chunks/review_zWg0Oq2-.mjs');
const _page15  = () => import('./chunks/donate_hMkUdKSG.mjs');
const _page16  = () => import('./chunks/index_FN0VzzeT.mjs');
const _page17  = () => import('./chunks/index_YU_iM_pB.mjs');
const _page18  = () => import('./chunks/process-store_WOJnWLxq.mjs');
const _page19  = () => import('./chunks/date-changer_20GWy1py.mjs');
const _page20  = () => import('./chunks/index_eT7DyUHl.mjs');
const _page21  = () => import('./chunks/index_BkAntlKE.mjs');
const _page22  = () => import('./chunks/index_ycelTI-F.mjs');
const _page23  = () => import('./chunks/_proposalId__oq0l88UH.mjs');
const _page24  = () => import('./chunks/voters_gP-kruES.mjs');
const _page25  = () => import('./chunks/vote_OJxLL_T0.mjs');
const _page26  = () => import('./chunks/theme_4Tlq28G7.mjs');
const _page27  = () => import('./chunks/index__f-gbEBS.mjs');
const _page28  = () => import('./chunks/index_aiMsMdu2.mjs');
const _page29  = () => import('./chunks/index_WvZAu6vl.mjs');
const _page30  = () => import('./chunks/index_DLvA_NxF.mjs');
const _page31  = () => import('./chunks/index_rGVHugU1.mjs');
const _page32  = () => import('./chunks/index_YNh5OnHe.mjs');
const _page33  = () => import('./chunks/index_xGSJzBD3.mjs');
const _page34  = () => import('./chunks/index_j2vAwk63.mjs');
const _page35  = () => import('./chunks/index_vMq_KTyw.mjs');
const _page36  = () => import('./chunks/index_yaGekQz4.mjs');
const _page37  = () => import('./chunks/index_EbX_u9-T.mjs');
const _page38  = () => import('./chunks/index_denDDRsE.mjs');
const _page39  = () => import('./chunks/index_TUmiI_Gh.mjs');
const _page40  = () => import('./chunks/index_0SXn9TBT.mjs');
const _page41  = () => import('./chunks/index_VGP3TPYG.mjs');
const _page42  = () => import('./chunks/index_Dyo3MS3P.mjs');
const _page43  = () => import('./chunks/index_7Lfh2wGw.mjs');const pageMap = new Map([["node_modules/astro/dist/assets/endpoint/generic.js", _page0],["src/pages/index.astro", _page1],["src/pages/privacy-policy.astro", _page2],["src/pages/dashboard/index.astro", _page3],["src/pages/process/index.astro", _page4],["src/pages/process/[id]/index.astro", _page5],["src/pages/process/[id]/proposals.astro", _page6],["src/pages/process/[id]/results.astro", _page7],["src/pages/process/[id]/voting.astro", _page8],["src/pages/create/index.astro", _page9],["src/pages/create/full-process.astro", _page10],["src/pages/create/voting-only.astro", _page11],["src/pages/create/create.astro", _page12],["src/pages/create/phases.astro", _page13],["src/pages/create/review.astro", _page14],["src/pages/donate.astro", _page15],["src/pages/about/index.astro", _page16],["src/pages/guide/index.astro", _page17],["src/pages/api/process-store.ts", _page18],["src/pages/api/date-changer.ts", _page19],["src/pages/api/process/index.ts", _page20],["src/pages/api/process/[id]/index.ts", _page21],["src/pages/api/process/[id]/proposals/index.ts", _page22],["src/pages/api/process/[id]/proposals/[proposalId].ts", _page23],["src/pages/api/process/[id]/voters.ts", _page24],["src/pages/api/process/[id]/vote.ts", _page25],["src/pages/api/theme.ts", _page26],["src/pages/de/index.astro", _page27],["src/pages/de/privacy-policy/index.astro", _page28],["src/pages/de/dashboard/index.astro", _page29],["src/pages/de/process/index.astro", _page30],["src/pages/de/process/[id]/index.astro", _page31],["src/pages/de/process/[id]/proposals/index.astro", _page32],["src/pages/de/process/[id]/results/index.astro", _page33],["src/pages/de/process/[id]/voting/index.astro", _page34],["src/pages/de/create/index.astro", _page35],["src/pages/de/create/full-process/index.astro", _page36],["src/pages/de/create/voting-only/index.astro", _page37],["src/pages/de/create/create/index.astro", _page38],["src/pages/de/create/phases/index.astro", _page39],["src/pages/de/create/review/index.astro", _page40],["src/pages/de/donate/index.astro", _page41],["src/pages/de/about/index.astro", _page42],["src/pages/de/guide/index.astro", _page43]]);
const _manifest = Object.assign(manifest, {
	pageMap,
	renderers,
});
const _args = {};

const _exports = adapter.createExports(_manifest, _args);
const handler = _exports['handler'];

const _start = 'start';
if(_start in adapter) {
	adapter[_start](_manifest, _args);
}

export { handler, pageMap };
