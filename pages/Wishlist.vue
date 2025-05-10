<script setup>
const { $api, $toast } = useNuxtApp();
const isLoading = useLoadingState();
// 👉 Fetch
const { data: wishlist, refresh } = await useAsyncData("wishlist", async () => {
  if (!import.meta.client) return null;
  return await $api("favorites");
});
// 👉 Methods
const removeFromWishlist = async (id) => {
  isLoading.value = true;
  const res = await $api("products/" + id + "/toggle-favorite", {
    method: "POST",
  });
  if (res.status == "fail") $toast(res.message, "error");
  else {
    refresh();
  }
  setTimeout(() => {
    isLoading.value = false;
  }, 1000);
};
const addToCart = async (product) => {
  isLoading.value = true;
  const res = await $api("cart", {
    method: "POST",
    body: {
      product_id: product.id,
      quantity: 1,
      // colored_id: selectedColor.value?.id ?? null,
    },
  });
  isLoading.value = false;
  if (res.status == "fail") $toast(res.message, "error");
  else $toast("the item added to your cart successfully", "success");
};
</script>
<template>
  <div v-if="wishlist">
    <div
      class="empty-wishlist flex flex-col items-center justify-center text-center mx-auto"
      style="width: 430px"
      v-if="wishlist.data.length == 0"
    >
      <img src="/public/imgs/heart_broken.png" class="w-24 h-24 mb-6" />
      <h3 class="text-3xl font-bold mb-2">Nothing found in Wishlist!</h3>
      <span class="text-main-color text-sm font-medium mb-8"
        >Once you have added items to your Wishlist, the page should display the
        contents of your cart, including the products, quantities, and
        cost.</span
      >
      <UiButtonComponent content="Go Shopping" as="router-link" to="/" />
    </div>
    <div class="wishlist-container flex flex-col gap-6" v-else>
      <Card
        class="cart-products-container"
        pt:root:class="shadow-none border-2 border-border-color  rounded-xl"
        pt:body:class="p-0 gap-0"
      >
        <template #title>
          <h3 class="text-black text-3xl font-bold px-6 py-5">Wishlist</h3>
        </template>
        <template #content>
          <div class="data-view-header flex items-center gap-6 px-6 py-2">
            <p style="width: 50%">Products</p>
            <p style="width: 20%">Price</p>
            <p style="width: 20%">Stock Status</p>
            <p style="width: 10%">Actions</p>
          </div>
          <DataView
            :value="wishlist.data"
            pt:root:class="overflow-y-scroll max-h-96"
          >
            <template #list="slotProps">
              <div class="flex flex-col p-6">
                <div v-for="(item, index) in slotProps.items" :key="index">
                  <div
                    class="flex items-center gap-6 py-4"
                    :class="{
                      'pt-0': index === 0,
                      'pb-0': index === slotProps.items.length - 1,
                    }"
                  >
                    <div
                      class="flex justify-start items-center gap-3"
                      style="width: 50%"
                    >
                      <img
                        :src="item.main_image"
                        :alt="item.title"
                        style="width: 72px; height: 72px"
                      />
                      <span class="text-black text-sm font-normal">{{
                        item.title
                      }}</span>
                    </div>
                    <div class="flex items-center gap-2" style="width: 20%">
                      <span
                        class="line-through text-sm text-font-color font-normal"
                        v-if="item.price != item.price_after_discount"
                        >{{ item.price }} EGP
                      </span>
                      <p class="text-main-color text-sm font-medium">
                        {{ item.price_after_discount }} EGP
                      </p>
                    </div>
                    <div style="width: 20%">
                      <Button
                        label="in Stock"
                        severity="success"
                        variant="text"
                      />
                    </div>
                    <div class="flex items-center gap-6" style="width: 10%">
                      <Button
                        class="bg-second-color text-white border-second-color w-12 h-12 rounded-xl"
                        icon="pi pi-shopping-cart"
                        @click="addToCart(item)"
                      />
                      <i
                        class="pi pi-times-circle text-font-color cursor-pointer"
                        @click="removeFromWishlist(item.id)"
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </DataView>
        </template>
      </Card>
      <NuxtLink to="/products" class="text-second-color text-lg font-semibold"
        >Continue Shopping</NuxtLink
      >
    </div>
  </div>
</template>
<style lang="scss" src="@/assets/scss/cart.scss" scoped></style>
