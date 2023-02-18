import React from "react";
import { Link, useNavigate } from "react-router-dom";

function JobItem(props) {
  const navigate = useNavigate();

  return (
    <div
      className={`[&:nth-child(-n+12)]:-order-1 group ${
        !props.sticky && "border-b border-gray-200"
      }`}
    >
      <div
        className={`px-4 py-6 hover:bg-gray-100 rounded-xl flex place-content-between cursor-pointer ${
          props.sticky && "bg-[#FDD663] hover:bg-[#FDD663]/80 rounded-xl"
        }`}
        onClick={() => navigate(`${props.link}`)}
      >
        <div className="sm:flex items-center space-y-3 sm:space-y-0 sm:space-x-5">
          {/*Company logo  */}
          <div className="shrink-0 relative md:mr-10">
            {props.image ? (
              <img src={props.image} width="56" height="56" alt={""} />
            ) : (
              <div className="flex text-[#181818] items-center justify-center font-bold text-2xl rounded-full h-14 w-14 ring-2 ring-[#E5E7EA]">
                {props.title
                  .split(" ")
                  .map((word) => word.charAt(0))
                  .slice(0, 2)
                  .join("")
                  .toUpperCase()}
              </div>
            )}
          </div>

          <div className="grow lg:flex items-center justify-between space-y-5 lg:space-x-2 lg:space-y-0">
            <div>
              <div className="mb-2">
                <Link
                  className="text-lg text-gray-800 font-bold"
                  to={props.link}
                >
                  {props.title}
                </Link>
                <div className="flex propss-start space-x-2">
                  <div className="text-sm text-gray-800 font-semibold mb-1">
                    {props.companyName}
                  </div>
                  {props.sticky && (
                    <svg
                      className="w-3 h-3 shrink-0 fill-amber-400"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M11.143 5.143A4.29 4.29 0 0 1 6.857.857a.857.857 0 0 0-1.714 0A4.29 4.29 0 0 1 .857 5.143a.857.857 0 0 0 0 1.714 4.29 4.29 0 0 1 4.286 4.286.857.857 0 0 0 1.714 0 4.29 4.29 0 0 1 4.286-4.286.857.857 0 0 0 0-1.714Z" />
                    </svg>
                  )}
                </div>
              </div>
              <div className="-m-1">
                <a
                  className={`text-xs text-gray-500 font-medium inline-flex px-2 py-0.5 hover:text-gray-600 rounded-lg m-1 whitespace-nowrap transition duration-150 ease-in-out ${
                    props.sticky ? "bg-gray-50" : "bg-gray-100"
                  }`}
                  href="#0"
                >
                  {props.commitment}
                </a>

                {props.salaryPrecise || props.salaryRangeMin ? (
                  <a
                    className={`text-xs text-gray-500 font-medium inline-flex px-2 py-0.5 hover:text-gray-600 rounded-lg m-1 whitespace-nowrap transition duration-150 ease-in-out ${
                      props.sticky ? "bg-gray-50" : "bg-gray-100"
                    }`}
                    href="#0"
                  >
                    {props.salaryPrecise
                      ? props.salaryPrecise
                      : `${props.salaryRangeMin} -
    ${props.salaryRangeMax}`}
                  </a>
                ) : (
                  ""
                )}

                <a
                  className={`text-xs text-gray-500 font-medium inline-flex px-2 py-0.5 hover:text-gray-600 rounded-lg m-1 whitespace-nowrap transition duration-150 ease-in-out ${
                    props.sticky ? "bg-gray-50" : "bg-gray-100"
                  }`}
                  href="#0"
                >
                  {props.location}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="text-sm italic text-gray-500">{props.date}</div>
      </div>
    </div>
  );
}

export default JobItem;
