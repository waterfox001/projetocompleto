import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { LOCKER_TYPES } from '../../data/lockers';
import { HUBS } from '../../data/hubs';
import { LockerSize } from '../../types';
import { Box, CheckCircle2, Shield, Sparkles, ArrowRight, Lock, Eye, AlertCircle } from 'lucide-react';

export const Locker360Visualizer: React.FC = () => {
  const {
    selectedSize,
    setSelectedSize,
    selectedHubId,
    setIsBookingModalOpen,
    setIsSizeRecommenderOpen,
  } = useBooking();

  const [doorOpen, setDoorOpen] = useState(true);

  const currentHub = HUBS.find((h) => h.id === selectedHubId) || HUBS[0];
  const activeLocker = LOCKER_TYPES.find((l) => l.id === selectedSize) || LOCKER_TYPES[1];

  const currentAvailable =
    selectedSize === 'small'
      ? currentHub.lockersCount.small
      : selectedSize === 'medium'
      ? currentHub.lockersCount.medium
      : currentHub.lockersCount.large;

  return (
    <section id="tamanhos" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
        <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
          Experiência Visual Interativa
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
          Locker 360° · Encontre seu tamanho
        </h2>
        <p className="text-sm text-slate-300">
          Compare os compartimentos inteligentes da StopCase e veja visualmente a capacidade de cada tamanho para suas malas.
        </p>
      </div>

      {/* Size Selector Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
        {LOCKER_TYPES.map((locker) => {
          const isSelected = locker.id === selectedSize;
          return (
            <button
              key={locker.id}
              onClick={() => setSelectedSize(locker.id)}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                isSelected
                  ? 'bg-sky-500 text-slate-950 shadow-lg shadow-sky-500/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
              }`}
            >
              <Box className="h-4 w-4" />
              <span>{locker.name}</span>
              <span className="opacity-70 font-mono text-[10px]">
                (R$ {locker.dailyPrice}/dia)
              </span>
            </button>
          );
        })}
      </div>

      {/* Interactive 3D / Perspective Locker Display */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl border border-slate-800 bg-[#090F1E] p-6 sm:p-10 shadow-2xl">
        {/* Left Column: 3D Perspective Box Graphic */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center p-8 rounded-2xl border border-slate-800 bg-slate-950/90 relative min-h-[380px]">
          {/* Top Controls */}
          <div className="w-full flex items-center justify-between pb-4 border-b border-slate-800 text-xs">
            <span className="font-mono text-sky-400 font-bold uppercase">
              VISUALIZADOR · LOCKER {activeLocker.id.toUpperCase()}
            </span>
            <button
              onClick={() => setDoorOpen(!doorOpen)}
              className="text-xs text-slate-300 hover:text-white flex items-center gap-1.5 bg-slate-800 px-3 py-1 rounded-lg cursor-pointer"
            >
              <Eye className="h-3.5 w-3.5 text-sky-400" />
              <span>{doorOpen ? 'Fechar porta' : 'Abrir porta (ver interior)'}</span>
            </button>
          </div>

          {/* Perspective Locker Unit */}
          <div className="my-8 relative flex items-center justify-center">
            {/* Outer Pod Frame with proportional size */}
            <div
              className={`relative rounded-3xl border-2 border-sky-400/30 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 shadow-2xl transition-all duration-500 flex flex-col items-center justify-center p-6 ${
                selectedSize === 'small'
                  ? 'w-52 h-64'
                  : selectedSize === 'medium'
                  ? 'w-64 h-80'
                  : 'w-76 h-96'
              }`}
            >
              {/* LED Status line at the top */}
              <div className="absolute top-3 inset-x-6 flex justify-between items-center text-[10px] text-slate-400 font-mono">
                <span className="flex items-center gap-1 text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  ONLINE
                </span>
                <span className="text-slate-400">#SC-BOX</span>
              </div>

              {/* Inside interior when door is open */}
              {doorOpen ? (
                <div className="w-full h-full pt-4 flex flex-col items-center justify-center text-center space-y-3">
                  <div className="text-4xl">
                    {selectedSize === 'small'
                      ? '🎒 💻'
                      : selectedSize === 'medium'
                      ? '🧳 🎒'
                      : '🧳 🧳 🎒'}
                  </div>
                  <div className="text-xs font-bold text-sky-200">
                    Interior iluminado LED
                  </div>
                  <div className="text-[11px] text-slate-400 max-w-[180px]">
                    {activeLocker.capacityDescription}
                  </div>
                </div>
              ) : (
                /* Closed door view with digital touch screen */
                <div className="w-full h-full pt-4 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="h-14 w-14 rounded-2xl bg-sky-500/10 border border-sky-400/40 flex items-center justify-center text-sky-400">
                    <Lock className="h-7 w-7" />
                  </div>
                  <div className="text-xs font-mono font-bold text-sky-300">
                    CHAVE DIGITAL STOPCASE
                  </div>
                  <div className="text-[10px] text-slate-500">
                    Acesso exclusivo por QR Code ou PIN do cliente
                  </div>
                </div>
              )}

              {/* Proportional capacity badge */}
              <div className="absolute -bottom-3 rounded-full bg-slate-800 border border-slate-700 px-3 py-1 text-[11px] font-mono text-slate-200">
                Volume: ~{activeLocker.volumeLiters} Litros
              </div>
            </div>
          </div>

          <div className="w-full flex items-center justify-between pt-3 text-[11px] text-slate-500 border-t border-slate-800">
            <span>Dimensões configuráveis</span>
            <span>Sensor eletrônico antifurto</span>
          </div>
        </div>

        {/* Right Column: Details & Pricing breakdown */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                {activeLocker.name}
              </h3>
              <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 text-xs font-semibold text-emerald-400">
                Alta disponibilidade
              </span>
            </div>
            <p className="text-sm text-slate-300 mt-2">{activeLocker.tagline}</p>
          </div>

          {/* Detailed metrics */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <span className="text-[11px] text-slate-400 font-semibold block mb-1">
                Dimensões de Referência
              </span>
              <div className="text-xs font-semibold text-white">
                {activeLocker.dimensionsVisual}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <span className="text-[11px] text-slate-400 font-semibold block mb-1">
                Melhor Indicado Para
              </span>
              <div className="text-xs font-semibold text-white">
                {activeLocker.popularFor}
              </div>
            </div>
          </div>

          {/* Pricing cards */}
          <div className="rounded-2xl bg-slate-950 p-5 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Tabela de Valores Demonstrativa
              </span>
              <span className="text-[11px] text-sky-400 font-mono">Aeroporto {currentHub.airportCode}</span>
            </div>

            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-2xl sm:text-3xl font-black text-white font-display">
                  R$ {activeLocker.dailyPrice}
                </span>
                <span className="text-xs text-slate-400 ml-1">/ diária integral</span>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold text-slate-300">
                  R$ {activeLocker.hourlyPrice}
                </span>
                <span className="text-xs text-slate-500 block">primeiras horas</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400">
              *Preço flexível conforme período. Sem taxas surpresa de caução.
            </p>
          </div>

          {/* Live availability indicator */}
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs">
            <div className="h-3 w-3 rounded-full bg-emerald-400 animate-pulse" />
            <div className="flex-1">
              <span className="font-semibold text-white">
                {currentAvailable} armários disponíveis
              </span>{' '}
              <span className="text-slate-400">
                no {currentHub.airportName} hoje.
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-sky-500 py-3 text-sm font-bold text-slate-950 shadow-md shadow-sky-500/20 hover:bg-sky-400 transition-all cursor-pointer"
            >
              <span>Reservar {activeLocker.name}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => setIsSizeRecommenderOpen(true)}
              className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-xs font-semibold text-slate-200 hover:text-white transition-colors"
            >
              Testar "Cabe ou Não Cabe?"
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
