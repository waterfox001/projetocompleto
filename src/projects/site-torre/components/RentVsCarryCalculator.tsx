import React, { useState } from 'react';
import { Scale, Check, AlertCircle, Sparkles, ShoppingBag } from 'lucide-react';
import { UnitId } from '../types';
import { UNITS } from '../data/mockData';

interface RentVsCarryCalculatorProps {
  unitId: UnitId;
  onOpenCatalog: () => void;
}

interface ItemOption {
  id: string;
  name: string;
  airlineExtraFee: number; // Flight surcharge or extra bag
  rentalDailyPrice: number;
  weightKg: number;
}

const COMPARISON_ITEMS: ItemOption[] = [
  { id: 'carrinho', name: 'Carrinho de Bebê', airlineExtraFee: 140, rentalDailyPrice: 28, weightKg: 7.5 },
  { id: 'bebe_conforto', name: 'Bebê Conforto / Base', airlineExtraFee: 140, rentalDailyPrice: 22, weightKg: 4.5 },
  { id: 'berco', name: 'Berço Portátil com Colchão', airlineExtraFee: 160, rentalDailyPrice: 24, weightKg: 9.0 },
  { id: 'cadeira_auto', name: 'Cadeirinha para Carro', airlineExtraFee: 140, rentalDailyPrice: 20, weightKg: 7.0 },
  { id: 'banheira', name: 'Banheira & Acessórios', airlineExtraFee: 90, rentalDailyPrice: 14, weightKg: 2.0 },
];

export const RentVsCarryCalculator: React.FC<RentVsCarryCalculatorProps> = ({
  unitId,
  onOpenCatalog,
}) => {
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>([
    'carrinho',
    'bebe_conforto',
    'berco',
  ]);
  const [days, setDays] = useState(5);

  const toggleItem = (id: string) => {
    if (selectedItemIds.includes(id)) {
      if (selectedItemIds.length > 1) {
        setSelectedItemIds(selectedItemIds.filter((i) => i !== id));
      }
    } else {
      setSelectedItemIds([...selectedItemIds, id]);
    }
  };

  const selectedItems = COMPARISON_ITEMS.filter((item) =>
    selectedItemIds.includes(item.id)
  );

  // Levar:
  // Airlines allow 1 free baby item; extra items require checked luggage fee (going + returning)
  // Plus airport oversize/risk penalty + Uber XL fee difference
  const freeItemsAllowance = 1;
  const chargeableItemsCount = Math.max(0, selectedItems.length - freeItemsAllowance);
  const airlineExcessBaggage = chargeableItemsCount * 280; // R$ 140 round-trip per extra item
  const taxiOversizeCost = 90; // Uber XL vs Standard for huge boxes
  const wearAndTearRisk = 60; // Estimated depreciation & damage risk on airport conveyor
  const totalCostToCarry = airlineExcessBaggage + taxiOversizeCost + wearAndTearRisk;

  // Alugar na Torre de Bebel:
  const dailyTotal = selectedItems.reduce((acc, item) => acc + item.rentalDailyPrice, 0);
  const totalCostToRent = dailyTotal * days + UNITS[unitId].deliveryFee;

  const totalWeightAvoided = selectedItems.reduce((acc, item) => acc + item.weightKg, 0);

  return (
    <section className="py-16 md:py-24 bg-white border-t border-stone-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-900 text-xs font-bold mb-3">
            <Scale className="w-3.5 h-3.5 text-orange-600" />
            <span>Calculadora Interativa</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">
            Quanto custa levar tudo de casa vs. alugar?
          </h2>
          <p className="text-sm text-stone-600 mt-2">
            Compare o custo financeiro, o peso carregado e o risco de estragar equipamentos no avião.
          </p>
        </div>

        {/* Item selector pills */}
        <div className="bg-stone-50 p-6 rounded-3xl border border-stone-200/90 mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-xs font-bold text-stone-700 uppercase tracking-wider">
              Selecione o que você pretende usar na viagem:
            </span>
            <div className="flex items-center gap-2 text-xs text-stone-600 font-medium">
              <span>Período da viagem:</span>
              <select
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="bg-white border border-stone-200 rounded-lg px-2.5 py-1 font-bold text-stone-900 focus:outline-none"
              >
                {[3, 4, 5, 7, 10, 14].map((d) => (
                  <option key={d} value={d}>
                    {d} dias
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {COMPARISON_ITEMS.map((item) => {
              const isSelected = selectedItemIds.includes(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                    isSelected
                      ? 'bg-orange-600 text-white shadow-xs'
                      : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <span>{item.name}</span>
                  <span className={`text-[10px] ${isSelected ? 'text-orange-200' : 'text-stone-400'}`}>
                    (~{item.weightKg}kg)
                  </span>
                  {isSelected && <span>✓</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Comparison Duel Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* Card LEVAR */}
          <div className="p-6 sm:p-8 rounded-3xl bg-stone-50 border border-stone-200 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                <span className="text-sm font-bold text-stone-500 uppercase tracking-wider">
                  Opção 1: Levar de Casa
                </span>
                <span className="text-xs text-rose-600 font-semibold bg-rose-50 px-2.5 py-0.5 rounded-full">
                  Excesso & Desgaste
                </span>
              </div>

              <div className="space-y-2 text-xs text-stone-600">
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span>Franquia extra de bagagem aérea (Ida + Volta):</span>
                  <span className="font-bold text-stone-900">R$ {airlineExcessBaggage},00</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span>Transfer aeroporto (necessidade de carro maior):</span>
                  <span className="font-bold text-stone-900">R$ {taxiOversizeCost},00</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span>Risco de avarias na esteira / desgaste:</span>
                  <span className="font-bold text-stone-900">R$ {wearAndTearRisk},00</span>
                </div>
              </div>

              <div className="p-3 bg-rose-50/60 rounded-xl border border-rose-100 text-xs text-rose-800 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>
                  Você precisará carregar <strong>{totalWeightAvoided.toFixed(1)} kg</strong> de tralhas pesadas entre portões, escadas rolantes e táxis.
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-200">
              <div className="text-[11px] text-stone-400">Custo financeiro estimado:</div>
              <div className="text-2xl font-bold text-stone-700 tabular-nums">
                R$ {totalCostToCarry},00
              </div>
            </div>
          </div>

          {/* Card ALUGAR */}
          <div className="p-6 sm:p-8 rounded-3xl bg-orange-50/60 border-2 border-orange-300 flex flex-col justify-between space-y-6 relative shadow-md">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-orange-200 pb-3">
                <span className="text-sm font-bold text-orange-950 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-orange-600" />
                  <span>Opção 2: Torre de Bebel</span>
                </span>
                <span className="text-xs text-emerald-800 font-bold bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  Recomendado
                </span>
              </div>

              <div className="space-y-2 text-xs text-stone-700">
                <div className="flex justify-between py-1 border-b border-orange-100">
                  <span>Aluguel dos {selectedItems.length} itens por {days} dias:</span>
                  <span className="font-bold text-orange-950">R$ {(dailyTotal * days).toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-orange-100">
                  <span>Entrega VIP no Aeroporto / Hotel:</span>
                  <span className="font-bold text-orange-950">R$ {UNITS[unitId].deliveryFee},00</span>
                </div>
                <div className="flex justify-between py-1 border-b border-orange-100">
                  <span>Esterilização a vapor hospitalar & lençol selado:</span>
                  <span className="font-bold text-emerald-700">Grátis (Incluso)</span>
                </div>
              </div>

              {/* Weight savings badge */}
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
                <div>
                  <strong>Menos peso e zero dor de cabeça:</strong>
                  <p className="text-[11px] text-emerald-700">
                    Você poupa suas costas de carregar {totalWeightAvoided.toFixed(1)} kg.
                  </p>
                </div>
                <span className="text-lg font-bold text-emerald-800">-{totalWeightAvoided.toFixed(0)} kg</span>
              </div>
            </div>

            <div className="pt-4 border-t border-orange-200 flex items-center justify-between">
              <div>
                <div className="text-[11px] text-stone-500">Investimento total no seu conforto:</div>
                <div className="text-2xl font-bold text-orange-950 tabular-nums">
                  R$ {totalCostToRent.toFixed(2).replace('.', ',')}
                </div>
              </div>

              <button
                onClick={onOpenCatalog}
                className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-xl text-xs shadow-sm transition-all flex items-center gap-1.5"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Alugar e Viajar Leve</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
