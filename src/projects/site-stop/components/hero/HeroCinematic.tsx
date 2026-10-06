import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Clock, MapPin, Sparkles, Luggage, Lock, Unlock, CheckCircle2 } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { HUBS } from '../../data/hubs';

export const HeroCinematic: React.FC = () => {
  const {
    selectedHubId,
    setSelectedHubId,
    setIsBookingModalOpen,
  } = useBooking();

  const [lockerAnimatedState, setLockerAnimatedState] = useState<'open' | 'storing' | 'locked'>('open');

  const triggerLockerAnimation = () => {
    if (lockerAnimatedState === 'open') {
      setLockerAnimatedState('storing');
      setTimeout(() => {
        setLockerAnimatedState('locked');
      }, 550);
    } else {
      setLockerAnimatedState('open');
    }
  };

  const currentHub = HUBS.find((h) => h.id === selectedHubId) || HUBS[0];

  const scrollToPlanner = () => {
    const el = document.getElementById('travel-planner');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden pt-6 pb-12 lg:pt-10 lg:pb-16 flex flex-col justify-center">
      {/* Background with cinematic lighting & airport backdrop */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/src/assets/images/stopcase_hero_freedom_1791260867797.jpg"
          alt="Viajante livre em aeroporto moderno"
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-center opacity-20 filter brightness-75 contrast-125 scale-105"
        />
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-[#070B14]/85 to-[#070B14]/70" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[750px] rounded-full bg-sky-600/10 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        {/* City Selector Pills */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs font-semibold text-slate-400 mr-1 flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-sky-400" />
            Escolha sua cidade:
          </span>
          {HUBS.map((hub) => {
            const isActive = hub.id === selectedHubId;
            return (
              <button
                key={hub.id}
                onClick={() => setSelectedHubId(hub.id)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/30'
                    : 'bg-slate-900/80 text-slate-300 border border-slate-800 hover:border-slate-700 hover:text-white'
                }`}
              >
                <span>{hub.name}</span>
                <span className="ml-1 opacity-70 font-mono text-[10px]">({hub.airportCode})</span>
              </button>
            );
          })}
        </div>

        {/* Hero Content: Aligned 2-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Headline, Subheadline & CTAs */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3.5 py-1 text-xs font-semibold text-sky-300">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-ping" />
              <span>O novo padrão digital para guarda-volumes e lockers</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08] font-display">
              DEIXE A MALA.<br />
              <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
                LEVE A VIAGEM.
              </span>
            </h1>

            <p className="max-w-xl text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Guarde sua bagagem com a StopCase e aproveite cada minuto do seu dia.
              Seu tempo entre check-out, conexões e voos vale muito mais do que carregar peso.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-1">
              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-sky-500 px-6 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-sky-500/25 hover:bg-sky-400 active:scale-95 transition-all cursor-pointer"
              >
                <span>Encontrar meu locker</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={scrollToPlanner}
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/70 px-5 py-3 text-sm font-semibold text-slate-200 hover:border-sky-500/50 hover:text-white transition-all cursor-pointer backdrop-blur-sm"
              >
                <Clock className="h-4 w-4 text-sky-400" />
                <span>O que fazer com meu tempo?</span>
              </button>
            </div>

            {/* Value tags */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-1.5 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-sky-400" />
                Chegue. Guarde. Vá.
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-sky-400" />
                Autoatendimento digital
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-sky-400" />
                {currentHub.airportName}
              </span>
            </div>
          </div>

          {/* Right Column: Sleek, compact interactive locker widget (smaller, aligned) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-[330px] rounded-2xl border border-slate-800 bg-[#0B132B]/90 p-4 sm:p-5 backdrop-blur-xl shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-sky-400" />
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-300">
                    Smart Locker · {currentHub.airportCode}
                  </span>
                </div>
                <button
                  onClick={triggerLockerAnimation}
                  className="text-xs font-semibold text-sky-400 hover:text-sky-300 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  {lockerAnimatedState === 'locked' ? (
                    <>
                      <Unlock className="h-3 w-3" />
                      <span>Abrir</span>
                    </>
                  ) : (
                    <>
                      <Lock className="h-3 w-3" />
                      <span>Guardar</span>
                    </>
                  )}
                </button>
              </div>

              {/* Compact Visual simulation stage */}
              <div className="py-4 flex flex-col items-center justify-center">
                <div className="relative w-full h-36 rounded-xl border border-slate-700 bg-slate-950/90 p-3 flex flex-col items-center justify-center overflow-hidden">
                  {/* Locker Door Overlay */}
                  <motion.div
                    className={`absolute inset-0 rounded-xl border border-sky-500/40 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 flex flex-col items-center justify-center p-3 z-10 transition-all ${
                      lockerAnimatedState === 'locked' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
                    }`}
                    transition={{ duration: 0.35 }}
                  >
                    <div className="h-8 w-8 rounded-full bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-300 mb-1.5">
                      <Lock className="h-4 w-4" />
                    </div>
                    <span className="text-[11px] font-mono text-sky-400 tracking-wider font-bold">
                      COMPARTIMENTO SELADO
                    </span>
                    <span className="text-[10px] text-slate-400 mt-0.5">Locker M-07 · Monitorado</span>
                    <div className="mt-2 flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
                      <Sparkles className="h-3 w-3" />
                      <span>Agora você está livre.</span>
                    </div>
                  </motion.div>

                  {/* Suitcase gliding inside */}
                  <motion.div
                    animate={
                      lockerAnimatedState === 'open'
                        ? { y: 0, scale: 1, opacity: 1 }
                        : lockerAnimatedState === 'storing'
                        ? { y: 10, scale: 0.9, opacity: 0.8 }
                        : { y: 20, scale: 0.8, opacity: 0 }
                    }
                    transition={{ duration: 0.35 }}
                    className="flex flex-col items-center cursor-pointer group"
                    onClick={triggerLockerAnimation}
                  >
                    <div className="relative flex h-20 w-16 flex-col items-center justify-center rounded-xl border border-sky-400/40 bg-gradient-to-b from-slate-800 to-slate-900 shadow-md group-hover:scale-105 transition-transform">
                      <div className="absolute -top-2.5 h-2.5 w-6 rounded-t border-t-2 border-x-2 border-slate-500" />
                      <Luggage className="h-6 w-6 text-sky-400 mb-0.5" />
                      <span className="text-[9px] font-mono font-bold text-slate-300">18kg</span>
                      <div className="absolute -bottom-1 flex gap-4">
                        <div className="h-1.5 w-1.5 rounded-full bg-slate-600" />
                        <div className="h-1.5 w-1.5 rounded-full bg-slate-600" />
                      </div>
                    </div>
                    <span className="mt-2 text-[10px] font-medium text-slate-400 group-hover:text-sky-300 transition-colors">
                      {lockerAnimatedState === 'open' ? 'Toque para guardar' : 'Armazenando...'}
                    </span>
                  </motion.div>
                </div>

                <div className="mt-2.5 text-center">
                  <span className="text-[11px] font-medium text-slate-300">
                    {lockerAnimatedState === 'locked' ? (
                      <span className="text-emerald-400">✓ Bagagem protegida no aeroporto</span>
                    ) : (
                      <span className="text-slate-400">Simulação interativa do armário</span>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
