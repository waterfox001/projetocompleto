import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { SiteDescriptor, CityId } from '../../types/platform';
import {
  ArrowLeft,
  LayoutDashboard,
  Globe,
  Monitor,
  Tablet,
  Smartphone,
  ExternalLink,
  MapPin,
  Sparkles,
  Phone,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { TorreDeBebelLogo } from '../../projects/torre-os/components/TorreDeBebelLogo';
import { StopcaseLogo } from '../../projects/stop-os/components/common/StopcaseLogo';

// Import the real site applications
import TorreSiteApp from '../../projects/site-torre/App';
import StopSiteApp from '../../projects/site-stop/App';
import { UnitId as TorreUnitId } from '../../projects/site-torre/types';
import { HubCityId as StopHubCityId } from '../../projects/site-stop/types';

interface SiteViewerWrapperProps {
  site: SiteDescriptor;
}

export const SiteViewerWrapper: React.FC<SiteViewerWrapperProps> = ({ site }) => {
  const { closeSitePreview, setActiveModule, previewDevice, setPreviewDevice, openSitePreview } =
    usePlatform();

  // Convert platform cityId to the specific site's unit ID format
  const getTorreUnitId = (cId: CityId): TorreUnitId => {
    switch (cId) {
      case 'for':
        return 'fortaleza';
      case 'poa':
        return 'porto-alegre';
      case 'rec':
        return 'recife';
      case 'ssa':
        return 'salvador';
      case 'cgh':
      default:
        return 'sao-paulo-congonhas';
    }
  };

  const getStopHubId = (cId: CityId): StopHubCityId => {
    switch (cId) {
      case 'for':
        return 'fortaleza';
      case 'poa':
        return 'porto-alegre';
      case 'rec':
        return 'recife';
      case 'ssa':
        return 'salvador';
      case 'cgh':
      default:
        return 'sao-paulo-congonhas';
    }
  };

  const isTorre = site.company === 'torre';

  // Alternative cities for this same company
  const siblingSites = isTorre
    ? [
        { id: 'torre-poa', label: 'Porto Alegre (POA)', cityId: 'poa' },
        { id: 'torre-ssa', label: 'Salvador (SSA)', cityId: 'ssa' },
        { id: 'torre-cgh', label: 'São Paulo (CGH)', cityId: 'cgh' },
        { id: 'torre-for', label: 'Fortaleza (FOR)', cityId: 'for' },
        { id: 'torre-rec', label: 'Recife (REC)', cityId: 'rec' },
      ]
    : [
        { id: 'stop-poa', label: 'Porto Alegre (POA)', cityId: 'poa' },
        { id: 'stop-ssa', label: 'Salvador (SSA)', cityId: 'ssa' },
        { id: 'stop-cgh', label: 'São Paulo (CGH)', cityId: 'cgh' },
        { id: 'stop-for', label: 'Fortaleza (FOR)', cityId: 'for' },
        { id: 'stop-rec', label: 'Recife (REC)', cityId: 'rec' },
      ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100">
      {/* Top persistent preview navigation bar */}
      <div className="sticky top-0 z-50 bg-slate-900 border-b border-slate-800 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 shadow-md">
        {/* Left: Back buttons & Site identity */}
        <div className="flex items-center gap-3">
          <button
            onClick={closeSitePreview}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar aos 10 Sites</span>
          </button>

          <button
            onClick={() => {
              closeSitePreview();
              setActiveModule('dashboard');
            }}
            className="hidden sm:flex px-2.5 py-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 text-xs font-medium items-center gap-1.5 transition-colors cursor-pointer"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Dashboard Holding</span>
          </button>

          <div className="h-5 w-px bg-slate-800 hidden md:block" />

          {/* Site name & company */}
          <div className="flex items-center gap-2">
            {isTorre ? (
              <TorreDeBebelLogo size={20} />
            ) : (
              <StopcaseLogo size={20} className="w-5 h-5" />
            )}
            <div className="leading-tight">
              <span className="text-xs font-bold text-white block">{site.name}</span>
              <span className="text-[10px] text-slate-400 font-mono">{site.domain}</span>
            </div>
            <span className="hidden lg:inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800/80">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Modo Interativo ao Vivo
            </span>
          </div>
        </div>

        {/* Center: Quick city switch within same site family */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-slate-400 uppercase font-bold hidden xl:inline">
            Trocar Praça:
          </span>
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
            {siblingSites.map((sib) => {
              const isCurrent = sib.id === site.id;
              return (
                <button
                  key={sib.id}
                  onClick={() => openSitePreview(sib.id)}
                  className={`px-2 py-1 rounded text-[11px] font-semibold transition-all cursor-pointer ${
                    isCurrent
                      ? isTorre
                        ? 'bg-emerald-600 text-white font-bold'
                        : 'bg-amber-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  {sib.label.split(' ')[0]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Device Viewport Toggle & Live Info */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-950 p-0.5 rounded-lg border border-slate-800">
            <button
              onClick={() => setPreviewDevice('desktop')}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                previewDevice === 'desktop'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Visualização Desktop (100%)"
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setPreviewDevice('tablet')}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                previewDevice === 'tablet'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Visualização Tablet (768px)"
            >
              <Tablet className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setPreviewDevice('mobile')}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                previewDevice === 'mobile'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Visualização Mobile (390px)"
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Embedded Live Website Container */}
      <div className="flex-1 bg-slate-950 overflow-y-auto">
        <div
          className={`transition-all duration-300 ${
            previewDevice === 'desktop'
              ? 'w-full'
              : previewDevice === 'tablet'
              ? 'max-w-[768px] mx-auto my-6 rounded-2xl shadow-2xl border-4 border-slate-800 overflow-hidden bg-white'
              : 'max-w-[400px] mx-auto my-6 rounded-3xl shadow-2xl border-8 border-slate-800 overflow-hidden bg-white'
          }`}
        >
          {isTorre ? (
            <TorreSiteApp key={site.id} initialUnit={getTorreUnitId(site.cityId)} />
          ) : (
            <StopSiteApp key={site.id} initialHubId={getStopHubId(site.cityId)} />
          )}
        </div>
      </div>
    </div>
  );
};
