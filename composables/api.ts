// composables/api.ts
import { getGuestToken } from "~/composables/utils";
import { useAuthStore } from "~/stores/auth";

export function useApi() {
  const authStore = useAuthStore();
  const lang = useCookie("lang").value || "en";
  const config = useRuntimeConfig();

  return $fetch.create({
    baseURL: `${config.public.baseURL}/api/website/`,
    onRequest({ options }) {
      if (authStore.token) {
        options.headers.set("Authorization", `Bearer ${authStore.token}`);
      } else {
        const guestToken = getGuestToken();
        if (guestToken)
          options.query = { ...options.query, guest_token: guestToken };
      }
      options.headers.set("Accept-Language", lang);
    },
    async onResponseError({ response }) {
      if (response.status === 401) {
        await navigateTo("/login");
      }
    },
  });
}
