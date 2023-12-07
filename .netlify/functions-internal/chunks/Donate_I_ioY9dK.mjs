import { f as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro_fCW-vF1L.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<h2 id=\"sehr-geehrter-unterstützer\">Sehr geehrter Unterstützer</h2>\n<p>vielen Dank, dass Sie eine Spende an Evotico in Erwägung ziehen. Evotico ist ein Open-Source-Projekt, das sich der Bereitstellung eines kollaborativen Abstimmungstools widmet, das Einzelpersonen und Gruppen dabei hilft, fundierte Entscheidungen zu treffen.</p>\n<p>Mit Ihrer Spende können wir die Fähigkeiten der Plattform weiter verbessern und erweitern, so dass sie noch mehr Einzelpersonen und Gemeinschaften auf der ganzen Welt zugänglich ist.</p>\n<p>Ihr Beitrag wird direkt in die Entwicklung neuer Funktionen, die Wartung der bestehenden Plattform und die Unterstützung unseres engagierten Teams von Freiwilligen fließen.</p>\n<p>Gemeinsam können wir eine gerechtere und partizipativere Welt schaffen. Vielen Dank für Ihre Großzügigkeit und Unterstützung.</p>\n<p>Mit freundlichen Grüßen,</p>\n<p>Das Evoti-Team</p>\n<p>Spenden werden von unserer Mutterorganisation NaoX verwaltet.</p>\n<ul>\n<li><a href=\"https://coindrop.to/naox\">Coindrop</a></li>\n<li><a href=\"https://liberapay.com/NaoX/\">Liberapay</a></li>\n</ul>";

				const frontmatter = {};
				const file = "/home/wao/Meteor/Workspace/Nao/evotico/src/content/de/Donate.md";
				const url = undefined;
				function rawContent() {
					return "## Sehr geehrter Unterstützer\n\nvielen Dank, dass Sie eine Spende an Evotico in Erwägung ziehen. Evotico ist ein Open-Source-Projekt, das sich der Bereitstellung eines kollaborativen Abstimmungstools widmet, das Einzelpersonen und Gruppen dabei hilft, fundierte Entscheidungen zu treffen.\n\nMit Ihrer Spende können wir die Fähigkeiten der Plattform weiter verbessern und erweitern, so dass sie noch mehr Einzelpersonen und Gemeinschaften auf der ganzen Welt zugänglich ist.\n\nIhr Beitrag wird direkt in die Entwicklung neuer Funktionen, die Wartung der bestehenden Plattform und die Unterstützung unseres engagierten Teams von Freiwilligen fließen.\n\nGemeinsam können wir eine gerechtere und partizipativere Welt schaffen. Vielen Dank für Ihre Großzügigkeit und Unterstützung.\n\nMit freundlichen Grüßen,\n\nDas Evoti-Team\n\nSpenden werden von unserer Mutterorganisation NaoX verwaltet.\n - [Coindrop](https://coindrop.to/naox)\n - [Liberapay](https://liberapay.com/NaoX/)";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":2,"slug":"sehr-geehrter-unterstützer","text":"Sehr geehrter Unterstützer"}];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
