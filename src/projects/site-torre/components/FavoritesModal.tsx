import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product, UnitId } from '../types';
import { PRODUCTS, UNITS } from '../data/mockData';

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  favoriteIds: string[];
  onRemoveFavorite: (id: string) => void;
  unitId: UnitId;
  onAddToCart: (product: Product, days: number) => void;
}

export const FavoritesModal: React.FC<FavoritesModalProps> = ({
  isOpen,
  onClose,
  favoriteIds,
  onRemoveFavorite,
  unitId,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  const favProducts = PRODUCTS.filter((p) => favoriteIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden text-left my-auto">
        <div className="p-5 border-b border-stone-100 flex items-center justify-between bg-stone-50/70">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            <h3 className="font-serif text-lg font-bold text-stone-900">
              Meus Favoritos ({favProducts.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto space-y-3 flex-1">
          {favProducts.length === 0 ? (
            <div className="text-center py-12 space-y-2 text-stone-500">
              <Heart className="w-10 h-10 text-stone-300 mx-auto" />
              <p className="text-sm font-semibold text-stone-700">Nenhum produto favoritado ainda</p>
              <p className="text-xs">Clique no coração de qualquer produto do catálogo para salvar aqui.</p>
            </div>
          ) : (
            favProducts.map((p) => (
              <div
                key={p.id}
                className="p-3 bg-stone-50 rounded-2xl border border-stone-200 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    className="w-12 h-12 object-cover rounded-xl bg-white"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-stone-900">{p.name}</h4>
                    <span className="text-[11px] text-stone-500 font-medium">
                      R$ {p.dailyPrice.toFixed(2).replace('.', ',')}/dia
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onAddToCart(p, 5);
                      onClose();
                    }}
                    className="px-3 py-1.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Reservar</span>
                  </button>
                  <button
                    onClick={() => onRemoveFavorite(p.id)}
                    className="p-1.5 text-stone-400 hover:text-rose-600"
                    title="Remover"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
