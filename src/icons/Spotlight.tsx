import * as React from "react";

export const Spotlight = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"         // default color
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-10 h-10" // default size
        {...props}            // still allows override if needed
    >
        <polygon points="12,4 20,20 4,20" />
    </svg>
);

export default Spotlight;
