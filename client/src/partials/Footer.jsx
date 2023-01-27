import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  const date = new Date();
  let year = date.getFullYear();

  return (
    <footer>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 border-t">
        <div className="py-6 md:py-12">
          {/* Copyright */}
          <div className="text-center text-sm text-gray-500">
            © {year} OkAviator. All rights reserved
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
