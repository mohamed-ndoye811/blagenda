export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: {
    enabled: process.env.NODE_ENV !== "production",
  },
  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_APP_API_URL ?? "http://localhost:3000/api",
      auth: {
        timeout: parseInt(process.env.NUXT_APP_AUTH_TIMEOUT ?? "604800"),
      }
    },
  },
  ssr: true,
  nitro: {
    preset: 'node-server',
    logLevel: "debug",
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
