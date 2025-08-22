<script setup lang="ts">
const props = defineProps(["product"]);
const NumberOfRatings = computed(() => {
  return (
    props.product.five_stars +
    props.product.four_stars +
    props.product.three_stars +
    props.product.two_stars +
    props.product.one_star
  );
});
const rates = computed(() => {
  const total = NumberOfRatings.value || 1;

  return [
    {
      rate: 5,
      progress: (props.product.five_stars / total) * 100,
      value: props.product.five_stars,
    },
    {
      rate: 4,
      progress: (props.product.four_stars / total) * 100,
      value: props.product.four_stars,
    },
    {
      rate: 3,
      progress: (props.product.three_stars / total) * 100,
      value: props.product.three_stars,
    },
    {
      rate: 2,
      progress: (props.product.two_stars / total) * 100,
      value: props.product.two_stars,
    },
    {
      rate: 1,
      progress: (props.product.one_star / total) * 100,
      value: props.product.one_star,
    },
  ];
});
</script>
<template>
  <div class="reviews-container p-10 flex flex-col gap-10">
    <div class="rate-container flex gap-8">
      <div
        class="flex flex-col basis-auto items-center justify-center gap-3 p-8 bg-[#FBFBFB] rounded"
      >
        <h3 class="font-bold text-6xl text-black">{{ product.avg_rate }}</h3>
        <Rating
          v-model="product.avg_rate"
          :readonly="true"
          pt:onicon:style="color:#FBBC05"
          pt:officon:style="color:#FBBC05"
        />
        <p class="text-base font-semibold text-black text-center">
          Customer Rating
          <span class="text-main-color"> ({{ NumberOfRatings }})</span>
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
            <span class="font-normal text-font-color" v-if="rate.value > 0">( {{ rate.value }} )</span>
          </p>
        </div>
      </div>
    </div>
    <ProductCustomerFeedback v-if="product.reviews.length > 0" />
    <p v-else class="text-base font-semibold text-black text-center">
      No Reviews Found
    </p>
  </div>
</template>
