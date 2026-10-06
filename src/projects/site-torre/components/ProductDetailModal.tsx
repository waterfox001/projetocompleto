import React, { useState } from 'react';
import { X, Calendar, ShieldCheck, Check, Plus, Minus, Heart, Sparkles, ShoppingBag, ArrowRight } from 'lucide-react';
import { Product, UnitId } from '../types';
import { UNITS, PRODUCTS } from '../data/mockData';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  unitId: UnitId;
  defaultStartDate: string;
  defaultEndDate: string;
  onAddToCart: (product: Product, days: number, quantity: number) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  unitId,
  defaultStartDate,
  defaultEndDate,
  onAddToCart,
  favorites,
  onToggleFavorite,
  onSelectProduct,
}) => {
  if (!product) return null;

  const [startDate, setStartDate] = useState(defaultStartDate || '2026-10-10');
  const [endDate, setEndDate] = useState(defaultEndDate || '2026-10-15');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'info' | 'specs' | 'hygiene'>('info');

  const currentUnit = UNITS[unitId];

  // Dynamic calculation
  const start = new Date(startDate);
  const end = new Date(endDate);
  const days = Math.max(1, Math.ceil(Math.abs(end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
  const totalAmount = product.dailyPrice * days * quantity;

  const isFav = favorites.includes(product.id);
  const stockStatus = product.stockByUnit[unitId];

  // Complementary products
  const complementaryProducts = PRODUCTS.filter((p) =>
    product.complementaryProductIds.includes(p.id)
  );

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden text-left my-auto">
        {/* Top bar */}
        <div className="p-4 px-6 border-b border-stone-100 flex items-center justify-between bg-stone-50/50">
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <span className="font-semibold text-stone-900">{product.brand}</span>
            <span>/</span>
            <span>{product.category}</span>
            <span>/</span>
            <span className="text-orange-700 font-medium">Unidade {currentUnit.name}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleFavorite(product.id)}
              className="p-2 rounded-xl text-stone-500 hover:text-rose-600 hover:bg-white transition-colors"
              title="Favoritar"
            >
              <Heart className="w-5 h-5" fill={isFav ? '#E11D48' : 'none'} color={isFav ? '#E11D48' : 'currentColor'} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Left: Gallery & Highlights */}
            <div className="md:col-span-6 space-y-4">
              <div className="aspect-[4/3] rounded-2xl bg-stone-100 overflow-hidden border border-stone-200/80 relative shadow-sm">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-lg text-xs font-semibold text-stone-800 border border-stone-200/60">
                  {product.specs.foldType}
                </div>
              </div>

              {/* Ideal Para badges */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
                  Ideal para:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {product.idealFor.map((item, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-stone-100 text-stone-700 font-medium px-2.5 py-1 rounded-md"
                    >
                      ✓ {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Technical features list */}
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-100 space-y-2 text-xs text-stone-700">
                <span className="font-bold text-stone-900 block">Diferenciais em Viagens:</span>
                <ul className="space-y-1.5">
                  {product.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-orange-600 font-bold">•</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: Pricing Calculator & Reservation Engine */}
            <div className="md:col-span-6 space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 leading-tight">
                  {product.name}
                </h2>
                <div className="flex items-center gap-3 text-xs text-stone-500 mt-2">
                  <span className="font-bold text-stone-800">{product.brand}</span>
                  <span>·</span>
                  <span>Faixa: {product.ageGroup}</span>
                  <span>·</span>
                  <span>Capacidade: {product.weightLimit}</span>
                </div>
              </div>

              {/* Rental Period Calculator Card */}
              <div className="p-5 rounded-2xl bg-orange-50/50 border border-orange-200/80 space-y-4">
                <div className="flex items-center justify-between border-b border-orange-200/60 pb-3">
                  <div className="text-xs font-bold text-orange-950 uppercase tracking-wider">
                    Escolha suas Datas de Viagem
                  </div>
                  <div className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                    {stockStatus === 'available' ? '✓ Disponível no aeroporto' : '⚠ Última unidade'}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-left">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-stone-600 uppercase tracking-wider">
                      Entrega / Retirada
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs font-semibold text-stone-900 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-stone-600 uppercase tracking-wider">
                      Devolução
                    </label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs font-semibold text-stone-900 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Quantity selector */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs font-medium text-stone-700">Quantidade:</span>
                  <div className="flex items-center gap-3 bg-white border border-stone-200 rounded-xl p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-1 text-stone-500 hover:text-stone-900 rounded"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-bold text-stone-900 w-4 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-1 text-stone-500 hover:text-stone-900 rounded"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Price Breakdown Calculation Display */}
                <div className="pt-3 border-t border-orange-200/60 flex items-end justify-between">
                  <div>
                    <span className="text-[11px] text-stone-500 font-medium">
                      R$ {product.dailyPrice.toFixed(2).replace('.', ',')}/dia × {days} dias {quantity > 1 ? `× ${quantity} un` : ''}
                    </span>
                    <div className="text-2xl font-bold text-orange-950 tabular-nums">
                      R$ {totalAmount.toFixed(2).replace('.', ',')}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onAddToCart(product, days, quantity);
                      onClose();
                    }}
                    className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-xl text-sm shadow-md shadow-orange-600/20 transition-all flex items-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Reservar Agora</span>
                  </button>
                </div>
              </div>

              {/* Sanitization reassurance badge */}
              <div className="flex items-center gap-3 p-3.5 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>
                  <strong>Higiene Garantida:</strong> {product.specs.sanitizationType}. Embalado com lacre de segurança.
                </span>
              </div>
            </div>
          </div>

          {/* "Você Também Pode Precisar" Cross-sell section */}
          {complementaryProducts.length > 0 && (
            <div className="pt-6 border-t border-stone-200 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-stone-900 font-bold text-base font-serif">
                  <Sparkles className="w-4 h-4 text-orange-600" />
                  <span>Você também pode precisar para esta viagem:</span>
                </div>
                <span className="text-xs text-stone-500">Combine e economize</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {complementaryProducts.map((comp) => (
                  <div
                    key={comp.id}
                    className="p-3 bg-stone-50 rounded-2xl border border-stone-200 hover:border-orange-300 transition-all flex flex-col justify-between"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <img
                        src={comp.imageUrl}
                        alt={comp.name}
                        className="w-12 h-12 rounded-lg object-cover bg-white"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="text-[10px] text-stone-500">{comp.category}</div>
                        <h4 className="text-xs font-bold text-stone-900 line-clamp-1">{comp.name}</h4>
                        <div className="text-xs font-bold text-orange-700">
                          R$ {comp.dailyPrice.toFixed(2).replace('.', ',')}/dia
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => onAddToCart(comp, days, 1)}
                      className="w-full py-1.5 bg-white hover:bg-orange-600 hover:text-white border border-stone-200 text-stone-700 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Adicionar à viagem</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
