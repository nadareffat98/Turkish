<script setup lang="ts">
//👉 Imports
import { object } from "yup";
import CardsForm from "../account/CardsForm.vue";
//👉 Props
const props = defineProps({ giftCard: Object });
//👉 Data
const defaultAddress: any = ref({});
const $api = useApi();
const globalStore = useGlobalStore();
const isLoading = useLoadingState();
const { $shippingSchema, $toast }: any = useNuxtApp();
const countries = globalStore.countries;
const governrates: any = ref([]);
const isGovernateLoading = ref(false);
const cities: any = ref([]);
const isCityLoading = ref(false);
const isSave = ref(false);
const isAddressSavedOnce = ref(false);
const paymentOptions = ref([
  { id: 1, name: "Cash on delivery", value: "cash", icon: "pi pi-dollar" },
  {
    id: 2,
    name: "Debit / Credit Card",
    value: "card",
    icon: "pi pi-credit-card",
  },
]);
const { t } = useI18n();
//👉 Form Data
const { defineField, handleSubmit, errors } = useForm({
  validationSchema: $shippingSchema,
});
const [firstName] = defineField("first_name");
const [lastName] = defineField("last_name");
const [email] = defineField("email");
const phone_code = ref(countries[0]);
const [phone] = defineField("phone");
const second_phone_code = ref(countries[0]);
const [second_phone] = defineField("second_phone");
const [country_id] = defineField("country_id");
const [governrate_id, governrateMeta] = defineField("governrate_id");
const [city_id, cityMeta] = defineField("city_id");
const [postal_code] = defineField("postal_code");
const [address] = defineField("address");
const [payment_option] = defineField("payment_option");
const [notes] = defineField("notes");
const [card_number] = defineField("card_number");
const [holder_name] = defineField("holder_name");
const [cvc] = defineField("cvc");
const [card_month] = defineField("month");
const [card_year] = defineField("year");

//👉 Methods
const getData = async () => {
  const res: any = await $api("addresses", { ignoreResponseError: true });
  if (res.data) {
    defaultAddress.value = res.data[res.data.length - 1];
    phone.value = defaultAddress.value.phone;
    second_phone.value = defaultAddress.value.second_phone;
    phone_code.value = countries.find(
      (c) => c.phone_code === defaultAddress.value.phone_code
    );
    second_phone_code.value = countries.find(
      (c) => c.phone_code === defaultAddress.value.second_phone_code
    );
    address.value = defaultAddress.value.address;
    country_id.value = defaultAddress.value.country.id;
  }
};
const saveAddress = async () => {
  if (isAddressSavedOnce.value) return;
  if (!isSave.value) return;
  isLoading.value = true;
  try {
    const body = {
      first_name: firstName.value,
      last_name: lastName.value,
      email: email.value,
      phone_code: phone_code.value.phone_code,
      phone: phone.value,
      second_phone_code: second_phone_code.value.phone_code,
      second_phone: second_phone.value,
      country_id: country_id.value,
      governrate_id: governrate_id.value,
      city_id: city_id.value,
      postal_code: postal_code.value,
      address: address.value,
    };
    const res: any = await $api("addresses", {
      method: "POST",
      body,
    });
    isAddressSavedOnce.value = true;
    $toast(t("Address saved successfully"), "success");
  } catch (e: any) {
    isSave.value = false;
    $toast(e?.data.message, "error");
  } finally {
    isLoading.value = false;
  }
};
const onSubmit = handleSubmit(async (values: any) => {
  isLoading.value = true;
  try {
    const res: any = await $api("place-order", {
      method: "POST",
      body: {
        ...values,
        ...props.giftCard,
        phone_code: phone_code.value.phone_code,
        second_phone_code: second_phone_code.value.phone_code,
      },
    });
    $toast(t("Order placed successfully"), "success");
  } catch (e: any) {
    $toast(e?.data.message, "error");
  } finally {
    isLoading.value = false;
  }
});
//👉 Watcher
watch(
  () => country_id.value,
  async (newVal) => {
    governrate_id.value = city_id.value = null;
    governrates.value = cities.value = [];

    if (newVal) {
      isGovernateLoading.value = true;
      try {
        const governratesData = await globalStore.fetchGovernrates(newVal);
        const citiesData = await globalStore.fetchCities(newVal);
        governrates.value = governratesData ?? [];
        cities.value = citiesData ?? [];
        if (defaultAddress.value) {
          governrate_id.value = defaultAddress.value.governrate.id;
          city_id.value = defaultAddress.value.city.id;
        }
      } catch (e: any) {
        $toast(e?.data.message, "error");
      } finally {
        isGovernateLoading.value = false;
      }
    }
  }
);
watch(
  () => governrate_id.value,
  async (newVal) => {
    city_id.value = null;
    cities.value = [];

    if (newVal) {
      isCityLoading.value = true;
      try {
        const citiesData = await globalStore.fetchCities(
          country_id.value,
          newVal
        );
        cities.value = citiesData ?? [];
        if (defaultAddress.value) {
          city_id.value = defaultAddress.value.city.id;
        }
      } catch (e: any) {
        $toast(e?.data.message, "error");
      } finally {
        isCityLoading.value = false;
      }
    }
  }
);
//👉 Expose to parent component
defineExpose({
  onSubmit,
});

//👉 Hooks
onMounted(async () => {
  await getData();
});
</script>
<template>
  <div class="flex flex-col sm:gap-6 gap-4">
    <h3 class="sm:text-4xl text-2xl font-bold text-main-color">
      {{ $t("Shipping info") }}
    </h3>
    <form
      @submit.prevent="onSubmit"
      class="flex flex-col sm:gap-4 gap-2 w-full form-container"
    >
      <!-- first name and last name  -->
      <div class="flex sm:flex-row flex-col gap-3 w-full">
        <div class="input-container flex-1">
          <label>{{ $t("First Name") }} *</label>
          <InputText
            v-model="firstName"
            type="text"
            :placeholder="$t('Enter Your first name')"
            fluid
            aria-describedby="first_name-help"
            :class="{ 'p-invalid': errors.first_name }"
          />
          <small
            id="first_name-help"
            class="text-red-500"
            v-if="errors?.first_name"
          >
            {{ $t(errors.first_name) }}
          </small>
        </div>
        <div class="input-container flex-1">
          <label>{{ $t("Last Name") }} *</label>
          <InputText
            v-model="lastName"
            type="text"
            :placeholder="$t('Enter Your last name')"
            fluid
            aria-describedby="last_name-help"
            :class="{ 'p-invalid': errors.last_name }"
          />
          <small
            id="last_name-help"
            class="text-red-500"
            v-if="errors?.last_name"
          >
            {{ $t(errors.last_name) }}
          </small>
        </div>
      </div>
      <!-- email  -->
      <div class="input-container">
        <label>{{ $t("Email Address") }} *</label>
        <InputText
          v-model="email"
          type="text"
          :placeholder="$t('Enter Your email')"
          fluid
          aria-describedby="email-help"
          :class="{ 'p-invalid': errors.email }"
        />
        <small id="email-help" class="text-red-500" v-if="errors?.email">
          {{ $t(errors.email) }}
        </small>
      </div>
      <!-- phone and additional phone -->
      <div class="flex sm:flex-row flex-col gap-3 w-full">
        <div class="input-container flex-1">
          <label>{{ $t("Phone number") }} *</label>
          <InputGroup>
            <InputGroupAddon
              :class="{ 'p-invalid': errors.phone}"
              class="p-0 border-r-0 rounded-xl border-border-color"
            >
              <Select
                v-model="phone_code"
                :options="countries"
                optionLabel="phone_code"
                class="border-none ltr:pr-0 rtl:pl-0"
                pt:label:class="p-0"
                pt:dropdownicon:class="text-black"
              />
              <Divider
                layout="vertical"
                class="before:border-black ltr:ml-0 rtl:mr-0"
                style="min-height: 50%"
              />
            </InputGroupAddon>
            <InputText
              v-model="phone"
              type="text"
              v-keyfilter.num
              :placeholder="$t('Enter Your phone')"
              class="ltr:border-l-0 rtl:border-r-0 rounded-xl"
              fluid
              aria-describedby="phone-help"
              :class="{ 'p-invalid': errors?.phone }"
            />
          </InputGroup>
          <small
            id="phone-help"
            class="text-red-500"
            v-if="errors?.phone"
            >{{ $t(errors.phone) }}</small
          >
        </div>
        <div class="input-container flex-1">
          <label>{{ $t("Additional Phone") }} *</label>
          <InputGroup>
            <InputGroupAddon
              :class="{
                'p-invalid': errors.second_phone,
              }"
              class="p-0 border-r-0 rounded-xl border-border-color"
            >
              <Select
                v-model="second_phone_code"
                :options="countries"
                optionLabel="phone_code"
                class="border-none ltr:pr-0 rtl:pl-0"
                pt:label:class="p-0"
                pt:dropdownicon:class="text-black"
              />
              <Divider
                layout="vertical"
                class="before:border-black ltr:ml-0 rtl:mr-0"
                style="min-height: 50%"
              />
            </InputGroupAddon>
            <InputText
              v-model="second_phone"
              type="text"
              v-keyfilter.num
              :placeholder="$t('Enter Your phone')"
              class="ltr:border-l-0 rtl:border-r-0 rounded-xl"
              fluid
              aria-describedby="second_phone-help"
              :class="{
                'p-invalid': errors?.second_phone,
              }"
            />
          </InputGroup>
          <small
            id="second_phone-help"
            class="text-red-500"
            v-if="errors?.second_phone"
            >{{ $t(errors.second_phone) }}</small
          >
        </div>
      </div>
      <!-- Country  -->
      <div class="input-container">
        <label>{{ $t("Country") }} *</label>
        <Select
          v-model="country_id"
          :options="countries"
          optionLabel="short_name"
          option-value="id"
          :placeholder="$t('Select Country')"
          aria-describedby="country_id-help"
          :class="{ 'p-invalid': errors.country_id, 'w-full': true }"
        />
        <small
          id="country_id-help"
          class="text-red-500"
          v-if="errors?.country_id"
        >
          {{ $t(errors.country_id) }}
        </small>
      </div>
      <!-- Governrate and Postal code  -->
      <div class="flex sm:flex-row flex-col gap-3 w-full">
        <div class="input-container flex-1">
          <label>{{ $t("Governrate") }} *</label>
          <Select
            v-model="governrate_id"
            :options="governrates"
            optionLabel="id"
            option-value="id"
            :placeholder="$t('Select Governrate')"
            :loading="isGovernateLoading"
            :disabled="!country_id || isGovernateLoading"
            aria-describedby="governrate_id-help"
            :class="{
              'p-invalid': errors?.governrate_id && governrateMeta.touched,
              'w-full': true,
            }"
          />
          <small
            id="governrate_id-help"
            class="text-red-500"
            v-if="errors?.governrate_id && governrateMeta.touched"
          >
            {{ $t(errors.governrate_id) }}
          </small>
        </div>
        <div class="input-container flex-1">
          <label>{{ $t("Postal Code") }} *</label>
          <InputText
            v-model="postal_code"
            type="text"
            :placeholder="$t('Enter Your postal code')"
            fluid
            aria-describedby="postal_code-help"
            :class="{ 'p-invalid': errors.postal_code }"
          />
          <small
            id="postal_code-help"
            class="text-red-500"
            v-if="errors?.postal_code"
          >
            {{ $t(errors.postal_code) }}
          </small>
        </div>
      </div>
      <!-- City  -->
      <div class="input-container flex-1">
        <label>{{ $t("City") }} *</label>
        <Select
          v-model="city_id"
          :options="cities"
          optionLabel="id"
          option-value="id"
          :placeholder="$t('Select City')"
          :loading="isGovernateLoading || isCityLoading"
          :disabled="!country_id || isGovernateLoading || isCityLoading"
          aria-describedby="city_id-help"
          :class="{
            'p-invalid': errors?.city_id && cityMeta.touched,
            'w-full': true,
          }"
        />
        <small
          id="city_id-help"
          class="text-red-500"
          v-if="errors?.city_id && cityMeta.touched"
        >
          {{ $t(errors.city_id) }}
        </small>
      </div>
      <!-- address  -->
      <div class="input-container">
        <label>{{ $t("Address") }} *</label>
        <InputText
          v-model="address"
          type="text"
          :placeholder="$t('Enter Your address')"
          fluid
          aria-describedby="address-help"
          :class="{ 'p-invalid': errors.address }"
        />
        <small id="address-help" class="text-red-500" v-if="errors?.address">
          {{ $t(errors.address) }}
        </small>
      </div>
      <div class="flex justify-start gap-2">
        <Checkbox
          v-model="isSave"
          @change="saveAddress"
          binary
          :disabled="isAddressSavedOnce"
          pt:root:class="checkbox-container"
        />
        <label for="terms-check">{{ $t("Save address") }} </label>
      </div>
      <h3 class="sm:text-4xl text-2xl font-bold text-main-color">
        {{ $t("Payment Option") }}
      </h3>
      <!-- payment options  -->
      <div>
        <div class="flex sm:flex-row flex-col gap-6 w-full">
          <div
            v-for="payment in paymentOptions"
            :key="payment.id"
            class="payment-option"
            :class="{ active: payment_option === payment.value }"
            @click="payment_option = payment.value"
          >
            <i :class="payment.icon"></i>
            <p>{{ $t(payment.name) }}</p>
          </div>
        </div>
        <small v-if="errors.payment_option" class="text-red-500 d-block">
          {{ $t(errors.payment_option) }}
        </small>
      </div>
      <!-- card form inputs if payment method credit -->
      <CardsForm
        v-if="payment_option === 'card'"
        v-model:card_number="card_number"
        v-model:holder_name="holder_name"
        v-model:cvc="cvc"
        v-model:month="card_month"
        v-model:year="card_year"
        :errors="errors"
      />
      <h3 class="sm:text-4xl text-2xl font-bold text-main-color">
        {{ $t("Additional Information") }}
      </h3>
      <div class="input-container">
        <label
          >{{ $t("Order Notes") }}
          <span class="text-[#77878F]">( {{ $t("Optional") }} )</span></label
        >
        <Textarea
          v-model="notes"
          type="text"
          :placeholder="$t('Enter notes')"
          style="resize: none"
          rows="5"
          fluid
        />
      </div>
    </form>
  </div>
</template>
<style scoped src="@/assets/scss/components/auth/auth.scss"></style>
<style scoped lang="scss">
.payment-option {
  @apply border border-[#3D44354D] sm:p-6 p-3 flex-1 flex flex-col items-center justify-center gap-3 rounded cursor-pointer;
  i,
  p {
    color: black;
  }
  i {
    font-size: 40px;
  }
  p {
    font-size: 16px;
    font-weight: 600;
  }
  &.active {
    background: $second-color;
    p,
    i {
      color: white;
    }
  }
}
</style>
