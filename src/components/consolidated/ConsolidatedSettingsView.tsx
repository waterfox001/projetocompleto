import React from 'react';
import { usePlatform } from '../../context/PlatformContext';
import {
  Settings,
  Building2,
  Users,
  Shield,
  Key,
  Database,
  Globe,
  Bell,
  CheckCircle2,
} from 'lucide-react';
import { TorreDeBebelLogo } from '../../projects/torre-os/components/TorreDeBebelLogo';
import { StopcaseLogo } from '../../projects/stop-os/components/common/StopcaseLogo';

export const ConsolidatedSettingsView: React.FC = () => {
  const { setSelectedCompany, setActiveModule } = usePlatform();

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-800 border border-slate-200">
            PARÂMETROS DA HOLDING
          </span>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            Configurações Centrais Multiempresa
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Gerenciamento de acessos corporativos, cadastro das 5 filiais e integração com os 10 sites.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedCompany('torre')}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <TorreDeBebelLogo size={14} />
            <span>Configurações Torre</span>
          </button>
          <button
            onClick={() => setSelectedCompany('stop')}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <StopcaseLogo size={14} className="w-3.5 h-3.5" />
            <span>Configurações Stop Case</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <Building2 className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">Cadastro de Empresas & Filiais</h3>
          <p className="text-xs text-slate-500">
            CNPJs, inscrições estaduais e regimes tributários das filiais em SP, CE, BA, PE e RS.
          </p>
          <span className="text-[11px] text-emerald-600 font-semibold block">
            5 Filiais Regulares
          </span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
            <Globe className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">Central dos 10 Portais Web</h3>
          <p className="text-xs text-slate-500">
            DNS, certificados SSL, domínios e parâmetros de SEO para cada portal por cidade.
          </p>
          <button
            onClick={() => setActiveModule('sites')}
            className="text-[11px] text-blue-600 font-bold hover:underline cursor-pointer"
          >
            Acessar Gestão de Sites →
          </button>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Shield className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">Perfis de Acesso & Segurança</h3>
          <p className="text-xs text-slate-500">
            RBAC multi-tenant: Diretoria Geral, Gerentes de Unidade, Operadores de Balcão e Equipe de Higienização.
          </p>
          <span className="text-[11px] text-slate-700 font-semibold block">
            42 Usuários Ativos
          </span>
        </div>
      </div>
    </div>
  );
};
