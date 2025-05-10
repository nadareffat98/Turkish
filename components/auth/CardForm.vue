<template>
  <Card
    class="p-10 mx-auto"
    style="width: 580px"
    pt:root:class="shadow-none border-2 border-border-color"
    pt:header:class="flex flex-col items-center gap-2"
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
