<script setup lang="ts">
//👉 Props
const props = defineProps(["card", "mode"]);
// 👉 Emits
const emit = defineEmits(["submit"]);
// 👉 Data
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
const { $cardSchema } = useNuxtApp();
const { defineField, handleSubmit, errors } = useForm({
  validationSchema: $cardSchema,
});

// ✅ define fields
const [card_number] = defineField("card_number");
const [holder_name] = defineField("holder_name");
const [cvc] = defineField("cvc");
const [month] = defineField("month");
const [year] = defineField("year");

//👉 Methods
const onSubmit = handleSubmit((values) => {
  const cleanedCardNumber = values.card_number.replace(/-/g, "");
  const payload = { ...values, card_number: cleanedCardNumber };
  emit("submit", payload);
});
const handleCardNumberInput = (e: any) => {
  let val = e.target.value;
  val = val.replace(/\D/g, "");
  val = val.replace(/(\d{4})(?=\d)/g, "$1-");
  card_number.value = val;
};

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
  const numericOnly = card_number.value.replace(/\D/g, "");
  if (numericOnly.length >= 16 && /[\d]/.test(key)) {
    e.preventDefault();
  }
};

// 👉 Computed
const getButtonName = computed(() => {
  if (props.mode == "add") return "Add card";
  else return "Edit card";
});

// 👉 Mounted
onMounted(() => {
  if (props.mode === "edit" && props.card) {
    card_number.value = props.card.card_number;
    holder_name.value = props.card.holder_name;
    cvc.value = props.card.cvc;
    month.value = props.card.month;
    year.value = props.card.year;
  }
});
</script>
<template>
  <form
    @submit.prevent="onSubmit"
    class="flex flex-col sm:gap-6 gap-4 w-full form-container"
  >
    <!-- Card Number  -->
    <div class="inner-container">
      <label>{{ $t("Card Number") }} *</label>
      <InputText
        :value="card_number"
        @keypress="preventInvalidInput"
        @input="handleCardNumberInput"
        :placeholder="$t('Enter Your card number')"
        aria-describedby="card-number-help"
        :class="{ 'p-invalid': errors.card_number }"
        fluid
      />
      <small
        id="card-number-help"
        class="text-red-500"
        v-if="errors.card_number"
      >
        {{ $t(errors.card_number) }}
      </small>
    </div>
    <!-- Card holder name  -->
    <div class="inner-container">
      <label>{{ $t("Card Holder Name") }} *</label>
      <InputText
        v-model="holder_name"
        :placeholder="$t('Enter Your card holder name')"
        aria-describedby="holder-name-help"
        :class="{ 'p-invalid': errors.holder_name }"
        fluid
      />
      <small
        id="holder-name-help"
        class="text-red-500"
        v-if="errors.holder_name"
      >
        {{ $t(errors.holder_name) }}
      </small>
    </div>
    <!-- Cvv  -->
    <div class="inner-container">
      <label>CVC *</label>
      <InputText
        v-model="cvc"
        :placeholder="$t('Enter Your cvc')"
        aria-describedby="cvc-help"
        :class="{ 'p-invalid': errors.cvc }"
        fluid
      />
      <small id="cvc-help" class="text-red-500" v-if="errors.cvc">
        {{ $t(errors.cvc) }}
      </small>
    </div>
    <!-- Month && Year  -->
    <div class="flex gap-3">
      <div class="inner-container w-full">
        <label>{{ $t("Month") }} *</label>
        <Select
          v-model="month"
          :options="months"
          optionLabel="name"
          option-value="number"
          :placeholder="$t('Select month')"
          aria-describedby="month-help"
          :class="{ 'p-invalid': errors.month, 'w-full': true }"
        />
        <small id="month-help" class="text-red-500" v-if="errors?.month">
          {{ $t(errors.month) }}
        </small>
      </div>
      <div class="inner-container w-full">
        <label>{{ $t("Year") }} *</label>
        <InputText
          v-model="year"
          :placeholder="$t('Enter year')"
          aria-describedby="year-help"
          :class="{ 'p-invalid': errors.year }"
          fluid
        />
        <small id="year-help" class="text-red-500" v-if="errors.year">
          {{ $t(errors.year) }}
        </small>
      </div>
    </div>
    <UiButtonComponent
      type="submit"
      class="auth-button"
      :content="$t(getButtonName)"
    />
  </form>
</template>
