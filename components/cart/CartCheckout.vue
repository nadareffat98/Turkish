<script setup>
// 👉 props
const props = defineProps(["totalPrice"]);
</script>
<template>
  <div class="w-full">
    <Card
      class="cart-checkout-container"
      pt:root:class="shadow-none border-2 border-border-color  rounded-xl"
      pt:body:class="p-0 gap-0"
    >
      <template #title>
        <p class="text-black text-lg font-medium px-4 py-5">Bag Totals</p>
      </template>
      <template #content>
        <div class="flex flex-col gap-3 px-4">
          <div class="flex justify-between">
            <p class="text-main-color text-sm text-medium">Sub-total</p>
            <span class="text-sm font-semibold text-black"
              >{{ totalPrice.sub_total }} <b class="font-bold"> EGP</b></span
            >
          </div>
          <div class="flex justify-between">
            <p class="text-main-color text-sm text-medium">Shipping</p>
            <span class="text-sm font-semibold text-border-color"
              >Calculated at next step</span
            >
          </div>
          <div class="flex justify-between">
            <p class="text-main-color text-sm text-medium">Coupon</p>
            <span class="text-sm font-semibold text-border-color"
              >Calculated at next step</span
            >
          </div>
          <div class="flex justify-between">
            <p class="text-main-color text-sm text-medium">Tax</p>
            <span class="text-sm font-semibold text-black"
              >{{ totalPrice.vat_price }}<b class="font-bold"> EGP</b></span
            >
          </div>
        </div>
        <Divider />
        <div class="flex justify-between pb-6 px-4">
          <p class="text-black text-base font-medium">Total</p>
          <span class="text-black text-base font-semibold"
            >{{totalPrice.total}}<b class="font-bold"> EGP </b></span
          >
        </div>
      </template>
    </Card>
    <div class="relative mt-4">
      <InputText placeholder="Coupon code" fluid />
      <UiButtonComponent
        content="Apply"
        class="rounded-xl absolute right-0 h-full px-6"
      />
    </div>
    <UiButtonComponent
      label="Proceed to Checkout"
      icon="pi pi-arrow-right"
      icon-pos="right"
      class="text-base py-3 w-full rounded-xl mt-4 gap-3"
    />
  </div>
</template>
