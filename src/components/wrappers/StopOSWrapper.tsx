import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from '../../projects/stop-os/context/AppContext';
import { Sidebar } from '../../projects/stop-os/components/layout/Sidebar';
import { Header } from '../../projects/stop-os/components/layout/Header';
import { CommandPalette } from '../../projects/stop-os/components/layout/CommandPalette';
import { ToastContainer } from '../../projects/stop-os/components/common/ToastContainer';
import { RealizationModal } from '../../projects/stop-os/components/modals/RealizationModal';
import { ReservationWizardModal } from '../../projects/stop-os/components/modals/ReservationWizardModal';
import { ReservationDetailDrawer } from '../../projects/stop-os/components/drawers/ReservationDetailDrawer';
import { VolumeDetailDrawer } from '../../projects/stop-os/components/drawers/VolumeDetailDrawer';
import { Customer360Drawer } from '../../projects/stop-os/components/drawers/Customer360Drawer';
import { usePlatform } from '../../context/PlatformContext';
import { AirportUnitId } from '../../projects/stop-os/types';

// Modules
import { DashboardModule } from '../../projects/stop-os/modules/dashboard/DashboardModule';
import { StrategyModule } from '../../projects/stop-os/modules/strategy/StrategyModule';
import { CommercialModule } from '../../projects/stop-os/modules/commercial/CommercialModule';
import { CustomersModule } from '../../projects/stop-os/modules/customers/CustomersModule';
import { ReservationsModule } from '../../projects/stop-os/modules/reservations/ReservationsModule';
import { OperationModule } from '../../projects/stop-os/modules/operation/OperationModule';
import { VolumesModule } from '../../projects/stop-os/modules/volumes/VolumesModule';
import { UnitsModule } from '../../projects/stop-os/modules/units/UnitsModule';
import { FinanceModule } from '../../projects/stop-os/modules/finance/FinanceModule';
import { ReportsModule } from '../../projects/stop-os/modules/reports/ReportsModule';
import { TeamModule } from '../../projects/stop-os/modules/team/TeamModule';
import { AssetsModule } from '../../projects/stop-os/modules/assets/AssetsModule';
import { PartnersModule } from '../../projects/stop-os/modules/partners/PartnersModule';
import { KnowledgeModule } from '../../projects/stop-os/modules/knowledge/KnowledgeModule';
import { DocumentsModule } from '../../projects/stop-os/modules/documents/DocumentsModule';
import { OccurrencesModule } from '../../projects/stop-os/modules/occurrences/OccurrencesModule';
import { AuditModule } from '../../projects/stop-os/modules/audit/AuditModule';
import { SettingsModule } from '../../projects/stop-os/modules/settings/SettingsModule';
import { MyWorkModule } from '../../projects/stop-os/modules/mywork/MyWorkModule';

const StopOSInner: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>('/');
  const { sidebarCollapsed, setSelectedUnitId } = useApp();
  const { activeModule, selectedCity } = usePlatform();

  // Sync activeModule from platform to currentPath
  useEffect(() => {
    switch (activeModule) {
      case 'dashboard':
        setCurrentPath('/');
        break;
      case 'commercial':
        setCurrentPath('/commercial');
        break;
      case 'operational':
        setCurrentPath('/operation');
        break;
      case 'customers':
        setCurrentPath('/customers');
        break;
      case 'financial':
        setCurrentPath('/finance');
        break;
      case 'goals':
        setCurrentPath('/strategy');
        break;
      case 'reports':
        setCurrentPath('/reports');
        break;
      case 'settings':
        setCurrentPath('/settings');
        break;
    }
  }, [activeModule]);

  // Sync selectedCity from platform to selectedUnitId in Stop Case
  useEffect(() => {
    let unitId: AirportUnitId = 'all';
    switch (selectedCity) {
      case 'cgh':
        unitId = 'CGH';
        break;
      case 'for':
        unitId = 'FOR';
        break;
      case 'ssa':
        unitId = 'SSA';
        break;
      case 'rec':
        unitId = 'REC';
        break;
      case 'poa':
        unitId = 'POA';
        break;
      case 'all':
      default:
        unitId = 'all';
        break;
    }
    setSelectedUnitId(unitId);
  }, [selectedCity, setSelectedUnitId]);

  const renderModule = () => {
    switch (currentPath) {
      case '/':
        return <DashboardModule onNavigate={setCurrentPath} />;
      case '/strategy':
        return <StrategyModule />;
      case '/commercial':
        return <CommercialModule />;
      case '/customers':
        return <CustomersModule />;
      case '/reservations':
        return <ReservationsModule />;
      case '/operation':
        return <OperationModule />;
      case '/volumes':
        return <VolumesModule />;
      case '/units':
        return <UnitsModule />;
      case '/finance':
        return <FinanceModule />;
      case '/reports':
        return <ReportsModule />;
      case '/team':
        return <TeamModule />;
      case '/assets':
        return <AssetsModule />;
      case '/partners':
        return <PartnersModule />;
      case '/knowledge':
        return <KnowledgeModule />;
      case '/documents':
        return <DocumentsModule />;
      case '/occurrences':
        return <OccurrencesModule />;
      case '/audit':
        return <AuditModule />;
      case '/settings':
        return <SettingsModule />;
      case '/mywork':
        return <MyWorkModule />;
      default:
        return <DashboardModule onNavigate={setCurrentPath} />;
    }
  };

  return (
    <div className="min-h-[calc(100vh-96px)] bg-[#f8fafc] text-slate-900 flex flex-row font-sans antialiased">
      {/* Sticky Sidebar */}
      <Sidebar currentPath={currentPath} onNavigate={setCurrentPath} />

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-200">
        {/* Top Header */}
        <Header currentPath={currentPath} onNavigate={setCurrentPath} />

        {/* Page Content Viewport */}
        <main className="flex-1 p-4 md:p-5 max-w-[1700px] w-full mx-auto">
          {renderModule()}
        </main>
      </div>

      {/* Global Interactive Elements */}
      <CommandPalette onNavigate={setCurrentPath} />
      <RealizationModal />
      <ReservationWizardModal />
      <ReservationDetailDrawer />
      <VolumeDetailDrawer />
      <Customer360Drawer />
      <ToastContainer />
    </div>
  );
};

export const StopOSWrapper: React.FC = () => {
  return (
    <AppProvider>
      <StopOSInner />
    </AppProvider>
  );
};
