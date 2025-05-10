<script setup>
// 👉 props
const props = defineProps({
  orderId: String,
});
const events = ref([
  {
    name: "Ordered",
    date: "15/10/2020 10:30",
    icon: "pi pi-shopping-cart",
    image: "Notebook.png",
    status: "done",
  },
  {
    name: "Processing",
    date: "15/10/2020 14:00",
    icon: "pi pi-cog",
    image: "Package.png",
    status: "current",
  },
  {
    name: "Shipped",
    date: "15/10/2020 16:15",
    icon: "pi pi-shopping-cart",
    image: "Truck.png",
    status: "next",
  },
  {
    name: "Delivered",
    date: "16/10/2020 10:00",
    icon: "pi pi-check",
    image: "Handshake.png",
    status: "pending",
  },
]);
</script>
<template>
  <Card
    class="order-details-container"
    pt:root:class="shadow-none border-2 border-border-color rounded-xl"
    pt:body:class="gap-4 p-0"
    pt:content:class="mt-6"
  >
    <template #header>
      <div
        class="bg-[#FFF0F0] flex justify-between items-center border border-second-color rounded p-6 m-6"
      >
        <div class="flex flex-col gap-2">
          <h3 class="text-black text-3xl font-bold">#{{ props.orderId }}</h3>
          <div class="flex items-center gap-2">
            <p class="text-main-color text-sm font-medium">4 products</p>
            <i
              class="text-main-color pi pi-circle-fill"
              style="font-size: 0.3rem"
            ></i>
            <p class="text-main-color text-sm font-medium">
              Order Placed in 17 Jan, 2021 at 7:32 PM
            </p>
          </div>
        </div>
        <p class="text-main-color text-2xl font-bold">1199.00 EGP</p>
      </div>
      <p class="text-black text-sm font-medium mx-6">
        Order expected arrival<b> 23 Jan, 2021</b>
      </p>
      <div class="mx-6">
        <Timeline
          :value="events"
          layout="horizontal"
          pt:eventconnector:class="h-1.5 bg-[#FFF0F0]"
          pt:root:class="w-3/4 mx-auto mt-6 relative"
          pt:eventOpposite:class="flex flex-col items-center absolute -left-6 -bottom-8"
        >
          <template #marker="slotProps">
            <i
              class="pi pi-circle text-second-color"
              style="font-size: 1.3rem"
              v-if="
                slotProps.item.status !== 'done' &&
                slotProps.item.status !== 'current'
              "
            ></i>
            <font-awesome
              icon="fa-solid fa-circle-check"
              class="text-second-color"
              style="font-size: 1.3rem"
              :class="{ 'done-event': slotProps.item.status === 'done' }"
              v-else
            />
          </template>
          <template #opposite="slotProps">
            <img
              :alt="slotProps.item.name"
              :src="'/' + slotProps.item.image"
              class="w-8 h-8"
            />
            <p>{{ slotProps.item.name }}</p>
          </template>
        </Timeline>
      </div>
    </template>
    <template #content>
      <Divider />
      <div class="m-6 flex flex-col gap-6">
        <p class="text-black text-lg font-medium">Order Activity</p>
        <div class="flex gap-4">
          <Message severity="success" icon="pi pi-check-circle" />
          <div class="flex flex-col gap-2">
            <p class="text-black text-sm font-medium">
              Your order has been Placed.
            </p>
            <span class="text-font-color text-xs font-normal"
              >19 Jan, 2021 at 2:61 PM</span
            >
          </div>
        </div>
      </div>
      <Divider />
      <p class="text-black text-lg font-medium m-6">Product <span class="text-font-color">(02)</span></p>
      <ProductTable routeType="order-details"/>
      <Divider />
    </template>
  </Card>
</template>
