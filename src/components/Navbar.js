import React from "react";
import Button from "./button";
import { BUTTON_TYPES } from "../data/buttons";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { removeUser } from "../store/slices/UserSlice";
import { useDispatch } from "react-redux";

import "../styles/Navbar.css";
import { NAVBAR_TYPES } from "../data/navbar";
import { toast } from "react-hot-toast";

const Navbar = (props) => {
  const data = useSelector((state) => {
    return state.users.slice(-1)[0];
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const doLogout = () => {
  //   localStorage.removeItem("TOKEN");
  //   // localStorage.removeItem('persist:root');
  //   dispatch(removeUser());
  // };

  const { type, isLogout } = props;
  const getNavClass = () => {
    switch (type) {
      case NAVBAR_TYPES.PRIMARY:
        return "mainNav navbar";
      case NAVBAR_TYPES.SECONDARY:
        return "homeNav navbar";
      case NAVBAR_TYPES.TERTIARY:
        return "logoutNav navbar";

      default:
        return "mainNav navbar";
    }
  };
  return (
    <div className={`${getNavClass()}`}>
      <div className="logo-holder">
        <Link to="/home">
          <img className="logo" src="./assets/logo.png"></img>
        </Link>
      </div>
      <div className="link-holder">
        <div className="nav-link-holder">
          <Link className="nav-link" to="/newpost">
            <Button type={BUTTON_TYPES.TERTIARY} btnText="WRITE" />
          </Link>
          <Link className="nav-link" to="/bookmark">
            <Button type={BUTTON_TYPES.TERTIARY} btnText="BOOKMARKS" />
          </Link>
          <Link className="nav-link" to='https://akshit-resume.vercel.app/' target="_blank">
            <Button type={BUTTON_TYPES.TERTIARY} btnText="CONTACT" />
          </Link>
        </div>
        <div className="profile-holder">
          <div className="vertical-line"></div>
          {isLogout ? (
            <button
              className="logout-btn"
              onClick={() => {
                toast("Logged Out Successfully", {
              
                  style: {
                    borderRadius: "25px",
                    background: "#333",
                    color: "#fff",
                  },
                });
                navigate("/");
                dispatch(removeUser());
              }}
            >
              LOGOUT
            </button>
          ) : (
            <>
              <h1 className="user-name">{data.name.split(" ")[0].toUpperCase()}</h1>
              <Link className="user-img-link" to="/profile">
                {/* {isLogout ? <Link to='/signup'><button className="logout-btn">LOGOUT</button></Link> : <><h1 className="user-name">{getUserName()}</h1><Link className="user-img-link" to='/profile'> */}
                <img className="user-img" src="./assets/profile.png"></img>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
