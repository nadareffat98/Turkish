export default defineNuxtRouteMiddleware(async (to, from) => {
  const isAuth = await useAuthStore().isAuth;
  const isAuthRoute = to.path.startsWith("/auth");
  if (!isAuth && !isAuthRoute) {
    return navigateTo("/auth/sign-in");
  }
  if (isAuth && isAuthRoute) return navigateTo("/account");
});
