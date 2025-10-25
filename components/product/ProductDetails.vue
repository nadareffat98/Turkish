<script setup>
// 👉 Props
const props = defineProps(["product"]);
// 👉 Emits
const emit = defineEmits(["refreshProduct"]);
// 👉 Data
const authStore = useAuthStore();
const isLoading = useLoadingState();
const $api = useApi();
const { $toast } = useNuxtApp();
const { t } = useI18n();
const selectedColor = ref(
  props.product.colors.length > 0 ? props.product.colors[0] : null
);
const qty = ref(1);
// 👉 Methods
const addToCart = async () => {
  isLoading.value = true;
  const res = await $api("cart", {
    method: "POST",
    body: {
      product_id: props.product.id,
      quantity: qty.value,
      color_id: selectedColor.value?.color.id ?? null,
    },
  });
  isLoading.value = false;
  if (res.status == "fail") $toast(res.message, "error");
  else $toast(t("the item added successfully"), "success");
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
const copyProductLink = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    $toast(t("Copied successfully"), "success");
  } catch (err) {
    console.error("Failed to copy: ", err);
    $toast(t("Failed to copy link"), "error");
  }
};
const handleSubmit = () => {
  if (isAvalaible.value) addToCart();
  else addOrRemoveWishlist();
};
// 👉 Computed
const numberOfRatings = computed(() => {
  return (
    props.product.five_stars +
    props.product.four_stars +
    props.product.three_stars +
    props.product.two_stars +
    props.product.one_star
  );
});
const maxQty = computed(() => {
  return Number(selectedColor.value?.quantity) || 0;
});
const isAvalaible = computed(() => {
  return (Number(selectedColor.value?.quantity) || 0) > 0;
});
const getButtonContent = computed(() => {
  return isAvalaible.value ? "Add to cart" : "Notify me";
});
const getButtonIcon = computed(() => {
  return isAvalaible.value ? "pi pi-shopping-bag" : "pi pi-bell";
});
</script>
<template>
  <div
    class="product-details flex lg:flex-row flex-col lg:gap-16 sm:gap-10 gap-5 lg:pb-20 sm:pb-10 pb-6"
  >
    <div class="product-image flex flex-col lg:w-2/4 w-full">
      <UiSwiperThumbs :images="product.other_images" />
    </div>
    <div class="product-info flex flex-col gap-2 lg:w-2/4 w-full">
      <!-- Rating  -->
      <div class="rating flex gap-1.5">
        <Rating
          v-model="product.avg_rate"
          :readonly="true"
          pt:onicon:style="color:#FBBC05"
          pt:officon:style="color:#FBBC05"
        />
        <p class="sm:text-sm text-xs font-semibold">
          {{ product.avg_rate }} {{ $t("Star Rating") }}
        </p>
        <span
          class="text-font-color text-sm font-normal"
          v-if="numberOfRatings > 0"
          >( {{ numberOfRatings }} {{ $t("User feedback") }} )</span
        >
      </div>
      <p class="font-medium text-xl">
        {{ product.title }}
      </p>
      <!-- product info  -->
      <div class="grid sm:grid-cols-2 grid-cols-1 gap-2 sm:mt-3 mt-1">
        <p class="text-font-color text-sm font-normal">
          {{ $t("Sku") }} :
          <span class="text-black font-semibold">{{ product.id }}</span>
        </p>
        <p class="text-font-color text-sm font-normal">
          {{ $t("Availability") }} :
          <span
            :class="[
              'font-semibold',
              isAvalaible ? 'text-[#2DB224]' : 'text-[#E53835]',
            ]"
            >{{ isAvalaible ? "In Stock" : "Out of Stock" }}</span
          >
        </p>
        <p class="text-font-color text-sm font-normal">
          {{ $t("Brand") }} :
          <span class="text-black font-semibold">{{
            product.brand.title
          }}</span>
        </p>
        <p class="text-font-color text-sm font-normal" v-if="product.category">
          {{ $t("Category") }} :
          <span class="text-black font-semibold">{{
            product.category.title
          }}</span>
        </p>
      </div>
      <!-- product price -->
      <div class="price flex gap-4 sm:mt-3 mt-1">
        <p class="sm:text-2xl text-lg font-semibold text-main-color">
          {{ product.price_after_discount }} {{ $t("EGP") }}
        </p>
        <p
          class="text-font-color text-lg font-normal line-through"
          v-if="product.price != product.price_after_discount"
        >
          {{ product.price }} {{ $t("EGP") }}
        </p>
        <Tag
          pt:root:class="bg-[#FBBC05] text-white text-sm font-semibold py-1.5 px-3"
          v-if="product.price != product.price_after_discount"
          >{{
            Math.round(
              ((product.price - product.price_after_discount) / product.price) *
                100
            )
          }}
          % {{ $t("OFF") }}</Tag
        >
      </div>
      <Divider class="sm:!my-4 !my-2" />
      <!-- product color  -->
      <div class="flex gap-5 mt-1">
        <div
          class="flex-1 flex flex-col gap-2"
          v-if="product.colors.length > 0"
        >
          <label class="text-sm font-normal">{{ $t("Color") }}</label>
          <div class="flex flex-wrap items-center sm:gap-4 gap-2">
            <RadioButton
              v-for="color in product.colors.filter((c) => c?.color?.id)"
              :key="color.color.id"
              v-model="selectedColor"
              name="dynamic"
              :value="color"
              @change="updateColorQuery"
              pt:root:class="border-2 rounded-full flex justify-center items-center border-transparent sm:size-9 size-7	color-circle"
              pt:box:class="border-transparent w-full h-full"
              pt:icon:class="invisible"
              :pt:box:style="{ backgroundColor: `#${color.color.hexadecimal}` }"
            />
          </div>
        </div>
        <!-- <div class="flex-1 flex flex-col gap-2">
          <label class="text-sm font-normal">Size</label>
          <Select
            v-model="selectedSize"
            :options="sizes"
            optionLabel="name"
            placeholder="Select..."
            class="w-full"
          />
        </div> -->
      </div>
      <div class="flex sm:flex-row flex-col gap-3 sm:mt-3 mt-1">
        <InputNumber
          v-model="qty"
          showButtons
          buttonLayout="horizontal"
          :min="1"
          :max="maxQty"
          fluid
          class="qty-input sm:max-w-40 max-w-full"
        >
          <template #incrementbuttonicon>
            <span class="pi pi-plus" />
          </template>
          <template #decrementbuttonicon>
            <span class="pi pi-minus" />
          </template>
        </InputNumber>
        <UiButtonComponent
          :content="$t(getButtonContent)"
          :icon="getButtonIcon"
          iconPos="right"
          class="w-full sm:py-4 py-2 rounded-xl"
          @click="handleSubmit"
        />
      </div>
      <div class="flex justify-between sm:mt-3 mt-1">
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
          <p class="text-main-color text-sm font-medium">
            {{ $t("Add to wishlist") }}
          </p>
        </div>
        <div class="flex gap-1 cursor-pointer" @click="copyProductLink">
          <i class="pi pi-clone text-main-color"></i>
          <p class="text-main-color text-sm font-medium">
            {{ $t("Share product") }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
