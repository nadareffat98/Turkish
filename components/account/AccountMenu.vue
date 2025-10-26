<script setup lang="ts">
//  👉 Data
const authStore = useAuthStore();
const { $confirmDialog }: any = useNuxtApp();
const links = [
  { label: "My profile", route: "/account" },
  { label: "Change email", route: "/account/email-address" },
  { label: "Shipping address", route: "/account/shipping-address" },
  { label: "Order history", route: "/account/order-history" },
  {
    label: "Product review",
    route: "/account/product-review",
  },
    {
      label: "Saved Cards",
      route: "/account/cards",
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
    message: "Are you sure you want to log out?",
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
      class="account-link"
    >
      {{ $t(link.label) }}
    </NuxtLink>
    <NuxtLink class="account-link text-second-color" @click="logout">
      {{ $t("Logout") }}
    </NuxtLink>
  </div>
</template>
