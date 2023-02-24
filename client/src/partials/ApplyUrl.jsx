import React, { useState, useEffect, useRef } from "react";
import CompanyIcon from "../images/company-icon-08.svg";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
import {
  ClockIcon,
  CurrencyDollarIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

const ApplyUrl = () => {
  const { id } = useParams();
  const location = useLocation();

  const [crawledJobs, setCrawledJobs] = useState(false);

  useEffect(() => {
    const fetchCrawledJob = async () => {
      try {
        const res = await axios.get(`api/${id}`);
        setCrawledJobs(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCrawledJob();
  }, []);

  const inputRef = useRef(null);
  const [isCopied, setIsCopied] = useState(false);

  function copyURL() {
    inputRef.current.select();
    document.execCommand("copy");
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  }

  return (
    <aside className="mb-8 md:mb-0 md:w-64 lg:w-72 md:ml-12 lg:ml-20 md:shrink-0 md:order-1 ">
      <div className="relative bg-gray-50 rounded-xl border border-gray-200 px-4 py-6 ">
        {/* {!crawledJobs.companyLogo ? (
          <div className="text-center mb-4">
            <img
              className="inline-flex mb-2"
              src={crawledJobs.companyLogo}
              width="72"
              height="72"
              alt="Company 08"
            />
          </div>
        ) : (
          <div className="mx-auto bg-[#3f3c3c] rounded-full h-20 w-20 ring-2 ring-[#E5E7EA]"></div>
        )} */}

        {crawledJobs && (
          <div className="flex justify-center md:justify-start  ">
            <ul className="inline-flex flex-col space-y-2">
              {crawledJobs.jobType && crawledJobs.jobType.commitment !== "" ? (
                <li className="flex items-center">
                  <ClockIcon className="w-5 mr-3" />

                  <span className="text-sm text-gray-600 flex flex-col ">
                    {crawledJobs.jobType.commitment}
                    {" | "}
                    {crawledJobs.jobType.flexibility}
                    {" | "}
                    {crawledJobs.jobType.contract}
                  </span>
                </li>
              ) : (
                ""
              )}
              {crawledJobs.location ? (
                <div>
                  <li className="flex items-center">
                    <MapPinIcon className="w-5 mr-3" />
                    <span className="text-sm text-gray-600">
                      {crawledJobs.location}
                    </span>
                  </li>
                </div>
              ) : (
                ""
              )}

              {crawledJobs.location ? (
                <div className="">
                  <li className="flex items-center">
                    <CurrencyDollarIcon className="w-5 mr-3" />
                    <span className="text-sm text-gray-600">
                      {crawledJobs.salaryPrecise
                        ? crawledJobs.salaryPrecise
                        : `${crawledJobs.salaryRange.min} -
                        ${crawledJobs.salaryRange.max}`}
                    </span>
                  </li>
                </div>
              ) : (
                ""
              )}
            </ul>
          </div>
        )}
        <div className="text-center">
          {crawledJobs.websiteUrl && crawledJobs.websiteUrl !== "" ? (
            <div className="mt-5">
              <a
                className="text-sm font-medium underline"
                href={crawledJobs.websiteUrl}
              >
                Visit Website
              </a>
            </div>
          ) : (
            ""
          )}

          <div className="max-w-xs mx-auto my-4">
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

          <div className="flex flex-col text-center w-full mx-auto max-w-xs ">
            <p className="text-md font-medium text-gray-800 py-1">
              Share this job:
            </p>
            <input
              readOnly
              className="rounded-3xl cursor-pointer btn w-full"
              type="text"
              defaultValue={"https://okaviator.com" + location.pathname}
              ref={inputRef}
              onClick={copyURL}
            />
            {isCopied && (
              <div className="bg-green-600 text-white px-2 rounded-md absolute right-0 mr-4 mt-8">
                Copied!
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ApplyUrl;
