import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { LOCKER_TYPES } from '../../data/lockers';
import { LockerSize } from '../../types';
import { X, Check, AlertCircle, Plus, Minus, Luggage, Sparkles, Box, Info } from 'lucide-react';

interface PackableItem {
  id: string;
  name: string;
  type: string;
  volumeUnits: number; // relative weight/volume
  icon: string;
}

const AVAILABLE_ITEMS: PackableItem[] = [
  { id: 'backpack', name: 'Mochila', type: 'Mochila casual ou executiva', volumeUnits: 15, icon: '🎒' },
  { id: 'carryon', name: 'Mala de Bordo (10kg)', type: 'Padrão ANAC de cabine', volumeUnits: 38, icon: '🧳' },
  { id: 'medium_bag', name: 'Mala Média', type: 'Viagem média duração', volumeUnits: 55, icon: '🧳' },
  { id: 'large_bag', name: 'Mala Grande (23-32kg)', type: 'Bagagem despachada internacional', volumeUnits: 85, icon: '🧳' },
  { id: 'stroller', name: 'Carrinho de Bebê', type: 'Carrinho dobrável', volumeUnits: 45, icon: '👶' },
  { id: 'box', name: 'Caixa / Encomenda', type: 'Caixa média de papelão', volumeUnits: 30, icon: '📦' },
  { id: 'equipment', name: 'Equipamento / Prancha', type: 'Bolsa de instrumentos / esportes', volumeUnits: 60, icon: '🎸' },
];

export const SizeRecommender: React.FC = () => {
  const {
    isSizeRecommenderOpen,
    setIsSizeRecommenderOpen,
    setSelectedSize,
    setIsBookingModalOpen,
  } = useBooking();

  const [selectedCounts, setSelectedCounts] = useState<{ [key: string]: number }>({
    carryon: 1,
    backpack: 1,
  });

  if (!isSizeRecommenderOpen) return null;

  const updateCount = (id: string, delta: number) => {
    setSelectedCounts((prev) => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [id]: next };
    });
  };

  const totalVolume = Object.entries(selectedCounts).reduce((acc, [id, count]) => {
    const item = AVAILABLE_ITEMS.find((it) => it.id === id);
    return acc + (item ? item.volumeUnits * count : 0);
  }, 0);

  // Recommendation logic
  let recommendedSize: LockerSize = 'small';
  let fitStatus: 'cabe_perfeito' | 'cabe_no_limite' | 'precisa_maior' = 'cabe_perfeito';
  let adviceMessage = '';

  if (totalVolume === 0) {
    recommendedSize = 'small';
    adviceMessage = 'Adicione suas bagagens para calcularmos a melhor opção.';
  } else if (totalVolume <= 35) {
    recommendedSize = 'small';
    adviceMessage = 'Suas malas cabem com folga no Locker P.';
  } else if (totalVolume <= 90) {
    recommendedSize = 'medium';
    adviceMessage = 'Excelente! O Locker M acomoda perfeitamente suas bagagens.';
  } else {
    recommendedSize = 'large';
    adviceMessage = 'Para maior conforto e segurança, recomendamos o Locker G.';
  }

  const lockerInfo = LOCKER_TYPES.find((l) => l.id === recommendedSize) || LOCKER_TYPES[1];

  const handleApply = () => {
    setSelectedSize(recommendedSize);
    setIsSizeRecommenderOpen(false);
    setIsBookingModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-slate-700 bg-[#0A1020] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500/20 text-sky-400">
              <Box className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-display">
                Simulador Visual: "Cabe ou Não Cabe?"
              </h3>
              <p className="text-xs text-slate-400">
                Selecione os itens que você está carregando e nosso sistema calcula o locker ideal.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsSizeRecommenderOpen(false)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6 max-h-[75vh] overflow-y-auto">
          {/* Left Column: Item Selector */}
          <div className="md:col-span-7 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              1. Quais itens você deseja guardar?
            </span>

            <div className="space-y-2 pt-1">
              {AVAILABLE_ITEMS.map((item) => {
                const count = selectedCounts[item.id] || 0;
                return (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                      count > 0
                        ? 'border-sky-500/40 bg-sky-950/20 text-white'
                        : 'border-slate-800 bg-slate-900/60 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <div className="text-xs font-bold">{item.name}</div>
                        <div className="text-[11px] text-slate-400">{item.type}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateCount(item.id, -1)}
                        disabled={count === 0}
                        className="h-7 w-7 flex items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-30 cursor-pointer"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-5 text-center text-xs font-mono font-bold">
                        {count}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateCount(item.id, 1)}
                        className="h-7 w-7 flex items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 cursor-pointer"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Visual Locker Stacking Simulation */}
          <div className="md:col-span-5 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                2. Visualização volumétrica
              </span>

              {/* Locker Box Preview */}
              <div className="mt-2 relative rounded-2xl border-2 border-dashed border-sky-500/40 bg-slate-950/80 p-5 flex flex-col items-center justify-center min-h-[200px]">
                {totalVolume === 0 ? (
                  <div className="text-center text-xs text-slate-500">
                    Selecione ao menos 1 item para simular o empilhamento.
                  </div>
                ) : (
                  <div className="w-full space-y-2">
                    <div className="flex items-center justify-between text-xs pb-1 border-b border-slate-800">
                      <span className="text-slate-400 font-mono">Volume simulado</span>
                      <span className="text-sky-400 font-bold font-mono">{totalVolume} pts</span>
                    </div>

                    {/* Stacking preview pill badges */}
                    <div className="flex flex-wrap gap-1.5 py-2">
                      {Object.entries(selectedCounts).map(([id, count]) => {
                        if (count === 0) return null;
                        const it = AVAILABLE_ITEMS.find((item) => item.id === id);
                        return Array.from({ length: count }).map((_, idx) => (
                          <div
                            key={`${id}-${idx}`}
                            className="flex items-center gap-1 rounded-lg bg-slate-800/90 border border-slate-700 px-2 py-1 text-xs text-slate-200"
                          >
                            <span>{it?.icon}</span>
                            <span className="text-[10px]">{it?.name}</span>
                          </div>
                        ));
                      })}
                    </div>

                    <div className="pt-2">
                      <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ${
                            totalVolume > 90
                              ? 'bg-gradient-to-r from-sky-400 to-indigo-500'
                              : totalVolume > 35
                              ? 'bg-sky-400'
                              : 'bg-emerald-400'
                          }`}
                          style={{
                            width: `${Math.min(100, (totalVolume / (lockerInfo.volumeLiters * 0.45)) * 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Recommendation card */}
              <div className="mt-4 rounded-xl border border-sky-500/30 bg-sky-950/30 p-4 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold tracking-wider uppercase text-sky-400">
                    Recomendação StopCase
                  </span>
                  <span className="text-xs font-mono font-bold text-white">
                    R$ {lockerInfo.dailyPrice}/dia
                  </span>
                </div>
                <div className="text-lg font-bold text-white font-display">
                  {lockerInfo.name}
                </div>
                <p className="text-xs text-slate-300">{adviceMessage}</p>
                <div className="pt-1 text-[11px] text-slate-400">
                  Dimensões: {lockerInfo.dimensionsVisual}
                </div>
              </div>

              {/* Disclaimer */}
              <div className="mt-2 flex items-start gap-1.5 text-[10px] text-slate-500">
                <Info className="h-3 w-3 shrink-0 mt-0.5 text-slate-400" />
                <span>
                  Estimativa demonstrativa de volume. Em caso de dúvidas na chegada, nossa equipe ou totem permite troca de compartimento.
                </span>
              </div>
            </div>

            <button
              onClick={handleApply}
              disabled={totalVolume === 0}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-sky-500 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-sky-500/20 hover:bg-sky-400 disabled:opacity-40 transition-all cursor-pointer"
            >
              <span>Escolher {lockerInfo.name} e Continuar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
