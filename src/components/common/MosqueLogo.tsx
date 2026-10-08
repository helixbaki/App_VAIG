import React, { useState } from 'react';

interface MosqueLogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
}

export const MosqueLogo: React.FC<MosqueLogoProps> = ({
  size = 56,
  className = '',
  showText = false,
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Exact 3 Golden Arches of VAIG_V2 */}
      <div
        style={{ width: size, height: size }}
        className="relative shrink-0 rounded-2xl p-2 bg-gradient-to-br from-white/90 via-white/70 to-white/40 dark:from-slate-900/80 dark:via-slate-900/60 dark:to-slate-900/40 border border-[#A58C6F]/30 backdrop-blur-md shadow-[0_6px_24px_rgba(165,140,111,0.18)] flex items-center justify-center overflow-hidden"
      >
        {!imageError ? (
          <img
            src="/VAIG_V2.png"
            alt="VAIG Logo"
            onError={() => setImageError(true)}
            className="w-full h-full object-contain filter drop-shadow-sm"
          />
        ) : (
          <svg
            viewBox="0 0 960 760"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full text-[#A58C6F] drop-shadow-sm"
          >
            {/* Middle Arch (Tallest) */}
            <path
              d="M 280 750 L 280 200 C 280 90 370 0 480 0 C 590 0 680 90 680 200 L 680 750"
              stroke="currentColor"
              strokeWidth="36"
              strokeLinecap="round"
            />
            <path
              d="M 345 750 L 345 205 C 345 130 405 70 480 70 C 555 70 615 130 615 205 L 615 750"
              stroke="currentColor"
              strokeWidth="36"
              strokeLinecap="round"
            />

            {/* Left Arch */}
            <path
              d="M 25 750 L 25 360 C 25 240 105 160 200 160 C 295 160 375 240 375 360 L 375 750"
              stroke="currentColor"
              strokeWidth="36"
              strokeLinecap="round"
            />
            <path
              d="M 90 750 L 90 365 C 90 295 140 230 200 230 C 260 230 310 295 310 365 L 310 750"
              stroke="currentColor"
              strokeWidth="36"
              strokeLinecap="round"
            />

            {/* Right Arch */}
            <path
              d="M 585 750 L 585 360 C 585 240 665 160 760 160 C 855 160 935 240 935 360 L 935 750"
              stroke="currentColor"
              strokeWidth="36"
              strokeLinecap="round"
            />
            <path
              d="M 650 750 L 650 365 C 650 295 700 230 760 230 C 820 230 870 295 870 365 L 870 750"
              stroke="currentColor"
              strokeWidth="36"
              strokeLinecap="round"
            />
          </svg>
        )}
      </div>

      {showText && (
        <div className="flex flex-col text-left">
          <span className="text-base font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
            Verein der Albanisch-Islamischen Gemeinschaft (VAIG)
          </span>
          <span className="text-xs font-semibold text-[#A58C6F] tracking-wide mt-0.5">
            Moschee Salmsach · Schulstrasse 19
          </span>
        </div>
      )}
    </div>
  );
};
