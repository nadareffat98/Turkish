<script setup>
// 👉 Props
const props = defineProps({
  label: String,
  accept: String,
  error: String,
  fileDesc: String,
  type: String,
  model: String,
});
const emit = defineEmits(["update"]);
// 👉 Data
const $api = useApi(); 
const config = useRuntimeConfig();
const file = ref(null);
const isLoading = ref(false);
const isDragging = ref(false);

//👉 Methods
const handleDrop = async (event) => {
  isLoading.value = true;
  file.value = event.dataTransfer.files[0];
  uploadFile(event.dataTransfer.files[0]);
  isDragging.value = false;
};

const handleFileChange = (event) => {
  isLoading.value = true;
  file.value = event.target.files[0];
  uploadFile(event.target.files[0]);
};
const resetFile = () => {
  file.value = null;
  isLoading.value = false;
  emit("update", null);
};
const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("attachment_type", props.type);
  formData.append("model", props.model);
  const res = await $api("attachments", {
    baseURL: `${config.public.baseURL}/api/general/`,
    method: "POST",
    body: formData,
    ignoreResponseError: true,
  });
  if (res.status == "fail") $toast(res.message, "error");
  else {
    isLoading.value = false;
    emit("update", res.data);
  }
};
</script>
<template>
  <div class="inner-container">
    <label v-if="label">{{ label }}</label>
    <div
      @drop.prevent="handleDrop"
      @dragover.prevent="isDragging = true"
      @dragleave="isDragging = false"
      :class="[
        'flex flex-col items-center justify-center gap-3 w-full border-2 border-dashed rounded-xl cursor-pointer text-center transition-all p-6',
        error ? 'border-red-500 text-red-500' : 'border-border-color',
        isDragging ? 'bg-gray-100' : '',
      ]"
      @click="$refs.fileInput.click()"
    >
      <i class="pi pi-file-arrow-up text-main-color text-2xl"></i>
      <div class="flex gap-2">
        <p class="font-medium text-base underline text-second-color">
          Click to upload
        </p>
        <span class="text-main-color"> or drag and drop</span>
      </div>
      <small class="font-medium text-xs text-font-color">{{ fileDesc }}</small>
    </div>
    <small class="text-red-500">
      {{ error }}
    </small>
    <input
      ref="fileInput"
      type="file"
      :accept="accept"
      class="hidden"
      @change="handleFileChange"
    />
  </div>
  <div
    v-if="isLoading || file"
    :class="[
      'w-full p-4 flex justify-between items-center gap-4 rounded',
      isLoading ? 'bg-gray-50' : 'bg-[#2E7D311A]',
    ]"
  >
    <i
      :class="[
        'pi pi-file-arrow-up text-2xl',
        isLoading ? 'text-main-color' : 'text-green-700',
      ]"
    ></i>
    <div class="flex-1 inner-container">
      <p class="text-main-color text-sm font-medium">{{ file.name }}</p>
      <small class="text-font-color text-sm font-medium">
        {{ (file.size / 1024).toFixed(1) }}kb •
        <span v-if="isLoading">Loading...</span>
        <span v-else>Completed</span>
      </small>
    </div>
    <div class="flex items-center gap-4">
      <font-awesome
        icon="fa-solid fa-trash"
        class="cursor-pointer text-font-color text-base"
        @click="resetFile"
      />
      <ProgressSpinner
        pt:root:class="w-6 h-6"
        pt:circle:class="stroke-green-600"
        v-if="isLoading"
      />
      <font-awesome
        icon="fa-solid fa-circle-check"
        class="text-green-700 text-2xl"
        v-else
      ></font-awesome>
    </div>
  </div>
</template>
