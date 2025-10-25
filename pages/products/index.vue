<script setup>
// 👉 Data
const $api = useApi();
const config = useRuntimeConfig();
const route = useRoute();
const visible = ref(false);
const { locale } = useI18n();
const showSkeleton = ref(false);
// 👉 Fetch
// fetch filter data
const { data } = await useAsyncData("filter-data", () =>
  Promise.all([
    $api("categories"),
    $api("colors", {
      baseURL: `${config.public.baseURL}/api/general/`,
    }),
  ]).then(([categories, colors]) => ({ categories, colors }))
);

// fetch products
const {
  data: products,
  refresh,
  pending,
} = await useAsyncData(
  "product-list",
  () =>
    $api("products", {
      query: {
        category_id: route.query.categoryId,
        sub_category_id: route.query.subCategoryId,
        from_price: route.query.fromPrice,
        to_price: route.query.toPrice,
        sorted: route.query.sort,
        keyword: route.query.keyword,
        color_id: route.query.colorId,
      },
    }),
  { watch: [() => route.query] }
);
watch(
  () => route.fullPath,
  () => {
    if (visible.value) visible.value = false;
  }
);
</script>
<template>
  <div class="products-container flex lg:gap-12 gap-6" v-if="products && data">
    <!-- ✅ Desktop Filter -->
    <div class="left-side md:flex hidden w-1/4">
      <ProductFilter
        :categories="data.categories.data"
        :colors="data.colors.data"
        :max="data.colors.max"
        :min="data.colors.min"
      />
    </div>
    <!-- ✅ Products List -->
    <div class="right-side md:w-3/4 w-full">
      <ProductList
        :products="products?.data"
        :showSkeleton="pending"
        @open-filter="visible = true"
      />
    </div>
    <!-- ✅ Drawer for mobile -->
    <Drawer
      v-model:visible="visible"
      pt:header:class="p-3 mb-4 border-b border-border-color"
      pt:title:class="text-base font-bold text-black"
      class="product-drawer"
      :position="locale === 'ar' ? 'right' : 'left'"
      :header="$t('Filter Products')"
    >
      <ProductFilter
        :categories="data.categories.data"
        :colors="data.colors.data"
        :max="data.colors.max"
        :min="data.colors.min"
      />
    </Drawer>
  </div>
  <div v-else class="products-container flex lg:gap-12 gap-6">
    <div class="left-side md:flex hidden w-1/4">
      <SkeletonFilter />
    </div>
    <div class="right-side md:w-3/4 w-full">
      <SkeletonGrid />
    </div>
  </div>
</template>
<style lang="scss" src="@/assets/scss/product.scss" scoped></style>
