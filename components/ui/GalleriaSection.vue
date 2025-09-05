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
    <UiMarqueeSection v-if="showMarquee" />
  </div>
</template>
<style lang="scss" src="@/assets/scss/galleria.scss" scoped />
