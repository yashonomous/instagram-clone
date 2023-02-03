import {
  collection,
  onSnapshot,
  query,
  doc,
  setDoc,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import "../css/Home.css";
import Post from "./common/Post";
import db from "../common/firebase";
import { Button, FormControl, TextField } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axiosInstance from "../common/axios";
import CircularProgressWithLabel from "./common/CircularProgressWithLabel";
import { ToggleButton } from "@material-ui/lab";
import { Brightness4Rounded } from "@material-ui/icons";

const Home = ({ loggedInUser, setIsDarkModeOn, isDarkModeOn }) => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["username"]);
  const [posts, setPosts] = useState([]);
  const [caption, setCaption] = useState("");
  const [selectedFile, setSelectedFile] = useState([]);
  const [progress, setProgress] = useState(0);

  const handleLogout = () => {
    removeCookie("username", { path: "/" });
    navigate("/");
  };

  const handleSubmitPost = (event) => {
    event.preventDefault();
    console.log(selectedFile);

    let filename = selectedFile[0].name;

    console.log(filename);

    if (
      !filename.endsWith(".png") &&
      !filename.endsWith(".jpg") &&
      !filename.endsWith(".jpeg")
    ) {
      console.log("Only .png, .jpg and .jpeg formats allowed!!!");
      return;
    }

    let formData = new FormData();

    formData.append("image", selectedFile[0], selectedFile[0].name);

    // axiosInstance
    //   .post("/upload_file", formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //     onUploadProgress: (data) => {
    //       //Set the progress value to show the progress bar
    //       setProgress(Math.round((100 * data.loaded) / data.total));
    //     },
    //   })
    //   .then((response) => {
    //     console.log(response.data.filePath.path);
    //     setUploadedFilePath(response.data.filePath.path);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    axiosInstance
      .post(
        "https://api.imgbb.com/1/upload?key=0e5a5414a5bf8da95d37173c3126c344",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (data) => {
            //Set the progress value to show the progress bar
            setProgress(Math.round((100 * data.loaded) / data.total));
          },
        }
      )
      .then((response) => {
        let postDoc = doc(collection(db, "posts"));
        setDoc(postDoc, {
          avatarImageSrc: "path/to/image",
          caption,
          postImageSrc: response.data.data.url,
          username: cookies.username,
          createdAt: serverTimestamp(),
        }).then(() => {
          console.log("post uploaded!!!!");
          setCaption("");
          setSelectedFile([]);
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    if (!cookies.username) {
      console.log("please log in");
      navigate("/");
      return;
    }

    const postsQuery = query(
      collection(db, "posts"),
      orderBy("createdAt", "desc")
    );

    onSnapshot(postsQuery, (snapShot) => {
      setPosts(
        snapShot.docs.map((doc) => ({
          postId: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  return (
    <>
      {" "}
      <div className="home__header">
        <img
          className="home__headerImage"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1280px-Instagram_logo.svg.png"
          alt="ig-logo"
        />
        <ToggleButton
          selected={false}
          onClick={() => setIsDarkModeOn(!isDarkModeOn)}
        >
          <Brightness4Rounded />
        </ToggleButton>
        <Button variant="contained" color="secondary" onClick={handleLogout}>
          LOGOUT {cookies.username}
        </Button>
      </div>
      <div className="home__createPost">
        <div className="home__createPostContainer">
          <form
            className="home__createPostForm"
            action="http://localhost:8081/upload_file"
            method="post"
            encType="multipart/form-data"
            onSubmit={handleSubmitPost}
          >
            <FormControl className="home__formControl caption">
              <TextField
                className="home__captionTextField"
                type="text"
                label="caption"
                variant="filled"
                value={caption}
                onChange={({ target }) => {
                  setCaption(target.value);
                }}
                InputProps={{ disableUnderline: true }}
              />
            </FormControl>
            <FormControl className="home__formControl file">
              <TextField
                type="file"
                variant="filled"
                // value={selectedFile}
                onChange={({ target }) => {
                  //   debugger;
                  setSelectedFile(target.files);
                }}
                InputProps={{ disableUnderline: true }}
              />

              <FormControl className="home__formControl postButton">
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={!caption || !selectedFile}
                  // onClick={handleSubmitPost}
                >
                  Post
                </Button>
              </FormControl>
            </FormControl>
          </form>
          <div
            style={{
              alignSelf: "flex-start",
              position: "relative",
              top: "4.5vw",
            }}
          >
            <CircularProgressWithLabel value={progress} />
          </div>
        </div>
      </div>
      <div className="home__posts">
        {posts.map((post) => (
          <Post
            key={post.postId}
            post={post.data}
            isDarkModeOn={isDarkModeOn}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
