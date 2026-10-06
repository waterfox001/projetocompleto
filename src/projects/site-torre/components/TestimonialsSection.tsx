import React from 'react';
import { Heart, Star, Sparkles, MapPin } from 'lucide-react';
import { TESTIMONIALS } from '../data/mockData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-stone-50/60 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-orange-600 uppercase tracking-widest">
              <Heart className="w-3.5 h-3.5 text-rose-500" />
              <span>Experiências Reais</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 mt-1">
              Pais que viajaram mais leves
            </h2>
            <p className="text-stone-600 text-sm mt-1 max-w-xl">
              Histórias de quem trocou o excesso de peso e o estresse no aeroporto pelo carinho da Torre de Bebel.
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-stone-700 bg-white px-3.5 py-1.5 rounded-xl border border-stone-200">
            <span className="text-amber-500 font-bold">★ 4.98 de 5.0</span>
            <span className="text-stone-400">·</span>
            <span className="font-medium">+1.800 avaliações verificadas</span>
          </div>
        </div>

        {/* Testimonials 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Rating stars */}
                <div className="flex items-center gap-1 text-amber-500 text-xs">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-800 font-bold text-xs flex items-center justify-center shrink-0">
                  {t.avatarText}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900">{t.name}</h4>
                  <p className="text-[11px] text-stone-500">
                    De {t.city} · {t.destination}
                  </p>
                  <p className="text-[10px] text-orange-700 font-medium">{t.babyAge}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Momentos Reais Gallery */}
        <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-4">
            <div>
              <h3 className="font-serif text-xl font-bold text-stone-900">
                Momentos Reais
              </h3>
              <p className="text-xs text-stone-500">
                Fotos registradas pelas famílias durante passeios na praia, sonecas em hotéis e conexões tranquilas.
              </p>
            </div>
            <span className="text-xs font-handwriting text-orange-700 text-lg">
              #ViajeLeveComBebel
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-stone-100 relative group">
              <img
                src="/src/assets/images/happy_family_destination_1791260606889.jpg"
                alt="Passeio na praia com carrinho compacto"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-stone-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <span className="text-[11px] text-white font-medium">Praia do Futuro, Fortaleza</span>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-stone-100 relative group">
              <img
                src="/src/assets/images/hero_family_travel_1791260564700.jpg"
                alt="Chegada no aeroporto sem pressa"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-stone-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <span className="text-[11px] text-white font-medium">Desembarque Congonhas</span>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-stone-100 relative group">
              <img
                src="/src/assets/images/product_travel_crib_1791260596701.jpg"
                alt="Soneca serena no quarto de hotel"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-stone-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <span className="text-[11px] text-white font-medium">Resort em Porto de Galinhas</span>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-stone-100 relative group">
              <img
                src="/src/assets/images/product_compact_stroller_1791260580257.jpg"
                alt="Passeio em parque com carrinho Yoyo"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-stone-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <span className="text-[11px] text-white font-medium">Gramado & Serra Gaúcha</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
