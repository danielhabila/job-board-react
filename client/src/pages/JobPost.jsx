import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../partials/Header";
import Newsletter from "../partials/Newsletter";
import Footer from "../partials/Footer";
import Image04 from "../images/company-icon-04.svg";
import Image11 from "../images/company-icon-11.svg";
import feb16 from "../jobsDB/feb16.json";
import ApplyUrl from "../partials/ApplyUrl";
import parse from "html-react-parser";
import { useParams } from "react-router-dom";

function JobPost() {
  const { id } = useParams();

  const [crawledJobs, setCrawledJobs] = useState("");

  useEffect(() => {
    const fetchCrawledJob = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/${id}`);
        setCrawledJobs(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCrawledJob();
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Site header */}
      <Header />

      {/* Page content */}
      <main className="grow">
        {/* Page content */}
        <section>
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-28 pb-8 md:pt-36 md:pb-16">
              <div className="md:flex md:justify-between" data-sticky-container>
                {/* Sidebar */}
                <ApplyUrl />

                {/* Main content */}
                <div className="md:grow">
                  {/* Job description */}
                  <div className="pb-8">
                    <div className="mb-4">
                      <Link className="text-myred font-medium" to="/">
                        <span className="   tracking-normal">&lt;-</span> All
                        Jobs
                      </Link>
                    </div>
                    <h1 className="text-4xl font-extrabold font-inter mb-10">
                      {crawledJobs && parse(crawledJobs.jobTitle)}
                      {/* {crawledJobs.jobTitle} */}
                    </h1>
                    {/* Job description */}
                    <div className="space-y-8 mb-8">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3">
                          The Role
                        </h3>
                        <div className="text-gray-500 space-y-3">
                          {crawledJobs && parse(crawledJobs.jobDescription)}
                          {/* {crawledJobs.jobDescription} */}
                        </div>
                      </div>
                    </div>
                    {/* Social share */}
                    <div className="flex items-center justify-end space-x-4">
                      <div className="text-xl text-gray-400">Share job</div>
                      <ul className="inline-flex space-x-3">
                        <li>
                          <a
                            className="flex justify-center items-center text-indigo-500 bg-indigo-100 hover:text-white hover:bg-indigo-500 rounded-full transition duration-150 ease-in-out"
                            href="#0"
                            aria-label="Twitter"
                          >
                            <svg
                              className="w-8 h-8 fill-current"
                              viewBox="0 0 32 32"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M24 11.5c-.6.3-1.2.4-1.9.5.7-.4 1.2-1 1.4-1.8-.6.4-1.3.6-2.1.8-.6-.6-1.5-1-2.4-1-1.7 0-3.2 1.5-3.2 3.3 0 .3 0 .5.1.7-2.7-.1-5.2-1.4-6.8-3.4-.3.5-.4 1-.4 1.7 0 1.1.6 2.1 1.5 2.7-.5 0-1-.2-1.5-.4 0 1.6 1.1 2.9 2.6 3.2-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1.4 1.3 1.6 2.3 3.1 2.3-1.1.9-2.5 1.4-4.1 1.4H8c1.5.9 3.2 1.5 5 1.5 6 0 9.3-5 9.3-9.3v-.4c.7-.5 1.3-1.1 1.7-1.8z" />
                            </svg>
                          </a>
                        </li>
                        <li>
                          <a
                            className="flex justify-center items-center text-indigo-500 bg-indigo-100 hover:text-white hover:bg-indigo-500 rounded-full transition duration-150 ease-in-out"
                            href="#0"
                            aria-label="Facebook"
                          >
                            <svg
                              className="w-8 h-8 fill-current"
                              viewBox="0 0 32 32"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M14.023 24 14 17h-3v-3h3v-2c0-2.7 1.672-4 4.08-4 1.153 0 2.144.086 2.433.124v2.821h-1.67c-1.31 0-1.563.623-1.563 1.536V14H21l-1 3h-2.72v7h-3.257Z" />
                            </svg>
                          </a>
                        </li>
                        <li>
                          <a
                            className="flex justify-center items-center text-indigo-500 bg-indigo-100 hover:text-white hover:bg-indigo-500 rounded-full transition duration-150 ease-in-out"
                            href="#0"
                            aria-label="Telegram"
                          >
                            <svg
                              className="w-8 h-8 fill-current"
                              viewBox="0 0 32 32"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M22.968 10.276a.338.338 0 0 0-.232-.253 1.192 1.192 0 0 0-.63.045s-14.019 5.038-14.82 5.596c-.172.121-.23.19-.259.272-.138.4.293.573.293.573l3.613 1.177a.388.388 0 0 0 .183-.011c.822-.519 8.27-5.222 8.7-5.38.068-.02.118 0 .1.049-.172.6-6.606 6.319-6.64 6.354a.138.138 0 0 0-.05.118l-.337 3.528s-.142 1.1.956 0a30.66 30.66 0 0 1 1.9-1.738c1.242.858 2.58 1.806 3.156 2.3a1 1 0 0 0 .732.283.825.825 0 0 0 .7-.622s2.561-10.275 2.646-11.658c.008-.135.021-.217.021-.317a1.177 1.177 0 0 0-.032-.316Z" />
                            </svg>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <Newsletter />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Site footer */}
      <Footer />
    </div>
  );
}

export default JobPost;
