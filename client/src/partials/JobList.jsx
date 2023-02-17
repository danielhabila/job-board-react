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
              // sticky={job.sticky}
              title={job.jobTitle}
              link={`/jobDescription/${job._id}`}
              name={job.jobTitle}
              // image={.image}
              // tag1={job.tag1}
              // tag2={job.tag2}
              // date={job.date}
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
  {
    id: 3,
    sticky: false,
    title: "Remote Shopify Website Tester",
    link: "/job-post",
    name: "GitHub",
    image: Image03,
    tag1: "$100K - $170K",
    tag2: "🇺🇸 NYC",
    date: "4h",
  },
  {
    id: 4,
    sticky: false,
    title: "Remote Senior Software Engineer",
    link: "/job-post",
    name: "GitHub",
    image: Image04,
    tag1: "$100K - $170K",
    tag2: "🇺🇸 NYC",
    date: "7h",
  },
  {
    id: 5,
    sticky: false,
    title: "Senior Web App Designer",
    link: "/job-post",
    name: "Qonto",
    image: Image01,
    tag1: "Contract",
    tag2: "🇬🇧 London, UK",
    date: "12h",
  },
  {
    id: 6,
    sticky: false,
    title: "Ruby on Rails Engineer",
    link: "/job-post",
    name: "Revolut",
    image: Image05,
    tag1: "Full Time",
    tag2: "🌎 Remote",
    date: "12h",
  },
  {
    id: 7,
    sticky: false,
    title: "Senior Software Engineer Backend",
    link: "/job-post",
    name: "HSBC",
    image: Image06,
    tag1: "Full Time",
    tag2: "🇮🇹 Milan, IT",
    date: "20h",
  },
  {
    id: 8,
    sticky: false,
    title: "React.js Software Developer",
    link: "/job-post",
    name: "Twitter",
    image: Image07,
    tag1: "Full Time",
    tag2: "🌎 Remote",
    date: "1d",
  },
  {
    id: 9,
    sticky: false,
    title: "Senior Client Engineer (React & React Native)",
    link: "/job-post",
    name: "Medium",
    image: Image08,
    tag1: "$55K - $100K",
    tag2: "🌎 Remote",
    date: "1d",
  },
  {
    id: 10,
    sticky: false,
    title: "Contract React Native Engineer",
    link: "/job-post",
    name: "Twitch",
    image: Image09,
    tag1: "Full Time",
    tag2: "🌎 Remote",
    date: "2d",
  },
  {
    id: 11,
    sticky: false,
    title: "QA Automation Engineer",
    link: "/job-post",
    name: "Figma",
    image: Image10,
    tag1: "Full Time",
    tag2: "🌎 Remote",
    date: "2d",
  },
  {
    id: 12,
    sticky: false,
    title: "Senior Marketing Program Manager",
    link: "/job-post",
    name: "Figma",
    image: Image10,
    tag1: "Full Time",
    tag2: "🌎 Remote",
    date: "2d",
  },
  {
    id: 13,
    sticky: false,
    title: "Senior Product Designer",
    link: "/job-post",
    name: "Figma",
    image: Image10,
    tag1: "Full Time",
    tag2: "🌎 Remote",
    date: "2d",
  },
  {
    id: 14,
    sticky: false,
    title: "Remote Cyber Security Analyst US",
    link: "/job-post",
    name: "Facebook",
    image: Image11,
    tag1: "$55K - $100K",
    tag2: "🇺🇸 United States",
    date: "2d",
  },
];
