<script setup lang="ts">
// 👉 Props from parent form
const props = defineProps({
  card_number: String,
  holder_name: String,
  cvc: String,
  month: String,
  year: String,
  errors: Object, // this is the errors object from parent
});

// 👉 Emits to update parent v-model
const emit = defineEmits([
  "update:card_number",
  "update:holder_name",
  "update:cvc",
  "update:month",
  "update:year",
]);

const months = [
  { name: "January", number: "01" },
  { name: "February", number: "02" },
  { name: "March", number: "03" },
  { name: "April", number: "04" },
  { name: "May", number: "05" },
  { name: "June", number: "06" },
  { name: "July", number: "07" },
  { name: "August", number: "08" },
  { name: "September", number: "09" },
  { name: "October", number: "10" },
  { name: "November", number: "11" },
  { name: "December", number: "12" },
];

// Formatting card number
const handleCardNumberInput = (e: any) => {
  let val = e.target.value;
  val = val.replace(/\D/g, ""); // keep only digits
  // emit only digits without dash
  emit("update:card_number", val);
};
const formattedCardNumber = computed(() => {
  const val = props.card_number || "";
  return val.replace(/(\d{4})(?=\d)/g, "$1-");
});

const preventInvalidInput = (e: KeyboardEvent) => {
  const key = e.key;
  if (
    !/[\d]/.test(key) &&
    key !== "Backspace" &&
    key !== "ArrowLeft" &&
    key !== "ArrowRight"
  ) {
    e.preventDefault();
    return;
  }
  const numericOnly = (props.card_number || "").replace(/\D/g, "");
  if (numericOnly.length >= 16 && /[\d]/.test(key)) {
    e.preventDefault();
  }
};
</script>

<template>
  <!-- <div class="card-form"> -->
  <!-- Card Number -->
  <div class="input-container">
    <label>{{ $t("Card Number") }} *</label>
    <InputText
      :value="formattedCardNumber"
      @input="handleCardNumberInput"
      @keypress="preventInvalidInput"
      :placeholder="$t('Enter Your card number')"
      :class="{ 'p-invalid': errors?.card_number }"
      fluid
    />
    <small v-if="errors?.card_number" class="text-red-500">{{
      $t(errors.card_number)
    }}</small>
  </div>

  <!-- Card Holder Name -->
  <div class="input-container">
    <label>{{ $t("Card Holder Name") }} *</label>
    <InputText
      :value="holder_name"
      @input="emit('update:holder_name', $event?.target?.value)"
      :placeholder="$t('Enter Your card holder name')"
      :class="{ 'p-invalid': errors?.holder_name }"
      fluid
    />
    <small v-if="errors?.holder_name" class="text-red-500">{{
      $t(errors.holder_name)
    }}</small>
  </div>

  <!-- CVC -->
  <div class="input-container">
    <label>CVC *</label>
    <InputText
      :value="cvc"
      @input="emit('update:cvc', $event.target?.value)"
      :placeholder="$t('Enter Your cvc')"
      :class="{ 'p-invalid': errors?.cvc }"
      fluid
    />
    <small v-if="errors?.cvc" class="text-red-500">{{ $t(errors.cvc) }}</small>
  </div>

  <!-- Month & Year -->
  <div class="flex gap-3">
    <div class="input-container w-full">
      <label>{{ $t("Month") }} *</label>
      <Select
        :value="month"
        @change="emit('update:month', parseInt($event.value))"
        :options="months"
        optionLabel="name"
        option-value="number"
        :placeholder="$t('Select month')"
        :class="{ 'p-invalid': errors?.month, 'w-full': true }"
      />
      <small v-if="errors?.month" class="text-red-500">{{
        $t(errors.month)
      }}</small>
    </div>

    <div class="input-container w-full">
      <label>{{ $t("Year") }} *</label>
      <InputText
        :value="year"
        @input="emit('update:year', parseInt($event.target?.value) || null)"
        :placeholder="$t('Enter year')"
        :class="{ 'p-invalid': errors?.year }"
        fluid
      />
      <small v-if="errors?.year" class="text-red-500">{{
        $t(errors.year)
      }}</small>
    </div>
  </div>
  <!-- </div> -->
</template>

<!-- <style scoped lang="scss">
.inner-container {
  margin-bottom: 1rem;
}
.card-form {
  .p-invalid {
    border-color: red !important;
  }
}
</style> -->
