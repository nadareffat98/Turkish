import * as Yup from "yup";

export default defineNuxtPlugin(() => {
  // Define your Yup validation schema globally
  // schema for sign up
  const signUpSchema = Yup.object({
    first_name: Yup.string().required("Please enter your first name."),
    last_name: Yup.string().required("Please enter your last name."),
    email: Yup.string().required("Please enter your email."),
    phone: Yup.string().required("Please enter your phone."),
    address: Yup.string().required("Please enter your address."),
    password: Yup.string().required("Please enter your password."),
    password_confirmation: Yup.string()
      .required("Please confirm your password.")
      .oneOf([Yup.ref("password")], "your passwords are not identical"),
  });
  // schema for sign in
  const signInSchema = Yup.object({
    email: Yup.string().required("Please enter your email."),
    password: Yup.string().required("Please enter your password."),
  });
  // schema for reset password
  const resetPasswordSchema = Yup.object({
    password: Yup.string().required("Please enter your password."),
    password_confirmation: Yup.string()
      .required("Please confirm your password.")
      .oneOf([Yup.ref("password")], "your passwords are not identical"),
  });
  // schema for partner us
  const partnerUsSchema = Yup.object({
    brand_name: Yup.string().required("Please enter your brand name."),
    city_id: Yup.string().required("Please enter your city."),
    address: Yup.string().required("Please enter your address."),
    business_email: Yup.string().required("Please enter your business email."),
    file: Yup.string().required("Please upload your product list."),
    first_name: Yup.string().required("Please enter your first name."),
    last_name: Yup.string().required("Please enter your last name."),
    phone: Yup.string().required("Please enter your phone."),
    job_title: Yup.string().required("Please enter your job title."),
    message: Yup.string().required("Please enter your message."),
  });
  // schema for unavailable product
  const unavailableProductSchema = Yup.object({
    first_name: Yup.string().required("Please enter your first name."),
    last_name: Yup.string().required("Please enter your last name."),
    email: Yup.string().required("Please enter your email."),
    phone: Yup.string().required("Please enter your phone."),
    category_id: Yup.string().required("Please enter your category."),
    product_name: Yup.string().required("Please enter your product name."),
    image: Yup.string().required("Please upload your product image."),
    message: Yup.string().required("Please enter your message."),
  });
  // Make the schema available globally
  return {
    provide: {
      partnerUsSchema,
      unavailableProductSchema,
      signUpSchema,
      signInSchema,
      resetPasswordSchema,
    },
  };
});
