<script setup>
const error = useError();
</script>
<template>
  <div class="bg-main-color h-screen flex items-center justify-center">
    <!-- <div class="relative mx-auto text-[#ffffff1a] text-[400px] text-center">
      404 -->
    <div class="flex flex-col gap-3 text-center mx-auto" style="width: 400px">
      <h2 class="text-white font-bold text-5xl">{{ error?.statusCode }}</h2>
      <pre class="text-white">{{ error?.url }}</pre>
      <p class="text-white font-medium text-base mx-auto">
       {{ error?.message }}
      </p>
      <UiButtonComponent
        as="router-link"
        to="/"
        content="Back to home"
        class="mx-auto text-lg px-5 py-3 rounded-lg"
      />
    </div>
    <!-- </div> -->
  </div>
</template>
