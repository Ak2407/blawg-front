import React, { useState } from "react";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Post from "./components/Post";
import { Profile } from "./pages/Profile";
import Bookmark from "./pages/Bookmark";
import NewPost from "./pages/NewPost";
import Article from "./pages/Article";
import EditPage from "./pages/EditPage";
import Edit from "./pages/Edit";
import EditPost from "./pages/EditPost";

function App() {
  

  return (
    <>
      <div>
        <Toaster position="top-right"></Toaster>
      </div>
      <div className="app">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/bookmark" element={<Bookmark />} />
            <Route path="/newpost" element={<NewPost />} />
            <Route path="/article" element={<Article />} />
            {/* <Route path="/edit" element={<Edit />} /> */}
            <Route path="/editpost" element={<EditPost />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
