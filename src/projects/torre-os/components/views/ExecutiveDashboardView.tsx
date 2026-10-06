import React from 'react';
import {
  TrendingUp,
  DollarSign,
  Target,
  Users,
  CalendarCheck,
  CalendarDays,
  Percent,
  Clock,
  Truck,
  RotateCcw,
  Wrench,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  ArrowUpRight,
  ShieldCheck,
  Award,
  ChevronRight
} from 'lucide-react';
import { TorreDeBebelLogo } from '../TorreDeBebelLogo';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useApp } from '../../context/AppContext';

export const ExecutiveDashboardView: React.FC = () => {
  const { setCurrentView } = useApp();

  const monthlyGoal = 45000;
  const currentRevenue = 38940;
  const estimatedProfit = 31850;
  const goalProgress = Math.round((currentRevenue / monthlyGoal) * 100);

  const revenueHistory = [
    { mes: 'Mai', receita: 24500, lucro: 19800 },
    { mes: 'Jun', receita: 27800, lucro: 22600 },
    { mes: 'Jul', receita: 33400, lucro: 27200 },
    { mes: 'Ago', receita: 31200, lucro: 25400 },
    { mes: 'Set', receita: 36100, lucro: 29500 },
    { mes: 'Out (Atual)', receita: 38940, lucro: 31850 }
  ];

  const occupancyByCategory = [
    { name: 'Carrinhos', ocupacao: 84 },
    { name: 'Cadeirinhas', ocupacao: 79 },
    { name: 'Berços', ocupacao: 72 },
    { name: 'Bebê-Conforto', ocupacao: 68 },
    { name: 'Alimentação', ocupacao: 61 },
    { name: 'Brinquedos', ocupacao: 55 }
  ];

  const revenueDistribution = [
    { name: 'Locações Diárias/Semanais', value: 24200, color: '#2563EB' },
    { name: 'Pacotes Mensais', value: 9800, color: '#3B82F6' },
    { name: 'Taxas de Logística', value: 3240, color: '#10B981' },
    { name: 'Extensões de Período', value: 1700, color: '#F59E0B' }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-slate-200 text-slate-800 p-2.5 rounded-lg shadow-xl text-xs">
          <div className="font-semibold text-slate-900 mb-1">{label}</div>
          {payload.map((entry: any, index: number) => (
            <div key={`item-${index}`} className="flex items-center justify-between gap-3 text-[11px]">
              <span style={{ color: entry.color }}>{entry.name}:</span>
              <span className="font-mono tabular-nums font-semibold text-slate-900">
                R$ {entry.value.toLocaleString('pt-BR')}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Banner Executive */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white text-slate-900 p-6 rounded-xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
        <div>
          <div className="flex items-center space-x-2 text-slate-700 text-xs font-semibold uppercase tracking-wider mb-1">
            <TorreDeBebelLogo size={20} />
            <span>Visão Diretoria Executiva · Torre de Bebel</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">Dashboard Executivo</h1>
          <p className="text-xs text-slate-500 mt-1 max-w-xl">
            Acompanhamento integrado de receita líquida, rentabilidade do acervo, metas comerciais e ritmo de expansão patrimonial.
          </p>
        </div>

        <div className="flex items-center space-x-3 self-start sm:self-auto">
          <div className="bg-slate-50 px-3.5 py-2 rounded-lg border border-slate-200 text-right">
            <div className="text-[10px] uppercase text-slate-500 font-medium">Meta Outubro</div>
            <div className="text-base font-bold text-slate-900 font-mono tabular-nums">R$ 45.000</div>
          </div>
          <div className="bg-emerald-50 px-3.5 py-2 rounded-lg border border-emerald-200 text-right">
            <div className="text-[10px] uppercase text-emerald-700 font-medium">Atingido</div>
            <div className="text-base font-bold text-emerald-700 font-mono tabular-nums">{goalProgress}%</div>
          </div>
        </div>
      </div>

      {/* Main Financial & Growth Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Faturamento Bruto</span>
            <DollarSign className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2 font-mono tabular-nums">
            R$ {currentRevenue.toLocaleString('pt-BR')}
          </div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1.5 flex items-center space-x-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span className="font-mono tabular-nums">+14.2%</span>
            <span className="text-slate-400 font-normal">vs mês anterior</span>
          </div>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Lucro Líquido Operacional</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-emerald-600 mt-2 font-mono tabular-nums">
            R$ {estimatedProfit.toLocaleString('pt-BR')}
          </div>
          <div className="text-[11px] text-slate-500 mt-1.5">
            Margem líquida de <strong className="text-slate-700 font-mono tabular-nums">81.8%</strong>
          </div>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Ticket Médio por Locação</span>
            <Award className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2 font-mono tabular-nums">
            R$ 342,00
          </div>
          <div className="text-[11px] text-slate-500 mt-1.5">
            Duração média: <span className="text-slate-700 font-mono tabular-nums">6.8 dias</span>
          </div>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Taxa de Ocupação Global</span>
            <Percent className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold text-blue-600 mt-2 font-mono tabular-nums">
            78.4%
          </div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1.5">
            Acervo em alta demanda
          </div>
        </div>
      </div>

      {/* Operational Pulse Sub-Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-3 bg-white rounded-lg border border-slate-200/80 shadow-2xs">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 block">Locações Ativas</span>
          <span className="text-lg font-bold text-slate-900 font-mono tabular-nums">52</span>
          <span className="text-[10px] text-slate-400 block mt-0.5">38 famílias</span>
        </div>

        <div className="p-3 bg-white rounded-lg border border-slate-200/80 shadow-2xs">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 block">Reservas Futuras</span>
          <span className="text-lg font-bold text-blue-600 font-mono tabular-nums">28</span>
          <span className="text-[10px] text-slate-400 block mt-0.5">Próximos 14d</span>
        </div>

        <div className="p-3 bg-white rounded-lg border border-slate-200/80 shadow-2xs">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 block">Entregas Hoje</span>
          <span className="text-lg font-bold text-emerald-600 font-mono tabular-nums">6</span>
          <span className="text-[10px] text-slate-400 block mt-0.5">4 em rota</span>
        </div>

        <div className="p-3 bg-white rounded-lg border border-slate-200/80 shadow-2xs">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 block">Devoluções Hoje</span>
          <span className="text-lg font-bold text-amber-600 font-mono tabular-nums">4</span>
          <span className="text-[10px] text-slate-400 block mt-0.5">Coletas</span>
        </div>

        <div className="p-3 bg-white rounded-lg border border-slate-200/80 shadow-2xs">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 block">Higienização</span>
          <span className="text-lg font-bold text-teal-600 font-mono tabular-nums">4</span>
          <span className="text-[10px] text-slate-400 block mt-0.5">Vapor 140°C</span>
        </div>

        <div className="p-3 bg-white rounded-lg border border-slate-200/80 shadow-2xs">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 block">Manutenção</span>
          <span className="text-lg font-bold text-rose-600 font-mono tabular-nums">3</span>
          <span className="text-[10px] text-slate-400 block mt-0.5">1 em espera</span>
        </div>
      </div>

      {/* Charts Section: Revenue Evolution & Category Occupancy */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Chart: Revenue and Profit Evolution */}
        <div className="lg:col-span-2 p-5 bg-white rounded-xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Evolução Mensal de Faturamento & Lucro</h2>
              <p className="text-xs text-slate-500">Últimos 6 meses de faturamento operacional</p>
            </div>
            <div className="flex items-center space-x-3 text-xs">
              <span className="flex items-center space-x-1.5 text-slate-600">
                <span className="w-2.5 h-2.5 rounded-xs bg-blue-600" />
                <span>Receita Bruta</span>
              </span>
              <span className="flex items-center space-x-1.5 text-slate-600">
                <span className="w-2.5 h-2.5 rounded-xs bg-emerald-500" />
                <span>Lucro Líquido</span>
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueHistory} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorReceita" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorLucro" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="mes" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748B' }} />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: '#64748B' }}
                  tickFormatter={val => `R$${val / 1000}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="receita" stroke="#2563EB" strokeWidth={2} fillOpacity={1} fill="url(#colorReceita)" name="Receita" />
                <Area type="monotone" dataKey="lucro" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorLucro)" name="Lucro" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Chart: Revenue Sources Breakdown */}
        <div className="p-5 bg-white rounded-xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-4 flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Distribuição de Receita</h2>
            <p className="text-xs text-slate-500">Composição por categoria de cobrança</p>
          </div>

          <div className="h-44 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={revenueDistribution}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={3}
                >
                  {revenueDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: any) => [`R$ ${Number(val).toLocaleString('pt-BR')}`, 'Valor']}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#fff', fontSize: '11px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-slate-100">
            {revenueDistribution.map(item => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2 truncate">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-600 truncate">{item.name}</span>
                </div>
                <span className="font-semibold text-slate-900 font-mono tabular-nums">
                  R$ {item.value.toLocaleString('pt-BR')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Occupancy and Strategic Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Occupancy by Product Category */}
        <div className="p-5 bg-white rounded-xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Taxa de Ocupação por Categoria</h2>
              <p className="text-xs text-slate-500">% do acervo em locação ativa ou reservado</p>
            </div>
            <button
              onClick={() => setCurrentView('inventory_intelligence')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center space-x-1"
            >
              <span>Ver Giro</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3 pt-1">
            {occupancyByCategory.map(cat => (
              <div key={cat.name} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-700">{cat.name}</span>
                  <span className="font-bold text-slate-900 font-mono tabular-nums">{cat.ocupacao}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      cat.ocupacao >= 80 ? 'bg-emerald-500' : cat.ocupacao >= 65 ? 'bg-blue-600' : 'bg-amber-500'
                    }`}
                    style={{ width: `${cat.ocupacao}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Executive Strategic Insights */}
        <div className="p-5 bg-white rounded-xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-indigo-600 mb-1">
              <Lightbulb className="w-4 h-4" />
              <h2 className="text-sm font-bold text-slate-900">Recomendações Estratégicas da Gestão</h2>
            </div>
            <p className="text-xs text-slate-500">Oportunidades identificadas para maximizar rentabilidade</p>
          </div>

          <div className="space-y-2.5">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-start space-x-3">
              <div className="w-6 h-6 rounded-md bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 font-bold text-xs">
                1
              </div>
              <div className="text-xs text-slate-700 leading-snug">
                <strong className="text-slate-900 block">Alta demanda em Carrinhos Ultracompactos</strong>
                Ocupação atingiu 84%. Recomenda-se aquisição de 4 unidades modelo Yoyo Babyzen para suprir o feriado de novembro.
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-start space-x-3">
              <div className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold text-xs">
                2
              </div>
              <div className="text-xs text-slate-700 leading-snug">
                <strong className="text-slate-900 block">Otimização de Retorno sobre Ativos (ROA)</strong>
                Cadeirinhas Burigotto Matrix alcançaram payback completo em 3.2 meses. Margem líquida por unidade é de 89%.
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-start space-x-3">
              <div className="w-6 h-6 rounded-md bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 font-bold text-xs">
                3
              </div>
              <div className="text-xs text-slate-700 leading-snug">
                <strong className="text-slate-900 block">Higienização Preventiva</strong>
                Tempo médio de ciclo em 3.4 horas com 100% de laudos aprovados. Equipamentos liberados com agilidade para reinvestimento.
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-slate-100">
            <span className="text-[11px] text-slate-400">Atualizado há 12 minutos</span>
            <button
              onClick={() => setCurrentView('reports')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800"
            >
              Exportar Relatório Diretoria em PDF →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
