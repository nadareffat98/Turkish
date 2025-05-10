<script setup lang="ts">
const props = defineProps(["blocked"]);
</script>
<template>
  <BlockUI :blocked="blocked" fullScreen></BlockUI>
  <ProgressSpinner
    v-show="blocked"
    pt:root:class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/4 h-1/4 z-50"
    pt:circle:class="stroke-main-color"
  />
</template>
