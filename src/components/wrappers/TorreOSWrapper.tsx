import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from '../../projects/torre-os/context/AppContext';
import { Sidebar } from '../../projects/torre-os/components/Sidebar';
import { Navbar } from '../../projects/torre-os/components/Navbar';
import { usePlatform } from '../../context/PlatformContext';

// Modals & Drawers
import { GlobalSearchModal } from '../../projects/torre-os/components/modals/GlobalSearchModal';
import { WhatsAppModal } from '../../projects/torre-os/components/modals/WhatsAppModal';
import { AIAssistantDrawer } from '../../projects/torre-os/components/modals/AIAssistantDrawer';
import { ProductDetailModal } from '../../projects/torre-os/components/modals/ProductDetailModal';
import { NewRentalModal } from '../../projects/torre-os/components/modals/NewRentalModal';
import { AvailabilityCheckerModal } from '../../projects/torre-os/components/modals/AvailabilityCheckerModal';

// Views
import { DashboardView } from '../../projects/torre-os/components/views/DashboardView';
import { ExecutiveDashboardView } from '../../projects/torre-os/components/views/ExecutiveDashboardView';
import { OkrsGoalsView } from '../../projects/torre-os/components/views/OkrsGoalsView';
import { BusinessIntelligenceView } from '../../projects/torre-os/components/views/BusinessIntelligenceView';
import { CommercialPipelineView } from '../../projects/torre-os/components/views/CommercialPipelineView';
import { RentalsView } from '../../projects/torre-os/components/views/RentalsView';
import { ReservationsView } from '../../projects/torre-os/components/views/ReservationsView';
import { CalendarView } from '../../projects/torre-os/components/views/CalendarView';
import { OperationalAgendaView } from '../../projects/torre-os/components/views/OperationalAgendaView';
import { OperationalHubView } from '../../projects/torre-os/components/views/OperationalHubView';
import { DeliveriesView } from '../../projects/torre-os/components/views/DeliveriesView';
import { ReturnsView } from '../../projects/torre-os/components/views/ReturnsView';
import { SanitizationView } from '../../projects/torre-os/components/views/SanitizationView';
import { MaintenanceView } from '../../projects/torre-os/components/views/MaintenanceView';
import { InventoryView } from '../../projects/torre-os/components/views/InventoryView';
import { CategoriesView } from '../../projects/torre-os/components/views/CategoriesView';
import { AvailabilityView } from '../../projects/torre-os/components/views/AvailabilityView';
import { InventoryIntelligenceView } from '../../projects/torre-os/components/views/InventoryIntelligenceView';
import { CustomersView } from '../../projects/torre-os/components/views/CustomersView';
import { Customer360View } from '../../projects/torre-os/components/views/Customer360View';
import { FinancialView } from '../../projects/torre-os/components/views/FinancialView';
import { FinancialErpView } from '../../projects/torre-os/components/views/FinancialErpView';
import { LogisticsMapView } from '../../projects/torre-os/components/views/LogisticsMapView';
import { TeamAuditingView } from '../../projects/torre-os/components/views/TeamAuditingView';
import { ReportsRankingsView } from '../../projects/torre-os/components/views/ReportsRankingsView';
import { MarketingChannelsView } from '../../projects/torre-os/components/views/MarketingChannelsView';
import { AutomationsView } from '../../projects/torre-os/components/views/AutomationsView';
import { DocumentsVaultView } from '../../projects/torre-os/components/views/DocumentsVaultView';
import { SettingsErpView } from '../../projects/torre-os/components/views/SettingsErpView';
import { CustomerStoreView } from '../../projects/torre-os/components/views/CustomerStoreView';

const TorreOSInner: React.FC = () => {
  const { currentView, setCurrentView } = useApp();
  const { activeModule, selectedCity } = usePlatform();
  const [isAIOpen, setIsAIOpen] = useState(false);

  // Sync activeModule from platform to currentView if needed
  useEffect(() => {
    switch (activeModule) {
      case 'dashboard':
        setCurrentView('dashboard');
        break;
      case 'commercial':
        setCurrentView('commercial_crm');
        break;
      case 'operational':
        setCurrentView('operational_hub');
        break;
      case 'customers':
        setCurrentView('customers');
        break;
      case 'financial':
        setCurrentView('financial');
        break;
      case 'goals':
        setCurrentView('okrs_goals');
        break;
      case 'reports':
        setCurrentView('reports');
        break;
      case 'settings':
        setCurrentView('company_settings');
        break;
    }
  }, [activeModule]);

  // If customer store mode is active, render full-screen client experience
  if (
    currentView === 'customer_store' ||
    currentView === 'online_booking' ||
    currentView === 'customer_account' ||
    currentView === 'customer_contracts' ||
    currentView === 'tracking_delivery'
  ) {
    return <CustomerStoreView />;
  }

  const renderActiveView = () => {
    switch (currentView) {
      // 1. VISÃO GERAL
      case 'dashboard':
      case 'alerts_center':
        return <DashboardView />;
      case 'executive_dashboard':
        return <ExecutiveDashboardView />;
      case 'okrs_goals':
        return <OkrsGoalsView subTab="okrs" />;
      case 'business_intelligence':
        return <BusinessIntelligenceView />;

      // 2. COMERCIAL
      case 'commercial_crm':
        return <CommercialPipelineView subTab="crm" />;
      case 'leads':
        return <CommercialPipelineView subTab="leads" />;
      case 'sales_pipeline':
        return <CommercialPipelineView subTab="pipeline" />;
      case 'follow_ups':
        return <CommercialPipelineView subTab="follow_ups" />;
      case 'proposals':
        return <CommercialPipelineView subTab="propostas" />;
      case 'commercial_goals':
        return <CommercialPipelineView subTab="metas" />;

      // 3. OPERAÇÃO
      case 'rentals':
        return <RentalsView />;
      case 'reservations':
        return <ReservationsView />;
      case 'calendar':
        return <CalendarView />;
      case 'agenda':
        return <OperationalAgendaView />;
      case 'operational_hub':
        return <OperationalHubView />;
      case 'deliveries':
        return <DeliveriesView />;
      case 'returns':
      case 'damages_incidents':
        return <ReturnsView />;
      case 'sanitization':
        return <SanitizationView />;
      case 'maintenance':
        return <MaintenanceView />;

      // 4. ESTOQUE & ATIVOS
      case 'inventory':
      case 'products_assets':
        return <InventoryView />;
      case 'categories':
        return <CategoriesView />;
      case 'availability':
        return <AvailabilityView />;
      case 'inventory_intelligence':
        return <InventoryIntelligenceView subTab="inteligencia" />;
      case 'demand_forecast':
        return <InventoryIntelligenceView subTab="demanda" />;
      case 'purchases_restock':
        return <InventoryIntelligenceView subTab="compras" />;
      case 'suppliers':
        return <InventoryIntelligenceView subTab="fornecedores" />;

      // 5. CLIENTES
      case 'customers':
      case 'rental_history':
      case 'inactive_customers':
      case 'vip_customers':
        return <CustomersView subTab={currentView} />;
      case 'customer_360':
      case 'loyalty_program':
      case 'nps_satisfaction':
        return <Customer360View subTab={currentView} />;

      // 6. FINANCEIRO
      case 'financial':
      case 'accounts_receivable':
      case 'accounts_payable':
      case 'cash_flow':
      case 'income_expenses':
      case 'deposits_held':
      case 'overdue_defaults':
      case 'profitability':
      case 'dre_statement':
      case 'commissions':
        return <FinancialErpView subTab={currentView} />;

      // 7. LOGÍSTICA
      case 'logistics_map':
      case 'driver_tracking':
      case 'routes_logistics':
      case 'drivers_list':
      case 'logistics_incidents':
      case 'logistics_performance':
        return <LogisticsMapView subTab={currentView} />;

      // 8. GESTÃO
      case 'team':
      case 'roles_permissions':
      case 'audit_logs':
        return <TeamAuditingView subTab={currentView} />;
      case 'tasks_management':
      case 'productivity':
        return <OkrsGoalsView subTab={currentView} />;

      // 9. RELATÓRIOS & BI
      case 'reports':
      case 'bi_analytics':
      case 'bi_financial':
      case 'bi_commercial':
      case 'bi_inventory':
      case 'bi_operational':
      case 'bi_customers':
      case 'bi_logistics':
      case 'rankings_kpis':
        return <ReportsRankingsView subTab={currentView} />;

      // 10. MARKETING
      case 'marketing_origins':
      case 'acquisition_channels':
      case 'conversion_funnel':
      case 'channel_roi':
      case 'marketing_campaigns':
        return <MarketingChannelsView subTab={currentView} />;

      // 11. AUTOMAÇÕES
      case 'automations':
      case 'business_rules':
      case 'system_notifications':
      case 'automated_reminders':
        return <AutomationsView subTab={currentView} />;

      // 12. DOCUMENTOS
      case 'documents_vault':
      case 'contracts_docs':
      case 'invoices_nf':
      case 'inspection_photos':
        return <DocumentsVaultView subTab={currentView} />;

      // 13. CONFIGURAÇÕES
      case 'company_settings':
      case 'users_settings':
      case 'pricing_settings':
      case 'policies_settings':
      case 'integrations_settings':
        return <SettingsErpView subTab={currentView} />;

      default:
        return <ExecutiveDashboardView />;
    }
  };

  const getCityName = () => {
    switch (selectedCity) {
      case 'cgh':
        return 'São Paulo (CGH)';
      case 'for':
        return 'Fortaleza (FOR)';
      case 'ssa':
        return 'Salvador (SSA)';
      case 'rec':
        return 'Recife (REC)';
      case 'poa':
        return 'Porto Alegre (POA)';
      default:
        return 'Todas as Cidades';
    }
  };

  return (
    <div className="min-h-[calc(100vh-96px)] bg-slate-50 text-slate-900 flex">
      {/* Sidebar with exact items */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar onOpenAI={() => setIsAIOpen(true)} />

        {/* City Filter Notice Banner if specific city selected */}
        {selectedCity !== 'all' && (
          <div className="bg-emerald-50 border-b border-emerald-200 px-6 py-2 text-xs text-emerald-900 flex items-center justify-between">
            <span className="font-medium">
              Filtrando visão da <strong>Torre de Bebel</strong> para a praça:{' '}
              <strong className="text-emerald-700">{getCityName()}</strong>
            </span>
            <span className="text-[11px] text-emerald-700 font-semibold">
              Unidade Operacional Ativa
            </span>
          </div>
        )}

        <main className="flex-1 p-6 overflow-y-auto max-w-[1600px] w-full mx-auto">
          {renderActiveView()}
        </main>
      </div>

      {/* Torre Modals */}
      <GlobalSearchModal />
      <WhatsAppModal />
      <AIAssistantDrawer isOpen={isAIOpen} onClose={() => setIsAIOpen(false)} />
      <ProductDetailModal />
      <NewRentalModal />
      <AvailabilityCheckerModal />
    </div>
  );
};

export const TorreOSWrapper: React.FC = () => {
  return (
    <AppProvider>
      <TorreOSInner />
    </AppProvider>
  );
};
