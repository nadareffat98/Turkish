<script setup>
// 👉 Props
const props = defineProps({
  routeType: String,
  products: Array,
});
</script>
<template>
  <div class="product-table">
    <div class="data-view-header flex items-center gap-6 px-6 py-2">
      <p style="width: 35%">Products</p>
      <p style="width: 15%">Price</p>
      <p style="width: 25%">Quantity</p>
      <p style="width: 15%">Sub-Total</p>
    </div>
    <DataView
      :value="products"
      pt:root:class="overflow-y-scroll max-h-96"
      pt:content:class="rounded-xl"
    >
      <template #empty>
        <div
          class="empty-container mx-auto flex flex-col justify-center items-center gap-2 text-center my-6"
          style="width: 60%"
        >
          <p class="text-black text-lg font-bold">Nothing found in your Bag!</p>
          <p class="text-main-color text-sm font-medium">
            Once you have added items to your cart, the page should display the
            contents of your cart, including the products, quantities, and total
            cost.
          </p>
          <UiButtonComponent
            as="router-link"
            to="/products"
            content="Go shopping"
            class="text-base px-6 py-4 mt-5 rounded-xl"
          />
        </div>
      </template>
      <template #list="slotProps">
        <div class="flex flex-col p-6 rounded-xl">
          <div v-for="(item, index) in slotProps.items" :key="index">
            <div
              class="flex items-center gap-6 py-4"
              :class="{
                'border-t border-surface-200': index !== 0,
                'pt-0': index === 0,
                'pb-0': index === slotProps.items.length - 1,
              }"
            >
              <div
                class="flex justify-start items-center gap-3"
                style="width: 35%"
              >
                <i
                  class="pi pi-times-circle text-red-500 cursor-pointer"
                  v-if="routeType === 'cart'"
                  @click="$emit('removeFromCard', item.id)"
                ></i>
                <img
                  :src="item.product.main_image"
                  :alt="item.product.title"
                  style="width: 72px; height: 72px"
                />
                <span class="text-black text-sm font-normal">{{
                  item.product.title
                }}</span>
              </div>
              <div class="flex items-center gap-2" style="width: 15%">
                <!-- <span class="line-through text-sm text-font-color font-normal"
                v-if="item.product.price != item.product.price_after_discount"
                  >{{ item.product.price }} EGP
                </span> -->
                <p class="text-main-color text-sm font-medium">
                  {{ item.product.price }} EGP
                </p>
              </div>
              <div style="width: 25%">
                <p v-if="routeType === 'order-details'">X 1</p>
                <InputNumber
                  v-model="item.quantity"
                  showButtons
                  buttonLayout="horizontal"
                  :min="-1"
                  :max="Number(item.product_color.quantity) ?? 0"
                  fluid
                  class="qty-input"
                  style="width: 150px"
                  v-else
                >
                  <template #incrementbuttonicon>
                    <span
                      class="pi pi-plus"
                      @click="
                        $emit('addToCard', item.product, item.product_color)
                      "
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
                <p class="text-black text-sm font-medium whitespace-nowrap">
                  {{ item.product.price * item.quantity }} EGP
                </p>
              </div>
            </div>
          </div>
        </div>
      </template>
    </DataView>
  </div>
</template>
