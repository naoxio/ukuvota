import { defineConfig } from 'astro/config';
import Icons from 'unplugin-icons/vite';
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [tailwind()],
  vite: {
    plugins: [Icons({
      compiler: 'astro'
    })]
  },
  adapter: vercel(),
  i18n: {
    defaultLocale: "en",
    locales: ["en", "de", "it"],
    routing: {
      prefixDefaultLocale: false
    }
  }
});