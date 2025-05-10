<script setup>
// 👉 Props
const props = defineProps({
  subtitle: String,
  title: String,
  items: Array,
});
</script>
<template>
  <div class="main-grid-container flex flex-col gap-5 pt-16">
    <div class="relative">
      <p
        class="before:bg-second-color before:absolute before:w-4 before:h-9 before:rounded before:-left-0 before:top-1/2 before:-translate-y-1/2 text-base font-bold text-second-color pl-7"
      >
        {{ title }}
      </p>
    </div>
    <h3 class="text-4xl font-bold text-main-color">{{ subtitle }}</h3>
    <DataView v-if="items" :value="items" layout="grid">
      <template #grid="{ items }">
        <div class="grid grid-cols-12 gap-6">
          <div
            v-for="(item, index) in items.slice(0, 6)"
            :key="index"
            class="md:col-span-4"
          >
            <ProductCard :product="item" />
          </div>
        </div>
      </template>
    </DataView>
  </div>
</template>
