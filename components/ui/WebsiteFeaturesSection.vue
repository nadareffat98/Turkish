<script setup>
// 👉 Data
const { $api } = useNuxtApp();
const { data: websiteFeatures } = await useAsyncData(
  "website-features",
  async () => {
    return !import.meta.client ? null : await $api("website_features");
  }
);
</script>
<template>
  <div
    class="body-content website-features-container my-12"
    v-if="websiteFeatures"
  >
    <div class="border border-border-color rounded-md flex p-4">
      <template v-for="(item, index) in websiteFeatures.data" :key="item.id">
        <div class="flex-1 flex justify-center items-center gap-4">
          <img :src="item.image" class="w-8 h-8"/>
          <div class="flex flex-col gap-1">
            <p class="text-main-color text-base font-medium">
              {{ item.title }}
            </p>
            <span class="text-font-color text-sm font-normal">{{
              item.desc
            }}</span>
          </div>
        </div>
        <Divider
          layout="vertical"
          v-if="index < websiteFeatures.data.length - 1"
        />
      </template>
    </div>
  </div>
</template>
