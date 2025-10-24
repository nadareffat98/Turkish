<script setup lang="ts">
// 👉 Data
const $api = useApi();
const { $toast }: any = useNuxtApp();
const authStore = useAuthStore();
const isLoading = useLoadingState();
const cartProducts: any = ref(null);
const total: any = ref(null);
const coupon = ref(null);
const {t} = useI18n();

// 👉 Methods
const getData = async () => {
  isLoading.value = true;
  try {
    const resProducts: any = await $api("cart");
    cartProducts.value = resProducts.data;
    const params: any = {};
    if (coupon.value) {
      params.coupon = coupon.value;
    }
    if (!authStore.isAuth) params.guest_token = 1;
    const resTotal: any = await $api("receipt", {
      query: params,
    });
    total.value = resTotal.data;
  } catch (e: any) {
    $toast(e.data.message, "error");
  } finally {
    isLoading.value = false;
  }
};
// remove product from cart
const removeItem = async (cartId: any) => {
  isLoading.value = true;
  const res = await $api("delete_item", {
    method: "DELETE",
    query: { cart_id: cartId },
  });
  await getData();
  isLoading.value = false;
};
// minus item from cart
const minusItem = async (cartId: any) => {
  isLoading.value = true;
  const res = await $api("minus_item", {
    method: "POST",
    body: { cart_id: cartId },
  });
  await getData();
  isLoading.value = false;
};
// increase item into cart
const addItem = async (item: any) => {
  isLoading.value = true;
  const res: any = await $api("cart", {
    method: "POST",
    body: {
      product_id: item.product.id,
      color_id: item.product_color.color.id,
      quantity: 1,
    },
  });
  await getData();
  isLoading.value = false;
  if (res.status == "fail") $toast(res.message, "error");
  else $toast(t("the item added successfully"), "success");
};
const apply = async (couponCode: any) => {
  coupon.value = couponCode;
  await getData();
};
const checkout = async () => {
  isLoading.value = true;
  try {
    const res = await $api("proceed-to-checkout", {
      method: "POST",
      body: {
        is_gift: 0,
      },
    });
    console.log(res);
  } catch (error: any) {
    $toast(error?.data?.message, "error");
  } finally {
    isLoading.value = false;
  }
};
onMounted(() => {
  getData();
});
</script>
<template>
  <div
    class="cart-container flex lg:flex-row flex-col xl:gap-16 sm:gap-10 gap-5 xl:mb-20 lg:mb-10 mb-6"
    v-if="cartProducts && total"
  >
    <div class="left-side lg:w-[70%] w-full">
      <CartProducts
        :products="cartProducts"
        @removeFromCard="removeItem"
        @addToCard="addItem"
        @minusItem="minusItem"
      />
    </div>
    <div class="right-side lg:w-[30%] w-full">
      <CartCheckout
        :totalPrice="total"
        @applyCoupon="apply"
        @checkout="checkout"
      />
    </div>
  </div>
</template>
<style lang="scss" src="@/assets/scss/cart.scss" scoped></style>
