import React from 'react';
import { usePlatform } from '../../context/PlatformContext';
import {
  DollarSign,
  TrendingUp,
  CreditCard,
  Building2,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  PieChart,
  FileSpreadsheet,
} from 'lucide-react';
import { TorreDeBebelLogo } from '../../projects/torre-os/components/TorreDeBebelLogo';
import { StopcaseLogo } from '../../projects/stop-os/components/common/StopcaseLogo';

export const ConsolidatedFinancialView: React.FC = () => {
  const { setSelectedCompany } = usePlatform();

  const dreRows = [
    { label: 'Receita Bruta de Serviços', torre: 745200, stop: 1097400, total: 1842600, isTotal: true },
    { label: '(-) Impostos & Taxas de Cartão/PIX (8.2%)', torre: -61106, stop: -89986, total: -151092, isNegative: true },
    { label: '(=) Receita Líquida Operacional', torre: 684094, stop: 1007414, total: 1691508, isHighlight: true },
    { label: '(-) Custos Diretos (Manutenção, Higienização, Concessão Aeroporto)', torre: -258000, stop: -320000, total: -578000, isNegative: true },
    { label: '(=) Margem de Contribuição Bruta', torre: 426094, stop: 687414, total: 1113508, isHighlight: true },
    { label: '(-) Despesas com Pessoal & Escalas de Atendimento', torre: -180000, stop: -240000, total: -420000, isNegative: true },
    { label: '(-) Despesas Administrativas & Tecnologia Holding', torre: -55000, stop: -70000, total: -125000, isNegative: true },
    { label: '(=) EBITDA Consolidado (30.8%)', torre: 191094, stop: 377414, total: 568508, isTotal: true, isEbitda: true },
    { label: '(-) Depreciação de Ativos & Amortização', torre: -28000, stop: -42000, total: -70000, isNegative: true },
    { label: '(=) Lucro Líquido Gerencial da Holding (27.0%)', torre: 163094, stop: 335414, total: 498508, isNetProfit: true },
  ];

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            CONTROLADORIA & DRE CORPORATIVO
          </span>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            Demonstrativo de Resultados Consolidado (DRE)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Consolidação financeira oficial da holding para Torre de Bebel e Stop Case com apuração de margens e EBITDA.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedCompany('torre')}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <TorreDeBebelLogo size={14} />
            <span>Financeiro Torre</span>
          </button>
          <button
            onClick={() => setSelectedCompany('stop')}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <StopcaseLogo size={14} className="w-3.5 h-3.5" />
            <span>Financeiro Stop Case</span>
          </button>
        </div>
      </div>

      {/* DRE Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-slate-600" />
            <h3 className="text-sm font-bold text-slate-900">
              DRE Gerencial Consolidado (Mês Corrente · Outubro/2026)
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-medium">Valores em Reais (BRL)</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/60 text-slate-600 uppercase font-bold text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Linha do Demonstrativo</th>
                <th className="py-3 px-4 text-right">Torre de Bebel</th>
                <th className="py-3 px-4 text-right">Stop Case</th>
                <th className="py-3 px-4 text-right">Consolidado Holding</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {dreRows.map((row, idx) => {
                const isHeader = row.isTotal || row.isNetProfit;
                return (
                  <tr
                    key={idx}
                    className={`transition-colors ${
                      row.isNetProfit
                        ? 'bg-emerald-50/70 font-bold text-emerald-950'
                        : row.isEbitda
                        ? 'bg-blue-50/60 font-bold text-blue-950'
                        : row.isHighlight
                        ? 'bg-slate-50 font-semibold text-slate-900'
                        : row.isNegative
                        ? 'text-slate-600'
                        : 'text-slate-800'
                    }`}
                  >
                    <td className={`py-3 px-4 ${isHeader ? 'font-bold' : ''}`}>
                      {row.label}
                    </td>
                    <td
                      className={`py-3 px-4 text-right tabular-nums ${
                        row.torre < 0 ? 'text-rose-600' : ''
                      }`}
                    >
                      R$ {row.torre.toLocaleString('pt-BR')}
                    </td>
                    <td
                      className={`py-3 px-4 text-right tabular-nums ${
                        row.stop < 0 ? 'text-rose-600' : ''
                      }`}
                    >
                      R$ {row.stop.toLocaleString('pt-BR')}
                    </td>
                    <td
                      className={`py-3 px-4 text-right tabular-nums font-bold ${
                        row.total < 0 ? 'text-rose-600' : 'text-slate-900'
                      }`}
                    >
                      R$ {row.total.toLocaleString('pt-BR')}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
