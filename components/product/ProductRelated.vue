<script setup>
// 👉 Props
const props = defineProps(["products"]);
const productResponsive = {
  768: {
    slidesPerView: 3,
    spaceBetween: 24,
  },
  580: {
    slidesPerView: 3,
  },
  0: {
    slidesPerView: 2,
  },
};
</script>
<template>
  <UiMainSwiper
    :title="$t('Related products')"
    :subtitle="$t('You may also like')"
    className="related-product-swiper"
    :slides-per-view="3"
    :space-between="12"
    :breakpoints="productResponsive"
    :items="products"
  >
    <template #default="{ item, index }">
      <ProductCard :product="item" />
    </template>
  </UiMainSwiper>
</template>
