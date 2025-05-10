<script setup>
// 👉 Props
const props = defineProps(["product"]);
const tabs = ref([
  { title: "Description", content: props.product.desc, value: "0" },
  {
    title: "Shipping & Returns",
    content: props.product.shipping_returns,
    value: "1",
  },
  {
    title: "Gift Giving Service",
    content: props.product.gift_sevice,
    value: "2",
  },
  { title: "Review", value: "3" },
]);
</script>

<template>
  <Tabs value="0">
    <TabList pt:activebar:class="bg-second-color h-0.5">
      <Tab
        v-for="tab in tabs"
        :key="tab.title"
        :value="tab.value"
        pt:root:class="text-sm font-medium text-font-color"
        >{{ tab.title }}</Tab
      >
    </TabList>
    <TabPanels pt:root:class="pt-6">
      <TabPanel
        v-for="tab in tabs"
        :key="tab.content"
        :value="tab.value"
        pt:root:class="text-sm font-normal text-font-color"
      >
        <ProductReviews
          v-if="tab.title === 'Review'"
          :reviews="product.reviews"
        />
        <p class="m-0" v-else>{{ tab.content }}</p>
      </TabPanel>
    </TabPanels>
  </Tabs>
</template>
