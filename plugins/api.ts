export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useRuntimeConfig();
  const authStore = useAuthStore();
  const guestToken = await getGuestToken();
  const lang = useCookie("lang").value || "en";
  const query: Record<string, string> = {};
  if (!authStore.isAuth && guestToken) {
    query.guest_token = guestToken;
  }
  const api = $fetch.create({
    baseURL: `${config.public.baseURL}/api/website/`,
    query,
    onRequest({ options }) {
      if (authStore.token) {
        options.headers.set("Authorization", `Bearer ${authStore.token}`);
      }
      options.headers.set("Accept-Language", lang);
    },
    async onResponseError({ response }) {
      if (response.status === 401) {
        await nuxtApp.runWithContext(() => navigateTo("/login"));
      }
    },
  });

  // Expose to useNuxtApp().$api
  return {
    provide: {
      api,
    },
  };
});
