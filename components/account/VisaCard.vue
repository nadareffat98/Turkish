<script setup lang="ts">
// 👉 Props
const props = defineProps(["cardNumber"]);

// 👉 Computed 
const lastDigits = computed(() => props.cardNumber.slice(-3));
</script>
<template>
  <div
    class="relative w-full h-48 rounded-2xl p-5 text-white shadow-lg"
    :style="{ background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' }"
  >
    <img
      src="/public/masterCard.png"
      alt="Mastercard"
      class="absolute top-5 right-5 w-12"
    />

    <div class="absolute bottom-6 left-6 text-lg tracking-widest font-semibold">
      **** _ **** _ **** _ *{{ lastDigits }}
    </div>
  </div>
</template>
