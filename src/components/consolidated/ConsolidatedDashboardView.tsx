import React, { useMemo } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import {
  CITIES_DATA,
  CITY_RANKINGS,
  MONTHLY_EVOLUTION,
  CONSOLIDATED_ACTIVITIES,
  CONSOLIDATED_ALERTS,
  TEN_SITES,
} from '../../data/platformData';
import {
  TrendingUp,
  DollarSign,
  Users,
  Target,
  BarChart3,
  CalendarCheck,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  ShieldCheck,
  MapPin,
  CheckCircle2,
  Clock,
  Sparkles,
  Luggage,
  Building2,
  Layers,
  ChevronRight,
  Globe,
  ExternalLink,
  Award,
  Filter,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  AreaChart,
  Area,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { TorreDeBebelLogo } from '../../projects/torre-os/components/TorreDeBebelLogo';
import { StopcaseLogo } from '../../projects/stop-os/components/common/StopcaseLogo';

export const ConsolidatedDashboardView: React.FC = () => {
  const { selectedCity, setSelectedCity, setSelectedCompany, setActiveModule, openSitePreview } =
    usePlatform();

  // Filter calculations based on selected city if any
  const cityFiltered = useMemo(() => {
    if (selectedCity === 'all') return null;
    return CITIES_DATA.find((c) => c.id === selectedCity);
  }, [selectedCity]);

  // Aggregate metrics dynamically
  const metrics = useMemo(() => {
    if (!cityFiltered) {
      return {
        revenueTorre: 745200,
        revenueStop: 1097400,
        revenueTotal: 1842600,
        targetTotal: 2050000,
        activeRentals: 236,
        activeVolumes: 720,
        totalOperations: 4890,
        totalCustomers: 12430,
        totalLeads: 842,
        conversionRate: 68.4,
        avgTicket: 194.5,
        alertsCount: 14,
      };
    } else {
      const revTorre = cityFiltered.monthlyRevenueTorre;
      const revStop = cityFiltered.monthlyRevenueStop;
      const revTotal = revTorre + revStop;
      return {
        revenueTorre: revTorre,
        revenueStop: revStop,
        revenueTotal: revTotal,
        targetTotal: Math.round(revTotal * 1.08),
        activeRentals: cityFiltered.activeTorreRentals,
        activeVolumes: cityFiltered.activeStopVolumes,
        totalOperations: cityFiltered.activeTorreRentals * 8 + cityFiltered.activeStopVolumes * 3,
        totalCustomers: Math.round(cityFiltered.activeTorreRentals * 35 + cityFiltered.activeStopVolumes * 12),
        totalLeads: Math.round(cityFiltered.activeTorreRentals * 3.2 + cityFiltered.activeStopVolumes * 1.5),
        conversionRate: 71.2,
        avgTicket: Math.round(revTotal / (cityFiltered.activeTorreRentals * 4 + cityFiltered.activeStopVolumes * 8)),
        alertsCount: 3,
      };
    }
  }, [cityFiltered]);

  const targetProgress = Math.min(100, Math.round((metrics.revenueTotal / metrics.targetTotal) * 100));

  const pieData = [
    { name: 'Stop Case (Guarda-volumes)', value: metrics.revenueStop, color: '#f59e0b' },
    { name: 'Torre de Bebel (Locação Infantil)', value: metrics.revenueTorre, color: '#10b981' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Welcome & City Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-indigo-950 p-5 rounded-2xl border border-slate-800 text-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
              NÍVEL 1 · VISÃO CONSOLIDADA DA HOLDING
            </span>
            <span className="text-slate-400 text-xs hidden sm:inline">
              Atualizado em tempo real às 02:54
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            Painel Executivo Integrado
            {cityFiltered && (
              <span className="text-blue-400 font-semibold text-lg">
                — {cityFiltered.name} ({cityFiltered.airportCode})
              </span>
            )}
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-3xl">
            Gestão simultânea e sincronizada da{' '}
            <strong className="text-emerald-400 font-semibold">Torre de Bebel</strong> (locação
            infantil) e da{' '}
            <strong className="text-amber-400 font-semibold">Stop Case</strong> (guarda-volumes
            inteligente) em todas as 5 praças aeroportuárias e 10 operações digitais.
          </p>
        </div>

        {/* Quick Actions / Shortcut */}
        <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
          <button
            onClick={() => setActiveModule('sites')}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Globe className="w-4 h-4 text-amber-400" />
            <span>Gerenciar 10 Sites</span>
          </button>
          <button
            onClick={() => setSelectedCity('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-colors cursor-pointer ${
              selectedCity === 'all'
                ? 'bg-blue-600 text-white border-blue-500'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
            }`}
          >
            <Filter className="w-3.5 h-3.5" />
            <span>{selectedCity === 'all' ? 'Ver Todas as Praças' : 'Resetar Filtro de Cidade'}</span>
          </button>
        </div>
      </div>

      {/* 1. Main KPI Executive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Faturamento Consolidado */}
        <div className="bg-white p-4.5 rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Faturamento Consolidado
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 tabular-nums">
            R$ {metrics.revenueTotal.toLocaleString('pt-BR')}
          </div>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-xs">
            <span className="text-emerald-600 font-semibold flex items-center gap-0.5">
              <ArrowUpRight className="w-3.5 h-3.5" /> +18.4% vs mês ant.
            </span>
            <span className="text-slate-400">Meta: R$ {metrics.targetTotal.toLocaleString('pt-BR')}</span>
          </div>
        </div>

        {/* KPI 2: Vendas & Operações Totais */}
        <div className="bg-white p-4.5 rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Operações / Diárias Concluídas
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CalendarCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 tabular-nums">
            {metrics.totalOperations.toLocaleString('pt-BR')}
          </div>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-xs text-slate-500">
            <span>
              <strong className="text-emerald-600 font-semibold">{metrics.activeRentals}</strong> locações Torre
            </span>
            <span>•</span>
            <span>
              <strong className="text-amber-600 font-semibold">{metrics.activeVolumes}</strong> volumes Stop
            </span>
          </div>
        </div>

        {/* KPI 3: Clientes Totais & Leads */}
        <div className="bg-white p-4.5 rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Clientes & Base Ativa
            </span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 tabular-nums">
            {metrics.totalCustomers.toLocaleString('pt-BR')}
          </div>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-xs">
            <span className="text-purple-600 font-semibold">{metrics.totalLeads} novos leads no mês</span>
            <span className="text-slate-500">Conv: {metrics.conversionRate}%</span>
          </div>
        </div>

        {/* KPI 4: Ticket Médio & Atingimento de Meta */}
        <div className="bg-white p-4.5 rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Realizado vs Meta
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 tabular-nums">
              {targetProgress}%
            </span>
            <span className="text-xs text-slate-500">da meta corporativa</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-3">
            <div
              className="bg-blue-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${targetProgress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* 2. COMPARAÇÃO ENTRE EMPRESAS: TORRE DE BABEL × STOP CASE */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 text-[10px] font-bold uppercase tracking-wider">
                Comparativo Estratégico
              </span>
              <h2 className="text-lg font-bold text-slate-900">
                Torre de Bebel × Stop Case
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Análise comparativa direta de receita, rentabilidade, volume e conversão entre as duas marcas.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedCompany('torre')}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <TorreDeBebelLogo size={14} />
              <span>Ver Sistema Torre</span>
            </button>
            <button
              onClick={() => setSelectedCompany('stop')}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <StopcaseLogo size={14} className="w-3.5 h-3.5" />
              <span>Ver Sistema Stop Case</span>
            </button>
          </div>
        </div>

        {/* Side-by-Side Comparison Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100 border-b border-slate-100">
          {/* Torre de Bebel Side */}
          <div className="p-5 space-y-4 bg-emerald-50/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <TorreDeBebelLogo size={28} />
                <div>
                  <h3 className="text-base font-bold text-slate-900">Torre de Bebel</h3>
                  <span className="text-xs text-emerald-700 font-medium">
                    Locação de Itens Infantis (Bebês & Crianças)
                  </span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                40.4% da Receita
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-lg bg-white border border-emerald-100 shadow-2xs">
                <span className="text-[11px] text-slate-500 font-medium block">Faturamento Mês</span>
                <span className="text-lg font-bold text-slate-900 tabular-nums">
                  R$ {metrics.revenueTorre.toLocaleString('pt-BR')}
                </span>
                <span className="text-[10px] text-emerald-600 font-semibold block mt-0.5">
                  +14.2% vs mês ant.
                </span>
              </div>

              <div className="p-3 rounded-lg bg-white border border-emerald-100 shadow-2xs">
                <span className="text-[11px] text-slate-500 font-medium block">Locações Ativas</span>
                <span className="text-lg font-bold text-slate-900 tabular-nums">
                  {metrics.activeRentals} unidades
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5">1.420 total no ano</span>
              </div>

              <div className="p-3 rounded-lg bg-white border border-emerald-100 shadow-2xs">
                <span className="text-[11px] text-slate-500 font-medium block">Ticket Médio</span>
                <span className="text-lg font-bold text-slate-900 tabular-nums">
                  R$ 524,80
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Média 4.8 diárias</span>
              </div>

              <div className="p-3 rounded-lg bg-white border border-emerald-100 shadow-2xs">
                <span className="text-[11px] text-slate-500 font-medium block">Clientes na Base</span>
                <span className="text-lg font-bold text-slate-900 tabular-nums">
                  4.850 famílias
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5">42% recorrentes</span>
              </div>

              <div className="p-3 rounded-lg bg-white border border-emerald-100 shadow-2xs">
                <span className="text-[11px] text-slate-500 font-medium block">Conversão Web</span>
                <span className="text-lg font-bold text-slate-900 tabular-nums">
                  74.2%
                </span>
                <span className="text-[10px] text-emerald-600 font-semibold block mt-0.5">Alta intenção</span>
              </div>

              <div className="p-3 rounded-lg bg-white border border-emerald-100 shadow-2xs">
                <span className="text-[11px] text-slate-500 font-medium block">Margem Bruta</span>
                <span className="text-lg font-bold text-slate-900 tabular-nums">
                  42.8%
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5">EBITDA R$ 318k</span>
              </div>
            </div>
          </div>

          {/* Stop Case Side */}
          <div className="p-5 space-y-4 bg-amber-50/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <StopcaseLogo size={28} className="w-7 h-7" />
                <div>
                  <h3 className="text-base font-bold text-slate-900">Stop Case</h3>
                  <span className="text-xs text-amber-800 font-medium">
                    Guarda-Volumes Inteligente em Aeroportos (Lockers)
                  </span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                59.6% da Receita
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-lg bg-white border border-amber-100 shadow-2xs">
                <span className="text-[11px] text-slate-500 font-medium block">Faturamento Mês</span>
                <span className="text-lg font-bold text-slate-900 tabular-nums">
                  R$ {metrics.revenueStop.toLocaleString('pt-BR')}
                </span>
                <span className="text-[10px] text-amber-600 font-semibold block mt-0.5">
                  +21.8% vs mês ant.
                </span>
              </div>

              <div className="p-3 rounded-lg bg-white border border-amber-100 shadow-2xs">
                <span className="text-[11px] text-slate-500 font-medium block">Volumes Guardados</span>
                <span className="text-lg font-bold text-slate-900 tabular-nums">
                  {metrics.activeVolumes} malas hoje
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5">3.470 total mês</span>
              </div>

              <div className="p-3 rounded-lg bg-white border border-amber-100 shadow-2xs">
                <span className="text-[11px] text-slate-500 font-medium block">Ticket Médio</span>
                <span className="text-lg font-bold text-slate-900 tabular-nums">
                  R$ 89,60
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Período 9.2 horas</span>
              </div>

              <div className="p-3 rounded-lg bg-white border border-amber-100 shadow-2xs">
                <span className="text-[11px] text-slate-500 font-medium block">Clientes na Base</span>
                <span className="text-lg font-bold text-slate-900 tabular-nums">
                  7.580 viajantes
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5">18% corporativos B2B</span>
              </div>

              <div className="p-3 rounded-lg bg-white border border-amber-100 shadow-2xs">
                <span className="text-[11px] text-slate-500 font-medium block">Conversão Balcão/Web</span>
                <span className="text-lg font-bold text-slate-900 tabular-nums">
                  64.5%
                </span>
                <span className="text-[10px] text-amber-600 font-semibold block mt-0.5">Fluxo de passageiros</span>
              </div>

              <div className="p-3 rounded-lg bg-white border border-amber-100 shadow-2xs">
                <span className="text-[11px] text-slate-500 font-medium block">Margem Bruta</span>
                <span className="text-lg font-bold text-slate-900 tabular-nums">
                  58.3%
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5">EBITDA R$ 639k</span>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="p-5 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart 1: Evolução Mensal Comparativa (Recharts) */}
          <div className="lg:col-span-2 space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Evolução do Faturamento Mensal (2026)
                </h4>
                <p className="text-xs text-slate-500">
                  Histórico comparativo das duas marcas em relação à meta corporativa da holding
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="w-3 h-3 rounded-sm bg-emerald-500"></span> Torre
                </span>
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="w-3 h-3 rounded-sm bg-amber-500"></span> Stop Case
                </span>
              </div>
            </div>

            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MONTHLY_EVOLUTION} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <YAxis
                    tick={{ fontSize: 11, fill: '#64748b' }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(val) => `R$ ${(val / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    formatter={(value: any) => [`R$ ${Number(value).toLocaleString('pt-BR')}`, '']}
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                  />
                  <Bar dataKey="torre" name="Torre de Bebel" fill="#10b981" radius={[4, 4, 0, 0]} stackId="a" />
                  <Bar dataKey="stop" name="Stop Case" fill="#f59e0b" radius={[4, 4, 0, 0]} stackId="a" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Distribuição da Receita da Holding */}
          <div className="space-y-2 flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                Composição de Receita Holding
              </h4>
              <p className="text-xs text-slate-500">
                Divisão proporcional entre as verticais de negócio
              </p>
            </div>

            <div className="h-48 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={48}
                    outerRadius={75}
                    paddingAngle={3}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val: any) => [`R$ ${Number(val).toLocaleString('pt-BR')}`, '']}
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff', fontSize: '11px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Stop Case (Smart Lockers)
                </span>
                <span className="font-bold text-slate-900">59.6%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Torre de Bebel (Kids Travel)
                </span>
                <span className="font-bold text-slate-900">40.4%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. RANKING DAS 5 UNIDADES / CIDADES */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 text-[10px] font-bold uppercase tracking-wider">
                Desempenho Territorial
              </span>
              <h2 className="text-lg font-bold text-slate-900">
                Ranking das 5 Cidades e Unidades
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Resultados consolidados por praça aeroportuária com participação da Torre de Bebel e Stop Case.
            </p>
          </div>

          <div className="text-xs text-slate-500">
            Clique em uma praça para filtrar o dashboard
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/70 text-slate-600 uppercase font-bold text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Posição / Praça</th>
                <th className="py-3 px-4">Aeroporto</th>
                <th className="py-3 px-4 text-right">Torre de Bebel</th>
                <th className="py-3 px-4 text-right">Stop Case</th>
                <th className="py-3 px-4 text-right">Faturamento Total</th>
                <th className="py-3 px-4 text-center">Meta Atingida</th>
                <th className="py-3 px-4 text-right">Ticket Médio</th>
                <th className="py-3 px-4 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              {CITY_RANKINGS.map((city) => {
                const isSelected = selectedCity === city.cityId;
                return (
                  <tr
                    key={city.cityId}
                    className={`hover:bg-slate-50/80 transition-colors ${
                      isSelected ? 'bg-blue-50/50' : ''
                    }`}
                  >
                    <td className="py-3.5 px-4 flex items-center gap-2.5">
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                          city.rank === 1
                            ? 'bg-amber-100 text-amber-800 ring-2 ring-amber-400/40'
                            : city.rank === 2
                            ? 'bg-slate-200 text-slate-800'
                            : city.rank === 3
                            ? 'bg-amber-50 text-amber-900 border border-amber-300'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {city.rank}º
                      </span>
                      <div>
                        <span className="font-bold text-slate-900 block">{city.cityName}</span>
                        <span className="text-[10px] text-slate-400">Estado de {city.state}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-semibold text-[11px] border border-slate-200 mr-1.5">
                        {city.airportCode}
                      </span>
                      <span className="text-xs text-slate-500">
                        {city.cityId === 'cgh'
                          ? 'Congonhas'
                          : city.cityId === 'for'
                          ? 'Pinto Martins'
                          : city.cityId === 'ssa'
                          ? 'Dep. Luís Eduardo'
                          : city.cityId === 'rec'
                          ? 'Guararapes'
                          : 'Salgado Filho'}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right font-semibold text-emerald-700 tabular-nums">
                      R$ {city.revenueTorre.toLocaleString('pt-BR')}
                      <span className="block text-[10px] text-slate-400 font-normal">
                        {city.rentalsCount} locações
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right font-semibold text-amber-700 tabular-nums">
                      R$ {city.revenueStop.toLocaleString('pt-BR')}
                      <span className="block text-[10px] text-slate-400 font-normal">
                        {city.volumesCount} volumes
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right font-bold text-slate-900 tabular-nums">
                      R$ {city.revenueTotal.toLocaleString('pt-BR')}
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <div className="inline-flex items-center gap-1.5">
                        <div className="w-16 bg-slate-200 h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              city.targetPercent >= 90
                                ? 'bg-emerald-500'
                                : city.targetPercent >= 80
                                ? 'bg-blue-500'
                                : 'bg-amber-500'
                            }`}
                            style={{ width: `${city.targetPercent}%` }}
                          ></div>
                        </div>
                        <span className="font-bold text-slate-700 text-[11px] tabular-nums">
                          {city.targetPercent}%
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-right font-semibold text-slate-700 tabular-nums">
                      R$ {city.ticketAverage.toFixed(2)}
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => setSelectedCity(city.cityId)}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer border ${
                          isSelected
                            ? 'bg-blue-600 text-white border-blue-500'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                        }`}
                      >
                        {isSelected ? 'Filtrado' : 'Filtrar'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Bottom Row: Central de Alertas e Feed de Atividades */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alertas & Pendências */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Central de Pendências & Alertas
                </h3>
                <span className="text-[11px] text-slate-500">
                  Ocorrências operacionais que exigem atenção dos gestores
                </span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
              {CONSOLIDATED_ALERTS.length} Críticos
            </span>
          </div>

          <div className="space-y-2.5">
            {CONSOLIDATED_ALERTS.map((alert) => (
              <div
                key={alert.id}
                className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-slate-200 transition-all flex items-start justify-between gap-3"
              >
                <div className="flex items-start gap-2.5">
                  <div className="mt-0.5">
                    {alert.company === 'torre' ? (
                      <TorreDeBebelLogo size={16} />
                    ) : (
                      <StopcaseLogo size={16} className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{alert.title}</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-200 text-slate-700 font-medium">
                        {alert.cityName}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{alert.desc}</p>
                  </div>
                </div>

                <button className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shrink-0 cursor-pointer shadow-2xs">
                  {alert.actionText}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Feed de Atividades Recentes em Tempo Real */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Feed de Atividades Operacionais
                </h3>
                <span className="text-[11px] text-slate-500">
                  Fluxo ao vivo das 5 praças aeroportuárias
                </span>
              </div>
            </div>
            <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Ao vivo
            </span>
          </div>

          <div className="space-y-3">
            {CONSOLIDATED_ACTIVITIES.map((act) => (
              <div
                key={act.id}
                className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100 last:border-b-0 last:pb-0"
              >
                <div className="flex items-start gap-2.5">
                  <div className="mt-0.5">
                    {act.company === 'torre' ? (
                      <TorreDeBebelLogo size={16} />
                    ) : (
                      <StopcaseLogo size={16} className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{act.title}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded border font-semibold ${act.badgeColor}`}
                      >
                        {act.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{act.desc}</p>
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      {act.cityName} · {act.time}
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-bold text-slate-900 block">{act.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
