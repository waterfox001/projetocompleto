import React from 'react';

interface StopcaseLogoProps {
  className?: string;
  size?: number | string;
  showText?: boolean;
  textClassName?: string;
}

export const StopcaseLogo: React.FC<StopcaseLogoProps> = ({
  className = 'w-7 h-7',
  size,
  showText = false,
  textClassName = 'text-slate-900'
}) => {
  const style = size ? { width: size, height: size } : undefined;

  return (
    <div className="inline-flex items-center gap-2.5 shrink-0">
      <svg
        viewBox="0 0 512 512"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={style}
      >
        {/* Left Side Bumper */}
        <rect
          x="52"
          y="145"
          width="70"
          height="282"
          rx="35"
          fill="#F1A80A"
        />

        {/* Right Side Bumper */}
        <rect
          x="390"
          y="145"
          width="70"
          height="282"
          rx="35"
          fill="#F1A80A"
        />

        {/* Central Luggage Body with Integrated Handle */}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M 192 60
             C 172 60 164 76 164 96
             L 164 140
             L 154 140
             C 138 140 138 152 138 168
             L 138 396
             C 138 418 152 427 174 427
             L 338 427
             C 360 427 374 418 374 396
             L 374 168
             C 374 152 374 140 358 140
             L 348 140
             L 348 96
             C 348 76 340 60 320 60
             Z
             M 200 98
             L 312 98
             C 316 98 318 100 318 104
             L 318 134
             C 318 138 316 140 312 140
             L 200 140
             C 196 140 194 138 194 134
             L 194 104
             C 194 100 196 98 200 98
             Z"
          fill="#F1A80A"
        />

        {/* Upper Connectivity / Wi-Fi Symbol (White) */}
        {/* Arc 1 (Top) */}
        <path
          d="M 194 195 A 74 74 0 0 1 318 195"
          stroke="#FFFFFF"
          strokeWidth="16"
          strokeLinecap="round"
        />
        {/* Arc 2 (Middle) */}
        <path
          d="M 211 219 A 51 51 0 0 1 301 219"
          stroke="#FFFFFF"
          strokeWidth="15"
          strokeLinecap="round"
        />
        {/* Arc 3 (Inner) */}
        <path
          d="M 229 242 A 29 29 0 0 1 283 242"
          stroke="#FFFFFF"
          strokeWidth="14"
          strokeLinecap="round"
        />
        {/* Center Signal Dot */}
        <circle cx="256" cy="265" r="9.5" fill="#FFFFFF" />

        {/* Lower Security Badge (Solid White Circle) */}
        <circle cx="256" cy="350" r="62" fill="#FFFFFF" />

        {/* Golden Keyhole Silhouette Cutout inside White Circle */}
        <circle cx="256" cy="334" r="22" fill="#F1A80A" />
        <path
          d="M 244 338
             L 268 338
             L 275 385
             C 275 387 273 388 271 388
             L 241 388
             C 239 388 237 387 237 385
             Z"
          fill="#F1A80A"
        />
      </svg>

      {showText && (
        <div className="min-w-0">
          <div className={`text-xs font-bold tracking-tight flex items-center gap-1.5 leading-none ${textClassName}`}>
            <span>STOPCASE</span>
            <span className="text-[10px] px-1 py-0.5 bg-slate-100 text-slate-600 border border-slate-200 rounded font-mono font-medium">
              OS
            </span>
          </div>
          <div className="text-[10px] text-slate-500 truncate mt-0.5">
            Aeroportos & Bagagens
          </div>
        </div>
      )}
    </div>
  );
};
