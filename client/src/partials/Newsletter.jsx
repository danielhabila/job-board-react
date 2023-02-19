import React, { useState } from "react";
import axios from "axios";

function Newsletter() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/subscribe", {
        name,
        email,
      });
      setMessage(response.data.message);
      setSuccess(response.data.success);
    } catch (error) {
      if (
        error.response.status === 400 ||
        error.response.data.title === "Member Exists"
      ) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Something went wrong. Please try again later.");
        setSuccess(response.data.success);
        console.error(error);
      }
    }
  };

  return (
    <div className="relative text-center px-4 py-6 group">
      <div
        className="absolute inset-0 rounded-xl bg-gray-50 border border-gray-200 -z-10"
        aria-hidden="true"
      />
      {/* max-md:hidden */}
      <div className="text-2xl font-bold mb-5">
        Get a weekly email with the latest aviation jobs.
      </div>
      <form className="inline-flex max-w-lg " onSubmit={handleSubmit}>
        <div className="flex flex-col sm:flex-row justify-center max-w-xs mx-auto sm:max-w-none">
          <input
            type="text"
            className="form-input py-1.5 w-full mb-2 sm:mb-0 sm:mr-2"
            placeholder="Your name"
            aria-label="Your name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            className="form-input py-1.5 w-full mb-2 sm:mb-0 sm:mr-2"
            placeholder="Your email"
            aria-label="Your email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className="btn-sm text-white bg-black hover:bg-black/80 shadow-sm whitespace-nowrap"
            type="submit"
          >
            Sign me up
          </button>
        </div>
      </form>
      {message && (
        <p
          className={`grid place-content-center font-medium ${
            success ? "text-green-500" : "text-red-500"
          } sm:text-left mt-2 opacity-75 text-sm`}
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default Newsletter;
