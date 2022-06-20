import * as Yup from "yup";

export const RegisterSchema = Yup.object().shape({
  firstName: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
  lastName: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  sex: Yup.string().required("Required"),
  age: Yup.number()
    .integer("Must be an integer")
    .min(18, "Age must be between 18 and 99")
    .max(99, "Age must be between 18 and 99")
    .required("Required"),
});

export const PasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password too long")
    .required("Required"),
});

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password too long")
    .required("Required"),
});

export const isThereEmptyField = (obj: any) => {
  for (const key in obj) {
    if (!obj[key]) {
      return true;
    }
  }
  return false;
};

export const objLength = (obj: Object) => Object.keys(obj).length;
