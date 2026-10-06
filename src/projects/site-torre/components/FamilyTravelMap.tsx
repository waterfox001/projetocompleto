import React, { useState } from 'react';
import { MapPin, Users, Heart, Sparkles, TrendingUp, Compass } from 'lucide-react';
import { UnitId } from '../types';
import { UNITS, REGIONAL_TRAVEL_HEATMAP } from '../data/mockData';

interface FamilyTravelMapProps {
  onSelectUnit: (unit: UnitId) => void;
}

export const FamilyTravelMap: React.FC<FamilyTravelMapProps> = ({ onSelectUnit }) => {
  const [selectedHub, setSelectedHub] = useState<UnitId>('fortaleza');
  const [activeTab, setActiveTab] = useState<'destinations' | 'origins'>('destinations');

  const hubData = UNITS[selectedHub];

  return (
    <section className="py-16 md:py-24 bg-white border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-900 text-xs font-bold">
            <Compass className="w-3.5 h-3.5 text-orange-600" />
            <span>Presença Nacional & Turismo Familiar</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">
            Famílias que já viajaram com a Torre de Bebel
          </h2>
          <p className="text-stone-600 text-sm">
            Mais de 13.500 famílias economizaram peso na bagagem e viajaram com conforto absoluto.
          </p>

          {/* Tab selector */}
          <div className="inline-flex p-1 bg-stone-100 rounded-xl mt-2">
            <button
              onClick={() => setActiveTab('destinations')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'destinations' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600'
              }`}
            >
              Nossos Hubs de Destino
            </button>
            <button
              onClick={() => setActiveTab('origins')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'origins' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600'
              }`}
            >
              Origem dos Viajantes (Heatmap)
            </button>
          </div>
        </div>

        {/* Interactive Map Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-stone-50/60 p-6 sm:p-10 rounded-3xl border border-stone-200">
          {/* Left: Stylized Vector Map of Brazil */}
          <div className="lg:col-span-7 relative min-h-[380px] bg-white rounded-2xl p-6 border border-stone-200/80 shadow-xs flex items-center justify-center">
            {/* SVG stylized map of Brazil */}
            <div className="relative w-full max-w-md aspect-[4/4.5]">
              <svg
                viewBox="0 0 400 450"
                className="w-full h-full text-stone-100 stroke-stone-300 stroke-[1.5]"
                fill="currentColor"
              >
                {/* Organic stylized outline of Brazil */}
                <path d="M120 40 C170 30 240 50 300 80 C360 110 370 160 380 200 C390 230 350 260 330 280 C300 310 280 340 240 380 C210 410 180 430 160 410 C140 390 150 340 130 310 C100 270 70 240 60 190 C50 140 80 80 120 40 Z" />

                {/* Subdued internal contour lines */}
                <path d="M160 120 Q220 180 280 190" stroke="#E2D9D2" strokeDasharray="3 3" fill="none" />
                <path d="M140 240 Q200 270 260 300" stroke="#E2D9D2" strokeDasharray="3 3" fill="none" />
              </svg>

              {/* Hub 1: Fortaleza */}
              <button
                onClick={() => {
                  setSelectedHub('fortaleza');
                  onSelectUnit('fortaleza');
                }}
                className={`absolute top-[24%] right-[22%] group -translate-x-1/2 -translate-y-1/2 cursor-pointer focus:outline-none transition-transform ${
                  selectedHub === 'fortaleza' ? 'scale-125 z-20' : 'hover:scale-110 z-10'
                }`}
              >
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-orange-600/20 animate-ping absolute inset-0" />
                  <div className="w-8 h-8 rounded-full bg-orange-600 text-white font-bold flex items-center justify-center text-xs shadow-md border-2 border-white">
                    CE
                  </div>
                </div>
                <span className="text-[11px] font-bold text-stone-900 bg-white/95 px-2 py-0.5 rounded shadow-xs border border-stone-200 block mt-1 whitespace-nowrap">
                  Fortaleza
                </span>
              </button>

              {/* Hub 2: Recife */}
              <button
                onClick={() => {
                  setSelectedHub('recife');
                  onSelectUnit('recife');
                }}
                className={`absolute top-[33%] right-[14%] group -translate-x-1/2 -translate-y-1/2 cursor-pointer focus:outline-none transition-transform ${
                  selectedHub === 'recife' ? 'scale-125 z-20' : 'hover:scale-110 z-10'
                }`}
              >
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-orange-600 text-white font-bold flex items-center justify-center text-xs shadow-md border-2 border-white">
                    PE
                  </div>
                </div>
                <span className="text-[11px] font-bold text-stone-900 bg-white/95 px-2 py-0.5 rounded shadow-xs border border-stone-200 block mt-1 whitespace-nowrap">
                  Recife
                </span>
              </button>

              {/* Hub 3: São Paulo / Congonhas */}
              <button
                onClick={() => {
                  setSelectedHub('sao-paulo-congonhas');
                  onSelectUnit('sao-paulo-congonhas');
                }}
                className={`absolute top-[68%] left-[58%] group -translate-x-1/2 -translate-y-1/2 cursor-pointer focus:outline-none transition-transform ${
                  selectedHub === 'sao-paulo-congonhas' ? 'scale-125 z-20' : 'hover:scale-110 z-10'
                }`}
              >
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-orange-600 text-white font-bold flex items-center justify-center text-xs shadow-md border-2 border-white">
                    SP
                  </div>
                </div>
                <span className="text-[11px] font-bold text-stone-900 bg-white/95 px-2 py-0.5 rounded shadow-xs border border-stone-200 block mt-1 whitespace-nowrap">
                  São Paulo (CGH)
                </span>
              </button>

              {/* Hub 4: Porto Alegre */}
              <button
                onClick={() => {
                  setSelectedHub('porto-alegre');
                  onSelectUnit('porto-alegre');
                }}
                className={`absolute top-[85%] left-[50%] group -translate-x-1/2 -translate-y-1/2 cursor-pointer focus:outline-none transition-transform ${
                  selectedHub === 'porto-alegre' ? 'scale-125 z-20' : 'hover:scale-110 z-10'
                }`}
              >
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-orange-600 text-white font-bold flex items-center justify-center text-xs shadow-md border-2 border-white">
                    RS
                  </div>
                </div>
                <span className="text-[11px] font-bold text-stone-900 bg-white/95 px-2 py-0.5 rounded shadow-xs border border-stone-200 block mt-1 whitespace-nowrap">
                  Porto Alegre
                </span>
              </button>
            </div>
          </div>

          {/* Right: Selected Hub Statistics or Heatmap Analysis */}
          <div className="lg:col-span-5 space-y-6">
            {activeTab === 'destinations' ? (
              <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-4 shadow-xs">
                <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                  <div>
                    <span className="text-[11px] font-bold text-orange-600 uppercase tracking-wider">
                      Hub Selecionado
                    </span>
                    <h3 className="text-xl font-serif font-bold text-stone-900">
                      {hubData.fullName}
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-stone-900 bg-orange-50 px-2.5 py-1 rounded-lg border border-orange-200">
                    {hubData.airportCode}
                  </span>
                </div>

                <div className="space-y-3 text-xs text-stone-600">
                  <div className="flex justify-between py-1.5 border-b border-stone-100">
                    <span className="flex items-center gap-1.5 font-medium text-stone-700">
                      <Users className="w-3.5 h-3.5 text-orange-600" />
                      <span>Famílias atendidas:</span>
                    </span>
                    <span className="font-bold text-stone-900 tabular-nums">
                      {hubData.stats.familiesServed.toLocaleString('pt-BR')} famílias
                    </span>
                  </div>

                  <div className="flex justify-between py-1.5 border-b border-stone-100">
                    <span className="flex items-center gap-1.5 font-medium text-stone-700">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Locações ativas neste mês:</span>
                    </span>
                    <span className="font-bold text-emerald-700 tabular-nums">
                      {hubData.stats.activeRentals} em trânsito
                    </span>
                  </div>

                  <div className="flex justify-between py-1.5 border-b border-stone-100">
                    <span className="flex items-center gap-1.5 font-medium text-stone-700">
                      <Heart className="w-3.5 h-3.5 text-rose-500" />
                      <span>Produto mais alugado:</span>
                    </span>
                    <span className="font-bold text-stone-900">
                      {hubData.stats.topProduct}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-stone-50 rounded-xl text-xs text-stone-600">
                  Plantão 24h para voos atrasados com entrega expressa no portão de desembarque.
                </div>
              </div>
            ) : (
              /* Heatmap Analysis */
              <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-4 shadow-xs">
                <div>
                  <span className="text-[11px] font-bold text-orange-600 uppercase tracking-wider">
                    Heatmap de Origem
                  </span>
                  <h3 className="text-xl font-serif font-bold text-stone-900">
                    De onde vêm nossos clientes?
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Famílias que embarcam nestas capitais e retiram os produtos ao pousar.
                  </p>
                </div>

                <div className="space-y-2.5 pt-1">
                  {REGIONAL_TRAVEL_HEATMAP.slice(0, 5).map((reg) => (
                    <div key={reg.originState} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold text-stone-800">
                        <span>{reg.originCity} ({reg.originState})</span>
                        <span className="text-orange-700 tabular-nums">{reg.travelers.toLocaleString()} viajantes</span>
                      </div>
                      <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-orange-500 h-1.5 rounded-full"
                          style={{ width: `${(reg.travelers / 5000) * 100}%` }}
                        />
                      </div>
                      <div className="text-[10px] text-stone-400">Destino favorito: {reg.topDest}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
