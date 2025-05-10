<script setup>
// 👉 Data
const trakOrderDetails = ref(false);
const orderID = ref("");
// 👉 Methods
const showOrderDetails = (orderId) => {
  orderID.value = orderId;
  trakOrderDetails.value = true;
};
</script>
<template>
  <TrackOrderForm v-if="!trakOrderDetails" @go-to-details="showOrderDetails" />
  <TrackOrderDetails v-else :order-id="orderID" />
</template>
<style src="@/assets/scss/order.scss" scoped></style>
