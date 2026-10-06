import React, { useEffect, useState } from 'react';
import { DoodleChildBicycle, DoodleCloud, DoodleSun } from './HandcraftedDoodles';

interface LoadingScreenProps {
  onComplete?: () => void;
  durationMs?: number;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete, durationMs = 2200 }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / durationMs) * 100));
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsVisible(false);
          onComplete?.();
        }, 300);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [durationMs, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center transition-opacity duration-500 px-6">
      <div className="w-full max-w-md relative flex flex-col items-center">
        {/* Subtle cloud and sun in background */}
        <div className="absolute -top-12 -left-4 animate-float opacity-70">
          <DoodleCloud className="w-16 h-10" />
        </div>
        <div className="absolute -top-16 -right-2 animate-sway opacity-80">
          <DoodleSun className="w-12 h-12" />
        </div>

        {/* Bicycle moving smoothly from left to right */}
        <div className="w-full relative h-32 overflow-hidden border-b-2 border-dashed border-orange-200 mb-6">
          <div
            className="absolute bottom-1 transition-all ease-linear duration-75"
            style={{ left: `calc(${progress}% - 60px)` }}
          >
            <DoodleChildBicycle className="w-24 h-24" />
          </div>
        </div>

        {/* Brand mark & Loading message */}
        <div className="text-center space-y-2">
          <span className="font-serif text-2xl text-stone-900 tracking-tight font-semibold">
            Torre de Bebel
          </span>
          <p className="text-sm text-stone-600 font-medium">
            Preparando tudo para você...
          </p>
          <p className="text-xs text-orange-700 font-handwriting text-lg">
            Viaje leve. A infância vai com você.
          </p>
        </div>

        {/* Minimalist progress track */}
        <div className="w-48 h-1 bg-stone-100 rounded-full mt-6 overflow-hidden">
          <div
            className="h-full bg-orange-500 rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
