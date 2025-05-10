<script setup>
// 👉 Data
const { $api } = useNuxtApp();
const config = useRuntimeConfig();
const route = useRoute();
// 👉 Fetch
// fetch filter data
const { data } = await useAsyncData("filter-data", async () => {
  if (!import.meta.client) return null;
  const [categories, colors] = await Promise.all([
    $api("categories"),
    $api("colors", {
      baseURL: `${config.public.baseURL}/api/general/`,
    }),
  ]);

  return { categories, colors };
});
// fetch products
const { data: products, refresh } = await useAsyncData(
  "product-list",
  async () => {
    if (!import.meta.client) return null;
    return await $api("products", {
      query: {
        category_id: route.query.categoryId,
        sub_category_id: route.query.subCategoryId,
        from_price: route.query.fromPrice,
        to_price: route.query.toPrice,
        sorted: route.query.sort,
        keyword: route.query.keyword,
        color_id: route.query.colorId,
      },
    });
  }
);
// 👉 Watch
watch(
  () => route.query,
  () => {
    refresh();
  },
  { deep: true }
);
</script>
<template>
  <div class="products-container flex gap-12" v-if="products && data">
    <div class="left-side w-1/4">
      <ProductFilter
        :categories="data.categories.data"
        :colors="data.colors.data"
        :max="data.colors.max"
        :min="data.colors.min"
      />
    </div>
    <div class="right-side w-3/4">
      <ProductList :products="products?.data" />
    </div>
  </div>
  <div v-else>
    <p>Loading products...</p>
  </div>
</template>
<style lang="scss" src="@/assets/scss/product.scss" scoped></style>
