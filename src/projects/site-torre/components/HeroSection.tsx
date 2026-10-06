import React from 'react';
import { ArrowRight, ShieldCheck, Sparkles, Plane, Award } from 'lucide-react';
import { UnitId, Product } from '../types';
import { HeroPlannerCard } from './HeroPlannerCard';
import { DoodleAirplane, DoodleSun, DoodleCloud, HeroJourneyPath } from './HandcraftedDoodles';

interface HeroSectionProps {
  unitId: UnitId;
  onFindProducts: () => void;
  onHowItWorks: () => void;
  onBookKit: (products: Product[], days: number) => void;
  onOpenChecklistModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  unitId,
  onFindProducts,
  onHowItWorks,
  onBookKit,
  onOpenChecklistModal,
}) => {
  return (
    <section id="hero" className="relative pt-6 pb-12 md:pt-10 md:pb-20 overflow-hidden">
      {/* Background soft ambient shapes & handcrafted touches */}
      <div className="absolute top-6 left-1/4 -z-10 opacity-70 animate-float pointer-events-none">
        <DoodleCloud className="w-16 h-10" />
      </div>
      <div className="absolute top-10 right-8 -z-10 opacity-80 animate-sway pointer-events-none">
        <DoodleSun className="w-14 h-14" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-start">
          {/* Left Column: Emotional Prose & Direct Navigation */}
          <div className="lg:col-span-6 space-y-5 text-left pt-2">
            {/* Hand-drawn kicker note */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-100/70 border border-orange-200/80 text-orange-900 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-orange-600" />
              <span>Locação Infantil Premium & Turismo Familiar</span>
              <span className="text-orange-400">·</span>
              <span className="font-handwriting text-base text-orange-800">Menos peso, mais afeto</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight leading-[1.14] text-balance">
              Viaje leve.{' '}
              <span className="relative inline-block text-orange-600">
                A infância vai com você.
                <svg
                  className="absolute left-0 -bottom-1.5 w-full h-2.5 text-orange-300 -z-10"
                  viewBox="0 0 250 12"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M3 8.5C50 3.5 150 2 247 9.5"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-xl text-balance">
              Tudo o que seu bebê precisa para viajar, passear e dormir com conforto — sem você precisar despachar carrinhos pesados, berços e tralhas no aeroporto.
            </p>

            {/* CTAs */}
            <div className="pt-1 flex flex-wrap items-center gap-3">
              <button
                onClick={onFindProducts}
                className="px-5 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-semibold text-sm shadow-md shadow-orange-600/25 transition-all hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Ver Catálogo Completo</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onHowItWorks}
                className="px-4 py-3 rounded-xl text-stone-700 hover:text-stone-900 hover:bg-stone-100 font-semibold text-sm transition-colors text-center cursor-pointer"
              >
                Como funciona o aluguel
              </button>
            </div>

            {/* Trust markers */}
            <div className="pt-4 border-t border-stone-200/80 grid grid-cols-3 gap-3 text-left">
              <div>
                <div className="flex items-center gap-1.5 text-stone-900 font-bold text-xs sm:text-sm">
                  <Plane className="w-4 h-4 text-orange-600 shrink-0" />
                  <span>No Aeroporto</span>
                </div>
                <p className="text-[11px] text-stone-500 mt-0.5">Esperando no desembarque</p>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-stone-900 font-bold text-xs sm:text-sm">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Vapor 140°C</span>
                </div>
                <p className="text-[11px] text-stone-500 mt-0.5">Esterilização hospitalar</p>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-stone-900 font-bold text-xs sm:text-sm">
                  <Award className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>+13.500 Famílias</span>
                </div>
                <p className="text-[11px] text-stone-500 mt-0.5">Atendidas com carinho</p>
              </div>
            </div>
          </div>

          {/* Right Column: Prominent Interactive Diagnostic Card (Circled in user reference image) */}
          <div className="lg:col-span-6 relative">
            <HeroPlannerCard
              unitId={unitId}
              onBookKit={onBookKit}
              onOpenChecklistModal={onOpenChecklistModal}
            />
          </div>
        </div>

        {/* Handcrafted Journey Path Connecting the steps */}
        <div className="mt-10 pt-6 border-t border-stone-200/60">
          <HeroJourneyPath />
        </div>
      </div>
    </section>
  );
};
