<script setup>
// 👉 props
const props = defineProps({
  categories: Array,
  colors: Array,
  max: Number,
  min: Number,
});
// 👉 Data
const selectedSubCategory = ref(null);
const router = useRouter();
const route = useRoute();
const priceRange = ref([props.min, props.max]);
const min = props.min;
const max = props.max;
// const selectedPrice = ref(true);
const allColors = ref({
  id: null,
  title: "All Colors",
  hexadecimal: "FFFFFF",
});
const selectedColor = ref(allColors.value);
// 👉 Methods
const getProductsbyCategory = (categoryId) => {
  router.push({ query: { ...route.query, categoryId: categoryId } });
};
const updateSubCategoryQuery = () => {
  router.push({
    query: { ...route.query, subCategoryId: selectedSubCategory.value },
  });
};
const updateColorQuery = () => {
  const newQuery = { ...route.query };
  if (selectedColor.value?.id) {
    newQuery.colorId = selectedColor.value.id;
  } else {
    delete newQuery.colorId;
  }
  router.push({ query: newQuery });
};
const updatePriceQuery = () => {
  const newQuery = { ...route.query };
  if (priceRange.value[0] > min && priceRange.value[1] == max) {
    newQuery.fromPrice = priceRange.value[0];
    delete newQuery.toPrice;
  } else if (priceRange.value[0] == min && priceRange.value[1] < max) {
    newQuery.toPrice = priceRange.value[1];
    delete newQuery.fromPrice;
  } else if (priceRange.value[0] > min && priceRange.value[1] < max) {
    newQuery.fromPrice = priceRange.value[0];
    newQuery.toPrice = priceRange.value[1];
  } else {
    delete newQuery.toPrice;
    delete newQuery.fromPrice;
  }
  router.push({ query: newQuery });
};
</script>
<template>
  <div class="flex flex-col gap-3">
    <div class="category-filter flex flex-col gap-4">
      <p class="text-black text-lg font-bold">Category</p>
      <Accordion value="">
        <AccordionPanel
          v-for="category in categories"
          :key="category.id"
          :value="category.id"
          pt:root:class="border-none mb-3"
          @click="getProductsbyCategory(category.id)"
        >
          <AccordionHeader
            pt:root:class="border-2 border-border-color rounded-xl text-base font-medium text-main-color p-4"
            :pt:toggleicon:class="[
              category.sub_categories.length != 0 ? '' : 'hidden',
              'text-main-color',
            ]"
            >{{ category.title }}</AccordionHeader
          >
          <AccordionContent v-if="category.sub_categories.length != 0">
            <div
              v-for="subCategory of category.sub_categories"
              :key="subCategory.id"
              class="mt-3 flex items-center gap-2 price-filter"
            >
              <RadioButton
                v-model="selectedSubCategory"
                name="dynamic"
                :value="subCategory.id"
                @change="updateSubCategoryQuery"
              />
              <label>{{ subCategory.title }}</label>
            </div>
          </AccordionContent>
        </AccordionPanel>
      </Accordion>
    </div>
    <Divider class="my-3" />
    <div class="price-filter flex flex-col gap-4">
      <p class="text-black text-lg font-bold">Price Range</p>
      <Slider
        v-model="priceRange"
        range
        class="w-full"
        :min="min"
        :max="max"
        pt:range:class="bg-second-color"
        pt:endhandler:class="border-2 border-second-color before:w-full before:h-full outline-transparent	"
        pt:starthandler:class="border-2 border-second-color before:w-full before:h-full outline-transparent	"
        @change="updatePriceQuery"
      />
      <div class="flex gap-3">
        <InputNumber v-model="priceRange[0]" fluid />
        <InputNumber v-model="priceRange[1]" fluid />
      </div>
      <!-- <div class="flex flex-col gap-3">
        <div class="flex items-center gap-2">
          <RadioButton
            v-model="selectedPrice"
            name="dynamic"
            binary
            :disabled="selectedPrice"
          />
          <label>All Prices</label>
        </div>
      </div> -->
    </div>
    <Divider class="my-3" />
    <div class="color-filter flex flex-col gap-4">
      <p class="text-black text-lg font-bold">Color</p>
      <div class="flex flex-col gap-3">
        <div class="flex items-center gap-2">
          <RadioButton
            v-model="selectedColor"
            name="dynamic"
            :value="allColors"
            pt:root:class="rounded-full flex justify-center items-center w-8 h-8 border-transparent"
            pt:box:class="border-4 border-white w-full h-full"
            pt:icon:class="invisible"
            :pt:box:style="{ backgroundColor: '#' + allColors.hexadecimal }"
            @change="updateColorQuery"
          />
          <label>{{ allColors.title }}</label>
        </div>
        <div
          v-for="color in colors"
          :key="color.title"
          class="flex items-center gap-2"
        >
          <RadioButton
            v-model="selectedColor"
            name="dynamic"
            :value="color"
            pt:root:class="rounded-full flex justify-center items-center w-8 h-8 border-transparent"
            pt:box:class="border-4 border-white w-full h-full"
            pt:icon:class="invisible"
            :pt:box:style="{ backgroundColor: '#' + color.hexadecimal }"
            @change="updateColorQuery"
          />
          <label>{{ color.title }}</label>
        </div>
      </div>
    </div>
  </div>
</template>
