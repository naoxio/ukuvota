import { f as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro_fCW-vF1L.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<h1 id=\"vereinfachter-leitfaden-zum-punktbewertungsverfahren\">Vereinfachter Leitfaden zum Punktbewertungsverfahren</h1>\n<h2 id=\"schritt-1-thema-definieren\">Schritt 1: Thema definieren</h2>\n<ul>\n<li><strong>Fragethema</strong>: Benennen Sie Ihr Prozessthema.</li>\n<li><strong>Beschreibung</strong>: Geben Sie eine klare und knappe Beschreibung.</li>\n<li><strong>Gewichtung der Negativbewertung</strong>: Legen Sie fest, wie viel stärker negative Stimmen im Vergleich zu positiven gewichtet werden.</li>\n</ul>\n<h2 id=\"schritt-2-prozesstyp-wählen\">Schritt 2: Prozesstyp wählen</h2>\n<ul>\n<li>Entscheiden Sie sich zwischen <strong>Nur Abstimmung</strong> (mit vordefinierten Vorschlägen) oder <strong>Sammlung und Abstimmung</strong>.</li>\n</ul>\n<h2 id=\"schritt-3-phasendauer-festlegen\">Schritt 3: Phasendauer festlegen</h2>\n<ul>\n<li>Nach Auswahl des Prozesstyps bestimmen Sie die Dauer für jede Phase (Sammlung und/oder Abstimmung).</li>\n</ul>\n<h2 id=\"schritt-4-prozess-erstellen\">Schritt 4: Prozess erstellen</h2>\n<ul>\n<li>Erstellen Sie den Prozess. Danach erhalten Sie einen Link, den Sie mit den Teilnehmern teilen können.</li>\n</ul>\n<h2 id=\"schritt-5-ergebnisse-sammeln\">Schritt 5: Ergebnisse sammeln</h2>\n<ul>\n<li>Nach Abschluss der Phasen erhalten Sie eine Ergebnisseite mit den am höchsten bewerteten Vorschlägen hervorgehoben.</li>\n<li>Identifizieren Sie den Konsens oder die am meisten bevorzugten Lösungen.</li>\n</ul>";

				const frontmatter = {};
				const file = "/home/wao/Meteor/Workspace/Nao/evotico/src/content/de/Guide.md";
				const url = undefined;
				function rawContent() {
					return "# Vereinfachter Leitfaden zum Punktbewertungsverfahren\n\n## Schritt 1: Thema definieren\n- **Fragethema**: Benennen Sie Ihr Prozessthema.\n- **Beschreibung**: Geben Sie eine klare und knappe Beschreibung.\n- **Gewichtung der Negativbewertung**: Legen Sie fest, wie viel stärker negative Stimmen im Vergleich zu positiven gewichtet werden.\n\n## Schritt 2: Prozesstyp wählen\n- Entscheiden Sie sich zwischen **Nur Abstimmung** (mit vordefinierten Vorschlägen) oder **Sammlung und Abstimmung**.\n\n## Schritt 3: Phasendauer festlegen\n- Nach Auswahl des Prozesstyps bestimmen Sie die Dauer für jede Phase (Sammlung und/oder Abstimmung).\n\n## Schritt 4: Prozess erstellen\n- Erstellen Sie den Prozess. Danach erhalten Sie einen Link, den Sie mit den Teilnehmern teilen können.\n\n## Schritt 5: Ergebnisse sammeln\n- Nach Abschluss der Phasen erhalten Sie eine Ergebnisseite mit den am höchsten bewerteten Vorschlägen hervorgehoben.\n- Identifizieren Sie den Konsens oder die am meisten bevorzugten Lösungen.\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":1,"slug":"vereinfachter-leitfaden-zum-punktbewertungsverfahren","text":"Vereinfachter Leitfaden zum Punktbewertungsverfahren"},{"depth":2,"slug":"schritt-1-thema-definieren","text":"Schritt 1: Thema definieren"},{"depth":2,"slug":"schritt-2-prozesstyp-wählen","text":"Schritt 2: Prozesstyp wählen"},{"depth":2,"slug":"schritt-3-phasendauer-festlegen","text":"Schritt 3: Phasendauer festlegen"},{"depth":2,"slug":"schritt-4-prozess-erstellen","text":"Schritt 4: Prozess erstellen"},{"depth":2,"slug":"schritt-5-ergebnisse-sammeln","text":"Schritt 5: Ergebnisse sammeln"}];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
