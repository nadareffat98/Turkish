<script setup lang="ts">
//  👉 Props
const props = defineProps(["slidersEndpoint", "id", "showMarquee"]);
// 👉 Data
const { $api } = useNuxtApp();
const { data: sliders }: any = await useAsyncData(props.id, () => $api(props.slidersEndpoint));
</script>
<template>
  <div class="galleria-container" v-if="sliders">
    <Galleria
      :value="sliders.data"
      :circular="true"
      :autoPlay="true"
      :transitionInterval="4000"
      :showItemNavigators="false"
      :showThumbnails="false"
      :showIndicators="true"
      :id="id"
    >
      <template #item="slotProps">
        <img
          :src="slotProps.item.image"
          :alt="slotProps.item.title"
          class="w-full"
        />
      </template>
    </Galleria>
    <div
      class="relative overflow-hidden w-full bg-second-color text-white py-2"
      v-if="showMarquee"
    >
      <div class="flex whitespace-nowrap animate-marquee w-max">
        <div class="flex gap-8" v-for="i in 2" :key="i">
          <div class="flex items-center gap-2 px-4" v-for="j in 5" :key="j">
            <img src="/logo/logo.png" class="w-10 h-6" />
            <span class="text-lg font-bold">Up to 20% sale</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" src="@/assets/scss/galleria.scss" scoped />
