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
					"accent": "#feefc3",
					"neutral": "#111",
					"base-100": "#ffffff",
					"base-200": "#f1f3f4",
					"info": "#0072F5",
					"success": "#439243",
					"warning": "#e79230",
					"error": "#E23636",
				},
				dark: {
					...require("daisyui/src/colors/themes")["[data-theme=business]"],
					"primary": "indianred",
					"secondary": "#DC8D8D",
					"accent": "#41331c",
					"neutral": "#eee",
					"base-100": "#202124",
					"base-200": "#525355",
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
