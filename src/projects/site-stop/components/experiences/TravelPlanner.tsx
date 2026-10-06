import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { HUBS } from '../../data/hubs';
import { PLACES_RECOMMENDATIONS, PlaceRecommendation } from '../../data/places';
import { HubCityId } from '../../types';
import {
  Compass,
  Clock,
  MapPin,
  Sparkles,
  ArrowRight,
  Utensils,
  Sun,
  ShoppingBag,
  Landmark,
  Briefcase,
  Coffee,
  CheckCircle2,
  Navigation,
  Car,
} from 'lucide-react';

interface VibeOption {
  id: 'gastronomia' | 'praia' | 'cultura' | 'compras' | 'trabalho' | 'relaxar';
  label: string;
  icon: React.ReactNode;
}

const VIBES: VibeOption[] = [
  { id: 'gastronomia', label: 'Comer & Gastronomia', icon: <Utensils className="h-4 w-4" /> },
  { id: 'praia', label: 'Praia & Orla', icon: <Sun className="h-4 w-4" /> },
  { id: 'cultura', label: 'Cultura & História', icon: <Landmark className="h-4 w-4" /> },
  { id: 'compras', label: 'Compras & Shopping', icon: <ShoppingBag className="h-4 w-4" /> },
  { id: 'trabalho', label: 'Trabalho & Café Especial', icon: <Briefcase className="h-4 w-4" /> },
  { id: 'relaxar', label: 'Relaxar & Parques', icon: <Coffee className="h-4 w-4" /> },
];

export const TravelPlanner: React.FC = () => {
  const {
    selectedHubId,
    setSelectedHubId,
    setIsBookingModalOpen,
  } = useBooking();

  const [hoursAvailable, setHoursAvailable] = useState<number>(4);
  const [selectedVibe, setSelectedVibe] = useState<'gastronomia' | 'praia' | 'cultura' | 'compras' | 'trabalho' | 'relaxar'>('gastronomia');
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);

  const currentHub = HUBS.find((h) => h.id === selectedHubId) || HUBS[0];

  // Filter recommendations for this city and category
  const cityPlaces = PLACES_RECOMMENDATIONS.filter((p) => p.hubId === selectedHubId);
  const matchedPlaces = cityPlaces.filter((p) => p.category === selectedVibe);
  // Fallback to all city places if category has none (e.g. Praia in SP/POA)
  const displayPlaces = matchedPlaces.length > 0 ? matchedPlaces : cityPlaces;

  const handleSelectPlaceAndBook = (place: PlaceRecommendation) => {
    setSelectedPlaceId(place.id);
    setIsBookingModalOpen(true);
  };

  return (
    <section id="travel-planner" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start justify-between gap-6 pb-10 border-b border-slate-800">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-3.5 py-1 text-xs font-semibold text-sky-400">
            <Compass className="h-3.5 w-3.5" />
            <span>Guia de Experiências & Lugares Próximos</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
            O que você quer fazer na cidade?
          </h2>

          <p className="text-sm sm:text-base text-slate-300">
            Selecione a sua cidade e o seu estilo de momento. Nosso guia indica lugares reais, distâncias seguras e dicas para você curtir sem carregar nenhuma mala.
          </p>
        </div>

        {/* City Switcher */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
          <span className="text-xs text-slate-400 flex items-center gap-1.5 font-semibold">
            <MapPin className="h-3.5 w-3.5 text-sky-400" />
            Cidade:
          </span>
          <select
            value={selectedHubId}
            onChange={(e) => setSelectedHubId(e.target.value as HubCityId)}
            className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs font-semibold text-white focus:outline-none focus:border-sky-500 cursor-pointer"
          >
            {HUBS.map((h) => (
              <option key={h.id} value={h.id}>
                {h.name} ({h.airportCode}) — {h.airportName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Filter Controls: Hours & Interest Categories */}
      <div className="mt-8 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Hours Picker */}
          <div className="lg:col-span-5 rounded-2xl bg-slate-900/60 border border-slate-800 p-4 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-sky-400" />
                Tempo livre disponível:
              </span>
              <span className="text-sky-400 font-mono font-bold">{hoursAvailable} horas</span>
            </div>
            <div className="flex gap-2">
              {[3, 4, 5, 6, 8].map((h) => (
                <button
                  key={h}
                  onClick={() => setHoursAvailable(h)}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                    hoursAvailable === h
                      ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20'
                      : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {h}h
                </button>
              ))}
            </div>
          </div>

          {/* Vibe Selection Pills */}
          <div className="lg:col-span-7 flex flex-wrap gap-2">
            {VIBES.map((vibe) => (
              <button
                key={vibe.id}
                onClick={() => setSelectedVibe(vibe.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                  selectedVibe === vibe.id
                    ? 'border-sky-500 bg-sky-500/10 text-white shadow-md shadow-sky-500/10 ring-1 ring-sky-500'
                    : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                <span className={selectedVibe === vibe.id ? 'text-sky-400' : 'text-slate-500'}>
                  {vibe.icon}
                </span>
                <span>{vibe.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Category Status Notice */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
          <span>
            Exibindo recomendações em <strong className="text-white">{currentHub.name}</strong> para o perfil selecionado:
          </span>
          <span className="font-mono text-sky-400">
            {displayPlaces.length} lugar(es) selecionado(s)
          </span>
        </div>
      </div>

      {/* Curated Place Indications Cards Grid */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayPlaces.map((place) => {
          const isSelected = selectedPlaceId === place.id;
          const fitsTime = hoursAvailable >= place.minHoursNeeded;

          return (
            <div
              key={place.id}
              className={`rounded-3xl border bg-[#080E1C] p-6 flex flex-col justify-between space-y-5 transition-all shadow-xl hover:border-slate-700 ${
                isSelected
                  ? 'border-sky-500 ring-1 ring-sky-500'
                  : 'border-slate-800/90'
              }`}
            >
              <div className="space-y-4">
                {/* Top badges */}
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-lg border border-sky-500/20">
                    {place.neighborhood}
                  </span>
                  <span
                    className={`font-mono text-[11px] px-2 py-0.5 rounded ${
                      fitsTime
                        ? 'text-emerald-400 bg-emerald-950/40 border border-emerald-500/30'
                        : 'text-amber-400 bg-amber-950/40 border border-amber-500/30'
                    }`}
                  >
                    {fitsTime ? '✓ Tempo ideal' : `Requer ${place.minHoursNeeded}h+`}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white font-display leading-tight">
                    {place.name}
                  </h3>
                  <p className="text-xs text-sky-300 font-medium mt-1">
                    {place.tagline}
                  </p>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {place.description}
                </p>

                {/* Logistics details */}
                <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 block">Distância do Aeroporto:</span>
                    <span className="font-semibold text-slate-200 font-mono flex items-center gap-1 mt-0.5">
                      <Navigation className="h-3 w-3 text-sky-400" />
                      {place.distanceFromAirport}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">Deslocamento estimado:</span>
                    <span className="font-semibold text-slate-200 font-mono flex items-center gap-1 mt-0.5">
                      <Car className="h-3 w-3 text-sky-400" />
                      {place.estimatedTransitTime.split('de')[0]}
                    </span>
                  </div>
                </div>

                {/* Highlights tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {place.highlights.map((hl, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] text-slate-300 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-md flex items-center gap-1"
                    >
                      <span className="h-1 w-1 rounded-full bg-sky-400" />
                      {hl}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-slate-800/80">
                <button
                  onClick={() => handleSelectPlaceAndBook(place)}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-sky-500 py-3 text-xs font-bold text-slate-950 shadow-md shadow-sky-500/20 hover:bg-sky-400 transition-all cursor-pointer group"
                >
                  <span>Guardar mala no aeroporto e ir para cá</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Safety Notice Footer */}
      <div className="mt-10 rounded-2xl bg-slate-900/60 border border-slate-800 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div className="flex items-center gap-2.5">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>
            Ao visitar qualquer um desses lugares, retorne ao aeroporto {currentHub.airportCode} cerca de <strong>1h a 1h30 antes do embarque</strong> para retirar suas malas no locker sem pressa.
          </span>
        </div>

        <button
          onClick={() => setIsBookingModalOpen(true)}
          className="shrink-0 text-sky-400 hover:text-white font-semibold flex items-center gap-1 cursor-pointer"
        >
          <span>Reservar locker agora</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </section>
  );
};
