<script setup lang="ts">
// 👉 Data
const auth = useAuthStore();
const { $confirmDialog }: any = useNuxtApp();
const selectedLang = ref("English");
const languages = ref([{ name: "English" }, { name: "Arabic" }]);
const menuItems = [
  { label: "Home", link: "/" },
  { label: "Products", link: "/products" },
];
const searchWord = ref("");
const menu = ref();
const accountItems = ref([
  { label: "Account Details", route: "/account" },
  { separator: true },
  { label: "product Review", route: "/account/product-review" },
  { separator: true },
  { label: "order History", route: "/account/order-history" },
  { separator: true },
  { label: "Addresses", route: "/account/shipping-address" },
  { separator: true },
  { label: "Saved Cards", route: "/account/saved-cards" },
  { separator: true },
  {
    label: "Logout",
    command: () => {
      logout();
    },
  },
]);
// 👉 Methods
const toggle = (event: any) => {
  if (auth.isAuth) {
    menu.value.toggle(event);
  } else navigateTo("/auth/sign-in");
};
const logout = () => {
  $confirmDialog({
    header: "Logout",
    message: " Are you sure you want to log out?",
    acceptLabel: "Logout",
    rejectLabel: "Cancel",
    accept: () => {
      auth.logout();
    },
  });
};
</script>
<template>
  <!---------------------------- System bar ------------------------------->
  <div class="system-bar flex justify-between items-center py-1">
    <p class="text-white text-sm font-normal">
      Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
    </p>
    <Select
      v-model="selectedLang"
      :options="languages"
      optionLabel="name"
      option-value="name"
      pt:root:style="background-color: transparent !important; border: none !important;"
      pt:label:class="text-white text-sm"
      pt:dropdown:class="text-white text-sm"
      pt:option:class="list-option"
    />
  </div>
  <!-- -------------------------header container ------------------------- -->
  <div class="header-container">
    <Menubar
      :model="menuItems"
      pt:root:class="menubar-container px-0 py-4 border-none"
    >
      <template #start>
        <NuxtLink to="/" class="flex gap-2 items-center">
          <img alt="logo" src="/logo/coloredLogo.png" class="h-10" />
          <img alt="turkish" src="/logo/coloredTurkish.png" class="h-6" />
        </NuxtLink>
      </template>
      <template #item="{ item }">
        <NuxtLink :to="item.link" class="text-sm font-medium">{{
          item.label
        }}</NuxtLink>
      </template>
      <template #end>
        <Inplace pt:display:class="p-0 hover:bg-inherit">
          <template #display>
            <i class="pi pi-search header-icons rounded-full cursor-pointer" />
          </template>
          <template #content="{ closeCallback }">
            <IconField>
              <InputText
                v-model="searchWord"
                placeholder="What are you looking for ?"
                class="p-3 text-xs bg-[#F5F5F5] border-none min-w-[250px] w-full"
                style="border-radius: 4px !important"
              />
              <InputIcon
                class="pi pi-search text-main-color cursor-pointer"
                @click="closeCallback"
              />
            </IconField>
          </template>
        </Inplace>
        <NuxtLink to="/wishlist" class="header-icons rounded-full">
          <i class="pi pi-heart" />
        </NuxtLink>
        <NuxtLink to="/shopping-cart" class="header-icons rounded-full">
          <i class="pi pi-shopping-bag" />
        </NuxtLink>
        <i
          class="pi pi-user header-icons rounded-full cursor-pointer"
          @click="toggle"
          aria-haspopup="true"
          aria-controls="account_menu"
        />
        <Menu
          ref="menu"
          id="account_menu"
          :model="accountItems"
          :popup="true"
          pt:root:class="account-menu"
        >
          <template #item="{ item, props }">
            <NuxtLink
              v-if="item.route"
              :to="item.route"
              v-slot="{ href, navigate }"
              v-bind="props"
              custom
            >
              <a v-bind="props.action" :href="href" @click="navigate">
                {{ item.label }}
              </a>
            </NuxtLink>
            <a v-else v-bind="props.action">{{ item.label }}</a>
          </template>
        </Menu>
      </template>
    </Menubar>
  </div>
  <Divider class="m-0" />
</template>
<style lang="scss" src="@/assets/scss/components/layouts/header.scss" />
