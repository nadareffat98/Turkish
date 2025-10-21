export const useLanguage = () => {
  const { locale } = useI18n();
  const langCookie = useCookie<"en" | "ar">("lang", {
    path: "/", // عشان تكون متاحة في كل الصفحات
    sameSite: "lax",
  });

  onMounted(() => {
    // 👇 نقرأ اللغة من الـ cookie
    const savedLang = langCookie.value;
    if (savedLang && savedLang !== locale.value) {
      locale.value = savedLang;
    }
  });

  const setLanguage = (lang: "en" | "ar") => {
    locale.value = lang;
    langCookie.value = lang;
    setTimeout(() => {
      window.location.reload();
    }, 200);
  };

  const toggleLanguage = () => {
    setLanguage(locale.value === "en" ? "ar" : "en");
  };

  return {
    locale,
    setLanguage,
    toggleLanguage,
  };
};
