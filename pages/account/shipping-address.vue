<script setup lang="ts">
// 👉 Props
const props = defineProps(["user", "countries"]);
</script>
<template>
  <Card
    class="account-card-container xl:w-2/3"
    pt:subtitle:class="text-sm font-medium text-main-color"
  >
    <template #title>
      <h3>Shipping address</h3>
    </template>
    <template #subtitle>
      The following addresses will be used on the checkout page by default.
    </template>
    <template #content>
      <form class="flex flex-col gap-6 w-full" pt:root:class="form-container">
        <div class="flex gap-3">
          <div class="flex flex-col gap-1 flex-1">
            <label>First Name*</label>
            <InputText
              v-model="user.firstName"
              type="text"
              placeholder="Enter Your first name"
              fluid
            />
          </div>
          <div class="flex flex-col gap-1 flex-1">
            <label>Last Name*</label>
            <InputText
              v-model="user.lastName"
              type="text"
              placeholder="Enter Your last name"
              fluid
            />
          </div>
        </div>
        <div class="flex flex-col gap-1">
          <label>Phone number*</label>
          <InputGroup>
            <InputGroupAddon
              class="p-0 border-r-0 rounded-xl border-border-color"
            >
              <Select
                v-model="user.phone_code"
                :options="countries"
                optionLabel="phone_code"
                optionValue="phone_code"
                class="border-none pr-0"
                pt:label:class="pr-0"
                pt:dropdownicon:class="text-black"
              />
              <Divider
                layout="vertical"
                class="before:border-black ml-0"
                style="min-height: 50%"
              />
            </InputGroupAddon>
            <InputText
              v-model="user.phone"
              type="text"
              v-keyfilter.num
              placeholder="Enter Your phone"
              class="border-l-0 rounded-xl"
              fluid
            />
          </InputGroup>
        </div>
        <div class="flex flex-col gap-1">
          <label>Address*</label>
          <Textarea
            v-model="user.address"
            type="text"
            placeholder="Enter Your address"
            style="resize: none"
            fluid
          />
        </div>
        <UiButtonComponent
          content="Save changes"
          class="text-base rounded-xl w-full"
        />
      </form>
    </template>
  </Card>
</template>
