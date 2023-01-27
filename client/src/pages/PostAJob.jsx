import React, { useState } from "react";
import { Link } from "react-router-dom";
import UploadImage from "../images/upload.jpg";
import Footer from "../partials/Footer";
import Header from "../partials/Header";

function PostAJob() {
  const [stick, setStick] = useState(false);
  const [highlight, setHighlight] = useState(true);

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
              <form className="mb-12">
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
                          className="form-select text-sm py-2 w-full mb-2"
                          required
                        >
                          <option>Full-time</option>
                          <option>Part-time</option>
                        </select>
                        <select
                          id="flexibility"
                          className="form-select text-sm py-2 w-full mb-2"
                          required
                        >
                          <option>In-person</option>
                          <option>Remote</option>
                          <option>Hybrid</option>
                        </select>
                        <select
                          id="contract"
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
                          className="block text-sm text-gray-800 font-medium mb-1"
                          htmlFor="commitment"
                        >
                          Commitment <span className="text-rose-500">*</span>
                        </label>
                        <select
                          id="commitment"
                          className="form-select text-sm py-2 w-full"
                          required
                        >
                          <option>Full-time</option>
                          <option>Part-time</option>
                          <option>Intership</option>
                          <option>Contract / Freelance</option>
                          <option>Co-founder</option>
                        </select>
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
                          className="form-textarea text-sm py-2 w-full"
                          rows="4"
                          required
                        />
                      </div>
                      <div>
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="salary"
                        >
                          Salary{" "}
                          <span className="text-gray-500">(optional)</span>
                        </label>
                        <input
                          id="salary"
                          className="form-input w-full"
                          type="text"
                        />
                        <div className="text-xs text-gray-500 italic mt-2">
                          Example: “$100,000 - $170,000 USD”
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
                          className="form-input w-full"
                          type="text"
                          required
                          placeholder="E.g., Acme Inc."
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
                          id="website-url"
                          className="form-input w-full"
                          type="text"
                          required
                          placeholder="E.g., Acme Inc."
                        />
                      </div>
                      <div>
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="email"
                        >
                          Contact Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="email"
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
                          Company Logo
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
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Group #3 */}
                  <div className="py-6">
                    <div className="text-lg font-bold text-gray-800 mb-5">
                      <span className="text-myred">3.</span> Select add-ons and
                      pay
                    </div>
                    <div className="space-y-4">
                      <button
                        className={`w-full text-left py-3 px-4 border rounded ${
                          stick
                            ? "border-indigo-500 ring-2 ring-indigo-200"
                            : "border-gray-200"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          setStick(!stick);
                        }}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="text-sm text-gray-800 font-medium mb-1">
                              Stick your post to stay on top (+$99)
                            </div>
                            <div className="text-sm text-gray-500 italic">
                              4x more views
                            </div>
                          </div>
                          <div className="shrink-0 rounded-full border border-gray-200 ml-3">
                            {stick ? (
                              <svg
                                className="fill-indigo-500"
                                width="32"
                                height="32"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M21 15h-4v-4a1 1 0 0 0-2 0v4h-4a1 1 0 0 0 0 2h4v4a1 1 0 0 0 2 0v-4h4a1 1 0 0 0 0-2Z" />
                              </svg>
                            ) : (
                              <svg
                                x-show="checked"
                                className="fill-teal-500"
                                width="32"
                                height="32"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="m20.28 12.28-6.292 6.294-2.293-2.293a1 1 0 0 0-1.414 1.414l3 3a1 1 0 0 0 1.414 0l7-7a1 1 0 0 0-1.414-1.414Z" />
                              </svg>
                            )}
                          </div>
                        </div>
                      </button>
                      <button
                        className={`w-full text-left py-3 px-4 border rounded ${
                          stick
                            ? "border-indigo-500 ring-2 ring-indigo-200"
                            : "border-gray-200"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          setStick(!stick);
                        }}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="text-sm text-gray-800 font-medium mb-1">
                              Stick your post to stay on top (+$299)
                            </div>
                            <div className="text-sm text-gray-500 italic">
                              4x more views
                            </div>
                          </div>
                          <div className="shrink-0 rounded-full border border-gray-200 ml-3">
                            {stick ? (
                              <svg
                                className="fill-indigo-500"
                                width="32"
                                height="32"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M21 15h-4v-4a1 1 0 0 0-2 0v4h-4a1 1 0 0 0 0 2h4v4a1 1 0 0 0 2 0v-4h4a1 1 0 0 0 0-2Z" />
                              </svg>
                            ) : (
                              <svg
                                x-show="checked"
                                className="fill-teal-500"
                                width="32"
                                height="32"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="m20.28 12.28-6.292 6.294-2.293-2.293a1 1 0 0 0-1.414 1.414l3 3a1 1 0 0 0 1.414 0l7-7a1 1 0 0 0-1.414-1.414Z" />
                              </svg>
                            )}
                          </div>
                        </div>
                      </button>
                      <button
                        className={`w-full text-left py-3 px-4 border rounded ${
                          highlight
                            ? "border-indigo-500 ring-2 ring-indigo-200"
                            : "border-gray-200"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          setHighlight(!highlight);
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
                                className="fill-indigo-500"
                                width="32"
                                height="32"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M21 15h-4v-4a1 1 0 0 0-2 0v4h-4a1 1 0 0 0 0 2h4v4a1 1 0 0 0 2 0v-4h4a1 1 0 0 0 0-2Z" />
                              </svg>
                            ) : (
                              <svg
                                x-show="checked"
                                className="fill-teal-500"
                                width="32"
                                height="32"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="m20.28 12.28-6.292 6.294-2.293-2.293a1 1 0 0 0-1.414 1.414l3 3a1 1 0 0 0 1.414 0l7-7a1 1 0 0 0-1.414-1.414Z" />
                              </svg>
                            )}
                          </div>
                        </div>
                      </button>
                    </div>
                    <div className="mt-6">
                      <button className="btn w-full text-white bg-myred hover:bg-red-600 shadow-sm">
                        Pay Now - $499
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
