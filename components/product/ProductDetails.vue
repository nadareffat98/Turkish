<script setup>
import { set } from "@vueuse/core";

// 👉 Props
const props = defineProps(["product"]);
// 👉 Emits
const emit = defineEmits(["refreshProduct"]);
// 👉 Data
const authStore = useAuthStore();
const guestToken = await getGuestToken();
const isLoading = useLoadingState();
const { $api, $toast } = useNuxtApp();
const qty = ref(1);
const selectedSize = ref("");
const selectedColor = ref(
  props.product.colors.length > 0 ? props.product.colors[0].name : null
);
const sizes = ref([
  { name: "M" },
  { name: "L" },
  { name: "XL" },
  { name: "XXL" },
]);
// 👉 Methods
const addToCart = async () => {
  isLoading.value = true;
  const res = await $api("cart", {
    method: "POST",
    body: {
      product_id: props.product.id,
      quantity: qty.value,
      colored_id: selectedColor.value?.id ?? null,
    },
  });
  isLoading.value = false;
  if (res.status == "fail") $toast(res.message, "error");
  else $toast("the item added to your cart successfully", "success");
};
const addOrRemoveWishlist = async () => {
  isLoading.value = true;
  const res = await $api("products/" + props.product.id + "/toggle-favorite", {
    method: "POST",
  });
  if (res.status == "fail") $toast(res.message, "error");
  else {
    emit("refreshProduct");
  }
  setTimeout(() => {
    isLoading.value = false;
  }, 1000);
};
</script>
<template>
  <div class="product-details flex gap-14 pb-20">
    <div class="product-image flex flex-col" style="width: 545px">
      <UiSwiperThumbs :images="product.other_images" />
    </div>
    <div class="product-info flex-1 flex flex-col gap-2 ml-5">
      <div class="rating flex gap-1.5">
        <Rating
          v-model="product.avg_rate"
          :readonly="true"
          pt:onicon:style="color:#FBBC05"
          pt:officon:style="color:#FBBC05"
        />
        <p class="text-sm font-semibold">{{ product.avg_rate }} Star Rating</p>
        <!-- <span class="text-font-color text-sm font-normal"
          >(21,671 User feedback)</span
        > -->
      </div>
      <p class="font-medium text-xl">
        {{ product.title }}
      </p>
      <div class="grid grid-cols-2 gap-2 mt-3">
        <p class="text-font-color text-sm font-normal">
          Sku: <span class="text-black font-semibold">{{ product.id }}</span>
        </p>
        <p class="text-font-color text-sm font-normal">
          Availability:
          <span class="text-green-600 font-semibold">In Stock</span>
        </p>
        <p class="text-font-color text-sm font-normal">
          Brand:
          <span class="text-black font-semibold">{{
            product.brand.title
          }}</span>
        </p>
        <p class="text-font-color text-sm font-normal">
          Category:
          <span class="text-black font-semibold">{{
            product.category.title
          }}</span>
        </p>
      </div>
      <div class="price flex gap-4 mt-3">
        <p class="text-2xl font-semibold text-main-color">
          {{ product.price }} EGP
        </p>
        <p
          class="text-font-color text-lg font-normal line-through"
          v-if="product.price != product.price_after_discount"
        >
          {{ product.price_after_discount }} EGP
        </p>
        <Tag
          pt:root:class="bg-[#FBBC05] text-white text-sm font-semibold py-1.5 px-3"
          v-if="product.price != product.price_after_discount"
          >21% OFF</Tag
        >
      </div>
      <Divider />
      <div class="flex gap-5 mt-1">
        <div
          class="flex-1 flex flex-col gap-2"
          v-if="product.colors.length > 0"
        >
          <label class="text-sm font-normal">Color</label>
          <div class="flex flex-wrap items-center gap-4">
            <RadioButton
              v-for="color in product.colors"
              :key="color.name"
              v-model="selectedColor"
              name="dynamic"
              :value="color.name"
              pt:root:class="border-2 rounded-full flex justify-center items-center border-transparent w-9 h-9	color-circle"
              pt:box:class="border-transparent w-full h-full"
              pt:icon:class="invisible"
              :pt:box:style="{ backgroundColor: color.name }"
            />
          </div>
        </div>
        <div class="flex-1 flex flex-col gap-2">
          <label class="text-sm font-normal">Size</label>
          <Select
            v-model="selectedSize"
            :options="sizes"
            optionLabel="name"
            placeholder="Select..."
            class="w-full"
          />
        </div>
      </div>
      <div class="flex gap-3 mt-3">
        <InputNumber
          v-model="qty"
          showButtons
          buttonLayout="horizontal"
          :min="1"
          :max="100"
          fluid
          style="width: 160px"
          class="qty-input"
        >
          <template #incrementbuttonicon>
            <span class="pi pi-plus" />
          </template>
          <template #decrementbuttonicon>
            <span class="pi pi-minus" />
          </template>
        </InputNumber>
        <UiButtonComponent
          content="Add to Bag"
          icon="pi pi-shopping-bag"
          iconPos="right"
          class="flex-1 py-4 rounded-xl"
          @click="addToCart"
        />
      </div>
      <div class="flex justify-between mt-3">
        <div
          class="flex gap-1 cursor-pointer"
          v-if="authStore.isAuth"
          @click="addOrRemoveWishlist"
        >
          <i
            class="pi pi-heart-fill text-main-color"
            v-if="product.is_favorite"
          ></i>
          <i class="pi pi-heart text-main-color" v-else></i>
          <p class="text-main-color text-sm font-medium">Add to Wishlist</p>
        </div>
      </div>
    </div>
  </div>
</template>
