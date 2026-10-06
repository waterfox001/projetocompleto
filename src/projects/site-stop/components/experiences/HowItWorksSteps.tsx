import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { Sparkles, ArrowRight, Smartphone, ShieldCheck, KeyRound, Coffee, CheckCircle2 } from 'lucide-react';

interface Step {
  number: string;
  title: string;
  description: string;
  icon: string;
  highlightText: string;
}

const STEPS: Step[] = [
  {
    number: '01',
    title: 'Escolha seu locker online',
    description: 'Selecione a cidade, tamanho e período pelo celular em menos de 1 minuto.',
    icon: '📱',
    highlightText: 'Sem filas no aeroporto',
  },
  {
    number: '02',
    title: 'Guarde sua bagagem',
    description: 'Chegue ao ponto StopCase no aeroporto e aproxime seu QR Code ou digite seu PIN.',
    icon: '🧳',
    highlightText: 'Totens de acesso rápido',
  },
  {
    number: '03',
    title: 'Tranque com chave digital',
    description: 'A porta é trancada eletronicamente e fica monitorada até o seu retorno.',
    icon: '🔒',
    highlightText: 'Criptografia individual',
  },
  {
    number: '04',
    title: 'Aproveite seu tempo',
    description: 'Coma, passeie na orla, faça compras ou participe de reuniões sem peso.',
    icon: '✨',
    highlightText: '100% mãos livres',
  },
  {
    number: '05',
    title: 'Retire quando quiser',
    description: 'Volte ao terminal no horário combinado e retire com o mesmo código no celular.',
    icon: '✈️',
    highlightText: 'Direto para o embarque',
  },
];

export const HowItWorksSteps: React.FC = () => {
  const { setIsBookingModalOpen } = useBooking();
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  return (
    <section id="como-funciona" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
        <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
          Simplicidade Digital
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
          Como funciona em 10 segundos
        </h2>
        <p className="text-sm text-slate-300">
          Chegue. Guarde. Vá. Sem burocracia, sem chaves físicas para perder e sem formulários em papel.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
        {STEPS.map((step, idx) => {
          const isSelected = activeStepIndex === idx;
          return (
            <div
              key={step.number}
              onClick={() => setActiveStepIndex(idx)}
              className={`rounded-2xl p-6 border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-sky-500 bg-gradient-to-b from-sky-950/40 to-slate-900 shadow-xl shadow-sky-500/10 scale-[1.02]'
                  : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900/90'
              }`}
            >
              <div>
                <div className="flex items-center justify-between pb-4">
                  <span className="text-3xl font-black font-display text-slate-500 font-mono">
                    {step.number}
                  </span>
                  <span className="text-2xl">{step.icon}</span>
                </div>

                <h3 className="text-base font-bold text-white mb-2 font-display">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="pt-6 border-t border-slate-800/80 mt-4">
                <span className="text-[11px] font-semibold text-sky-400 flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  {step.highlightText}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <button
          onClick={() => setIsBookingModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-7 py-3.5 text-sm font-bold text-slate-950 shadow-md shadow-sky-500/20 hover:bg-sky-400 transition-all cursor-pointer"
        >
          <span>Reservar meu locker em 1 minuto</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
};
