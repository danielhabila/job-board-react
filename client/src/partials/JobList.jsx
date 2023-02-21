import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import JobItem from "../partials/JobItem";
import Newsletter from "../partials/Newsletter";
import moment from "moment";
import ClipLoader from "react-spinners/ClipLoader";

function JobList() {
  const [crawledJobs, setCrawledJobs] = useState([]);
  // const [fetchImage, setFetchImage] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCrawledJobs = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:4000/ReadJob");
        setCrawledJobs(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchCrawledJobs();
  }, []);
  // --------------------------------------------------------------

  return (
    <div>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <ClipLoader
            color={"#000"}
            loading={loading}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        // Render your content here
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
                  companyName={job.companyName}
                  image={job.image}
                  salaryPrecise={job.salaryPrecise && `${job.salaryPrecise}`}
                  salaryRangeMin={job.salaryRange && `${job.salaryRange.min}`}
                  salaryRangeMax={job.salaryRange && `${job.salaryRange.max}`}
                  commitment={
                    job.jobType ? `${job.jobType.commitment}` : "Full Time"
                  }
                  location={job.location ? `${job.location}` : "🇨🇦"}
                  date={moment(job.posted_date).fromNow()}
                />
              );
            })}

            {/* Newletter CTA */}
            <div className="py-8 border-b border-gray-200 -order-1">
              <Newsletter />
            </div>
          </div>
        </div>
      )}
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
    image: "Qonto",
    commitment: "$75K - $100K",
    location: "🇬🇧 London, UK",
    date: "22d",
  },
  {
    id: 1,
    sticky: false,
    title: "Software Engineer Backend",
    link: "/job-post",
    name: "Vimeo",

    commitment: "Full Time",
    location: "🌎 Remote",
    date: "2h",
  },
  {
    id: 2,
    sticky: false,
    title: "Senior Site Reliability Engineer",
    link: "/job-post",
    name: "Robinhood",

    commitment: "Full Time",
    location: "🌎 Remote",
    date: "2h",
  },
];

//  salaryPrecise={job.salaryPrecise && `${job.salaryPrecise}`}
// SalaryRange={job.salaryRange && `${job.salaryRange}`}
