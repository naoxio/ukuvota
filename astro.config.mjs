import astroI18next from "astro-i18next";
import { defineConfig } from 'astro/config';
import Icons from 'unplugin-icons/vite'
import tailwind from "@astrojs/tailwind";
import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [astroI18next(), tailwind()],
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
  vite: {
    plugins: [
      Icons({
        compiler: 'astro',
      }),
    ],
  },
});