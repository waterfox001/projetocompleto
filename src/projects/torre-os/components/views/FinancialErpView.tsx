import React, { useState, useEffect } from 'react';
import {
  DollarSign,
  TrendingUp,
  CreditCard,
  ShieldCheck,
  RotateCcw,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Filter,
  FileSpreadsheet,
  AlertTriangle,
  Percent,
  Coins,
  CheckCircle2,
  Clock
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line
} from 'recharts';

interface FinancialErpViewProps {
  subTab?: string;
}

export const FinancialErpView: React.FC<FinancialErpViewProps> = ({ subTab }) => {
  const [activeTab, setActiveTab] = useState<'visao_geral' | 'dre' | 'receber_pagar' | 'caucoes' | 'fluxo_caixa' | 'comissoes'>('visao_geral');

  useEffect(() => {
    if (!subTab) return;
    if (subTab === 'accounts_receivable' || subTab === 'accounts_payable') {
      setActiveTab('receber_pagar');
    } else if (subTab === 'dre_statement') {
      setActiveTab('dre');
    } else if (subTab === 'deposits_held' || subTab === 'overdue_defaults') {
      setActiveTab('caucoes');
    } else if (subTab === 'cash_flow' || subTab === 'income_expenses') {
      setActiveTab('fluxo_caixa');
    } else if (subTab === 'commissions' || subTab === 'profitability') {
      setActiveTab('comissoes');
    } else {
      setActiveTab('visao_geral');
    }
  }, [subTab]);

  const cashFlowData = [
    { dia: '01/10', entradas: 4200, saídas: 1100, saldo: 3100 },
    { dia: '02/10', entradas: 5100, saídas: 890, saldo: 4210 },
    { dia: '03/10', entradas: 3900, saídas: 1650, saldo: 2250 },
    { dia: '04/10', entradas: 6400, saídas: 750, saldo: 5650 },
    { dia: '05/10', entradas: 5800, saídas: 1200, saldo: 4600 }
  ];

  const accountsPayable = [
    { id: 'pay-1', desc: 'Galão Quaternário Amônio 5L (Higienização)', venc: '10/10/2026', valor: 320, status: 'A Vencer', fornecedor: 'Química Hospitalar SP' },
    { id: 'pay-2', desc: 'Peças Trava Cinto Graco DLX (Manutenção)', venc: '12/10/2026', valor: 140, status: 'A Vencer', fornecedor: 'Distribuidora Kids' },
    { id: 'pay-3', desc: 'Seguro Frota Veículos Logística', venc: '15/10/2026', valor: 850, status: 'Programado', fornecedor: 'Porto Seguro' },
    { id: 'pay-4', desc: 'Embalagens Protetoras Plásticas Térmicas (200 un)', venc: '18/10/2026', valor: 490, status: 'Programado', fornecedor: 'PlastFlex Embalagens' }
  ];

  const accountsReceivable = [
    { id: 'rec-1', desc: 'Locação #LOC-1025 - Carlos Eduardo Mendes', venc: '15/10/2026', valor: 770, status: 'A Receber', cliente: 'Carlos Mendes' },
    { id: 'rec-2', desc: 'Renovação Mensal #LOC-1028 - Patricia Linhares', venc: '14/10/2026', valor: 380, status: 'A Receber', cliente: 'Patricia Gomes' },
    { id: 'rec-3', desc: 'Diária Excedente #LOC-1022 - Rodrigo Santoro', venc: '04/10/2026', valor: 90, status: 'Vencido / Atrasado', cliente: 'Rodrigo Santoro' },
    { id: 'rec-4', desc: 'Pacote Viagem Praia #LOC-1031 - Juliana Paes', venc: '11/10/2026', valor: 640, status: 'A Receber', cliente: 'Juliana Paes' }
  ];

  const depositsList = [
    { id: 'cau-1', client: 'Mariana Costa Silveira', item: 'Cadeirinha Burigotto CC-024', val: 300, status: 'Retida (Locação Ativa)', date: '05/10/2026', method: 'Cartão de Crédito Pré-Autorizado' },
    { id: 'cau-2', client: 'Carlos Eduardo Mendes', item: 'Cadeirinha Maxi-Cosi Pria CC-028', val: 500, status: 'Retida (Locação Ativa)', date: '03/10/2026', method: 'PIX Caução Bloqueado' },
    { id: 'cau-3', client: 'Aline Barbosa Fontes', item: 'Berço Portátil BP-012', val: 350, status: 'Em Análise de Avaria', date: '04/10/2026', method: 'Desconto Parcial Solicitado' },
    { id: 'cau-4', client: 'Lucas Ferreira Guimarães', item: 'Carrinho YOYO² CB-014', val: 600, status: 'Liberada / Devolvida', date: '02/10/2026', method: 'Estorno PIX Concluído' }
  ];

  const commissionsData = [
    { name: 'Ana Paula (Comercial)', locacoes: 28, faturamento: 11400, comissao: 570, taxa: '5%' },
    { name: 'Gabriel Siqueira (Atendimento)', locacoes: 22, faturamento: 8900, comissao: 445, taxa: '5%' },
    { name: 'Juliana Torres (Parcerias Maternidade)', locacoes: 14, faturamento: 6200, comissao: 620, taxa: '10%' }
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">ERP Financeiro & DRE Gerencial</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Gestão integrada de contas a pagar, contas a receber, DRE gerencial, fluxo de caixa e custódia de cauções
          </p>
        </div>

        <div className="flex items-center gap-1 p-0.5 bg-slate-100/80 rounded-lg border border-slate-200/60 overflow-x-auto">
          <button
            onClick={() => setActiveTab('visao_geral')}
            className={`px-3 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-all ${
              activeTab === 'visao_geral' ? 'bg-white shadow-xs text-slate-900 font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Visão Geral
          </button>
          <button
            onClick={() => setActiveTab('receber_pagar')}
            className={`px-3 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-all ${
              activeTab === 'receber_pagar' ? 'bg-white shadow-xs text-slate-900 font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Contas Pagar/Receber
          </button>
          <button
            onClick={() => setActiveTab('fluxo_caixa')}
            className={`px-3 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-all ${
              activeTab === 'fluxo_caixa' ? 'bg-white shadow-xs text-slate-900 font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Fluxo de Caixa
          </button>
          <button
            onClick={() => setActiveTab('dre')}
            className={`px-3 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-all ${
              activeTab === 'dre' ? 'bg-white shadow-xs text-slate-900 font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            DRE Gerencial
          </button>
          <button
            onClick={() => setActiveTab('caucoes')}
            className={`px-3 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-all ${
              activeTab === 'caucoes' ? 'bg-white shadow-xs text-slate-900 font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Cauções Retidas
          </button>
          <button
            onClick={() => setActiveTab('comissoes')}
            className={`px-3 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-all ${
              activeTab === 'comissoes' ? 'bg-white shadow-xs text-slate-900 font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Comissões
          </button>
        </div>
      </div>

      {/* Financial KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
          <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Receita Bruta (Mês)</div>
          <div className="text-2xl font-bold text-slate-900 mt-1 font-mono tabular-nums">R$ 38.940</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-0.5">86.5% da meta batida</div>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
          <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Contas a Receber</div>
          <div className="text-2xl font-bold text-blue-600 mt-1 font-mono tabular-nums">R$ 6.320</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Próximos 15 dias</div>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
          <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Contas a Pagar</div>
          <div className="text-2xl font-bold text-rose-600 mt-1 font-mono tabular-nums">R$ 1.800</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Insumos & manutenção</div>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
          <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Cauções em Custódia</div>
          <div className="text-2xl font-bold text-amber-600 mt-1 font-mono tabular-nums">R$ 14.200</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Garantias sob custódia</div>
        </div>
      </div>

      {/* Tab: Visao Geral */}
      {activeTab === 'visao_geral' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Cash flow line chart */}
          <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900">
              Fluxo de Caixa Diário (Entradas vs Saídas)
            </h3>
            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={cashFlowData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="dia" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#fff', fontSize: '11px' }} />
                  <Line type="monotone" dataKey="entradas" stroke="#10b981" strokeWidth={2} name="Entradas (R$)" />
                  <Line type="monotone" dataKey="saídas" stroke="#ef4444" strokeWidth={2} name="Saídas (R$)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* DRE Mini Preview */}
          <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-3 flex flex-col justify-between">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900">
              Resumo DRE Simplificada (Outubro 2026)
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-600">(+) Receita Bruta com Locações</span>
                <strong className="text-slate-900 font-mono tabular-nums">R$ 38.940,00</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-600">(-) Deduções e Taxas Gateway Pix/Cartão</span>
                <span className="text-rose-600 font-mono tabular-nums">- R$ 780,00</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 font-semibold">
                <span className="text-slate-800">(=) Receita Líquida</span>
                <strong className="text-slate-900 font-mono tabular-nums">R$ 38.160,00</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-600">(-) Custos Operacionais (Higienização/Peças)</span>
                <span className="text-rose-600 font-mono tabular-nums">- R$ 2.450,00</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-600">(-) Logística & Combustível</span>
                <span className="text-rose-600 font-mono tabular-nums">- R$ 1.860,00</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-200 text-sm font-bold">
                <span className="text-slate-900">(=) Resultado Líquido Operacional</span>
                <span className="text-emerald-700 font-mono tabular-nums">R$ 33.850,00 (86.9%)</span>
              </div>
            </div>
            <span className="text-[10px] text-slate-400">Regime de competência gerencial auditado</span>
          </div>
        </div>
      )}

      {/* Tab: Contas Pagar e Receber */}
      {activeTab === 'receber_pagar' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contas a Receber */}
          <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-semibold text-xs uppercase text-blue-700 tracking-wider">
                Contas a Receber ({accountsReceivable.length})
              </h3>
              <span className="text-xs font-semibold text-slate-700 font-mono tabular-nums">Total: R$ 1.880,00</span>
            </div>
            <div className="space-y-2 text-xs">
              {accountsReceivable.map(item => (
                <div key={item.id} className="p-3 bg-slate-50/70 rounded-lg border border-slate-200/80 flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-slate-900">{item.desc}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5 font-mono">Venc: {item.venc} · {item.cliente}</div>
                  </div>
                  <div className="text-right">
                    <strong className="text-blue-700 font-mono tabular-nums">R$ {item.valor}</strong>
                    <div className={`text-[10px] font-medium ${item.status.includes('Vencido') ? 'text-rose-600' : 'text-slate-500'}`}>{item.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contas a Pagar */}
          <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-semibold text-xs uppercase text-rose-700 tracking-wider">
                Contas a Pagar ({accountsPayable.length})
              </h3>
              <span className="text-xs font-semibold text-slate-700 font-mono tabular-nums">Total: R$ 1.800,00</span>
            </div>
            <div className="space-y-2 text-xs">
              {accountsPayable.map(item => (
                <div key={item.id} className="p-3 bg-slate-50/70 rounded-lg border border-slate-200/80 flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-slate-900">{item.desc}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5 font-mono">Venc: {item.venc} · {item.fornecedor}</div>
                  </div>
                  <div className="text-right">
                    <strong className="text-rose-600 font-mono tabular-nums">R$ {item.valor}</strong>
                    <div className="text-[10px] text-slate-500 font-medium">{item.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab: DRE Completa */}
      {activeTab === 'dre' && (
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-sm text-slate-900">Demonstração do Resultado do Exercício (DRE)</h3>
              <p className="text-xs text-slate-500">Período: 01/10/2026 a 31/10/2026 (Competência)</p>
            </div>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200/80 font-mono">
              Margem Líquida: 86.9%
            </span>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            <div className="flex justify-between py-2 font-bold text-slate-900">
              <span>1. RECEITA BRUTA COM LOCAÇÕES</span>
              <span className="font-mono tabular-nums">R$ 38.940,00</span>
            </div>
            <div className="flex justify-between py-2 pl-4 text-slate-600">
              <span>(-) Taxas de Intermediação & Cartões</span>
              <span className="text-rose-600 font-mono tabular-nums">- R$ 780,00</span>
            </div>
            <div className="flex justify-between py-2 bg-slate-50/70 px-2 font-semibold text-slate-900 rounded">
              <span>2. RECEITA OPERACIONAL LÍQUIDA</span>
              <span className="font-mono tabular-nums">R$ 38.160,00</span>
            </div>
            <div className="flex justify-between py-2 pl-4 text-slate-600">
              <span>(-) Custos com Produtos Químicos e Vapor (Higienização)</span>
              <span className="text-rose-600 font-mono tabular-nums">- R$ 1.250,00</span>
            </div>
            <div className="flex justify-between py-2 pl-4 text-slate-600">
              <span>(-) Peças de Reposição e Manutenção Preventiva</span>
              <span className="text-rose-600 font-mono tabular-nums">- R$ 1.200,00</span>
            </div>
            <div className="flex justify-between py-2 pl-4 text-slate-600">
              <span>(-) Despesas com Frota e Logística (Combustível / Pedágios)</span>
              <span className="text-rose-600 font-mono tabular-nums">- R$ 1.860,00</span>
            </div>
            <div className="flex justify-between py-2 bg-emerald-50/50 px-2 font-bold text-emerald-800 text-sm rounded">
              <span>3. RESULTADO OPERACIONAL LÍQUIDO (EBITDA ESTIMADO)</span>
              <span className="font-mono tabular-nums">R$ 33.850,00</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Caucoes */}
      {activeTab === 'caucoes' && (
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-sm text-slate-900">Gestão de Cauções em Garantia</h3>
              <p className="text-xs text-slate-500">Valores caucionados por pré-autorização ou PIX bloqueado para segurança dos ativos</p>
            </div>
            <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200/80 font-mono tabular-nums">
              Total Custodiado: R$ 14.200,00
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/70 text-slate-500 font-semibold border-b border-slate-200 text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="py-2.5 px-3">Cliente</th>
                  <th className="py-2.5 px-3">Produto Alugado</th>
                  <th className="py-2.5 px-3">Valor Caução</th>
                  <th className="py-2.5 px-3">Forma de Retenção</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Data</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {depositsList.map(c => (
                  <tr key={c.id} className="hover:bg-slate-50/60">
                    <td className="py-3 px-3 font-semibold text-slate-900">{c.client}</td>
                    <td className="py-3 px-3 text-slate-600">{c.item}</td>
                    <td className="py-3 px-3 font-mono font-semibold text-blue-700 tabular-nums">R$ {c.val},00</td>
                    <td className="py-3 px-3 text-slate-500">{c.method}</td>
                    <td className="py-3 px-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium border ${
                        c.status.includes('Ativa') ? 'bg-blue-50 text-blue-700 border-blue-200/80' :
                        c.status.includes('Liberada') ? 'bg-emerald-50 text-emerald-700 border-emerald-200/80' : 'bg-amber-50 text-amber-700 border-amber-200/80'
                      }`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-400 font-mono">{c.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Fluxo de Caixa */}
      {activeTab === 'fluxo_caixa' && (
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900">
                Histórico Diário de Fluxo de Caixa
              </h3>
              <span className="text-xs text-slate-400 font-mono">Outubro 2026</span>
            </div>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={cashFlowData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="dia" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#fff', fontSize: '11px' }} />
                  <Bar dataKey="entradas" fill="#10b981" name="Entradas (R$)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="saídas" fill="#ef4444" name="Saídas (R$)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Comissoes */}
      {activeTab === 'comissoes' && (
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-sm text-slate-900">Comissões Comerciais da Equipe</h3>
              <p className="text-xs text-slate-500">Apuração automática sobre contratos fechados e renovações de locações</p>
            </div>
            <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-200/80 font-mono tabular-nums">
              Total a Pagar: R$ 1.635,00
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/70 text-slate-500 font-semibold border-b border-slate-200 text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="py-2.5 px-3">Profissional</th>
                  <th className="py-2.5 px-3">Locações Fechadas</th>
                  <th className="py-2.5 px-3">Faturamento Gerado</th>
                  <th className="py-2.5 px-3">Alíquota</th>
                  <th className="py-2.5 px-3 text-right">Comissão a Pagar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {commissionsData.map((com, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60">
                    <td className="py-3 px-3 font-semibold text-slate-900">{com.name}</td>
                    <td className="py-3 px-3 text-slate-600">{com.locacoes} contratos</td>
                    <td className="py-3 px-3 font-mono tabular-nums">R$ {com.faturamento.toLocaleString('pt-BR')},00</td>
                    <td className="py-3 px-3 text-slate-500 font-mono">{com.taxa}</td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-emerald-700 tabular-nums">R$ {com.comissao},00</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
