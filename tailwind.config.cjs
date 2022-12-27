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
					"secondary": "#1A1919",
					"accent": "#262626",
					"neutral": "#000",
					"base-100": "#fff",
					"info": "#0072F5",
					"success": "#21CA51",
					"warning": "#FF6052",
					"error": "#DE1B8D",
				},
				dark: {
					"primary": "#F4511E",
					"secondary": "#1A1919",
					"accent": "#262626",
					"neutral": "#fff",
					"base-100": "#000",
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
