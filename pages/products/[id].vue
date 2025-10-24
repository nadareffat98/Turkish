<script setup>
// 👉 Data
const $api = useApi();
const productId = useRoute().params.id;
const { data: product, refresh } = await useAsyncData(
  `product-${productId}`,
  () => $api("products/" + productId)
);
const { data: reviews } = await useAsyncData("reviews", () => $api("reviews"));
</script>
<template>
  <div class="single-product-container flex flex-col" v-if="product && reviews">
    <ProductDetails :product="product.data" @refresh-product="refresh" />
    <ProductTabs :product="product.data" :reviews="reviews.data" />
    <ProductRelated
      v-if="product.data.related_products.length > 0"
      :products="product.data.related_products"
    />
  </div>
</template>
<style src="@/assets/scss/product.scss" scoped></style>
