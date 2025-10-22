<script setup>
// 👉 Props
const props = defineProps({
  subtitle: String,
  title: String,
  items: Array,
  linkTo: String,
});
</script>
<template>
  <div
    class="main-grid-container flex flex-col items-start sm:gap-5 gap-3 lg:py-16 sm:py-10 py-6"
  >
    <div class="relative">
      <p class="title-container">
        {{ title }}
      </p>
    </div>
    <h3 class="sm:text-4xl text-xl font-bold text-main-color">
      {{ subtitle }}
    </h3>
    <DataView v-if="items" :value="items" layout="grid">
      <template #grid="{ items }">
        <div class="grid grid-cols-12 sm:gap-6 gap-3">
          <div
            v-for="(item, index) in items.slice(0, 6)"
            :key="index"
            class="sm:col-span-4 col-span-6"
          >
            <ProductCard :product="item" @refresh="$emit('refresh')" />
          </div>
        </div>
      </template>
    </DataView>
    <UiButtonComponent
      :label="$t('View All Collection')"
      v-if="items"
      @click="navigateTo(linkTo)"
    />
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
</style>
