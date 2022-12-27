type DefaultLangCode = "en"
type SupportedLangCode = "de"
type LangCode = DefaultLangCode | SupportedLangCode
type RouteUri = | "/quick/[id]" | "/quick/[id]/proposals" | "/quick/[id]/voting" | "/quick/create" | "/quick" | "/donate" | "/" 
type RouteParams = {"/quick/[id]": { "id": string; }; "/quick/[id]/proposals": { "id": string; }; "/quick/[id]/voting": { "id": string; }; "/quick/create": undefined; "/quick": undefined; "/donate": undefined; "/": undefined; }
type TranslationPath = "nav.about" | "nav.back" | "nav.go" | "nav.home" | "nav.quick" | "nav.donate" | "nav.toggle_dark" | "nav.toggle_langs" | "nav.start_quick" | "intro.desc" | "intro.dynamic-route" | "intro.hi" | "intro.aka" | "intro.whats-your-name" | "not-found" | "quick.title" | "quick.topic" | "quick.topicRule" | "quick.description" | "quick.weighting" | "quick.timeLeftHeading" | "quick.switchCalendar" | "quick.switchSlider" | "quick.proposalTime" | "quick.votingTime" | "quick.proposalEndTime" | "quick.votingEndTime" | "quick.votingLastFor" | "quick.addDefaultProposals" | "quick.defaultPropoqsals" | "quick.maxProposals" | "quick.amountProposals" | "quick.limitProposals" | "quick.starting" | "quick.emptyProposal" | "wip" | "layouts.title" | "TBD" | "pages.title.top" | "captchaCode" | "create" | "footer.powered" | "footer.hosted" | "footer.supported" | "footer.donations" | "footer.maintained" | "noRightsReserved" | "proposal.zero.title" | "proposal.zero.description" | "proposal.one.title" | "proposal.one.description" | "time.minutes" | "time.hours" | "time.days" | "redirect.legacy" | "pleaseInput" | "quick.defaultProposals"
type TranslationOptions = { "nav.about": {} | undefined; "nav.back": {} | undefined; "nav.go": {} | undefined; "nav.home": {} | undefined; "nav.quick": {} | undefined; "nav.donate": {} | undefined; "nav.toggle_dark": {} | undefined; "nav.toggle_langs": {} | undefined; "nav.start_quick": {} | undefined; "intro.desc": {} | undefined; "intro.dynamic-route": {} | undefined; "intro.hi": { name: string; }; "intro.aka": {} | undefined; "intro.whats-your-name": {} | undefined; "not-found": {} | undefined; "quick.title": {} | undefined; "quick.topic": {} | undefined; "quick.topicRule": {} | undefined; "quick.description": {} | undefined; "quick.weighting": {} | undefined; "quick.timeLeftHeading": {} | undefined; "quick.switchCalendar": {} | undefined; "quick.switchSlider": {} | undefined; "quick.proposalTime": {} | undefined; "quick.votingTime": {} | undefined; "quick.proposalEndTime": {} | undefined; "quick.votingEndTime": {} | undefined; "quick.votingLastFor": {} | undefined; "quick.addDefaultProposals": {} | undefined; "quick.defaultPropoqsals": {} | undefined; "quick.maxProposals": {} | undefined; "quick.amountProposals": {} | undefined; "quick.limitProposals": {} | undefined; "quick.starting": {} | undefined; "quick.emptyProposal": {} | undefined; "wip": {} | undefined; "layouts.title": {} | undefined; "TBD": {} | undefined; "pages.title.top": {} | undefined; "captchaCode": {} | undefined; "create": {} | undefined; "footer.powered": {} | undefined; "footer.hosted": {} | undefined; "footer.supported": {} | undefined; "footer.donations": {} | undefined; "footer.maintained": {} | undefined; "noRightsReserved": {} | undefined; "proposal.zero.title": {} | undefined; "proposal.zero.description": {} | undefined; "proposal.one.title": {} | undefined; "proposal.one.description": {} | undefined; "time.minutes": {} | undefined; "time.hours": {} | undefined; "time.days": {} | undefined; "redirect.legacy": {} | undefined; "pleaseInput": {} | undefined; "quick.defaultProposals": {} | undefined; }

declare module "astro-i18n" {
	export * from "astro-i18n/"
	
	export function l<Uri extends RouteUri>(
		route: Uri | string & {},
		...args: undefined extends RouteParams[Uri]
			? [params?: RouteParams[Uri], targetLangCode?: LangCode, routeLangCode?: LangCode]
			: [params: RouteParams[Uri], targetLangCode?: LangCode, routeLangCode?: LangCode]
	): string
	
	export function t<Path extends TranslationPath>(
		path: Path,
		...args: undefined extends TranslationOptions[Path]
			? [options?: TranslationOptions[Path], langCode?: LangCode]
			: [options: TranslationOptions[Path], langCode?: LangCode]
	): string
	
	export function extractRouteLangCode(route: string): LangCode | undefined
	
	type Translation = string | { [translationKey: string]: string | Translation }
	type Translations = { [langCode: string]: Record<string, Translation> }
	type RouteTranslations = { [langCode: string]: Record<string, string> }
	type InterpolationFormatter = (value: unknown, ...args: unknown[]) => string
	class AstroI18n {
		defaultLangCode: DefaultLangCode
		supportedLangCodes: SupportedLangCode[]
		showDefaultLangCode: boolean
		translations: Translations
		routeTranslations: RouteTranslations
		get langCodes(): LangCode[]
		get langCode(): LangCode
		set langCode(langCode: LangCode)
		get formatters(): Record<string, InterpolationFormatter>
		init(Astro: { url: URL }, formatters?: Record<string, InterpolationFormatter>): void
		getFormatter(name: string): InterpolationFormatter | undefined
		setFormatter(name: string, formatter: InterpolationFormatter): void
		deleteFormatter(name: string): void
	}
	export const astroI18n: AstroI18n
}
