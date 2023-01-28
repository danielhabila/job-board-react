import React from "react";
import { Link } from "react-router-dom";

function SignUp() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Site header */}
      <header className="absolute w-full z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Site branding */}
            <div className="shrink-0 mr-4">
              {/* Logo */}
              <Link className="font-bold font-mono text-xl md:text-2xl" to="/">
                ok/aviator
              </Link>
            </div>
          </div>
        </div>
      </header>
      {/* Page content */}
      <main className="grow bg-gray-50">
        <section>
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12">
                <h1 className="h2 font-cabinet-grotesk">
                  Join our amazing aviation community
                </h1>
              </div>
              {/* Form */}
              <div className="max-w-sm mx-auto">
                <form>
                  <div className="flex flex-wrap mb-4">
                    <div className="w-full">
                      <label
                        className="block text-gray-500 text-sm font-medium mb-1"
                        htmlFor="First Name"
                      >
                        First Name
                      </label>
                      <input
                        id="first-name"
                        type="text"
                        className="form-input w-full text-gray-800"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap mb-4">
                    <div className="w-full">
                      <label
                        className="block text-gray-500 text-sm font-medium mb-1"
                        htmlFor="last-name"
                      >
                        Last Name
                      </label>
                      <input
                        id="last Name"
                        type="text"
                        className="form-input w-full text-gray-800"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap mb-4">
                    <div className="w-full">
                      <label
                        className="block text-gray-500 text-sm font-medium mb-1"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="form-input w-full text-gray-800"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap mb-4">
                    <div className="w-full">
                      <label
                        className="block text-gray-500 text-sm font-medium mb-1"
                        htmlFor="password"
                      >
                        Password
                      </label>
                      <input
                        id="password"
                        type="password"
                        className="form-input w-full text-gray-800"
                        required
                      />
                    </div>
                  </div>

                  <div className=" mt-6">
                    <button className="btn-sm w-full text-white bg-black hover:bg-black/80 shadow-sm">
                      Sign up
                    </button>
                  </div>
                  <div className="mt-5">
                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        className="form-checkbox mt-0.5 cursor-pointer"
                        defaultChecked
                      />
                      <span className="text-sm text-gray-500 ml-3">
                        By creating an account you agree to our{" "}
                        <a
                          className="underline hover:decoration-blue-500 underline-offset-2 hover:underline"
                          href="#0"
                        >
                          terms of service
                        </a>
                        .
                      </span>
                    </label>
                  </div>
                </form>
                <div className="flex items-center my-6">
                  <div
                    className="border-t border-gray-200 grow mr-3"
                    aria-hidden="true"
                  />
                  <div className="text-sm text-gray-500 italic">or</div>
                  <div
                    className="border-t border-gray-200 grow ml-3"
                    aria-hidden="true"
                  />
                </div>
                <form>
                  <div className="text-center">
                    <div className="w-full">
                      <span className="text-sm text-gray-500 ml-3">
                        Already have an account?{" "}
                        <Link
                          className="underline text-sm text-black font-bold decoration-2 underline-offset-2 "
                          to="/signin"
                        >
                          Login
                        </Link>
                      </span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default SignUp;
