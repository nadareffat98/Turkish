<script setup>
const props = defineProps({
  title: String,
  subTitle: String,
  bannerEndpoint: String,
  gridEndpoint: String,
  linkTo: String,
});

const $api = useApi(); 

// Grid
const {
  data: gridData,
  pending: gridPending,
  refresh: refreshGrid,
} = await useAsyncData(
  `${props.gridEndpoint}`,
  () => $api(props.gridEndpoint),
  { lazy: true }
);

// Banner
const { data: bannerData, pending: bannerPending } = await useAsyncData(
  `${props.bannerEndpoint}`,
  () => (props.bannerEndpoint ? $api(props.bannerEndpoint) : null),
  { lazy: true }
);
</script>

<template>
  <div class="lazy-grid-container">
    <!-- Grid -->
    <div class="body-content" v-if="!gridPending && gridData">
      <UiMainGrid
        :title="title"
        :subtitle="subTitle"
        :items="gridData.data"
        :link-to="linkTo"
        @refresh="refreshGrid"
      />
    </div>
    <SkeletonSwiper v-else />

    <!-- Banner -->
    <div v-if="!bannerPending && bannerData">
      <img
        :src="bannerData.data.image"
        :alt="bannerData.data.title"
        class="w-full"
      />
    </div>
  </div>
</template>
