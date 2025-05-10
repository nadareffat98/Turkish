<script setup>
// 👉 Props
const props = defineProps({
  title: String,
  subTitle: String,
  bannerEndpoint: String, // API for banner image
  gridEndpoint: String, // API for grid images
});
// 👉 Data
const { $api } = useNuxtApp();
const gridData = ref(null);
const bannerData = ref(null);
onMounted(async () => {
  if (import.meta.client) {
    const [Banner, Data] = await Promise.all([
      props.bannerEndpoint ? $api(props.bannerEndpoint) : null,
      $api(props.gridEndpoint),
    ]);
    gridData.value = Data.data;
    bannerData.value = Banner.data;
  }
});
</script>
<template>
  <div class="lazy-grid-container">
    <div class="body-content flex flex-col items-start gap-6" v-if="gridData">
      <UiMainGrid :title="title" :subtitle="subTitle" :items="gridData" />
      <UiButtonComponent label="View All Collection"/>
    </div>
    <SkeletonSwiper v-else />
    <img v-if="bannerData" :src="bannerData.image" :alt="bannerData.title" class="w-full mt-16"/>
  </div>
</template>
