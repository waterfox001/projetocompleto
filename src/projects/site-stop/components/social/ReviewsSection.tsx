import React, { useState } from 'react';
import { REVIEWS } from '../../data/reviews';
import { Star, CheckCircle2, MapPin, Clock } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'Conexão', 'Turismo', 'Trabalho', 'Check-out', 'Família'];

  const filteredReviews =
    selectedCategory === 'all'
      ? REVIEWS
      : REVIEWS.filter((r) => r.category === selectedCategory);

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
            Experiências Reais de Viajantes
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
            Quem viaja leve, recomenda.
          </h2>
          <p className="text-sm text-slate-300 max-w-xl">
            Descubra como passageiros em conexões, férias e viagens de negócios transformaram seu dia nos principais aeroportos do país.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900/80 rounded-xl border border-slate-800">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-sky-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {cat === 'all' ? 'Todos os perfis' : cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReviews.map((rev) => (
          <div
            key={rev.id}
            className="rounded-2xl border border-slate-800 bg-[#090E1C] p-6 flex flex-col justify-between space-y-4 shadow-lg hover:border-slate-700 transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-[11px] font-mono font-semibold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
                  {rev.hoursSaved}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                "{rev.text}"
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-white block">{rev.author}</span>
                <span className="text-[11px] text-slate-400">{rev.role}</span>
              </div>
              <div className="text-right">
                <span className="font-semibold text-slate-300 block">{rev.city}</span>
                <span className="text-[10px] text-slate-500 font-mono">{rev.hub}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
