// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Web beží na vlastnej doméne cez GitHub Pages (súbor public/CNAME).
export default defineConfig({
  site: 'https://www.sipspotbar.sk',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  devToolbar: { enabled: false },
});
