import React from 'react';
import { X, Check, ShoppingBag, Trash2 } from 'lucide-react';
import { Product, UnitId } from '../types';
import { PRODUCTS, UNITS } from '../data/mockData';

interface ProductComparatorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  productIds: string[];
  onRemoveItem: (id: string) => void;
  onClear: () => void;
  unitId: UnitId;
  onAddToCart: (product: Product, days: number) => void;
}

export const ProductComparatorDrawer: React.FC<ProductComparatorDrawerProps> = ({
  isOpen,
  onClose,
  productIds,
  onRemoveItem,
  onClear,
  unitId,
  onAddToCart,
}) => {
  if (!isOpen || productIds.length === 0) return null;

  const comparedProducts = PRODUCTS.filter((p) => productIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden text-left">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div>
            <h3 className="font-serif text-xl font-bold text-stone-900">
              Comparador de Equipamentos
            </h3>
            <p className="text-xs text-stone-500">
              Comparando {comparedProducts.length} item{comparedProducts.length > 1 ? 's' : ''} para {UNITS[unitId].name}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClear}
              className="text-xs text-stone-500 hover:text-rose-600 font-medium px-2 py-1"
            >
              Limpar todos
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-700 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="p-6 overflow-x-auto flex-1">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-stone-200">
                <th className="p-3 font-bold text-stone-400 uppercase tracking-wider w-36">Especificação</th>
                {comparedProducts.map((p) => (
                  <th key={p.id} className="p-3 min-w-[200px] align-top">
                    <div className="space-y-2">
                      <div className="aspect-[4/3] rounded-xl overflow-hidden bg-stone-100 relative">
                        <img
                          src={p.imageUrl}
                          alt={p.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <button
                          onClick={() => onRemoveItem(p.id)}
                          className="absolute top-2 right-2 p-1 bg-white/90 rounded-md text-stone-500 hover:text-rose-600 shadow-xs"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <h4 className="font-serif font-bold text-sm text-stone-900 leading-snug">{p.name}</h4>
                      <div className="text-sm font-bold text-orange-600">
                        R$ {p.dailyPrice.toFixed(2).replace('.', ',')}/dia
                      </div>
                      <button
                        onClick={() => onAddToCart(p, 5)}
                        className="w-full py-1.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Reservar</span>
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              <tr>
                <td className="p-3 font-semibold text-stone-500">Marca</td>
                {comparedProducts.map((p) => (
                  <td key={p.id} className="p-3 font-bold text-stone-800">{p.brand}</td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-semibold text-stone-500">Faixa Etária</td>
                {comparedProducts.map((p) => (
                  <td key={p.id} className="p-3 text-stone-700">{p.ageGroup}</td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-semibold text-stone-500">Capacidade Máxima</td>
                {comparedProducts.map((p) => (
                  <td key={p.id} className="p-3 text-stone-700">{p.weightLimit}</td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-semibold text-stone-500">Peso do Produto</td>
                {comparedProducts.map((p) => (
                  <td key={p.id} className="p-3 font-mono text-stone-800">{p.specs.weightKg} kg</td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-semibold text-stone-500">Tipo de Dobra / Fechamento</td>
                {comparedProducts.map((p) => (
                  <td key={p.id} className="p-3 text-stone-700">{p.specs.foldType}</td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-semibold text-stone-500">Aceito na Cabine do Avião</td>
                {comparedProducts.map((p) => (
                  <td key={p.id} className="p-3 font-semibold">
                    {p.specs.cabinApproved ? (
                      <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        ✓ Sim (Sem despacho)
                      </span>
                    ) : (
                      <span className="text-stone-400">Despacho no portão</span>
                    )}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-semibold text-stone-500">Status em {UNITS[unitId].name}</td>
                {comparedProducts.map((p) => (
                  <td key={p.id} className="p-3 font-semibold">
                    {p.stockByUnit[unitId] === 'available' ? (
                      <span className="text-emerald-600">Disponível</span>
                    ) : p.stockByUnit[unitId] === 'low_stock' ? (
                      <span className="text-amber-600">Última unidade</span>
                    ) : (
                      <span className="text-rose-500">Indisponível</span>
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
