import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: ['vuetify/lib/styles/main.sass'],
  build: {
    transpile: ['vuetify'],
  },
  // Vite config currently not working ;-(
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
    server: {
      host: "0.0.0.0",
      port: 8000,
    },
  },
  imports: {
    dirs: [
      // ... or scan all modules within given directory
      'composables/**'
    ]
  },
  // Targeting an SPA application so no server-side rendering and static website
  ssr: false,
  target: 'static'
});
