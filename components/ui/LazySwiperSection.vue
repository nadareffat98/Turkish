<script setup>
// 👉 Props
const props = defineProps({
  title: String,
  subTitle: String,
  type: String,
  bannerEndpoint: String, // API for banner image
  swiperEndpoint: String, // API for swiper images
});
// 👉 Data
const { $api } = useNuxtApp();
const swiperData = ref(null);
const bannerData = ref(null);
onMounted(async () => {
  if (import.meta.client) {
    const [Banner, Data] = await Promise.all([
      props.bannerEndpoint ? $api(props.bannerEndpoint) : null,
      $api(props.swiperEndpoint),
    ]);
    swiperData.value = Data.data;
    bannerData.value = Banner?.data;
  }
});
</script>
<template>
  <div class="lazy-swiper-container">
    <div class="body-content" v-if="swiperData">
      <UiMainSwiper
        :title="title"
        :subtitle="subTitle"
        :className="swiperEndpoint + '-swiper'"
        :slides-per-view="type == 'category' ? 6 : 3"
        :space-between="24"
        :items="swiperData"
      >
        <template #default="{ item, index }">
          <CategoryCard :category="item" v-if="type == 'category'" />
          <ProductCard :product="item" v-else />
        </template>
      </UiMainSwiper>
    </div>
    <SkeletonSwiper v-else />
    <img
      v-if="bannerData"
      :src="bannerData.image"
      :alt="bannerData.title"
      class="w-full mt-16"
    />
  </div>
</template>
