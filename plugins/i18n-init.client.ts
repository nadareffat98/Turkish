import type { Composer } from "vue-i18n";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("app:mounted", () => {
    const i18n = nuxtApp.$i18n as Composer;

    const getLocaleValue = () => {
      const loc = i18n.locale;
      return typeof loc === "string" ? loc : loc.value;
    };

    const updateBodyDir = () => {
      const body = document.body;
      if (!body) return;

      const currentLocale = getLocaleValue();

      if (currentLocale === "ar") {
        body.setAttribute("dir", "rtl");
        document.documentElement.setAttribute("lang", "ar");
      } else {
        body.setAttribute("dir", "ltr");
        document.documentElement.setAttribute("lang", "en");
      }
    };

    updateBodyDir();

    watch(
      () => (typeof i18n.locale === "string" ? i18n.locale : i18n.locale.value),
      () => {
        updateBodyDir();
      }
    );
  });
});
