import * as React from "react";

export function SearchIcon({
  className = "",
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={20}
      height={20}
      aria-hidden="true"
      {...props}
    >
      <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="2" />
      <line
        x1="15.5"
        y1="15.5"
        x2="12.5"
        y2="12.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
