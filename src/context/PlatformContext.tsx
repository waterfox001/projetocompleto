import React, { createContext, useContext, useState } from 'react';
import { CompanyId, CityId, PeriodId, PlatformModuleId, SiteDescriptor } from '../types/platform';
import { TEN_SITES } from '../data/platformData';

interface PlatformContextType {
  selectedCompany: CompanyId;
  setSelectedCompany: (company: CompanyId) => void;
  selectedCity: CityId;
  setSelectedCity: (city: CityId) => void;
  selectedPeriod: PeriodId;
  setSelectedPeriod: (period: PeriodId) => void;
  activeModule: PlatformModuleId;
  setActiveModule: (module: PlatformModuleId) => void;
  activeSitePreview: SiteDescriptor | null;
  setActiveSitePreview: (site: SiteDescriptor | null) => void;
  previewDevice: 'desktop' | 'tablet' | 'mobile';
  setPreviewDevice: (device: 'desktop' | 'tablet' | 'mobile') => void;
  openSitePreview: (siteId: string) => void;
  closeSitePreview: () => void;
  switchContext: (company: CompanyId, city?: CityId, module?: PlatformModuleId) => void;
}

const PlatformContext = createContext<PlatformContextType | undefined>(undefined);

export const PlatformProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedCompany, setSelectedCompany] = useState<CompanyId>('all');
  const [selectedCity, setSelectedCity] = useState<CityId>('all');
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodId>('month');
  const [activeModule, setActiveModule] = useState<PlatformModuleId>('dashboard');
  const [activeSitePreview, setActiveSitePreview] = useState<SiteDescriptor | null>(null);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const openSitePreview = (siteId: string) => {
    const found = TEN_SITES.find((s) => s.id === siteId);
    if (found) {
      setActiveSitePreview(found);
    }
  };

  const closeSitePreview = () => {
    setActiveSitePreview(null);
  };

  const switchContext = (company: CompanyId, city?: CityId, module?: PlatformModuleId) => {
    setSelectedCompany(company);
    if (city !== undefined) {
      setSelectedCity(city);
    }
    if (module !== undefined) {
      setActiveModule(module);
    }
    // If previewing site, exit to main platform view
    if (activeSitePreview) {
      setActiveSitePreview(null);
    }
  };

  return (
    <PlatformContext.Provider
      value={{
        selectedCompany,
        setSelectedCompany,
        selectedCity,
        setSelectedCity,
        selectedPeriod,
        setSelectedPeriod,
        activeModule,
        setActiveModule,
        activeSitePreview,
        setActiveSitePreview,
        previewDevice,
        setPreviewDevice,
        openSitePreview,
        closeSitePreview,
        switchContext,
      }}
    >
      {children}
    </PlatformContext.Provider>
  );
};

export const usePlatform = (): PlatformContextType => {
  const context = useContext(PlatformContext);
  if (!context) {
    throw new Error('usePlatform must be used within a PlatformProvider');
  }
  return context;
};
