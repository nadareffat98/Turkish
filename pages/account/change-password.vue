<script setup lang="ts">
// 👉 Data
const oldPassword = ref("");
const newPassword = ref("");
</script>
<template>
  <Card
    class="account-card-container xl:w-2/3"
    pt:subtitle:class="text-sm font-medium text-main-color"
  >
    <template #title>
      <h3>Change password</h3>
    </template>
    <template #content>
      <form class="flex flex-col gap-6 w-full" pt:root:class="form-container">
        <div class="flex flex-col gap-1">
          <label>Old password*</label>
          <Password
            type="text"
            v-model="oldPassword"
            placeholder="Enter Your password"
            :feedback="false"
            toggleMask
            fluid
            pt:root:class="password-container"
          />
        </div>
        <div class="flex flex-col gap-1">
          <label>New password*</label>
          <Password
            type="text"
            v-model="newPassword"
            placeholder="Enter Your password"
            :feedback="false"
            toggleMask
            fluid
            pt:root:class="password-container"
          />
        </div>
        <div class="flex flex-col gap-1">
          <label>Confirm new password*</label>
          <Password
            type="text"
            v-model="oldPassword"
            placeholder="Confirm Your password"
            :feedback="false"
            toggleMask
            fluid
            pt:root:class="password-container"
          />
        </div>
        <UiButtonComponent
          content="Save changes"
          class="text-base rounded-xl w-full"
        />
      </form>
    </template>
  </Card>
</template>
