<script setup>
// 👉 Data
const { $api } = useNuxtApp();
const brandImgs = ref(null);
// 👉 mounted
onMounted(async () => {
  if (import.meta.client) {
    const data = await $api("brands");
    brandImgs.value = data.data;
  }
});
</script>
<template>
  <div
    class="body-content brand-imgs-container grid grid-cols-12 gap-6 mt-16"
    v-if="brandImgs"
  >
    <img
      :src="item.image"
      v-for="item in brandImgs"
      :key="item.id"
      class="w-full col-span-2"
    />
  </div>
</template>

