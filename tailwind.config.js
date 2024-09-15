/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
      extend: {
        colors: {
          'orange-brown': '#C45E1E',
          'jungle-green': '#1E8C4E',
        },
      },
    },
    plugins: [require("@tailwindcss/typography"), require("daisyui")],
    daisyui: {
      styled: true,
      themes: [
        {
          light: {
            "primary": "#1E8C4E",    // jungle-green
            "secondary": "#C45E1E",  // orange-brown
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
            "primary": "#1E8C4E",    // jungle-green
            "secondary": "#C45E1E",  // orange-brown
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