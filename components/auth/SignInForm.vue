<script setup lang="ts">
// 👉 Data
const auth = useAuthStore();
const isLoading = useLoadingState();
const { $signInSchema, $toast }: any = useNuxtApp();
const { defineField, handleSubmit, errors } = useForm({
  validationSchema: $signInSchema,
});
const [email] = defineField("email");
const [password] = defineField("password");
// 👉 Emits
const emit = defineEmits(["changeForm"]);
// 👉 Methods
const onSubmit = handleSubmit(async (values: any) => {
  isLoading.value = true;
  const res = await auth.login({
    ...values,
  });
  if (res.status == "fail") {
    if (res.hasOwnProperty("is_verify") && !res.is_verify)
      emit("changeForm", "verifyEmail", null);
    else $toast(res.message, "error");
  }
  else navigateTo("/account");
  isLoading.value = false;
});
</script>
<template>
  <AuthCardForm>
    <template #header>
      <p class="subtitle-auth">{{ $t("Welcome back!") }}</p>
      <h3 class="title-auth">{{ $t("Sign in to your account") }}</h3>
    </template>
    <template #content>
      <form
        @submit="onSubmit"
        class="flex flex-col sm:gap-4 gap-2 w-full form-container"
      >
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
        <div class="input-container">
          <label>{{ $t("Password") }} *</label>
          <Password
            v-model="password"
            type="text"
            :placeholder="$t('Enter Your password')"
            :feedback="false"
            toggleMask
            fluid
            pt:root:class="password-container"
            aria-describedby="password-help"
            :invalid="errors.password ? true : false"
          />
          <small id="password-help" class="text-red-500" v-if="errors.password">
            {{ $t(errors.password) }}
          </small>
        </div>
        <div class="flex justify-end">
          <Button
            :label="$t('Forget password ?')"
            variant="text"
            class="text-second-color sm:text-sm text-xs font-normal hover:bg-inherit p-0"
            @click="$emit('changeForm', 'forgetPassword', null)"
          />
        </div>
        <UiButtonComponent
          type="submit"
          class="auth-button"
          :content="$t('Sign in')"
        />
      </form>
    </template>
    <template #footer>
      <p class="footer-auth">
        {{ $t("Don’t have an account ?") }}
        <NuxtLink class="text-second-color" to="/auth/sign-up">
          {{ $t("Sign up") }}</NuxtLink
        >
      </p>
    </template>
  </AuthCardForm>
</template>
