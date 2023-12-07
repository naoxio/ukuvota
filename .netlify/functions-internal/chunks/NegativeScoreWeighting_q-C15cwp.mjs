import { f as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro_fCW-vF1L.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<p>You may optionally increase the impact of negative scores using the negative score weighting. This is a simple mutiplier: x1 has no impact on negative scores, x2 doubles their impact, x3 triples them.</p>\n<p>Example: a vote of -3 where there is a negative score weighting of x3 is counted as -9.</p>\n<p>By increasing the impact of negative scores, the group moves towards proposals which are more <em>acceptable</em> (less ‘negative’) than proposals which are more <em>preferred</em> (more net ‘positive.‘)</p>\n<p>The ‘right’ weighting multiplier for your group will probably best be found through experimentation!</p>";

				const frontmatter = {};
				const file = "/home/wao/Meteor/Workspace/Nao/evotico/src/content/en/NegativeScoreWeighting.md";
				const url = undefined;
				function rawContent() {
					return "You may optionally increase the impact of negative scores using the negative score weighting. This is a simple mutiplier: x1 has no impact on negative scores, x2 doubles their impact, x3 triples them.\n\nExample: a vote of -3 where there is a negative score weighting of x3 is counted as -9.\n\nBy increasing the impact of negative scores, the group moves towards proposals which are more _acceptable_ (less 'negative') than proposals which are more _preferred_ (more net 'positive.')\n\nThe 'right' weighting multiplier for your group will probably best be found through experimentation!";
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
