import React from 'react';
import { ShieldCheck, Sparkles, CheckCircle2, RotateCcw, Search, Droplets, CheckSquare, PackageCheck, Send } from 'lucide-react';

export const SanitizationTimeline: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Devolução & Triagem',
      desc: 'Ao ser recolhido no aeroporto ou hotel, o item passa por triagem imediata em caixas térmicas isoladas.',
      icon: RotateCcw,
    },
    {
      step: '02',
      title: 'Inspeção Estrutural',
      desc: 'Checagem rigorosa de freios, travas de cinto, rodízios e amortecedores com manual do fabricante.',
      icon: Search,
    },
    {
      step: '03',
      title: 'Higienização a Vapor 140°C',
      desc: 'Lavagem com vapor hospitalar de alta temperatura e desinfetante pediátrico atóxico biodegradável.',
      icon: Droplets,
    },
    {
      step: '04',
      title: 'Conferência de Travas',
      desc: 'Teste prático de peso e estabilidade para garantir 100% de firmeza antes de liberar o lote.',
      icon: CheckSquare,
    },
    {
      step: '05',
      title: 'Embalagem Selada',
      desc: 'O produto é envolvido em capa protetora impermeável e lacrado com etiqueta de esterilização.',
      icon: PackageCheck,
    },
    {
      step: '06',
      title: 'Entrega VIP no Destino',
      desc: 'Entregue com lençol 100% algodão esterilizado, pronto para o bebê usar logo ao sair do avião.',
      icon: Send,
    },
  ];

  return (
    <section id="hygiene" className="py-16 md:py-24 bg-white border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>Padrão de Higiene Hospitalar</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">
            Cuidado em cada detalhe.
          </h2>
          <p className="text-stone-600 text-sm max-w-xl mx-auto">
            A pele e o sistema respiratório do bebê exigem pureza. Conheça nosso ciclo completo entre uma família e outra.
          </p>
        </div>

        {/* 6 Steps Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className="bg-stone-50 rounded-3xl p-6 border border-stone-200 hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-800 font-bold flex items-center justify-center border border-emerald-200/80">
                    <Icon className="w-5 h-5 text-emerald-700" />
                  </div>
                  <span className="text-xs font-bold text-stone-400 font-mono">ETAPA {s.step}</span>
                </div>

                <div>
                  <h3 className="font-serif text-lg font-bold text-stone-900">
                    {s.title}
                  </h3>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                <div className="pt-2 flex items-center gap-1.5 text-[11px] text-emerald-700 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Protocolo certificado</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
