<script setup lang="ts">
const productRating = ref(3.5);
const rates = ref([
  { rate: 5, progress: 63, value: "(94,532)" },
  { rate: 4, progress: 24, value: "(94,532)" },
  { rate: 3, progress: 9, value: "(94,532)" },
  { rate: 2, progress: 1, value: "(94,532)" },
  { rate: 1, progress: 7, value: "(94,532)" },
]);
</script>
<template>
  <div class="reviews-container p-10 flex flex-col gap-10">
    <div class="rate-container flex gap-8">
      <div
        class="flex flex-col basis-auto items-center justify-center gap-3 p-8 bg-[#FBFBFB] rounded"
      >
        <h3 class="font-bold text-6xl text-black">4.7</h3>
        <Rating
          v-model="productRating"
          :readonly="true"
          pt:onicon:style="color:#FBBC05"
          pt:officon:style="color:#FBBC05"
        />
        <p class="text-base font-semibold text-black">
          Customer Rating <span class="text-main-color"> (934,516)</span>
        </p>
      </div>
      <div class="rate-detailes flex flex-col gap-6 basis-7/12">
        <div
          class="individual-rate flex items-center gap-4"
          v-for="rate in rates"
          :key="rate.rate"
        >
          <Rating
            v-model="rate.rate"
            :readonly="true"
            pt:onicon:style="color:#FBBC05"
            pt:officon:style="color:#FBBC05"
          />
          <ProgressBar
            :value="rate.progress"
            style="height: 4px; width: 100%"
            :showValue="false"
            pt:value:class="bg-[#FBBC05]"
          ></ProgressBar>
          <p class="font-medium text-sm text-black flex gap-1">
            {{ rate.progress }}%
            <span class="font-normal text-font-color"> {{ rate.value }}</span>
          </p>
        </div>
      </div>
    </div>
    <ProductCustomerFeedback />
  </div>
</template>
