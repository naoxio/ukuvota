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
                    "primary": "#3e1313",
                    "secondary": "#592424",
                    "accent": "#a48b78",
                    "neutral": "#333333",
                    "base-100": "#f9f9f9",
                    "base-200": "#efefef",
                    "info": "#65868a",
                    "success": "#8a9e8b",
                    "warning": "#b08e60",
                    "error": "#b87b6b",
                },
                dark: {
                    "primary": "#3e1313",
                    "secondary": "#592424",
                    "accent": "#a48b78",
                    "neutral": "#d1d1d1",
                    "base-100": "#292929",
                    "base-200": "#1e1e1e",
                    "info": "#65868a",
                    "success": "#8a9e8b",
                    "warning": "#b08e60",
                    "error": "#b87b6b",
                },
            }
        ],
        prefix: "",
        darkTheme: "dark",
    },
}
