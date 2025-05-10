<script setup lang="ts">
// 👉 Data
const { $api }:any = useNuxtApp();
const homeImagesData: any = ref(null);
onMounted(async () => {
  if (import.meta.client) {
    const data: any = await $api("home_images");
    homeImagesData.value = data.data;
  }
});
</script>
<template>
  <div class="bg-main-color flex justify-center items-center px-36 py-14 mt-24" v-if="homeImagesData">
    <div class="grid grid-rows-2 grid-cols-12 gap-2">
      <!-- top right side -->
      <div class="col-span-2 row-span-1">
        <img :src="homeImagesData[0]?.image" class="h-full" />
      </div>
      <div class="col-span-3 row-span-1 flex items-end">
        <img :src="homeImagesData[1]?.image" class="h-2/3 w-full" />
      </div>
      <!-- center side  -->
      <div class="col-span-2 row-span-2 flex items-center">
        <img :src="homeImagesData[2]?.image" class="h-1/2" />
      </div>
      <!-- top left side -->
      <div class="col-span-2 row-span-1 flex items-end">
        <img :src="homeImagesData[3]?.image" style="height: 80%" />
      </div>
      <div class="col-span-3 row-span-1 flex items-end">
        <img :src="homeImagesData[4]?.image" style="height: 95%" />
      </div>
      <!-- bottom right side-->
      <div class="col-span-3 row-span-1">
        <img :src="homeImagesData[5]?.image" class="h-full"/>
      </div>
      <div class="col-span-2 row-span-1">
        <img :src="homeImagesData[6]?.image" class="h-2/3"/>
      </div>
      <!-- bottom left side -->
      <div class="col-span-2 row-span-1">
        <img :src="homeImagesData[4]?.image" style="height: 95%;"/>
      </div>
      <div class="col-span-2 row-span-1">
        <img :src="homeImagesData[6]?.image" class="h-1/2"/>
      </div>
    </div>
  </div>
</template>
