import { defineConfig } from 'astro/config';
import Icons from 'unplugin-icons/vite';
import tailwind from "@astrojs/tailwind";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [tailwind()],
  vite: {
    plugins: [Icons({
      compiler: 'astro'
    })]
  },
  adapter: node({
    mode: "standalone"
  })
});