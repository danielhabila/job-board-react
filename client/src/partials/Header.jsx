import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
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

          {/* Desktop navigation */}
          <nav className="flex grow">
            {/* Desktop sign in links */}
            <ul className="flex grow justify-end flex-wrap items-center">
              <li>
                <Link
                  className="text-sm font-medium px-3 lg:px-5 py-2 flex items-center"
                  to="/signin"
                >
                  Sign in
                </Link>
              </li>
              <li className="ml-3">
                <Link
                  className="btn-sm text-white bg-[#EF4444]  hover:bg-red-700 w-full shadow-sm"
                  to="/post-a-job"
                >
                  Post job <span className="max-md:hidden">- $499</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
