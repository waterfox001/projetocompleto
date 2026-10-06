import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { HUBS } from '../../data/hubs';
import { LOCKER_TYPES } from '../../data/lockers';
import { HubCityId } from '../../types';
import { MapPin, Clock, ArrowRight, Shield, CheckCircle2, Navigation, Phone, ExternalLink } from 'lucide-react';

export const HubsDirectory: React.FC = () => {
  const {
    selectedHubId,
    setSelectedHubId,
    setHubDetailModalId,
    setIsBookingModalOpen,
  } = useBooking();

  const currentHub = HUBS.find((h) => h.id === selectedHubId) || HUBS[0];

  return (
    <section id="cidades" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-3.5 py-1 text-xs font-semibold text-sky-400">
            <MapPin className="h-3.5 w-3.5" />
            <span>Presença Nacional · Nossas Unidades</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
            Onde você está?
          </h2>
          <p className="text-sm text-slate-300 max-w-xl">
            Escolha sua cidade para conferir localização dos armários, horários de atendimento e rotas com as mãos livres.
          </p>
        </div>

        <div className="text-xs text-slate-400 font-mono">
          5 cidades ativas · Expansão contínua
        </div>
      </div>

      {/* City Switcher Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {HUBS.map((hub) => {
          const isSelected = hub.id === selectedHubId;
          const availableCount = hub.lockersCount.small + hub.lockersCount.medium + hub.lockersCount.large;

          return (
            <div
              key={hub.id}
              onClick={() => setSelectedHubId(hub.id)}
              className={`rounded-2xl p-5 border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-sky-500 bg-gradient-to-b from-sky-950/40 to-slate-900 shadow-xl shadow-sky-500/10 ring-1 ring-sky-500'
                  : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <div>
                <div className="flex items-center justify-between pb-3">
                  <span className="text-lg font-black font-display text-white">
                    {hub.name}
                  </span>
                  <span className="text-xs font-mono font-bold bg-slate-800 text-sky-400 px-2 py-0.5 rounded border border-slate-700">
                    {hub.airportCode}
                  </span>
                </div>

                <div className="text-xs text-slate-300 font-medium">
                  {hub.airportName}
                </div>
                <div className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                  {hub.locationDetails}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between text-[11px]">
                <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  {availableCount} lockers
                </span>
                <span className="text-slate-400 font-mono">
                  {hub.is24Hours ? '24 Horas' : '05h-23h'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected City Interactive Showcase & Freedom Map */}
      <div className="rounded-3xl border border-sky-500/30 bg-[#090E1E] p-6 sm:p-10 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Airport Hub Details */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                    {currentHub.name}
                  </span>
                  <span className="text-sm font-mono font-bold text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-md border border-sky-500/20">
                    {currentHub.airportCode}
                  </span>
                </div>
                <p className="text-sm text-slate-300 mt-1">{currentHub.airportName}</p>
              </div>

              <button
                onClick={() => setHubDetailModalId(currentHub.id)}
                className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1 font-semibold"
              >
                <span>Ver guia completo</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Location & Hours cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[11px] text-slate-400 font-semibold block mb-1">
                  Localização Exata no Terminal
                </span>
                <div className="text-xs text-slate-200 font-medium">
                  {currentHub.locationDetails}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[11px] text-slate-400 font-semibold block mb-1">
                  Horário de Atendimento
                </span>
                <div className="text-xs text-slate-200 font-medium flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-sky-400" />
                  {currentHub.openingHours}
                </div>
              </div>
            </div>

            {/* How to get there */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Como Chegar até a StopCase no Aeroporto
              </span>
              <div className="space-y-2 rounded-xl bg-slate-950 p-4 border border-slate-800">
                {currentHub.directions.map((dir, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-800 font-mono text-[10px] text-sky-400">
                      {idx + 1}
                    </span>
                    <span className="pt-0.5">{dir}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Nearby highlights */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Distância de Pontos Relevantes sem Bagagem
              </span>
              <div className="grid grid-cols-2 gap-2">
                {currentHub.nearbyHighlights.map((hl, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-semibold text-white">{hl.name}</div>
                      <div className="text-[10px] text-slate-400">{hl.distance}</div>
                    </div>
                    <span className="text-sky-400 font-mono font-bold">{hl.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-sky-500 py-3 text-sm font-bold text-slate-950 shadow-md shadow-sky-500/20 hover:bg-sky-400 transition-all cursor-pointer"
              >
                <span>Reservar em {currentHub.airportCode}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => setHubDetailModalId(currentHub.id)}
                className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-xs font-semibold text-slate-200 hover:text-white transition-colors"
              >
                Detalhes da Unidade
              </button>
            </div>
          </div>

          {/* Right Column: Freedom Transit Map Simulation (Section 38: Mapa de Liberdade) */}
          <div className="lg:col-span-6 rounded-2xl border border-slate-800 bg-slate-950 p-6 flex flex-col justify-between min-h-[460px]">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Navigation className="h-4 w-4 text-sky-400" />
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-300">
                    MAPA DE LIBERDADE · {currentHub.airportCode}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-emerald-400">
                  Rota ativa de trânsito
                </span>
              </div>

              {/* Schematic Map Canvas Graphic */}
              <div className="relative mt-4 h-64 rounded-xl border border-slate-800/80 bg-[#070B14] p-4 flex flex-col justify-between overflow-hidden">
                {/* Background grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:24px_24px]" />

                {/* SVG Route Line connecting Airport -> StopCase -> City -> Return */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 240">
                  <path
                    d="M 60 120 Q 140 50 200 120 T 340 120"
                    fill="none"
                    stroke="#0EA5E9"
                    strokeWidth="3"
                    strokeDasharray="6,4"
                    className="opacity-70"
                  />
                  {/* Return loop line */}
                  <path
                    d="M 340 120 Q 260 190 200 120 T 60 120"
                    fill="none"
                    stroke="#38BDF8"
                    strokeWidth="1.5"
                    strokeDasharray="4,4"
                    className="opacity-40"
                  />
                </svg>

                {/* Point 1: Airport Terminal */}
                <div className="relative z-10 flex items-center gap-2">
                  <div className="h-9 w-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-sm shadow">
                    ✈️
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">
                      Desembarque {currentHub.airportCode}
                    </span>
                    <span className="text-[10px] text-slate-400">Ponto de partida do viajante</span>
                  </div>
                </div>

                {/* Point 2: StopCase Pod (Where the luggage stays) */}
                <div className="relative z-10 flex items-center justify-center">
                  <div className="bg-sky-950/90 border border-sky-400/80 rounded-xl px-4 py-2 flex items-center gap-3 shadow-xl backdrop-blur-md">
                    <span className="text-lg">🧳</span>
                    <div>
                      <div className="text-xs font-bold text-sky-200">
                        StopCase Locker Pod
                      </div>
                      <div className="text-[10px] text-emerald-400 font-mono">
                        Mala guardada com segurança
                      </div>
                    </div>
                  </div>
                </div>

                {/* Point 3: City exploration without weight */}
                <div className="relative z-10 flex items-center justify-end gap-2 text-right">
                  <div>
                    <span className="text-xs font-bold text-white block">
                      Cidade & Praias de {currentHub.name}
                    </span>
                    <span className="text-[10px] text-sky-400 font-medium">Viajante 100% mãos livres</span>
                  </div>
                  <div className="h-9 w-9 rounded-xl bg-sky-500/20 border border-sky-400 flex items-center justify-center text-sm shadow">
                    🙂
                  </div>
                </div>
              </div>
            </div>

            {/* Micro Flow Explanatory Bar */}
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5 text-sky-400" />
                Vigilância e proteção em todo o período
              </span>
              <span className="font-mono text-slate-500">
                GPS: {currentHub.coordinates.lat.toFixed(2)}, {currentHub.coordinates.lng.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
