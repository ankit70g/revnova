import * as React from "react";

export const PipelineIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    {...props}
  >
    <rect x="3" y="4" width="6" height="16" rx="2" strokeWidth={2} />
    <rect x="15" y="4" width="6" height="16" rx="2" strokeWidth={2} />
    <line x1="9" y1="12" x2="15" y2="12" strokeWidth={2} />
  </svg>
);
