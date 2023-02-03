import React from "react";
import { Avatar } from "@material-ui/core";

import "../../css/Post.css";

const Post = ({ post, isDarkModeOn }) => {
  return (
    <div className="post__container">
      {/* header  = avatar + name*/}
      <div className="post__headerContainer">
        <Avatar
          className="post__headerAvatar"
          alt="Remy Sharp"
          src={post.avatarImageSrc}
        />
        <h3 className={isDarkModeOn ? "post__text dark" : "post__text"}>
          {post.username} 🚀
        </h3>
      </div>

      {/* image  = image*/}
      <div className="post__imageContainer">
        <img
          className="post__image"
          src={post.postImageSrc}
          alt="description"
        />
      </div>

      {/* caption  = name + caption*/}

      <div className="post__viewsContainer">
        <h5 className={isDarkModeOn ? "post__text dark" : "post__text"}>
          100 views
        </h5>
      </div>

      <div className="post__captionContainer">
        <h5 className={isDarkModeOn ? "post__text dark" : "post__text"}>
          <strong>{post.username} 🚀 : </strong> {post.caption}
        </h5>
      </div>
    </div>
  );
};

export default Post;
