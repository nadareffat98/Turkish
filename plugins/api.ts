export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useRuntimeConfig();
  const authStore = useAuthStore();
  const guestToken = await getGuestToken();
  const api = $fetch.create({
    baseURL: `${config.public.baseURL}/api/website/`,
    query: { guest_token: authStore.isAuth ? null : guestToken },
    onRequest({ options }) {
      if (authStore.token) {
        options.headers.set("Authorization", `Bearer ${authStore.token}`);
      }
      options.headers.set("Accept-Language", "en");
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
