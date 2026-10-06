import React, { useState } from 'react';
import { Calendar, MapPin, CheckSquare, Search, Sparkles } from 'lucide-react';
import { UnitId, ProductCategory } from '../types';
import { UNITS } from '../data/mockData';

interface QuickBookingBarProps {
  currentUnit: UnitId;
  onSelectUnit: (unit: UnitId) => void;
  startDate: string;
  endDate: string;
  onDateChange: (start: string, end: string) => void;
  onCheckAvailability: (selectedCategories: ProductCategory[]) => void;
}

export const QuickBookingBar: React.FC<QuickBookingBarProps> = ({
  currentUnit,
  onSelectUnit,
  startDate,
  endDate,
  onDateChange,
  onCheckAvailability,
}) => {
  const [selectedCats, setSelectedCats] = useState<ProductCategory[]>([
    'Carrinhos',
    'Bebê Conforto',
    'Berços',
  ]);

  const calculateDays = () => {
    if (!startDate || !endDate) return 5;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-8 text-left">
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-stone-200 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Destination & Airport Selector */}
        <div className="w-full md:w-auto flex-1 flex items-center gap-3 border-b md:border-b-0 md:border-r border-stone-100 pb-3 md:pb-0 md:pr-4">
          <div className="w-9 h-9 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
            <MapPin className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
              Destino / Aeroporto
            </span>
            <select
              value={currentUnit}
              onChange={(e) => onSelectUnit(e.target.value as UnitId)}
              className="font-bold text-stone-900 text-sm bg-transparent focus:outline-none cursor-pointer w-full"
            >
              {Object.values(UNITS).map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} ({u.state}) · {u.airportCode}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Start Date */}
        <div className="w-full md:w-auto flex-1 flex items-center gap-3 border-b md:border-b-0 md:border-r border-stone-100 pb-3 md:pb-0 md:pr-4">
          <div className="w-9 h-9 rounded-xl bg-stone-100 text-stone-600 flex items-center justify-center shrink-0">
            <Calendar className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
              Retirada
            </span>
            <input
              type="date"
              value={startDate}
              onChange={(e) => onDateChange(e.target.value, endDate)}
              className="font-semibold text-stone-900 text-sm bg-transparent focus:outline-none cursor-pointer w-full"
            />
          </div>
        </div>

        {/* End Date */}
        <div className="w-full md:w-auto flex-1 flex items-center gap-3 border-b md:border-b-0 md:border-r border-stone-100 pb-3 md:pb-0 md:pr-4">
          <div className="w-9 h-9 rounded-xl bg-stone-100 text-stone-600 flex items-center justify-center shrink-0">
            <Calendar className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
              Devolução ({calculateDays()} diárias)
            </span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => onDateChange(startDate, e.target.value)}
              className="font-semibold text-stone-900 text-sm bg-transparent focus:outline-none cursor-pointer w-full"
            />
          </div>
        </div>

        {/* Fast Check CTA */}
        <div className="w-full md:w-auto shrink-0">
          <button
            onClick={() => onCheckAvailability(selectedCats)}
            className="w-full md:w-auto px-5 py-3 bg-stone-900 hover:bg-orange-600 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Verificar Disponibilidade</span>
          </button>
        </div>
      </div>
    </div>
  );
};
