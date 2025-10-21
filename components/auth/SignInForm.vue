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
  isLoading.value = false;
});
</script>
<template>
  <AuthCardForm>
    <template #header>
      <p class="subtitle-auth">Welcome back!</p>
      <h3 class="title-auth">
        Sign in to your account
      </h3>
    </template>
    <template #content>
      <form
        @submit="onSubmit"
        class="flex flex-col sm:gap-4 gap-2 w-full form-container"
      >
        <div class="flex flex-col gap-1">
          <label>Email Address*</label>
          <InputText
            v-model="email"
            type="text"
            placeholder="Enter Your email"
            fluid
            aria-describedby="email-help"
            :class="{ 'p-invalid': errors.email }"
          />
          <small id="email-help" class="text-red-500">
            {{ errors.email }}
          </small>
        </div>
        <div class="flex flex-col gap-1">
          <label>Password*</label>
          <Password
            v-model="password"
            type="text"
            placeholder="Enter Your password"
            :feedback="false"
            toggleMask
            fluid
            pt:root:class="password-container"
            aria-describedby="password-help"
            :invalid="errors.password ? true : false"
          />
          <small id="password-help" class="text-red-500">
            {{ errors.password }}
          </small>
        </div>
        <div class="flex justify-end">
          <Button
            label="Forget password ?"
            variant="text"
            class="text-second-color sm:text-sm text-xs font-normal hover:bg-inherit p-0"
            @click="$emit('changeForm', 'forgetPassword', null)"
          />
        </div>
        <UiButtonComponent
          type="submit"
          class="auth-button"
          content="Sign in"
        />
      </form>
    </template>
    <template #footer>
      <p class="footer-auth">
        Don’t have an account ?
        <NuxtLink class="text-second-color" to="/auth/sign-up">
          Sign up</NuxtLink
        >
      </p>
    </template>
  </AuthCardForm>
</template>
