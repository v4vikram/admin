// src/utils/validationSchemas.js

import * as Yup from "yup";

export const registerValidationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const productCreateSchema = Yup.object().shape({
  title: Yup.string().required("Product title is required"),
  content: Yup.string().required("Description is required"),
  shortDescription: Yup.string().required("Short description is required"),
  category: Yup.string().required("Category is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .required("Price is required"),
  salePrice: Yup.number()
    .typeError("Sale price must be a number")
    .notRequired()
    .when("discountPrice", {
      is: (discountPrice) => discountPrice && discountPrice > 0,
      then: Yup.number().lessThan(
        Yup.ref("price"),
        "Sale price cannot be higher than normal price"
      ),
    }),
  discountPrice: Yup.number()
    .typeError("Discount price must be a number")
    .notRequired()
    .lessThan(
      Yup.ref("price"),
      "Discount price must be less than normal price"
    ),
  isBestSeller: Yup.boolean().notRequired(),
  currency: Yup.string().required("Currency is required"),
  weight: Yup.number().typeError("Weight must be a number").notRequired(),
  length: Yup.number().typeError("Length must be a number").notRequired(),
  width: Yup.number().typeError("Width must be a number").notRequired(),
  height: Yup.number().typeError("Height must be a number").notRequired(),
  stock: Yup.number()
    .typeError("Stock must be a number")
    .required("Stock is required"),
  stockStatus: Yup.string().required("Stock status is required"),
  color: Yup.string().notRequired(),
  size: Yup.string().notRequired(),
  sku: Yup.string().notRequired(),
  tags: Yup.string().notRequired(),
  shippingClass: Yup.string().notRequired(),
  freeShipping: Yup.string().oneOf(["yes", "no"], "Must be yes or no"),
  slug: Yup.string().matches(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Invalid slug format"
  ),
  labels: Yup.string().notRequired(),
  status: Yup.string()
    .oneOf(["published", "draft", "pending"], "Invalid status")
    .required("Status is required"),
});
