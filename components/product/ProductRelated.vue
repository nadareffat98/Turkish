<script setup>
// 👉 Props
const props = defineProps(["products"]);
</script>
<template>
  <UiMainSwiper
    title="Related products"
    subtitle="You may also like"
    className="related-product-swiper"
    :slides-per-view="3"
    :space-between="24"
    :items="products"
  >
    <template #default="{ item, index }">
      <ProductCard :product="item" />
    </template>
  </UiMainSwiper>
</template>
