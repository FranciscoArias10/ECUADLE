import React from 'react';

export default function EcuadorFlag({ width = 42, height = 28, className = "" }) {
  return (
    <svg 
      className={`ecuador-flag ${className}`}
      width={width} 
      height={height} 
      viewBox="0 0 60 40" 
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Bandera de Ecuador"
      style={{
        borderRadius: '5px',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.25)',
        border: '1.5px solid #002266',
        display: 'inline-block',
        verticalAlign: 'middle',
        overflow: 'hidden',
        flexShrink: 0
      }}
    >
      <defs>
        <clipPath id="flag-clip">
          <rect width="60" height="40" rx="4" />
        </clipPath>
      </defs>

      <g clipPath="url(#flag-clip)">
        {/* Yellow top stripe (50%) */}
        <rect x="0" y="0" width="60" height="20" fill="#FFD100" />
        {/* Blue middle stripe (25%) */}
        <rect x="0" y="20" width="60" height="10" fill="#0033A0" />
        {/* Red bottom stripe (25%) */}
        <rect x="0" y="30" width="60" height="10" fill="#CE1126" />

        {/* Coat of arms (Escudo) in center */}
        <g transform="translate(30, 20)">
          {/* Condor wings on top */}
          <path d="M-9,-7 C-7,-10 -3,-11 0,-8 C3,-11 7,-10 9,-7 C6,-7 3,-6 0,-6 C-3,-6 -6,-7 -9,-7 Z" fill="#2C2C2C" />
          <path d="M-1.5,-9.5 C-0.5,-11 0.5,-11 1.5,-9.5 C1,-8.5 -1,-8.5 -1.5,-9.5 Z" fill="#D32F2F" />
          
          {/* Side flags framing the shield */}
          <path d="M-7,-3 L-9,6 L-7,7 L-5,1 Z" fill="#CE1126" />
          <path d="M7,-3 L9,6 L7,7 L5,1 Z" fill="#CE1126" />
          <path d="M-6,-4 L-8,4 L-6,5 L-4,0 Z" fill="#0033A0" />
          <path d="M6,-4 L8,4 L6,5 L4,0 Z" fill="#0033A0" />
          <path d="M-5,-5 L-7,2 L-5,3 L-3,-1 Z" fill="#FFD100" />
          <path d="M5,-5 L7,2 L5,3 L3,-1 Z" fill="#FFD100" />

          {/* Oval shield */}
          <ellipse cx="0" cy="0.5" rx="5.5" ry="6.8" fill="#C69214" stroke="#8A5A00" strokeWidth="0.5" />
          <ellipse cx="0" cy="0.5" rx="4.6" ry="5.8" fill="#58A5F0" />
          {/* Golden sun band */}
          <path d="M-4.2,-1.5 Q0,-0.5 4.2,-1.5" stroke="#FFD100" strokeWidth="1" fill="none" />
          {/* Snowcapped Chimborazo mountain */}
          <path d="M-4.2,4.5 L-1.5,0.5 L1.5,0.5 L4.2,4.5 Z" fill="#2E7D32" />
          <path d="M-1.8,1.2 L0,0.2 L1.8,1.2 L1,2 L-1,2 Z" fill="#FFFFFF" />
          {/* River and steamboat */}
          <path d="M-3,4.5 Q0,2.5 3,4.5 L3,5.5 Q0,4 -3,5.5 Z" fill="#1565C0" />
          <rect x="-1.2" y="2.8" width="2.4" height="1" fill="#424242" rx="0.3" />

          {/* Fasces at bottom */}
          <rect x="-3" y="6.8" width="6" height="1.4" fill="#8D6E63" rx="0.5" />
          <ellipse cx="0" cy="7.5" rx="1.5" ry="0.6" fill="#D7CCC8" />
        </g>
      </g>
    </svg>
  );
}

