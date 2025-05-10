<script setup>
// 👉 Data
const orderId = ref("");
const isValid = ref(true);

// 👉 Emits
const emit = defineEmits(["goToDetails"]);
// 👉 Methods
const goToDetails = () => {
  if (orderId.value) {
    isValid.value = true;
    emit("goToDetails", orderId.value);
  } else isValid.value = false;
};
</script>
<template>
  <Card
    style="width: 580px"
    class="mx-auto"
    pt:root:class="shadow-none"
    pt:body:class="gap-4"
  >
    <template #title>
      <h3 class="text-main-color text-4xl font-bold">Track order</h3>
    </template>
    <template #subtitle>
      <span class="text-main-color text-base font-medium">
        To track your order please enter your order ID in the input field below
        and press the “Track Order” button. this was given to you on your
        receipt and in the confirmation email you should have received.
      </span>
    </template>
    <template #content>
      <div class="flex flex-col gap-2">
        <label class="text-black text-sm font-medium">Order ID*</label>
        <InputText
          v-model="orderId"
          :invalid="!isValid"
          type="text"
          placeholder="Please enter order ID"
          fluid
        />
        <Message
          size="small"
          variant="simple"
          class="text-font-color text-xs font-medium"
          icon="pi pi-info-circle"
        >
          Order ID that we sent to your in your email address.</Message
        >
      </div>
    </template>
    <template #footer>
      <UiButtonComponent
        content="Track Order"
        class="text-lg font-semibold py-3 w-full mt-2"
        @click="goToDetails"
      />
    </template>
  </Card>
</template>
