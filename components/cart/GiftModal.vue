<script setup lang="ts">
// 👉 Data
const isGift = ref(0);
const from = ref("");
const to = ref("");
const message = ref(null);
// 👉 Emits
const emit = defineEmits([
  "update:isGift",
  "update:from",
  "update:to",
  "update:message",
]);
</script>
<template>
  <div class="w-full">
    <Card
      class="cart-checkout-container"
      pt:root:class="shadow-none border-2 border-border-color rounded-xl"
      pt:body:class="sm:py-6 sm:px-4 py-3 px-2 gap-0"
    >
      <template #content>
        <div class="flex justify-start gap-2">
          <Checkbox
            v-model="isGift"
            :trueValue="1"
            :falseValue="0"
            @change="emit('update:isGift', isGift)"
            binary
            id="terms-check"
            pt:root:class="checkbox-container"
          />
          <label for="terms-check">{{ $t("Is it a gift ?") }} </label>
        </div>
        <Transition name="fade-slide">
          <div
            class="form-container flex flex-col gap-4 w-full mt-4"
            v-if="isGift"
          >
            <div class="input-container">
              <label>{{ $t("From") }}</label>
              <InputText
                v-model="from"
                @input="emit('update:from', from)"
                type="text"
                :placeholder="$t('Enter Your name')"
                fluid
              />
            </div>
            <div class="input-container">
              <label>{{ $t("To") }}</label>
              <InputText
                v-model="to"
                @input="emit('update:to', to)"
                type="text"
                :placeholder="$t('Enter Your name')"
                fluid
              />
            </div>
            <div class="input-container">
              <label>{{ $t("Message") }}</label>
              <Textarea
                v-model="message"
                @input="emit('update:message', message)"
                type="text"
                :placeholder="$t('Enter Subject')"
                style="resize: none"
                rows="5"
                fluid
              />
            </div>
          </div>
        </Transition>
      </template>
    </Card>
  </div>
</template>
<style scoped src="@/assets/scss/components/auth/auth.scss"></style>
<style scoped lang="scss">
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-slide-enter-active {
  transition: all 0.25s ease;
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-slide-leave-active {
  transition: all 0.2s ease;
}
</style>
