import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../partials/Header";
import Newsletter from "../partials/Newsletter";
import Footer from "../partials/Footer";
import ApplyUrl from "../partials/ApplyUrl";
import parse from "html-react-parser";
import { useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

function JobPost() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [crawledJobs, setCrawledJobs] = useState("");

  useEffect(() => {
    const fetchCrawledJob = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:4000/${id}`);
        setCrawledJobs(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchCrawledJob();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <ClipLoader
            color={"#000"}
            loading={loading}
            size={80}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div className="flex flex-col min-h-screen overflow-hidden">
          {/* Site header */}
          <Header />

          {/* Page content */}
          <main className="grow">
            {/* Page content */}
            <section>
              <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="pt-28 pb-8 md:pt-36 md:pb-16">
                  <div
                    className="md:flex md:justify-between"
                    data-sticky-container
                  >
                    {/* Sidebar */}
                    <ApplyUrl />

                    {/* Main content */}
                    <div className="md:grow">
                      {/* Job description */}
                      <div className="pb-8">
                        <div className="mb-4">
                          <Link
                            className="text-myred font-bold text-lg tracking-normal"
                            to="/"
                          >
                            <span className="   tracking-normal">&lt;-</span>{" "}
                            All Jobs
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
      )}
    </div>
  );
}

export default JobPost;
