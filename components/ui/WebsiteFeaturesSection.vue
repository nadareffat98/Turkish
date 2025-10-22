<script setup lang="ts">
// 👉 Data
const { $api }: any = useNuxtApp();
const { data: websiteFeatures }: any = await useAsyncData(
  "website_features",
  () => $api("website_features")
);
</script>
<template>
  <div
    class="body-content website-features-container sm:my-12 my-6"
    v-if="websiteFeatures"
  >
    <div
      class="border border-border-color rounded-md grid grid-cols-12 sm:gap-6 gap-y-4 gap-x-2 sm:p-4 p-2"
    >
      <div
        v-for="(item, index) in websiteFeatures.data"
        :key="item.id"
        class="lg:col-span-3 col-span-6 flex justify-between"
      >
        <div
          class="flex sm:flex-row flex-col sm:justify-center sm:items-center sm:gap-4"
        >
          <img :src="item.image" class="w-8 h-8" />
          <div class="flex flex-col gap-1">
            <p class="text-main-color sm:text-base text-sm font-medium">
              {{ item.title }}
            </p>
            <span class="text-font-color sm:text-sm text-xs font-normal">{{
              item.desc
            }}</span>
          </div>
        </div>
        <Divider
          layout="vertical"
          class="lg:block hidden !m-0"
          v-if="index < websiteFeatures.data.length - 1"
        />
      </div>
    </div>
  </div>
</template>
