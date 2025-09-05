<script setup lang="ts">
// 👉 Data
const { $api }: any = useNuxtApp();
const homeImagesData: any = ref(null);
const data: any = await $api("home_images");
homeImagesData.value = data.data;
</script>

<template>
  <div
    class="bg-main-color flex justify-center items-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-36 py-8 sm:py-10 md:py-12 lg:py-14 mt-12 sm:mt-16 md:mt-20 lg:mt-24"
    v-if="homeImagesData"
  >
    <div class="hidden md:grid grid-rows-2 grid-cols-12 gap-2 w-full">
      <!-- الصف الأول -->
      <!-- top right side - الصورة الأولى -->
      <div class="col-span-2 row-span-1">
        <img
          :src="homeImagesData[0]?.image"
          class="h-full w-full object-cover"
        />
      </div>

      <!-- الصورة الثانية -->
      <div class="col-span-3 row-span-1 flex items-end">
        <img
          :src="homeImagesData[1]?.image"
          class="h-2/3 w-full object-cover"
        />
      </div>

      <!-- center side - الصورة المركزية -->
      <div class="col-span-2 row-span-2 flex items-center">
        <img
          :src="homeImagesData[2]?.image"
          class="h-1/2 w-full object-cover"
        />
      </div>

      <!-- top left side - الصورة الثالثة -->
      <div class="col-span-2 row-span-1 flex items-end">
        <img
          :src="homeImagesData[3]?.image"
          class="w-full object-cover"
          style="height: 80%"
        />
      </div>

      <!-- الصورة الرابعة -->
      <div class="col-span-3 row-span-1 flex items-end">
        <img
          :src="homeImagesData[4]?.image"
          class="w-full object-cover"
          style="height: 95%"
        />
      </div>

      <!-- الصف الثاني -->
      <!-- bottom right side - الصورة الخامسة -->
      <div class="col-span-3 row-span-1">
        <img
          :src="homeImagesData[5]?.image"
          class="h-full w-full object-cover"
        />
      </div>

      <!-- الصورة السادسة -->
      <div class="col-span-2 row-span-1">
        <img
          :src="homeImagesData[6]?.image"
          class="h-2/3 w-full object-cover"
        />
      </div>

      <!-- bottom left side - الصورة الرابعة مكررة -->
      <div class="col-span-2 row-span-1">
        <img
          :src="homeImagesData[4]?.image"
          class="w-full object-cover"
          style="height: 95%"
        />
      </div>

      <!-- الصورة السادسة مكررة -->
      <div class="col-span-2 row-span-1">
        <img
          :src="homeImagesData[6]?.image"
          class="h-1/2 w-full object-cover"
        />
      </div>
    </div>
    <div class="grid md:hidden grid-cols-6 gap-3 w-full">
      <div class="col-span-2 aspect-square">
        <img
          :src="homeImagesData[0]?.image"
          class="h-full w-full object-cover rounded-lg"
        />
      </div>
      <div class="col-span-2 aspect-square">
        <img
          :src="homeImagesData[1]?.image"
          class="h-full w-full object-cover rounded-lg"
        />
      </div>
      <div class="col-span-2 aspect-square">
        <img
          :src="homeImagesData[2]?.image"
          class="h-full w-full object-cover rounded-lg"
        />
      </div>
      <div class="col-span-2 aspect-square">
        <img
          :src="homeImagesData[3]?.image"
          class="h-full w-full object-cover rounded-lg"
        />
      </div>
      <div class="col-span-2 aspect-square">
        <img
          :src="homeImagesData[4]?.image"
          class="h-full w-full object-cover rounded-lg"
        />
      </div>
      <div class="col-span-2 aspect-square">
        <img
          :src="homeImagesData[5]?.image"
          class="h-full w-full object-cover rounded-lg"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
img {
  transition: transform 0.3s ease;
}

img:hover {
  transform: scale(1.01);
}
img {
  object-fit: cover;
  object-position: center;
}
@media (prefers-reduced-motion: reduce) {
  img {
    transition: none;
  }
}
</style>
