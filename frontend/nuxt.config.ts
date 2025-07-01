export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: {
    enabled: process.env.NODE_ENV !== "production",
  },
  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_APP_API_URL,
      auth: {
        timeout: parseInt(process.env.NUXT_APP_AUTH_TIMEOUT),
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
