import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import JobItem from "../partials/JobItem";
import Newsletter from "../partials/Newsletter";

import Image01 from "../images/company-icon-01.svg";
import Image02 from "../images/company-icon-02.svg";
import Image03 from "../images/company-icon-03.svg";
import Image04 from "../images/company-icon-04.svg";
import Image05 from "../images/company-icon-05.svg";
import Image06 from "../images/company-icon-06.svg";
import Image07 from "../images/company-icon-07.svg";
import Image08 from "../images/company-icon-08.svg";
import Image09 from "../images/company-icon-09.svg";
import Image10 from "../images/company-icon-10.svg";
import Image11 from "../images/company-icon-11.svg";

function JobList() {
  const [crawledJobs, setCrawledJobs] = useState([]);

  useEffect(() => {
    fetchCrawledJobs();
  }, []);

  const fetchCrawledJobs = async (event) => {
    try {
      const res = await axios.get("http://localhost:4000/ReadJob");
      setCrawledJobs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="pb-8 md:pb-16">
      <h2 className="text-3xl font-bold font-inter mb-10">Latest jobs</h2>
      {/* List container */}
      <div className="flex flex-col">
        {crawledJobs.map((job) => {
          return (
            <JobItem
              key={job._id}
              id={job._id}
              sticky={job.sticky}
              title={job.jobTitle}
              link={`/jobDescription/${job._id}`}
              name={job.jobTitle}
              image={job.image}
              tag1={"Full Time"}
              tag2={"🇨🇦"}
              // date={Date.now}
            />
          );
        })}

        {/* Newletter CTA */}
        <div className="py-8 border-b border-gray-200 -order-1">
          <Newsletter />
        </div>
      </div>
    </div>
  );
}

export default JobList;

const items = [
  {
    id: 0,
    sticky: true,
    title: "Engineering Manager Developer Experience",
    link: "/job-post",
    name: "Qonto",
    image: Image01,
    tag1: "$75K - $100K",
    tag2: "🇬🇧 London, UK",
    date: "22d",
  },
  {
    id: 1,
    sticky: false,
    title: "Software Engineer Backend",
    link: "/job-post",
    name: "Vimeo",
    image: Image02,
    tag1: "Full Time",
    tag2: "🌎 Remote",
    date: "2h",
  },
  {
    id: 2,
    sticky: false,
    title: "Senior Site Reliability Engineer",
    link: "/job-post",
    name: "Robinhood",
    image: Image03,
    tag1: "Full Time",
    tag2: "🌎 Remote",
    date: "2h",
  },
];
