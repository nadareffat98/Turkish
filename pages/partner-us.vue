<script setup>
// 👉 Data
const globalStore = useGlobalStore();
const countries = globalStore.countries;
const cities = ref([]);
const $api = useApi();
const { $partnerUsSchema, $confirmDialog, $toast } = useNuxtApp();
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
  try {
    await $api("partners", {
      method: "POST",
      body: {
        phone_code: phone_code.value.phone_code,
        country_id: phone_code.value.id,
        ...values,
      },
    });
    fireConfirm();
  } catch (e) {
    $toast(e.data.message, "error");
  } finally {
    isLoading.value = false;
  }
  // if (res.status == "fail") $toast(res.message, "error");
});
const fireConfirm = () => {
  $confirmDialog({
    icon: "fa-regular fa-circle-check",
    header: "Message Received",
    message:
      "Your message has been received so expect a prompt response from our team soon",
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
    class="sm:px-10 mx-auto sm:w-[590px] w-full"
    pt:root:class="shadow-none border-none"
    pt:header:class="flex flex-col items-start gap-2"
    pt:body:class="sm:pt-6 pt-3 px-0"
    pt:footer:class="mt-6"
  >
    <template #header>
      <h3 class="sm:text-4xl text-2xl font-bold text-main-color">
        {{ $t("Be a Partner with us") }}
      </h3>
      <p class="text-main-color sm:text-base text-sm font-medium">
        {{
          $t(
            "Do you have an amazing brand? expose your product with Turkish and contact us now. Please provide us with your info and we will contact you to discuss more!"
          )
        }}
      </p>
    </template>
    <template #content>
      <form
        @submit="onSubmit"
        class="flex flex-col gap-4 w-full form-container"
      >
        <!-- Brand name  -->
        <div class="inner-container">
          <label>{{ $t("Brand name") }} *</label>
          <InputText
            v-model="brandName"
            :placeholder="$t('Enter Your brand name')"
            aria-describedby="brand_name-help"
            :class="{ 'p-invalid': errors.brand_name }"
          />
          <small
            id="brand_name-help"
            class="text-red-500"
            v-if="errors?.brand_name"
          >
            {{ $t(errors.brand_name) }}
          </small>
        </div>
        <!-- City  -->
        <div class="inner-container">
          <label>{{ $t("City") }} *</label>
          <Select
            v-model="city"
            :options="cities"
            optionLabel="name"
            option-value="id"
            :placeholder="$t('Select City')"
            aria-describedby="city_id-help"
            :class="{ 'p-invalid': errors.city_id, 'w-full': true }"
          />
          <small id="city_id-help" class="text-red-500" v-if="errors?.city_id">
            {{ $t(errors.city_id) }}
          </small>
        </div>
        <!-- Address -->
        <div class="inner-container">
          <label>{{ $t("Address") }} *</label>
          <inputText
            v-model="address"
            type="text"
            :placeholder="$t('Enter Your address')"
            fluid
            aria-describedby="address-help"
            :class="{ 'p-invalid': errors.address, 'w-full': true }"
          />
          <small id="address-help" class="text-red-500" v-if="errors.address">
            {{ $t(errors.address) }}
          </small>
        </div>
        <!-- Business Email -->
        <div class="inner-container">
          <label>{{ $t("Business Email") }} *</label>
          <InputText
            v-model="businessEmail"
            type="text"
            :placeholder="$t('Enter Your business email')"
            fluid
            aria-describedby="business_email-help"
            :class="{ 'p-invalid': errors.business_email, 'w-full': true }"
          />
          <small
            id="business_email-help"
            class="text-red-500"
            v-if="errors.business_email"
            >{{ $t(errors.business_email) }}</small
          >
        </div>
        <!----------------------- Social Info ------------------------------>
        <p class="sm:text-lg text-base font-semibold text-main-color">
          {{ $t("Social media Account") }}
        </p>
        <div class="inner-container">
          <label
            >Facebook
            <span class="text-font-color">({{ $t("optional") }})</span></label
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
        <div class="inner-container">
          <label
            >instagram
            <span class="text-font-color">({{ $t("optional") }})</span></label
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
        <div class="inner-container">
          <label
            >TikTok
            <span class="text-font-color">({{ $t("optional") }})</span></label
          >
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
        <div class="inner-container">
          <UiFileInput
            :error="errors?.file ? $t(errors.file) : ''"
            :label="$t('Upload Product List')"
            accept=".pdf,.doc,.docx,.xls,.xlsx,.csv"
            file-desc="(PDF , Excel , or word Document )"
            type="file"
            model="partners"
            @update="uploadedFile = $event"
          />
          <Message
            size="small"
            variant="simple"
            icon="pi pi-exclamation-circle"
            class="text-main-color text-xs font-normal"
            >{{
              $t(
                "please include SKUs , images , Descriptions , Prices if possible"
              )
            }}</Message
          >
        </div>
        <!------------------- contact Inf -------------------->
        <h3 class="sm:text-3xl text-xl font-bold text-main-color">
          {{ $t("Contact info") }}
        </h3>
        <!-- First Name & Last Name -->
        <div class="flex sm:flex-row flex-col gap-3">
          <div class="inner-container w-full">
            <label>{{ $t("First Name") }} *</label>
            <InputText
              v-model="firstName"
              type="text"
              :placeholder="$t('Enter Your first name')"
              fluid
              aria-describedby="first_name-help"
              :class="{ 'p-invalid': errors.first_name }"
            />
            <small
              id="first_name-help"
              class="text-red-500"
              v-if="errors.first_name"
              >{{ $t(errors.first_name) }}</small
            >
          </div>
          <div class="inner-container w-full">
            <label>{{ $t("Last Name") }} *</label>
            <InputText
              v-model="lastName"
              type="text"
              :placeholder="$t('Enter Your last name')"
              fluid
              aria-describedby="last_name-help"
              :class="{ 'p-invalid': errors.last_name }"
            />
            <small
              id="last_name-help"
              class="text-red-500"
              v-if="errors.last_name"
              >{{ $t(errors.last_name) }}</small
            >
          </div>
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
        <!-- Job title  -->
        <div class="inner-container">
          <label>{{ $t("Your Job Title") }} *</label>
          <InputText
            v-model="jobTitle"
            type="text"
            :placeholder="$t('Enter Your job title')"
            fluid
            aria-describedby="job_title-help"
            :class="{ 'p-invalid': errors.job_title }"
          />
          <small
            id="job_title-help"
            class="text-red-500"
            v-if="errors.job_title"
            >{{ $t(errors.job_title) }}</small
          >
        </div>
        <!-- Message  -->
        <div class="inner-container">
          <label>{{ $t("Message") }} *</label>
          <Textarea
            v-model="message"
            type="text"
            :placeholder="$t('Enter Subject')"
            style="resize: none"
            rows="5"
            fluid
            aria-describedby="message-help"
            :class="{ 'p-invalid': errors.message }"
          />
          <small id="message-help" class="text-red-500" v-if="errors.message">{{
            $t(errors.message)
          }}</small>
          <Message
            size="small"
            variant="simple"
            class="text-main-color text-xs font-medium mt-1"
            >{{
              $t("By Submitting, you agree with our Privacy Policy")
            }}</Message
          >
        </div>
        <UiButtonComponent
          class="auth-button"
          :content="$t('Send')"
          @click="onSubmit"
        />
      </form>
    </template>
  </Card>
</template>
<style src="@/assets/scss/components/auth/auth.scss" scoped></style>
