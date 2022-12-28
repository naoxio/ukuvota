module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {},
	},
	plugins: [require('daisyui')],
	daisyui: {
		styled: true,
		themes: [
			{
				light: {
					"primary": "#F4511E",
					"secondary": "#C73507",
					"accent": "#FF764B",
					"neutral": "#111",
					"base-100": "#e6e6e6",
					"base-200": "#e0e0e0",
					"info": "#0072F5",
					"success": "#21CA51",
					"warning": "#FF6052",
					"error": "#DE1B8D",
				},
				dark: {
					"primary": "#F4511E",
					"secondary": "#C73507",
					"accent": "#FF764B",
					"neutral": "#eee",
					"base-100": "#161616",
					"base-200": "#101010",
					"info": "#0072F5",
					"success": "#21CA51",
					"warning": "#FF6052",
					"error": "#DE1B8D",
				},
			}
		],
		prefix: "",
		darkTheme: "dark",
	  },
}
