import React, { useState, useEffect } from "react";
import UploadImage from "../images/upload.jpg";
import Footer from "../partials/Footer";
import Header from "../partials/Header";
import axios from "axios";
// import Pricing from "../partials/Pricing";

function PostAJob(props) {
  const [selectedOption, setSelectedOption] = useState("exact");
  //salary option radio (either exact or range)
  const handleSalaryOptionChange = (option) => {
    setSelectedOption(option);

    //clearing the value field of salaryPrecise if the selectedOption is "range"
    if (option === "range") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        salaryPrecise: "",
      }));
    }
    //clearing the value field of salaryRange if the selectedOption is "exact"
    else if (option === "exact") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        salaryRange: {
          min: "",
          max: "",
        },
      }));
    }
  };

  const [file, setFile] = useState(null);

  const handleFileSelect = (event) => {
    setFile(event.target.files[0]);
    console.log(event);
  };

  // collecting Post job data
  const [formData, setFormData] = useState({
    jobTitle: "",
    companyName: "",
    location: "",
    jobDescription: "",
    salaryPrecise: "",
    salaryRange: {
      min: "",
      max: "",
    },
    jobType: {
      commitment: "Full-time",
      flexibility: "In-person",
      contract: "Permanent",
    },
    websiteURL: "",
    contactEmail: "",
    applyURL: "",
  });
  // -----------------------------------------------------------------------------------------START
  const [stick, setStick] = useState(false);
  const [stickOneWeek, setStickOneWeek] = useState(false);
  const [highlight, setHighlight] = useState(false);

  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [totalCost, setTotalCost] = useState(499);

  const handleAddOnSelection = (addOn) => {
    if (selectedAddOns.includes(addOn)) {
      setSelectedAddOns(selectedAddOns.filter((item) => item !== addOn));
    } else {
      setSelectedAddOns([...selectedAddOns, addOn]);
    }
  };
  // -----------------------------------------------------------------------------------------START
  // const checkout = async (event) => {
  //   try {
  //     // event.preventDefault();
  //     console.log(totalCost);
  //     const response = await axios.post("http://localhost:4000/checkout", {
  //       totalCost,
  //       quantity: 1,
  //     });
  //     if (response.data.url) {
  //       window.location.assign(response.data.url); // Forwarding user to Stripe
  //       return true; // return true if checkout was successful
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     return false; // return false if checkout was not successful
  //   }
  // };

  useEffect(() => {
    let addOnCost = 0;
    selectedAddOns.forEach((addOn) => {
      if (addOn === "24 hour stick") {
        addOnCost += 99;
      } else if (addOn === "1 week stick") {
        addOnCost += 199;
      } else if (addOn === "highlight") {
        addOnCost += 49;
      }
    });
    setTotalCost(499 + addOnCost);
  }, [selectedAddOns]);
  //-----------------------------------------------------------------------------------------END

  const handleChange = (event) => {
    if (
      event.target.name === "commitment" ||
      event.target.name === "flexibility" ||
      event.target.name === "contract"
    ) {
      setFormData({
        ...formData,
        jobType: {
          ...formData.jobType,
          [event.target.name]: event.target.value,
        },
      });
    } else if (event.target.name === "min" || event.target.name === "max") {
      setFormData({
        ...formData,
        salaryRange: {
          ...formData.salaryRange,
          [event.target.name]: event.target.value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value,
      });
    }
  };
  //-----------------------------------------------------------------------------------------END
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formDataWithFile = new FormData();
      formDataWithFile.append("jobTitle", formData.jobTitle);
      formDataWithFile.append("companyName", formData.companyName);
      formDataWithFile.append("location", formData.location);
      formDataWithFile.append("jobDescription", formData.jobDescription);
      formDataWithFile.append("salaryPrecise", formData.salaryPrecise);
      formDataWithFile.append("min", formData.salaryRange.min);
      formDataWithFile.append("max", formData.salaryRange.max);
      formDataWithFile.append("commitment", formData.jobType.commitment);
      formDataWithFile.append("flexibility", formData.jobType.flexibility);
      formDataWithFile.append("contract", formData.jobType.contract);
      formDataWithFile.append("websiteURL", formData.websiteURL);
      formDataWithFile.append("contactEmail", formData.contactEmail);
      formDataWithFile.append("applyURL", formData.applyURL);
      if (file) {
        formDataWithFile.append("companyLogo", file, file.name);
      }
      formDataWithFile.append("totalCost", totalCost);

      const response = await axios.post("/CreateJob", formDataWithFile, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.url) {
        window.location.assign(response.data.url); // Forwarding user to Stripe
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // stripe.checkout.sessions
  //   .retrieve(sessionId)
  //   .then(function (session) {
  //     session.on("checkout.session.completed", function (event) {
  //       console.log("Payment successful: ", event);
  //       alert("Payment successful! Thank you for your purchase.");
  //     });
  //   })
  //   .catch(function (error) {
  //     console.log("Error retrieving session: ", error);
  //   });

  return (
    <main>
      <Header />
      {/* Content */}
      <div className="min-h-screen w-full ">
        <div className="h-full px-5 sm:px-6">
          <div className="h-full w-full max-w-xl px-6 mx-auto flex flex-col after:mt-auto after:flex-1">
            {/* Site header */}
            <header className="flex-1 flex mb-auto">
              <div className="flex items-center justify-between h-16 md:h-20">
                {/* Logo */}
              </div>
            </header>

            <div className="flex-1 py-8">
              <div className="mb-10">
                <h1 className="text-4xl font-extrabold font-inter mb-2">
                  Post a job
                </h1>
                <div className="text-gray-500">
                  Find the best talent passionate about aviation.
                </div>
              </div>

              {/* Form */}
              <form className="mb-12" onSubmit={handleSubmit}>
                <div className="divide-y divide-gray-200 -my-6">
                  {/* Group #1 */}
                  <div className="py-6">
                    <div className="text-lg font-bold text-gray-800 mb-5">
                      <span className="text-myred">1.</span> The role
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="position"
                        >
                          Job Title <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="job-title"
                          className="form-input w-full"
                          type="text"
                          onChange={handleChange}
                          name="jobTitle"
                          required
                          placeholder="A320 Captain"
                        />
                      </div>
                      <div>
                        <label
                          className="block text-sm text-gray-800 font-medium mb-1"
                          htmlFor="role"
                        >
                          Job Type <span className="text-rose-500">*</span>
                        </label>
                        <select
                          id="commitment"
                          name="commitment"
                          className="form-select text-sm py-2 w-full mb-2"
                          onChange={handleChange}
                          required
                        >
                          <option>Full-time</option>
                          <option>Part-time</option>
                        </select>
                        <select
                          id="flexibility"
                          name="flexibility"
                          className="form-select text-sm py-2 w-full mb-2"
                          required
                        >
                          <option>In-person</option>
                          <option>Remote</option>
                          <option>Hybrid</option>
                        </select>
                        <select
                          id="contract"
                          name="contract"
                          className="form-select text-sm py-2 w-full"
                          required
                        >
                          <option>Permanent</option>
                          <option>Contract</option>
                          <option>Casual</option>
                        </select>
                      </div>
                      <div>
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="location"
                        >
                          Job Location <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="location"
                          name="location"
                          className="form-input w-full"
                          type="text"
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div>
                        <label
                          className="block text-sm text-gray-800 font-medium mb-1"
                          htmlFor="description"
                        >
                          Job Description{" "}
                          <span className="text-rose-500">*</span>
                        </label>
                        <textarea
                          id="description"
                          name="jobDescription"
                          className="form-textarea text-sm py-2 w-full"
                          rows="6"
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div>
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="salary"
                        >
                          Salary (CAD)<span className="text-rose-500">*</span>
                        </label>
                        {/*  ---------------------*/}
                        <div className="my-2 space-x-4 flex">
                          <div className="flex items-center">
                            <input
                              type="radio"
                              className="h-4 w-4 border-gray-300"
                              checked={selectedOption === "exact"}
                              onChange={() => handleSalaryOptionChange("exact")}
                            />
                            <label className="ml-3 block text-sm font-medium ">
                              Exact
                            </label>
                          </div>

                          <div className="flex items-center">
                            <input
                              type="radio"
                              className="h-4 w-4 border-gray-300"
                              checked={selectedOption === "range"}
                              onChange={() => handleSalaryOptionChange("range")}
                            />
                            <label className="ml-3 block text-sm font-medium ">
                              Range
                            </label>
                          </div>
                        </div>
                        {/* ------------------------ */}
                        <div>
                          {selectedOption === "exact" ? (
                            <input
                              id="salary"
                              name="salaryPrecise"
                              onChange={handleChange}
                              className="form-input w-full"
                              type="text"
                              placeholder="40,000"
                            />
                          ) : (
                            <div className="flex gap-2">
                              <input
                                id="salary"
                                name="min"
                                onChange={handleChange}
                                type="text"
                                className="form-input block w-full "
                                placeholder="Minimum per year"
                              />
                              <input
                                id="salary"
                                name="max"
                                onChange={handleChange}
                                type="text"
                                className="form-input block w-full "
                                placeholder="Maximum per year"
                              />
                            </div>
                          )}
                        </div>

                        <div className="text-xs text-gray-500 italic mt-2">
                          No need to enter $ sign
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Group #2 */}
                  <div className="py-6">
                    <div className="text-lg font-bold text-gray-800 mb-5">
                      <span className="text-myred">2.</span> Your company
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="name"
                        >
                          Company Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="name"
                          name="companyName"
                          onChange={handleChange}
                          className="form-input w-full"
                          type="text"
                          required
                        />
                      </div>

                      <div>
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="website-url"
                        >
                          Website URL <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="websiteURL"
                          name="websiteURL"
                          onChange={handleChange}
                          className="form-input w-full"
                          type="text"
                          required
                          placeholder="https://www.yourwebsite.com/"
                        />
                      </div>
                      <div>
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="email"
                        >
                          Primary Contact Email / Hiring Manager{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="email"
                          name="contactEmail"
                          onChange={handleChange}
                          className="form-input w-full"
                          type="email"
                          required
                        />
                        <div className="text-xs text-gray-500 italic mt-1">
                          Stays private. We will send your receipt and
                          confirmation email here.
                        </div>
                      </div>
                      <div>
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="apply"
                        >
                          Application Link or Email{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="applyURL"
                          name="applyURL"
                          onChange={handleChange}
                          className="form-input w-full"
                          type="email"
                          required
                        />
                      </div>
                      <div>
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="file"
                        >
                          Company Logo {""}
                          <span className="text-gray-500">(optional)</span>
                        </label>
                        <div className="flex items-center">
                          <div className="shrink-0 mr-4">
                            <img
                              className="object-cover w-16 h-16 rounded-full border border-gray-200"
                              src={UploadImage}
                              alt="Upload"
                            />
                          </div>
                          <div>
                            <input
                              id="file"
                              type="file"
                              className="block w-full text-sm text-gray-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-black file:text-white hover:file:bg-black/70 transition duration-150 ease-in-out cursor-pointer"
                              onChange={handleFileSelect}
                            />
                          </div>
                          <button
                            type="button"
                            className="ml-2 px-3 py-1.5 text-sm font-medium text-gray-500 rounded-full hover:bg-gray-100 hover:text-gray-600 transition duration-150 ease-in-out cursor-pointer"
                            onClick={() => {
                              setFile(null);
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Group #3 *****************************************************/}
                  <div className="py-6">
                    <div className="text-lg font-bold text-gray-800 mb-5">
                      <span className="text-myred">3.</span> Select add-ons and
                      pay
                    </div>
                    <div className="space-y-4">
                      {/* Add-on button #1 *****************************************************/}
                      <button
                        className={`w-full text-left py-3 px-4 border rounded ${
                          stick
                            ? "border-green-300 ring-2 ring-green-300"
                            : " border-red-200 ring-1 ring-red-200"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          setStick(!stick);
                          handleAddOnSelection("24 hour stick");
                        }}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="text-sm text-gray-800 font-medium mb-1">
                              Stick your post to stay on top for 24 hours (+$99)
                            </div>
                            <div className="text-sm text-gray-500 italic">
                              4x more views
                            </div>
                          </div>
                          <div className="shrink-0 rounded-full border border-gray-200 ml-3">
                            {stick ? (
                              <svg
                                x-show="checked"
                                className="fill-teal-500"
                                width="32"
                                height="32"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="m20.28 12.28-6.292 6.294-2.293-2.293a1 1 0 0 0-1.414 1.414l3 3a1 1 0 0 0 1.414 0l7-7a1 1 0 0 0-1.414-1.414Z" />
                              </svg>
                            ) : (
                              <svg
                                className="fill-indigo-500"
                                width="32"
                                height="32"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M21 15h-4v-4a1 1 0 0 0-2 0v4h-4a1 1 0 0 0 0 2h4v4a1 1 0 0 0 2 0v-4h4a1 1 0 0 0 0-2Z" />
                              </svg>
                            )}
                          </div>
                        </div>
                      </button>
                      {/* Add-on button #2 *****************************************************/}
                      <button
                        className={`w-full text-left py-3 px-4 border rounded ${
                          stickOneWeek
                            ? "border-green-300 ring-2 ring-green-300"
                            : " border-red-200 ring-1 ring-red-200"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          setStickOneWeek(!stickOneWeek);
                          handleAddOnSelection("1 week stick");
                        }}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="text-sm text-gray-800 font-medium mb-1">
                              Stick your post to stay on top for 1 week (+$299)
                            </div>
                            <div className="text-sm text-gray-500 italic">
                              4x more views
                            </div>
                          </div>
                          <div className="shrink-0 rounded-full border border-gray-200 ml-3">
                            {stickOneWeek ? (
                              <svg
                                x-show="checked"
                                className="fill-teal-500"
                                width="32"
                                height="32"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="m20.28 12.28-6.292 6.294-2.293-2.293a1 1 0 0 0-1.414 1.414l3 3a1 1 0 0 0 1.414 0l7-7a1 1 0 0 0-1.414-1.414Z" />
                              </svg>
                            ) : (
                              <svg
                                className="fill-indigo-500"
                                width="32"
                                height="32"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M21 15h-4v-4a1 1 0 0 0-2 0v4h-4a1 1 0 0 0 0 2h4v4a1 1 0 0 0 2 0v-4h4a1 1 0 0 0 0-2Z" />
                              </svg>
                            )}
                          </div>
                        </div>
                      </button>
                      {/* Add-on button #3 *****************************************************/}
                      <button
                        className={`w-full text-left py-3 px-4 border rounded ${
                          highlight
                            ? "border-green-300 ring-2 ring-green-300"
                            : "border-red-200 ring-1 ring-red-200"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          setHighlight(!highlight);
                          handleAddOnSelection("highlight");
                        }}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="text-sm text-gray-800 font-medium mb-1">
                              Highlight your post in yellow (+$49)
                            </div>
                            <div className="text-sm text-gray-500 italic">
                              2x more views
                            </div>
                          </div>
                          <div className="shrink-0 rounded-full border border-gray-200 ml-3">
                            {highlight ? (
                              <svg
                                x-show="checked"
                                className="fill-teal-500"
                                width="32"
                                height="32"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="m20.28 12.28-6.292 6.294-2.293-2.293a1 1 0 0 0-1.414 1.414l3 3a1 1 0 0 0 1.414 0l7-7a1 1 0 0 0-1.414-1.414Z" />
                              </svg>
                            ) : (
                              <svg
                                className="fill-indigo-500"
                                width="32"
                                height="32"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M21 15h-4v-4a1 1 0 0 0-2 0v4h-4a1 1 0 0 0 0 2h4v4a1 1 0 0 0 2 0v-4h4a1 1 0 0 0 0-2Z" />
                              </svg>
                            )}
                          </div>
                        </div>
                      </button>
                      {/* END OF button #3 *****************************************************/}
                    </div>
                    <div className="mt-6">
                      <button
                        className="btn w-full text-white bg-myred hover:bg-red-600 shadow-sm"
                        type="submit"
                        // onClick={checkout}
                      >
                        Pay Now - ${totalCost}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

export default PostAJob;
