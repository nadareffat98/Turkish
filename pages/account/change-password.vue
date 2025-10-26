<script setup lang="ts">
// 👉 Data
const oldPassword = ref("");
const newPassword = ref("");
const confirmNewPassword = ref("");
const errors: any = ref({
  oldPassword: {},
  newPassword: {},
  confirmNewPassword: {},
});
const $api = useApi();
const auth = useAuthStore();
const isLoading = useLoadingState();
const { $toast }: any = useNuxtApp();

// 👉 Methods
const changePassword = async () => {
  let hasError = false;

  if (!oldPassword.value) {
    errors.value.oldPassword = { message: "old password is required" };
    hasError = true;
  }
  if (!newPassword.value) {
    errors.value.newPassword = { message: "new password is required" };
    hasError = true;
  }
  if (!confirmNewPassword.value) {
    errors.value.confirmNewPassword = {
      message: "confirm new password is required",
    };
    hasError = true;
  }

  if (hasError) return;
  isLoading.value = true;
  try {
    await $api("profile/update-password", {
      method: "POST",
      body: {
        old_password: oldPassword.value,
        password: newPassword.value,
        password_confirmation: confirmNewPassword.value,
      },
    });
    await auth.getProfile();
    $toast("Password changed successfully", "success");
  } catch (e: any) {
    $toast(e.data.message, "error");
  } finally {
    isLoading.value = false;
  }
};
</script>
<template>
  <Card
    class="account-card-container xl:w-2/3"
    pt:subtitle:class="text-sm font-medium text-main-color"
  >
    <template #title>
      <h3>{{ $t("Change password") }}</h3>
    </template>
    <template #content>
      <form
        class="flex flex-col lg:gap-6 gap-4 w-full"
        pt:root:class="form-container"
      >
        <div class="inner-container">
          <label>{{ $t("Old password") }} *</label>
          <Password
            type="text"
            v-model="oldPassword"
            :placeholder="$t('Enter Your password')"
            :feedback="false"
            toggleMask
            fluid
            pt:root:class="password-container"
            :invalid="errors.oldPassword?.message"
            @input="errors.oldPassword = {}"
          />
          <small class="text-red-500" v-if="errors?.oldPassword?.message">
            {{ $t(errors.oldPassword?.message) }}
          </small>
        </div>
        <div class="inner-container">
          <label>{{ $t("New password") }} *</label>
          <Password
            type="text"
            v-model="newPassword"
            :placeholder="$t('Enter Your password')"
            :feedback="false"
            toggleMask
            fluid
            pt:root:class="password-container"
            :invalid="errors.newPassword?.message"
            @input="errors.newPassword = {}"
          />
          <small class="text-red-500" v-if="errors?.newPassword?.message">
            {{ $t(errors.newPassword?.message) }}
          </small>
        </div>
        <div class="inner-container">
          <label>{{ $t("Confirm password") }} *</label>
          <Password
            type="text"
            v-model="confirmNewPassword"
            :placeholder="$t('Confirm password')"
            :feedback="false"
            toggleMask
            fluid
            pt:root:class="password-container"
            :invalid="errors.confirmNewPassword?.message"
            @input="errors.confirmNewPassword = {}"
          />
          <small
            class="text-red-500"
            v-if="errors?.confirmNewPassword?.message"
          >
            {{ $t(errors.confirmNewPassword?.message) }}
          </small>
        </div>
        <UiButtonComponent
          :content="$t('Save changes')"
          class="text-base rounded-xl w-full"
          @click="changePassword"
        />
      </form>
    </template>
  </Card>
</template>
