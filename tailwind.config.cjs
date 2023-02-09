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
					...require("daisyui/src/colors/themes")["[data-theme=business]"],
					"primary": "indianred",
					"secondary": "#DC8D8D",
					"accent": "#D77D7D",
					"neutral": "#111",
					"base-100": "#f6f0f6",
					"base-200": "#f0e8f0",
					"info": "#0072F5",
					"success": "#439243",
					"warning": "#e79230",
					"error": "#E23636",
				},
				dark: {
					...require("daisyui/src/colors/themes")["[data-theme=business]"],
					"primary": "indianred",
					"secondary": "#DC8D8D",
					"accent": "#D77D7D",
					"neutral": "#eee",
					"base-100": "#161616",
					"base-200": "#202020",
					"info": "#0072F5",
					"success": "#61D161",
					"warning": "#EDC25E",
					"error": "#E23636",
				},
			}
		],
		prefix: "",
		darkTheme: "dark",
	  },
}
