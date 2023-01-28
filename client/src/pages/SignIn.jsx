import React from "react";
import { Link } from "react-router-dom";

function SignIn() {
  return (
    <main className="flex">
      {/* Content */}
      <div className="min-h-screen w-full ">
        <div className="h-full px-5 sm:px-6">
          <div className="h-full w-full max-w-md px-6 mx-auto flex flex-col after:mt-auto after:flex-1">
            {/* Site header */}
            <header className="flex-1 flex mb-auto">
              <div className="flex items-center justify-between h-16 md:h-20">
                {/* Site branding */}
                <div className="shrink-0 mr-4">
                  {/* Logo */}
                  <Link
                    className="font-bold font-mono text-xl md:text-2xl"
                    to="/"
                  >
                    ok/aviator
                  </Link>
                </div>
              </div>
            </header>

            <div className="flex-1 py-8">
              <div className="mb-10">
                <h1 className="text-4xl font-extrabold font-inter mb-2">
                  Sign in to JobBoard!
                </h1>
                <div className="text-gray-500">
                  Enter your email and we'll email you a magic link for a
                  password-free sign in.
                </div>
              </div>

              {/* Form */}
              <form>
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

                <div className="mt-6">
                  <button className="btn w-full text-white bg-black hover:bg-black/80 shadow-sm group">
                    Login
                    <span className="tracking-normal text-indigo-200 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
                      -&gt;
                    </span>
                  </button>
                </div>
              </form>

              {/* Divider */}
              <div className="flex items-center my-6">
                <div
                  className="border-t border-gray-200 grow mr-3"
                  aria-hidden="true"
                />
              </div>

              {/* Forgot password*/}
              <div className="text-center mb-4 cursor-pointer">
                <p className="text-sm text-gray-500">Forgot your password?</p>
              </div>

              {/* Register / signup */}
              <div className="text-center">
                <div className="w-full">
                  <span className="text-sm text-gray-500">
                    Don't have an account?{" "}
                    <Link
                      className="underline text-sm text-black font-bold decoration-2 underline-offset-2 "
                      to="/signup"
                    >
                      Register
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SignIn;
