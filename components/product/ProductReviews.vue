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
console.log(props.product);
</script>
<template>
  <div
    class="reviews-container lg:p-10 sm:p-6 p-3 flex flex-col lg:gap-10 sm:gap-6 gap-3"
  >
    <div class="rate-container">
      <div class="feedback-side">
        <h3 class="font-bold lg:text-6xl sm:text-4xl text-xl text-black">
          {{ product.avg_rate }}
        </h3>
        <Rating
          v-model="product.avg_rate"
          :readonly="true"
          pt:onicon:style="color:#FBBC05"
          pt:officon:style="color:#FBBC05"
        />
        <p
          class="lg:text-base sm:text-sm text-xs font-semibold text-black text-center"
        >
          {{ $t("Customers Rating") }}
          <span class="text-main-color"> ({{ NumberOfRatings }})</span>
        </p>
      </div>
      <div class="rate-detailes">
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
          <p class="font-medium sm:text-sm text-xs text-black flex gap-1">
            {{ rate.progress }}%
            <span class="font-normal text-font-color" v-if="rate.value > 0"
              >( {{ rate.value }} )</span
            >
          </p>
        </div>
      </div>
    </div>
    <ProductCustomerFeedback v-if="product.reviews.length > 0" />
    <p v-else class="text-base font-semibold text-black text-center">
      {{ $t("No reviews yet") }}
    </p>
  </div>
</template>
<style scoped lang="scss">
.rate-container {
  @apply flex sm:flex-row flex-col lg:gap-8 gap-4;
}
.feedback-side {
  @apply flex flex-col sm:basis-auto items-center justify-center gap-3 lg:p-8 p-5 bg-[#FBFBFB] rounded flex-shrink-0 mx-auto;
}
.rate-detailes {
  @apply flex flex-col lg:gap-6 gap-3 lg:basis-7/12 sm:basis-9/12 basis-full;
}
</style>
