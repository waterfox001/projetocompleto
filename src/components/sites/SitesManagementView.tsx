import React, { useState, useMemo } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { TEN_SITES } from '../../data/platformData';
import { SiteDescriptor, CityId, CompanyId } from '../../types/platform';
import {
  Globe,
  Eye,
  Settings,
  ExternalLink,
  MapPin,
  CheckCircle2,
  Users,
  TrendingUp,
  Activity,
  Layers,
  ArrowRight,
  Sparkles,
  Smartphone,
  Monitor,
  Phone,
  MessageCircle,
  Copy,
  Check,
  X,
  Sliders,
  ShieldCheck,
} from 'lucide-react';
import { TorreDeBebelLogo } from '../../projects/torre-os/components/TorreDeBebelLogo';
import { StopcaseLogo } from '../../projects/stop-os/components/common/StopcaseLogo';

export const SitesManagementView: React.FC = () => {
  const { openSitePreview } = usePlatform();
  const [filterCompany, setFilterCompany] = useState<'all' | 'torre' | 'stop'>('all');
  const [filterCity, setFilterCity] = useState<string>('all');
  const [selectedSiteForSettings, setSelectedSiteForSettings] = useState<SiteDescriptor | null>(null);
  const [copiedDomain, setCopiedDomain] = useState<string | null>(null);

  const filteredSites = useMemo(() => {
    return TEN_SITES.filter((site) => {
      const matchCompany = filterCompany === 'all' || site.company === filterCompany;
      const matchCity = filterCity === 'all' || site.cityId === filterCity;
      return matchCompany && matchCity;
    });
  }, [filterCompany, filterCity]);

  const handleCopyDomain = (domain: string) => {
    navigator.clipboard?.writeText(`https://${domain}`);
    setCopiedDomain(domain);
    setTimeout(() => setCopiedDomain(null), 2000);
  };

  // Metrics summary
  const totals = useMemo(() => {
    const totalVisitors = TEN_SITES.reduce((acc, s) => acc + s.monthlyVisitors, 0);
    const totalLeads = TEN_SITES.reduce((acc, s) => acc + s.leadsCount, 0);
    const totalOrders = TEN_SITES.reduce((acc, s) => acc + s.activeOrders, 0);
    const avgConversion = (
      TEN_SITES.reduce((acc, s) => acc + s.conversionRate, 0) / TEN_SITES.length
    ).toFixed(1);
    return { totalVisitors, totalLeads, totalOrders, avgConversion };
  }, []);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-5 rounded-2xl border border-slate-800 text-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              CENTRAL DOS 10 PORTAIS WEB
            </span>
            <span className="text-slate-400 text-xs hidden sm:inline">
              Multi-Tenant · 100% Online
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            Gerenciamento e Navegação dos Sites
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Estrutura centralizada dos 10 sites independentes por empresa e cidade. Clique em
            qualquer site para navegar interativamente pela versão correspondente sem sair da
            plataforma.
          </p>
        </div>

        {/* Aggregate KPI Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 self-start md:self-auto shrink-0 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
          <div className="text-center px-2">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">10 Sites</span>
            <span className="text-xs font-bold text-emerald-400">100% Online</span>
          </div>
          <div className="text-center px-2 border-l border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Visitas/Mês</span>
            <span className="text-xs font-bold text-slate-100 tabular-nums">
              {(totals.totalVisitors / 1000).toFixed(0)}k
            </span>
          </div>
          <div className="text-center px-2 border-l border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Leads Web</span>
            <span className="text-xs font-bold text-amber-300 tabular-nums">{totals.totalLeads}</span>
          </div>
          <div className="text-center px-2 border-l border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Conversão</span>
            <span className="text-xs font-bold text-blue-400 tabular-nums">
              {totals.avgConversion}%
            </span>
          </div>
        </div>
      </div>

      {/* Filter Tabs as requested in prompt */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
        {/* Company filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider hidden sm:inline">
            Filtrar:
          </span>
          <div className="inline-flex rounded-lg bg-slate-100 p-1 border border-slate-200">
            <button
              onClick={() => setFilterCompany('all')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                filterCompany === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Todas (10 sites)
            </button>
            <button
              onClick={() => setFilterCompany('torre')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                filterCompany === 'torre'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TorreDeBebelLogo size={12} />
              <span>Torre de Bebel (5)</span>
            </button>
            <button
              onClick={() => setFilterCompany('stop')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                filterCompany === 'stop'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <StopcaseLogo size={12} className="w-3 h-3" />
              <span>Stop Case (5)</span>
            </button>
          </div>
        </div>

        {/* City Filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium hidden md:inline">Cidade:</span>
          <select
            value={filterCity}
            onChange={(e) => setFilterCity(e.target.value)}
            aria-label="Filtrar por cidade"
            className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 cursor-pointer"
          >
            <option value="all">Todas as Cidades (5)</option>
            <option value="poa">Porto Alegre (POA)</option>
            <option value="ssa">Salvador (SSA)</option>
            <option value="cgh">São Paulo (CGH)</option>
            <option value="for">Fortaleza (FOR)</option>
            <option value="rec">Recife (REC)</option>
          </select>
        </div>
      </div>

      {/* Sites Grid (10 Sites) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {filteredSites.map((site) => {
          const isTorre = site.company === 'torre';
          return (
            <div
              key={site.id}
              className={`bg-white rounded-xl border transition-all hover:shadow-md flex flex-col justify-between ${
                isTorre ? 'border-slate-200 hover:border-emerald-300' : 'border-slate-200 hover:border-amber-300'
              }`}
            >
              {/* Site Card Header */}
              <div className="p-4.5 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    {isTorre ? (
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                        <TorreDeBebelLogo size={24} />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0">
                        <StopcaseLogo size={24} className="w-6 h-6" />
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-slate-900">{site.name}</h3>
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          Ativo
                        </span>
                      </div>
                      <span className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {site.cityName} ({site.airportCode}) · {site.airportName}
                      </span>
                    </div>
                  </div>

                  {/* Latency & Uptime */}
                  <div className="text-right shrink-0 hidden sm:block">
                    <span className="text-[11px] font-bold text-slate-700 block">
                      {site.uptime}
                    </span>
                    <span className="text-[10px] text-slate-400">Ping: {site.latency}</span>
                  </div>
                </div>

                {/* Subdomain & URL */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-600 truncate">
                    <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="font-mono text-[11px] font-medium text-slate-800 truncate">
                      {site.domain}
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopyDomain(site.domain)}
                    className="text-slate-400 hover:text-slate-700 transition-colors p-1 cursor-pointer shrink-0"
                    title="Copiar URL"
                  >
                    {copiedDomain === site.domain ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* Pages tag list */}
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">
                    {site.pagesCount} Páginas e Seções Ativas:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {site.pages.slice(0, 5).map((pg, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium"
                      >
                        {pg}
                      </span>
                    ))}
                    {site.pages.length > 5 && (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-400 font-medium">
                        +{site.pages.length - 5} mais
                      </span>
                    )}
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-4 gap-2 pt-2 border-t border-slate-100 text-center">
                  <div className="p-1.5 rounded-lg bg-slate-50/70">
                    <span className="text-[10px] text-slate-400 block">Visitas/Mês</span>
                    <span className="text-xs font-bold text-slate-800 tabular-nums">
                      {(site.monthlyVisitors / 1000).toFixed(1)}k
                    </span>
                  </div>
                  <div className="p-1.5 rounded-lg bg-slate-50/70">
                    <span className="text-[10px] text-slate-400 block">Leads</span>
                    <span className="text-xs font-bold text-slate-800 tabular-nums">
                      {site.leadsCount}
                    </span>
                  </div>
                  <div className="p-1.5 rounded-lg bg-slate-50/70">
                    <span className="text-[10px] text-slate-400 block">Conversão</span>
                    <span className="text-xs font-bold text-slate-800 tabular-nums">
                      {site.conversionRate}%
                    </span>
                  </div>
                  <div className="p-1.5 rounded-lg bg-slate-50/70">
                    <span className="text-[10px] text-slate-400 block">
                      {isTorre ? 'Locações' : 'Volumes'}
                    </span>
                    <span className="text-xs font-bold text-slate-800 tabular-nums">
                      {site.activeOrders}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-4.5 py-3 bg-slate-50 border-t border-slate-100 rounded-b-xl flex items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedSiteForSettings(site)}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Settings className="w-3.5 h-3.5 text-slate-500" />
                  <span>Configurações</span>
                </button>

                <button
                  onClick={() => openSitePreview(site.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs ${
                    isTorre
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      : 'bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Navegar no Site</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Settings Modal Drawer */}
      {selectedSiteForSettings && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                {selectedSiteForSettings.company === 'torre' ? (
                  <TorreDeBebelLogo size={24} />
                ) : (
                  <StopcaseLogo size={24} className="w-6 h-6" />
                )}
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Configurações · {selectedSiteForSettings.name}
                  </h3>
                  <span className="text-xs text-slate-500">{selectedSiteForSettings.domain}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedSiteForSettings(null)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Título / Headline da Home</label>
                <input
                  type="text"
                  defaultValue={selectedSiteForSettings.heroHeadline}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">WhatsApp de Atendimento</label>
                  <input
                    type="text"
                    defaultValue={selectedSiteForSettings.whatsapp}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 font-mono"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Telefone Fixo / Balcão</label>
                  <input
                    type="text"
                    defaultValue={selectedSiteForSettings.phone}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Endereço da Unidade no Site</label>
                <input
                  type="text"
                  defaultValue={selectedSiteForSettings.address}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-800"
                />
              </div>

              <div className="p-3 rounded-lg bg-blue-50 border border-blue-100 text-blue-900">
                <span className="font-bold block mb-0.5">Certificado SSL & CDN Ativo</span>
                <p className="text-[11px] text-blue-700">
                  Site servido com cache em borda nas regiões Sul, Sudeste e Nordeste. Uptime de{' '}
                  {selectedSiteForSettings.uptime} nos últimos 90 dias.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                onClick={() => setSelectedSiteForSettings(null)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Fechar
              </button>
              <button
                onClick={() => {
                  alert('Configurações do site salvas com sucesso!');
                  setSelectedSiteForSettings(null);
                }}
                className="px-4 py-2 rounded-lg text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
              >
                Salvar Alterações
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
