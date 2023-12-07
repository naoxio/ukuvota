import { f as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro_fCW-vF1L.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<h2 id=\"dear-supporter\">Dear supporter</h2>\n<p>Thank you for considering a donation to Evotico, an open source project dedicated to providing a collaborative voting tool that helps individuals and groups make informed decisions.</p>\n<p>With your donation, we can continue to improve and expand the capabilities of the platform, making it accessible to even more individuals and communities around the world.</p>\n<p>Your contribution will directly fund the development of new features, maintenance of the existing platform, and support for our dedicated team of volunteers.</p>\n<p>Together, we can create a more equitable and participatory world. Thank you for your generosity and support.</p>\n<p>Sincerely,</p>\n<p>The Evotico Team</p>\n<p>Donations are managed by our parent Organization NaoX.</p>\n<ul>\n<li><a href=\"https://coindrop.to/naox\">Coindrop</a></li>\n<li><a href=\"https://liberapay.com/NaoX/\">Liberapay</a></li>\n</ul>";

				const frontmatter = {};
				const file = "/home/wao/Meteor/Workspace/Nao/evotico/src/content/en/Donate.md";
				const url = undefined;
				function rawContent() {
					return "## Dear supporter\n\nThank you for considering a donation to Evotico, an open source project dedicated to providing a collaborative voting tool that helps individuals and groups make informed decisions.\n\nWith your donation, we can continue to improve and expand the capabilities of the platform, making it accessible to even more individuals and communities around the world.\n\nYour contribution will directly fund the development of new features, maintenance of the existing platform, and support for our dedicated team of volunteers.\n\nTogether, we can create a more equitable and participatory world. Thank you for your generosity and support.\n\nSincerely,\n\nThe Evotico Team\n\nDonations are managed by our parent Organization NaoX.\n - [Coindrop](https://coindrop.to/naox)\n - [Liberapay](https://liberapay.com/NaoX/)";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":2,"slug":"dear-supporter","text":"Dear supporter"}];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
