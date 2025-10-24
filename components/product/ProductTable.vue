<script setup>
// 👉 Props
const props = defineProps({
  routeType: String,
  products: Array,
});

// 👉 Data
const buttonLayout = ref("vertical");

// 👉 Methods
const handleResize = () => {
  buttonLayout.value = window.innerWidth >= 640 ? "horizontal" : "vertical";
};
// 👉 Mounted
onMounted(() => {
  handleResize(); // أول ما يركب الكومبوننت
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});
</script>
<template>
  <div class="product-table">
    <!-- Header  -->
    <div
      class="data-view-header flex items-center lg:gap-6 sm:gap-3 gap-1 sm:px-6 px-3 py-2"
    >
      <p style="width: 35%">{{ $t("Products") }}</p>
      <p style="width: 15%">{{ $t("Price") }}</p>
      <p style="width: 25%">{{ $t("Quantity") }}</p>
      <p style="width: 15%">{{ $t("Total") }}</p>
    </div>
    <DataView
      :value="products"
      pt:root:class="overflow-y-scroll max-h-96"
      pt:content:class="rounded-xl"
    >
      <template #empty>
        <div
          class="empty-container mx-auto flex flex-col justify-center items-center gap-2 text-center sm:my-6 my-3"
          style="width: 60%"
        >
          <p class="text-black text-lg font-bold">
            {{ $t("Nothing found in your Bag!") }}
          </p>
          <p class="text-main-color text-sm font-medium">
            {{
              $t(
                "Once you have added items to your cart, the page should display the contents of your cart, including the products, quantities, and total cost."
              )
            }}
          </p>
          <UiButtonComponent
            as="router-link"
            to="/products"
            :content="$t('Go shopping')"
            class="text-base sm:px-6 px-3 sm:py-4 py-2 mt-5 rounded-xl"
          />
        </div>
      </template>
      <template #list="slotProps">
        <div class="flex flex-col sm:p-6 p-2 rounded-xl">
          <div v-for="(item, index) in slotProps.items" :key="index">
            <div
              class="flex items-center lg:gap-6 gap-2 sm:py-4 py-2"
              :class="{
                'border-t border-surface-200': index !== 0,
                'pt-0': index === 0,
                'pb-0': index === slotProps.items.length - 1,
              }"
            >
              <div
                class="flex justify-start items-center sm:gap-3 gap-1"
                style="width: 35%"
              >
                <i
                  class="pi pi-times-circle text-red-500 cursor-pointer"
                  v-if="routeType === 'cart'"
                  @click="$emit('removeFromCard', item.product.id)"
                ></i>
                <div
                  class="flex sm:flex-row flex-col justify-start items-center sm:gap-3 gap-1"
                >
                  <img
                    :src="item.product.main_image"
                    :alt="item.product.title"
                    class="lg:size-16 size-10 object-cover rounded-lg"
                  />
                  <span class="text-black sm:text-sm text-xs font-normal">{{
                    item.product.title
                  }}</span>
                </div>
              </div>
              <div class="flex items-center gap-2" style="width: 15%">
                <!-- <span class="line-through text-sm text-font-color font-normal"
                v-if="item.product.price != item.product.price_after_discount"
                  >{{ item.product.price }} EGP
                </span> -->
                <p class="text-main-color sm:text-sm text-xs font-medium">
                  {{ item.product.price }} {{ $t("EGP") }}
                </p>
              </div>
              <div style="width: 25%">
                <p v-if="routeType === 'order-details'">X 1</p>
                <InputNumber
                  v-model="item.quantity"
                  showButtons
                  :buttonLayout="buttonLayout"
                  :min="-1"
                  :max="Number(item.product_color.quantity) ?? 0"
                  fluid
                  class="qty-input qty-table w-full"
                  v-else
                >
                  <template #incrementbuttonicon>
                    <span
                      class="pi pi-plus"
                      @click="$emit('addToCard', item)"
                    />
                  </template>
                  <template #decrementbuttonicon>
                    <span
                      class="pi pi-minus"
                      @click="$emit('minusItem', item.id)"
                    />
                  </template>
                </InputNumber>
              </div>
              <div style="width: 15%">
                <p class="text-black sm:text-sm text-xs font-medium">
                  {{ item.product.price * item.quantity }} {{ $t("EGP") }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </template>
    </DataView>
  </div>
</template>
