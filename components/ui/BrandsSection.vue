<script setup>
// 👉 Data
const { $api } = useNuxtApp();
const brandImgs = ref(null);
const data = await $api("brands");
brandImgs.value = data.data;
</script>
<template>
  <div
    class="body-content brand-imgs-container flex items-center justify-center flex-wrap sm:gap-6 gap-3 lg:mt-16 sm:mt-10 mt-6"
    v-if="brandImgs"
  >
    <img
      :src="item.image"
      v-for="item in brandImgs"
      :key="item.id"
      class="w-auto lg:max-w-40 xl:max-h-40 sm:max-w-24 sm:max-h-24 max-w-16 max-h-16"
    />
  </div>
</template>
<style scoped lang="scss"></style>
