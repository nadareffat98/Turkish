<script setup>
// ✅ Lazy load component only when needed
const LazySwiper = defineAsyncComponent(() =>
  import("../components/ui/LazySwiperSection.vue")
);
const lazyGrid = defineAsyncComponent(() =>
  import("../components/ui/LazyGridSection.vue")
);
// ✅ Section visibility state (ensure they are false initially)
const isSection1Visible = ref(false);
const isSection2Visible = ref(false);
const isSection3Visible = ref(false);
const isSection4Visible = ref(false);
const isSection5Visible = ref(false);

// ✅ Section refs for Intersection Observer
const section1Ref = ref(null);
const section2Ref = ref(null);
const section3Ref = ref(null);
const section4Ref = ref(null);
const section5Ref = ref(null);

// ✅ Ensure lazy loading only runs on the client
onMounted(async () => {
  if (import.meta.client) {
    useIntersectionObserver(
      section1Ref,
      ([{ isIntersecting }]) => {
        if (isIntersecting) isSection1Visible.value = true;
      },
      { threshold: 0.5 }
    );

    useIntersectionObserver(
      section2Ref,
      ([{ isIntersecting }]) => {
        if (isIntersecting) isSection2Visible.value = true;
      },
      { threshold: 0.5 }
    );

    useIntersectionObserver(
      section3Ref,
      ([{ isIntersecting }]) => {
        if (isIntersecting) isSection3Visible.value = true;
      },
      { threshold: 0.5 }
    );
    useIntersectionObserver(
      section4Ref,
      ([{ isIntersecting }]) => {
        if (isIntersecting) isSection4Visible.value = true;
      },
      { threshold: 0.5 }
    );
    useIntersectionObserver(
      section5Ref,
      ([{ isIntersecting }]) => {
        if (isIntersecting) isSection5Visible.value = true;
      },
      { threshold: 0.5 }
    );
  }
});
</script>
<template>
  <div class="home-container">
    <UiGalleriaSection id="home-slider" sliders-endpoint="sliders" :show-marquee="true" />
    <UiWebsiteFeaturesSection />
    <!-- Section 1 -->
    <div ref="section1Ref" class="section">
      <LazySwiper
        v-if="isSection1Visible"
        type="category"
        title="Categories"
        sub-title="Browse By Category"
        swiperEndpoint="categories"
      />
      <SkeletonSwiper v-else />
    </div>

    <!-- Section 2 -->
    <div ref="section2Ref" class="section">
      <LazySwiper
        v-if="isSection2Visible"
        type="product"
        title="This Month"
        sub-title="Best Selling Products"
        swiperEndpoint="best_selling"
      />
      <SkeletonSwiper v-else />
    </div>

    <!-- Section 3 -->
    <div ref="section3Ref" class="section">
      <LazySwiper
        v-if="isSection3Visible"
        type="product"
        title="Today’s"
        sub-title="Flash Sales"
        banner-endpoint="flower_banners"
        swiperEndpoint="flash_sales"
      />
      <SkeletonSwiper v-else />
    </div>
    <!-- Section 4 -->
    <div ref="section4Ref" class="section">
      <lazyGrid
        v-if="isSection4Visible"
        title="Our Products"
        sub-title="Explore Our Products"
        banner-endpoint="custom_build_banner"
        grid-endpoint="our_products"
      />
      <SkeletonSwiper v-else />
    </div>
    <!-- Section 5 -->
    <div ref="section5Ref" class="section">
      <lazyGrid
        v-if="isSection5Visible"
        title="Today’s"
        sub-title="New collection"
        banner-endpoint="seeking_unavailable_banner"
        grid-endpoint="new_collection"
      />
      <SkeletonSwiper v-else />
    </div>
    <UiClientOpinionSection />
    <UiHomeImagesSection />
    <UiBrandsSection />
  </div>
</template>

<style scoped>
.section {
  min-height: 300px;
}
</style>
