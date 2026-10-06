import React from 'react';
import { usePlatform } from '../../context/PlatformContext';
import {
  BarChart3,
  Download,
  FileSpreadsheet,
  TrendingUp,
  Printer,
  Calendar,
  Layers,
} from 'lucide-react';
import { TorreDeBebelLogo } from '../../projects/torre-os/components/TorreDeBebelLogo';
import { StopcaseLogo } from '../../projects/stop-os/components/common/StopcaseLogo';

export const ConsolidatedReportsView: React.FC = () => {
  const { setSelectedCompany } = usePlatform();

  const reportsList = [
    {
      title: 'Relatório Executivo Consolidado de Faturamento Mensal',
      desc: 'DRE, margens e evolução por praça e por empresa nos últimos 12 meses.',
      format: 'PDF & XLSX',
      date: '06/10/2026',
    },
    {
      title: 'Auditoria de Concessões e Repasses Aeroportuários',
      desc: 'Cálculo de aluguel fixo e variável pago à Aena, Fraport e CCR.',
      format: 'PDF',
      date: '01/10/2026',
    },
    {
      title: 'Taxa de Ocupação dos Lockers vs Giro de Itens Infantis',
      desc: 'Índices de produtividade e capacidade instalada nos 5 aeroportos.',
      format: 'XLSX',
      date: '04/10/2026',
    },
    {
      title: 'Relatório de Tráfego e Conversão dos 10 Portais Web',
      desc: 'Métricas completas de visitantes, leads, reservas e taxa de conversão.',
      format: 'PDF & CSV',
      date: '05/10/2026',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
            BUSINESS INTELLIGENCE & AUDITORIA
          </span>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            Central de Relatórios & Inteligência Corporativa
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Emissão de relatórios integrados para conselho executivo, investidores e auditoria contábil.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedCompany('torre')}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <TorreDeBebelLogo size={14} />
            <span>BI Torre de Bebel</span>
          </button>
          <button
            onClick={() => setSelectedCompany('stop')}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <StopcaseLogo size={14} className="w-3.5 h-3.5" />
            <span>BI Stop Case</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reportsList.map((rep, idx) => (
          <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>Gerado em {rep.date}</span>
                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold text-[10px]">
                  {rep.format}
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 leading-snug">{rep.title}</h3>
              <p className="text-xs text-slate-500 mt-1">{rep.desc}</p>
            </div>

            <button
              onClick={() => alert(`Download iniciado: ${rep.title}`)}
              className="w-full py-2 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exportar Relatório</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
