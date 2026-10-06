import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { Sparkles, Search, ArrowRight, Bot, Compass, CheckCircle2 } from 'lucide-react';
import { HUBS } from '../../data/hubs';

interface ScenarioPreset {
  query: string;
  label: string;
}

const PRESETS: ScenarioPreset[] = [
  {
    query: 'Estou em Congonhas com 3 horas até o voo e 2 malas de bordo',
    label: 'São Paulo · 3h livres',
  },
  {
    query: 'Cheguei em Fortaleza às 10h, hotel só abre 15h, quero ir à praia',
    label: 'Fortaleza · Praia e Orla',
  },
  {
    query: 'Conexão de 5 horas no Recife, quero almoçar no Recife Antigo',
    label: 'Recife · Almoço histórico',
  },
  {
    query: 'Desembarquei em Salvador e tenho reunião de trabalho às 14h',
    label: 'Salvador · Trabalho & Reunião',
  },
];

export const StopCaseAssist: React.FC = () => {
  const { setSelectedHubId, setIsBookingModalOpen } = useBooking();
  const [inputText, setInputText] = useState('');
  const [matchedSolution, setMatchedSolution] = useState<{
    city: string;
    hubCode: string;
    advice: string;
    recommendedLocker: string;
  } | null>(null);

  const analyzeScenario = (text: string) => {
    setInputText(text);
    const lower = text.toLowerCase();

    if (lower.includes('congonhas') || lower.includes('são paulo') || lower.includes('sp')) {
      setSelectedHubId('sao-paulo-congonhas');
      setMatchedSolution({
        city: 'São Paulo',
        hubCode: 'CGH',
        advice: 'Em Congonhas, deixe sua bagagem no térreo próximo à passarela e aproveite o Parque Ibirapuera ou os Jardins a menos de 15 minutos.',
        recommendedLocker: 'Locker M (Mala de bordo + Mochila)',
      });
    } else if (lower.includes('fortaleza') || lower.includes('praia') || lower.includes('ce')) {
      setSelectedHubId('fortaleza');
      setMatchedSolution({
        city: 'Fortaleza',
        hubCode: 'FOR',
        advice: 'No Aeroporto Pinto Martins, guarde suas malas no Piso 1 e pegue um transfer rápido até a Beira-Mar de Iracema para relaxar sem peso.',
        recommendedLocker: 'Locker M ou G (Para roupas de praia e compras)',
      });
    } else if (lower.includes('recife') || lower.includes('boa viagem') || lower.includes('pe')) {
      setSelectedHubId('recife');
      setMatchedSolution({
        city: 'Recife',
        hubCode: 'REC',
        advice: 'No Aeroporto dos Guararapes, use a baia térrea de lockers e visite Boa Viagem ou o Marco Zero sem arrastar rodinhas na calçada.',
        recommendedLocker: 'Locker M',
      });
    } else if (lower.includes('salvador') || lower.includes('bahia') || lower.includes('ssa')) {
      setSelectedHubId('salvador');
      setMatchedSolution({
        city: 'Salvador',
        hubCode: 'SSA',
        advice: 'No Salvador Bahia Airport, o ponto fica no Piso 1. Ideal para provar moqueca em Stella Maris sem malas no carro.',
        recommendedLocker: 'Locker G ou M',
      });
    } else {
      setSelectedHubId('sao-paulo-congonhas');
      setMatchedSolution({
        city: 'Aeroportos StopCase',
        hubCode: 'BR',
        advice: 'Você pode guardar suas malas imediatamente em qualquer uma das nossas unidades e transformar horas de espera em liberdade produtiva.',
        recommendedLocker: 'Locker M (Padrão Viagem)',
      });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    analyzeScenario(inputText);
  };

  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="rounded-3xl border border-sky-500/20 bg-gradient-to-br from-[#091024] to-[#070B14] p-6 sm:p-10 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-sky-400">
              <Bot className="h-4 w-4" />
              <span>STOPCASE ASSIST · DIAGNÓSTICO INTELIGENTE DE VIAGEM</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
              Me conte seu cenário
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Digite onde você está ou o que planeja fazer para receber uma rota personalizada.
            </p>
          </div>

          <span className="text-xs text-slate-500 font-mono">Sem robôs genéricos</span>
        </div>

        {/* Input bar */}
        <form onSubmit={handleFormSubmit} className="relative">
          <input
            type="text"
            placeholder="Ex: 'Meu voo é às 20h em Congonhas, cheguei cedo e estou com duas malas grandes...'"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full rounded-2xl border border-slate-700 bg-slate-950/90 py-4 pl-4 pr-32 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 shadow-inner"
          />
          <button
            type="submit"
            className="absolute right-2 top-2 bottom-2 rounded-xl bg-sky-500 px-5 text-xs font-bold text-slate-950 hover:bg-sky-400 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span>Analisar</span>
            <Search className="h-3.5 w-3.5" />
          </button>
        </form>

        {/* Quick Clickable Scenario Tags */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 font-semibold mr-1">Cenários rápidos:</span>
          {PRESETS.map((p, idx) => (
            <button
              key={idx}
              onClick={() => analyzeScenario(p.query)}
              className="rounded-lg bg-slate-800/80 border border-slate-700/80 px-3 py-1.5 text-slate-300 hover:text-white hover:border-sky-500/50 transition-colors cursor-pointer"
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Matched Solution Output */}
        {matchedSolution && (
          <div className="mt-4 rounded-2xl border border-sky-500/40 bg-sky-950/30 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4" />
                Solução Identificada · {matchedSolution.city} ({matchedSolution.hubCode})
              </span>
              <span className="text-xs text-sky-300 font-semibold">
                {matchedSolution.recommendedLocker}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {matchedSolution.advice}
            </p>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="flex items-center gap-2 rounded-xl bg-sky-500 px-5 py-2.5 text-xs font-bold text-slate-950 hover:bg-sky-400 transition-all cursor-pointer"
              >
                <span>Reservar esse locker agora</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
