import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

export const formSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Required"),
  name: yup
    .string()
    .min(5, "Name length must be greater than 4")
    .required("Required"),
  password: yup
    .string()
    .min(6, "Password length must be greater than 6")
    .matches(passwordRules, {
      message:
        "Please create a stronger password( atleast 1 uppercase, 1 lowercase letter and 1 numeric digit)",
    })
    .required("Required"),
});

export const editSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Required"),
  name: yup
    .string()
    .min(5, "Name length must be greater than 4")
    .required("Required"),
});

export const passwordSchema = yup.object().shape({
  newPassword: yup
    .string()
    .min(6, "Password length must be greater than 6")
    .matches(passwordRules, {
      message:
        "Please create a stronger password( atleast 1 uppercase, 1 lowercase letter and 1 numeric digit)",
    })
    .required("Required"),
});

export const orderSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Required"),
  street: yup.string().required("Required"),
  city: yup.string().required("Required"),
  postnumber: yup.number().required("Required"),
  country: yup.string().required("Required"),
});
