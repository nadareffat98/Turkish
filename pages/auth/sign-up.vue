<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});
// 👉 Data
const auth = useAuthStore();
const globalStore = useGlobalStore();
const isLoading = useLoadingState();
const { $signUpSchema, $toast }: any = useNuxtApp();
const countries = globalStore.countries;
const termsCheck = ref(false);
const { defineField, handleSubmit, errors } = useForm({
  validationSchema: $signUpSchema,
});
const [firstName] = defineField("first_name");
const [lastName] = defineField("last_name");
const [email] = defineField("email");
const phone_code = ref(countries[0]);
const [phone] = defineField("phone");
const [address] = defineField("address");
const [password] = defineField("password");
const [passwordConfirmation] = defineField("password_confirmation");
// 👉 Methods
const onSubmit = handleSubmit(async (values: any) => {
  isLoading.value = true;
  const res = await auth.register({
    phone_code: phone_code.value.phone_code,
    ...values,
  });
  if (res.status == "fail") {
    $toast(res.message, "error");
  }
  isLoading.value = false;
});
</script>
<template>
  <div class="register-container">
    <AuthCardForm>
      <template #header>
        <p class="text-main-color text-base font-medium">Welcome !</p>
        <h3 class="text-4xl font-bold text-main-color">Create an account</h3>
      </template>
      <template #content>
        <form
          @submit="onSubmit"
          class="flex flex-col gap-4 w-full form-container"
        >
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
              <small id="first_name-help" class="text-red-500">
                {{ errors.first_name }}
              </small>
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
              <small id="last_name-help" class="text-red-500">
                {{ errors.last_name }}
              </small>
            </div>
          </div>
          <div class="flex flex-col gap-1">
            <label>Email*</label>
            <InputText
              v-model="email"
              type="text"
              placeholder="Enter Your email"
              fluid
              aria-describedby="email-help"
              :class="{ 'p-invalid': errors.email }"
            />
            <small id="email-help" class="text-red-500">
              {{ errors.email }}
            </small>
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
            <small id="phone-help" class="text-red-500">{{
              errors.phone
            }}</small>
          </div>
          <div class="flex flex-col gap-1">
            <label>Address*</label>
            <Textarea
              v-model="address"
              type="text"
              placeholder="Enter Your address"
              style="resize: none"
              fluid
              aria-describedby="address-help"
              :class="{ 'p-invalid': errors.address }"
            />
            <small id="address-help" class="text-red-500">
              {{ errors.address }}
            </small>
          </div>
          <div class="flex flex-col gap-1">
            <label>Password*</label>
            <Password
              type="text"
              v-model="password"
              placeholder="Enter Your password"
              :feedback="false"
              toggleMask
              fluid
              pt:root:class="password-container"
              aria-describedby="password-help"
              :invalid="errors.password ? true : false"
            />
            <small id="password-help" class="text-red-500">
              {{ errors.password }}
            </small>
          </div>
          <div class="flex flex-col gap-1">
            <label>Confirm Password*</label>
            <Password
              type="text"
              v-model="passwordConfirmation"
              placeholder="Confirm your password"
              :feedback="false"
              toggleMask
              fluid
              pt:root:class="password-container"
              aria-describedby="password_confirmation-help"
              :invalid="errors.password_confirmation ? true : false"
            />
            <small id="password_confirmation-help" class="text-red-500">
              {{ errors.password_confirmation }}
            </small>
          </div>
          <div class="flex justify-start gap-2">
            <Checkbox
              v-model="termsCheck"
              binary
              id="terms-check"
              pt:root:class="checkbox-container"
            />
            <label for="terms-check"
              >I agree to
              <NuxtLink class="text-second-color" to="/"
                >the Terms & Conditions</NuxtLink
              ></label
            >
          </div>
          <UiButtonComponent
            :disabled="!termsCheck"
            type="submit"
            class="auth-button"
            content="Create my account"
          />
        </form>
      </template>
      <template #footer>
        <p class="text-main-color text-sm font-medium mt-2">
          Already have an account?
          <NuxtLink class="text-second-color" to="/auth/sign-in">
            Sign in</NuxtLink
          >
        </p>
      </template>
    </AuthCardForm>
  </div>
</template>
<style lang="scss" src="@/assets/scss/components/auth/auth.scss" scoped />
