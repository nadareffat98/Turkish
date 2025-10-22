<script lang="ts" setup>
// 👉 Emits
const emit = defineEmits(["changeForm"]);
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
    const res = await auth.forgetPassword({
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
    const res = await auth.checkCode({
      code: code.value,
      email: email.value,
    });
    if (res.status == "fail") {
      $toast(res.message, "error");
    } else
      emit("changeForm", "resetPassword", {
        code: code.value,
        email: email.value,
      });
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
      <h3 class="title-auth">{{ $t("Forget password ?") }}</h3>
      <p class="text-center subtitle-auth">
        {{
          $t(
            "Enter your email to send you a message to recover your password easily."
          )
        }}
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
          :content="$t('Reset my password')"
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
      <p class="footer-auth" v-else>
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
