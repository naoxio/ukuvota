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
					"primary": "indianred",
					"secondary": "#DC8D8D",
					"accent": "#D77D7D",
					"neutral": "#111",
					"base-100": "#f6f0f6",
					"base-200": "#f0e8f0",
					"info": "#0072F5",
					"success": "#21CA51",
					"warning": "#FF6052",
					"error": "#DE1B8D",
				},
				dark: {
					"primary": "indianred",
					"secondary": "#DC8D8D",
					"accent": "#D77D7D",
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
