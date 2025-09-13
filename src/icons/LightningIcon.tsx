import React from "react";

export const LightningIcon = ({ className = "" }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`w-5 h-5 text-white ${className}`} // default size small
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M13 2 L3 14 H12 L11 22 L21 10 H12 L13 2 Z" />
    </svg>
);

export default LightningIcon;
