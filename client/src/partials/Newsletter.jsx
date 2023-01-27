import React from "react";

function Newsletter() {
  return (
    <div className="relative text-center px-4 py-6 group">
      <div
        className="absolute inset-0 rounded-xl bg-gray-50 border border-gray-200 -z-10"
        aria-hidden="true"
      />

      <div className="text-2xl font-bold mb-5">
        Get a weekly email with the latest aviation jobs.
      </div>
      <form className="inline-flex max-w-sm">
        <div className="flex flex-col sm:flex-row justify-center max-w-xs mx-auto sm:max-w-none">
          <input
            type="email"
            className="form-input py-1.5 w-full mb-2 sm:mb-0 sm:mr-2"
            placeholder="Your email"
            aria-label="Your email"
          />
          <button
            className="btn-sm text-white bg-black hover:bg-black/80 shadow-sm whitespace-nowrap"
            type="submit"
          >
            Join Newsletter
          </button>
        </div>
        {/* Success message */}
        {/* <p className="font-medium text-emerald-600 text-center sm:text-left sm:absolute mt-2 opacity-75 text-sm">Thanks for subscribing!</p> */}
      </form>
    </div>
  );
}

export default Newsletter;
