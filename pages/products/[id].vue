<script setup>
// 👉 Data
const { $api } = useNuxtApp();
const productId = useRoute().params.id;
const { data: product, refresh } = await useAsyncData("product", () =>
  import.meta.client ? $api("products/" + productId) : null
);
</script>
<template>
  <div class="single-product-container flex flex-col" v-if="product">
    <ProductDetails :product="product.data" @refresh-product="refresh" />
    <ProductTabs :product="product.data" />
    <ProductRelated
      v-if="product.data.related_products.length > 0"
      :products="product.data.related_products"
    />
  </div>
</template>
<style src="@/assets/scss/product.scss" scoped></style>
