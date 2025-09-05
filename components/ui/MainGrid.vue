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
    <UiButtonComponent label="View All Collection" v-if="items" @click="navigateTo(linkTo)" />
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
</style>
