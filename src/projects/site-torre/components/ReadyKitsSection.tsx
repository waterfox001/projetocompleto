import React from 'react';
import { Package, Sparkles, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { ReadyKit, Product, UnitId } from '../types';
import { READY_KITS, PRODUCTS } from '../data/mockData';

interface ReadyKitsSectionProps {
  unitId: UnitId;
  onBookKit: (products: Product[], days: number) => void;
}

export const ReadyKitsSection: React.FC<ReadyKitsSectionProps> = ({
  unitId,
  onBookKit,
}) => {
  const handleSelectKit = (kit: ReadyKit) => {
    const productsInKit = PRODUCTS.filter((p) => kit.productIds.includes(p.id));
    onBookKit(productsInKit, 5); // default 5 days
  };

  return (
    <section className="py-16 md:py-24 bg-stone-50/60 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-orange-600 uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Combinações Testadas & Aprovadas</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 mt-1">
              Chegue e encontre tudo pronto
            </h2>
            <p className="text-stone-600 text-sm mt-1 max-w-xl">
              Economize tempo com nossos kits pré-montados com desconto sobre a diária avulsa.
            </p>
          </div>

          <span className="text-xs text-stone-500 font-medium">
            Todos os kits incluem esterilização hospitalar e lençóis selados.
          </span>
        </div>

        {/* Kits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {READY_KITS.map((kit) => (
            <div
              key={kit.id}
              className="bg-white rounded-3xl p-6 border border-stone-200 hover:border-orange-300 hover:shadow-lg transition-all flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                {/* Badge */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-orange-800 bg-orange-100/70 px-2.5 py-0.5 rounded-full">
                    {kit.badge}
                  </span>
                  <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">
                    -{kit.weightSavedKg}kg bagagem
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-xl font-bold text-stone-900 group-hover:text-orange-600 transition-colors">
                    {kit.name}
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">{kit.subtitle}</p>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed">{kit.description}</p>

                {/* Items in kit */}
                <div className="space-y-2 pt-2 border-t border-stone-100">
                  <span className="text-[11px] font-bold text-stone-700 uppercase tracking-wider block">
                    Incluso no pacote:
                  </span>
                  <ul className="space-y-1.5 text-xs text-stone-600">
                    {kit.itemsList.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Pricing & CTA */}
              <div className="pt-4 border-t border-stone-100 space-y-3">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-[10px] line-through text-stone-400 block">
                      De R$ {kit.originalPrice},00/dia
                    </span>
                    <div className="text-xl font-bold text-stone-900 tabular-nums">
                      R$ {kit.dailyPrice.toFixed(2).replace('.', ',')}
                      <span className="text-xs font-normal text-stone-500">/dia</span>
                    </div>
                  </div>
                  <span className="text-[11px] text-emerald-700 font-bold">
                    Economia no combo
                  </span>
                </div>

                <button
                  onClick={() => handleSelectKit(kit)}
                  className="w-full py-2.5 px-3 bg-stone-900 hover:bg-orange-600 text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Package className="w-3.5 h-3.5" />
                  <span>Reservar Este Kit</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
