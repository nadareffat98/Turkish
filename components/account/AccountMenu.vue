<script setup lang="ts">
//  👉 Data
const authStore = useAuthStore();
const { $confirmDialog }: any = useNuxtApp();
const links = [
  { label: "My profile", route: "/account" },
  { label: "Shipping address", route: "/account/shipping-address" },
  //   {
  //     label: "Saved cards",
  //     route: "/account/saved-cards",
  //   },
  { label: "Order history", route: "/account/order-history" },
  {
    label: "Product review",
    route: "/account/product-review",
  },
  //   {
  //     label: "Returnes",
  //     route: "/account/returns",
  //   },
  {
    label: "Change password",
    route: "/account/change-password",
  },
];
//  👉 Methods
const logout = () => {
  $confirmDialog({
    header: "Logout",
    message: " Are you sure you want to log out?",
    acceptLabel: "Logout",
    rejectLabel: "Cancel",
    accept: () => {
      authStore.logout();
    },
  });
};
</script>
<template>
  <div
    class="account-menu-container flex lg:flex-col justify-start lg:items-start items-stretch lg:gap-0 gap-3 w-full rounded-xl"
  >
    <NuxtLink
      v-for="link in links"
      :key="link.label"
      :to="link.route"
      class="no-underline flex lg:justify-start items-center justify-center lg:p-5 p-2 lg:border-b border-border-color w-full text-base font-medium text-main-color"
    >
      {{ link.label }}
    </NuxtLink>
    <NuxtLink
      class="no-underline flex lg:justify-start items-center justify-center lg:p-5 p-2 w-full cursor-pointer text-base font-medium text-main-color"
      @click="logout"
    >
      Logout
    </NuxtLink>
  </div>
</template>
<!-- <style
  lang="scss"
  src="@/assets/scss/components/profile/profile-menu.scss"
  scoped
/> -->
