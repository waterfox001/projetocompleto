import React, { useState } from 'react';
import { X, CheckCircle2, AlertTriangle, XCircle, ShoppingBag, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { UnitId, ProductCategory, Product } from '../types';
import { UNITS, PRODUCTS } from '../data/mockData';

interface AvailabilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  unitId: UnitId;
  startDate: string;
  endDate: string;
  categories: ProductCategory[];
  onAddToCart: (product: Product, days: number) => void;
  onViewProduct: (product: Product) => void;
}

export const AvailabilityModal: React.FC<AvailabilityModalProps> = ({
  isOpen,
  onClose,
  unitId,
  startDate,
  endDate,
  categories,
  onAddToCart,
  onViewProduct,
}) => {
  const [selectedAlternative, setSelectedAlternative] = useState<Product | null>(null);

  if (!isOpen) return null;

  const currentUnit = UNITS[unitId];

  // Calculate rental days
  const start = new Date(startDate);
  const end = new Date(endDate);
  const days = Math.max(1, Math.ceil(Math.abs(end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));

  // Filter products matching user's requested categories
  const relevantProducts = PRODUCTS.filter((p) =>
    categories.length === 0 || categories.includes(p.category)
  );

  const availableProducts = relevantProducts.filter(
    (p) => p.stockByUnit[unitId] === 'available'
  );
  const lowStockProducts = relevantProducts.filter(
    (p) => p.stockByUnit[unitId] === 'low_stock'
  );
  const outOfStockProducts = relevantProducts.filter(
    (p) => p.stockByUnit[unitId] === 'out_of_stock'
  );

  // Suggestions for unavailable items
  const suggestedAlternatives = PRODUCTS.filter(
    (p) => p.stockByUnit[unitId] === 'available' && !relevantProducts.some((r) => r.id === p.id)
  ).slice(0, 3);

  const formatDateBR = (iso: string) => {
    if (!iso) return '';
    const [y, m, d] = iso.split('-');
    return `${d}/${m}/${y}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden text-left my-auto">
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-orange-50 via-white to-stone-50 border-b border-stone-200 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">
                Motor de Disponibilidade Inteligente
              </span>
              <span className="text-stone-300">·</span>
              <span className="text-xs text-stone-500 font-medium">{currentUnit.fullName}</span>
            </div>
            <h3 className="text-2xl font-serif font-bold text-stone-900 mt-0.5">
              Estoque confirmado para suas datas
            </h3>
            <p className="text-xs text-stone-600 mt-1">
              Período de <strong className="text-stone-900">{formatDateBR(startDate)}</strong> a{' '}
              <strong className="text-stone-900">{formatDateBR(endDate)}</strong> ({days} diárias)
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Disponíveis com folga */}
          {availableProducts.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-emerald-100 pb-2">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>DISPONÍVEIS PARA RETIRADA OU ENTREGA</span>
                </div>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                  Pronto para reserva imediata
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {availableProducts.map((p) => {
                  const totalPeriod = p.dailyPrice * days;
                  return (
                    <div
                      key={p.id}
                      className="p-3.5 rounded-2xl bg-stone-50 hover:bg-white border border-stone-200 hover:border-orange-300 transition-all flex items-center justify-between gap-3 shadow-xs"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={p.imageUrl}
                          alt={p.name}
                          className="w-14 h-14 object-cover rounded-xl bg-white border border-stone-100 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <div className="text-[11px] text-stone-500 font-medium">{p.brand}</div>
                          <h4 className="text-sm font-bold text-stone-900 leading-snug">{p.name}</h4>
                          <div className="text-xs text-stone-600 mt-0.5 font-medium">
                            R$ {p.dailyPrice.toFixed(2).replace('.', ',')}/dia ·{' '}
                            <span className="text-orange-700 font-bold">R$ {totalPeriod.toFixed(2).replace('.', ',')}</span> ({days}d)
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5 shrink-0">
                        <button
                          onClick={() => {
                            onAddToCart(p, days);
                          }}
                          className="px-3 py-1.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 shadow-sm transition-all"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Reservar</span>
                        </button>
                        <button
                          onClick={() => onViewProduct(p)}
                          className="text-[11px] text-stone-500 hover:text-stone-900 font-medium text-center"
                        >
                          Ver detalhes
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Última Unidade */}
          {lowStockProducts.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-amber-100 pb-2">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  <span>ÚLTIMA UNIDADE NO ESTOQUE DESTE AEROPORTO</span>
                </div>
                <span className="text-xs font-semibold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full">
                  Alta procura
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {lowStockProducts.map((p) => {
                  const totalPeriod = p.dailyPrice * days;
                  return (
                    <div
                      key={p.id}
                      className="p-3.5 rounded-2xl bg-amber-50/40 border border-amber-200 flex items-center justify-between gap-3 shadow-xs"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={p.imageUrl}
                          alt={p.name}
                          className="w-14 h-14 object-cover rounded-xl bg-white border border-stone-100 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <div className="text-[11px] text-amber-700 font-semibold">Apenas 1 unidade livre</div>
                          <h4 className="text-sm font-bold text-stone-900 leading-snug">{p.name}</h4>
                          <div className="text-xs text-stone-600 mt-0.5 font-medium">
                            R$ {p.dailyPrice.toFixed(2).replace('.', ',')}/dia · Total:{' '}
                            <span className="font-bold text-stone-900">R$ {totalPeriod.toFixed(2).replace('.', ',')}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5 shrink-0">
                        <button
                          onClick={() => {
                            onAddToCart(p, days);
                          }}
                          className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 shadow-sm transition-all"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Garantir</span>
                        </button>
                        <button
                          onClick={() => onViewProduct(p)}
                          className="text-[11px] text-stone-500 hover:text-stone-900 font-medium text-center"
                        >
                          Ver detalhes
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Indisponíveis com sugestões de alternativas */}
          {outOfStockProducts.length > 0 && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between border-b border-rose-100 pb-2">
                <div className="flex items-center gap-2 text-rose-800 font-bold text-sm">
                  <XCircle className="w-5 h-5 text-rose-600" />
                  <span>PRODUTO INDISPONÍVEL NESTAS DATAS</span>
                </div>
                <span className="text-xs text-rose-600 font-medium">
                  Já locado por outra família
                </span>
              </div>

              {outOfStockProducts.map((p) => (
                <div
                  key={p.id}
                  className="p-4 rounded-2xl bg-rose-50/30 border border-rose-200/80 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs line-through text-stone-400 font-medium">{p.name} ({p.brand})</span>
                      <p className="text-xs text-rose-800 font-semibold mt-0.5">
                        Esse produto não está disponível para suas datas em {currentUnit.name}.
                      </p>
                    </div>
                    <span className="text-xs text-stone-500 bg-white px-2.5 py-1 rounded-md border border-stone-200">
                      100% Ocupado
                    </span>
                  </div>

                  {/* Alternativas parecidas encontradas */}
                  <div className="bg-white p-3.5 rounded-xl border border-rose-100 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-stone-800">
                      <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                      <span>Encontramos alternativas recomendadas disponíveis para substituir:</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {PRODUCTS.filter(
                        (alt) => alt.category === p.category && alt.stockByUnit[unitId] === 'available'
                      ).map((alt) => (
                        <div
                          key={alt.id}
                          className="p-2.5 rounded-lg border border-stone-200 hover:border-orange-300 flex items-center justify-between gap-2 bg-stone-50"
                        >
                          <div>
                            <div className="text-xs font-bold text-stone-900">{alt.name}</div>
                            <div className="text-[11px] text-stone-500">R$ {alt.dailyPrice.toFixed(2).replace('.', ',')}/dia</div>
                          </div>
                          <button
                            onClick={() => onAddToCart(alt, days)}
                            className="px-2.5 py-1 bg-orange-600 hover:bg-orange-700 text-white rounded text-xs font-semibold"
                          >
                            Substituir
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Cuidado e Garantia da Torre de Bebel */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
            <p className="text-xs text-stone-600">
              Todos os produtos confirmados entram em protocolo de <strong>esterilização a vapor 140°C</strong> e embalagem selada individual 24 horas antes do seu desembarque em {currentUnit.airportCode}.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-stone-50 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-stone-500">
            Dúvidas sobre o modelo? Fale com a equipe de {currentUnit.name} pelo WhatsApp.
          </div>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs transition-colors"
          >
            Continuar Explorando Catálogo
          </button>
        </div>
      </div>
    </div>
  );
};
