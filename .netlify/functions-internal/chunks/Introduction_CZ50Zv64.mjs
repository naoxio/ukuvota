import { f as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro_fCW-vF1L.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<h3 id=\"was-ist-evotico\">Was ist Evotico?</h3>\n<p>Evotico repräsentiert die Zukunft des Wählens – eine digitale Transformation, die Effizienz, Sicherheit und Zugänglichkeit in den Vordergrund der Wahlprozesse stellt. Im Kern geht es bei Evotico um Empowerment – jede Stimme durch die Kraft der Technologie hörbar zu machen.</p>\n<h3 id=\"unsere-anwendung\">Unsere Anwendung</h3>\n<p><strong>Evotico App:</strong> Unsere Flaggschiff-Anwendung definiert neu, wie Stimmen abgegeben und gezählt werden. Entwickelt für Organisationen und Gemeinschaften, bietet die Evotico App ein nahtloses, benutzerfreundliches Erlebnis und stellt sicher, dass jeder, unabhängig von technischen Fähigkeiten, einfach teilnehmen kann.</p>\n<p><strong>Wesentliche Merkmale:</strong></p>\n<ul>\n<li><strong>Sicherheit an erster Stelle:</strong> Fortschrittliche Verschlüsselung und sichere Kanäle, um die Vertraulichkeit und Integrität der Stimmen zu gewährleisten.</li>\n<li><strong>Universelle Zugänglichkeit:</strong> Eine leicht zu navigierende Plattform mit mehrsprachiger Unterstützung, die sich an eine vielfältige Benutzerbasis richtet.</li>\n<li><strong>Echtzeitergebnisse:</strong> Schnelle, genaue Stimmenauszählung für zeitnahe Entscheidungsfindung.</li>\n<li><strong>Umweltfreundlich:</strong> Eine papierlose Lösung, die zur Umweltnachhaltigkeit beiträgt.</li>\n</ul>\n<h3 id=\"wen-wir-bedienen\">Wen wir bedienen</h3>\n<p><strong>Von lokalen Gemeinschaften bis zu globalen Organisationen:</strong> Ob es sich um eine Wahl in einem lokalen Club, eine Abstimmung von Aktionären eines Unternehmens oder eine Gemeinschaftsumfrage handelt, Evoticos flexible Plattform passt sich verschiedenen Größen und Bedürfnissen an.</p>\n<h3 id=\"treten-sie-der-bewegung-bei\">Treten Sie der Bewegung bei</h3>\n<p>Mit Evotico treten Sie in ein neues Zeitalter des Wählens ein – eines, das digital, sicher und inklusiv ist. Erleben Sie Empowerment direkt an Ihren Fingerspitzen und machen Sie Ihre Stimme in der digitalen Ära zählbar.</p>";

				const frontmatter = {};
				const file = "/home/wao/Meteor/Workspace/Nao/evotico/src/content/de/Introduction.md";
				const url = undefined;
				function rawContent() {
					return "### Was ist Evotico?\n\nEvotico repräsentiert die Zukunft des Wählens – eine digitale Transformation, die Effizienz, Sicherheit und Zugänglichkeit in den Vordergrund der Wahlprozesse stellt. Im Kern geht es bei Evotico um Empowerment – jede Stimme durch die Kraft der Technologie hörbar zu machen.\n\n### Unsere Anwendung\n\n**Evotico App:** Unsere Flaggschiff-Anwendung definiert neu, wie Stimmen abgegeben und gezählt werden. Entwickelt für Organisationen und Gemeinschaften, bietet die Evotico App ein nahtloses, benutzerfreundliches Erlebnis und stellt sicher, dass jeder, unabhängig von technischen Fähigkeiten, einfach teilnehmen kann.\n\n**Wesentliche Merkmale:**\n- **Sicherheit an erster Stelle:** Fortschrittliche Verschlüsselung und sichere Kanäle, um die Vertraulichkeit und Integrität der Stimmen zu gewährleisten.\n- **Universelle Zugänglichkeit:** Eine leicht zu navigierende Plattform mit mehrsprachiger Unterstützung, die sich an eine vielfältige Benutzerbasis richtet.\n- **Echtzeitergebnisse:** Schnelle, genaue Stimmenauszählung für zeitnahe Entscheidungsfindung.\n- **Umweltfreundlich:** Eine papierlose Lösung, die zur Umweltnachhaltigkeit beiträgt.\n\n### Wen wir bedienen\n\n**Von lokalen Gemeinschaften bis zu globalen Organisationen:** Ob es sich um eine Wahl in einem lokalen Club, eine Abstimmung von Aktionären eines Unternehmens oder eine Gemeinschaftsumfrage handelt, Evoticos flexible Plattform passt sich verschiedenen Größen und Bedürfnissen an.\n\n### Treten Sie der Bewegung bei\n\nMit Evotico treten Sie in ein neues Zeitalter des Wählens ein – eines, das digital, sicher und inklusiv ist. Erleben Sie Empowerment direkt an Ihren Fingerspitzen und machen Sie Ihre Stimme in der digitalen Ära zählbar.\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":3,"slug":"was-ist-evotico","text":"Was ist Evotico?"},{"depth":3,"slug":"unsere-anwendung","text":"Unsere Anwendung"},{"depth":3,"slug":"wen-wir-bedienen","text":"Wen wir bedienen"},{"depth":3,"slug":"treten-sie-der-bewegung-bei","text":"Treten Sie der Bewegung bei"}];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
