<script setup>
definePageMeta({
  middleware: "auth",
});
const $api = useApi();
const { $toast } = useNuxtApp();
const isLoading = useLoadingState();
const authStore = useAuthStore();
// 👉 Fetch
const { data: wishlist , execute } = await useAsyncData("wishlist", () =>
  $api("favorites")
);
// 👉 Methods
const removeFromWishlist = async (id) => {
  isLoading.value = true;
  const res = await $api("products/" + id + "/toggle-favorite", {
    method: "POST",
  });
  console.log(res);
  if (res.status == "fail") $toast(res.message, "error");
  else {
    console.log("sbsb");
    execute();
  }
  setTimeout(() => {
    isLoading.value = false;
  }, 1000);
};
</script>
<template>
  <div>
    <div
      class="wishlist-container flex flex-col gap-6"
      v-if="wishlist && wishlist.data.length > 0"
    >
      <Card
        class="cart-products-container"
        pt:root:class="shadow-none border-2 border-border-color rounded-xl"
        pt:body:class="p-0 gap-0"
      >
        <template #title>
          <h3
            class="text-black sm:text-3xl text-xl font-bold sm:px-6 px-3 sm:py-5 py-2"
          >
            {{ $t("Wishlist") }}
          </h3>
        </template>
        <template #content>
          <!-- Header  -->
          <div
            class="data-view-header flex items-center lg:gap-6 sm:gap-3 gap-1 sm:px-6 px-3 py-2"
          >
            <p style="width: 50%">{{ $t("Products") }}</p>
            <p style="width: 20%">{{ $t("Price") }}</p>
            <p style="width: 20%">{{ $t("Status") }}</p>
            <p style="width: 10%"></p>
          </div>
          <DataView
            :value="wishlist.data"
            pt:root:class="overflow-y-scroll max-h-96"
          >
            <template #list="slotProps">
              <div class="flex flex-col sm:p-6 p-3">
                <div v-for="(item, index) in slotProps.items" :key="index">
                  <nuxt-link
                    :to="`/products/${item.id}`"
                    class="flex items-center sm:gap-6 gap-3 py-4"
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
                        class="sm:size-16 size-10 object-cover rounded-lg"
                      />
                      <span class="text-black sm:text-sm text-xs font-normal">{{
                        item.title
                      }}</span>
                    </div>
                    <div class="flex items-center gap-2" style="width: 20%">
                      <span
                        class="line-through sm:text-sm text-xs text-font-color font-normal"
                        v-if="item.price != item.price_after_discount"
                        >{{ item.price }} {{ $t("EGP") }}
                      </span>
                      <p class="text-main-color sm:text-sm text-xs font-medium">
                        {{ item.price_after_discount }} {{ $t("EGP") }}
                      </p>
                    </div>
                    <div style="width: 20%" class="flex">
                      <Button
                        :label="
                          item.quantity > 0
                            ? $t('In stock')
                            : $t('Out of stock')
                        "
                        :severity="item.quantity > 0 ? 'success' : 'danger'"
                        variant="text"
                        class="sm:text-base text-sm"
                      />
                    </div>
                    <div class="flex items-center" style="width: 10%">
                      <i
                        class="pi pi-times-circle text-font-color cursor-pointer"
                        @click.prevent="removeFromWishlist(item.id)"
                      ></i>
                    </div>
                  </nuxt-link>
                </div>
              </div>
            </template>
          </DataView>
        </template>
      </Card>
      <NuxtLink
        to="/products"
        class="text-second-color sm:text-lg text-base font-semibold"
        >{{ $t("Continue Shopping") }}</NuxtLink
      >
    </div>
    <div
      class="empty-wishlist flex flex-col items-center justify-center text-center mx-auto sm:w-w-[430px] w-w-full"
      v-else
    >
      <img src="/public/imgs/heart_broken.png" class="sm:size-24 size-16 sm:mb-6 mb-3" />
      <h3 class="sm:text-3xl text-xl font-bold mb-2">
        {{ $t("Nothing found in Wishlist!") }}
      </h3>
      <span class="text-main-color text-sm font-medium mb-8">{{
        $t(
          "Once you have added items to your Favorites page, it should display your saved products along with their details such as name, price, and image"
        )
      }}</span>
      <UiButtonComponent :content="$t('Go shopping')" as="router-link" to="/" />
    </div>
  </div>
</template>
<style lang="scss" src="@/assets/scss/cart.scss" scoped></style>
