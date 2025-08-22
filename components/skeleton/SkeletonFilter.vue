<!-- FilterSkeleton.vue -->
<template>
  <div class="filter-skeleton space-y-4">
    <!-- Category list -->
    <Skeleton width="50%" height="20px" />
    <div class="space-y-2">
      <Skeleton v-for="i in 5" :key="'cat-' + i" width="100%" height="16px" />
    </div>

    <!-- Price Range  -->
    <Skeleton width="50%" height="20px" />
    <Skeleton width="80%" height="20px" />
    <Skeleton width="100%" height="8px" />

    <!--  Colors -->
    <Skeleton width="50%" height="20px" />
    <div class="grid grid-cols-6 gap-2">
      <Skeleton
        v-for="i in 5"
        :key="'color-' + i"
        width="24px"
        height="24px"
        borderRadius="50%"
      />
    </div>
  </div>
</template>
