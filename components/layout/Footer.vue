<script setup lang="ts">
const { $api }: any = useNuxtApp();
// 👉 Fetch
// fetch categories
const { data: categories }: any = await useAsyncData("categories", async () => {
  if (!import.meta.client) return null;
  return await $api("categories");
});
const productItems = computed(() => {
  if (categories.value) {
    return categories.value.data.map((category: any) => {
      return {
        name: category.title,
        link: `/products?categoryId=${category.id}`,
      };
    });
  }
});
// 👉 Data
const serviceItems = ref([
  { name: "Make a request", link: "/make-request" },
  { name: "Track your order", link: "/track-order" },
  { name: "Become a partner", link: "/partner-us" },
]);
const storeItems = ref([
  { name: "About", link: "/" },
  { name: "Contact", link: "/" },
  { name: "FAQs", link: "/" },
]);
const accordionItems = ref([
  {
    id: 1,
    label: "Product",
    items: productItems.value,
  },
  {
    id: 2,
    label: "Services",
    items: serviceItems.value,
  },
  {
    id: 3,
    label: "Store",
    items: storeItems.value,
  },
]);
</script>

<template>
  <div class="footer-container bg-main-color pt-16">
    <div class="top-footer flex justify-between items-start mb-10">
      <!---------------------------------- left side footer ----------------- -->
      <div class="left-footer-side flex flex-col flex-1 gap-8">
        <div class="imgs-container flex items-center gap-4">
          <img alt="logo" src="/logo/logo.png" class="sm:h-16 h-12" />
          <img alt="turkish" src="/logo/turkish.png" class="sm:h-10 h-6" />
        </div>
        <p class="text-white font-normal pr-36 pb-12 sm:text-base text-sm">
          Exploring a Turkish store can indeed be a gateway to experiencing the
          beauty and elegance . Bringing Turkish magic to your gifting
          experience
        </p>
        <div class="social-footer flex gap-2">
          <Button
            icon="pi pi-twitter"
            variant="text"
            rounded
            class="bg-white text-main-color"
          />
          <Button
            variant="text"
            rounded
            class="bg-white text-main-color p-button-icon-only"
          >
            <font-awesome icon="fa-brands fa-facebook-f" />
          </Button>
          <Button
            icon="pi pi-tiktok"
            variant="text"
            rounded
            class="bg-white text-main-color"
          />
          <Button
            icon="pi pi-instagram"
            variant="text"
            rounded
            class="bg-white text-main-color"
          />
        </div>
      </div>
      <!--------------------------------------- right side footer  --------------------->
      <div class="right-footer-desk-side flex justify-between flex-1">
        <div class="flex flex-col gap-2">
          <h3>Product</h3>
          <NuxtLink
            v-for="Product in productItems"
            :key="Product.name"
            :to="Product.link"
            >{{ Product.name }}</NuxtLink
          >
        </div>
        <div class="flex flex-col gap-2">
          <h3>Services</h3>
          <NuxtLink
            v-for="service in serviceItems"
            :key="service.name"
            :to="service.link"
            >{{ service.name }}</NuxtLink
          >
        </div>
        <div class="flex flex-col gap-2">
          <h3>Store</h3>
          <NuxtLink
            v-for="store in storeItems"
            :key="store.name"
            :to="store.link"
            >{{ store.name }}</NuxtLink
          >
        </div>
      </div>
      <div class="right-footer-mob-side w-full">
        <Accordion
          :value="[]"
          multiple
          expandIcon="pi pi-plus"
          collapseIcon="pi pi-minus"
        >
          <AccordionPanel
            v-for="item in accordionItems"
            :key="item.id"
            :value="item.id"
            pt:root:class=" mb-3"
          >
            <AccordionHeader
              pt:root:class="bg-inherit text-white pt-0"
              pt:toggleicon:class="text-white"
            >
              <h3>
                {{ item.label }}
              </h3>
            </AccordionHeader>
            <AccordionContent pt:content:class="bg-inherit">
              <div class="flex flex-col gap-2">
                <NuxtLink
                  v-for="link in item.items"
                  :key="link.name"
                  :to="link.link"
                  >{{ link.name }}</NuxtLink
                >
              </div>
            </AccordionContent>
          </AccordionPanel>
        </Accordion>
      </div>
    </div>
    <div class="bottom-footer flex justify-between items-start mb-8">
      <p class="text-white text-xs font-normal">
        Copyright © 2023 TURKISH - All rights reserved
      </p>
      <div class="footer-links flex gap-4">
        <NuxtLink to="/">Terms And Conditions</NuxtLink>
        <NuxtLink to="/">privacy Policy</NuxtLink
        ><NuxtLink to="/">Returns</NuxtLink><NuxtLink to="/">Cookies</NuxtLink>
      </div>
    </div>
  </div>
</template>
<style lang="scss" src="@/assets/scss/components/layouts/footer.scss" scoped />
