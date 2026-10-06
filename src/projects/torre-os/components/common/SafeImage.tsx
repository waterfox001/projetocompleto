import React, { useState } from 'react';
import { Package, Baby, Sparkles, Shield, Tag } from 'lucide-react';

interface SafeImageProps {
  src?: string;
  alt: string;
  className?: string;
  category?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  className = '',
  category
}) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Fallback icon based on category
  const renderFallback = () => {
    return (
      <div
        className={`bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-200/80 flex flex-col items-center justify-center text-slate-400 p-2 select-none ${className}`}
      >
        <Baby className="w-6 h-6 stroke-[1.8] text-slate-400/80 mb-1" />
        <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider text-center line-clamp-1 px-1">
          {category || 'Item'}
        </span>
      </div>
    );
  };

  if (!src || error) {
    return renderFallback();
  }

  return (
    <div className={`relative overflow-hidden bg-slate-100 ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 bg-slate-100 animate-pulse flex items-center justify-center">
          <Baby className="w-5 h-5 text-slate-300" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};
