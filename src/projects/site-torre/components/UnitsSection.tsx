import React, { useState } from 'react';
import { MapPin, Phone, MessageSquare, Clock, Plane, ShieldCheck, Check, Sparkles } from 'lucide-react';
import { UnitId } from '../types';
import { UNITS } from '../data/mockData';

interface UnitsSectionProps {
  currentUnit: UnitId;
  onSelectUnit: (unit: UnitId) => void;
  onExploreProducts: () => void;
}

export const UnitsSection: React.FC<UnitsSectionProps> = ({
  currentUnit,
  onSelectUnit,
  onExploreProducts,
}) => {
  const [activeTab, setActiveTab] = useState<UnitId>(currentUnit);

  const selectedUnit = UNITS[activeTab];

  return (
    <section id="units" className="py-16 md:py-24 bg-stone-50/50 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-orange-600 uppercase tracking-widest">
              <MapPin className="w-3.5 h-3.5" />
              <span>Rede Nacional de Atendimento</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 mt-1">
              Onde estamos
            </h2>
            <p className="text-stone-600 text-sm mt-1 max-w-xl">
              Unidades estratégicas nos principais aeroportos e polos turísticos do país.
            </p>
          </div>

          <span className="text-xs text-stone-500 font-medium">
            Entregas programadas 7 dias por semana
          </span>
        </div>

        {/* City Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none mb-8">
          {Object.values(UNITS).map((unit) => {
            const isActive = activeTab === unit.id;
            return (
              <button
                key={unit.id}
                onClick={() => {
                  setActiveTab(unit.id);
                  onSelectUnit(unit.id);
                }}
                className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-orange-600 text-white shadow-md shadow-orange-600/20'
                    : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                <MapPin className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-orange-600'}`} />
                <span>{unit.name} ({unit.state})</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${isActive ? 'bg-orange-700 text-orange-100' : 'bg-stone-100 text-stone-500'}`}>
                  {unit.airportCode}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected City Detail Card */}
        <div className="bg-white rounded-3xl border border-stone-200/90 shadow-md p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Info column */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full mb-3">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Unidade Oficial em Operação</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                {selectedUnit.fullName}
              </h3>
              <p className="text-sm text-stone-600 mt-1">
                Atendimento presencial, delivery hoteleiro e plantão exclusivo no{' '}
                <strong>{selectedUnit.airportName}</strong>.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-stone-700 pt-2">
              <div className="space-y-1">
                <span className="font-bold text-stone-900 block flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-orange-600" />
                  <span>Endereço & Região:</span>
                </span>
                <p className="text-stone-600">{selectedUnit.address}</p>
                <p className="text-stone-400 text-[11px]">{selectedUnit.neighborhood}</p>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-stone-900 block flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-orange-600" />
                  <span>Horário de Funcionamento:</span>
                </span>
                <p className="text-stone-600">{selectedUnit.hours}</p>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-stone-900 block flex items-center gap-1.5">
                  <Plane className="w-3.5 h-3.5 text-orange-600" />
                  <span>Aeroporto Atendido:</span>
                </span>
                <p className="text-stone-600">{selectedUnit.airportName}</p>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-stone-900 block flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-orange-600" />
                  <span>Central Local:</span>
                </span>
                <p className="text-stone-600">{selectedUnit.phone}</p>
              </div>
            </div>

            {/* Direct Actions */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={onExploreProducts}
                className="px-5 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors"
              >
                Ver Produtos em {selectedUnit.name}
              </button>

              <a
                href={`https://wa.me/${selectedUnit.whatsapp}?text=${encodeURIComponent(
                  `Olá equipe da Torre de Bebel ${selectedUnit.name}! Estou planejando minha viagem e gostaria de informações sobre aluguel.`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp da Unidade</span>
              </a>
            </div>
          </div>

          {/* Unit Stats & Destination Image */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-2xl overflow-hidden border border-stone-200 relative aspect-video bg-stone-100 shadow-sm">
              <img
                src="/src/assets/images/happy_family_destination_1791260606889.jpg"
                alt={`Passeio em família em ${selectedUnit.name}`}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-2 left-2 right-2 bg-white/95 backdrop-blur-md p-2.5 rounded-xl text-xs flex items-center justify-between">
                <div>
                  <span className="font-bold text-stone-900">{selectedUnit.name}</span>
                  <p className="text-[10px] text-stone-500">Mais alugado: {selectedUnit.stats.topProduct}</p>
                </div>
                <span className="text-emerald-700 font-bold text-xs bg-emerald-50 px-2 py-0.5 rounded">
                  {selectedUnit.stats.satisfactionRate}% Satisfeitos
                </span>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
                <span className="text-lg font-bold text-stone-900 tabular-nums">
                  +{selectedUnit.stats.familiesServed}
                </span>
                <p className="text-[11px] text-stone-500">Famílias atendidas</p>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
                <span className="text-lg font-bold text-orange-600 tabular-nums">
                  {selectedUnit.stats.activeRentals}
                </span>
                <p className="text-[11px] text-stone-500">Locações ativas hoje</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
