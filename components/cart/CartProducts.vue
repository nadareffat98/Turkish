<script setup>
const props = defineProps(["products"]);
</script>
<template>
  <Card
    class="cart-products-container"
    pt:root:class="shadow-none border-2 border-border-color rounded-xl"
    pt:body:class="p-0 gap-0"
  >
    <template #title>
      <h3 class="text-black sm:text-3xl text-xl font-bold sm:px-6 px-3 sm:py-5 py-2">
        {{ $t("Shopping Bag") }}
      </h3>
    </template>
    <template #content>
      <ProductTable
        routeType="cart"
        :products="products"
        @removeFromCard="$emit('removeFromCard', $event)"
        @addToCard="$emit('addToCard', $event)"
        @minusItem="$emit('minusItem', $event)"
      />
    </template>
  </Card>
</template>
