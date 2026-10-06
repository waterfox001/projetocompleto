import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FinancialTransaction } from '../../types';
import {
 DollarSign,
 TrendingUp,
 TrendingDown,
 Calendar,
 AlertTriangle,
 Building2,
 CheckCircle2,
 Clock,
 ArrowUpRight,
 ArrowDownLeft,
 Plus,
 Filter,
 PieChart
} from 'lucide-react';

export const FinanceModule: React.FC = () => {
 const {
 transactions,
 selectedUnitId,
 addTransaction,
 showToast
 } = useApp();

 const [activeTab, setActiveTab] = useState<'dashboard' | 'receber' | 'pagar' | 'fluxo' | 'inadimplencia' | 'recorrencias'>('dashboard');

 const filteredTransactions = transactions.filter(
 (t) => selectedUnitId === 'all' || t.unitId === selectedUnitId
 );

 const totalReceitas = filteredTransactions
 .filter((t) => t.type === 'receita')
 .reduce((acc, t) => acc + t.value, 0);

 const totalDespesas = filteredTransactions
 .filter((t) => t.type === 'despesa')
 .reduce((acc, t) => acc + t.value, 0);

 const totalInadimplente = filteredTransactions
 .filter((t) => t.type === 'receita' && t.status === 'vencido')
 .reduce((acc, t) => acc + t.value, 0);

 const contasAReceber = filteredTransactions.filter((t) => t.type === 'receita');
 const contasAPagar = filteredTransactions.filter((t) => t.type === 'despesa');

 // Aging brackets
 const agingBrackets = [
 { range: '1 a 7 dias', count: 2, total: 42000.0, color: 'text-amber-700' },
 { range: '8 a 30 dias', count: 1, total: 8500.0, color: 'text-orange-700' },
 { range: '31 a 60 dias', count: 0, total: 0.0, color: 'text-slate-500' },
 { range: '61+ dias', count: 0, total: 0.0, color: 'text-emerald-700' }
 ];

 return (
 <div className="space-y-4 pb-10">
 {/* Top Header */}
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded p-3.5">
 <div>
 <div className="text-[10px] font-mono uppercase tracking-wider text-amber-700 font-bold">
 Controladoria & Finanças Corporativas
 </div>
 <h2 className="text-sm font-bold text-slate-900 tracking-tight">
 Gestão Financeira, DRE & Fluxo de Caixa
 </h2>
 <p className="text-xs text-slate-500 mt-1">
 Contas a pagar concessionárias (Aena, Fraport, CCR, VINCI), faturamentos corporativos e conciliação.
 </p>
 </div>

 <div className="flex items-center gap-2">
 {/* Submenu Tabs */}
 <div className="flex items-center gap-1 p-1 bg-slate-100 p-0.5 rounded text-xs overflow-x-auto">
 <button
 onClick={() => setActiveTab('dashboard')}
 className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors cursor-pointer whitespace-nowrap ${
 activeTab === 'dashboard' ? 'bg-white text-slate-900 font-semibold shadow-xs' : 'text-slate-600 hover:text-slate-900'
 }`}
 >
 Dashboard Financeiro
 </button>
 <button
 onClick={() => setActiveTab('receber')}
 className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors cursor-pointer whitespace-nowrap ${
 activeTab === 'receber' ? 'bg-white text-slate-900 font-semibold shadow-xs' : 'text-slate-600 hover:text-slate-900'
 }`}
 >
 Contas a Receber
 </button>
 <button
 onClick={() => setActiveTab('pagar')}
 className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors cursor-pointer whitespace-nowrap ${
 activeTab === 'pagar' ? 'bg-white text-slate-900 font-semibold shadow-xs' : 'text-slate-600 hover:text-slate-900'
 }`}
 >
 Contas a Pagar
 </button>
 <button
 onClick={() => setActiveTab('inadimplencia')}
 className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors cursor-pointer whitespace-nowrap ${
 activeTab === 'inadimplencia' ? 'bg-white text-slate-900 font-semibold shadow-xs' : 'text-slate-600 hover:text-slate-900'
 }`}
 >
 Inadimplência (Aging)
 </button>
 <button
 onClick={() => setActiveTab('recorrencias')}
 className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors cursor-pointer whitespace-nowrap ${
 activeTab === 'recorrencias' ? 'bg-white text-slate-900 font-semibold shadow-xs' : 'text-slate-600 hover:text-slate-900'
 }`}
 >
 Recorrências
 </button>
 </div>

 <button
 onClick={() => showToast('Novo Lançamento', 'Formulário financeiro de entrada/saída aberto.', 'info')}
 className="px-3 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded cursor-pointer flex items-center gap-1.5 shrink-0"
 >
 <Plus className="w-3.5 h-3.5 stroke-[3]" />
 <span>+ Lançamento</span>
 </button>
 </div>
 </div>

 {/* Financial KPIs */}
 <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
 <div className="p-4 bg-white rounded border border-slate-200 space-y-1">
 <div className="text-[11px] text-slate-500 font-medium">Receita Bruta do Mês</div>
 <div className="text-xl font-bold font-mono text-emerald-700 tabular-nums">
 R$ 994.950,00
 </div>
 <div className="text-[10px] text-slate-500 font-mono">+12,8% vs. mês anterior</div>
 </div>

 <div className="p-4 bg-white rounded border border-slate-200 space-y-1">
 <div className="text-[11px] text-slate-500 font-medium">Despesas & Concessões</div>
 <div className="text-xl font-bold font-mono text-slate-800 tabular-nums">
 R$ 437.200,00
 </div>
 <div className="text-[10px] text-slate-500 font-mono">Custos operacionais controlados</div>
 </div>

 <div className="p-4 bg-white rounded border border-slate-200 space-y-1">
 <div className="text-[11px] text-slate-500 font-medium">Resultado Líquido EBITDA</div>
 <div className="text-xl font-bold font-mono text-amber-700 tabular-nums">
 R$ 557.750,00
 </div>
 <div className="text-[10px] text-emerald-700 font-mono">Margem Líquida de 56,1%</div>
 </div>

 <div className="p-4 bg-white rounded border border-slate-200 space-y-1">
 <div className="text-[11px] text-slate-500 font-medium">Contas em Atraso (Inadimplência)</div>
 <div className="text-xl font-bold font-mono text-rose-700 tabular-nums">
 R$ {totalInadimplente.toLocaleString('pt-BR')}
 </div>
 <div className="text-[10px] text-slate-500 font-mono">1 fatura corporativa pendente</div>
 </div>
 </div>

 {/* TAB 1: DASHBOARD FINANCEIRO */}
 {activeTab === 'dashboard' && (
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
 {/* Centros de Custo Breakdown */}
 <div className="bg-white rounded border border-slate-200 p-5 space-y-4">
 <div className="flex items-center justify-between">
 <div>
 <div className="text-[10px] font-mono uppercase text-slate-500 font-semibold">Alocação Estrutural</div>
 <h3 className="text-sm font-bold text-slate-900">Distribuição por Centros de Custo</h3>
 </div>
 </div>

 <div className="space-y-3 text-xs font-mono">
 <div>
 <div className="flex justify-between text-slate-700 mb-1">
 <span>Concessões Aeroportuárias (Aena, Fraport, CCR)</span>
 <span className="font-bold text-slate-900">46% (R$ 201.112)</span>
 </div>
 <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
 <div className="bg-amber-500 h-full rounded-full" style={{ width: '46%' }} />
 </div>
 </div>

 <div>
 <div className="flex justify-between text-slate-700 mb-1">
 <span>Folha de Pagamento & Encargos (Equipes de Pista)</span>
 <span className="font-bold text-slate-900">32% (R$ 139.904)</span>
 </div>
 <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
 <div className="bg-blue-500 h-full rounded-full" style={{ width: '32%' }} />
 </div>
 </div>

 <div>
 <div className="flex justify-between text-slate-700 mb-1">
 <span>Tecnologia, Link Dedicado & Software OS</span>
 <span className="font-bold text-slate-900">12% (R$ 52.464)</span>
 </div>
 <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
 <div className="bg-emerald-500 h-full rounded-full" style={{ width: '12%' }} />
 </div>
 </div>

 <div>
 <div className="flex justify-between text-slate-700 mb-1">
 <span>Manutenção Preventiva & Suprimentos Térmicos</span>
 <span className="font-bold text-slate-900">10% (R$ 43.720)</span>
 </div>
 <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
 <div className="bg-purple-500 h-full rounded-full" style={{ width: '10%' }} />
 </div>
 </div>
 </div>
 </div>

 {/* Quick Recent Transactions */}
 <div className="bg-white rounded border border-slate-200 p-5 space-y-4">
 <div className="flex items-center justify-between">
 <div>
 <div className="text-[10px] font-mono uppercase text-slate-500 font-semibold">Livro Razão Recente</div>
 <h3 className="text-sm font-bold text-slate-900">Últimas Transações Registradas</h3>
 </div>
 </div>

 <div className="space-y-2.5 text-xs">
 {filteredTransactions.map((trx) => (
 <div
 key={trx.id}
 className="p-3 bg-slate-50/70 rounded border border-slate-200 flex items-center justify-between"
 >
 <div className="space-y-0.5">
 <div className="font-semibold text-slate-800">{trx.description}</div>
 <div className="text-[11px] text-slate-500 font-mono">
 {trx.clientOrSupplier} · Unidade: {trx.unitId} · {trx.paymentMethod}
 </div>
 </div>
 <div className="text-right font-mono">
 <div
 className={`font-bold ${
 trx.type === 'receita' ? 'text-emerald-700' : 'text-slate-700'
 }`}
 >
 {trx.type === 'receita' ? '+' : '-'}R$ {trx.value.toFixed(2)}
 </div>
 <span
 className={`text-[9px] font-bold px-1.5 py-0.2 rounded uppercase ${
 trx.status === 'recebido' || trx.status === 'pago'
 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
 : trx.status === 'vencido'
 ? 'bg-rose-50 text-rose-700 border border-rose-200'
 : 'bg-amber-50 text-amber-800 border border-amber-200'
 }`}
 >
 {trx.status}
 </span>
 </div>
 </div>
 ))}
 </div>
 </div>
 </div>
 )}

 {/* TAB 2: CONTAS A RECEBER */}
 {activeTab === 'receber' && (
 <div className="bg-white rounded border border-slate-200 p-5 space-y-4">
 <div className="flex items-center justify-between">
 <h3 className="text-sm font-bold text-slate-900">Faturamentos & Contas a Receber</h3>
 <span className="text-xs font-mono text-emerald-700 font-bold">{contasAReceber.length} registros</span>
 </div>

 <div className="overflow-x-auto">
 <table className="w-full text-left text-xs">
 <thead>
 <tr className="bg-slate-50 border-b border-slate-200 text-[11px] text-slate-600 font-semibold">
 <th className="pb-3">Código</th>
 <th className="pb-3">Cliente / Sacado</th>
 <th className="pb-3">Descrição</th>
 <th className="pb-3">Vencimento</th>
 <th className="pb-3">Valor</th>
 <th className="pb-3">Status</th>
 <th className="pb-3 text-right">Ação</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-slate-100">
 {contasAReceber.map((r) => (
 <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
 <td className="py-3 font-mono font-bold text-amber-700">{r.id}</td>
 <td className="py-3 font-semibold text-slate-800">{r.clientOrSupplier}</td>
 <td className="py-3 text-slate-700">{r.description}</td>
 <td className="py-3 font-mono text-slate-500">{r.dueDate}</td>
 <td className="py-3 font-mono font-bold text-emerald-700">
 R$ {r.value.toFixed(2)}
 </td>
 <td className="py-3">
 <span
 className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
 r.status === 'recebido'
 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
 : r.status === 'vencido'
 ? 'bg-rose-50 text-rose-700 border border-rose-200'
 : 'bg-amber-50 text-amber-800 border border-amber-200'
 }`}
 >
 {r.status}
 </span>
 </td>
 <td className="py-3 text-right">
 <button
 onClick={() => showToast('Baixa', `Recebimento de ${r.id} registrado com sucesso.`, 'success')}
 className="text-xs text-amber-700 hover:text-amber-800 font-medium cursor-pointer"
 >
 Liquidar
 </button>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </div>
 )}

 {/* TAB 3: CONTAS A PAGAR */}
 {activeTab === 'pagar' && (
 <div className="bg-white rounded border border-slate-200 p-5 space-y-4">
 <div className="flex items-center justify-between">
 <h3 className="text-sm font-bold text-slate-900">Obrigações & Contas a Pagar (Concessões e Fornecedores)</h3>
 <span className="text-xs font-mono text-slate-500">{contasAPagar.length} títulos mapeados</span>
 </div>

 <div className="overflow-x-auto">
 <table className="w-full text-left text-xs">
 <thead>
 <tr className="bg-slate-50 border-b border-slate-200 text-[11px] text-slate-600 font-semibold">
 <th className="pb-3">Código</th>
 <th className="pb-3">Fornecedor / Concessionária</th>
 <th className="pb-3">Centro de Custo</th>
 <th className="pb-3">Vencimento</th>
 <th className="pb-3">Valor</th>
 <th className="pb-3">Recorrência</th>
 <th className="pb-3 text-right">Ação</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-slate-100">
 {contasAPagar.map((p) => (
 <tr key={p.id} className="hover:bg-slate-50/60 transition-colors">
 <td className="py-3 font-mono font-bold text-amber-700">{p.id}</td>
 <td className="py-3 font-semibold text-slate-800">{p.clientOrSupplier}</td>
 <td className="py-3 text-slate-700">{p.costCenter}</td>
 <td className="py-3 font-mono text-slate-500">{p.dueDate}</td>
 <td className="py-3 font-mono font-bold text-slate-900">
 R$ {p.value.toFixed(2)}
 </td>
 <td className="py-3 text-slate-500 font-mono text-[11px]">
 {p.isRecurrent ? 'Mensal' : 'Eventual'}
 </td>
 <td className="py-3 text-right">
 <button
 onClick={() => showToast('Boleto', `Linha digitável do boleto ${p.id} copiada.`, 'info')}
 className="text-xs text-amber-700 hover:text-amber-800 font-medium cursor-pointer"
 >
 Pagar
 </button>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </div>
 )}

 {/* TAB 4: INADIMPLÊNCIA & AGING */}
 {activeTab === 'inadimplencia' && (
 <div className="bg-white rounded border border-slate-200 p-5 space-y-5">
 <div>
 <div className="text-[10px] font-mono uppercase text-rose-700 font-bold">Cobrança & Recuperação</div>
 <h3 className="text-sm font-bold text-slate-900">Aging de Recebíveis em Atraso</h3>
 </div>

 <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
 {agingBrackets.map((ag) => (
 <div key={ag.range} className="p-4 bg-slate-50/70 rounded border border-slate-200 space-y-1">
 <div className="text-[11px] text-slate-500 font-mono">{ag.range}</div>
 <div className={`text-xl font-bold font-mono ${ag.color}`}>
 R$ {ag.total.toLocaleString('pt-BR')}
 </div>
 <div className="text-[10px] text-slate-500 font-mono">{ag.count} títulos</div>
 </div>
 ))}
 </div>

 <div className="p-4 bg-slate-50/70 rounded border border-slate-200 space-y-2 text-xs">
 <div className="font-semibold text-slate-800">Ações Automáticas de Cobrança:</div>
 <p className="text-slate-500 leading-relaxed">
 O sistema dispara notificações por e-mail e WhatsApp automático no 1º, 3º e 7º dia pós-vencimento com novo boleto ou chave PIX atualizada com encargos.
 </p>
 </div>
 </div>
 )}

 {/* TAB 5: RECORRÊNCIAS */}
 {activeTab === 'recorrencias' && (
 <div className="bg-white rounded border border-slate-200 p-5 space-y-4">
 <div className="flex items-center justify-between">
 <div>
 <div className="text-[10px] font-mono uppercase text-slate-500 font-semibold">Contratos Contínuos</div>
 <h3 className="text-sm font-bold text-slate-900">Despesas Recorrentes Concessão & Links</h3>
 </div>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
 <div className="p-4 bg-slate-50/70 rounded border border-slate-200 space-y-2 text-xs">
 <div className="flex items-center justify-between">
 <span className="font-bold text-slate-900">Concessão Aena CGH</span>
 <span className="font-mono text-amber-700 font-bold">R$ 48.500 / mês</span>
 </div>
 <p className="text-slate-500">Espaço comercial Subsolo Congonhas com taxa de condomínio inclusa.</p>
 <div className="text-[10px] font-mono text-slate-500">Próximo vencimento: 10/10/2026</div>
 </div>

 <div className="p-4 bg-slate-50/70 rounded border border-slate-200 space-y-2 text-xs">
 <div className="flex items-center justify-between">
 <span className="font-bold text-slate-900">Concessão Fraport FOR</span>
 <span className="font-mono text-amber-700 font-bold">R$ 32.000 / mês</span>
 </div>
 <p className="text-slate-500">Piso térreo desembarque Pinto Martins Fortaleza.</p>
 <div className="text-[10px] font-mono text-slate-500">Próximo vencimento: 10/10/2026</div>
 </div>

 <div className="p-4 bg-slate-50/70 rounded border border-slate-200 space-y-2 text-xs">
 <div className="flex items-center justify-between">
 <span className="font-bold text-slate-900">Link Dedicado Fibra</span>
 <span className="font-mono text-amber-700 font-bold">R$ 2.890 / mês</span>
 </div>
 <p className="text-slate-500">Link síncrono Embratel para comunicação dos armários e totens.</p>
 <div className="text-[10px] font-mono text-slate-500">Próximo vencimento: 08/10/2026</div>
 </div>
 </div>
 </div>
 )}
 </div>
 );
};
