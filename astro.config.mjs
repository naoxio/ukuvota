import astroI18next from "astro-i18next";
import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import node from "@astrojs/node";
import vue from "@astrojs/vue";
import compress from "astro-compress";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [astroI18next(), tailwind(), vue({
    appEntrypoint: '/src/pages/_app'
  }), compress()],
  adapter: node({
    mode: "standalone"
  })
});