import React from "react";
import { Link } from "react-router-dom";

import Illustration from "../images/hero-illustration.svg";

function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Bg */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-indigo-100 to-white pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Illustration */}
      <div
        className="hidden md:block absolute left-1/2 -translate-x-1/2 pointer-events-none -z-10"
        aria-hidden="true"
      >
        <img
          src={Illustration}
          className="max-w-none"
          width="1440"
          height="749"
          alt="Hero Illustration"
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-28 pb-8 md:pt-36 md:pb-16">
          {/* Hero content */}
          <div className="max-w-3xl text-center md:text-left">
            {/* Copy */}
            <h1 className="h1 font-inter mb-6">
              Join the best aviation community
            </h1>
            <p className="text-lg text-gray-500 mb-8">
              This is the number one destination to find your next aviation job
              and for employers to source the best talents. 💪🏾
            </p>
            {/* Button + Avatars */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
