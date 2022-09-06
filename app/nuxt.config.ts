import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  // Currently not working ;-(

  css: ['vuetify/lib/styles/main.sass'],
  build: {
    transpile: ['vuetify'],
  },
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
    server: {
      host: "0.0.0.0",
      port: 8000,
    },
  },
  // Targeting an SPA application so no server-side rendering and static website
  ssr: false,
  target: 'static'
});
