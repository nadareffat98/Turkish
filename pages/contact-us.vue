<script setup lang="ts">
// 👉 Data
const globalStore = useGlobalStore();
const countries = globalStore.countries;
const isLoading = useLoadingState();
const router = useRouter();
const $api = useApi();
const { $contactUsSchema, $confirmDialog, $toast }: any = useNuxtApp();
const { defineField, handleSubmit, errors } = useForm({
  validationSchema: $contactUsSchema,
});
const [firstName] = defineField("first_name");
const [lastName] = defineField("last_name");
const [email] = defineField("email");
const phone_code = ref(countries[0]);
const [phone] = defineField("phone");
const [message] = defineField("message");
const contacts = [
  {
    icon: "pi pi-envelope",
    title: "Reach us on email",
    subtitle: "Our friendly team is here to help.",
    info: "Turkishstotre8@gmail.com",
    type: "email",
  },
  {
    icon: "pi pi-phone",
    title: "Phone",
    subtitle: "Our friendly team is here to help.",
    info: "(+02) 01091000525",
    type: "phone",
  },
  {
    icon: "pi pi-home",
    title: "Shop",
    subtitle: "Come say hello at our Shop.",
    info: "El-Kafrawy street - New Damietta City - Damietta",
    type: "address",
  },
  {
    icon: "pi pi-map-marker",
    title: "Business hours",
    subtitle: "You are welcomed in any time",
    info: "Sat - Thu: 10 AM - 1 AM - Fri: 3 PM - 1 AM",
    type: "hours",
  },
];

// 👉 Methods
const goToType = (type: string, info: string) => {
  if (type === "phone") {
    const phoneNumber = info.replace(/\D/g, "");
    window.open(`https://wa.me/${phoneNumber}`, "_blank");
  } else if (type === "email") {
    window.location.href = `mailto:${info}`;
  }
};
const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true;
  try {
    await $api("contact-us", {
      method: "POST",
      body: {
        fullname: `${firstName.value} ${lastName.value}`,
        email: email.value,
        phone_code: phone_code.value.phone_code,
        phone: phone.value,
        content: message.value,
      },
    });
    fireConfirm();
  } catch (e: any) {
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
</script>
<template>
  <div
    class="contact-container flex lg:flex-row flex-col-reverse xl:gap-16 gap-10"
  >
    <div class="left-side lg:w-1/2 w-full">
      <h4 class="sm:text-2xl text-lg font-bold text-main-color">
        {{ $t("Other ways to connect") }}
      </h4>
      <p
        class="sm:text-base text-sm font-medium text-main-color max-w-[400px] mt-2"
      >
        {{
          $t(
            "We' love to hear from you. Our friendly team is always here to chat."
          )
        }}
      </p>
      <div class="mt-8 space-y-6">
        <div class="inner-card" v-for="contact in contacts" :key="contact.icon">
          <div class="icon-container">
            <i :class="contact.icon"></i>
          </div>
          <div class="space-y-1">
            <p class="title">{{ $t(contact.title) }}</p>
            <p class="subtitle">{{ $t(contact.subtitle) }}</p>
            <p class="info" @click="goToType(contact.type, contact.info)">
              {{ contact.info }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="right-side lg:w-1/2 w-full">
      <h3 class="lg:text-4xl sm:text-2xl text-xl font-bold text-main-color">
        {{ $t("Love to hear from you") }}
      </h3>
      <p class="sm:text-base font-medium text-main-color mt-2">
        {{ $t("Send Us Your Queries and We’ll get back to you soon.") }}
      </p>
      <form
        @submit.prevent="onSubmit"
        class="flex flex-col gap-4 w-full mt-6 form-container"
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
          type="submit"
        />
      </form>
    </div>
  </div>
</template>
<style src="@/assets/scss/components/auth/auth.scss" scoped></style>
<style scoped lang="scss">
.inner-card {
  display: flex;
  gap: 24px;
  align-items: center;
  justify-content: flex-start;
  .icon-container {
    @apply flex items-center justify-center flex-shrink-0;
    background: #0078530a;
    border-radius: 50%;
    width: 48px;
    height: 48px;
    i {
      color: $main-color;
    }
  }
  .title,
  .info {
    font-size: 14px;
    font-weight: 500;
  }
  .title {
    color: black;
  }
  .subtitle {
    font-size: 12px;
    font-weight: 500;
    color: $main-color;
  }
  .info {
    color: $second-color;
    cursor: pointer;
  }
}
</style>
