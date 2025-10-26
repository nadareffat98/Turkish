<script setup>
// 👉 Props
const props = defineProps(["products", "showSkeleton"]);
// 👉 Emits
const emit = defineEmits(["openFilter"]);
// 👉 Data
const router = useRouter();
const route = useRoute();
const keyword = ref("");
const { t } = useI18n();
const selectedSort = ref(null);
const sortedOptions = ref([
  { name: t("Best Seller"), value: "best_seller" },
  { name: t("Price: Low to High"), value: "price_low_to_high" },
  { name: t("Price: High to Low"), value: "price_high_to_low" },
  { name: t("Top rate"), value: "top_rate" },
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
    <div class="flex flex-col gap-3">
      <div class="flex sm:flex-row flex-col-reverse gap-3 justify-between">
        <IconField class="md:basis-5/12 min-w-[40%] block">
          <InputText
            v-model="keyword"
            :placeholder="$t('Search for anything...')"
            class="py-3 px-4 sm:text-sm text-xs font-medium w-full"
            inputmode="search"
            @input="getProductsbySearch"
          />
          <InputIcon class="pi pi-search text-black cursor-pointer" />
        </IconField>
        <div class="items-center md:gap-5 gap-2 md:basis-1/3 min-w-[40%] flex">
          <label class="sm:text-sm text-xs font-medium whitespace-nowrap"
            >{{ $t("Sort by") }} :</label
          >
          <Select
            v-model="selectedSort"
            :options="sortedOptions"
            optionLabel="name"
            optionValue="value"
            :placeholder="$t('Select...')"
            class="w-full"
            :checkmark="true"
            pt:option:class="sort-option"
            pt:optionlabel:class="sm:text-sm text-xs font-medium text-black"
            @change="getProductsbySort"
          >
          </Select>
        </div>
      </div>
      <!-- ✅ Mobile Filter Button -->
      <div class="filter-container" @click="$emit('openFilter')">
        <i class="pi pi-filter"></i>
        <span>{{ $t("Filter") }}</span>
      </div>
    </div>
    <Transition name="fade" mode="out-in">
      <div key="skeleton" v-if="showSkeleton">
        <SkeletonGrid />
      </div>
      <div key="products" v-else>
        <DataView v-if="products" :value="products" layout="grid">
          <template #grid="{ items }">
            <div class="grid grid-cols-12 sm:gap-6 gap-3">
              <div
                v-for="(item, index) in items"
                :key="index"
                class="lg:col-span-4 col-span-6"
              >
                <ProductCard :product="item" />
              </div>
            </div>
          </template>
          <template #empty>
            <div class="flex justify-center items-center">
              {{ $t("There is no products") }}
            </div></template
          >
        </DataView>
      </div>
    </Transition>
  </div>
</template>
<style scoped lang="scss">
.filter-container {
  @apply flex gap-2 w-full md:hidden cursor-pointer sm:text-sm text-xs text-black font-medium;
  align-items: center;
  justify-content: center;
  border: 1px solid $border-color;
  border-radius: 12px;
  padding: 12px 16px;
}
</style>
