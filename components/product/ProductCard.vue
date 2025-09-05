<script setup>
// 👉 Props
const props = defineProps({
  product: Object,
});
// 👉 Emits
const emit = defineEmits(["refresh"]);
// 👉 Data
const isLoading = useLoadingState();
const { $api, $toast } = useNuxtApp();
const authStore = useAuthStore();
const loaded = ref(false);

// 👉 Methods
const goToProduct = () => {
  navigateTo(`/products/${props.product.id}`);
};
// toggle favorite icon
const addOrRemoveWishlist = async () => {
  isLoading.value = true;
  const res = await $api("products/" + props.product.id + "/toggle-favorite", {
    method: "POST",
  });
  if (res.status == "fail") $toast(res.message, "error");
  else {
    emit("refresh");
  }
  setTimeout(() => {
    isLoading.value = false;
  }, 1000);
};
</script>
<template>
  <Card
    style="box-shadow: none; cursor: pointer"
    class="group block overflow-hidden"
    pt:header:class="relative"
    pt:body:class="p-0"
    pt:content:class="flex flex-col sm:gap-4 gap-1 sm:p-4 p-2 pb-0"
    @click="goToProduct"
  >
    <template #header>
      <div class="icons-container">
        <Button
          :icon="product.is_favorite ? 'pi pi-heart-fill' : 'pi pi-heart'"
          rounded
          aria-label="whishlist"
          @click.stop="addOrRemoveWishlist"
          v-if="authStore.isAuth"
        />
        <Button icon="pi pi-eye" rounded aria-label="show" />
      </div>
      <!-- skeleton -->
      <div
        v-if="!loaded"
        class="absolute inset-0 bg-gray-200 animate-pulse rounded-t-xl"
      ></div>

      <!-- real image -->
      <img
        :alt="product.title"
        :src="product.main_image"
        class="product-img transition-opacity duration-500"
        :class="{ 'opacity-0': !loaded, 'opacity-100': loaded }"
        @load="loaded = true"
      />
      <!-- <img :alt="product.title" :src="product.main_image" class="product-img" /> -->
      <!-- <Tag
        pt:root:class="absolute top-0 left-0 py-2 px-4 rounded-tl-xl  rounded-tr-none rounded-bl-none rounded-br-xl bg-second-color text-white"
        >New</Tag
      > -->
    </template>
    <template #content>
      <div class="flex flex-col justify-start sm:gap-2 text-main-color">
        <p class="sm:text-lg text-base font-semibold">{{ product.title }}</p>
        <p class="sm:text-base text-sm font-normal line-clamp-2">
          {{ product.desc }}
        </p>
      </div>
      <div class="flex flex-col justify-start sm:gap-2 text-black">
        <p class="text-xs font-semibold">
          EGP <span class="sm:text-lg text-base"> {{ product.price }} </span>
        </p>
        <p class="sm:text-sm text-xs font-normal">Free Shipping</p>
      </div>
    </template>
  </Card>
</template>
<style scoped lang="scss">
.icons-container {
  @apply absolute sm:top-4 sm:right-[-60px] right-2 top-2 flex flex-col gap-3 sm:opacity-0 opacity-100 transition-all duration-500 ease-in-out;

  button {
    --p-button-icon-only-width: 2rem;
    @apply bg-white hover:bg-white hover:text-main-color hover:border-none border-none text-main-color;
    @media (min-width: 640px) {
      --p-button-icon-only-width: 2.5rem;
    }
  }
}
.product-img {
  @apply w-full rounded-t-xl object-cover object-center;
  height: 160px;
  @media (min-width: 580px) {
    height: 240px;
  }
  @media (min-width: 768px) {
    height: 320px;
  }
}
.group:hover .icons-container {
  @apply right-4 opacity-100;
}
</style>
