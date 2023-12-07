import { defineConfig } from 'astro/config';
import Icons from 'unplugin-icons/vite';
import tailwind from "@astrojs/tailwind";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [tailwind()],
  vite: {
    plugins: [Icons({
      compiler: 'astro'
    })]
  },
  adapter: netlify()
});