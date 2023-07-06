import React from "react";

const LoadingIcon = (): JSX.Element => (
  <svg width="38" height="38" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">
        <stop stopColor="#a1a1a1" stopOpacity="0" offset="0%" />
        <stop stopColor="#a1a1a1" stopOpacity=".631" offset="63.146%" />
        <stop stopColor="#a1a1a1" offset="100%" />
      </linearGradient>
    </defs>
    <g transform="translate(1 1)" fill="none" fillRule="evenodd">
      <path d="M36 18c0-9.94-8.06-18-18-18" stroke="url(#a)" strokeWidth="2">
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 18 18"
          to="360 18 18"
          dur="0.9s"
          repeatCount="indefinite"
        />
      </path>
      <circle fill="#a1a1a1" cx="36" cy="18" r="1">
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 18 18"
          to="360 18 18"
          dur="0.9s"
          repeatCount="indefinite"
        />
      </circle>
    </g>
  </svg>
);

export default LoadingIcon;
