<script setup>
import { Navigation, FreeMode } from "swiper/modules";

const props = defineProps({
  subtitle: String,
  title: String,
  slidesPerView: Number,
  spaceBetween: Number,
  className: String,
  items: Array,
});
const navigationOptions = ref({
  nextEl: ".custom-" + props.className + "-next",
  prevEl: ".custom-" + props.className + "-prev",
});
</script>
<template>
  <div
    class="main-swiper-container flex flex-col gap-5 lg:py-16 sm:py-10 py-4"
  >
    <div class="relative">
      <p class="title-container">
        {{ title }}
      </p>
    </div>
    <div class="flex justify-between items-center gap-2">
      <h3 class="sm:text-4xl text-xl font-bold text-main-color">
        {{ subtitle }}
      </h3>
      <div class="navigation-container flex gap-2">
        <Button
          icon="pi pi-arrow-left"
          variant="text"
          rounded
          :class="'custom-' + className + '-prev'"
          class="swiper-buttons"
        />
        <Button
          icon="pi pi-arrow-right"
          variant="text"
          rounded
          :class="'custom-' + className + '-next'"
          class="swiper-buttons"
        />
      </div>
    </div>
    <Swiper
      :modules="[Navigation, FreeMode]"
      :slidesPerView="slidesPerView"
      :space-between="spaceBetween"
      :class="['w-full', className]"
      :navigation="navigationOptions"
      :freeMode="true"
      v-bind="$attrs"
    >
      <swiper-slide v-for="(item, index) in items" :key="index">
        <slot :item="item" :index="index"></slot>
      </swiper-slide>
    </Swiper>
  </div>
</template>
<style scoped lang="scss">
.title-container {
  padding-left: 18px;
  color: $second-color;
  font-size: 14px;
  font-weight: 700;
  &::before {
    content: "";
    background: $second-color;
    position: absolute;
    border-radius: 4px;
    width: 9px;
    height: 29px;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  @media (min-width: 640px) {
    &::before {
      width: 16px;
      height: 36px;
    }
    font-size: 16px;
    padding-left: 28px;
  }
}
.swiper-buttons {
  @apply text-black bg-border-color border-0 sm:w-10 w-8 sm:h-10 h-8;
  .p-button-icon {
    @apply sm:text-base text-sm;
  }
}
</style>
