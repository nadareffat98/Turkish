<script setup>
const props = defineProps({
    content: String
})
</script>
<template>
    <Button class="bg-second-color text-white border-second-color font-semibold "  :label="content"/>
</template>