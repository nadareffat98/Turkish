<script setup>
// 👉 props
const props = defineProps(["totalPrice","isCart"]);

// 👉 emits
const emit = defineEmits(["applyCoupon", "checkout"]);

// 👉 Data
const coupon = ref(null);
const { $toast } = useNuxtApp();
const { locale, t } = useI18n();

// 👉 Methods
const applyCoupon = () => {
  if (!coupon.value) return $toast(t("you should enter a coupon"), "error");
  else {
    emit("applyCoupon", coupon.value);
  }
};
</script>
<template>
  <div class="w-full">
    <Card
      class="cart-checkout-container"
      pt:root:class="shadow-none border-2 border-border-color rounded-xl"
      pt:body:class="p-0 gap-0"
    >
      <template #title>
        <p
          class="text-black lg:text-lg sm:text-base text-sm font-medium px-4 lg:py-5 py-3"
        >
          {{ $t("Bag Totals") }}
        </p>
      </template>
      <template #content>
        <div class="flex flex-col gap-3 px-4">
          <div class="flex justify-between">
            <p class="text-main-color text-sm text-medium">
              {{ $t("Sub total") }}
            </p>
            <span class="text-sm font-semibold text-black"
              >{{ totalPrice.sub_total }}
              <b class="font-bold"> {{ $t("EGP") }}</b></span
            >
          </div>
          <div class="flex justify-between">
            <p class="text-main-color text-sm text-medium">
              {{ $t("Shipping") }}
            </p>
            <span class="text-sm font-semibold text-black"
              >{{ totalPrice.shipping }} {{ $t("EGP") }}</span
            >
          </div>
          <div class="flex justify-between">
            <p class="text-main-color text-sm text-medium">
              {{ $t("Coupon") }}{{ coupon ? ": " + coupon : "" }}
            </p>
            <span class="text-sm font-semibold text-black"
              >{{ totalPrice.coupon ? "-" + totalPrice.coupon : 0
              }}{{ $t("EGP") }}</span
            >
          </div>
          <div class="flex justify-between">
            <p class="text-main-color text-sm text-medium">
              {{ $t("Tax") }} {{ totalPrice.vat_percentage }}%
            </p>
            <span class="text-sm font-semibold text-black"
              >{{ totalPrice.vat_price
              }}<b class="font-bold"> {{ $t("EGP") }}</b></span
            >
          </div>
        </div>
        <Divider />
        <div class="flex justify-between pb-6 px-4">
          <p class="text-black text-base font-medium">{{ $t("Total") }}</p>
          <span class="text-black text-base font-semibold"
            >{{ totalPrice.total
            }}<b class="font-bold"> {{ $t("EGP") }} </b></span
          >
        </div>
      </template>
    </Card>
    <div class="relative mt-4" v-if="isCart">
      <InputText :placeholder="$t('Coupon')" fluid v-model="coupon" />
      <UiButtonComponent
        :content="$t('Apply')"
        @click="applyCoupon"
        class="rounded-xl absolute ltr:right-0 rtl:left-0 h-full px-6"
        style="margin-top:0 !important"
      />
    </div>
    <UiButtonComponent
      :label="isCart ? $t('Proceed to Checkout') : $t('Place order')"
      :icon="locale === 'ar' ? 'pi pi-arrow-left' : 'pi pi-arrow-right'"
      class="text-base sm:py-3 py-2 w-full rounded-xl mt-4 gap-3 ltr:flex-row-reverse"
      @click="$emit('checkout')"
    />
  </div>
</template>
