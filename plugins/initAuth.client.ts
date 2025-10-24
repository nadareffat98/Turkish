import { useAuthStore } from "~/stores/auth";
export default defineNuxtPlugin(async () => {
  console.log("done");
  const auth = useAuthStore();
  await auth.init();
});
