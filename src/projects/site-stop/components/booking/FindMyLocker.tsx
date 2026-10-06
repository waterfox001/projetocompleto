import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { HUBS } from '../../data/hubs';
import { LOCKER_TYPES } from '../../data/lockers';
import { HubCityId, LockerSize } from '../../types';
import { Calendar, Clock, MapPin, Luggage, HelpCircle, ArrowRight, CheckCircle2 } from 'lucide-react';

export const FindMyLocker: React.FC = () => {
  const {
    selectedHubId,
    setSelectedHubId,
    selectedSize,
    setSelectedSize,
    setIsBookingModalOpen,
    setIsSizeRecommenderOpen,
  } = useBooking();

  const [date, setDate] = useState('2026-10-06');
  const [inTime, setInTime] = useState('13:00');
  const [outTime, setOutTime] = useState('18:30');
  const [bagCount, setBagCount] = useState<string>('2');
  const [showRecommendationBanner, setShowRecommendationBanner] = useState(false);

  const currentHub = HUBS.find((h) => h.id === selectedHubId) || HUBS[0];
  const currentLocker = LOCKER_TYPES.find((l) => l.id === selectedSize) || LOCKER_TYPES[1];

  const handleSizeSelect = (sizeChoice: string) => {
    if (sizeChoice === 'dont_know') {
      setIsSizeRecommenderOpen(true);
    } else {
      setSelectedSize(sizeChoice as LockerSize);
      setShowRecommendationBanner(true);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBookingModalOpen(true);
  };

  return (
    <section id="encontrar-locker" className="relative -mt-6 z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-slate-800 bg-[#0A1020]/95 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl shadow-sky-950/50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
              Encontre o locker ideal na sua cidade
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Reserve antecipadamente ou para uso imediato nas principais capitais.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-sky-400 font-semibold bg-sky-500/10 px-3 py-1.5 rounded-lg border border-sky-500/20 w-fit">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{currentHub.name} ({currentHub.airportCode}): {currentHub.lockersCount.medium + currentHub.lockersCount.large} lockers livres</span>
          </div>
        </div>

        <form onSubmit={handleSearch} className="mt-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Onde você está? */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-sky-400" />
                Onde você está?
              </label>
              <select
                value={selectedHubId}
                onChange={(e) => setSelectedHubId(e.target.value as HubCityId)}
                aria-label="Onde você está? Selecione a cidade"
                className="w-full rounded-xl border border-slate-700 bg-slate-900/90 px-3.5 py-2.5 text-sm text-white focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 cursor-pointer"
              >
                {HUBS.map((h) => (
                  <option key={h.id} value={h.id}>
                    {h.name} — {h.airportCode}
                  </option>
                ))}
              </select>
              <div className="text-[11px] text-slate-400 truncate">
                {currentHub.airportName}
              </div>
            </div>

            {/* Quando? */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-sky-400" />
                Quando?
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                aria-label="Quando? Selecione a data de uso"
                className="w-full rounded-xl border border-slate-700 bg-slate-900/90 px-3.5 py-2.5 text-sm text-white focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
              />
              <div className="text-[11px] text-slate-400">Data de uso</div>
            </div>

            {/* Por quanto tempo? Horários */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-sky-400" />
                Por quanto tempo?
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="time"
                  value={inTime}
                  onChange={(e) => setInTime(e.target.value)}
                  aria-label="Horário de entrada"
                  title="Horário de entrada"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900/90 px-2 py-2.5 text-xs text-white focus:border-sky-500 focus:outline-none text-center"
                />
                <input
                  type="time"
                  value={outTime}
                  onChange={(e) => setOutTime(e.target.value)}
                  aria-label="Horário de saída prevista"
                  title="Horário de saída prevista"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900/90 px-2 py-2.5 text-xs text-white focus:border-sky-500 focus:outline-none text-center"
                />
              </div>
              <div className="text-[11px] text-slate-400">Entrada → Retirada</div>
            </div>

            {/* Quantas malas? */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Luggage className="h-3.5 w-3.5 text-sky-400" />
                Quantas malas?
              </label>
              <div className="grid grid-cols-4 gap-1">
                {['1', '2', '3', '4+'].map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => {
                      setBagCount(count);
                      if (count === '1') setSelectedSize('small');
                      else if (count === '2') setSelectedSize('medium');
                      else setSelectedSize('large');
                    }}
                    className={`rounded-xl py-2.5 text-xs font-semibold transition-all cursor-pointer ${
                      bagCount === count
                        ? 'bg-sky-500 text-slate-950 font-bold'
                        : 'bg-slate-900/90 text-slate-300 border border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    {count}
                  </button>
                ))}
              </div>
              <div className="text-[11px] text-slate-400">Volume estimado</div>
            </div>

            {/* Qual o tamanho? */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300">
                  Tamanho do locker:
                </label>
                <button
                  type="button"
                  onClick={() => setIsSizeRecommenderOpen(true)}
                  className="text-[11px] text-sky-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <HelpCircle className="h-3 w-3" />
                  Não sei
                </button>
              </div>

              <select
                value={selectedSize}
                onChange={(e) => handleSizeSelect(e.target.value)}
                aria-label="Tamanho do locker"
                className="w-full rounded-xl border border-slate-700 bg-slate-900/90 px-3.5 py-2.5 text-sm text-white focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 cursor-pointer"
              >
                <option value="small">Locker P — Pequeno (mochilas)</option>
                <option value="medium">Locker M — Médio (mala de bordo)</option>
                <option value="large">Locker G — Grande (mala despachada)</option>
              </select>

              <div className="text-[11px] text-slate-400">
                A partir de R$ {currentLocker.dailyPrice}/dia
              </div>
            </div>
          </div>

          {/* Recommendation Banner if size selected */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sky-500/20 text-sky-400">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-semibold text-white">
                  Recomendação: {currentLocker.name}
                </span>
                <p className="text-xs text-slate-400">
                  {currentLocker.tagline} · Parece ser a melhor opção para você.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setIsSizeRecommenderOpen(true)}
                className="text-xs text-slate-400 hover:text-white px-3 py-2 cursor-pointer"
              >
                Simular "Cabe ou Não Cabe?"
              </button>
              <button
                type="submit"
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-sky-500 px-7 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-sky-500/25 hover:bg-sky-400 active:scale-95 transition-all cursor-pointer"
              >
                <span>Encontrar meu locker</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};
