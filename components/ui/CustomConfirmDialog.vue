<script setup lang="ts"></script>

<template>
  <ConfirmDialog>
    <template #container="{ message, acceptCallback, rejectCallback }">
      <div
        class="dialog-header flex flex-col items-center justify-center gap-8"
      >
        <font-awesome
          v-if="message.icon"
          :icon="message.icon"
          class="text-green-500 text-5xl"
        />
        <h3 class="text-3xl font-bold text-main-color" v-if="message?.header">
          {{ $t(message.header) }}
        </h3>
      </div>
      <p
        class="dialog-message font-medium text-base text-main-color text-center"
        v-if="message?.message"
      >
        {{ $t(message.message) }}
      </p>
      <div class="dialog-footer flex items-center justify-center gap-3">
        <Button
          v-if="message?.acceptLabel"
          :label="$t(message.acceptLabel)"
          @click="acceptCallback"
          outlined
          :class="message.acceptProps.class + ' ' + message.acceptClass"
        />
        <Button
          v-if="message?.rejectLabel"
          :label="$t(message.rejectLabel)"
          @click="rejectCallback"
          :class="message.rejectProps.class + ' ' + message.rejectClass"
        />
      </div>
    </template>
  </ConfirmDialog>
</template>
