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
  <div class="main-swiper-container flex flex-col gap-5 lg:py-16 sm:py-10 py-4">
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
          class="swiper-buttons rtl:scale-x-[-1]"
        />
        <Button
          icon="pi pi-arrow-right"
          variant="text"
          rounded
          :class="'custom-' + className + '-next'"
          class="swiper-buttons rtl:scale-x-[-1]"
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
  @apply sm:ltr:pl-7 sm:rtl:pr-7 sm:text-base text-sm ltr:pl-[18px] rtl:pr-[18px];
  color: $second-color;
  font-weight: 700;
  &::before {
    @apply ltr:left-0 rtl:right-0;
    content: "";
    background: $second-color;
    position: absolute;
    border-radius: 4px;
    width: 9px;
    height: 29px;
    top: 50%;
    transform: translateY(-50%);
  }
  @media (min-width: 640px) {
    &::before {
      width: 16px;
      height: 36px;
    }
  }
}
.swiper-buttons {
  @apply text-black bg-border-color border-0 sm:w-10 w-8 sm:h-10 h-8;
  .p-button-icon {
    @apply sm:text-base text-sm;
  }
}
</style>
