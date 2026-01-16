import React from "react";
import { Link } from "react-router-dom";

export default function NotFoundComponent() {
  return (
    <div>
      {" "}
      <div className="flex justify-center h-[calc(100vh-170px)]">
        <div className="flex flex-col justify-center items-center max-md:px-4 text-sm">
          <h1 className="font-bold text-indigo-500 text-8xl md:text-9xl">
            404
          </h1>
          <div className="bg-indigo-500 my-5 md:my-7 rounded w-16 h-1"></div>
          <p className="font-bold text-gray-800 text-2xl md:text-3xl">
            Page Not Found
          </p>
          <p className="mt-4 max-w-md text-gray-500 text-sm md:text-base text-center">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>
          <div className="flex items-center gap-4 mt-6">
            <Link
              to="/dashboard"
              className="bg-gray-800 hover:bg-black px-7 py-2.5 rounded-md text-white active:scale-95 transition-all"
            >
              Return Home
            </Link>
            {/* <a
                                href="#"
                                className="px-7 py-2.5 border border-gray-300 rounded-md text-gray-800 active:scale-95 transition-all"
                              >
                                Contact support
                              </a> */}
          </div>
        </div>
      </div>
    </div>
  );
}
