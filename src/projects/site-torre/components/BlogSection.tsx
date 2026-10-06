import React, { useState } from 'react';
import { BookOpen, Clock, ArrowRight, X, Sparkles } from 'lucide-react';
import { TravelGuide } from '../types';
import { TRAVEL_GUIDES } from '../data/mockData';

export const BlogSection: React.FC = () => {
  const [selectedGuide, setSelectedGuide] = useState<TravelGuide | null>(null);

  return (
    <section className="py-16 md:py-24 bg-white border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-orange-600 uppercase tracking-widest">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Dicas de Turismo & Parentalidade</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 mt-1">
              Guia para viajar com bebê
            </h2>
            <p className="text-stone-600 text-sm mt-1 max-w-xl">
              Artigos práticos com orientações reais para aeroportos, hotéis e passeios sem estresse.
            </p>
          </div>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TRAVEL_GUIDES.map((guide) => (
            <article
              key={guide.id}
              onClick={() => setSelectedGuide(guide)}
              className="bg-stone-50 rounded-3xl p-6 border border-stone-200 hover:border-orange-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span className="font-semibold text-orange-700">{guide.category}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{guide.readTime}</span>
                  </span>
                </div>

                <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-orange-600 transition-colors leading-snug">
                  {guide.title}
                </h3>

                <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                  {guide.snippet}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-200/60 flex items-center gap-1 text-xs font-bold text-stone-800 group-hover:text-orange-600 transition-colors">
                <span>Ler artigo completo</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </article>
          ))}
        </div>

        {/* Article Reading Modal */}
        {selectedGuide && (
          <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden my-auto text-left">
              {/* Header */}
              <div className="p-6 border-b border-stone-100 flex items-start justify-between bg-orange-50/40">
                <div>
                  <span className="text-xs font-bold text-orange-700 uppercase tracking-wider block">
                    {selectedGuide.category} · {selectedGuide.readTime}
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-stone-900 mt-1">
                    {selectedGuide.title}
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">{selectedGuide.subtitle}</p>
                </div>
                <button
                  onClick={() => setSelectedGuide(null)}
                  className="p-1.5 text-stone-400 hover:text-stone-700 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed flex-1">
                {selectedGuide.content.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}

                {/* Practical tips */}
                <div className="p-4 bg-orange-50 rounded-2xl border border-orange-200/80 space-y-2 mt-6">
                  <span className="font-bold text-orange-950 text-xs uppercase tracking-wider block">
                    Dicas Práticas da Torre de Bebel:
                  </span>
                  <ul className="space-y-1.5 text-xs text-stone-700">
                    {selectedGuide.tips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-orange-600 font-bold">✓</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
                <button
                  onClick={() => setSelectedGuide(null)}
                  className="px-5 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold"
                >
                  Fechar Artigo
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
