<script setup>
const isLoading = useLoadingState();
</script>
<template>
  <div>
    <Toast successIcon="pi pi-check-circle" />
    <NuxtRouteAnnouncer />
    <UiCustomConfirmDialog></UiCustomConfirmDialog>
    <UiLoadingBlock :blocked="isLoading" />
    <NuxtLoadingIndicator
      :height="5"
      color="var(--second-color)"
      errorColor="red"
    />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
