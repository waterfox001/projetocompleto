import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  TrendingUp,
  Award,
  AlertCircle,
  Download,
  Printer,
  Sparkles,
  ArrowRight,
  DollarSign,
  Package,
  CalendarCheck,
  Users,
  Truck,
  Percent,
  Search,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface ReportsRankingsViewProps {
  subTab?: string;
}

export const ReportsRankingsView: React.FC<ReportsRankingsViewProps> = ({ subTab }) => {
  const { products, customers, setSelectedProductId } = useApp();
  const [selectedReportType, setSelectedReportType] = useState<string>('geral');
  const [periodFilter, setPeriodFilter] = useState<'mes_atual' | 'trimestre' | 'ano'>('mes_atual');

  useEffect(() => {
    if (!subTab) return;
    if (subTab === 'bi_financial') setSelectedReportType('financeiro');
    else if (subTab === 'bi_commercial') setSelectedReportType('comercial');
    else if (subTab === 'bi_inventory') setSelectedReportType('estoque');
    else if (subTab === 'bi_operational') setSelectedReportType('operacional');
    else if (subTab === 'bi_customers') setSelectedReportType('clientes');
    else if (subTab === 'bi_logistics') setSelectedReportType('logistica');
    else if (subTab === 'rankings_kpis') setSelectedReportType('rankings');
    else setSelectedReportType('geral');
  }, [subTab]);

  // Top rented products
  const topRented = [...products].sort((a, b) => b.rentalCount - a.rentalCount).slice(0, 6);

  // Top revenue products
  const topRevenue = [...products].sort((a, b) => b.totalRevenue - a.totalRevenue).slice(0, 6);

  // Idle products (> 30 days)
  const idleProducts = products.filter(p => p.daysInactive >= 30);

  // Top recurring customers
  const topCustomers = [...customers].sort((a, b) => b.totalSpent - a.totalSpent).slice(0, 6);

  const handleExportCSV = () => {
    let csvHeader = '';
    let csvRows = '';

    if (selectedReportType === 'estoque' || selectedReportType === 'geral' || selectedReportType === 'rankings') {
      csvHeader = 'Ranking,Codigo,Nome,Categoria,Locacoes,ReceitaTotal,DiasParado,Status\n';
      csvRows = products
        .map((p, i) => `${i + 1},${p.code},"${p.name}",${p.category},${p.rentalCount},${p.totalRevenue},${p.daysInactive},${p.status}`)
        .join('\n');
    } else if (selectedReportType === 'clientes') {
      csvHeader = 'Ranking,Nome,Telefone,Email,TotalLocacoes,GastoTotal\n';
      csvRows = customers
        .map((c, i) => `${i + 1},"${c.name}","${c.phone}","${c.email}",${c.rentalCount},${c.totalSpent}`)
        .join('\n');
    } else {
      csvHeader = 'Indicador,Valor,Meta,Status\n';
      csvRows =
        'Faturamento Mensal,R$ 38.940,R$ 45.000,86.5%\n' +
        'Margem EBITDA,86.9%,80.0%,Superada\n' +
        'Taxa de Ocupacao,78.4%,82.0%,Em Meta\n' +
        'SLA Pontualidade,96.4%,95.0%,Superada\n';
    }

    const blob = new Blob([csvHeader + csvRows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `relatorio_torredebebel_${selectedReportType}_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Business Intelligence & Relatórios Gerenciais</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Análise aprofundada de performance patrimonial, giro de estoque, rentabilidade financeira e clientes VIP
          </p>
        </div>

        <div className="flex items-center space-x-2 self-start sm:self-auto">
          <button
            onClick={() => window.print()}
            className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg shadow-xs transition-colors"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span>Imprimir</span>
          </button>
          <button
            onClick={handleExportCSV}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Exportar CSV</span>
          </button>
        </div>
      </div>

      {/* Report Categories Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-semibold">
        {[
          { id: 'geral', label: 'Visão 360°' },
          { id: 'financeiro', label: 'BI Financeiro' },
          { id: 'comercial', label: 'BI Comercial' },
          { id: 'estoque', label: 'BI Estoque & Ativos' },
          { id: 'operacional', label: 'BI Operação & Prazos' },
          { id: 'clientes', label: 'BI Clientes & Retenção' },
          { id: 'logistica', label: 'BI Logística & Rotas' },
          { id: 'rankings', label: 'Rankings & KPIs' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setSelectedReportType(tab.id)}
            className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
              selectedReportType === tab.id
                ? 'bg-white text-blue-700 font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ======================================================== */}
      {/* 1. VISÃO GERAL & RANKINGS                                */}
      {/* ======================================================== */}
      {(selectedReportType === 'geral' || selectedReportType === 'rankings') && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Mais Alugados */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center space-x-2 text-blue-700">
                <Award className="w-4 h-4" />
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900">
                  Produtos Mais Alugados (Giro)
                </h3>
              </div>

              <div className="space-y-2.5">
                {topRented.map((p, idx) => (
                  <div
                    key={p.id}
                    onClick={() => setSelectedProductId(p.id)}
                    className="p-2.5 rounded-lg border border-slate-100 bg-slate-50/70 hover:bg-blue-50/50 hover:border-blue-200 cursor-pointer flex items-center justify-between text-xs transition-colors"
                  >
                    <div className="flex items-center space-x-2.5 min-w-0">
                      <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <div className="min-w-0">
                        <div className="font-bold text-slate-900 leading-tight truncate max-w-[170px]">{p.name}</div>
                        <div className="text-[10px] font-mono text-slate-400">{p.code} • {p.category}</div>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <strong className="text-xs text-blue-700 font-bold">{p.rentalCount}x</strong>
                      <div className="text-[10px] text-slate-400">locações</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Maior Receita Acumulada */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center space-x-2 text-emerald-700">
                <TrendingUp className="w-4 h-4" />
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900">
                  Maior Receita Acumulada
                </h3>
              </div>

              <div className="space-y-2.5">
                {topRevenue.map((p, idx) => (
                  <div
                    key={p.id}
                    onClick={() => setSelectedProductId(p.id)}
                    className="p-2.5 rounded-lg border border-slate-100 bg-slate-50/70 hover:bg-emerald-50/50 hover:border-emerald-200 cursor-pointer flex items-center justify-between text-xs transition-colors"
                  >
                    <div className="flex items-center space-x-2.5 min-w-0">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <div className="min-w-0">
                        <div className="font-bold text-slate-900 leading-tight truncate max-w-[170px]">{p.name}</div>
                        <div className="text-[10px] font-mono text-slate-400">{p.code} • {p.category}</div>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <strong className="text-xs text-emerald-700 font-bold font-mono tabular-nums">
                        R$ {p.totalRevenue.toLocaleString('pt-BR')}
                      </strong>
                      <div className="text-[10px] text-slate-400">faturado</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Clientes Mais Recorrentes */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center space-x-2 text-amber-600">
                <Award className="w-4 h-4" />
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900">
                  Clientes VIP / Recorrentes
                </h3>
              </div>

              <div className="space-y-2.5">
                {topCustomers.map((c, idx) => (
                  <div
                    key={c.id}
                    className="p-2.5 rounded-lg border border-slate-100 bg-slate-50/70 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center space-x-2.5 min-w-0">
                      <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <div className="min-w-0">
                        <div className="font-bold text-slate-900 leading-tight truncate max-w-[160px]">{c.name}</div>
                        <div className="text-[10px] text-slate-400">{c.rentalCount} locações concluídas</div>
                      </div>
                    </div>
                    <div className="text-right font-bold text-slate-900 font-mono tabular-nums shrink-0">
                      R$ {c.totalSpent.toLocaleString('pt-BR')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Produtos Parados Table */}
          <div className="bg-white rounded-xl border border-rose-200/80 p-5 shadow-xs space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 bg-rose-50 text-rose-700 border border-rose-200 rounded-lg">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900">
                    Produtos com Baixa Utilização & Estoque Parado (&gt; 30 dias)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Oportunidades de desmobilização, combos promocionais e reativação comercial
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200 font-mono">
                {idleProducts.length} itens parados
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200 text-[11px] uppercase tracking-wider">
                  <tr>
                    <th className="py-2.5 px-3">Produto</th>
                    <th className="py-2.5 px-3">Dias Parado</th>
                    <th className="py-2.5 px-3">Valor Aquisição</th>
                    <th className="py-2.5 px-3">Receita Total</th>
                    <th className="py-2.5 px-3">Ação Recomendada</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {idleProducts.map(p => (
                    <tr key={p.id} className="hover:bg-slate-50/60">
                      <td className="py-3 px-3">
                        <div className="font-bold text-slate-900 flex items-center space-x-1.5">
                          <span className="font-mono bg-slate-100 text-slate-700 border border-slate-200 text-[10px] px-1.5 py-0.5 rounded">
                            {p.code}
                          </span>
                          <span>{p.name}</span>
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{p.brand} • {p.category}</div>
                      </td>

                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200 font-mono">
                          {p.daysInactive} dias sem locar
                        </span>
                      </td>

                      <td className="py-3 px-3 font-mono font-semibold text-slate-700">R$ {p.purchaseValue}</td>
                      <td className="py-3 px-3 font-mono font-semibold text-slate-700">R$ {p.totalRevenue}</td>

                      <td className="py-3 px-3">
                        <div className="text-[11px] text-amber-900 bg-amber-50 p-2 rounded-lg border border-amber-200 flex items-center space-x-2">
                          <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span>
                            {p.daysInactive > 90
                              ? 'Liquidar ativo ou oferecer como brinde em locações acima de 30 dias.'
                              : 'Aplicar desconto promocional de 20% na diária para acelerar saída.'}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. BI FINANCEIRO                                         */}
      {/* ======================================================== */}
      {selectedReportType === 'financeiro' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Faturamento Bruto</span>
              <div className="text-2xl font-bold text-slate-900 mt-1 font-mono tabular-nums">R$ 38.940,00</div>
              <span className="text-[11px] text-emerald-600 font-medium">+14.2% vs mês anterior</span>
            </div>
            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Custos Operacionais</span>
              <div className="text-2xl font-bold text-rose-600 mt-1 font-mono tabular-nums">R$ 5.090,00</div>
              <span className="text-[11px] text-slate-500">13.1% da receita bruta</span>
            </div>
            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Margem EBITDA</span>
              <div className="text-2xl font-bold text-emerald-600 mt-1 font-mono tabular-nums">86.9%</div>
              <span className="text-[11px] text-emerald-600">Alta eficiência de capital</span>
            </div>
            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Inadimplência</span>
              <div className="text-2xl font-bold text-slate-900 mt-1 font-mono tabular-nums">0.8%</div>
              <span className="text-[11px] text-emerald-600">Proteção via PIX/Cartão</span>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900">
              Rentabilidade Média por Categoria de Produto (ROI Anualizado)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              {[
                { cat: 'Carrinhos de Bebê', roi: '340% a.a.', payback: '3.2 meses', locacoes: '142 locações' },
                { cat: 'Cadeirinhas de Auto', roi: '410% a.a.', payback: '2.6 meses', locacoes: '198 locações' },
                { cat: 'Berços Portáteis & Next2Me', roi: '290% a.a.', payback: '4.1 meses', locacoes: '86 locações' }
              ].map((c, i) => (
                <div key={i} className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                  <strong className="text-slate-900">{c.cat}</strong>
                  <div className="text-emerald-700 font-bold font-mono">ROI: {c.roi}</div>
                  <div className="text-[11px] text-slate-500">Payback do ativo: {c.payback}</div>
                  <div className="text-[10px] text-slate-400 font-mono">{c.locacoes}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 3. BI COMERCIAL & CLIENTES                              */}
      {/* ======================================================== */}
      {(selectedReportType === 'comercial' || selectedReportType === 'clientes') && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Ticket Médio</span>
              <div className="text-2xl font-bold text-slate-900 mt-1 font-mono tabular-nums">R$ 342,00</div>
              <span className="text-[11px] text-emerald-600">+6.8% nesta temporada</span>
            </div>
            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Taxa de Recorrência</span>
              <div className="text-2xl font-bold text-blue-600 mt-1 font-mono tabular-nums">41.2%</div>
              <span className="text-[11px] text-slate-500">Clientes que alugam 2+ vezes</span>
            </div>
            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">LTV Estimado (Vida Útil)</span>
              <div className="text-2xl font-bold text-slate-900 mt-1 font-mono tabular-nums">R$ 1.280,00</div>
              <span className="text-[11px] text-slate-500">Média por família</span>
            </div>
            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Net Promoter Score (NPS)</span>
              <div className="text-2xl font-bold text-emerald-600 mt-1 font-mono tabular-nums">88</div>
              <span className="text-[11px] text-emerald-600">Zona de Excelência (0 a 100)</span>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 4. BI OPERACIONAL & LOGÍSTICA                           */}
      {/* ======================================================== */}
      {(selectedReportType === 'operacional' || selectedReportType === 'logistica' || selectedReportType === 'estoque') && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Giro Médio Higienização</span>
              <div className="text-2xl font-bold text-slate-900 mt-1 font-mono tabular-nums">3.4 horas</div>
              <span className="text-[11px] text-emerald-600">Da devolução à liberação</span>
            </div>
            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Índice de Avarias</span>
              <div className="text-2xl font-bold text-slate-900 mt-1 font-mono tabular-nums">1.2%</div>
              <span className="text-[11px] text-slate-500">Todas cobertas por caução</span>
            </div>
            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Pontualidade de Entrega</span>
              <div className="text-2xl font-bold text-emerald-600 mt-1 font-mono tabular-nums">96.4%</div>
              <span className="text-[11px] text-emerald-600">Janelas agendadas</span>
            </div>
            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Custo Logístico / Pedido</span>
              <div className="text-2xl font-bold text-slate-900 mt-1 font-mono tabular-nums">R$ 18,40</div>
              <span className="text-[11px] text-slate-500">Combustível + motorista</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
