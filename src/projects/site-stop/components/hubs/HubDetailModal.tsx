import React from 'react';
import { useBooking } from '../../context/BookingContext';
import { HUBS } from '../../data/hubs';
import { LOCKER_TYPES } from '../../data/lockers';
import { X, Clock, MapPin, Phone, ShieldCheck, CheckCircle2, ArrowRight, ExternalLink } from 'lucide-react';

export const HubDetailModal: React.FC = () => {
  const {
    hubDetailModalId,
    setHubDetailModalId,
    setSelectedHubId,
    setIsBookingModalOpen,
  } = useBooking();

  if (!hubDetailModalId) return null;

  const hub = HUBS.find((h) => h.id === hubDetailModalId) || HUBS[0];

  const handleBookHere = () => {
    setSelectedHubId(hub.id);
    setHubDetailModalId(null);
    setIsBookingModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-slate-700 bg-[#090E1C] shadow-2xl max-h-[90vh] flex flex-col">
        {/* Header with airport badge */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 bg-slate-900/60">
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold font-display text-white">
              {hub.name} · {hub.airportCode}
            </span>
            <span className="rounded-full bg-sky-500/10 border border-sky-400/30 px-2.5 py-0.5 text-xs font-mono font-semibold text-sky-300">
              {hub.airportName}
            </span>
          </div>
          <button
            onClick={() => setHubDetailModalId(null)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal content */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1">
          {/* Quick info overview */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
              <span className="text-[11px] font-mono text-slate-400 block mb-1">LOCALIZAÇÃO</span>
              <div className="text-xs font-semibold text-white">{hub.locationDetails}</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
              <span className="text-[11px] font-mono text-slate-400 block mb-1">FUNCIONAMENTO</span>
              <div className="text-xs font-semibold text-white">{hub.openingHours}</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
              <span className="text-[11px] font-mono text-slate-400 block mb-1">CONTATO / SUPORTE</span>
              <div className="text-xs font-semibold text-white font-mono">{hub.contactPhone}</div>
            </div>
          </div>

          {/* How to get there */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300 font-display">
              Instruções de Desembarque & Acesso
            </h4>
            <div className="space-y-2 rounded-2xl bg-slate-950 p-5 border border-slate-800">
              {hub.directions.map((d, i) => (
                <div key={i} className="flex items-start gap-3 text-xs text-slate-300 leading-relaxed">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky-500/20 text-sky-400 font-mono text-[11px] font-bold">
                    {i + 1}
                  </span>
                  <span>{d}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Lockers Available at this unit */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300 font-display">
              Capacidade & Tipos de Locker nesta Unidade
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {LOCKER_TYPES.map((lt) => {
                const count =
                  lt.id === 'small'
                    ? hub.lockersCount.small
                    : lt.id === 'medium'
                    ? hub.lockersCount.medium
                    : hub.lockersCount.large;

                return (
                  <div
                    key={lt.id}
                    className="p-4 rounded-2xl border border-slate-800 bg-slate-900/70 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-white">{lt.name}</span>
                      <span className="text-xs font-mono font-bold text-emerald-400">
                        {count} disponíveis
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">{lt.tagline}</p>
                    <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs">
                      <span className="text-slate-400">Diária estimada:</span>
                      <span className="font-mono font-bold text-sky-400">
                        R$ {lt.dailyPrice}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Official address & airport notice */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs text-slate-400 flex items-start gap-3">
            <MapPin className="h-4 w-4 text-sky-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-200">Endereço Oficial:</span> {hub.address}
              <div className="mt-1 text-[11px] text-slate-500">
                Ponto de autoatendimento digital monitorado dentro das dependências do aeroporto.
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer CTA */}
        <div className="border-t border-slate-800 p-6 bg-slate-900/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400">
            Reserva 100% digital com cancelamento gratuito até o início do período.
          </div>
          <button
            onClick={handleBookHere}
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-sky-500 px-7 py-3 text-sm font-bold text-slate-950 shadow-md shadow-sky-500/20 hover:bg-sky-400 transition-all cursor-pointer"
          >
            <span>Reservar Locker em {hub.airportCode}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
