<script setup lang="ts">
// 👉 Props
const props = defineProps(["user"]);
// 👉 Data
const emailFormActive = ref(true);
const email = ref(props.user.email);
const code = ref();
const errors: any = ref({ code: {}, email: {} });
const $api = useApi();
const auth = useAuthStore();
const isLoading = useLoadingState();
const { $toast }: any = useNuxtApp();
// 👉 Methods
const onEmailFormSubmit = async () => {
  if (!email.value) {
    errors.value = { email: { message: "email is required" } };
    return;
  } else {
    isLoading.value = true;
    try {
      await $api("profile/edit-email", {
        method: "POST",
        body: { email: email.value },
      });
      emailFormActive.value = false;
      await focusOtp();
    } catch (e: any) {
      $toast(e.data.message, "error");
    } finally {
      isLoading.value = false;
    }
  }
};
const onCodeFormSubmit = async () => {
  if (!code.value) {
    errors.value = { code: { message: "code is required" } };
    return;
  } else {
    errors.value = { code: {} };
    isLoading.value = true;
    try {
      await $api("profile/verify-email", {
        method: "POST",
        body: { email: email.value, code: code.value },
      });
      await auth.getProfile();
      emailFormActive.value = true;
    } catch (e: any) {
      $toast(e.data.message, "error");
    } finally {
      isLoading.value = false;
    }
  }
};
const focusOtp = async () => {
  await nextTick();
  const otpInput = document.querySelector<HTMLInputElement>(
    ".otp-container input"
  );
  otpInput?.focus();
};
</script>
<template>
  <Card class="account-card-container xl:w-2/3">
    <template #title>
      <h3>{{ $t("Change email") }}</h3>
    </template>
    <template #content>
      <form
        class="form-container flex flex-col sm:gap-4 gap-2 w-full"
        @submit.prevent="onEmailFormSubmit"
        v-if="emailFormActive"
      >
        <div class="input-container">
          <label>{{ $t("Email Address") }} *</label>
          <InputText
            v-model="email"
            type="text"
            :placeholder="$t('Enter Your email')"
            fluid
            :invalid="errors.email?.message"
            @input="errors.email = {}"
          />
          <small class="text-red-500" v-if="errors?.email?.message">
            {{ $t(errors.email?.message) }}
          </small>
        </div>
        <UiButtonComponent
          class="auth-button"
          :content="$t('Send code')"
          type="submit"
        />
      </form>
      <form
        class="form-container flex flex-col sm:gap-4 gap-2 w-full"
        @submit.prevent="onCodeFormSubmit"
        v-else
      >
        <div class="input-container">
          <label>{{ $t("Enter code") }}</label>
          <InputOtp
            v-model="code"
            size="large"
            integerOnly
            pt:root:class="otp-container"
            :invalid="errors.code?.message"
            @input="errors.code = {}"
          />
          <small class="text-red-500" v-if="errors?.code?.message">
            {{ $t(errors.code?.message) }}
          </small>
        </div>
        <UiButtonComponent
          class="auth-button"
          :content="$t('Verify email')"
          type="submit"
        />
      </form>
    </template>
  </Card>
</template>
<style src="@/assets/scss/components/auth/auth.scss" scoped></style>