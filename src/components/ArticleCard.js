import React, { useState, useEffect } from "react";
import "../styles/ArticleCard.css";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import { API_CLIENT } from "../shared/services/api-client";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

const ArticleCard = (props) => {
  const [bookmark, setBookmark] = useState(false);
  const userData = useSelector((state) => {
    return state.users.slice(-1)[0];
  });

  const postData = useSelector((state) => {
    return state.posts.slice(-1)[0];
  });

  const bookmarkData = {
    user: userData.user,
    post: postData.postId,
  };

  useEffect(() => {
    async function fetchBookmark() {
      const promise = await API_CLIENT.post(
        process.env.REACT_APP_FIND_BOOKMARK_URL,
        bookmarkData
      )
        .then((res) => {
          if (res.data.success) {
            setBookmark(true);
          }
        })
        .catch((err) => {
          alert("Error !! Try again after some time");
          // setIsLoad(false);
        });
    }

    fetchBookmark();
  }, []);

  const bookmarkClick = () => {
    if (bookmark) {
      const promise = API_CLIENT.post(
        process.env.REACT_APP_DELETE_BOOKMARK_URL,
        bookmarkData
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
            setBookmark(!bookmark);
          }
        })
        .catch((err) => {
          alert("Error !! Try again after some time");
          // setIsLoad(false);
        });
    } else {
      const promise = API_CLIENT.post(
        process.env.REACT_APP_CREATE_BOOKMARK_URL,
        bookmarkData
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
            setBookmark(!bookmark);
          }
        })
        .catch((err) => {
          alert("Error !! Try again after some time");
          // setIsLoad(false);
        });
    }
  };

  const { title, subtitle, date, time, content, thumbnail } = props;
  return (
    <div className="article-card">
      <div className="article-heading-container">
        <h2 className="article-heading">{title}</h2>
      </div>
      <div className="article-info-container">
        <div className="article-date-container">
          <h2 className="article-date">{date}</h2>
        </div>
        <div className="article-image-container">
          <img className="article-image" src={thumbnail}></img>
        </div>
        <div className="article-time-container">
          <h2 className="article-time">{time} min read</h2>
          {bookmark ? (
            <BookmarkRemoveIcon
              fontSize="large"
              className="article-bookmark"
              onClick={bookmarkClick}
            />
          ) : (
            <BookmarkAddIcon
              fontSize="large"
              className="article-bookmark"
              onClick={bookmarkClick}
            />
          )}
        </div>
        <div className="article-subtitle-container">
          <h2 className="article-subtitle">{subtitle}</h2>
        </div>
        <div className="article-content-container">
          <h2 className="article-content">{content}</h2>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
