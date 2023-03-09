import React from "react";
import "../styles/Post.css";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import {Link} from 'react-router-dom'

const Post = (props) => {
  const {title, subtitle, thumbnail, date, time, category, author, clickAction} = props;
  const {isProfile, isBookmark} = props;
  return (
    <div className="post-container" >
      {isProfile ? <></>: <div className="post-author">
        <img className="author-img" src="./assets/author.png" onClick={clickAction}></img>
        <h2 className="author-name">{author}</h2>
      </div>}

      <Link to='/article'>
      {/* <Link> */}

      <div className="post" onClick={clickAction}>
        <div className="post-text">
          <h1 className="post-title">
            {title}
          </h1>
          <h2 className="post-subtitle">
            {subtitle}
          </h2>
          <div className="post-info-container">
            <div className="post-info">
              <h3 className="post-date">{date}</h3>
              <h3 className="post-time">{time} min read</h3>
              <div className="post-category-container">
                <h3 className="post-category">{category}</h3>
              </div>
            </div>
            {/* <div className="bookmark">
              {isBookmark ? <BookmarkRemoveIcon fontSize="large"/> : <></>}
            </div> */}
          </div>
        </div>

        <div className="post-thumbnail-container">
            <img className="post-thumbnail" src={thumbnail}></img>
        </div>
      </div>
      </Link>
      
    </div>
  );
};

export default Post;
