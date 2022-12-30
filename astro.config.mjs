import astroI18next from "astro-i18next";
import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [astroI18next(), tailwind()],
  adapter: node({
    mode: "standalone"
  }),
})