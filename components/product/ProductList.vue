<script setup>
// 👉 Props
const props = defineProps(["products"]);
// 👉 Data
const router = useRouter();
const route = useRoute();
const keyword = ref("");
const selectedSort = ref(null);
const sortedOptions = ref([
  { name: "Best Seller", value: "best_seller" },
  { name: "Price: Low to High", value: "price_low_to_high" },
  { name: "Price: High to Low", value: "price_high_to_low" },
  { name: "Top Rate", value: "top_rate" },
]);
// 👉 Methods
const getProductsbySearch = () => {
  router.push({ query: { ...route.query, keyword: keyword.value } });
};
const getProductsbySort = () => {
  router.push({ query: { ...route.query, sort: selectedSort.value } });
};
</script>
<template>
  <div class="flex flex-col gap-6">
    <div class="flex justify-between">
      <IconField class="basis-5/12">
        <InputText
          v-model="keyword"
          placeholder="Search for anything..."
          class="py-3 px-4 text-sm font-medium w-full"
          inputmode="search"
          @input="getProductsbySearch"
        />
        <InputIcon class="pi pi-search text-main-color cursor-pointer" />
      </IconField>
      <div class="flex items-center gap-5 basis-1/3">
        <label class="text-sm font-medium whitespace-nowrap">Sort by :</label>
        <Select
          v-model="selectedSort"
          :options="sortedOptions"
          optionLabel="name"
          optionValue="value"
          placeholder="Select..."
          class="w-full"
          :checkmark="true"
          pt:option:class="sort-option"
          pt:optionlabel:class="text-sm font-medium text-main-color"
          @change="getProductsbySort"
        >
        </Select>
      </div>
    </div>
    <DataView v-if="products" :value="products" layout="grid">
      <template #grid="{ items }">
        <div class="grid grid-cols-12 gap-6">
          <div
            v-for="(item, index) in items"
            :key="index"
            class="md:col-span-4"
          >
            <ProductCard :product="item" />
          </div>
        </div>
      </template>
      <template #empty> There is no products </template>
    </DataView>
  </div>
</template>
