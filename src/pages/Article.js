import React, { useEffect, useState } from "react";
import "../styles/Article.css";
import ArticleCard from "../components/ArticleCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSelector, useDispatch } from "react-redux";
import { API_CLIENT } from "../shared/services/api-client";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Article = () => {
  const [isLoad, setIsLoad] = useState(true);
  const [postData, setPostData] = useState([]);
  const [userData, setUserData] = useState([]);
  const data = useSelector((state) => {
    return state.posts.slice(-1)[0];
  });
  
  const navigate = useNavigate();
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

  useEffect(() => {
    async function fetchPost() {
      const promise = await API_CLIENT.post(
        process.env.REACT_APP_FIND_POST,
        data
      );
      if (promise) {
        console.log(promise.data.data)
        setPostData(promise.data.data);
        setIsLoad(false);
      } else {
        console.log("Network error");
      }
    }

    fetchPost();

    async function fetchUser() {
      const promise = await API_CLIENT.post(
        process.env.REACT_APP_FIND_USER,
        data
      );
      if (promise) {
        console.log(promise);
        setUserData(promise.data.result);
        setIsLoad(false);
      } else {
        console.log("Network error");
      }
    }

    fetchUser();
  }, []);

  return (
    <div className="article">
      <div className="article-nav">
        <Navbar />
      </div>
      <div className="article-page">
        <div className="article-left">
          {isLoad ? (
            <CircularProgress />
          ) : (
            <ArticleCard
              title={postData.title}
              subtitle={postData.subtitle}
              // date={postData.date.split(" ", 3).slice(1,3).join(' ')}
              time={postData.time}
              category={postData.category}
              content={postData.content}
              thumbnail={postData.thumbnail}
            />
          )}
        </div>
        <div className="article-right">
          <div className="article-author-details">
            <img className="article-author-img" src="./assets/author.png"></img>
            <h1 className="article-author-name">{userData.name}</h1>
            <h1 className="article-author-bio">
              {userData.bio}
            </h1>
          </div>
          <div className="article-footer-contianer">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article;
