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
    errors.value = { email: { message: "email is required." } };
    return;
  } else {
    isLoading.value = true;
    const res = await auth.forgetPassword({
      email: email.value,
    });
    if (res.status == "fail") {
      $toast(res.message, "error");
    } else emailFormActive.value = false;
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
</script>
<template>
  <AuthCardForm>
    <template #header>
      <h3 class="text-4xl font-bold text-main-color">Forget password ?</h3>
      <p class="text-main-color text-center">
        Enter your email to send you a message to recover your password easily.
      </p>
    </template>
    <template #content>
      <form
        class="form-container flex flex-col gap-4 w-full"
        v-if="emailFormActive"
      >
        <div class="flex flex-col gap-1">
          <label>Email Address*</label>
          <InputText
            v-model="email"
            type="text"
            placeholder="Enter Your email"
            fluid
            :invalid="errors.email?.message"
            @input="errors.email = {}"
          />
          <small class="text-red-500" v-if="errors.email">
            {{ errors.email?.message }}
          </small>
        </div>
        <UiButtonComponent
          class="auth-button"
          content="Send code"
          @click.prevent="onEmailFormSubmit"
        />
      </form>
      <form class="form-container flex flex-col gap-4 w-full" v-else>
        <div class="flex flex-col gap-1">
          <label>Enter code</label>
          <InputOtp
            v-model="code"
            size="large"
            integerOnly
            pt:root:class="otp-container"
            :invalid="errors.code?.message"
            @input="errors.code = {}"
          />
          <small class="text-red-500" v-if="errors.code">
            {{ errors.code?.message }}
          </small>
        </div>
        <UiButtonComponent
          class="auth-button"
          content="Reset my password"
          @click.prevent="onCodeFormSubmit"
        />
      </form>
    </template>
    <template #footer>
      <p
        class="text-main-color text-sm font-medium mt-2"
        v-if="emailFormActive"
      >
        Already have an account?
        <Button
          label="Sign in"
          variant="text"
          class="text-second-color text-sm font-medium hover:bg-inherit p-0"
          @click="$emit('changeForm', 'signIn', null)"
        />
      </p>
      <p class="text-main-color text-sm font-medium mt-2" v-else>
        You didn’t receive any code yet ?
        <Button
          label="Resend it"
          variant="text"
          class="text-second-color text-sm font-medium hover:bg-inherit p-0"
          @click.prevent="onEmailFormSubmit"
        />
      </p>
    </template>
  </AuthCardForm>
</template>
