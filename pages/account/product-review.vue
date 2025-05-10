<script setup lang="ts">
// 👉 Props
const props = defineProps(["user", "countries"]);
</script>
<template>
  <Card
    class="account-card-container xl:w-2/3"
    pt:subtitle:class="text-sm font-medium text-main-color"
  >
    <template #title>
      <h3>Product review</h3>
    </template>
  </Card>
</template>
