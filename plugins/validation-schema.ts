import * as Yup from "yup";

export default defineNuxtPlugin(() => {
  // Define your Yup validation schema globally
  // schema for sign up
  const signUpSchema = Yup.object({
    first_name: Yup.string().required("first name is required"),
    last_name: Yup.string().required("last name is required"),
    email: Yup.string().required("email is required"),
    phone: Yup.string().required("phone is required"),
    address: Yup.string().required("address is required"),
    password: Yup.string().required("password is required"),
    password_confirmation: Yup.string()
      .required("confirm password is required")
      .oneOf([Yup.ref("password")], "your passwords are not identical"),
  });
  // schema for sign in
  const signInSchema = Yup.object({
    email: Yup.string().required("email is required"),
    password: Yup.string().required("password is required"),
  });
  // schema for reset password
  const resetPasswordSchema = Yup.object({
    password: Yup.string().required("password is required"),
    password_confirmation: Yup.string()
      .required("confirm password is required")
      .oneOf([Yup.ref("password")], "your passwords are not identical"),
  });
  // schema for partner us
  const partnerUsSchema = Yup.object({
    brand_name: Yup.string().required("brand name is required"),
    city_id: Yup.string().required("city is required"),
    address: Yup.string().required("address is required"),
    business_email: Yup.string().required("business email is required"),
    file: Yup.string().required("product list is required"),
    first_name: Yup.string().required("first name is required"),
    last_name: Yup.string().required("last name is required"),
    phone: Yup.string().required("phone is required"),
    job_title: Yup.string().required("job title is required"),
    message: Yup.string().required("message is required"),
  });
  // schema for unavailable product
  const unavailableProductSchema = Yup.object({
    first_name: Yup.string().required("first name is required"),
    last_name: Yup.string().required("last name is required"),
    email: Yup.string().required("email is required"),
    phone: Yup.string().required("phone is required"),
    category_id: Yup.string().required("category is required"),
    product_name: Yup.string().required("product name is required"),
    image: Yup.string().required("product image is required"),
    message: Yup.string().required("message is required"),
  });

  // schema for contact us
  const contactUsSchema = Yup.object({
    first_name: Yup.string().required("first name is required"),
    last_name: Yup.string().required("last name is required"),
    email: Yup.string().required("email is required"),
    phone: Yup.string().required("phone is required"),
    message: Yup.string().required("message is required"),
  });
  // schema for shipping info
  const shippingSchema = Yup.object({
    first_name: Yup.string().required("first name is required"),
    last_name: Yup.string().required("last name is required"),
    email: Yup.string().required("email is required"),
    phone: Yup.string().required("phone is required"),
    second_phone: Yup.string().required("additional phone is required"),
    country_id: Yup.string().required("country is required"),
    governrate_id: Yup.string().required("governrate is required"),
    city_id: Yup.string().required("city is required"),
    postal_code: Yup.string().required("postal code is required"),
    address: Yup.string().required("address is required"),
    payment_option: Yup.string().required("Payment method is required"),
    card_number: Yup.string().when("payment_option", {
      is: (val) => val === "card",
      then: (schema) =>
        schema
          .transform((val) => val.replace(/-/g, ""))
          .required("Card number is required")
          .matches(/^\d{16}$/, "Card number must be 16 digits"),
      otherwise: (schema) => schema.notRequired(),
    }),

    holder_name: Yup.string().when("payment_option", {
      is: (val) => val === "card",
      then: (schema) => schema.required("Card holder name is required"),
      otherwise: (schema) => schema.notRequired(),
    }),

    cvc: Yup.string().when("payment_option", {
      is: (val) => val === "card",
      then: (schema) =>
        schema
          .required("CVC is required")
          .matches(/^\d{3,4}$/, "CVC must be 3 or 4 digits"),
      otherwise: (schema) => schema.notRequired(),
    }),

    month: Yup.number().when("payment_option", {
      is: (val) => val === "card",
      then: (schema) => schema.required("Month is required"),
      otherwise: (schema) => schema.notRequired(),
    }),

    year: Yup.number().when("payment_option", {
      is: (val) => val === "card",
      then: (schema) =>
        schema
          .required("Year is required")
          .min(new Date().getFullYear(), "Year cannot be in the past"),
      otherwise: (schema) => schema.notRequired(),
    }),
  });
  // Make the schema available globally
  return {
    provide: {
      partnerUsSchema,
      unavailableProductSchema,
      signUpSchema,
      signInSchema,
      resetPasswordSchema,
      contactUsSchema,
      shippingSchema,
    },
  };
});
