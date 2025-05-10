<script setup lang="ts">
// 👉 Data
const { $api, $toast }: any = useNuxtApp();
const isLoading = useLoadingState();
// 👉 Fetch
const { data: cartProducts, refresh }: any = await useAsyncData(
  "cart",
  async () => {
    return import.meta.client ? await $api("cart") : null;
  }
);
// 👉 Methods
const removeItem = async (cartId: any) => {
  isLoading.value = true;
  const res = await $api("delete_item", {
    method: "DELETE",
    query: { cart_id: cartId },
  });
  refresh();
  isLoading.value = false;
};
const minusItem = async (cartId: any) => {
  isLoading.value = true;
  const res = await $api("minus_item", {
    method: "POST",
    body: { cart_id: cartId },
  });
  refresh();
  isLoading.value = false;
};
const addItem = async (product: any) => {
  isLoading.value = true;
  const res = await $api("cart", {
    method: "POST",
    body: {
      product_id: product.id,
      quantity: 1,
    },
  });
  refresh();
  isLoading.value = false;
  if (res.status == "fail") $toast(res.message, "error");
  else $toast("the item added successfully", "success");
};
</script>
<template>
  <div class="cart-container flex mb-20" style="gap: 64px" v-if="cartProducts">
    <div class="left-side" style="width: 70%">
      <CartProducts
        :products="cartProducts.data"
        @removeFromCard="removeItem"
        @addToCard="addItem"
        @minusItem="minusItem"
      />
    </div>
    <div class="right-side" style="width: 30%">
      <CartCheckout :totalPrice="cartProducts.total_price" />
    </div>
  </div>
  <!-- <div class="mt-20">
    <ProductRelated />
  </div> -->
</template>
<style lang="scss" src="@/assets/scss/cart.scss" scoped></style>
