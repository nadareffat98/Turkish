export default defineNuxtPlugin((nuxtApp) => {
  const toast = useToast();

  const showToast = (
    message: string,
    severity: "success" | "info" | "warn" | "error" = "error",
    options: Partial<{ life: number }> = {}
  ) => {
    toast.add({
      severity,
      summary: message,
      life: options.life || 5000,
      closable:false,
    });
  };

  // Inject globally: usable as `showToast()` or `nuxtApp.$showToast`
  nuxtApp.provide("toast", showToast);
});
