import React from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, Sparkles, ShieldCheck, ShoppingBag } from 'lucide-react';
import { CartItem, Product, UnitId } from '../types';
import { UNITS, PRODUCTS } from '../data/mockData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  unitId: UnitId;
  onProceedToCheckout: () => void;
  onAddComplementary: (product: Product, days: number) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  unitId,
  onProceedToCheckout,
  onAddComplementary,
}) => {
  if (!isOpen) return null;

  const currentUnit = UNITS[unitId];

  const subtotal = items.reduce(
    (acc, item) => acc + item.product.dailyPrice * item.days * item.quantity,
    0
  );
  const deliveryFee = items.length > 0 ? currentUnit.deliveryFee : 0;
  const total = subtotal + deliveryFee;

  // Smart suggestion: if user has stroller but no car seat or crib
  const hasStroller = items.some((i) => i.product.category === 'Carrinhos');
  const hasCarSeat = items.some((i) => i.product.category === 'Bebê Conforto' || i.product.category === 'Cadeirinhas');
  const hasCrib = items.some((i) => i.product.category === 'Berços');

  let suggestedProduct: Product | null = null;
  if (hasStroller && !hasCarSeat) {
    suggestedProduct = PRODUCTS.find((p) => p.id === 'bebe-conforto-chicco') || null;
  } else if (hasStroller && !hasCrib) {
    suggestedProduct = PRODUCTS.find((p) => p.id === 'berco-graco-pack-play') || null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex justify-end animate-fadeIn">
      <div className="bg-white w-full max-w-md h-full flex flex-col shadow-2xl text-left border-l border-stone-200">
        {/* Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50/70">
          <div>
            <h3 className="font-serif text-xl font-bold text-stone-900 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-orange-600" />
              <span>Sua Reserva</span>
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Unidade {currentUnit.name} ({currentUnit.airportCode})
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items List */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {items.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-16 h-16 rounded-full bg-orange-50 text-orange-400 flex items-center justify-center mx-auto text-2xl">
                🛒
              </div>
              <h4 className="font-serif text-lg font-bold text-stone-900">
                Sua reserva está vazia
              </h4>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Explore nosso catálogo e selecione os itens que você gostaria de encontrar ao pousar.
              </p>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-orange-600 text-white rounded-xl text-xs font-semibold hover:bg-orange-700"
              >
                Ver Produtos
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => {
                const itemTotal = item.product.dailyPrice * item.days * item.quantity;
                return (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between gap-3"
                  >
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-14 h-14 object-cover rounded-xl bg-white border border-stone-100 shrink-0"
                      referrerPolicy="no-referrer"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-stone-900 truncate">{item.product.name}</h4>
                      <p className="text-[11px] text-stone-500">
                        R$ {item.product.dailyPrice.toFixed(2).replace('.', ',')}/dia · {item.days} diárias
                      </p>
                      <div className="text-xs font-bold text-orange-700 mt-0.5">
                        R$ {itemTotal.toFixed(2).replace('.', ',')}
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <div className="flex items-center gap-2 bg-white border border-stone-200 rounded-lg p-0.5">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="p-1 text-stone-500 hover:text-stone-900"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-stone-900 w-3 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="p-1 text-stone-500 hover:text-stone-900"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-stone-400 hover:text-rose-600 transition-colors"
                        title="Remover item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}

              {/* Smart Upsell Box */}
              {suggestedProduct && (
                <div className="p-3.5 bg-orange-50/70 rounded-2xl border border-orange-200/90 space-y-2 mt-4">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-orange-900">
                    <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                    <span>Sugestão Inteligente:</span>
                  </div>
                  <p className="text-[11px] text-stone-600">
                    Você já selecionou um carrinho. Que tal garantir também o <strong>{suggestedProduct.name}</strong> para sua viagem?
                  </p>
                  <button
                    onClick={() => onAddComplementary(suggestedProduct!, 5)}
                    className="w-full py-1.5 bg-white border border-orange-300 hover:bg-orange-600 hover:text-white text-orange-950 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Adicionar à Reserva (+R$ {suggestedProduct.dailyPrice}/dia)</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Summary & Checkout CTA */}
        {items.length > 0 && (
          <div className="p-5 border-t border-stone-200 bg-stone-50/50 space-y-4">
            <div className="space-y-1.5 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal dos produtos:</span>
                <span className="font-semibold text-stone-900 tabular-nums">
                  R$ {subtotal.toFixed(2).replace('.', ',')}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Taxa de Entrega / Desembarque ({currentUnit.airportCode}):</span>
                <span className="font-semibold text-stone-900 tabular-nums">
                  R$ {deliveryFee.toFixed(2).replace('.', ',')}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-stone-200 text-sm font-bold text-stone-900">
                <span>Total da Reserva:</span>
                <span className="text-lg text-orange-950 tabular-nums">
                  R$ {total.toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-xl text-sm shadow-md shadow-orange-600/20 transition-all flex items-center justify-center gap-2"
            >
              <span>Continuar para Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
