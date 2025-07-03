export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_APP_API_URL,
      auth: {
        timeout: parseInt(process.env.NUXT_APP_AUTH_TIMEOUT),
      },
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: ['@use "@/assets/scss/variables/index.scss" as * ;', '@use "@/assets/scss/global.scss" as * ;'].join("\n"),
        },
      },
    },
  },
  ssr: true,
  nitro: {
    preset: "node-server",
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
