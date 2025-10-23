<script lang="ts" setup>
const route = useRoute();
const bodyClass = ref();
watch(
  () => route.path,
  (newPath) => {
    if (newPath == "/") bodyClass.value = "lg:pb-20 pb-16";
    else bodyClass.value = "body-content lg:py-20 sm:py-10 py-6";
  },
  { immediate: true }
);
</script>
<template>
  <div class="flex flex-col min-h-screen">
    <LayoutHeader />
    <div class="grow" :class="bodyClass">
      <slot></slot>
    </div>
    <LayoutFooter />
  </div>
</template>
