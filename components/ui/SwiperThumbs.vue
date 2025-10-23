<script setup>
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";

const props = defineProps(["images"]);
// 👉 Data
const thumbsSwiper = ref(null);
const responsiveThumbnailOptions = ref({
  0: {
    slidesPerView: 3,
  },
  769: {
    slidesPerView: 6,
  },
});
const navigationThumbnailOptions = ref({
  nextEl: ".thumbs-button-next",
  prevEl: ".thumbs-button-prev",
});
// 👉 Methods
const setThumbsSwiper = (swiper) => {
  thumbsSwiper.value = swiper;
};
</script>
<template>
  <swiper
    :modules="[Thumbs]"
    :thumbs="{ swiper: thumbsSwiper }"
    class="main-swiper w-full"
  >
    <swiper-slide v-for="(image, index) in images" :key="index">
      <img :src="image.image" class="h-auto w-full rounded-xl mx-auto" />
    </swiper-slide>
  </swiper>
  <div class="thumbs-container relative mt-6 w-full" v-if="images.length > 1">
    <Button
      icon="pi pi-arrow-left"
      variant="text"
      rounded
      class="thumbs-button-prev absolute text-white bg-second-color border-2 border-white -left-4 top-1/2 -translate-y-1/2 z-10"
    />
    <swiper
      :modules="[Thumbs, FreeMode, Navigation]"
      @swiper="setThumbsSwiper"
      class="thumbnail-swiper w-full"
      :breakpoints="responsiveThumbnailOptions"
      :space-between="7"
      :freeMode="true"
      :navigation="navigationThumbnailOptions"
      :watchSlidesProgress="true"
    >
      <swiper-slide
        v-for="(image, index) in images"
        :key="index"
        style="height: 85px"
      >
        <img :src="image.image" class="h-full w-full rounded-lg object-cover" />
      </swiper-slide>
    </swiper>
    <Button
      icon="pi pi-arrow-right"
      variant="text"
      rounded
      class="thumbs-button-next absolute text-white bg-second-color border-2 border-white -right-4 top-1/2 -translate-y-1/2 z-10"
    />
  </div>
</template>
<style scoped lang="scss">
:deep(.swiper-slide-thumb-active) {
  img {
    border: 2px solid var(--second-color) !important;
  }
  //   border-radius: 12px;
}
</style>
