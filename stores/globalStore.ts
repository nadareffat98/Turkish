import { useApi } from "~/composables/api";
export const useGlobalStore = defineStore("globalStore", {
  state: () => {
    return {
      countries: [] as Array<any>,
    };
  },
  actions: {
    // 👉 fetch countries
    async fetchCountries() {
      const $api = useApi();
      const config = useRuntimeConfig();
      if (import.meta.client) {
        const data: any = await $api("countries", {
          baseURL: `${config.public.baseURL}/api/general/`,
        });
        this.countries = data.data;
      }
    },
    // 👉 fetch cities
    async fetchCities(country_id: number): Promise<any> {
      const  $api = useApi();
      const config = useRuntimeConfig();
      if (import.meta.client) {
        const data: any = await $api("cities", {
          baseURL: `${config.public.baseURL}/api/general/`,
          query: { country_id: country_id },
        });
        return data.data;
      }
    },

    async fetchAll() {
      await Promise.all([this.fetchCountries()]);
    },
  },
  persist: true,
});
