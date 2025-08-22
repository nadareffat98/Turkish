<template>
  <div class="body-content h-80 my-10">
    <div class="mt-2 grid grid-cols-12 gap-2">
      <Skeleton
        width="100%"
        height="190px"
        class="col-span-4"
        v-for="i in 8"
      ></Skeleton>
    </div>
  </div>
</template>
