export const useCardStore = defineStore("cards", () => {
  const $api = useApi();
  
  // 👉 State
  const cards = ref<any[]>([]);
  const selectedCard = null as any | null;

  // 👉 Actions
  // get all card
  async function fetchCards() {
    try {
      const response: any = await $api("card");
      console.log(response);
      cards.value = response.data;
    } catch (error) {
      console.error(error);
    }
  }

  // add card
  async function addCard(data: any) {
    try {
      const response: any = await $api("card", {
        method: "POST",
        body: data,
      });
      return response;
    } catch (error) {
      throw error;
    }
  }
  // get Card by id
  async function getCard(id: any) {
    try {
      const response: any = await $api("card/" + id);
      return response;
    } catch (error) {
      throw error;
    }
  }
  // Edit card
  async function editCard(data: any) {
    try {
      const response: any = await $api("card/" + data.id, {
        method: "PUT",
        body: data,
      });
      return response;
    } catch (error) {
      return error;
    }
  }

  return { cards, selectedCard, fetchCards, addCard, editCard };
});
