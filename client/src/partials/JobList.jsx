import React, { useState, useEffect } from "react";
import axios from "axios";
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
        const res = await axios.get("/api/ReadJob");
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

  moment.locale("custom", {
    relativeTime: {
      future: "in %s",
      past: "%s ago",
      s: "now",
      ss: "now",
      m: "now",
      mm: "%dmin",
      h: "h",
      hh: "%d h",
      d: "1d",
      dd: "%dd",
      w: "1w",
      ww: "%dw",
      M: "1mos",
      MM: "%dmos",
      y: "a year",
      yy: "%d years",
    },
  });

  // const formattedDate = moment(job.posted_date).locale("custom").fromNow();

  // console.log(formattedDate.replace("ago", "d"));

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
          <h2 className="md:text-3xl text-xl font-bold font-inter mb-10">
            Latest jobs
          </h2>
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
                    crawledJobs.jobType && crawledJobs.jobType.commitment !== ""
                      ? `${job.jobType.commitment}`
                      : "Full Time"
                  }
                  location={job.location ? `${job.location}` : "🇨🇦"}
                  date={moment(job.posted_date)
                    .locale("custom")
                    .fromNow()
                    .replace("ago", "")}
                />
              );
            })}

            {/* Newletter CTA */}
            <div className="py-8 border-b border-gray-200 -order-1">
              <Newsletter heading={"Send me job updates!"} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default JobList;
