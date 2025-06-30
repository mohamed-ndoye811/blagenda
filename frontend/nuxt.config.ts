// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  runtimeConfig : {
    app: {
        apiUrl: process.env.NUXT_APP_API_URL ?? "http://localhost:3000/api",
        port: parseInt(process.env.NUXT_APP_PORT ?? "3000"),
        auth: {
            timeout: parseInt(process.env.NUXT_APP_AUTH_TIMEOUT ?? "604800"), // 7 days in seconds
        },
    }
  },
  ssr: true,
  // Configuration pour éviter les redirections en production
  nitro: {
    preset: 'node-server'
  },
  devServer: {
    port: parseInt(process.env.NUXT_APP_PORT ?? "3000"),
  },
  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxt/ui",
    "@nuxt/test-utils",
  ],
});