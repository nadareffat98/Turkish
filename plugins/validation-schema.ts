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
  // Make the schema available globally
  return {
    provide: {
      partnerUsSchema,
      unavailableProductSchema,
      signUpSchema,
      signInSchema,
      resetPasswordSchema,
      contactUsSchema
    },
  };
});
