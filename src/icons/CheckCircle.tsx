import React from "react";

export const CheckCircle = ({ className = "" }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`w-4 h-4 text-white ${className}`} // smaller size
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
    >
        <circle cx="12" cy="12" r="10" />
        <path d="M9 12l2 2l4-4" />
    </svg>
);
