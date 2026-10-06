import React from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { CompanyId, CityId, PeriodId, PlatformModuleId } from '../../types/platform';
import {
  Building2,
  MapPin,
  Calendar,
  Globe,
  Bell,
  LayoutDashboard,
  TrendingUp,
  DollarSign,
  Layers,
  Users,
  Target,
  BarChart3,
  Settings,
} from 'lucide-react';
import { TorreDeBebelLogo } from '../../projects/torre-os/components/TorreDeBebelLogo';
import { StopcaseLogo } from '../../projects/stop-os/components/common/StopcaseLogo';

export const GlobalHeader: React.FC = () => {
  const {
    selectedCompany,
    setSelectedCompany,
    selectedCity,
    setSelectedCity,
    selectedPeriod,
    setSelectedPeriod,
    activeModule,
    setActiveModule,
    activeSitePreview,
  } = usePlatform();

  const citiesList: { id: CityId; label: string; code: string }[] = [
    { id: 'all', label: 'Todas as Cidades', code: '5 POLOS' },
    { id: 'cgh', label: 'São Paulo', code: 'CGH' },
    { id: 'for', label: 'Fortaleza', code: 'FOR' },
    { id: 'ssa', label: 'Salvador', code: 'SSA' },
    { id: 'rec', label: 'Recife', code: 'REC' },
    { id: 'poa', label: 'Porto Alegre', code: 'POA' },
  ];

  const periodsList: { id: PeriodId; label: string }[] = [
    { id: 'today', label: 'Hoje' },
    { id: '7d', label: 'Semana' },
    { id: 'month', label: 'Mês' },
    { id: 'quarter', label: 'Trimestre' },
    { id: 'year', label: 'Ano' },
  ];

  const mainModules: { id: PlatformModuleId; label: string; icon: React.FC<{ className?: string }>; badge?: string }[] = [
    { id: 'dashboard', label: 'DASHBOARD', icon: LayoutDashboard },
    { id: 'commercial', label: 'COMERCIAL', icon: TrendingUp },
    { id: 'operational', label: 'OPERACIONAL', icon: Layers },
    { id: 'customers', label: 'CLIENTES', icon: Users },
    { id: 'financial', label: 'FINANCEIRO', icon: DollarSign },
    { id: 'goals', label: 'METAS', icon: Target },
    { id: 'reports', label: 'RELATÓRIOS', icon: BarChart3 },
    { id: 'sites', label: 'SITES', icon: Globe, badge: '10' },
    { id: 'settings', label: 'CONFIGURAÇÕES', icon: Settings },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
      {/* Upper Holding Bar: Branding + Context Switcher + Utilities */}
      <div className="px-4 py-2 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100">
        {/* Brand Group */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200/80 shadow-2xs">
            <div className="flex items-center -space-x-1.5">
              <TorreDeBebelLogo size={22} />
              <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center p-0.5 border border-slate-200 shadow-2xs">
                <StopcaseLogo size={14} className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="leading-tight">
              <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400 block">
                Plataforma Multiempresa
              </span>
              <span className="text-xs font-bold text-slate-900 tracking-tight">
                Torre de Bebel & Stop Case
              </span>
            </div>
          </div>

          <div className="hidden xl:flex items-center gap-2 text-[11px] text-slate-500 pl-2 border-l border-slate-200">
            <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60 font-semibold text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              2 Empresas
            </span>
            <span>•</span>
            <span className="text-slate-600 font-medium">5 Cidades / Polos</span>
            <span>•</span>
            <button
              onClick={() => setActiveModule('sites')}
              className="text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/60 hover:bg-amber-100 transition-colors font-semibold text-[10px] cursor-pointer"
            >
              10 Sites Online
            </button>
          </div>
        </div>

        {/* Global Context Switcher (Clean, Light & Premium) */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 bg-slate-100/80 p-1 rounded-xl border border-slate-200/80 shadow-2xs">
          {/* Level 1 & 2: Empresa Selector */}
          <div className="flex items-center gap-1">
            <span className="text-[10px] uppercase font-bold text-slate-500 px-1 hidden sm:inline">
              Empresa:
            </span>
            <div className="inline-flex rounded-lg bg-slate-200/70 p-0.5 border border-slate-200/60">
              <button
                onClick={() => setSelectedCompany('all')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedCompany === 'all'
                    ? 'bg-white text-slate-900 font-bold shadow-xs border border-slate-200/80'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
                title="Consolidação geral das duas empresas"
              >
                <Building2 className="w-3.5 h-3.5 text-blue-600" />
                <span>Todas as Empresas</span>
              </button>

              <button
                onClick={() => setSelectedCompany('torre')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedCompany === 'torre'
                    ? 'bg-emerald-600 text-white font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
                title="Sistema operacional e dados da Torre de Bebel"
              >
                <TorreDeBebelLogo size={14} />
                <span>Torre de Bebel</span>
              </button>

              <button
                onClick={() => setSelectedCompany('stop')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedCompany === 'stop'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
                title="Sistema operacional e dados da Stop Case"
              >
                <StopcaseLogo size={14} className="w-3.5 h-3.5" />
                <span>Stop Case</span>
              </button>
            </div>
          </div>

          {/* Level 3: Cidade Selector */}
          <div className="flex items-center gap-1">
            <span className="text-[10px] uppercase font-bold text-slate-500 px-1 hidden md:inline">
              Cidade:
            </span>
            <div className="relative">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value as CityId)}
                aria-label="Selecionar cidade"
                className="bg-white text-slate-800 text-xs font-semibold rounded-lg border border-slate-200/90 px-2.5 py-1 pr-7 appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-2xs"
              >
                {citiesList.map((city) => (
                  <option key={city.id} value={city.id} className="bg-white text-slate-800">
                    {city.label} {city.id !== 'all' ? `(${city.code})` : ''}
                  </option>
                ))}
              </select>
              <MapPin className="w-3 h-3 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Período Selector */}
          <div className="hidden lg:flex items-center gap-1">
            <span className="text-[10px] uppercase font-bold text-slate-500 px-1">
              Período:
            </span>
            <div className="relative">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value as PeriodId)}
                aria-label="Selecionar período"
                className="bg-white text-slate-800 text-xs font-semibold rounded-lg border border-slate-200/90 px-2.5 py-1 pr-7 appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-2xs"
              >
                {periodsList.map((p) => (
                  <option key={p.id} value={p.id} className="bg-white text-slate-800">
                    {p.label}
                  </option>
                ))}
              </select>
              <Calendar className="w-3 h-3 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Right User & Utility Actions */}
        <div className="flex items-center gap-2">
          {/* Quick Sites Button */}
          <button
            onClick={() => setActiveModule('sites')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border ${
              activeModule === 'sites'
                ? 'bg-amber-100 text-amber-900 border-amber-300 shadow-xs'
                : 'bg-amber-50/80 text-amber-900 border-amber-200/80 hover:bg-amber-100'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-amber-600" />
            <span className="hidden sm:inline">Gerenciar</span> 10 Sites
          </button>

          {/* Notification Alerts indicator */}
          <button
            onClick={() => setActiveModule('dashboard')}
            className="p-1.5 text-slate-600 hover:text-slate-900 bg-slate-50 rounded-lg hover:bg-slate-100 border border-slate-200/80 transition-colors relative cursor-pointer shadow-2xs"
            title="14 Alertas Operacionais Ativos"
          >
            <Bell className="w-4 h-4 text-slate-600" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
              14
            </span>
          </button>

          {/* User Profile Badge */}
          <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-200">
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-xs font-bold text-white shadow-2xs">
              DG
            </div>
            <div className="leading-none text-left hidden md:block">
              <span className="text-xs font-bold text-slate-800 block">Diretoria Geral</span>
              <span className="text-[10px] text-slate-500">Holding Corporativa</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Single Navigation Bar (Clean light grey/white background) */}
      <div className="px-4 flex items-center overflow-x-auto scrollbar-none bg-slate-50/80 border-t border-slate-100">
        <nav className="flex items-center gap-1 py-1">
          {mainModules.map((mod) => {
            const Icon = mod.icon;
            const isActive = activeModule === mod.id && !activeSitePreview;
            return (
              <button
                key={mod.id}
                onClick={() => setActiveModule(mod.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white text-blue-700 font-bold shadow-2xs border border-slate-200/90'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/70'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-600' : 'text-slate-500'}`} />
                <span>{mod.label}</span>
                {mod.badge && (
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                    {mod.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Context Breadcrumb / Pill on the right */}
        <div className="ml-auto hidden xl:flex items-center gap-2 text-xs text-slate-500 pl-4 py-1">
          <span className="text-slate-400">Contexto:</span>
          <span className="px-2 py-0.5 rounded-md bg-white text-slate-700 font-semibold text-[11px] border border-slate-200 shadow-2xs">
            {selectedCompany === 'all'
              ? 'Todas as Empresas (Consolidado)'
              : selectedCompany === 'torre'
              ? 'Torre de Bebel OS'
              : 'Stop Case OS'}
          </span>
          <span className="text-slate-300">/</span>
          <span className="px-2 py-0.5 rounded-md bg-white text-slate-700 font-semibold text-[11px] border border-slate-200 shadow-2xs">
            {citiesList.find((c) => c.id === selectedCity)?.label || 'Todas as Cidades'}
          </span>
        </div>
      </div>
    </header>
  );
};
