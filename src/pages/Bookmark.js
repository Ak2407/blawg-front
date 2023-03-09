import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Post from "../components/Post";
import "../styles/Bookmark.css";
import Footer from "../components/Footer";
import { API_CLIENT } from "../shared/services/api-client";
import { useSelector, useDispatch } from "react-redux";
import { addPost } from "../store/slices/PostSlice";
import Button from "../components/button";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Bookmark = () => {
  const dispatch = useDispatch();
  const [bookmark, setBookmark] = useState([]);
  const [posts, setPosts] = useState([]);

  const userData = useSelector((state) => {
    return state.users.slice(-1)[0];
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
    async function fetchPost(bookmark) {
      // console.log("called");
      const promise = await API_CLIENT.post(process.env.REACT_APP_FIND_POST, {
        postId: bookmark.post,
      })
        .then((res) => {
          if (res.data.success) {
            setPosts((post) => [...post, res.data.data]);
            // setPosts([...posts, res.data.data]);
          }
        })
        .catch((err) => {
          alert("Error !! Try again after some time");
        });
    }

    async function fetchBookmark() {
      const promise = await API_CLIENT.post(
        process.env.REACT_APP_GET_BOOKMARK_URL,
        {
          user: userData.user,
        }
      )
        // setPost([...post, bookmark.post])
        .then((res) => {
          if (res.data.success) {
            // console.log(res.data.data);
            setBookmark(res.data.data);
            const temp = res.data.data;
            temp.map((bookmark) => {
              fetchPost(bookmark);
            });
          }
        })
        .catch((err) => {
          alert("Error !! Try again after some time");
          // setIsLoad(false);
        });
    }
    fetchBookmark();
  }, []);

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

  const removeBookmark = async (postId) => {
    const promise = await API_CLIENT.post(
      process.env.REACT_APP_DELETE_BOOKMARK_URL,
      {
        user: userData.user,
        post: postId,
      }
    )
      // setPost([...post, bookmark.post])
      .then((res) => {
        
        if (res.data.success) {
          window.location.reload();
          toast(res.data.message, {
              
            style: {
              borderRadius: "25px",
              background: "#333",
              color: "#fff",
            },
          });
        }
      })
      .catch((err) => {
        alert("Error !! Try again after some time");
        // setIsLoad(false);
      });
  };

  const renderedPosts = posts.map((post) => (
    <div className="bookmark-post">
      <Post
        key={post._id}
        title={post.title}
        subtitle={post.subtitle}
        thumbnail={post.thumbnail}
        date={post.date.split(" ", 3).slice(1, 3).join(" ")}
        time={post.time}
        category={post.category.toUpperCase()}
        author={post.author}
        isBookmark="true"
        clickAction={() => {
          redirectPost(post._id, post.authorId);
        }}
      />
       <Button btnText="REMOVE" onClick={() => removeBookmark(post._id)} /> 
     </div> 


  ));

  return (
    <div className="bookmarks">
      <Navbar />
      <div className="bookmarks-page">
        <Header txt={`Bookmarks for , ${userData.name.split(" ")[0]}`} />
        <div className="bookmark-posts">{renderedPosts}</div>
        <div className="bookmark-footer">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Bookmark;
