<script lang="ts" setup>
// 👉 Data
const emailFormActive = ref(true);
const email = ref("");
const code = ref();
const errors: any = ref({ code: {}, email: {} });
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
    const res = await auth.sendCode({
      email: email.value,
    });
    if (res.status == "fail") {
      $toast(res.message, "error");
    } else {
      emailFormActive.value = false;
      await focusOtp();
    }
    isLoading.value = false;
  }
};
const onCodeFormSubmit = async () => {
  if (!code.value) {
    errors.value = { code: { message: "code is required" } };
    return;
  } else {
    errors.value = { code: {} };
    isLoading.value = true;
    const res = await auth.verifyEmail({
      code: code.value,
      email: email.value,
    });
    if (res.status == "fail") {
      $toast(res.message, "error");
    }
    isLoading.value = false;
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
  <AuthCardForm>
    <template #header>
      <h3 class="title-auth">{{ $t("Verify email") }}</h3>
      <p class="subtitle-auth text-center">
        {{ $t("Enter your email to send you a message to verify your email") }}
      </p>
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
    <template #footer>
      <p class="footer-auth" v-if="emailFormActive">
        {{ $t("Already have an account?") }}
        <Button
          :label="$t('Sign in')"
          variant="text"
          class="text-second-color sm:text-sm text-xs font-medium hover:bg-inherit p-0"
          @click="$emit('changeForm', 'signIn', null)"
        />
      </p>
      <p class="text-main-color sm:text-sm text-xs font-medium mt-2" v-else>
        {{ $t("You didn’t receive any code yet ?") }}
        <Button
          :label="$t('Resend it')"
          variant="text"
          class="text-second-color sm:text-sm text-xs font-medium hover:bg-inherit p-0"
          @click.prevent="onEmailFormSubmit"
        />
      </p>
    </template>
  </AuthCardForm>
</template>
