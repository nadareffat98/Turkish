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
  { title: "Reviews", value: "3" },
]);
</script>

<template>
  <Tabs value="0">
    <TabList pt:activebar:class="bg-second-color h-0.5">
      <Tab
        v-for="tab in tabs"
        :key="tab.title"
        :value="tab.value"
        pt:root:class="sm:text-sm text-xs font-medium text-font-color"
        >{{ $t(tab.title) }}</Tab
      >
    </TabList>
    <TabPanels pt:root:class="lg:p-7 sm:p-4 p-2">
      <TabPanel
        v-for="tab in tabs"
        :key="tab.content"
        :value="tab.value"
        pt:root:class="sm:text-sm text-xs font-normal text-font-color"
      >
        <ProductReviews v-if="tab.title === 'Reviews'" :product="product" />
        <p class="m-0" v-else>{{ tab.content }}</p>
      </TabPanel>
    </TabPanels>
  </Tabs>
</template>
<style scoped lang="scss">
:deep(.p-tablist) {
  overflow-x: auto;
  &::-webkit-scrollbar {
    height: 0px !important;
  }
}
</style>
