import astroI18next from "astro-i18next";
import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import node from "@astrojs/node";
import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [astroI18next(), tailwind(), vue({ appEntrypoint: '/src/pages/_app' })],
  adapter: node({
    mode: "standalone"
  })
});