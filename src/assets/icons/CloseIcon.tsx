import React from "react";

interface ICloseIcon {
  fill?: string;
}

const CloseIcon = ({ fill }: ICloseIcon) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.21565 0.84668L0.620876 3.44145L8.40522 11.2258L0.620605 19.0104L3.21538 21.6052L11 13.8206L18.7845 21.6051L21.3793 19.0103L13.5948 11.2258L21.379 3.44151L18.7843 0.846736L11 8.63102L3.21565 0.84668Z"
      fill={fill ?? "url(#paint0_linear_1_938)"}
    />
    <defs>
      <linearGradient
        id="paint0_linear_1_938"
        x1="10.1796"
        y1="-1.47339"
        x2="21.9736"
        y2="15.4193"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#E61726" />
        <stop offset="1" stopColor="#D4208C" />
      </linearGradient>
    </defs>
  </svg>
);

export default CloseIcon;
