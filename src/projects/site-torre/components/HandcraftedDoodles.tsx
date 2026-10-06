import React from 'react';

// Handcrafted organic strokes mimicking colored pencil & crayon drawings
interface DoodleProps {
  className?: string;
  color?: string;
  size?: number;
}

export const DoodleSun: React.FC<DoodleProps> = ({ className = 'w-8 h-8', color = '#F59E0B' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Irregular hand-drawn sun body */}
    <path
      d="M50 24 C65 23 76 34 75 49 C74 64 63 75 48 76 C33 77 24 65 24 51 C24 36 34 25 50 24 Z"
      fill="#FEF3C7"
      stroke={color}
      strokeWidth="4.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray="1 1"
    />
    {/* Hand-drawn rays */}
    <path d="M50 8 C49 14 51 18 50 20" stroke={color} strokeWidth="4" strokeLinecap="round" />
    <path d="M50 80 C50 83 49 87 50 92" stroke={color} strokeWidth="4" strokeLinecap="round" />
    <path d="M8 50 C13 50 17 49 20 50" stroke={color} strokeWidth="4" strokeLinecap="round" />
    <path d="M80 50 C83 50 87 51 92 50" stroke={color} strokeWidth="4" strokeLinecap="round" />
    <path d="M21 21 C25 25 27 28 29 30" stroke={color} strokeWidth="4" strokeLinecap="round" />
    <path d="M71 71 C74 74 77 77 80 80" stroke={color} strokeWidth="4" strokeLinecap="round" />
    <path d="M79 21 C76 25 73 28 71 30" stroke={color} strokeWidth="4" strokeLinecap="round" />
    <path d="M21 79 C24 76 27 73 29 71" stroke={color} strokeWidth="4" strokeLinecap="round" />
    {/* Cute little eyes & smile */}
    <circle cx="43" cy="46" r="2.5" fill={color} />
    <circle cx="57" cy="46" r="2.5" fill={color} />
    <path d="M45 55 C47 58 53 58 55 55" stroke={color} strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export const DoodleCloud: React.FC<DoodleProps> = ({ className = 'w-10 h-7', color = '#93C5FD' }) => (
  <svg viewBox="0 0 100 65" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M20 50 C12 50 8 42 12 34 C14 28 22 26 26 29 C28 20 40 14 50 18 C56 12 70 12 76 20 C84 18 92 26 90 35 C96 42 90 50 82 50 C80 50 20 50 20 50 Z"
      fill="#EFF6FF"
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const DoodleAirplane: React.FC<DoodleProps> = ({ className = 'w-10 h-10', color = '#EA580C' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Hand-drawn airplane body */}
    <path
      d="M18 52 C22 47 38 45 68 40 C78 38 88 44 87 50 C86 56 76 60 66 60 C38 60 22 58 18 52 Z"
      fill="#FFF7ED"
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round"
    />
    {/* Tail fin */}
    <path d="M22 49 L14 34 C12 31 16 28 20 32 L30 47" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="#FFEDD5" />
    {/* Wings */}
    <path d="M46 45 L38 22 C37 19 43 17 47 21 L58 43" stroke={color} strokeWidth="4" strokeLinecap="round" fill="#FFEDD5" />
    <path d="M50 58 L42 78 C41 81 46 83 49 80 L60 59" stroke={color} strokeWidth="4" strokeLinecap="round" fill="#FFEDD5" />
    {/* Windows */}
    <circle cx="56" cy="48" r="2" fill={color} />
    <circle cx="64" cy="47" r="2" fill={color} />
    <circle cx="72" cy="47" r="2" fill={color} />
  </svg>
);

export const DoodleStroller: React.FC<DoodleProps> = ({ className = 'w-10 h-10', color = '#EA580C' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Canopy / Seat */}
    <path
      d="M32 46 C32 30 46 22 62 25 C64 26 66 38 66 48 C66 54 60 58 52 58 L36 58 C32 58 32 52 32 46 Z"
      fill="#FFF7ED"
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round"
    />
    <path d="M32 46 L64 46" stroke={color} strokeWidth="3" strokeLinecap="round" strokeDasharray="3 3" />
    {/* Handlebar */}
    <path d="M22 22 C24 18 29 20 30 24 L48 58" stroke={color} strokeWidth="4" strokeLinecap="round" />
    {/* Frame legs */}
    <path d="M46 54 L32 76" stroke={color} strokeWidth="4.5" strokeLinecap="round" />
    <path d="M48 54 L64 76" stroke={color} strokeWidth="4.5" strokeLinecap="round" />
    {/* Wheels */}
    <circle cx="30" cy="78" r="9" stroke={color} strokeWidth="4" fill="#FEF3C7" />
    <circle cx="30" cy="78" r="2.5" fill={color} />
    <circle cx="66" cy="78" r="9" stroke={color} strokeWidth="4" fill="#FEF3C7" />
    <circle cx="66" cy="78" r="2.5" fill={color} />
  </svg>
);

export const DoodleCarSeat: React.FC<DoodleProps> = ({ className = 'w-10 h-10', color = '#EA580C' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Shell */}
    <path
      d="M30 26 C42 22 64 24 72 38 C76 46 74 62 68 70 C62 78 44 80 34 76 C24 72 20 58 24 46 L30 26 Z"
      fill="#FFF7ED"
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Carrying Handle */}
    <path
      d="M26 48 C24 30 38 18 52 18 C64 18 74 28 72 44"
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round"
    />
    {/* Cushion / Belt buckle */}
    <path d="M38 42 C44 40 56 42 60 48" stroke={color} strokeWidth="3" strokeLinecap="round" />
    <circle cx="48" cy="58" r="3.5" fill={color} />
  </svg>
);

export const DoodleCrib: React.FC<DoodleProps> = ({ className = 'w-10 h-10', color = '#EA580C' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Crib frame */}
    <rect x="20" y="36" width="60" height="34" rx="4" fill="#FFF7ED" stroke={color} strokeWidth="4" strokeLinecap="round" />
    {/* Slats */}
    <path d="M32 36 L32 70" stroke={color} strokeWidth="3" strokeLinecap="round" />
    <path d="M44 36 L44 70" stroke={color} strokeWidth="3" strokeLinecap="round" />
    <path d="M56 36 L56 70" stroke={color} strokeWidth="3" strokeLinecap="round" />
    <path d="M68 36 L68 70" stroke={color} strokeWidth="3" strokeLinecap="round" />
    {/* Legs */}
    <path d="M22 70 L20 84" stroke={color} strokeWidth="4" strokeLinecap="round" />
    <path d="M78 70 L80 84" stroke={color} strokeWidth="4" strokeLinecap="round" />
    {/* Little mobile dangling star */}
    <path d="M50 36 L50 20 C54 18 56 16 54 12" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <path d="M54 12 L58 14 L55 18 L51 16 Z" fill="#F59E0B" />
  </svg>
);

export const DoodleSuitcase: React.FC<DoodleProps> = ({ className = 'w-10 h-10', color = '#EA580C' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Suitcase body */}
    <rect x="24" y="32" width="52" height="46" rx="7" fill="#FFF7ED" stroke={color} strokeWidth="4" strokeLinecap="round" />
    {/* Bands */}
    <path d="M40 32 L40 78" stroke={color} strokeWidth="3" strokeLinecap="round" strokeDasharray="3 3" />
    <path d="M60 32 L60 78" stroke={color} strokeWidth="3" strokeLinecap="round" strokeDasharray="3 3" />
    {/* Retractable Handle */}
    <path d="M42 32 L42 18 C42 16 58 16 58 18 L58 32" stroke={color} strokeWidth="4" strokeLinecap="round" />
    {/* Handle bar grip */}
    <path d="M38 18 L62 18" stroke={color} strokeWidth="5" strokeLinecap="round" />
    {/* Wheels */}
    <circle cx="34" cy="82" r="3.5" fill={color} />
    <circle cx="66" cy="82" r="3.5" fill={color} />
  </svg>
);

export const DoodlePacifier: React.FC<DoodleProps> = ({ className = 'w-8 h-8', color = '#EA580C' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Teat */}
    <path d="M40 38 C32 26 50 14 62 24 C68 30 60 40 54 44" fill="#FEF3C7" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
    {/* Shield */}
    <ellipse cx="50" cy="50" rx="26" ry="14" fill="#FFEDD5" stroke={color} strokeWidth="4" />
    {/* Ring */}
    <path d="M38 56 C34 74 66 74 62 56" stroke={color} strokeWidth="4" strokeLinecap="round" fill="none" />
  </svg>
);

export const DoodleFeedingChair: React.FC<DoodleProps> = ({ className = 'w-10 h-10', color = '#EA580C' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Seat back */}
    <path d="M36 24 C36 20 62 20 62 24 L60 52 L38 52 Z" fill="#FFF7ED" stroke={color} strokeWidth="4" strokeLinecap="round" />
    {/* Tray */}
    <rect x="28" y="42" width="44" height="10" rx="3" fill="#FEF3C7" stroke={color} strokeWidth="3.5" />
    {/* Legs */}
    <path d="M36 54 L24 86" stroke={color} strokeWidth="4" strokeLinecap="round" />
    <path d="M62 54 L74 86" stroke={color} strokeWidth="4" strokeLinecap="round" />
    <path d="M40 54 L36 86" stroke={color} strokeWidth="3" strokeLinecap="round" />
    <path d="M58 54 L62 86" stroke={color} strokeWidth="3" strokeLinecap="round" />
    {/* Footrest */}
    <path d="M30 70 L68 70" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
  </svg>
);

export const DoodleHeart: React.FC<DoodleProps> = ({ className = 'w-6 h-6', color = '#F43F5E' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M50 82 C25 66 12 50 14 34 C16 18 34 16 48 26 C50 28 52 28 54 26 C66 16 84 18 86 34 C88 50 75 66 50 82 Z"
      fill="#FFE4E6"
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const DoodleStar: React.FC<DoodleProps> = ({ className = 'w-6 h-6', color = '#F59E0B' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M50 14 L60 36 L84 39 L66 56 L71 80 L50 68 L29 80 L34 56 L16 39 L40 36 Z"
      fill="#FEF3C7"
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const DoodleHouse: React.FC<DoodleProps> = ({ className = 'w-8 h-8', color = '#EA580C' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Roof */}
    <path d="M18 48 L50 20 L82 48" stroke={color} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="#FFEDD5" />
    {/* Chimney */}
    <path d="M68 34 L68 22 L76 22 L76 40" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
    {/* Walls */}
    <rect x="26" y="48" width="48" height="38" rx="2" fill="#FFF7ED" stroke={color} strokeWidth="4" />
    {/* Door */}
    <path d="M42 86 L42 64 C42 62 58 62 58 64 L58 86" stroke={color} strokeWidth="3.5" strokeLinecap="round" fill="#FED7AA" />
  </svg>
);

export const DoodleHotel: React.FC<DoodleProps> = ({ className = 'w-8 h-8', color = '#EA580C' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="22" y="22" width="56" height="64" rx="4" fill="#FFF7ED" stroke={color} strokeWidth="4" strokeLinecap="round" />
    {/* Windows grid */}
    <rect x="30" y="32" width="10" height="10" rx="1" fill="#FEF3C7" stroke={color} strokeWidth="2.5" />
    <rect x="45" y="32" width="10" height="10" rx="1" fill="#FEF3C7" stroke={color} strokeWidth="2.5" />
    <rect x="60" y="32" width="10" height="10" rx="1" fill="#FEF3C7" stroke={color} strokeWidth="2.5" />
    <rect x="30" y="48" width="10" height="10" rx="1" fill="#FEF3C7" stroke={color} strokeWidth="2.5" />
    <rect x="45" y="48" width="10" height="10" rx="1" fill="#FEF3C7" stroke={color} strokeWidth="2.5" />
    <rect x="60" y="48" width="10" height="10" rx="1" fill="#FEF3C7" stroke={color} strokeWidth="2.5" />
    {/* Hotel canopy entrance */}
    <path d="M38 86 L38 72 C38 68 62 68 62 72 L62 86" stroke={color} strokeWidth="3.5" strokeLinecap="round" fill="#FED7AA" />
  </svg>
);

// Child riding bicycle for the loading animation requested in item 5
export const DoodleChildBicycle: React.FC<DoodleProps> = ({ className = 'w-24 h-24', color = '#EA580C' }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Rear Wheel */}
    <circle cx="32" cy="85" r="16" stroke={color} strokeWidth="4" fill="#FFF7ED" />
    <circle cx="32" cy="85" r="4" fill={color} />
    <path d="M32 69 L32 101" stroke={color} strokeWidth="2" strokeDasharray="2 2" />
    <path d="M16 85 L48 85" stroke={color} strokeWidth="2" strokeDasharray="2 2" />

    {/* Front Wheel */}
    <circle cx="88" cy="85" r="16" stroke={color} strokeWidth="4" fill="#FFF7ED" />
    <circle cx="88" cy="85" r="4" fill={color} />
    <path d="M88 69 L88 101" stroke={color} strokeWidth="2" strokeDasharray="2 2" />
    <path d="M72 85 L104 85" stroke={color} strokeWidth="2" strokeDasharray="2 2" />

    {/* Bicycle Frame */}
    <path d="M32 85 L56 85 L76 60 L48 60 Z" stroke={color} strokeWidth="4.5" strokeLinejoin="round" fill="#FED7AA" />
    <path d="M56 85 L50 52" stroke={color} strokeWidth="4.5" strokeLinecap="round" />
    <path d="M88 85 L74 48" stroke={color} strokeWidth="4.5" strokeLinecap="round" />
    {/* Handlebars */}
    <path d="M70 48 L80 48 C83 48 85 45 84 42" stroke={color} strokeWidth="4" strokeLinecap="round" />
    {/* Saddle */}
    <path d="M44 50 C46 48 54 48 56 50 C58 52 50 54 44 50 Z" fill={color} stroke={color} strokeWidth="2" />

    {/* Child - Legs */}
    <path d="M50 52 L58 70 L62 82" stroke="#2563EB" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    {/* Child - Body */}
    <path d="M52 50 C52 42 56 36 60 36 C64 36 64 44 60 52 Z" fill="#FB923C" stroke={color} strokeWidth="3.5" />
    {/* Child - Arms holding handlebar */}
    <path d="M58 40 L74 48" stroke="#FDBA74" strokeWidth="4" strokeLinecap="round" />
    {/* Child - Head */}
    <circle cx="62" cy="26" r="9" fill="#FED7AA" stroke={color} strokeWidth="3.5" />
    {/* Cap / Helmet */}
    <path d="M54 24 C55 16 70 16 72 24 C72 24 76 25 76 27 C74 29 68 28 66 28" fill="#F43F5E" stroke="#E11D48" strokeWidth="2.5" />
    {/* Smiling face */}
    <circle cx="65" cy="26" r="1.5" fill={color} />
    <path d="M63 30 C65 32 68 32 69 30" stroke={color} strokeWidth="2" strokeLinecap="round" />

    {/* Speed dash marks */}
    <path d="M8 82 L14 82" stroke="#EA580C" strokeWidth="3" strokeLinecap="round" />
    <path d="M4 88 L12 88" stroke="#EA580C" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// Connected Hero Journey line doodle: Casa -> Avião -> Mala -> Bebê -> Hotel -> Coração
export const HeroJourneyPath: React.FC<{ className?: string }> = ({ className = 'w-full' }) => (
  <div className={`relative py-6 ${className}`}>
    <div className="flex items-center justify-between max-w-4xl mx-auto px-4 relative">
      {/* Hand-drawn connecting dotted trajectory */}
      <div className="absolute top-1/2 left-8 right-8 -translate-y-1/2 h-0.5 border-t-2 border-dashed border-orange-300 -z-0 pointer-events-none" />

      {/* Step 1: Casa */}
      <div className="relative z-10 flex flex-col items-center group">
        <div className="w-12 h-12 rounded-2xl bg-white border border-orange-200 shadow-sm flex items-center justify-center p-2 group-hover:scale-105 transition-transform">
          <DoodleHouse className="w-8 h-8" />
        </div>
        <span className="text-xs font-medium text-neutral-600 mt-2">Sua Casa</span>
        <span className="text-[10px] text-neutral-400">Sem carregar tudo</span>
      </div>

      {/* Step 2: Avião */}
      <div className="relative z-10 flex flex-col items-center group">
        <div className="w-12 h-12 rounded-2xl bg-white border border-orange-200 shadow-sm flex items-center justify-center p-2 group-hover:scale-105 transition-transform animate-float">
          <DoodleAirplane className="w-8 h-8" />
        </div>
        <span className="text-xs font-medium text-neutral-600 mt-2">Voo Tranquilo</span>
        <span className="text-[10px] text-neutral-400">Bagagem leve</span>
      </div>

      {/* Step 3: Chegada / Mala */}
      <div className="relative z-10 flex flex-col items-center group">
        <div className="w-12 h-12 rounded-2xl bg-white border border-orange-200 shadow-sm flex items-center justify-center p-2 group-hover:scale-105 transition-transform">
          <DoodleSuitcase className="w-8 h-8" />
        </div>
        <span className="text-xs font-medium text-neutral-600 mt-2">Aeroporto</span>
        <span className="text-[10px] text-neutral-400">Entrega no desembarque</span>
      </div>

      {/* Step 4: Carrinho / Bebê */}
      <div className="relative z-10 flex flex-col items-center group">
        <div className="w-12 h-12 rounded-2xl bg-white border border-orange-200 shadow-sm flex items-center justify-center p-2 group-hover:scale-105 transition-transform">
          <DoodleStroller className="w-8 h-8" />
        </div>
        <span className="text-xs font-medium text-neutral-600 mt-2">Seus Produtos</span>
        <span className="text-[10px] text-neutral-400">Higienizados e prontos</span>
      </div>

      {/* Step 5: Hotel / Destino */}
      <div className="relative z-10 flex flex-col items-center group">
        <div className="w-12 h-12 rounded-2xl bg-white border border-orange-200 shadow-sm flex items-center justify-center p-2 group-hover:scale-105 transition-transform">
          <DoodleHotel className="w-8 h-8" />
        </div>
        <span className="text-xs font-medium text-neutral-600 mt-2">Hotel ou Resort</span>
        <span className="text-[10px] text-neutral-400">Berço já no quarto</span>
      </div>

      {/* Step 6: Família / Memórias */}
      <div className="relative z-10 flex flex-col items-center group">
        <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 shadow-sm flex items-center justify-center p-2 group-hover:scale-105 transition-transform">
          <DoodleHeart className="w-8 h-8" />
        </div>
        <span className="text-xs font-medium text-rose-700 mt-2">Memórias Leves</span>
        <span className="text-[10px] text-rose-400">Família feliz</span>
      </div>
    </div>
  </div>
);
