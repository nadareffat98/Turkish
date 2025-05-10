import { useConfirm } from "primevue/useconfirm";
export default defineNuxtPlugin((nuxtApp) => {
  const confirm = useConfirm();
  return {
    provide: {
      confirmDialog: (options: any) => {
        confirm.require({
          rejectProps: {
            class: "bg-second-color text-white border-0 reject-button",
          },
          acceptProps: {
            class:
              "text-second-color border-second-color focus-visible:outline-0 focus-visible:shadow-none hover:bg-transparent",
          },
          ...options,
        });
      },
    },
  };
});
