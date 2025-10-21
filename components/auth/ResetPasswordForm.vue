<script lang="ts" setup>
// 👉 props
const props = defineProps(["payload"]);
// 👉 Emits
const emit = defineEmits(["changeForm"]);
// 👉 Data
const auth = useAuthStore();
const isLoading = useLoadingState();
const { $resetPasswordSchema, $toast }: any = useNuxtApp();
const { defineField, handleSubmit, errors } = useForm({
  validationSchema: $resetPasswordSchema,
});
const [password] = defineField("password");
const [passwordConfirmation] = defineField("password_confirmation");

// 👉 Methods
const onSubmit = handleSubmit(async (values: any) => {
  isLoading.value = true;
  const res = await auth.resetPassword({
    email: props.payload.email,
    code: props.payload.code,
    ...values,
  });
  if (res.status == "fail") {
    $toast(res.message, "error");
  } else {
    $toast(res.message, "success");
    emit("changeForm", "signIn", null);
  }
  isLoading.value = false;
});
</script>
<template>
  <AuthCardForm>
    <template #header>
      <h3 class="title-auth">Reset your password</h3>
    </template>
    <template #content>
      <form
        @submit="onSubmit"
        class="flex flex-col sm:gap-4 gap-2 w-full form-container"
      >
        <div class="flex flex-col gap-1">
          <label>Password</label>
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
        <div class="flex flex-col gap-1">
          <label>Confirm password</label>
          <Password
            type="text"
            v-model="passwordConfirmation"
            placeholder="Confirm your password"
            :feedback="false"
            toggleMask
            fluid
            pt:root:class="password-container"
            aria-describedby="password_confirmation-help"
            :invalid="errors.password_confirmation ? true : false"
          />
          <small id="password_confirmation-help" class="text-red-500">
            {{ errors.password_confirmation }}
          </small>
        </div>
        <UiButtonComponent
          type="submit"
          class="auth-button"
          content="Reset my password"
        />
      </form>
    </template>
    <template #footer>
      <p class="footer-auth">
        Already have an account?
        <Button
          label="Sign in"
          variant="text"
          class="text-second-color sm:text-sm text-xs font-medium hover:bg-inherit p-0"
          @click="$emit('changeForm', 'signIn', null)"
        />
      </p>
    </template>
  </AuthCardForm>
</template>
