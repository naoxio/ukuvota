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
									...require("daisyui/src/theming/themes")["[data-theme=business]"],
									"primary": "#2a5d9a",
									"secondary": "#3a7ab6",
									"accent": "#feefc3",
									"neutral": "#111",
									"base-100": "#ffffff",
									"base-200": "#f7f7f7",
									"info": "#0072F5",
									"success": "#439243",
									"warning": "#e79230",
									"error": "#E23636",
							},
							dark: {
									...require("daisyui/src/theming/themes")["[data-theme=business]"],
									"primary": "#2a5d9a",
									"secondary": "#3a7ab6",
									"accent": "#41331c",
									"neutral": "#eee",
									"base-100": "#323639",
									"base-200": "#40474d",
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
