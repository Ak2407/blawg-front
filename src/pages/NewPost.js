import React, { useEffect, useState } from "react";
import "../styles/NewPost.css";
import OverLapInput from "../components/OverLapInput";
import Navbar from "../components/Navbar";
import Button from "../components/button";
import { BUTTON_TYPES } from "../data/buttons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Header from "../components/Header";
import { useFormik } from "formik";
import { postSchema } from "../schemas";
import { API_CLIENT } from "../shared/services/api-client";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const NewPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const data = useSelector((state) => {
    return state.users.slice(-1)[0];
  });

  useEffect(() => {
    const token = localStorage.getItem('TOKEN')
    if (!token) {
      toast("Login into your account first", {
              
        style: {
          borderRadius: "25px",
          background: "#333",
          color: "#fff",
        },
      });
        navigate('/')
    }
}, [])

  const initialValues = {
    title: "",
    subtitle: "",
    content: "",
    category: "programming",
    thumbnail: "",
    authorId: data.user,
  };
  const { values, errors, touched, handleBlur, handleSubmit, handleChange } =
    useFormik({
      initialValues: initialValues,
      validationSchema: postSchema,
      onSubmit: (values, action) => {
        // console.log(values);
        API_CLIENT.post(process.env.REACT_APP_CREATE_POST_URL, values)
        .then((res) => {
          toast(res.data.message, {
              
            style: {
              borderRadius: "25px",
              background: "#333",
              color: "#fff",
            },
          });
          if (res.data.success) {
            navigate('/home');
          }
          // setIsLoad(false);
        })
        .catch((err) => {
          console.log(err);
          alert("Error !! Try again after some time");
          // setIsLoad(false);
        });
      },
    });

  return (
    <div className="newpost">
      <Navbar />
      <div className="newpost-page">
        <Header txt="Unleash Your Thoughts Here" />
        <div className="newpost-inputs-container">
          <form onSubmit={handleSubmit} className="newpost-form">
            <textarea
              className="title-input"
              id="title"
              name="title"
              placeholder="Title"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
            ></textarea>
            {errors.title && touched.title ? (
              <p className="newpost-form-error">{errors.title}</p>
            ) : null}
            <textarea
              className="subtitle-input"
              placeholder="Subtitle"
              id="subtitle"
              name="subtitle"
              value={values.subtitle}
              onChange={handleChange}
              onBlur={handleBlur}
            ></textarea>
            {errors.subtitle && touched.subtitle ? (
              <p className="newpost-form-error">{errors.subtitle}</p>
            ) : null}
            <textarea
              className="subtitle-input"
              placeholder="Thumbnail"
              id="thumbnail"
              name="thumbnail"
              value={values.thumbnail}
              onChange={handleChange}
              onBlur={handleBlur}
            ></textarea>
            {errors.thumbnail && touched.thumbnail ? (
              <p className="newpost-form-error">{errors.thumbnail}</p>
            ) : null}
            <textarea
              className="content-input"
              placeholder="Content"
              id="content"
              name="content"
              value={values.content}
              onChange={handleChange}
              onBlur={handleBlur}
            ></textarea>
            {errors.content && touched.content ? (
              <p className="newpost-form-error">{errors.content}</p>
            ) : null}
            <select
              className="category-input"
              id="category"
              name="category"
              value={values.category}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="programming">PROGRAMMING</option>
              <option value="food">FOOD</option>
              <option value="cars">CARS</option>
              <option value="health">HEALTH</option>
              <option value="news">NEWS</option>
            </select>
            {
              <div className="newpost-publish">
                <Button
                  btnText="PUBLISH"
                  type={BUTTON_TYPES.PUBLISH}
                  actionType="submit"
                />
              </div>
            }
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewPost;
