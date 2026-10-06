import React from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { Target, TrendingUp, Award, CheckCircle2, ShieldCheck } from 'lucide-react';
import { TorreDeBebelLogo } from '../../projects/torre-os/components/TorreDeBebelLogo';
import { StopcaseLogo } from '../../projects/stop-os/components/common/StopcaseLogo';

export const ConsolidatedGoalsView: React.FC = () => {
  const { setSelectedCompany } = usePlatform();

  const okrs = [
    {
      title: 'OKR 1: Atingir R$ 24 Milhões de Faturamento Anual Holding',
      progress: 90,
      current: 'R$ 21,6M',
      target: 'R$ 24,0M',
      owner: 'Conselho Executivo',
      company: 'Holding',
    },
    {
      title: 'OKR 2: Expansão da Concessão de Lockers em Aeroportos (Stop Case)',
      progress: 85,
      current: '720 Lockers',
      target: '850 Lockers',
      owner: 'Diretoria de Operações',
      company: 'Stop Case',
    },
    {
      title: 'OKR 3: Frota e Acervo de Carrinhos Ultracompactos (Torre de Bebel)',
      progress: 94,
      current: '1.420 Itens',
      target: '1.500 Itens',
      owner: 'Logística & Patrimônio',
      company: 'Torre de Bebel',
    },
    {
      title: 'OKR 4: Satisfação do Cliente (NPS Consolidado >= 85)',
      progress: 98,
      current: 'NPS 88',
      target: 'NPS 85',
      owner: 'Qualidade & CS',
      company: 'Holding',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
            METAS CORPORATIVAS & OKRS 2026
          </span>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            Planejamento Estratégico e Metas da Holding
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Acompanhamento dos objetivos e resultados-chave corporativos compartilhados entre as marcas.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedCompany('torre')}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <TorreDeBebelLogo size={14} />
            <span>OKRs Torre de Bebel</span>
          </button>
          <button
            onClick={() => setSelectedCompany('stop')}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <StopcaseLogo size={14} className="w-3.5 h-3.5" />
            <span>Estratégia Stop Case</span>
          </button>
        </div>
      </div>

      {/* OKR Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {okrs.map((okr, idx) => (
          <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-sm font-bold text-slate-900 leading-snug">{okr.title}</h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 shrink-0">
                {okr.company}
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Progresso Atual:</span>
                <span className="font-bold text-slate-900">
                  {okr.current} / {okr.target} ({okr.progress}%)
                </span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full transition-all"
                  style={{ width: `${okr.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span>Responsável: <strong>{okr.owner}</strong></span>
              <span className="text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> No Prazo
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
