import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { HUBS } from '../../data/hubs';
import { BookOpen, MapPin, ArrowRight, ExternalLink, Sparkles } from 'lucide-react';

interface GuideArticle {
  title: string;
  category: string;
  readTime: string;
  summary: string;
  cityTag: string;
  slug: string;
}

const ARTICLES: GuideArticle[] = [
  {
    title: 'O que fazer em uma conexão de 5 horas em São Paulo (Congonhas)',
    category: 'Conexão & Layover',
    readTime: '4 min',
    summary: 'Roteiro seguro para almoçar nos Jardins ou passear no Parque Ibirapuera sem arrastar malas no trânsito paulistano.',
    cityTag: 'São Paulo (CGH)',
    slug: 'guarda-volumes-sao-paulo-congonhas',
  },
  {
    title: 'Guia de 4 horas em Fortaleza: Praia de Iracema e Caranguejada',
    category: 'Turismo Tropical',
    readTime: '3 min',
    summary: 'Como aproveitar a brisa e a culinária da Beira-Mar após desembarcar no Pinto Martins sem preocupação de bagagem.',
    cityTag: 'Fortaleza (FOR)',
    slug: 'guarda-volumes-fortaleza-aeroporto',
  },
  {
    title: 'Check-out antecipado no Recife: Marco Zero e Olinda sem malas',
    category: 'Check-out do Hotel',
    readTime: '4 min',
    summary: 'Seu voo sai tarde? Deixe as malas no Aeroporto dos Guararapes e curta a tarde cultural em Pernambuco.',
    cityTag: 'Recife (REC)',
    slug: 'guarda-volumes-recife-aeroporto',
  },
  {
    title: 'Layover em Salvador: Farol da Barra e Acarajé em segurança',
    category: 'Cultura & Gastronomia',
    readTime: '5 min',
    summary: 'Aproveite o tempo entre conexões no Salvador Bahia Airport para sentir a energia baiana sem peso nos braços.',
    cityTag: 'Salvador (SSA)',
    slug: 'guarda-volumes-salvador-aeroporto',
  },
];

export const CitySeoSection: React.FC = () => {
  const { setSelectedHubId, setHubDetailModalId, setIsBookingModalOpen } = useBooking();
  const [activeArticle, setActiveArticle] = useState<GuideArticle | null>(null);

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-sky-400">
            <BookOpen className="h-3.5 w-3.5" />
            <span>STOPCASE TRAVEL GUIDES · SEO LOCAL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
            Guias de viagem & O que fazer na cidade
          </h2>
          <p className="text-sm text-slate-300 max-w-xl">
            Dicas práticas de mobilidade, conexões e turismo leve nos aeroportos onde operamos.
          </p>
        </div>

        <div className="text-xs text-slate-400 font-mono">
          Conteúdo oficial StopCase
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {ARTICLES.map((article, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-slate-800 bg-[#090E1C] p-5 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-all cursor-pointer group"
            onClick={() => setActiveArticle(article)}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-sky-400 font-mono font-semibold">
                  {article.category}
                </span>
                <span className="text-slate-500">{article.readTime}</span>
              </div>

              <h3 className="text-sm font-bold text-white group-hover:text-sky-300 transition-colors font-display leading-snug">
                {article.title}
              </h3>

              <p className="text-xs text-slate-400 leading-relaxed">
                {article.summary}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1 text-[11px] font-mono">
                <MapPin className="h-3 w-3 text-sky-400" />
                {article.cityTag}
              </span>
              <span className="text-sky-400 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Article Detail Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-700 bg-[#090E1C] p-6 sm:p-8 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-mono text-sky-400 font-bold uppercase">
                {activeArticle.cityTag} · GUIA DE VIAGEM
              </span>
              <button
                onClick={() => setActiveArticle(null)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Fechar ✕
              </button>
            </div>

            <h3 className="text-xl font-bold text-white font-display">
              {activeArticle.title}
            </h3>

            <div className="text-xs sm:text-sm text-slate-300 space-y-3 leading-relaxed">
              <p>
                Viajantes que aterrissam nos grandes aeroportos brasileiros frequentemente encaram a mesma dúvida: o que fazer com 4, 6 ou 8 horas livres até o próximo compromisso ou voo?
              </p>
              <p>
                Carregar malas pesadas de 15kg a 25kg em calçadas, táxis e cafeterias reduz drasticamente a mobilidade. Ao utilizar a estação de lockers inteligentes da StopCase, você tem acesso liberado por QR Code em menos de 2 minutos.
              </p>
              <div className="p-4 rounded-2xl bg-sky-950/20 border border-sky-500/30 text-xs text-sky-200">
                💡 <strong>Dica de ouro:</strong> Reserve 1h30 antes do voo para o trajeto de volta ao aeroporto e retirada sem filas.
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
              <span className="text-xs text-slate-500">URL estruturada: /{activeArticle.slug}</span>
              <button
                onClick={() => {
                  setActiveArticle(null);
                  setIsBookingModalOpen(true);
                }}
                className="rounded-xl bg-sky-500 px-5 py-2.5 text-xs font-bold text-slate-950 hover:bg-sky-400"
              >
                Reservar Locker nesta Cidade
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Local SEO hub directory footer links */}
      <div className="mt-12 pt-8 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
        <span className="font-semibold text-slate-300">Páginas de Guarda-Volumes por Cidade:</span>
        <div className="flex flex-wrap gap-4">
          {HUBS.map((h) => (
            <button
              key={h.id}
              onClick={() => {
                setSelectedHubId(h.id);
                setHubDetailModalId(h.id);
              }}
              className="hover:text-sky-400 transition-colors cursor-pointer"
            >
              Guarda-Volumes {h.name} ({h.airportCode})
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
