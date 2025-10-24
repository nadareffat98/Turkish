<script setup>
// 👉 Data
const globalStore = useGlobalStore();
const countries = globalStore.countries;
const categories = ref([]);
const $api = useApi();
const isLoading = useLoadingState();
const { $unavailableProductSchema, $confirmDialog, $toast } = useNuxtApp();
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
  isLoading.value = true;
  try {
    await $api("unavailable_products", {
      method: "POST",
      body: {
        phone_code: phone_code.value.phone_code,
        ...values,
      },
    });
    fireConfirm();
  } catch (e) {
    $toast(e.data.message, "error");
  } finally {
    isLoading.value = false;
  }
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
  const data = await $api("categories");
  categories.value = data.data;
});
</script>
<template>
  <Card
    class="sm:px-10 mx-auto sm:w-[590px] w-full"
    pt:root:class="shadow-none border-none"
    pt:header:class="flex flex-col items-start gap-2"
    pt:body:class="sm:pt-6 pt-3 px-0"
    pt:footer:class="mt-6"
  >
    <template #header>
      <h3 class="sm:text-4xl text-2xl font-bold text-main-color">
        {{ $t("Seeking an unavailable product?") }}
      </h3>
      <p class="text-main-color sm:text-base text-sm font-medium">
        {{ $t("Let us know, and we'll work on getting it for you soon!") }}
      </p>
    </template>
    <template #content>
      <form
        @submit.prevent="onSubmit"
        class="flex flex-col gap-4 w-full form-container"
      >
        <!-- First Name & Last Name  -->
        <div class="flex gap-3">
          <div class="inner-container w-full">
            <label>{{ $t("First Name") }} *</label>
            <InputText
              v-model="firstName"
              :placeholder="$t('Enter Your first name')"
              aria-describedby="brand_name-help"
              :class="{ 'p-invalid': errors.first_name }"
              fluid
            />
            <small
              id="first_name-help"
              class="text-red-500"
              v-if="errors?.first_name"
            >
              {{ $t(errors.first_name) }}
            </small>
          </div>
          <div class="inner-container w-full">
            <label>{{ $t("Last Name") }} *</label>
            <InputText
              v-model="lastName"
              :placeholder="$t('Enter Your last name')"
              aria-describedby="last_name-help"
              :class="{ 'p-invalid': errors.last_name }"
              fluid
            />
            <small
              id="last_name-help"
              class="text-red-500"
              v-if="errors.last_name"
            >
              {{ $t(errors.last_name) }}
            </small>
          </div>
        </div>
        <!-- Email Address  -->
        <div class="inner-container">
          <label>{{ $t("Email Address") }} *</label>
          <InputText
            v-model="email"
            :placeholder="$t('Enter Your email')"
            aria-describedby="email-help"
            :class="{ 'p-invalid': errors.email }"
            fluid
          />
          <small id="email-help" class="text-red-500" v-if="errors.email_name">
            {{ $t(errors.email_name) }}
          </small>
        </div>
        <!-- Phone number  -->
        <div class="inner-container">
          <label>{{ $t("Phone number") }} *</label>
          <InputGroup>
            <InputGroupAddon
              :class="{ 'p-invalid': errors.phone }"
              class="p-0 border-r-0 rounded-xl border-border-color"
            >
              <Select
                v-model="phone_code"
                :options="countries"
                optionLabel="phone_code"
                class="border-none ltr:pr-0 rtl:pl-0"
                pt:label:class="p-0"
                pt:dropdownicon:class="text-black"
              />
              <Divider
                layout="vertical"
                class="before:border-black ltr:ml-0 rtl:mr-0"
                style="min-height: 50%"
              />
            </InputGroupAddon>
            <InputText
              v-model="phone"
              type="text"
              v-keyfilter.num
              :placeholder="$t('Enter Your phone')"
              class="ltr:border-l-0 rtl:border-r-0 rounded-xl"
              fluid
              aria-describedby="phone-help"
              :class="{ 'p-invalid': errors.phone }"
            />
          </InputGroup>
          <small id="phone-help" class="text-red-500" v-if="errors.phone">{{
            $t(errors.phone)
          }}</small>
        </div>
        <!-- Product Category  -->
        <div class="inner-container">
          <label>{{ $t("Product category") }} *</label>
          <Select
            v-model="selectedCategory"
            :options="categories"
            option-label="title"
            option-value="id"
            :placeholder="$t('Select category')"
            aria-describedby="city_id-help"
            :class="{ 'p-invalid': errors.category_id, 'w-full': true }"
          />
          <small
            id="category_id-help"
            class="text-red-500"
            v-if="errors.category_id"
          >
            {{ $t(errors.category_id) }}
          </small>
        </div>
        <!-- Product name -->
        <div class="inner-container">
          <label>{{ $t("Product name") }} *</label>
          <InputText
            v-model="productName"
            :placeholder="$t('Enter Your product name')"
            aria-describedby="product_name-help"
            :class="{ 'p-invalid': errors.product_name }"
            fluid
          />
          <small
            id="product_name-help"
            class="text-red-500"
            v-if="errors.product_name"
          >
            {{ $t(errors.product_name) }}
          </small>
        </div>
        <UiFileInput
          :error="errors?.image ? $t(errors.image) : ''"
          :label="$t('Product image') + '*'"
          accept="image/*"
          file-desc="(JPG , PNG , or SVG)"
          type="image"
          model="unavailable_products"
          @update="image = $event"
        />
        <!-- Message  -->
        <div class="inner-container">
          <label>{{ $t("Message") }} *</label>
          <Textarea
            v-model="message"
            type="text"
            :placeholder="$t('Enter Subject')"
            style="resize: none"
            rows="7"
            aria-describedby="message-help"
            :class="{ 'p-invalid': errors.message }"
            fluid
          />
          <small id="message-help" class="text-red-500" v-if="errors.message">
            {{ $t(errors.message) }}
          </small>
        </div>
        <UiButtonComponent
          class="auth-button"
          :content="$t('Make a request')"
          type="submit"
        />
      </form>
    </template>
  </Card>
</template>
<style src="@/assets/scss/components/auth/auth.scss" scoped></style>
