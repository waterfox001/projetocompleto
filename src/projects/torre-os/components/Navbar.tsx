import React, { useState } from 'react';
import {
  Search,
  Plus,
  Bell,
  Sparkles,
  Shield,
  HelpCircle,
  CalendarPlus,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  ChevronRight,
  User,
  Sliders,
  X,
  ExternalLink,
  Keyboard
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface NavbarProps {
  onOpenAI: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAI }) => {
  const {
    alerts,
    dismissAlert,
    currentView,
    setCurrentView,
    currentUserRole,
    setCurrentUserRole,
    setIsSearchModalOpen,
    setIsNewRentalModalOpen,
    setIsNewReservationModalOpen,
    setIsAvailabilityModalOpen,
    resetToInitialData
  } = useApp();

  const [isAlertsDropdownOpen, setIsAlertsDropdownOpen] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const roles = ['OWNER', 'GERENTE', 'OPERACIONAL', 'FINANCEIRO', 'ATENDENTE'];

  // Breadcrumb mapping
  const getBreadcrumbs = () => {
    switch (currentView) {
      case 'dashboard':
      case 'alerts_center':
        return { section: 'Visão Geral', page: 'Painel Geral' };
      case 'executive_dashboard':
        return { section: 'Visão Geral', page: 'Dashboard Executivo' };
      case 'okrs_goals':
        return { section: 'Visão Geral', page: 'Metas & OKRs' };
      case 'business_intelligence':
        return { section: 'Visão Geral', page: 'Inteligência Empresarial' };
      case 'commercial_crm':
      case 'leads':
      case 'sales_pipeline':
      case 'proposals':
        return { section: 'Comercial', page: 'Pipeline de Vendas' };
      case 'rentals':
        return { section: 'Operação', page: 'Locações Ativas' };
      case 'reservations':
        return { section: 'Operação', page: 'Reservas Futuras' };
      case 'calendar':
        return { section: 'Operação', page: 'Grade & Calendário' };
      case 'deliveries':
        return { section: 'Operação', page: 'Entregas & Rotas' };
      case 'returns':
        return { section: 'Operação', page: 'Devoluções & Check' };
      case 'sanitization':
        return { section: 'Operação', page: 'Higienização & Esterilização' };
      case 'maintenance':
        return { section: 'Operação', page: 'Manutenção & O.S.' };
      case 'inventory':
      case 'products_assets':
        return { section: 'Estoque', page: 'Estoque Unitário' };
      case 'availability':
        return { section: 'Estoque', page: 'Consulta de Datas' };
      case 'customer_360':
      case 'customers':
        return { section: 'Clientes', page: 'Dossiê do Cliente' };
      case 'financial':
      case 'cash_flow':
        return { section: 'Financeiro', page: 'Painel Financeiro' };
      case 'logistics_map':
        return { section: 'Logística', page: 'Mapa em Tempo Real' };
      case 'automations':
        return { section: 'Automações', page: 'Fluxos Automáticos' };
      case 'company_settings':
      case 'users_settings':
      case 'pricing_settings':
      case 'policies_settings':
      case 'integrations_settings':
        return { section: 'Configurações', page: 'Parâmetros Gerais' };
      default:
        return { section: 'Sistema', page: 'Visão Executiva' };
    }
  };

  const breadcrumbs = getBreadcrumbs();
  const unreadAlerts = alerts.filter(a => a.type === 'critical' || a.type === 'warning');

  return (
    <header className="h-14 bg-white border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between z-20 shrink-0">
      {/* Left: Breadcrumbs & Context */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center text-xs text-slate-500 font-medium">
          <span className="text-slate-400 hover:text-slate-600 transition-colors">
            {breadcrumbs.section}
          </span>
          <ChevronRight className="w-3.5 h-3.5 mx-1.5 text-slate-400" />
          <span className="text-slate-900 font-semibold">{breadcrumbs.page}</span>
        </div>

        {/* Live sync indicator */}
        <div className="hidden lg:flex items-center space-x-1.5 pl-3 border-l border-slate-200 text-[11px] text-slate-500 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-emerald-500/20" />
          <span className="text-slate-600">Online</span>
        </div>
      </div>

      {/* Center: Global Search trigger */}
      <div className="hidden md:flex items-center max-w-sm w-72 lg:w-96 mx-4">
        <button
          onClick={() => setIsSearchModalOpen(true)}
          className="w-full flex items-center justify-between px-3 py-1.5 bg-slate-50 hover:bg-slate-100/80 border border-slate-200/90 rounded-lg text-xs text-slate-500 transition-colors group shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
        >
          <div className="flex items-center space-x-2 truncate">
            <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-colors" />
            <span className="truncate">Buscar locação, cliente, item (CC-024)...</span>
          </div>
          <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono bg-white border border-slate-200 rounded text-slate-500 shadow-xs">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-2">
        {/* Availability quick check */}
        <button
          onClick={() => setIsAvailabilityModalOpen(true)}
          className="hidden sm:flex items-center space-x-1 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 rounded-lg border border-slate-200 transition-colors shadow-xs"
          title="Consultar disponibilidade em datas específicas"
        >
          <Search className="w-3.5 h-3.5 text-slate-500" />
          <span>Datas</span>
        </button>

        {/* New Reservation */}
        <button
          onClick={() => setIsNewReservationModalOpen(true)}
          className="hidden sm:flex items-center space-x-1 px-2.5 py-1.5 text-xs font-medium text-blue-700 bg-blue-50/70 hover:bg-blue-100/70 border border-blue-200/80 rounded-lg transition-colors"
        >
          <CalendarPlus className="w-3.5 h-3.5 text-blue-600" />
          <span>+ Reserva</span>
        </button>

        {/* New Rental Primary CTA */}
        <button
          onClick={() => setIsNewRentalModalOpen(true)}
          className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm shadow-blue-600/20 transition-all active:scale-[0.98]"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>+ Locação</span>
        </button>

        {/* AI Assistant trigger */}
        <button
          onClick={onOpenAI}
          className="flex items-center space-x-1.5 px-2.5 py-1.5 text-xs font-medium text-indigo-700 bg-indigo-50/70 hover:bg-indigo-100/70 border border-indigo-200/70 rounded-lg transition-all"
          title="Assistente de Inteligência Operacional"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
          <span className="hidden xl:inline">Assistente AI</span>
        </button>

        <div className="h-4 w-[1px] bg-slate-200 mx-1 hidden sm:block" />

        {/* Operational Alerts Bell */}
        <div className="relative">
          <button
            onClick={() => setIsAlertsDropdownOpen(!isAlertsDropdownOpen)}
            className="relative p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
            title="Alertas Operacionais"
          >
            <Bell className="w-4 h-4" />
            {unreadAlerts.length > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
            )}
          </button>

          {isAlertsDropdownOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 z-50 overflow-hidden animate-in fade-in-50">
              <div className="p-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center space-x-2">
                  <Bell className="w-4 h-4 text-slate-600" />
                  <span className="text-xs font-bold text-slate-900">Alertas Operacionais</span>
                </div>
                <span className="text-[10px] font-semibold text-slate-500 font-mono">
                  {unreadAlerts.length} pendentes
                </span>
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                {alerts.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-400">
                    Nenhum alerta operacional pendente.
                  </div>
                ) : (
                  alerts.slice(0, 6).map(alert => (
                    <div key={alert.id} className="p-3 hover:bg-slate-50 transition-colors">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start space-x-2">
                          {alert.type === 'critical' ? (
                            <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                          ) : (
                            <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                          )}
                          <div>
                            <div className="text-xs font-semibold text-slate-900 leading-snug">
                              {alert.title}
                            </div>
                            <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                              {alert.description}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => dismissAlert(alert.id)}
                          className="text-slate-400 hover:text-slate-600 p-0.5"
                          title="Dispensar"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {alert.targetView && (
                        <div className="mt-2 text-right">
                          <button
                            onClick={() => {
                              setCurrentView(alert.targetView as any);
                              setIsAlertsDropdownOpen(false);
                            }}
                            className="text-[11px] font-semibold text-blue-600 hover:text-blue-800"
                          >
                            Resolver agora →
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>

              <div className="p-2 border-t border-slate-100 bg-slate-50 text-center">
                <button
                  onClick={() => {
                    setCurrentView('alerts_center');
                    setIsAlertsDropdownOpen(false);
                  }}
                  className="text-xs font-medium text-slate-600 hover:text-slate-900"
                >
                  Ver Central de Alertas Completa
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Role Switcher Popover */}
        <div className="relative">
          <button
            onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
            className="flex items-center space-x-1.5 px-2 py-1 hover:bg-slate-100 rounded-lg transition-colors border border-transparent hover:border-slate-200"
            title="Alternar Perfil de Acesso"
          >
            <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-[11px] font-bold">
              {currentUserRole.slice(0, 1)}
            </div>
            <span className="hidden xl:inline text-xs font-medium text-slate-700">
              {currentUserRole}
            </span>
          </button>

          {isRoleDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 z-50 py-1.5 animate-in fade-in-50 text-xs">
              <div className="px-3 py-1.5 border-b border-slate-100 text-[10px] uppercase font-bold text-slate-400">
                Perfil de Simulação (RBAC)
              </div>
              {roles.map(role => (
                <button
                  key={role}
                  onClick={() => {
                    setCurrentUserRole(role);
                    setIsRoleDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-slate-50 transition-colors ${
                    currentUserRole === role ? 'font-semibold text-blue-600 bg-blue-50/50' : 'text-slate-700'
                  }`}
                >
                  <span>{role}</span>
                  {currentUserRole === role && <span className="text-[10px] text-blue-600">Ativo</span>}
                </button>
              ))}

              <div className="my-1 border-t border-slate-100" />
              <button
                onClick={() => {
                  if (confirm('Deseja recarregar o banco de dados inicial da demonstração?')) {
                    resetToInitialData();
                    setIsRoleDropdownOpen(false);
                  }
                }}
                className="w-full text-left px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 flex items-center space-x-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restaurar Base Demonstrativa</span>
              </button>
            </div>
          )}
        </div>

        {/* Quick Help Modal Trigger */}
        <button
          onClick={() => setIsHelpOpen(true)}
          className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          title="Atalhos e Ajuda"
        >
          <HelpCircle className="w-4 h-4" />
        </button>
      </div>

      {/* Help & Shortcuts Modal */}
      {isHelpOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Keyboard className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900">Atalhos de Teclado & Guia</h3>
              </div>
              <button onClick={() => setIsHelpOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 space-y-3 text-xs">
              <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-600">Busca Rápida Geral</span>
                <kbd className="px-2 py-0.5 bg-slate-100 border border-slate-200 rounded font-mono text-[11px]">⌘K ou Ctrl+K</kbd>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-600">Filtrar Menus Laterais</span>
                <kbd className="px-2 py-0.5 bg-slate-100 border border-slate-200 rounded font-mono text-[11px]">/</kbd>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-600">Fechar Janelas & Modais</span>
                <kbd className="px-2 py-0.5 bg-slate-100 border border-slate-200 rounded font-mono text-[11px]">Esc</kbd>
              </div>
              <p className="text-[11px] text-slate-500 pt-2 leading-relaxed">
                Torre de Bebel ERP Enterprise gerencia o ciclo completo de locação infantil: inventário unitário rastreável por QR/código, contratos, caução, higienização clínica e rotas logísticas.
              </p>
            </div>
            <div className="p-3 border-t border-slate-100 bg-slate-50 text-right">
              <button
                onClick={() => setIsHelpOpen(false)}
                className="px-3 py-1.5 text-xs font-semibold bg-slate-900 text-white rounded-lg hover:bg-slate-800"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
