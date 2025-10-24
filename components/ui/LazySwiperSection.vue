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
const $api = useApi();
const {
  data: swiperData,
  pending: swiperPending,
  refresh: refreshSwiper,
} = await useAsyncData(
  `${props.swiperEndpoint}`,
  () => $api(props.swiperEndpoint),
  { lazy: true }
);

const { data: bannerData, pending: bannerPending } = await useAsyncData(
  `${props.bannerEndpoint}`,
  () => (props.bannerEndpoint ? $api(props.bannerEndpoint) : null),
  { lazy: true }
);
const categoryResponsive = {
  1024: {
    slidesPerView: 6,
    spaceBetween: 24,
  },
  768: {
    slidesPerView: 4,
  },
  425: {
    slidesPerView: 3,
  },
  0: {
    slidesPerView: 2,
  },
};
const productResponsive = {
  768: {
    slidesPerView: 3,
    spaceBetween: 24,
  },
  580: {
    slidesPerView: 3,
  },
  0: {
    slidesPerView: 2,
  },
};
</script>
<template>
  <div class="lazy-swiper-container">
    <div class="body-content" v-if="!swiperPending && swiperData">
      <UiMainSwiper
        :title="title"
        :subtitle="subTitle"
        :className="swiperEndpoint + '-swiper'"
        :slides-per-view="type == 'category' ? 6 : 3"
        :space-between="12"
        :items="swiperData.data"
        :breakpoints="
          type == 'category' ? categoryResponsive : productResponsive
        "
      >
        <template #default="{ item, index }">
          <CategoryCard :category="item" v-if="type == 'category'" />
          <ProductCard :product="item" @refresh="refreshSwiper" v-else />
        </template>
      </UiMainSwiper>
    </div>
    <SkeletonSwiper v-else />
    <template v-if="!bannerPending && bannerData">
      <img
        :src="bannerData.data.image"
        :alt="bannerData.data.title"
        class="w-full"
      />
    </template>
  </div>
</template>
