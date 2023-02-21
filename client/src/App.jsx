import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import "./css/style.css";

import Sticky from "sticky-js";

import Home from "./pages/Home";
import PostAJob from "./pages/PostAJob";
import JobPost from "./pages/JobPost";
import Pricing from "./partials/Pricing";
import Cancel from "./pages/Cancel";
import Success from "./pages/Success";
import FeedbackButton from "./partials/FeedbackButton";
import Community from "./pages/Community";

function App() {
  const location = useLocation();

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    const stickyEls = document.querySelectorAll("[data-sticky]");
    if (stickyEls.length > 0) {
      const sticky = new Sticky("[data-sticky]");
    }
  });

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/jobDescription/:id" element={<JobPost />} />
        <Route path="/community" element={<Community />} />
        <Route path="/post-a-job" element={<PostAJob />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
      </Routes>
      <FeedbackButton />
    </div>
  );
}

export default App;
