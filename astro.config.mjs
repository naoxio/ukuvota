import astroI18next from "astro-i18next";
import { defineConfig } from 'astro/config';
import fastify from '@matthewp/astro-fastify';
import tailwind from "@astrojs/tailwind";



// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: fastify({
    // This is an optional entry point where you can define Fastify routes/plugins
    entry: new URL('./api/index.ts', import.meta.url),
    // This is the default port that Fly.io uses
    // When you create your app it will create a fly.toml
    // file where you can configure this
    port: 8080
  }),
  integrations: [astroI18next(),tailwind()]
});