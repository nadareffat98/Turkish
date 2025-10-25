<template>
  <div class="mt-2 grid grid-cols-12 sm:gap-6 gap-3">
    <Skeleton
      width="100%"
      class="lg:col-span-4 col-span-6 md:h-[320px] sm:-h-[240px] h-[190px]"
      v-for="i in 8"
    ></Skeleton>
  </div>
</template>
