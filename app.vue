<script setup>
const isLoading = useLoadingState();
useHead({
  title: "Turkish Store",
});
</script>
<template>
  <div>
    <NuxtRouteAnnouncer />
    <UiCustomConfirmDialog></UiCustomConfirmDialog>
    <UiLoadingBlock :blocked="isLoading" />
    <NuxtLoadingIndicator
      :height="5"
      color="var(--second-color)"
      errorColor="red"
    />
    <NuxtLayout>
      <Toast successIcon="pi pi-check-circle" />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
