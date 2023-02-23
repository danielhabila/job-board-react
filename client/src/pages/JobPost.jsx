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
import Bubbles from "../partials/Bubbles";

function JobPost() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [crawledJobs, setCrawledJobs] = useState("");

  useEffect(() => {
    const fetchCrawledJob = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/${id}`);
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
                    {/* <ApplyUrl /> */}

                    {/* Main content */}
                    <div className="md:grow">
                      {/* Job description */}
                      <div className="pb-8">
                        <div className="mb-4">
                          <Link
                            className="text-myred font-semibold text-lg tracking-normal"
                            to="/"
                          >
                            <span className="  tracking-normal">&lt;-</span> All
                            Jobs
                          </Link>
                        </div>
                        <div className="my-8">
                          <h1 className=" md:text-3xl text-xl font-extrabold font-inter">
                            {crawledJobs && crawledJobs.jobTitle}
                          </h1>
                          <h3 className=" md:text-xl text-sm font-semibold font-inter">
                            {/* {crawledJobs && parse(crawledJobs.companyName)} */}
                            {crawledJobs && crawledJobs.companyName}
                          </h3>
                        </div>
                        {/* Job description */}
                        <div className="space-y-8 mb-8">
                          <div>
                            <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3">
                              The Role
                            </h3>
                            <div className="text-gray-500 space-y-3 text-sm md:text-base">
                              {crawledJobs && parse(crawledJobs.jobDescription)}
                              {/* {crawledJobs.jobDescription} */}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="hidden md:flex">
                        <Newsletter heading={"Send me job updates!"} />
                      </div>
                    </div>
                    {/* Sidebar/ApplyUrl */}
                    <div>
                      <div className="md:hidden">
                        <Bubbles crawledJobs={crawledJobs} />
                      </div>
                      <div className="hidden md:flex">
                        <ApplyUrl />
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
