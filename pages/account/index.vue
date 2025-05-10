<script setup lang="ts">
// 👉 Props
const props = defineProps(["user", "countries"]);
// 👉 Data
const auth = useAuthStore();
const isLoading = useLoadingState();
const { $toast }: any = useNuxtApp();
// 👉 Methods
const updateProfile = async () => {
  isLoading.value = true;
  const res = await auth.updateProfile({
    first_name: props.user.firstName,
    last_name: props.user.lastName,
    phone_code: props.user.phone_code,
    phone: props.user.phone,
  });
  if (res.status == "fail") {
    $toast(res.message, "error");
  }
  isLoading.value = false;
};
</script>
<template>
  <Card class="account-card-container xl:w-2/3">
    <template #title>
      <h3>My profile</h3>
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
          <label>Email*</label>
          <InputText
            v-model="user.email"
            type="text"
            placeholder="Enter Your email"
            fluid
          />
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
        <UiButtonComponent
          content="Save changes"
          class="text-base rounded-xl w-full"
          @click="updateProfile"
        />
      </form>
    </template>
  </Card>
</template>
