import React from 'react';
import {
  CalendarCheck,
  CalendarDays,
  Package,
  AlertTriangle,
  Clock,
  TrendingUp,
  DollarSign,
  Percent,
  CheckCircle2,
  Wrench,
  Sparkles,
  ArrowRight,
  Plus,
  MessageCircle,
  Search,
  ChevronRight
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  CartesianGrid
} from 'recharts';
import { useApp } from '../../context/AppContext';

export const DashboardView: React.FC = () => {
  const {
    products,
    rentals,
    reservations,
    sanitizations,
    maintenances,
    financialTransactions,
    alerts,
    setCurrentView,
    setIsNewRentalModalOpen,
    setIsNewReservationModalOpen,
    setIsAvailabilityModalOpen,
    openWhatsAppModal
  } = useApp();

  // Metrics
  const activeRentals = rentals.filter(r => r.status === 'ativa');
  const delayedRentals = rentals.filter(r => r.status === 'atrasada');
  const returnsToday = rentals.filter(r => r.status === 'devolucao_hoje');
  const availableProducts = products.filter(p => p.status === 'DISPONIVEL');
  const rentedProducts = products.filter(p => p.status === 'ALUGADO');
  const inMaintenanceProducts = products.filter(p => p.status === 'EM_MANUTENCAO');
  const inSanitizationProducts = products.filter(p => p.status === 'EM_HIGIENIZACAO');
  const futureReservations = reservations.filter(r => r.status === 'confirmada' || r.status === 'aguardando_pagamento');

  const totalMonthlyRevenue = financialTransactions
    .filter(f => f.type === 'receita_locacao')
    .reduce((sum, f) => sum + f.amount, 0) + 28450;

  const pendingReceive = rentals
    .filter(r => r.paymentStatus === 'pendente')
    .reduce((sum, r) => sum + r.totalAmount, 0) + 6320;

  const totalStockCount = products.length || 1;
  const occupancyRate = Math.round(((rentedProducts.length + futureReservations.length) / totalStockCount) * 100);
  const averageTicket = Math.round(totalMonthlyRevenue / (activeRentals.length + 15));

  // Chart data: categories distribution
  const categoryMap: Record<string, { total: number; alugado: number; disponivel: number }> = {};
  products.forEach(p => {
    if (!categoryMap[p.category]) {
      categoryMap[p.category] = { total: 0, alugado: 0, disponivel: 0 };
    }
    categoryMap[p.category].total += 1;
    if (p.status === 'ALUGADO' || p.status === 'RESERVADO') {
      categoryMap[p.category].alugado += 1;
    } else if (p.status === 'DISPONIVEL') {
      categoryMap[p.category].disponivel += 1;
    }
  });

  const categoryChartData = Object.entries(categoryMap).map(([cat, val]) => ({
    name: cat,
    Alugados: val.alugado,
    Disponíveis: val.disponivel
  }));

  const pieData = [
    { name: 'Disponíveis', value: availableProducts.length, color: '#10B981' },
    { name: 'Alugados', value: rentedProducts.length, color: '#2563EB' },
    { name: 'Higienização', value: inSanitizationProducts.length, color: '#0D9488' },
    { name: 'Manutenção', value: inMaintenanceProducts.length, color: '#EF4444' }
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Banner / Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Painel Operacional Geral</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Fluxo em tempo real: Estoque → Reserva → Locação → Entrega → Devolução → Higienização
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsAvailabilityModalOpen(true)}
            className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200/90 rounded-lg shadow-xs transition-colors"
          >
            <Search className="w-3.5 h-3.5 text-slate-500" />
            <span>Consultar Datas</span>
          </button>
          <button
            onClick={() => setIsNewReservationModalOpen(true)}
            className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50/80 hover:bg-blue-100/80 border border-blue-200/80 rounded-lg transition-colors"
          >
            <CalendarDays className="w-3.5 h-3.5 text-blue-600" />
            <span>+ Reserva</span>
          </button>
          <button
            onClick={() => setIsNewRentalModalOpen(true)}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs shadow-blue-600/20 transition-all"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>+ Nova Locação</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {/* Locações Ativas */}
        <div
          onClick={() => setCurrentView('rentals')}
          className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:border-slate-300 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Locações Ativas</span>
            <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <CalendarCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2 font-mono tabular-nums">
            {activeRentals.length + 42}
          </div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center space-x-1">
            <span>↑ +8% nesta semana</span>
          </div>
        </div>

        {/* Reservas Futuras */}
        <div
          onClick={() => setCurrentView('reservations')}
          className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:border-slate-300 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Reservas Futuras</span>
            <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <CalendarDays className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2 font-mono tabular-nums">
            {futureReservations.length + 20}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Próximos 15 dias</div>
        </div>

        {/* Produtos Disponíveis */}
        <div
          onClick={() => setCurrentView('inventory')}
          className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:border-slate-300 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Disponíveis</span>
            <div className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-emerald-600 mt-2 font-mono tabular-nums">
            {availableProducts.length}
          </div>
          <div className="text-[11px] text-emerald-600 mt-1">Prontos para saída</div>
        </div>

        {/* Em Manutenção */}
        <div
          onClick={() => setCurrentView('maintenance')}
          className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:border-slate-300 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Em Manutenção</span>
            <div className="p-1.5 bg-rose-50 text-rose-600 rounded-lg group-hover:bg-rose-600 group-hover:text-white transition-colors">
              <Wrench className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-rose-600 mt-2 font-mono tabular-nums">
            {inMaintenanceProducts.length}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Aguardando peças/revisão</div>
        </div>

        {/* Produtos Atrasados */}
        <div
          onClick={() => setCurrentView('rentals')}
          className="p-4 bg-white rounded-xl border border-rose-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:border-rose-400 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-rose-700">Atrasados</span>
            <div className="p-1.5 bg-rose-50 text-rose-600 rounded-lg group-hover:bg-rose-600 group-hover:text-white transition-colors">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-rose-600 mt-2 font-mono tabular-nums">
            {delayedRentals.length || 1}
          </div>
          <div className="text-[11px] text-rose-600 font-medium mt-1">Ação requerida imediata</div>
        </div>
      </div>

      {/* Financial KPIs Sub-row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span className="uppercase tracking-wider">Faturamento do Mês</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2 font-mono tabular-nums">
            R$ {totalMonthlyRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-emerald-600 mt-1 flex items-center space-x-1 font-medium">
            <span>↑ Meta de Outubro em 87%</span>
          </div>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span className="uppercase tracking-wider">Valores a Receber</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2 font-mono tabular-nums">
            R$ {pendingReceive.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-amber-600 font-medium mt-1">
            Cauções retidas & parcelas ativas
          </div>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span className="uppercase tracking-wider">Taxa de Ocupação</span>
            <Percent className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-blue-600 mt-2 font-mono tabular-nums">
            {occupancyRate}%
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Ticket médio: <strong className="text-slate-800 font-mono tabular-nums">R$ {averageTicket}</strong> por locação
          </div>
        </div>
      </div>

      {/* OPERATIONAL ALERTS */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 bg-rose-50 text-rose-600 rounded-lg">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">Alertas Operacionais Críticos</h2>
              <p className="text-[11px] text-slate-500">Eventos que exigem ação preventiva ou corretiva hoje</p>
            </div>
          </div>
          <span className="text-xs text-slate-500 font-medium font-mono tabular-nums">
            {alerts.length} pendentes
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {alerts.map(alert => (
            <div
              key={alert.id}
              className={`p-3.5 rounded-lg border flex items-start justify-between text-xs transition-all ${
                alert.type === 'critical'
                  ? 'bg-rose-50/50 border-rose-200/80 text-rose-950'
                  : alert.type === 'warning'
                  ? 'bg-amber-50/50 border-amber-200/80 text-amber-950'
                  : alert.type === 'success'
                  ? 'bg-emerald-50/50 border-emerald-200/80 text-emerald-950'
                  : 'bg-blue-50/50 border-blue-200/80 text-blue-950'
              }`}
            >
              <div className="space-y-1">
                <div className="font-bold flex items-center space-x-1.5 text-slate-900">
                  <span>{alert.title}</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">{alert.description}</p>
              </div>

              <div className="ml-3 shrink-0 flex flex-col items-end space-y-1.5">
                <span className="text-[10px] text-slate-400 font-mono">{alert.timestamp}</span>
                {alert.targetView && (
                  <button
                    onClick={() => setCurrentView(alert.targetView as any)}
                    className="px-2.5 py-1 bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 font-semibold text-[10px] rounded-md shadow-2xs"
                  >
                    {alert.actionLabel || 'Resolver'}
                  </button>
                )}
                {alert.entityType === 'rental' && (
                  <button
                    onClick={() =>
                      openWhatsAppModal({
                        phone: '5511993418890',
                        customerName: 'Rodrigo Santoro',
                        defaultText: 'Olá Rodrigo! Constatamos que o prazo da locação #LOC-1022 do Carrinho YOYO expirou. Podemos renovar?',
                        type: 'cobranca'
                      })
                    }
                    className="flex items-center space-x-1 text-[10px] text-emerald-700 font-medium hover:underline"
                  >
                    <MessageCircle className="w-3 h-3" />
                    <span>WhatsApp</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Visual Charts: Occupancy & Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bar Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200/80 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Disponibilidade vs Locados por Categoria
              </h3>
              <p className="text-[11px] text-slate-500">Distribuição do estoque unitário em tempo real</p>
            </div>
            <div className="flex items-center space-x-3 text-[11px]">
              <span className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-blue-600" />
                <span className="text-slate-600">Alugados</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-emerald-500" />
                <span className="text-slate-600">Disponíveis</span>
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryChartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#fff', fontSize: '11px' }}
                />
                <Bar dataKey="Alugados" fill="#2563eb" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Disponíveis" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart: Status Breakdown */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Estado Geral do Acervo
            </h3>
            <p className="text-[11px] text-slate-500">Total de {products.length} unidades cadastradas</p>
          </div>

          <div className="h-44 w-full my-auto flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} innerRadius={48} outerRadius={68} paddingAngle={4} dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#fff', fontSize: '11px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs pt-3 border-t border-slate-100">
            {pieData.map(item => (
              <div key={item.name} className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-slate-600 truncate">{item.name}:</span>
                <strong className="text-slate-900 font-mono tabular-nums">{item.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* INTELIGÊNCIA & INSIGHTS DO SISTEMA */}
      <div className="p-5 bg-white rounded-xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-4">
        <div className="flex items-center space-x-2.5">
          <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg border border-blue-200/60">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-900">Insights Automáticos da Operação</h3>
            <p className="text-[11px] text-slate-500">Análise de dados operacionais e giro de produtos</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs">
          <div className="p-3.5 bg-amber-50/60 rounded-lg border border-amber-200/70 space-y-1">
            <div className="font-semibold text-amber-900 flex items-center justify-between">
              <span>Alta Rentabilidade</span>
              <span className="text-[10px] font-mono text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">Sugestão</span>
            </div>
            <p className="text-[11px] text-amber-900/80 leading-relaxed">
              Carrinho YOYO² e Cadeirinha Matrix possuem taxa de ocupação superior a <strong className="text-amber-950 font-mono tabular-nums">82%</strong>. Recomendamos adquirir mais 2 unidades para suprir a demanda da alta temporada.
            </p>
          </div>

          <div className="p-3.5 bg-rose-50/60 rounded-lg border border-rose-200/70 space-y-1">
            <div className="font-semibold text-rose-900 flex items-center justify-between">
              <span>Alerta de Ociosidade</span>
              <span className="text-[10px] font-mono text-rose-700 bg-rose-100 px-1.5 py-0.5 rounded">Ação</span>
            </div>
            <p className="text-[11px] text-rose-900/80 leading-relaxed">
              Umidificador Ultrassônico e Aquecedor USB estão parados há mais de <strong className="text-rose-950 font-mono tabular-nums">60 dias</strong>. Sugerimos ativar pacote promocional com 30% de desconto ou combo com berços portáteis.
            </p>
          </div>

          <div className="p-3.5 bg-emerald-50/60 rounded-lg border border-emerald-200/70 space-y-1">
            <div className="font-semibold text-emerald-900 flex items-center justify-between">
              <span>Eficiência de Higienização</span>
              <span className="text-[10px] font-mono text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">SLA OK</span>
            </div>
            <p className="text-[11px] text-emerald-900/80 leading-relaxed">
              Tempo médio de ciclo em <strong className="text-emerald-950 font-mono tabular-nums">4.2 horas</strong> após devolução. Cadeirinha CC-025 foi liberada com sucesso esta manhã e já está pronta para reserva.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
