import React, { useState } from "react";
import "../styles/Signup.css";
import Input from "../components/Input";
import Button from "../components/button";
import { BUTTON_TYPES } from "../data/buttons";
import { useFormik } from "formik";
import { signUpSchema } from "../schemas";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../store/slices/UserSlice";
import { API_CLIENT } from "../shared/services/api-client";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-hot-toast";

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirm_password: "",
  job: "",
  bio: "",
};

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoad, setIsLoad] = useState(false);
  const { values, errors, touched, handleBlur, handleSubmit, handleChange } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signUpSchema,
      onSubmit: (values, action) => {
        setIsLoad(true);
        API_CLIENT.post(process.env.REACT_APP_REGISTER_URL, values)
          .then((res) => {
            toast(res.data.message, {
              
              style: {
                borderRadius: "25px",
                background: "#333",
                color: "#fff",
              },
            });
            if (res.data.success) {
              localStorage.setItem("TOKEN", res.data.token);
              res.data.token = undefined;
              res.data.success = undefined;
              res.data.message = undefined;
              dispatch(addUser(res.data));

              navigate("/home");
            }
            setIsLoad(false);
          })
          .catch((err) => {
            console.log(err);
            alert("Error !! Try again after some time");
            setIsLoad(false);
          });
      },
    });

  // const addNewUser = (payload) => {};

  return (
    <div className="signup">
      <div className="left">
        <div className="left-text">
          <h1 className="signup-title">BLAWG</h1>
          <h2 className="signup-subtitle">A NEW AGE BLOGGING WEBSITE</h2>
        </div>
        <div className="left-img-wrapper">
          <img className="left-img" src="./assets/signup.png"></img>
        </div>
      </div>
      <div className="right">
        <h1 className="right-title">Get Started,</h1>
        <h1 className="right-heading">BLAWG</h1>
        <div className="signup-form">
          <form onSubmit={handleSubmit}>
            <input
              className="signup-form-input"
              type="name"
              id="name"
              name="name"
              placeholder="Enter Your Name"
              autocomplete="off"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            ></input>
            {errors.name && touched.name ? (
              <p className="form-error">{errors.name}</p>
            ) : null}
            <input
              className="signup-form-input"
              type="email"
              id="email"
              name="email"
              placeholder="Enter Your Email"
              autocomplete="off"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            ></input>
            {errors.email && touched.email ? (
              <p className="form-error">{errors.email}</p>
            ) : null}
            <input
              className="signup-form-input"
              type="password"
              id="password"
              name="password"
              placeholder="Enter Your Password"
              autocomplete="off"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            ></input>
            {errors.password && touched.password ? (
              <p className="form-error">{errors.password}</p>
            ) : null}
            <input
              className="signup-form-input"
              type="password"
              id="confirm_password"
              name="confirm_password"
              placeholder="Enter Your Password Again"
              autocomplete="off"
              value={values.confirm_password}
              onChange={handleChange}
              onBlur={handleBlur}
            ></input>
            {errors.confirm_password && touched.confirm_password ? (
              <p className="form-error">{errors.confirm_password}</p>
            ) : null}

            <select
              className="signup-form-input"
              id="job"
              name="job"
              autocomplete="off"
              value={values.job}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option>SDE</option>
              <option>DESIGNER</option>
              <option>STUDENT</option>
              <option>ARCHITECT</option>
              <option>COOK</option>
            </select>

            {errors.job && touched.job ? (
              <p className="form-error">{errors.job}</p>
            ) : null}
            <input
              className="signup-form-input"
              type="text"
              id="bio"
              name="bio"
              placeholder="Enter Your Bio"
              autocomplete="off"
              value={values.bio}
              onChange={handleChange}
              onBlur={handleBlur}
            ></input>
            {errors.bio && touched.bio ? (
              <p className="form-error">{errors.bio}</p>
            ) : null}
            <div className="right-btn">
              {isLoad ? (
                <CircularProgress />
              ) : (
                <Button
                  type={BUTTON_TYPES.PRIMARY}
                  // onClick={addNewUser(values)}
                  actionType="submit"
                  btnText="SIGN UP"
                />
              )}
            </div>
          </form>
        </div>
        <Link className="already" to="/">
          Already have an Account? <span className="sign-to-log">LogIn</span>
        </Link>
      </div>
    </div>
  );
};

export default Signup;
