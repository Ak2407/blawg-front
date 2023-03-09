import * as Yup from "yup";

export const signUpSchema = Yup.object({
  name: Yup.string().min(2).max(25).required("Name input Cannot be empty"),
  email: Yup.string().email().required("Email field cannot be empty"),
  password: Yup.string().min(6).required("Password field cannot be empty"),
  confirm_password: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "Password must match"),
  job: Yup.string().min(3).max(20).required("Job input Cannot be empty"),
  bio: Yup.string().min(10).max(50).required("Bio input Cannot be empty"),
});

export const loginSchema = Yup.object({
  email: Yup.string().email().required("Email field cannot be empty"),
  password: Yup.string().required("Password field cannot be empty"),
});

export const postSchema = Yup.object({
  title: Yup.string().min(2).max(50).required("Title Cannot be empty"),
  subtitle: Yup.string().min(2).max(60).required("Subtitle Cannot be empty"),
  content: Yup.string().min(50).max(10000).required("Content Cannot be empty"),
  thumbnail: Yup.string().required("Thumbnail Cannot be empty"),
});
