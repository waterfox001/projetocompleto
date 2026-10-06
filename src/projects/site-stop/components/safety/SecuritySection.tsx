import React from 'react';
import { ShieldCheck, Lock, Video, Smartphone, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export const SecuritySection: React.FC = () => {
  const { setIsBookingModalOpen } = useBooking();

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Security Architecture */}
      <div className="rounded-3xl border border-slate-800 bg-[#080D1A] p-8 sm:p-12 space-y-10">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-6 pb-8 border-b border-slate-800">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-3.5 py-1 text-xs font-semibold text-sky-400">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Infraestrutura de Proteção Física & Digital</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
              Sua bagagem. Seu espaço.
            </h2>
            <p className="text-sm text-slate-300">
              Projetado com protocolos rígidos de acesso. Cada compartimento conta com tranca eletromecânica blindada, chave digital criptografada e monitoramento de integridade.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-2xl text-xs text-slate-300 font-mono">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span>Operação oficial homologada</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 space-y-3">
            <div className="h-10 w-10 rounded-xl bg-sky-500/10 border border-sky-400/30 flex items-center justify-center text-sky-400">
              <Lock className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-white font-display">
              Tranca Eletromecânica
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Travamento em aço reforçado acionado unicamente pelo token da sua reserva digital.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 space-y-3">
            <div className="h-10 w-10 rounded-xl bg-sky-500/10 border border-sky-400/30 flex items-center justify-center text-sky-400">
              <Smartphone className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-white font-display">
              Digital Access & QR
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Sem chaves físicas que possam ser copiadas ou perdidas durante seu passeio na cidade.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 space-y-3">
            <div className="h-10 w-10 rounded-xl bg-sky-500/10 border border-sky-400/30 flex items-center justify-center text-sky-400">
              <Video className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-white font-display">
              Circuito de Monitoramento
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Sensores de abertura, fechamento e presença nos totens 24 horas por dia.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 space-y-3">
            <div className="h-10 w-10 rounded-xl bg-sky-500/10 border border-sky-400/30 flex items-center justify-center text-sky-400">
              <Award className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-white font-display">
              Suporte em Aeroportos
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Equipe de atendimento presencial e suporte rápido direto pelo aplicativo.
            </p>
          </div>
        </div>

        {/* STOPCASE PLUS (Programa de Fidelidade, Section 51) */}
        <div className="pt-8 border-t border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-sky-400">
              <Sparkles className="h-3.5 w-3.5" />
              <span>STOPCASE PLUS · FIDELIDADE & BENEFÍCIOS</span>
            </div>
            <h4 className="text-xl font-bold text-white font-display">
              Viaje com frequência e acumule horas de liberdade
            </h4>
            <p className="text-xs text-slate-300 max-w-xl">
              Cada diária ou período contratado gera pontos StopCase que podem ser revertidos em upgrades automáticos de locker, horas de extensão cortesia e descontos em futuras viagens.
            </p>
          </div>

          <div className="lg:col-span-4 flex items-center justify-end">
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="w-full sm:w-auto rounded-xl border border-sky-500/40 bg-sky-500/10 px-5 py-3 text-xs font-bold text-sky-300 hover:bg-sky-500/20 transition-all cursor-pointer text-center"
            >
              Ativar StopCase Plus na Reserva
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
