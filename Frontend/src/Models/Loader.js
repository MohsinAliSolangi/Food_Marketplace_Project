import React from "react";

const Loader = () => {
  return (
    <span className="absolute inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
      <svg className="animate-spin h-10 w-10 mr-3" viewBox="0 0 24 24">
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8H4z"
        />
      </svg>
      Loading...
    </span>
  );
};

export default Loader;