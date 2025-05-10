<script lang="ts" setup>
const route = useRoute();
const bodyClass = ref();
watch(
  () => route.path,
  (newPath) => {
    if (newPath == "/") bodyClass.value = "pb-20";
    else bodyClass.value = "body-content py-20";
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
