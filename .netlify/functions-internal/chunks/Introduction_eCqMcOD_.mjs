import { f as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro_fCW-vF1L.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<h3 id=\"what-is-evotico\">What Is Evotico?</h3>\n<p>Evotico represents the future of voting – a digital transformation bringing efficiency, security, and accessibility to the forefront of electoral processes. At its core, Evotico is about empowerment – enabling every voice to be heard through the power of technology.</p>\n<h3 id=\"our-application\">Our Application</h3>\n<p><strong>Evotico App:</strong> Our flagship application redefines how votes are cast and counted. Designed for both organizations and communities, the Evotico App offers a seamless, user-friendly experience, ensuring that everyone, regardless of technical skill, can participate easily.</p>\n<p><strong>Key Features:</strong></p>\n<ul>\n<li><strong>Security First:</strong> Advanced encryption and secure channels to ensure vote confidentiality and integrity.</li>\n<li><strong>Universal Accessibility:</strong> A platform that’s easy to navigate, with multilingual support, catering to a diverse user base.</li>\n<li><strong>Real-Time Results:</strong> Fast, accurate vote tallying for timely decision-making.</li>\n<li><strong>Eco-Friendly:</strong> A paperless solution contributing to environmental sustainability.</li>\n</ul>\n<h3 id=\"who-we-serve\">Who We Serve</h3>\n<p><strong>From Local Communities to Global Organizations:</strong> Whether it’s a local club election, a corporate shareholder vote, or a community poll, Evotico’s flexible platform adapts to various scales and needs.</p>\n<h3 id=\"join-the-movement\">Join the Movement</h3>\n<p>With Evotico, step into a new era of voting – one that’s digital, secure, and inclusive. Experience empowerment at your fingertips and make your vote count in the digital age.</p>";

				const frontmatter = {};
				const file = "/home/wao/Meteor/Workspace/Nao/evotico/src/content/en/Introduction.md";
				const url = undefined;
				function rawContent() {
					return "### What Is Evotico?\n\nEvotico represents the future of voting – a digital transformation bringing efficiency, security, and accessibility to the forefront of electoral processes. At its core, Evotico is about empowerment – enabling every voice to be heard through the power of technology.\n\n### Our Application\n\n**Evotico App:** Our flagship application redefines how votes are cast and counted. Designed for both organizations and communities, the Evotico App offers a seamless, user-friendly experience, ensuring that everyone, regardless of technical skill, can participate easily. \n\n**Key Features:**\n- **Security First:** Advanced encryption and secure channels to ensure vote confidentiality and integrity.\n- **Universal Accessibility:** A platform that's easy to navigate, with multilingual support, catering to a diverse user base.\n- **Real-Time Results:** Fast, accurate vote tallying for timely decision-making.\n- **Eco-Friendly:** A paperless solution contributing to environmental sustainability.\n\n### Who We Serve\n\n**From Local Communities to Global Organizations:** Whether it's a local club election, a corporate shareholder vote, or a community poll, Evotico's flexible platform adapts to various scales and needs.\n\n### Join the Movement\n\nWith Evotico, step into a new era of voting – one that's digital, secure, and inclusive. Experience empowerment at your fingertips and make your vote count in the digital age.";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":3,"slug":"what-is-evotico","text":"What Is Evotico?"},{"depth":3,"slug":"our-application","text":"Our Application"},{"depth":3,"slug":"who-we-serve","text":"Who We Serve"},{"depth":3,"slug":"join-the-movement","text":"Join the Movement"}];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
