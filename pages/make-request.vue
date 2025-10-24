<script setup>
// 👉 Data
const globalStore = useGlobalStore();
const countries = globalStore.countries;
const categories = ref([]);
const $api = useApi(); 
const { $unavailableProductSchema, $confirmDialog, $toast } =
  useNuxtApp();
const router = useRouter();
const { defineField, handleSubmit, errors } = useForm({
  validationSchema: $unavailableProductSchema,
});
const [firstName] = defineField("first_name");
const [lastName] = defineField("last_name");
const [email] = defineField("email");
const phone_code = ref(countries[0]);
const [phone] = defineField("phone");
const [selectedCategory] = defineField("category_id");
const [productName] = defineField("product_name");
const [image] = defineField("image");
const [message] = defineField("message");

// 👉 Methods
const onSubmit = handleSubmit(async (values) => {
  const res = await $api("unavailable_products", {
    method: "POST",
    body: {
      phone_code: phone_code.value.phone_code,
      ...values,
    },
    ignoreResponseError: true,
  });
  if (res.status == "fail") $toast(res.message, "error");
  else fireConfirm();
});
const fireConfirm = () => {
  $confirmDialog({
    icon: "fa-regular fa-circle-check",
    header: "Message Received",
    message:
      " Your message has been received so expect a prompt response from our team soon",
    acceptClass: "hidden",
    rejectClass: "flex-none mx-auto",
    rejectLabel: "Back to home",
    reject: () => {
      router.push("/");
    },
  });
};
// 👉 mounted
onMounted(async () => {
  if (import.meta.client) {
    const data = await $api("categories");
    categories.value = data.data;
  }
});
</script>
<template>
  <Card
    class="px-10 mx-auto"
    style="width: 590px"
    pt:root:class="shadow-none border-none"
    pt:header:class="flex flex-col items-start gap-2"
    pt:body:class="pt-6 px-0"
    pt:footer:class="mt-6"
  >
    <template #header>
      <h3 class="text-4xl font-bold text-main-color">
        Seeking an unavailable product?
      </h3>
      <p class="text-main-color text-base font-medium">
        "Let us know, and we'll work on getting it for you soon!"
      </p>
    </template>
    <template #content>
      <form
        @submit="onSubmit"
        class="flex flex-col gap-4 w-full form-container"
      >
        <div class="flex gap-3">
          <div class="inner-container">
            <label>First Name*</label>
            <InputText
              v-model="firstName"
              placeholder="Enter Your first name"
              aria-describedby="brand_name-help"
              :class="{ 'p-invalid': errors.first_name }"
              fluid
            />
            <small id="first_name-help" class="text-red-500">
              {{ errors.first_name_name }}
            </small>
          </div>
          <div class="inner-container">
            <label>Last Name*</label>
            <InputText
              v-model="lastName"
              placeholder="Enter Your last name"
              aria-describedby="last_name-help"
              :class="{ 'p-invalid': errors.last_name }"
              fluid
            />
            <small id="last_name-help" class="text-red-500">
              {{ errors.last_name_name }}
            </small>
          </div>
        </div>
        <div class="inner-container">
          <label>Email Address*</label>
          <InputText
            v-model="email"
            placeholder="Enter Your email"
            aria-describedby="email-help"
            :class="{ 'p-invalid': errors.email }"
            fluid
          />
          <small id="email-help" class="text-red-500">
            {{ errors.email_name }}
          </small>
        </div>
        <div class="inner-container">
          <label>Phone number*</label>
          <InputGroup>
            <InputGroupAddon
              :class="{ 'p-invalid': errors.phone }"
              class="p-0 border-r-0 rounded-xl border-border-color"
            >
              <Select
                v-model="phone_code"
                :options="countries"
                optionLabel="phone_code"
                class="border-none pr-0"
                pt:label:class="p-0"
                pt:dropdownicon:class="text-black"
              />
              <Divider
                layout="vertical"
                class="before:border-black ml-0"
                style="min-height: 50%"
              />
            </InputGroupAddon>
            <InputText
              v-model="phone"
              type="text"
              v-keyfilter.num
              placeholder="Enter Your phone"
              class="border-l-0 rounded-xl"
              fluid
              aria-describedby="phone-help"
              :class="{ 'p-invalid': errors.phone }"
            />
          </InputGroup>
          <small id="phone-help" class="text-red-500">{{ errors.phone }}</small>
        </div>
        <div class="inner-container">
          <label>Product category*</label>
          <Select
            v-model="selectedCategory"
            :options="categories"
            option-label="title"
            option-value="id"
            placeholder="Select category"
            aria-describedby="city_id-help"
            :class="{ 'p-invalid': errors.category_id, 'w-full': true }"
          />
          <small id="category_id-help" class="text-red-500">
            {{ errors.category_id }}
          </small>
        </div>
        <div class="inner-container">
          <label>Product name*</label>
          <InputText
            v-model="productName"
            placeholder="Enter Your product name"
            aria-describedby="product_name-help"
            :class="{ 'p-invalid': errors.product_name }"
            fluid
          />
          <small id="product_name-help" class="text-red-500">
            {{ errors.product_name }}
          </small>
        </div>
        <UiFileInput
          :error="errors.image"
          label="Product image*"
          accept="image/*"
          file-desc="(JPG , PNG , or SVG)"
          type="image"
          model="unavailable_products"
          @update="image = $event"
        />
        <div class="inner-container">
          <label>Message*</label>
          <Textarea
            v-model="message"
            type="text"
            placeholder="Enter Subject"
            style="resize: none"
            rows="7"
            aria-describedby="message-help"
            :class="{ 'p-invalid': errors.message }"
            fluid
          />
          <small id="message-help" class="text-red-500">
            {{ errors.message }}
          </small>
        </div>
        <UiButtonComponent
          class="auth-button"
          content="Make a request"
          type="submit"
        />
      </form>
    </template>
  </Card>
</template>
<style src="@/assets/scss/components/auth/auth.scss" scoped></style>
