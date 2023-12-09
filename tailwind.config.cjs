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
                    "primary": "#1e4a72",
                    "secondary": "#295d85",
                    "accent": "#feefc3",
                    "neutral": "#2a2e33",
                    "base-100": "#ffffff",
                    "base-200": "#f4f5f7",
                    "info": "#005ecb",
                    "success": "#4a8b4a",
                    "warning": "#c7a046",
                    "error": "#c43232",
                },
                dark: {
                    ...require("daisyui/src/theming/themes")["[data-theme=business]"],
                    "primary": "#1e4a72",
                    "secondary": "#295d85",
                    "accent": "#4a3424",
                    "neutral": "#e0e0e0",
                    "base-100": "#1c2025",
                    "base-200": "#2a2e33",
                    "info": "#005ecb",
                    "success": "#4a8b4a",
                    "warning": "#c7a046",
                    "error": "#c43232",
                },
            }
        ],
        prefix: "",
        darkTheme: "dark",
    },
}
