// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from "@primevue/themes/aura";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  ssr: true,
  app: {
    head: {
      link: [
        { rel: "icon", type: "image/svg+xml", href: "/fav/favicon.svg" },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/fav/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/fav/favicon-16x16.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/fav/apple-touch-icon.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "192x192",
          href: "/fav/android-chrome-192x192.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "512x512",
          href: "/fav/android-chrome-512x512.png",
        },
        { rel: "manifest", href: "/site.webmanifest" },
      ],
      meta: [
        { name: "theme-color", content: "#3d4435" },
        { name: "apple-mobile-web-app-capable", content: "yes" },
        {
          name: "apple-mobile-web-app-status-bar-style",
          content: "black-translucent",
        },
      ],
    },
  },
  runtimeConfig: {
    public: {
      baseURL: process.env.NUXT_PUBLIC_BASE_URL || "http://localhost:8000",
    },
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    "@primevue/nuxt-module",
    "@vesp/nuxt-fontawesome",
    "nuxt-swiper",
    "@vee-validate/nuxt",
    ["@pinia/nuxt", { autoImports: ["defineStore", "acceptHMRUpdate","storeToRefs"] }],
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
          Cairo: [400, 500, 600, 700],
        },
        display: "swap",
      },
    ],
    "@nuxtjs/i18n",
  ],
  i18n: {
    locales: [
      { code: "en", name: "English", iso: "en-US" },
      { code: "ar", name: "العربية", iso: "ar-EG" },
    ],
    defaultLocale: "en",
    strategy: "no_prefix",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "lang",
      alwaysRedirect: false,
      fallbackLocale: "en",
    },
    vueI18n: "~/i18n.config.ts",
  },
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
