<script setup lang="ts">
// 👉 Data
const $api = useApi();
const clientOpinionData: any = ref(null);
const data: any = await $api("client_opinions");
clientOpinionData.value = data.data;
</script>
<template>
  <div
    class="body-content client-opinion-container lg:mt-16 sm:mt-10 mt-6"
    v-if="clientOpinionData"
  >
    <div class="relative">
      <font-awesome
        icon="fa-solid fa-quote-left"
        class="text-font-color opacity-15 absolute top-0 left-0"
        style="font-size: 8rem"
      />
    </div>
    <div class="grid grid-cols-12 sm:gap-6 gap-3">
      <div class="sm:col-span-6 col-span-12 grid grid-cols-6 gap-4">
        <h3 class="title">
          {{ $t("What our loving clients are saying") }}
          <span class="text-second-color">{{ $t("about us") }}</span>
        </h3>
        <Card
          class="sm:col-start-2 sm:col-span-5 col-span-12 sm:p-7 p-3 mb-auto z-10"
          pt:body:class="p-0 gap-0"
        >
          <template #content>
            <div class="flex gap-4">
              <font-awesome icon="fa-solid fa-quote-left" class="icon" />
              <div class="opinion-content">
                <p class="opinion-desc">
                  {{ clientOpinionData[2]?.desc }}
                </p>
                <p class="client">
                  {{ clientOpinionData[2]?.title }}
                </p>
              </div>
            </div>
          </template>
        </Card>
      </div>
      <div class="right-side">
        <template v-for="(opinion, index) in clientOpinionData.slice(0, 2)">
          <Card
            :class="[
              index == 0 ? 'col-span-6' : 'lg:col-span-4 col-span-6',
              'sm:p-7 p-3',
            ]"
            pt:body:class="p-0 gap-0"
          >
            <template #content>
              <div class="flex gap-4">
                <font-awesome icon="fa-solid fa-quote-left" class="icon" />
                <div class="opinion-content">
                  <p class="opinion-desc">
                    {{ opinion?.desc }}
                  </p>
                  <p class="client">
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
.title {
  @apply font-bold lg:text-6xl sm:text-3xl text-xl text-main-color sm:mt-11 mt-5 lg:ml-11 sm:col-span-6 col-span-12;
}
.right-side {
  @apply sm:col-span-6 col-span-12 grid grid-cols-6 lg:gap-16 sm:gap-10 gap-5 sm:pt-24;
}
.icon {
  @apply text-second-color text-base;
}
.opinion-content {
  @apply flex flex-col sm:gap-6 gap-3;
  .opinion-desc {
    @apply sm:text-base text-sm font-normal;
  }
  .client {
    @apply sm:text-lg text-base font-bold;
  }
}
</style>
