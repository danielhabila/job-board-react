import React, { useState, useEffect } from "react";
import CompanyIcon from "../images/company-icon-08.svg";
import axios from "axios";
import { useParams } from "react-router-dom";

const ApplyUrl = () => {
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
    <aside className="mb-8 md:mb-0 md:w-64 lg:w-72 md:ml-12 lg:ml-20 md:shrink-0 md:order-1">
      <div
        data-sticky
        data-margin-top="32"
        data-sticky-for="768"
        data-sticky-wrap
      >
        <div className="relative bg-gray-50 rounded-xl border border-gray-200 p-5">
          <div className="text-center mb-6">
            <img
              className="inline-flex mb-2"
              src={CompanyIcon}
              width="72"
              height="72"
              alt="Company 08"
            />
            <h2 className="text-lg font-bold text-gray-800">Medium Inc.</h2>
          </div>

          <div className="flex justify-center md:justify-start mb-5">
            <ul className="inline-flex flex-col space-y-2">
              <li className="flex items-center">
                <svg
                  className="shrink-0 fill-gray-400 mr-3"
                  width="14"
                  height="14"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.707 4.293a1 1 0 0 0-1.414 1.414L10.586 8H2V2h3a1 1 0 1 0 0-2H2a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h8.586l-2.293 2.293a1 1 0 1 0 1.414 1.414l4-4a1 1 0 0 0 0-1.414l-4-4Z" />
                </svg>
                <span className="text-sm text-gray-600">24 August, 2024</span>
              </li>
              <li className="flex items-center">
                <svg
                  className="shrink-0 fill-gray-400 mr-3"
                  width="14"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="7" cy="7" r="2" />
                  <path d="M6.3 15.7c-.1-.1-4.2-3.7-4.2-3.8C.7 10.7 0 8.9 0 7c0-3.9 3.1-7 7-7s7 3.1 7 7c0 1.9-.7 3.7-2.1 5-.1.1-4.1 3.7-4.2 3.8-.4.3-1 .3-1.4-.1Zm-2.7-5 3.4 3 3.4-3c1-1 1.6-2.2 1.6-3.6 0-2.8-2.2-5-5-5S2 4.2 2 7c0 1.4.6 2.7 1.6 3.7 0-.1 0-.1 0 0Z" />
                </svg>
                <span className="text-sm text-gray-600">
                  London, UK / Remote friendly
                </span>
              </li>
              <li className="flex items-center">
                <svg
                  className="shrink-0 fill-gray-400 mr-3"
                  width="16"
                  height="12"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M15 0H1C.4 0 0 .4 0 1v10c0 .6.4 1 1 1h14c.6 0 1-.4 1-1V1c0-.6-.4-1-1-1Zm-1 10H2V2h12v8Z" />
                  <circle cx="8" cy="6" r="2" />
                </svg>
                <span className="text-sm text-gray-600">$75K - $100K</span>
              </li>
            </ul>
          </div>

          <div className="max-w-xs mx-auto mb-5">
            <a
              className="btn w-full text-white bg-black hover:bg-black/80 group shadow-sm"
              href={crawledJobs.applyUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Apply Now
              <span className="tracking-normal text-indigo-200 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
                -&gt;
              </span>
            </a>
          </div>

          <div className="flex flex-col text-center btn w-full space-y-4">
            <p className="text-md font-bold text-gray-800">Share this job:</p>
            <input
              readonly=""
              className="rounded-xl btn w-full"
              type="text"
              value="https://remoteok.com/remote-jobs/remote-senior-front-end-developer-migaku-186757?ref=sh"
            />
          </div>
          <div className="text-center">
            <a className="text-sm  font-medium hover:underline" href="#0">
              Visit Website
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ApplyUrl;
