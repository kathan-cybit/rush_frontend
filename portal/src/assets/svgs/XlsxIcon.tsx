import React from "react";

const XlsxIcon = ({ size = 48, className = "" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="docGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1F7244" />
          <stop offset="100%" stopColor="#17613A" />
        </linearGradient>
        <linearGradient id="cornerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#17613A" />
          <stop offset="100%" stopColor="#0F4A2A" />
        </linearGradient>
      </defs>

      {/* Main document body */}
      <path
        d="M20 8C18.3431 8 17 9.34315 17 11V69C17 70.6569 18.3431 72 20 72H60C61.6569 72 63 70.6569 63 69V26L50 8H20Z"
        fill="url(#docGradient)"
      />

      {/* Folded corner */}
      <path
        d="M50 8V23C50 24.6569 51.3431 26 53 26H63L50 8Z"
        fill="url(#cornerGradient)"
      />

      {/* Shadow effect on corner */}
      <path
        d="M50 8V23C50 24.6569 51.3431 26 53 26H63L50 8Z"
        fill="black"
        opacity="0.1"
      />

      {/* XLSX label container */}
      <rect x="12" y="35" width="42" height="22" rx="3" fill="#0A3D24" />

      {/* XLSX text */}
      <text
        x="33"
        y="51"
        fontSize="16"
        fontWeight="700"
        fill="white"
        fontFamily="system-ui, -apple-system, sans-serif"
        textAnchor="middle"
        letterSpacing="1"
      >
        XLSX
      </text>

      {/* Decorative lines */}
      <rect
        x="24"
        y="62"
        width="32"
        height="1.8"
        rx="0.9"
        fill="white"
        opacity="0.25"
      />
      <rect
        x="24"
        y="66"
        width="28"
        height="1.8"
        rx="0.9"
        fill="white"
        opacity="0.25"
      />
    </svg>
  );
};

export default XlsxIcon;
