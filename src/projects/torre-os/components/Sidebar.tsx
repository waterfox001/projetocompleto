import React, { useState, useMemo } from 'react';
import {
  LayoutDashboard,
  Target,
  LineChart,
  Bell,
  Users,
  UserPlus,
  Filter,
  Clock,
  FileText,
  Award,
  CalendarCheck,
  CalendarDays,
  Calendar,
  CalendarClock,
  Layers,
  Truck,
  RotateCcw,
  Sparkles,
  Wrench,
  AlertTriangle,
  Package,
  Boxes,
  SearchCode,
  Cpu,
  TrendingUp,
  ShoppingCart,
  Building2,
  History,
  Crown,
  Smile,
  UserMinus,
  DollarSign,
  ArrowDownLeft,
  ArrowUpRight,
  Coins,
  Scale,
  ShieldCheck,
  AlertCircle,
  BarChart2,
  FileSpreadsheet,
  Percent,
  MapPin,
  Navigation,
  Compass,
  UserCheck,
  Gauge,
  CheckSquare,
  Zap,
  Shield,
  FileSearch,
  BarChart3,
  Trophy,
  Share2,
  PieChart,
  Megaphone,
  Sliders,
  Store,
  Globe,
  Lock,
  ChevronDown,
  ChevronRight,
  Search,
  Check,
  PanelLeftClose,
  PanelLeft,
  X,
  Baby
} from 'lucide-react';
import { TorreDeBebelLogo } from './TorreDeBebelLogo';
import { useApp } from '../context/AppContext';
import { ViewMode } from '../types';

interface SidebarItem {
  id: ViewMode;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badgeKey?: string;
  badgeColor?: string;
}

interface SidebarCategory {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  items: SidebarItem[];
}

export const Sidebar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    rentals,
    reservations,
    sanitizations,
    maintenances,
    returns,
    alerts,
    currentUserRole
  } = useApp();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('Matriz São Paulo · Pinheiros');
  const [isBranchDropdownOpen, setIsBranchDropdownOpen] = useState(false);

  // Collapsible categories state - default open for high visibility
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    visao_geral: true,
    comercial: false,
    operacao: true,
    estoque: true,
    clientes: false,
    financeiro: false,
    logistica: false,
    gestao: false,
    relatorios: false,
    marketing: false,
    automacoes: false,
    portal_cliente: false,
    documentos: false,
    configuracoes: false
  });

  const delayedRentals = rentals.filter(r => r.status === 'atrasada').length;
  const pendingReservations = reservations.filter(r => r.status === 'aguardando_pagamento' || r.status === 'reservada').length;
  const inSanitization = sanitizations.filter(s => s.status !== 'concluido').length;
  const inMaintenance = maintenances.filter(m => m.status !== 'concluida').length;
  const pendingReturns = returns.filter(ret => ret.status === 'pendente_conferencia').length;
  const activeAlerts = alerts.filter(a => a.type === 'critical' || a.type === 'warning').length;

  const getBadgeValue = (key?: string) => {
    switch (key) {
      case 'delayed':
        return delayedRentals > 0 ? delayedRentals : undefined;
      case 'pendingReservations':
        return pendingReservations > 0 ? pendingReservations : undefined;
      case 'sanitization':
        return inSanitization > 0 ? inSanitization : undefined;
      case 'maintenance':
        return inMaintenance > 0 ? inMaintenance : undefined;
      case 'returns':
        return pendingReturns > 0 ? pendingReturns : undefined;
      case 'alerts':
        return activeAlerts > 0 ? activeAlerts : undefined;
      default:
        return undefined;
    }
  };

  const categories: SidebarCategory[] = useMemo(() => [
    {
      id: 'visao_geral',
      name: 'Visão Geral',
      icon: LayoutDashboard,
      items: [
        { id: 'dashboard', label: 'Painel Geral', icon: LayoutDashboard },
        { id: 'executive_dashboard', label: 'Dashboard Executivo', icon: BarChart3 },
        { id: 'okrs_goals', label: 'Metas & OKRs', icon: Target },
        { id: 'business_intelligence', label: 'Inteligência Empresarial', icon: LineChart },
        { id: 'alerts_center', label: 'Central de Alertas', icon: Bell, badgeKey: 'alerts', badgeColor: 'bg-rose-50 text-rose-700 border border-rose-200' }
      ]
    },
    {
      id: 'operacao',
      name: 'Operação Central',
      icon: CalendarCheck,
      items: [
        { id: 'rentals', label: 'Locações Ativas', icon: CalendarCheck, badgeKey: 'delayed', badgeColor: 'bg-rose-50 text-rose-700 border border-rose-200' },
        { id: 'reservations', label: 'Reservas Futuras', icon: CalendarDays, badgeKey: 'pendingReservations', badgeColor: 'bg-blue-50 text-blue-700 border border-blue-200' },
        { id: 'calendar', label: 'Grade & Calendário', icon: Calendar },
        { id: 'agenda', label: 'Agenda Operacional', icon: CalendarClock },
        { id: 'operational_hub', label: 'Central de Despacho', icon: Layers },
        { id: 'deliveries', label: 'Entregas & Rotas', icon: Truck },
        { id: 'returns', label: 'Devoluções & Check', icon: RotateCcw, badgeKey: 'returns', badgeColor: 'bg-amber-50 text-amber-700 border border-amber-200' },
        { id: 'sanitization', label: 'Higienização & Vapor', icon: Sparkles, badgeKey: 'sanitization', badgeColor: 'bg-emerald-50 text-emerald-700 border border-emerald-200' },
        { id: 'maintenance', label: 'Manutenção & O.S.', icon: Wrench, badgeKey: 'maintenance', badgeColor: 'bg-purple-50 text-purple-700 border border-purple-200' },
        { id: 'damages_incidents', label: 'Avarias & Ocorrências', icon: AlertTriangle }
      ]
    },
    {
      id: 'estoque',
      name: 'Estoque & Ativos',
      icon: Package,
      items: [
        { id: 'inventory', label: 'Estoque Unitário', icon: Package },
        { id: 'products_assets', label: 'Catálogo de Produtos', icon: Boxes },
        { id: 'categories', label: 'Categorias & Famílias', icon: Layers },
        { id: 'availability', label: 'Consulta de Datas', icon: SearchCode },
        { id: 'inventory_intelligence', label: 'Giro & Ociosidade', icon: Cpu },
        { id: 'demand_forecast', label: 'Previsão de Demanda', icon: TrendingUp },
        { id: 'purchases_restock', label: 'Compras & Reposição', icon: ShoppingCart },
        { id: 'suppliers', label: 'Fornecedores Homologados', icon: Building2 }
      ]
    },
    {
      id: 'comercial',
      name: 'Comercial & CRM',
      icon: Users,
      items: [
        { id: 'commercial_crm', label: 'CRM & Funil', icon: Users },
        { id: 'leads', label: 'Leads Qualificados', icon: UserPlus },
        { id: 'sales_pipeline', label: 'Pipeline de Vendas', icon: Filter },
        { id: 'follow_ups', label: 'Follow-ups Agendados', icon: Clock },
        { id: 'proposals', label: 'Propostas & Orçamentos', icon: FileText },
        { id: 'commercial_goals', label: 'Metas Comerciais', icon: Award }
      ]
    },
    {
      id: 'clientes',
      name: 'Clientes & 360°',
      icon: Users,
      items: [
        { id: 'customer_360', label: 'Dossiê do Cliente', icon: Users },
        { id: 'rental_history', label: 'Histórico & Contratos', icon: History },
        { id: 'loyalty_program', label: 'Clube de Fidelidade', icon: Crown },
        { id: 'nps_satisfaction', label: 'NPS & Avaliações', icon: Smile },
        { id: 'inactive_customers', label: 'Clientes Inativos', icon: UserMinus },
        { id: 'vip_customers', label: 'Clientes VIP', icon: Award }
      ]
    },
    {
      id: 'financeiro',
      name: 'Financeiro ERP',
      icon: DollarSign,
      items: [
        { id: 'financial', label: 'Visão Geral Caixa', icon: DollarSign },
        { id: 'accounts_receivable', label: 'Contas a Receber', icon: ArrowDownLeft },
        { id: 'accounts_payable', label: 'Contas a Pagar', icon: ArrowUpRight },
        { id: 'cash_flow', label: 'Fluxo Previsto vs Real', icon: Coins },
        { id: 'income_expenses', label: 'Receitas x Despesas', icon: Scale },
        { id: 'deposits_held', label: 'Controle de Cauções', icon: ShieldCheck },
        { id: 'overdue_defaults', label: 'Inadimplência & Cobrança', icon: AlertCircle },
        { id: 'profitability', label: 'Rentabilidade do Acervo', icon: BarChart2 },
        { id: 'dre_statement', label: 'DRE Gerencial', icon: FileSpreadsheet },
        { id: 'commissions', label: 'Comissões & Parcerias', icon: Percent }
      ]
    },
    {
      id: 'logistica',
      name: 'Logística & Frota',
      icon: Truck,
      items: [
        { id: 'logistics_map', label: 'Mapa de Entregas', icon: MapPin },
        { id: 'driver_tracking', label: 'Rastreio em Tempo Real', icon: Navigation },
        { id: 'routes_logistics', label: 'Roteirização Inteligente', icon: Compass },
        { id: 'drivers_list', label: 'Motoristas & Veículos', icon: UserCheck },
        { id: 'logistics_incidents', label: 'Ocorrências em Rota', icon: AlertTriangle },
        { id: 'logistics_performance', label: 'Tempo & SLA de Entrega', icon: Gauge }
      ]
    },
    {
      id: 'gestao',
      name: 'Gestão & Equipe',
      icon: Shield,
      items: [
        { id: 'team', label: 'Equipe & Colaboradores', icon: Users },
        { id: 'roles_permissions', label: 'Cargos & Permissões', icon: Lock },
        { id: 'tasks_management', label: 'Gestão de Tarefas', icon: CheckSquare },
        { id: 'productivity', label: 'Produtividade Operacional', icon: Zap },
        { id: 'audit_logs', label: 'Auditoria de Ações', icon: FileSearch }
      ]
    },
    {
      id: 'relatorios',
      name: 'Relatórios & BI',
      icon: BarChart3,
      items: [
        { id: 'reports', label: 'Central de Relatórios', icon: BarChart3 },
        { id: 'bi_analytics', label: 'BI Executivo 360°', icon: LineChart },
        { id: 'bi_financial', label: 'BI Financeiro', icon: DollarSign },
        { id: 'bi_commercial', label: 'BI Comercial', icon: Users },
        { id: 'bi_inventory', label: 'BI Estoque & Ativos', icon: Package },
        { id: 'bi_operational', label: 'BI Operação & Prazos', icon: CalendarCheck },
        { id: 'bi_customers', label: 'BI Clientes & Retenção', icon: HeartHandshakeFallback },
        { id: 'bi_logistics', label: 'BI Logística & Custos', icon: Truck },
        { id: 'rankings_kpis', label: 'Rankings & Mais Alugados', icon: Trophy }
      ]
    },
    {
      id: 'marketing',
      name: 'Marketing & Origem',
      icon: Megaphone,
      items: [
        { id: 'marketing_origins', label: 'Canais de Aquisição', icon: Megaphone },
        { id: 'acquisition_channels', label: 'Origem dos Leads', icon: Share2 },
        { id: 'conversion_funnel', label: 'Funil de Conversão', icon: Filter },
        { id: 'channel_roi', label: 'CAC & ROI por Canal', icon: PieChart },
        { id: 'marketing_campaigns', label: 'Campanhas & Parcerias', icon: Award }
      ]
    },
    {
      id: 'automacoes',
      name: 'Automações & Regras',
      icon: Zap,
      items: [
        { id: 'automations', label: 'Painel de Automações', icon: Zap },
        { id: 'business_rules', label: 'Regras de Bloqueio', icon: Sliders },
        { id: 'system_notifications', label: 'Disparo de Mensagens', icon: Bell },
        { id: 'automated_reminders', label: 'Lembretes de Devolução', icon: Clock }
      ]
    },
    {
      id: 'portal_cliente',
      name: 'Portal do Cliente',
      icon: Store,
      items: [
        { id: 'customer_store', label: 'Vitrine Online (Catálogo)', icon: Store },
        { id: 'online_booking', label: 'Simulador de Reserva', icon: Globe },
        { id: 'customer_account', label: 'Área do Cliente (Painel)', icon: Users },
        { id: 'customer_contracts', label: 'Assinatura de Contrato', icon: FileText },
        { id: 'tracking_delivery', label: 'Acompanhar Pedido', icon: Truck }
      ]
    },
    {
      id: 'documentos',
      name: 'Documentos & Cofre',
      icon: FileText,
      items: [
        { id: 'documents_vault', label: 'Cofre de Documentos', icon: FileText },
        { id: 'contracts_docs', label: 'Modelos de Contrato', icon: FileText },
        { id: 'invoices_nf', label: 'Notas Fiscais & Recibos', icon: FileSpreadsheet },
        { id: 'inspection_photos', label: 'Fotos de Vistoria', icon: Package }
      ]
    },
    {
      id: 'configuracoes',
      name: 'Configurações ERP',
      icon: Sliders,
      items: [
        { id: 'company_settings', label: 'Dados da Empresa', icon: Building2 },
        { id: 'users_settings', label: 'Usuários do Sistema', icon: Users },
        { id: 'pricing_settings', label: 'Políticas de Preço', icon: DollarSign },
        { id: 'policies_settings', label: 'Termos & Cauções', icon: ShieldCheck },
        { id: 'integrations_settings', label: 'Integrações (WhatsApp/PIX)', icon: Zap }
      ]
    }
  ], []);

  // Filtered categories when search is active
  const filteredCategories = useMemo(() => {
    if (!searchTerm.trim()) return categories;
    const term = searchTerm.toLowerCase();
    return categories
      .map(cat => ({
        ...cat,
        items: cat.items.filter(item => item.label.toLowerCase().includes(term))
      }))
      .filter(cat => cat.items.length > 0);
  }, [categories, searchTerm]);

  const toggleCategory = (catId: string) => {
    setOpenCategories(prev => ({
      ...prev,
      [catId]: !prev[catId]
    }));
  };

  const branches = [
    'Matriz São Paulo · Pinheiros',
    'Filial Rio · Barra da Tijuca',
    'Filial Campinas · Cambuí'
  ];

  return (
    <aside
      className={`bg-white text-slate-700 flex flex-col sticky top-[96px] h-[calc(100vh-96px)] border-r border-slate-200/90 shrink-0 select-none transition-all duration-300 z-20 shadow-[1px_0_4px_rgba(0,0,0,0.02)] ${
        isCollapsed ? 'w-18' : 'w-72'
      }`}
    >
      {/* Brand Header */}
      <div className="p-3.5 border-b border-slate-200/80 flex items-center justify-between bg-white">
        {!isCollapsed ? (
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-white border border-slate-200/90 flex items-center justify-center p-1 shadow-xs hover:shadow-sm transition-shadow">
              <TorreDeBebelLogo size={32} />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-bold text-sm tracking-tight text-slate-900">Torre de Bebel</span>
                <span className="text-[9px] font-semibold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200 font-mono">
                  ERP
                </span>
              </div>
              <div className="text-[10px] text-slate-500 truncate max-w-[130px]">
                Operação Infantil
              </div>
            </div>
          </div>
        ) : (
          <div className="mx-auto w-9 h-9 rounded-xl bg-white border border-slate-200/90 flex items-center justify-center p-1 shadow-xs" title="Torre de Bebel ERP">
            <TorreDeBebelLogo size={30} />
          </div>
        )}

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          title={isCollapsed ? 'Expandir barra lateral' : 'Recolher barra lateral'}
        >
          {isCollapsed ? <PanelLeft className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
        </button>
      </div>

      {/* Branch / Unit Switcher (When not collapsed) */}
      {!isCollapsed && (
        <div className="px-3 pt-2.5 pb-1 relative bg-white">
          <button
            onClick={() => setIsBranchDropdownOpen(!isBranchDropdownOpen)}
            className="w-full flex items-center justify-between px-2.5 py-1.5 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-lg text-xs text-slate-800 transition-colors"
          >
            <div className="flex items-center space-x-2 truncate">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 ring-2 ring-emerald-500/20 shrink-0" />
              <span className="truncate text-[11px] font-medium text-slate-800">{selectedBranch}</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          </button>

          {isBranchDropdownOpen && (
            <div className="absolute top-11 left-3 right-3 bg-white border border-slate-200 rounded-lg shadow-xl z-50 py-1 text-xs">
              {branches.map(branch => (
                <button
                  key={branch}
                  onClick={() => {
                    setSelectedBranch(branch);
                    setIsBranchDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-slate-50 transition-colors ${
                    selectedBranch === branch ? 'text-blue-600 font-semibold bg-blue-50/50' : 'text-slate-700'
                  }`}
                >
                  <span className="truncate text-[11px]">{branch}</span>
                  {selectedBranch === branch && <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Quick Filter Search */}
      {!isCollapsed && (
        <div className="px-3 pt-2 pb-2 bg-white">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Filtrar módulos (/)"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-7 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-sans"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-2 top-2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Navigation Groups */}
      <div className="flex-1 overflow-y-auto px-2 py-2 space-y-1 bg-white">
        {filteredCategories.map(cat => {
          const isOpen = searchTerm ? true : openCategories[cat.id];
          const hasActiveItem = cat.items.some(it => it.id === currentView);

          if (isCollapsed) {
            // Collapsed Rail View: Display category icon
            return (
              <div key={cat.id} className="relative group flex justify-center py-1">
                <button
                  onClick={() => {
                    setCurrentView(cat.items[0].id);
                  }}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                    hasActiveItem
                      ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-2xs font-bold'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                  title={cat.name}
                >
                  <cat.icon className="w-4.5 h-4.5 stroke-[1.8]" />
                </button>
              </div>
            );
          }

          return (
            <div key={cat.id} className="pt-1">
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(cat.id)}
                className="w-full flex items-center justify-between px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 hover:text-slate-700 transition-colors rounded-md group"
              >
                <div className="flex items-center space-x-2">
                  <cat.icon className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600" />
                  <span>{cat.name}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-[9px] text-slate-400 font-mono">{cat.items.length}</span>
                  {isOpen ? (
                    <ChevronDown className="w-3 h-3 text-slate-400" />
                  ) : (
                    <ChevronRight className="w-3 h-3 text-slate-400" />
                  )}
                </div>
              </button>

              {/* Category Items */}
              {isOpen && (
                <div className="mt-0.5 space-y-0.5 pl-1.5">
                  {cat.items.map(item => {
                    const isActive = currentView === item.id;
                    const badgeVal = getBadgeValue(item.badgeKey);

                    return (
                      <button
                        key={item.id}
                        onClick={() => setCurrentView(item.id)}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 text-xs font-medium rounded-lg transition-all text-left ${
                          isActive
                            ? 'bg-blue-50 text-blue-700 border border-blue-200/80 font-semibold shadow-2xs'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                        }`}
                      >
                        <div className="flex items-center space-x-2.5 min-w-0">
                          <item.icon
                            className={`w-3.5 h-3.5 shrink-0 transition-colors ${
                              isActive ? 'text-blue-600 stroke-[2.2]' : 'text-slate-400'
                            }`}
                          />
                          <span className="truncate text-[12px]">{item.label}</span>
                        </div>

                        {badgeVal !== undefined && (
                          <span
                            className={`text-[10px] font-semibold tabular-nums px-1.5 py-0.2 rounded-md ${
                              item.badgeColor || 'bg-slate-100 text-slate-600 border border-slate-200'
                            }`}
                          >
                            {badgeVal}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Profile / Tenant Status */}
      <div className="p-3 border-t border-slate-200/90 bg-slate-50/80">
        {!isCollapsed ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2.5 min-w-0">
              <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold ring-1 ring-blue-700/20 shrink-0">
                IS
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-slate-900 truncate">
                  Isabela
                </div>
                <div className="text-[10px] text-slate-500 flex items-center gap-1 font-mono">
                  <span>Gestora · {currentUserRole}</span>
                  <span>·</span>
                  <span className="text-emerald-600 font-medium">Ativo</span>
                </div>
              </div>
            </div>

            <div className="w-2 h-2 rounded-full bg-emerald-500" title="Servidor Cloud Conectado" />
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" title="Sistema Conectado" />
          </div>
        )}
      </div>
    </aside>
  );
};

// Fallback icon helper
const HeartHandshakeFallback: React.FC<{ className?: string }> = ({ className }) => (
  <Users className={className} />
);
