<template>
  <Card
    class="md:p-10 p-4 mx-auto sm:w-[580px] w-full"
    pt:root:class="shadow-none border-2 border-border-color"
    pt:header:class="flex flex-col items-center gap-2"
    pt:body:class="px-0"
    pt:footer:class="flex justify-center"
  >
    <template #header>
      <slot name="header"></slot>
    </template>
    <template #content>
      <slot name="content"></slot>
    </template>
    <template #footer>
      <slot name="footer"></slot>
    </template>
  </Card>
</template>
