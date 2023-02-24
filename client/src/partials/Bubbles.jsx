import React, { useState, useRef } from "react";

const Bubbles = (props) => {
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
    <div>
      {/* <div className="-m-1 my-4">
        <a
          className={`text-xs bg-gray-100 rounded-xl border border-gray-200 text-gray-500 md:font-medium font-normal inline-flex px-2 py-0.5 hover:text-gray-600 m-1 whitespace-nowrap transition duration-150 ease-in-out`}
          href="#0"
        >
          {props.crawledJobs.jobType.commitment &&
            props.crawledJobs.jobType.commitment}
        </a>

        {props.crawledJobs.salaryPrecise ||
        props.crawledJobs.salaryRange.min ? (
          <a
            className={`text-xs bg-gray-100 rounded-xl border border-gray-200 text-gray-500 md:font-medium font-normal inline-flex px-2 py-0.5 hover:text-gray-600 m-1 whitespace-nowrap transition duration-150 ease-in-out `}
            href="#0"
          >
            {props.crawledJobs.salaryPrecise
              ? props.crawledJobs.salaryPrecise
              : `${props.crawledJobs.salaryRange.min} -
                                  ${props.crawledJobs.salaryRange.max}`}
          </a>
        ) : (
          ""
        )}

        <a
          className={`text-xs bg-gray-100 rounded-xl border border-gray-200 text-gray-500 md:font-medium font-normal inline-flex px-2 py-0.5 hover:text-gray-600 m-1 whitespace-nowrap transition duration-150 ease-in-out`}
          href="#0"
        >
          {props.crawledJobs.location}
        </a>
      </div> */}

      {/* ----------------------------------------------------------------------------------- */}
      <aside className="mb-8 md:mb-0 md:w-64 lg:w-72 md:ml-12 lg:ml-20 md:shrink-0 md:order-1 ">
        <div className="relative bg-gray-50 rounded-xl border border-gray-200 p-5">
          {props.crawledJobs.websiteUrl &&
          props.crawledJobs.websiteUrl !== "" ? (
            <div className="text-center">
              <a
                className="text-sm font-medium underline"
                href={props.crawledJobs.websiteUrl}
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
              href={props.crawledJobs.applyUrl}
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
            <p className="text-md font-bold text-gray-800 py-1">
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
              <div className="bg-green-100 text-green-900 px-1 rounded-md absolute right-0 mr-4 mt-8">
                Copied!
              </div>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Bubbles;
