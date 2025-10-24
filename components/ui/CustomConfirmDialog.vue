<script setup lang="ts"></script>

<template>
  <ConfirmDialog>
    <template #container="{ message, acceptCallback, rejectCallback }">
      <div
        class="dialog-header flex flex-col items-center justify-center sm:gap-8 gap-4"
      >
        <font-awesome
          v-if="message.icon"
          :icon="message.icon"
          class="text-green-500 lg:text-5xl text-4xl"
        />
        <h3 class="sm:text-3xl text-2xl font-bold text-main-color text-center" v-if="message?.header">
          {{ $t(message.header) }}
        </h3>
      </div>
      <p
        class="dialog-message font-medium sm:text-base text-sm text-main-color text-center"
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
