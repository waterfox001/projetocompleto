import React from 'react';
import { PlatformProvider, usePlatform } from './context/PlatformContext';
import { GlobalHeader } from './components/navigation/GlobalHeader';
import { ConsolidatedDashboardView } from './components/consolidated/ConsolidatedDashboardView';
import { ConsolidatedCommercialView } from './components/consolidated/ConsolidatedCommercialView';
import { ConsolidatedFinancialView } from './components/consolidated/ConsolidatedFinancialView';
import { ConsolidatedOperationalView } from './components/consolidated/ConsolidatedOperationalView';
import { ConsolidatedCustomersView } from './components/consolidated/ConsolidatedCustomersView';
import { ConsolidatedGoalsView } from './components/consolidated/ConsolidatedGoalsView';
import { ConsolidatedReportsView } from './components/consolidated/ConsolidatedReportsView';
import { ConsolidatedSettingsView } from './components/consolidated/ConsolidatedSettingsView';
import { SitesManagementView } from './components/sites/SitesManagementView';
import { SiteViewerWrapper } from './components/sites/SiteViewerWrapper';
import { TorreOSWrapper } from './components/wrappers/TorreOSWrapper';
import { StopOSWrapper } from './components/wrappers/StopOSWrapper';

const PlatformMain: React.FC = () => {
  const { selectedCompany, activeModule, activeSitePreview } = usePlatform();

  // If user clicked to interactively preview one of the 10 sites, render the dedicated live SiteViewer
  if (activeSitePreview) {
    return <SiteViewerWrapper site={activeSitePreview} />;
  }

  // Render the primary corporate application view
  const renderPlatformContent = () => {
    // 1. If viewing the Sites module, always render Sites Management regardless of company
    if (activeModule === 'sites') {
      return (
        <main className="max-w-[1700px] w-full mx-auto p-4 md:p-6">
          <SitesManagementView />
        </main>
      );
    }

    // 2. Level 2 & 3: Single Company selected -> Render authentic OS with full original UI & views
    if (selectedCompany === 'torre') {
      return <TorreOSWrapper />;
    }

    if (selectedCompany === 'stop') {
      return <StopOSWrapper />;
    }

    // 3. Level 1: Consolidated View ("Todas as Empresas")
    return (
      <main className="max-w-[1700px] w-full mx-auto p-4 md:p-6">
        {activeModule === 'dashboard' && <ConsolidatedDashboardView />}
        {activeModule === 'commercial' && <ConsolidatedCommercialView />}
        {activeModule === 'operational' && <ConsolidatedOperationalView />}
        {activeModule === 'customers' && <ConsolidatedCustomersView />}
        {activeModule === 'financial' && <ConsolidatedFinancialView />}
        {activeModule === 'goals' && <ConsolidatedGoalsView />}
        {activeModule === 'reports' && <ConsolidatedReportsView />}
        {activeModule === 'settings' && <ConsolidatedSettingsView />}
      </main>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased">
      {/* Global Context Switcher & Main Header */}
      <GlobalHeader />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">{renderPlatformContent()}</div>
    </div>
  );
};

export default function App() {
  return (
    <PlatformProvider>
      <PlatformMain />
    </PlatformProvider>
  );
}
