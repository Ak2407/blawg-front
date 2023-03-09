import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { NAVBAR_TYPES } from "../data/navbar";
import Button from "../components/button";
import "../styles/Home.css";
import Post from "../components/Post";
import SearchIcon from "@mui/icons-material/Search";
import { API_CLIENT } from "../shared/services/api-client";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addPost } from "../store/slices/PostSlice";
import { toast } from "react-hot-toast";

const Home = () => {
  const dispatch = useDispatch();
  const [nav, setNav] = useState(false);
  const [search, setSearch] = useState("");
  const [post, setPost] = useState([]);
  const [isLoad, setIsLoad] = useState(true);
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

  const redirectPost = (postId, authorId) => {
    console.log("post : " + postId + " author : " + authorId);
    dispatch(
      addPost({
        postId: postId,
        authorId: authorId,
      })
    );
    console.log(authorId);
  };

  useEffect(() => {
    async function fetchPosts() {
      const promise = await API_CLIENT.post(process.env.REACT_APP_GET_POSTS_URL)
        .then((res) => {
          if (res.data.success) {
            setPost(res.data.data);
          }
        })
        .catch((err) => {
          alert("Error !! Try again after some time");
          // setIsLoad(false);
        });
    }

    fetchPosts();
  }, []);

  const getStarted = () => {
    window.scrollTo({ top: 1000, left: 0, behavior: "smooth" });
  };

  function checkNav() {
    if (window.scrollY >= 20) {
      setNav(true);
    } else {
      setNav(false);
    }
  }

  const renderedPosts = post
    .filter((post) => {
      return search.toLowerCase() === ""
        ? post
        : post.title.toLowerCase().includes(search.toLowerCase());
    })
    .map((post) => (
      <Post
        key={post._id}
        title={post.title}
        subtitle={post.title}
        thumbnail={post.thumbnail}
        date={post.date.split(" ", 3).slice(1, 3).join(" ")}
        time={post.time}
        category={post.category.toUpperCase()}
        author={post.author}
        clickAction={() => {
          redirectPost(post._id, post.authorId);
        }}
      />
    ));

  window.addEventListener("scroll", checkNav);

  return (
    <>
      <div className="home">
        <div className="home-nav">
          <Navbar
            type={`${nav ? NAVBAR_TYPES.PRIMARY : NAVBAR_TYPES.SECONDARY}`}
          />
        </div>
        <div className="landing-page">
          <div className="landing-left">
            <div className="blawg-adj-container">
              <h1 className="blawg-adj">Best Blogging Website</h1>
            </div>
            <h1 className="hero-title">
              Your all in one stop for Latest and Relevant News and Articles
            </h1>
            <h2 className="hero-subtitle">
              Manipulate the world with your ideas and thoughts and them
              manipulate you
            </h2>
            <div className="get-started-container">
              <div className="get-started-btn-container">
                <Button btnText="Get Started" onClick={getStarted} />
              </div>
              <div className="arrow-container">
                <img className="arrow" src="./assets/arrow.png"></img>
              </div>
            </div>
          </div>
          <div className="landing-right">
            <img className="hero-img" src="./assets/landing.png"></img>
          </div>
        </div>
        <div className="latest-articles">
          <div className="articles-left">{renderedPosts}</div>
          <div className="articles-right">
            {/* <div className="topics">
              <h1 className="topics-text">
                Discover From These Trending Topics ,{" "}
              </h1>
              <div className="topics-box">
                <div className="topic-container">
                  <a className="topic">Programming</a>
                </div>
                <div className="topic-container">
                  <a className="topic">Cooking</a>
                </div>
                <div className="topic-container">
                  <a className="topic">HealthCare</a>
                </div>
                <div className="topic-container">
                  <a className="topic">Bikes</a>
                </div>
                <div className="topic-container">
                  <a className="topic">Household</a>
                </div>
                <div className="topic-container">
                  <a className="topic">Politics</a>
                </div>
              </div>
            </div> */}
            <div className="search">
              <h1 className="search-text">Search your interest ,</h1>
              <div className="searchbar-container">
                <input
                  onChange={(e) => setSearch(e.target.value)}
                  className="searchbar"
                  placeholder="Type topics you want to see"
                ></input>
              </div>
            </div>
            <div className="articles-footer">
              <a className="footer-link">Contact Us</a>
              <a className="footer-link">Help</a>
              <a className="footer-link">Privacy</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
