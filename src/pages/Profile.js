import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { NAVBAR_TYPES } from "../data/navbar";
import Button from "../components/button";
import Post from "../components/Post";
import "../styles/Profile.css";
import Header from "../components/Header";
import Edit from "./Edit";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { API_CLIENT } from "../shared/services/api-client";
import { addPost } from "../store/slices/PostSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import  {useNavigate} from  'react-router-dom'
import { toast } from "react-hot-toast";

export const Profile = () => {
  const [post, setPost] = useState([]);
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

  useEffect(() => {
    async function fetchPosts() {
      const promise = await API_CLIENT.post(
        process.env.REACT_APP_FIND_POST_BY_USER,
        data
      )
        .then((res) => {
          if (res.data.success) {
            console.log(res.data);
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

  const redirectPost = (postId, authorId) => {
    dispatch(
      addPost({
        postId: postId,
        authorId: authorId,
      })
    );
  };

  const deletePost = async (postId) => {
      const promise =  await API_CLIENT.post(
        process.env.REACT_APP_DELETE_POST,
        {
          post : postId
        }
      )
        .then((res) => {
          toast(res.data.message, {
              
            style: {
              borderRadius: "25px",
              background: "#333",
              color: "#fff",
            },
          });
          if (res.data.success) {
            window.location.reload();
          }
        })
        .catch((err) => {
          alert("Error !! Try again after some time");
          // setIsLoad(false);
        });
  }

  const editPost = (post) =>{
    dispatch(
      addPost({
        postId: post,
      })
    );
    navigate("/editpost");
  }

  const renderedPosts = post.map((post) => (
    <div className="profile-post-container">
      <Post
        key={post._id}
        title={post.title}
        subtitle={post.subtitle}
        thumbnail={post.thumbnail}
        date={post.date.split(" ", 3).slice(1, 3).join(" ")}
        time={post.time}
        category={post.category.toUpperCase()}
        author={post.author}
        clickAction={() => {
          redirectPost(post._id, post.authorId);
        }}
      />
      <div className="profile-action-container">
        <EditIcon fontSize="large" onClick = {() => editPost(post._id)}/>
        <DeleteIcon fontSize="large" onClick = {() => deletePost(post._id)}/>
      </div>
    </div>
  ));

  return (
    <div className="profile">
      <Navbar type={NAVBAR_TYPES.PRIMARY} isLogout="true" />
      <div className="profile-page">
        <div className="profile-info">
          <div className="profile-card">
            <img className="profile-img" src="./assets/profile.png"></img>
            <h1 className="profile-name">{data.name}</h1>
            <div className="profile-job-container">
              <h1 className="profile-job">{data.job}</h1>
            </div>
            <h2 className="profile-bio">{data.bio}</h2>
            <div className="edit-btn-container">
              <Link>
                <a className="edit-btn">EDIT</a>
              </Link>
            </div>
          </div>
          {/* <div className="profile-socials">
            <div className="social-container">
              <img className="social-img" src="./assets/reddit.png"></img>
              <div className="social-link-container">
                <h2 className="social-link">REDDIT</h2>
              </div>
            </div>
            <div className="social-container">
              <img className="social-img" src="./assets/twitter.png"></img>
              <div className="social-link-container">
                <h2 className="social-link">TWITTER</h2>
              </div>
            </div>
            <div className="social-container">
              <img className="social-img" src="./assets/linkedin.png"></img>
              <div className="social-link-container">
                <h2 className="social-link">LINKEDIN</h2>
              </div>
            </div>
          </div> */}
        </div>
        <div className="profile-post">
          <Header txt={`Recent Post from, ${data.name.split(" ")[0]}`} />
          <div className="profile-posts">{renderedPosts}</div>
          {/* <div className="profile-post-more">
            <Button btnText="SHOW MORE" />
          </div> */}
        </div>
      </div>
    </div>
  );
};
