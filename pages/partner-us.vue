<script setup>
// 👉 Data
const globalStore = useGlobalStore();
const countries = globalStore.countries;
const cities = ref([]);
const { $partnerUsSchema, $confirmDialog, $api, $toast } = useNuxtApp();
const router = useRouter();
const { defineField, handleSubmit, errors } = useForm({
  validationSchema: $partnerUsSchema,
});
const isLoading = useLoadingState();
const [brandName] = defineField("brand_name");
const [city] = defineField("city_id");
const [address] = defineField("address");
const [businessEmail] = defineField("business_email");
const [uploadedFile] = defineField("file");
const [firstName] = defineField("first_name");
const [lastName] = defineField("last_name");
const [phone] = defineField("phone");
const [jobTitle] = defineField("job_title");
const [message] = defineField("message");
const phone_code = ref(countries[0]);
const facebookAccount = ref("");
const instgramAccount = ref("");
const tiktokAccount = ref("");
// 👉 Methods
const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true;
  const res = await $api("partners", {
    method: "POST",
    body: {
      phone_code: phone_code.value.phone_code,
      country_id: phone_code.value.id,
      ...values,
    },
    ignoreResponseError: true,
  });
  if (res.status == "fail") $toast(res.message, "error");
  else fireConfirm();
  isLoading.value = false;
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
// 👉 watch
watch(phone_code, async (newValue, oldValue) => {
  cities.value = await globalStore.fetchCities(newValue.id);
});
// 👉 mounted
onMounted(async () => {
  cities.value = await globalStore.fetchCities(countries[0].id);
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
      <h3 class="text-4xl font-bold text-main-color">Be a Partner with us</h3>
      <p class="text-main-color text-base font-medium">
        Do you have an amazing brand? expose your product with Turkish and
        contact us now. Please provide us with your info and we will contact you
        to discuss more!
      </p>
    </template>
    <template #content>
      <form
        @submit="onSubmit"
        class="flex flex-col gap-4 w-full form-container"
      >
        <div class="flex flex-col gap-1">
          <label>Brand name*</label>
          <InputText
            v-model="brandName"
            placeholder="Enter Your brand name"
            aria-describedby="brand_name-help"
            :class="{ 'p-invalid': errors.brand_name }"
          />
          <small id="brand_name-help" class="text-red-500">
            {{ errors.brand_name }}
          </small>
        </div>
        <div class="flex flex-col gap-1">
          <label>City*</label>
          <Select
            v-model="city"
            :options="cities"
            optionLabel="name"
            option-value="id"
            placeholder="Select city"
            aria-describedby="city_id-help"
            :class="{ 'p-invalid': errors.city_id, 'w-full': true }"
          />
          <small id="city_id-help" class="text-red-500">
            {{ errors.city_id }}
          </small>
        </div>
        <div class="flex flex-col gap-1">
          <label>Address*</label>
          <inputText
            v-model="address"
            type="text"
            placeholder="Enter Your address"
            fluid
            aria-describedby="address-help"
            :class="{ 'p-invalid': errors.address, 'w-full': true }"
          />
          <small id="address-help" class="text-red-500">
            {{ errors.address }}
          </small>
        </div>
        <div class="flex flex-col gap-1">
          <label>Business Email*</label>
          <InputText
            v-model="businessEmail"
            type="text"
            placeholder="Enter Your business email"
            fluid
            aria-describedby="business_email-help"
            :class="{ 'p-invalid': errors.business_email, 'w-full': true }"
          />
          <small id="business_email-help" class="text-red-500">{{
            errors.business_email
          }}</small>
        </div>
        <!----------------------- Social Info ------------------------------>
        <p class="text-lg font-semibold text-main-color">
          Social media Account
        </p>
        <div class="flex flex-col gap-1">
          <label
            >Facebook <span class="text-font-color">(optional)</span></label
          >
          <div class="relative">
            <InputText
              v-model="facebookAccount"
              type="text"
              placeholder="https://www.facebook.com"
              fluid
              class="pl-10"
            />
            <img
              src="/social-icons/facebook.png"
              class="absolute top-1/2 -translate-y-1/2 left-3"
            />
          </div>
        </div>
        <div class="flex flex-col gap-1">
          <label
            >instagram <span class="text-font-color">(optional)</span></label
          >
          <div class="relative">
            <InputText
              v-model="instgramAccount"
              type="text"
              placeholder="https://www.Instagram.com"
              fluid
              class="pl-10"
            />
            <img
              src="/social-icons/instagram.png"
              class="absolute top-1/2 -translate-y-1/2 left-3 w-5 h-5"
            />
          </div>
        </div>
        <div class="flex flex-col gap-1">
          <label>TikTok <span class="text-font-color">(optional)</span></label>
          <div class="relative">
            <InputText
              v-model="tiktokAccount"
              type="text"
              placeholder="https://www.Tiktok.com"
              fluid
              class="pl-10"
            />
            <img
              src="/social-icons/tik-tok.png"
              class="absolute top-1/2 -translate-y-1/2 left-3 w-5 h-5"
            />
          </div>
        </div>
        <UiFileInput
          :error="errors.file"
          label="Upload Product List"
          accept=".pdf,.doc,.docx,.xls,.xlsx,.csv"
          file-desc="(PDF , Excel , or word Document )"
          type="file"
          model="partners"
          @update="uploadedFile = $event"
        />
        <!------------------- contact Inf -------------------->
        <h3 class="text-3xl font-bold text-main-color">Contact info</h3>
        <div class="flex gap-3">
          <div class="flex flex-col gap-1">
            <label>First Name*</label>
            <InputText
              v-model="firstName"
              type="text"
              placeholder="Enter Your first name"
              fluid
              aria-describedby="first_name-help"
              :class="{ 'p-invalid': errors.first_name }"
            />
            <small id="first_name-help" class="text-red-500">{{
              errors.first_name
            }}</small>
          </div>
          <div class="flex flex-col gap-1">
            <label>Last Name*</label>
            <InputText
              v-model="lastName"
              type="text"
              placeholder="Enter Your last name"
              fluid
              aria-describedby="last_name-help"
              :class="{ 'p-invalid': errors.last_name }"
            />
            <small id="last_name-help" class="text-red-500">{{
              errors.last_name
            }}</small>
          </div>
        </div>
        <div class="flex flex-col gap-1">
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
        <div class="flex flex-col gap-1">
          <label>Your Job Title*</label>
          <InputText
            v-model="jobTitle"
            type="text"
            placeholder="Enter Your job title"
            fluid
            aria-describedby="job_title-help"
            :class="{ 'p-invalid': errors.job_title }"
          />
          <small id="job_title-help" class="text-red-500">{{
            errors.job_title
          }}</small>
        </div>
        <div class="flex flex-col gap-1">
          <label>Message*</label>
          <Textarea
            v-model="message"
            type="text"
            placeholder="Enter Subject"
            style="resize: none"
            rows="5"
            fluid
            aria-describedby="message-help"
            :class="{ 'p-invalid': errors.message }"
          />
          <small id="message-help" class="text-red-500">{{
            errors.message
          }}</small>
          <Message
            size="small"
            variant="simple"
            class="text-main-color text-xs font-medium mt-1"
            >By Submitting, you agree with our Privacy Policy</Message
          >
        </div>
        <UiButtonComponent
          class="auth-button"
          content="Send"
          @click="onSubmit"
        />
      </form>
    </template>
  </Card>
</template>
<style src="@/assets/scss/components/auth/auth.scss" scoped></style>
