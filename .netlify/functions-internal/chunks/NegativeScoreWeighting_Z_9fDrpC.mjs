import { f as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro_fCW-vF1L.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<p>Sie können den Einfluss negativer Bewertungen optional erhöhen, indem Sie die negative Bewertungsgewichtung verwenden. Dies ist ein einfacher Multiplikator: x1 hat keinen Einfluss auf negative Bewertungen, x2 verdoppelt ihren Einfluss, x3 verdreifacht ihn.</p>\n<p>Beispiel: Eine Abstimmung von -3 bei einer negativen Bewertungsgewichtung von x3 wird als -9 gezählt.</p>\n<p>Durch das Erhöhen des Einflusses von negativen Bewertungen bewegt sich die Gruppe hin zu Vorschlägen, die akzeptabler (weniger “negativ”) sind als Vorschläge, die bevorzugt (mehr netto “positiv”) sind.</p>\n<p>Die “richtige” Gewichtungsmultiplikator für Ihre Gruppe wird wahrscheinlich durch Experimente am besten gefunden werden!</p>";

				const frontmatter = {};
				const file = "/home/wao/Meteor/Workspace/Nao/evotico/src/content/de/NegativeScoreWeighting.md";
				const url = undefined;
				function rawContent() {
					return "Sie können den Einfluss negativer Bewertungen optional erhöhen, indem Sie die negative Bewertungsgewichtung verwenden. Dies ist ein einfacher Multiplikator: x1 hat keinen Einfluss auf negative Bewertungen, x2 verdoppelt ihren Einfluss, x3 verdreifacht ihn.\n\nBeispiel: Eine Abstimmung von -3 bei einer negativen Bewertungsgewichtung von x3 wird als -9 gezählt.\n\nDurch das Erhöhen des Einflusses von negativen Bewertungen bewegt sich die Gruppe hin zu Vorschlägen, die akzeptabler (weniger \"negativ\") sind als Vorschläge, die bevorzugt (mehr netto \"positiv\") sind.\n\nDie \"richtige\" Gewichtungsmultiplikator für Ihre Gruppe wird wahrscheinlich durch Experimente am besten gefunden werden!";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
