<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});
// 👉 Data
const forms: any = ref({
  signIn: true,
  forgetPassword: false,
  verifyEmail: false,
  resetPassword: false,
});
const data = ref({});
// 👉 Methods
const setActiveForm = (activeFormKey: string, payload?: any) => {
  for (const key in forms.value) {
    forms.value[key] = key === activeFormKey;
  }
  if(payload) data.value = payload;
};
</script>
<template>
  <div class="login-container">
    <AuthSignInForm v-if="forms.signIn" @change-form="setActiveForm" />
    <AuthForgetPasswordForm
      v-else-if="forms.forgetPassword"
      @change-form="setActiveForm"
    />
    <AuthVerifyEmailForm
      v-else-if="forms.verifyEmail"
      @change-form="setActiveForm"
    />
    <AuthResetPasswordForm v-else @change-form="setActiveForm" :payload="data" />
  </div>
</template>
<style lang="scss" src="@/assets/scss/components/auth/auth.scss" scoped />
