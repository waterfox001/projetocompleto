import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  TrendingUp,
  TrendingDown,
  ArrowRight,
  ShieldAlert,
  Clock,
  Plus
} from 'lucide-react';

interface DashboardProps {
  onNavigate: (path: string) => void;
}

export const DashboardModule: React.FC<DashboardProps> = ({ onNavigate }) => {
  const {
    units,
    selectedUnitId,
    reservations,
    volumes,
    occurrences,
    objectives,
    setSelectedVolumeId,
    setActiveKrForRealization,
    setIsQuickCreateOpen,
    setQuickCreateType
  } = useApp();

  const filteredUnits = selectedUnitId === 'all' ? units : units.filter((u) => u.id === selectedUnitId);

  const totalMonthlyRevenue = filteredUnits.reduce((acc, u) => acc + u.monthlyRevenue, 0);
  const totalCapacity = filteredUnits.reduce((acc, u) => acc + u.capacityTotal, 0);
  const totalOccupied = filteredUnits.reduce((acc, u) => acc + u.capacityOccupied, 0);
  const occupancyRate = totalCapacity > 0 ? Math.round((totalOccupied / totalCapacity) * 100) : 0;
  const avgTicket = filteredUnits.length > 0
    ? filteredUnits.reduce((acc, u) => acc + u.ticketAverage, 0) / filteredUnits.length
    : 84.50;

  const storedVolumesCount = volumes.filter((v) => (selectedUnitId === 'all' || v.unitId === selectedUnitId) && v.status === 'stored').length;
  const openOccurrencesCount = occurrences.filter((o) => (selectedUnitId === 'all' || o.unitId === selectedUnitId) && (o.status === 'Aberta' || o.status === 'Em Resolução')).length;

  const healthItems = [
    {
      area: 'Financeiro',
      status: 'Saudável',
      statusClass: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      reason: 'Receita consolidada +12,8% vs. mês anterior. Margem EBITDA de 38,4%.'
    },
    {
      area: 'Operação',
      status: occupancyRate >= 85 ? 'Atenção' : 'Saudável',
      statusClass: occupancyRate >= 85 ? 'text-amber-800 bg-amber-50 border-amber-200' : 'text-emerald-700 bg-emerald-50 border-emerald-200',
      reason: occupancyRate >= 85 ? 'Congonhas operando com 91,5% de ocupação. Armários pulmão ativados.' : 'Tempo médio de check-in abaixo de 95s em todas as bases.'
    },
    {
      area: 'Comercial',
      status: 'Em Crescimento',
      statusClass: 'text-blue-700 bg-blue-50 border-blue-200',
      reason: 'Conversão de leads corporativos +7,3%. Parceria Ibis em assinatura.'
    },
    {
      area: 'Passageiros',
      status: 'Excelente',
      statusClass: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      reason: 'NPS de 9,6/10 com 0 extravios reportados nos últimos 90 dias.'
    },
    {
      area: 'Equipe',
      status: 'Regular',
      statusClass: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      reason: 'Escalas preenchidas nas 5 bases neste turno.'
    },
    {
      area: 'OKRs Q4',
      status: 'Em Acompanhamento',
      statusClass: 'text-amber-800 bg-amber-50 border-amber-200',
      reason: 'KR-005 (Parcerias Linhas Aéreas) requer agilidade no jurídico.'
    }
  ];

  return (
    <div className="space-y-4 pb-10">
      {/* Page Header Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 border border-slate-200 rounded">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-slate-900 tracking-tight">
              {selectedUnitId === 'all' ? 'Consolidado Geral de Bases' : `Operação Aeroporto ${filteredUnits[0]?.name}`}
            </h2>
            <span className="text-[11px] text-slate-400">·</span>
            <span className="text-xs text-slate-500 font-mono">
              {filteredUnits.length} {filteredUnits.length === 1 ? 'base' : 'bases'} ativas · Outubro 2026
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('/operation')}
            className="px-2.5 py-1.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium rounded border border-slate-200 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>Operação Hoje</span>
          </button>
          <button
            onClick={() => {
              setQuickCreateType('reservation');
              setIsQuickCreateOpen(true);
            }}
            className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-medium rounded transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Nova Reserva</span>
          </button>
        </div>
      </div>

      {/* Unified Enterprise KPI Metric Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {/* KPI 1 */}
        <div className="bg-white p-3 border border-slate-200 rounded">
          <div className="text-[11px] text-slate-500 font-medium">Receita Estimada</div>
          <div className="text-lg font-bold font-mono text-slate-900 tabular-nums mt-0.5">
            R$ {totalMonthlyRevenue.toLocaleString('pt-BR')}
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-medium mt-0.5">
            <TrendingUp className="w-3 h-3" />
            <span>+12,8% MoM</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-white p-3 border border-slate-200 rounded">
          <div className="text-[11px] text-slate-500 font-medium">Receita Liquidada</div>
          <div className="text-lg font-bold font-mono text-slate-900 tabular-nums mt-0.5">
            R$ {(totalMonthlyRevenue * 0.92).toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
          </div>
          <div className="text-[10px] text-slate-500 font-mono mt-0.5">
            92% à vista
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-white p-3 border border-slate-200 rounded">
          <div className="text-[11px] text-slate-500 font-medium">Despesas & Concessão</div>
          <div className="text-lg font-bold font-mono text-slate-900 tabular-nums mt-0.5">
            R$ {(totalMonthlyRevenue * 0.44).toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
          </div>
          <div className="text-[10px] text-slate-500 font-mono mt-0.5">
            Margem Líq: 38,4%
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-white p-3 border border-slate-200 rounded">
          <div className="text-[11px] text-slate-500 font-medium">Taxa de Ocupação</div>
          <div className={`text-lg font-bold font-mono tabular-nums mt-0.5 ${occupancyRate >= 85 ? 'text-amber-800' : 'text-slate-900'}`}>
            {occupancyRate}%
          </div>
          <div className="text-[10px] text-slate-500 font-mono mt-0.5">
            {totalOccupied} / {totalCapacity} vagas
          </div>
        </div>

        {/* KPI 5 */}
        <div className="bg-white p-3 border border-slate-200 rounded">
          <div className="text-[11px] text-slate-500 font-medium">Ticket Médio</div>
          <div className="text-lg font-bold font-mono text-slate-900 tabular-nums mt-0.5">
            R$ {avgTicket.toFixed(2)}
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-medium mt-0.5">
            <TrendingUp className="w-3 h-3" />
            <span>+6,4% target</span>
          </div>
        </div>

        {/* KPI 6 */}
        <div className="bg-white p-3 border border-slate-200 rounded">
          <div className="text-[11px] text-slate-500 font-medium">Ocorrências Abertas</div>
          <div className={`text-lg font-bold font-mono tabular-nums mt-0.5 ${openOccurrencesCount > 0 ? 'text-rose-700' : 'text-slate-900'}`}>
            {openOccurrencesCount}
          </div>
          <div className="text-[10px] text-slate-500 font-mono mt-0.5">
            0 críticas não tratadas
          </div>
        </div>
      </div>

      {/* Actionable Alerts Bar */}
      <div className="bg-white border border-slate-200 rounded overflow-hidden">
        <div className="px-3.5 py-2 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-700" />
            <span className="font-semibold text-slate-900">Itens que Exigem Ação Imediata</span>
          </div>
          <span className="text-[11px] text-slate-500 font-mono">4 pendências prioritárias</span>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          <div
            onClick={() => onNavigate('/operation')}
            className="p-3 hover:bg-slate-50 cursor-pointer flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-2.5">
              <span className="text-[11px] font-mono font-semibold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                Operação
              </span>
              <span className="font-medium text-slate-900">Congonhas (CGH) atingiu 91,5% de ocupação.</span>
              <span className="text-slate-500 hidden md:inline">Restam apenas 22 posições livres no piso térreo. Pulmão ativado.</span>
            </div>
            <span className="text-slate-400 text-xs flex items-center gap-1 font-medium hover:text-amber-700">
              Ver base <ArrowRight className="w-3 h-3" />
            </span>
          </div>

          <div
            onClick={() => onNavigate('/finance')}
            className="p-3 hover:bg-slate-50 cursor-pointer flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-2.5">
              <span className="text-[11px] font-mono font-semibold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">
                Financeiro
              </span>
              <span className="font-medium text-slate-900">Fatura vencida em 04/10: Operadora Global Trânsito.</span>
              <span className="text-slate-500 hidden md:inline">R$ 42.000,00 pendente de conciliação bancária.</span>
            </div>
            <span className="text-slate-400 text-xs flex items-center gap-1 font-medium hover:text-amber-700">
              Conciliar <ArrowRight className="w-3 h-3" />
            </span>
          </div>

          <div
            onClick={() => onNavigate('/commercial')}
            className="p-3 hover:bg-slate-50 cursor-pointer flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-2.5">
              <span className="text-[11px] font-mono font-semibold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                Comercial
              </span>
              <span className="font-medium text-slate-900">Follow-up pendente: CVC Turismo.</span>
              <span className="text-slate-500 hidden md:inline">Aguardando proposta formal de receptivo desde 29/09.</span>
            </div>
            <span className="text-slate-400 text-xs flex items-center gap-1 font-medium hover:text-amber-700">
              Abrir CRM <ArrowRight className="w-3 h-3" />
            </span>
          </div>

          <div
            onClick={() => onNavigate('/strategy')}
            className="p-3 hover:bg-slate-50 cursor-pointer flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-2.5">
              <span className="text-[11px] font-mono font-semibold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                OKRs
              </span>
              <span className="font-medium text-slate-900">Meta em risco: KR-005 (Parcerias com Companhias Aéreas).</span>
              <span className="text-slate-500 hidden md:inline">Atingiu 45% do alvo trimestral.</span>
            </div>
            <span className="text-slate-400 text-xs flex items-center gap-1 font-medium hover:text-amber-700">
              Ver Metas <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>

      {/* Main Two Column Operational & Strategic Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Column: Recent Operations Data Table (2 cols) */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded">
          <div className="p-3 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-slate-900">Movimentações Operacionais Recentes</h3>
              <p className="text-[11px] text-slate-500">Últimas entradas e saídas registradas nos aeroportos</p>
            </div>
            <button
              onClick={() => onNavigate('/operation')}
              className="text-xs text-amber-700 hover:text-amber-800 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>Ver Central</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] text-slate-600 font-semibold">
                  <th className="py-2 px-3">Código</th>
                  <th className="py-2 px-3">Passageiro</th>
                  <th className="py-2 px-3">Base</th>
                  <th className="py-2 px-3">Posição</th>
                  <th className="py-2 px-3">Horário</th>
                  <th className="py-2 px-3 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {volumes.slice(0, 6).map((vol) => (
                  <tr key={vol.id} className="hover:bg-slate-50/70">
                    <td className="py-2 px-3 font-mono font-medium text-slate-900">
                      {vol.id}
                    </td>
                    <td className="py-2 px-3 text-slate-800">
                      {vol.customerName}
                    </td>
                    <td className="py-2 px-3 font-mono text-slate-500 text-[11px]">
                      {vol.unitId}
                    </td>
                    <td className="py-2 px-3">
                      <span className="font-mono text-xs px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-medium border border-slate-200">
                        {vol.locationPosition}
                      </span>
                    </td>
                    <td className="py-2 px-3 font-mono text-slate-500 text-[11px]">
                      {vol.checkInTime.split('T')[1]?.slice(0, 5)}
                    </td>
                    <td className="py-2 px-3 text-right">
                      <button
                        onClick={() => setSelectedVolumeId(vol.id)}
                        className="text-xs text-amber-700 hover:underline font-medium cursor-pointer"
                      >
                        Visualizar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Strategic OKRs Q4 Progress (1 col) */}
        <div className="bg-white border border-slate-200 rounded flex flex-col">
          <div className="p-3 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-slate-900">Acompanhamento de Metas (Q4)</h3>
              <p className="text-[11px] text-slate-500">Key Results em acompanhamento executivo</p>
            </div>
            <button
              onClick={() => onNavigate('/strategy')}
              className="text-xs text-amber-700 hover:text-amber-800 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>Metas</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="p-3 space-y-3 flex-1">
            {objectives[0]?.keyResults.map((kr) => (
              <div key={kr.id} className="p-2.5 bg-slate-50/70 border border-slate-200 rounded space-y-1.5 text-xs">
                <div className="flex items-start justify-between gap-2">
                  <span className="font-medium text-slate-900">{kr.title}</span>
                  <span className="font-mono font-bold text-slate-800 shrink-0">
                    {kr.progress}%
                  </span>
                </div>

                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-600 h-full rounded-full"
                    style={{ width: `${kr.progress}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span className="font-mono">
                    {kr.metricType === 'currency' ? `R$ ${kr.currentValue.toLocaleString('pt-BR')}` : kr.currentValue} / {kr.metricType === 'currency' ? `R$ ${kr.targetValue.toLocaleString('pt-BR')}` : kr.targetValue}
                  </span>
                  <button
                    onClick={() => setActiveKrForRealization(kr.id)}
                    className="text-amber-700 hover:underline font-medium cursor-pointer"
                  >
                    + Lançar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enterprise Corporate Health Table */}
      <div className="bg-white border border-slate-200 rounded">
        <div className="p-3 border-b border-slate-200 flex items-center justify-between text-xs">
          <div>
            <h3 className="font-bold text-slate-900">Diagnóstico Integrado por Área</h3>
            <p className="text-[11px] text-slate-500">Status consolidado dos pilares corporativos</p>
          </div>
          <span className="text-slate-400 text-[11px] font-mono">Consistência operacional 99.4%</span>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {healthItems.map((h) => (
            <div key={h.area} className="p-2.5 px-3.5 flex items-center justify-between gap-4">
              <div className="w-28 font-medium text-slate-900 shrink-0">
                {h.area}
              </div>
              <div className="w-36 shrink-0">
                <span className={`text-[11px] font-medium px-2 py-0.5 rounded border ${h.statusClass}`}>
                  {h.status}
                </span>
              </div>
              <div className="flex-1 text-slate-600 text-[11px]">
                {h.reason}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
