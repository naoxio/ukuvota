import { f as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro_fCW-vF1L.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<h1 id=\"simplified-score-voting-process-guide\">Simplified Score Voting Process Guide</h1>\n<h2 id=\"step-1-define-the-topic\">Step 1: Define the Topic</h2>\n<ul>\n<li><strong>Topic Question</strong>: Name your process topic.</li>\n<li><strong>Description</strong>: Provide a clear and concise description.</li>\n<li><strong>Negative Score Weighting</strong>: Set how much more negative votes weigh compared to positive votes.</li>\n</ul>\n<h2 id=\"step-2-choose-the-process-type\">Step 2: Choose the Process Type</h2>\n<ul>\n<li>Decide between <strong>Voting Only</strong> (with predefined proposals) or <strong>Collection and Voting</strong></li>\n</ul>\n<h2 id=\"step-3-set-phase-durations\">Step 3: Set Phase Durations</h2>\n<ul>\n<li>After selecting the process type, assign a duration for each phase (collection and/or voting).</li>\n</ul>\n<h2 id=\"step-4-create-the-process\">Step 4: Create the Process</h2>\n<ul>\n<li>Create the process. You will then receive a link to share it with participants.</li>\n</ul>\n<h2 id=\"step-5-gather-results\">Step 5: Gather Results</h2>\n<ul>\n<li>At the end of the phases, receive a results page with the highest scoring proposals highlighted.</li>\n<li>Identify the consensus or most favored solutions.</li>\n</ul>";

				const frontmatter = {};
				const file = "/home/wao/Meteor/Workspace/Nao/evotico/src/content/en/Guide.md";
				const url = undefined;
				function rawContent() {
					return "# Simplified Score Voting Process Guide\n\n## Step 1: Define the Topic\n- **Topic Question**: Name your process topic.\n- **Description**: Provide a clear and concise description.\n- **Negative Score Weighting**: Set how much more negative votes weigh compared to positive votes.\n\n## Step 2: Choose the Process Type\n- Decide between **Voting Only** (with predefined proposals) or **Collection and Voting** \n\n## Step 3: Set Phase Durations\n- After selecting the process type, assign a duration for each phase (collection and/or voting).\n\n## Step 4: Create the Process\n- Create the process. You will then receive a link to share it with participants.\n\n## Step 5: Gather Results\n- At the end of the phases, receive a results page with the highest scoring proposals highlighted.\n- Identify the consensus or most favored solutions.\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":1,"slug":"simplified-score-voting-process-guide","text":"Simplified Score Voting Process Guide"},{"depth":2,"slug":"step-1-define-the-topic","text":"Step 1: Define the Topic"},{"depth":2,"slug":"step-2-choose-the-process-type","text":"Step 2: Choose the Process Type"},{"depth":2,"slug":"step-3-set-phase-durations","text":"Step 3: Set Phase Durations"},{"depth":2,"slug":"step-4-create-the-process","text":"Step 4: Create the Process"},{"depth":2,"slug":"step-5-gather-results","text":"Step 5: Gather Results"}];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
