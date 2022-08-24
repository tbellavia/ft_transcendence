import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  // Currently not working ;-(
  vite: {
    server: {
      host: "0.0.0.0",
      port: 8000,
    },
  },
  ssr: true,
});
