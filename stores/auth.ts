import type { IUser } from "~/types/auth";
export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    token: null as String | null,
    user: null as any,
    isAuth: false,
  }),
  actions: {
    //👉 Login
    async login(credentials: {
      email: string;
      password: string;
    }): Promise<any> {
      const $api = useApi();
      const res: any = await $api("login", {
        method: "POST",
        body: { ...credentials },
        ignoreResponseError: true,
      });
      if (res.status == "success") await this.getProfile(res.data.token);
      return res;
    },
    //👉 send code to verify
    async sendCode(credentials: { email: string }): Promise<any> {
      const $api = useApi();
      const res: any = await $api("resend-code", {
        method: "POST",
        body: { ...credentials },
        ignoreResponseError: true,
      });
      return res;
    },
    //👉 verify email
    async verifyEmail(credentials: { code: string; email: string }) {
      const $api = useApi();
      const res: any = await $api("account-verify", {
        method: "POST",
        body: { ...credentials },
        ignoreResponseError: true,
      });
      if (res.status == "success") this.getProfile(res.data.token);
      return res;
    },
    //👉 forget password
    async forgetPassword(credentials: { email: string }): Promise<any> {
      const $api = useApi();
      const res: any = await $api("forget-password", {
        method: "POST",
        body: { ...credentials },
        ignoreResponseError: true,
      });
      return res;
    },
    //👉 check code for reset
    async checkCode(credentials: {
      code: string;
      email: string;
    }): Promise<any> {
      const $api = useApi();
      const res: any = await $api("check-code", {
        method: "POST",
        body: { ...credentials },
        ignoreResponseError: true,
      });
      return res;
    },
    //👉 reset password
    async resetPassword(credentials: any): Promise<any> {
      const $api = useApi();
      const res: any = await $api("reset-password", {
        method: "POST",
        body: { ...credentials },
        ignoreResponseError: true,
      });
      return res;
    },
    //👉 register
    async register(credentials: IUser): Promise<any> {
      const $api = useApi();
      const res: any = await $api("register", {
        method: "POST",
        body: { ...credentials },
        ignoreResponseError: true,
      });
      if (res.status == "success") navigateTo("/auth/sign-in");
      return res;
    },
    //👉 init
    async init() {
      const savedToken = await localStorage.getItem("token");

      if (savedToken && !this.token) {
        this.token = savedToken;
      }

      if (this.isAuth && !this.token) {
        this.isAuth = false;
        this.user = null;
      }
    },
    // logout
    async logout() {
      this.token = null;
      this.user = null;
      this.isAuth = false;
      await localStorage.clear();
      navigateTo("/auth/sign-in");
    },
    //👉 get profile
    async getProfile(token: String) {
      this.token = token;
      useLocalStorage("token", this.token);
      const $api = useApi();
      const res: any = await $api("profile", { ignoreResponseError: true });
      this.user = res.data;
      this.isAuth = true;
      navigateTo("/account");
    },
    //👉 update profile
    async updateProfile(credentials: any) {
      const $api = useApi();
      const res: any = await $api("profile/update", {
        method: "POST",
        body: {
          ...credentials,
        },
        ignoreResponseError: true,
      });
      if (res.status == "success") this.user = res.data;
      return res;
    },
  },
  persist: true,
});
