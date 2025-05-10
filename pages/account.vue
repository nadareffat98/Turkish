<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});
// 👉 Data
const auth = useAuthStore();
const countries = useGlobalStore().countries;
const user = ref({
  firstName: auth.user.full_name.split(" ")[0],
  lastName: auth.user.full_name.split(" ")[1],
  email: auth.user.email,
  phone_code: auth.user.phone_code,
  phone: auth.user.phone,
  address: "",
});
</script>

<template>
  <div class="grid lg:grid-cols-12 grid-cols-1 gap-16">
    <div class="xl:col-span-3 lg:col-span-4 col-span-12">
      <AccountMenu />
    </div>
    <div class="xl:col-span-9 lg:col-span-8 col-span-12">
      <NuxtPage :user="user" :countries="countries" />
    </div>
  </div>
</template>
<style src="@/assets/scss/account.scss"></style>
<!-- <style lang="scss" scoped>
:deep(.green-btn) {
  width: 180px;
}
@media (max-width: 768px) {
  :deep(.card-row) {
    flex-direction: column;
  }
  :deep(.btn-link) {
    width: 100%;
    .green-btn {
      width: 100%;
    }
  }
  :deep(.edit-btn) {
    flex: 1;
  }
}
</style> -->
