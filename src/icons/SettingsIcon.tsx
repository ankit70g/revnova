import * as React from "react";

export const SettingsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    {...props}
  >
    <circle cx="12" cy="12" r="3" strokeWidth={2} />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09c.7 0 1.34-.4 1.51-1a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06c.48.48 1.2.62 1.82.33.61-.28 1-0.82 1-1.51V3a2 2 0 0 1 4 0v.09c0 .7.39 1.34 1 1.51.62.29 1.34.15 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06c-.48.48-.62 1.2-.33 1.82.28.61.82 1 1.51 1H21a2 2 0 0 1 0 4h-.09c-.7 0-1.34.39-1.51 1z"
    />
  </svg>
);
