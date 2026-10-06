import React from 'react';
import { usePlatform } from '../../context/PlatformContext';
import {
  TrendingUp,
  Users,
  Target,
  DollarSign,
  ArrowRight,
  Filter,
  CheckCircle2,
  PieChart,
  PhoneCall,
  Briefcase,
  Share2,
} from 'lucide-react';
import { TorreDeBebelLogo } from '../../projects/torre-os/components/TorreDeBebelLogo';
import { StopcaseLogo } from '../../projects/stop-os/components/common/StopcaseLogo';

export const ConsolidatedCommercialView: React.FC = () => {
  const { setSelectedCompany, setActiveModule } = usePlatform();

  const funnelSteps = [
    { label: 'Leads Captados', count: 842, rate: '100%', color: 'bg-blue-500' },
    { label: 'Contato & Qualificação', count: 712, rate: '84.5%', color: 'bg-indigo-500' },
    { label: 'Orçamentos / Cotações', count: 624, rate: '74.1%', color: 'bg-purple-500' },
    { label: 'Negociação & Seleção', count: 540, rate: '64.1%', color: 'bg-amber-500' },
    { label: 'Conversão & Fechamento', count: 489, rate: '58.0%', color: 'bg-emerald-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
            COMERCIAL & CRM DA HOLDING
          </span>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            Funil de Vendas Corporativo e Parcerias B2B
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Captação de leads unificada em canais digitais, convênios com cias aéreas, redes hoteleiras e agências de viagem.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedCompany('torre')}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <TorreDeBebelLogo size={14} />
            <span>Pipeline Comercial Torre</span>
          </button>
          <button
            onClick={() => setSelectedCompany('stop')}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <StopcaseLogo size={14} className="w-3.5 h-3.5" />
            <span>Módulo Comercial Stop Case</span>
          </button>
        </div>
      </div>

      {/* Funil Visual */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900">
          Funil de Conversão Integrado (Mês Atual)
        </h3>

        <div className="space-y-3">
          {funnelSteps.map((step, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700">{step.label}</span>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-slate-900">{step.count} leads</span>
                  <span className="text-slate-400">Taxa: {step.rate}</span>
                </div>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${step.color}`}
                  style={{ width: step.rate }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Canais de Atração & Parcerias */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Share2 className="w-4 h-4 text-blue-600" />
            Canais de Atração Digital
          </h3>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50">
              <span className="font-semibold text-slate-700">Google Ads & Busca Orgânica</span>
              <span className="font-bold text-slate-900">410 leads (48.7%)</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50">
              <span className="font-semibold text-slate-700">Instagram & Redes Sociais</span>
              <span className="font-bold text-slate-900">185 leads (22.0%)</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50">
              <span className="font-semibold text-slate-700">Balcão Físico Aeroporto</span>
              <span className="font-bold text-slate-900">142 leads (16.9%)</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50">
              <span className="font-semibold text-slate-700">Indicações e Parcerias B2B</span>
              <span className="font-bold text-slate-900">105 leads (12.4%)</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-emerald-600" />
            Parcerias B2B Estratégicas
          </h3>
          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-lg bg-slate-50 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 block">Redes Hoteleiras e Resorts</span>
                <span className="text-[11px] text-slate-500">
                  Desconto cruzado para locação de berços e guarda de bagagens
                </span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                Ativo
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 block">Companhias Aéreas (LATAM / Gol / Azul)</span>
                <span className="text-[11px] text-slate-500">
                  Integração para contingência de bagagens e famílias com bebês
                </span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                Ativo
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 block">Concessionárias dos Aeroportos</span>
                <span className="text-[11px] text-slate-500">
                  Aena Brasil, Fraport e CCR Aeroportos
                </span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">
                Contrato 5 Anos
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
