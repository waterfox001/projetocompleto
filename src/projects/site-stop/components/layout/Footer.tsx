import React from 'react';
import { useBooking } from '../../context/BookingContext';
import { HUBS } from '../../data/hubs';
import { ShieldCheck, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setSelectedHubId, setHubDetailModalId } = useBooking();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-800/80 bg-[#060A14] text-slate-400 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10">
        {/* Brand info */}
        <div className="md:col-span-4 space-y-4">
          <div className="text-xl font-bold tracking-tight text-white font-display">
            STOPCASE
          </div>
          <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
            Travel Storage Experience — O novo padrão digital para guarda-volumes e lockers em aeroportos. Deixe a mala, leve a viagem.
          </p>
          <div className="text-xs text-slate-500 font-mono">
            Operação em Fortaleza, Recife, Salvador, Porto Alegre e São Paulo Congonhas.
          </div>
        </div>

        {/* City Hubs Links */}
        <div className="md:col-span-3 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
            Cidades & Unidades
          </span>
          <ul className="space-y-2 text-xs">
            {HUBS.map((h) => (
              <li key={h.id}>
                <button
                  onClick={() => {
                    setSelectedHubId(h.id);
                    setHubDetailModalId(h.id);
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {h.name} — {h.airportName} ({h.airportCode})
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Features & Navigation */}
        <div className="md:col-span-3 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
            Experiência & Ferramentas
          </span>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => scrollTo('calculadora-tempo')} className="hover:text-white transition-colors">
                Calculadora de Tempo Livre
              </button>
            </li>
            <li>
              <button onClick={() => scrollTo('travel-planner')} className="hover:text-white transition-colors">
                Lugares & Indicações
              </button>
            </li>
            <li>
              <button onClick={() => scrollTo('tamanhos')} className="hover:text-white transition-colors">
                Locker 360° Visualizer
              </button>
            </li>
            <li>
              <button onClick={() => scrollTo('faq')} className="hover:text-white transition-colors">
                Central de Ajuda & FAQ
              </button>
            </li>
          </ul>
        </div>

        {/* Support & Contact */}
        <div className="md:col-span-2 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
            Atendimento
          </span>
          <div className="space-y-2 text-xs text-slate-400">
            <div>Suporte ao viajante nos 5 aeroportos homologados.</div>
            <div className="pt-2 text-[11px] text-slate-500">
              Autoatendimento 24 horas por dia em terminais autorizados.
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div>
          © {new Date().getFullYear()} StopCase Serviços de Armazenamento Temporário Ltda. Todos os direitos reservados.
        </div>
        <div className="flex items-center gap-4">
          <span>Privacidade</span>
          <span>·</span>
          <span>Termos de Uso</span>
          <span>·</span>
          <span>Segurança dos Lockers</span>
        </div>
      </div>
    </footer>
  );
};
