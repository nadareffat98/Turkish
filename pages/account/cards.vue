<script setup lang="ts">
import { useCardStore } from "@/stores/cards";
import VisaCard from "~/components/account/VisaCard.vue";
import CardForm from "~/components/account/CardsForm.vue";
// 👉 Data
const cardStore = useCardStore();
const isLoading = useLoadingState();
const { $toast }: any = useNuxtApp();
const showForm = ref(false);
const formMode = ref<"add" | "edit" | null>(null);
const selectedCard = ref<any>(null);

// 👉 Computed
const cards = computed(() => cardStore.cards);

const getTitle = computed(() => {
  if (formMode.value == "add") {
    return "Add new card";
  } else if (formMode.value == "edit") {
    return "Edit card info";
  }
  return "Saved Cards";
});
// 👉 Methods
const openForm = (mode: "add" | "edit", card?: any) => {
  formMode.value = mode;
  selectedCard.value = card || null;
  showForm.value = true;
};
const handleSubmit = (data: any) => {
  if (formMode.value == "add") {
    addNewCard(data);
  } else if (formMode.value === "edit") {
    updateCard(data);
  }
};
const addNewCard = async (data: any) => {
  isLoading.value = true;
  try {
    await cardStore.addCard(data);
    await cardStore.fetchCards();
    $toast("Card added successfully", "success");
    formMode.value = null;
    showForm.value = false;
  } catch (e: any) {
    $toast(e.data.message, "error");
  } finally {
    isLoading.value = false;
  }
};
const updateCard = async (data: any) => {
  try {
    const payload = { ...data, id: selectedCard.value?.id };
    await cardStore.editCard(payload);
    await cardStore.fetchCards();
    $toast("Card updated successfully", "success");
    formMode.value = null;
    showForm.value = false;
  } catch (e: any) {
    $toast(e.data?.message || "Error updating card", "error");
  }
};

// 👉 Mounted
onMounted(async () => {
  await cardStore.fetchCards();
});
</script>

<template>
  <Card
    class="account-card-container xl:w-2/3"
    pt:subtitle:class="text-sm font-medium text-main-color"
  >
    <template #title>
      <div class="flex justify-between">
        <h3>{{ $t(getTitle) }}</h3>
        <div
          v-if="!showForm"
          @click="openForm('add')"
          class="sm:size-12 size-8 flex justify-center items-center border border-border-color rounded-xl cursor-pointer"
        >
          <i class="pi pi-plus text-main-color"></i>
        </div>
      </div>
    </template>
    <template #subtitle>
      {{ cards.length == 0 ? $t("You don't have any cards") : "" }}
    </template>
    <template #content>
      <Transition name="fade" mode="out-in">
        <div
          key="cards"
          class="grid sm:grid-cols-2 grid-cols-1 sm:gap-6 gap-3"
          v-if="cards.length > 0 && !showForm"
        >
          <div
            v-for="card in cards"
            class="cursor-pointer"
            @click="openForm('edit', card)"
          >
            <VisaCard :card-number="card.card_number" />
          </div>
        </div>
        <div key="form" v-else-if="cards.length == 0 || showForm">
          <CardForm
            :mode="formMode"
            :card="selectedCard"
            @submit="handleSubmit"
          />
        </div>
      </Transition>
    </template>
  </Card>
</template>
<style scoped lang="scss"></style>
