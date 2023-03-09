import React, { useEffect, useState } from "react";
import Button from "../components/button";
import { BUTTON_TYPES } from "../data/buttons";
import toast from "react-hot-toast";
import "../styles/Login.css";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import { addUser } from "../store/slices/UserSlice";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { API_CLIENT } from "../shared/services/api-client";
import { loginSchema } from "../schemas";

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const [isLoad, setIsLoad] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {

    async function checkUser() {
        const token = localStorage.getItem('TOKEN');
        if (token) {
            const response = await API_CLIENT.get(process.env.REACT_APP_AUTHENTICATE_URL, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (response.status === 200) {
                navigate('/home');
            }

        }
    }
    checkUser();
},)


  const { values, handleBlur, handleSubmit, handleChange, errors, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: loginSchema,
      onSubmit: (values, action) => {
        setIsLoad(true);
        API_CLIENT.post(process.env.REACT_APP_LOGIN_URL, values)
          .then((res) => {
            
            if(res.data.success) {
              toast(res.data.message, {
              
                style: {
                  borderRadius: "25px",
                  background: "#333",
                  color: "#fff",
                },
              });
              localStorage.setItem("TOKEN", res.data.token);
              res.data.token = undefined;
              res.data.message = undefined;
              dispatch(addUser(res.data));
              console.log(res.data);
              navigate('/home');

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

  const handleSign = () => {
    toast("Start Your Journey", {
      icon: "😁",
      style: {
        borderRadius: "25px",
        background: "#333",
        color: "#fff",
      },
    });
  };
  return (
    <>
      <div className="login">
        <div className="login-navbar">
          <img className="logo" src="./assets/logo.png"></img>
          <div className="signup-btn">
            <Link className="sign-btn" to="/signup">
              <Button
                type={BUTTON_TYPES.SECONDARY}
                btnText="SIGNUP"
                onClick={handleSign}
              />
            </Link>
          </div>
        </div>

        <div className="login-wrapper">
          <div className="login-box-wrapper">
            <div className="login-box">
              <div className="login-text">
                <h1 className="login-title">LOGIN</h1>
                <h2 className="login-subtitle">
                  Enter Your Login Details Below
                </h2>
              </div>

              <div className="login-form">
                <form onSubmit={handleSubmit}>
                  <input
                    className="form-input"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter Your Email"
                    autocomplete="off"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  ></input>
                  {errors.email && touched.email ? (
                    <p className="form-error">{errors.email}</p>
                  ) : null}
                  <input
                    className="form-input"
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
                  <a className="forgot">Forgot Password?</a>
                  <div className="loginBtn">
                    {isLoad ? (
                      <CircularProgress />
                    ) : (
                      <Button
                        btnText="LOG IN"
                        type={BUTTON_TYPES.PRIMARY}
                        actionType="submit"
                      />
                    )}
                  </div>
                </form>
              </div>
              {/* <Button
                className="login-btn"
                type={BUTTON_TYPES.PRIMARY}
                btnText="LOG IN"
              /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
