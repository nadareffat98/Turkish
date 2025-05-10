<script setup>
const customers = ref([
  {
    name: "Dianne Russell",
    rate: 5,
    date: "Just now",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, pariatur.",
  },
  {
    name: "Dianne Russell",
    rate: 5,
    date: "Just now",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, pariatur.",
  },
  {
    name: "Dianne Russell",
    rate: 5,
    date: "Just now",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, pariatur.",
  },
]);
</script>
<template>
  <div class="cutomer-feedback-container flex flex-col gap-1">
    <p class="text-base font-semibold text-black mb-4">Customer Feedback</p>
    <div
      v-for="(customer,index) in customers"
      :key="customer.name"
      class="flex flex-col gap-3"
    >
      <div class="flex gap-3">
        <Avatar
          image="/images/avatar/amyelsner.png"
          size="xlarge"
          shape="circle"
        />
        <div class="flex flex-col gap-2">
          <p class="text-sm font-medium text-black flex items-center gap-2">
            {{ customer.name }}
            <i
              class="pi pi-circle-fill text-font-color"
              style="font-size: 0.3rem"
            ></i>
            <span class="font-normal text-font-color flex items-center">
              {{ customer.date }}</span
            >
          </p>
          <Rating
            v-model="customer.rate"
            :readonly="true"
            pt:onicon:style="color:#FBBC05"
          />
        </div>
      </div>
      <p class="text-sm font-normal text-main-color">
        {{ customer.comment }}
      </p>
      <Divider v-if="index !== customers.length - 1"/>
    </div>
  </div>
</template>
