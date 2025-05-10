// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from "@primevue/themes/aura";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  ssr: true,
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL || "http://localhost:8000",
    },
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    "@primevue/nuxt-module",
    "@vesp/nuxt-fontawesome",
    "nuxt-swiper",
    "@nuxt/devtools",
    "@vee-validate/nuxt",
    ["@pinia/nuxt", { autoImports: ["defineStore", "acceptHMRUpdate"] }],
    "pinia-plugin-persistedstate/nuxt",
    [
      "@nuxtjs/google-fonts",
      {
        families: {
          Montserrat: {
            wght: "200..600",
          },
          "El Messiri": {
            wght: "200..600",
          },
        },
      },
    ],
  ],
  primevue: {
    options: {
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: false,
        },
      },
    },
  },
  fontawesome: {
    icons: {
      brands: ["facebook-f"],
      solid: [
        "ruler-horizontal",
        "circle-check",
        "quote-left",
        "trash",
        "circle-check",
      ],
      regular: ["circle-check"],
    },
  },
  pinia: {
    storesDirs: ["./stores/**"],
  },
  veeValidate: {
    autoImports: true,
  },
  css: ["~/assets/scss/main.scss", "primeicons/primeicons.css"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData:
            '@use "~/assets/scss/utilities/_variables.scss" as *;',
        },
      },
    },
  },
});
