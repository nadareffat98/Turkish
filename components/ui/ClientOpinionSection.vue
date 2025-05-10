<script setup lang="ts">
// 👉 Data
const { $api }:any = useNuxtApp();
const clientOpinionData: any = ref(null);
onMounted(async () => {
  if (import.meta.client) {
    const data: any = await $api("client_opinions");
    clientOpinionData.value = data.data;
  }
});
</script>
<template>
  <div class="body-content client-opinion-container mt-16" v-if="clientOpinionData">
    <div class="relative">
      <font-awesome
        icon="fa-solid fa-quote-left"
        class="text-font-color opacity-15 absolute top-0 left-0"
        style="font-size: 8rem"
      />
    </div>
    <div class="grid grid-cols-12 gap-6">
      <div class="md:col-span-6 grid grid-cols-6 gap-4">
        <h3 class="font-bold text-6xl text-main-color mt-11 ml-11 col-span-6">
          What our loving clients are saying
          <span class="text-second-color">about us</span>
        </h3>
        <Card
          class="col-start-2 col-span-5 p-7 mb-auto"
          pt:body:class="p-0 gap-0"
        >
          <template #content>
            <div class="flex gap-4">
              <font-awesome
                icon="fa-solid fa-quote-left"
                class="text-second-color"
                style="font-size: 1rem"
              />
              <div class="flex flex-col gap-6">
                <p class="text-base font-normal">
                  {{ clientOpinionData[2]?.desc }}
                </p>
                <p class="text-lg font-bold">
                  {{ clientOpinionData[2]?.title }}
                </p>
              </div>
            </div>
          </template>
        </Card>
      </div>
      <div class="md:col-span-6 grid grid-cols-6 gap-16 pt-24" style="">
        <template v-for="(opinion, index) in clientOpinionData.slice(0, 2)">
          <Card
            :class="[index == 0 ? 'col-span-6' : 'col-span-4', 'p-7']"
            pt:body:class="p-0 gap-0"
          >
            <template #content>
              <div class="flex gap-4">
                <font-awesome
                  icon="fa-solid fa-quote-left"
                  class="text-second-color"
                  style="font-size: 1rem"
                />
                <div class="flex flex-col gap-6">
                  <p class="text-base font-normal">
                    {{ opinion?.desc }}
                  </p>
                  <p class="text-lg font-bold">
                    {{ opinion?.title }}
                  </p>
                </div>
              </div>
            </template>
          </Card>
        </template>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
h3 {
  span {
    font-family: "El Messiri" !important;
  }
}
</style>
