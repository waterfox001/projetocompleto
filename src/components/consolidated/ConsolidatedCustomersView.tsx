import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import {
  Users,
  Search,
  Star,
  MapPin,
  Calendar,
  Phone,
  Mail,
  ShieldCheck,
  Building2,
  Sparkles,
} from 'lucide-react';
import { TorreDeBebelLogo } from '../../projects/torre-os/components/TorreDeBebelLogo';
import { StopcaseLogo } from '../../projects/stop-os/components/common/StopcaseLogo';

export const ConsolidatedCustomersView: React.FC = () => {
  const { setSelectedCompany } = usePlatform();
  const [searchTerm, setSearchTerm] = useState('');

  const sampleCustomers = [
    {
      id: 'c-1',
      name: 'Mariana Costa Silveira',
      cpf: '234.891.458-12',
      phone: '(11) 98452-9182',
      email: 'mariana.silveira@gmail.com',
      city: 'São Paulo (CGH)',
      services: ['Torre de Bebel', 'Stop Case'],
      totalSpent: 'R$ 5.840,00',
      lastInteraction: '05/10/2026',
      badge: 'Cliente VIP Cruzado',
      badgeColor: 'bg-purple-100 text-purple-800',
    },
    {
      id: 'c-2',
      name: 'Carlos Henrique Albuquerque',
      cpf: '405.129.837-22',
      phone: '(11) 98144-2201',
      email: 'carlos.albuquerque@gmail.com',
      city: 'São Paulo (CGH)',
      services: ['Stop Case'],
      totalSpent: 'R$ 1.940,00',
      lastInteraction: '04/10/2026',
      badge: 'Viajante Frequente',
      badgeColor: 'bg-amber-100 text-amber-800',
    },
    {
      id: 'c-3',
      name: 'Juliana Paiva Albuquerque',
      cpf: '381.992.140-54',
      phone: '(85) 99876-5432',
      email: 'juliana.albuquerque@outlook.com',
      city: 'Fortaleza (FOR)',
      services: ['Torre de Bebel'],
      totalSpent: 'R$ 3.420,00',
      lastInteraction: '02/10/2026',
      badge: 'Família Recorrente',
      badgeColor: 'bg-emerald-100 text-emerald-800',
    },
    {
      id: 'c-4',
      name: 'Rodrigo Santoro Filho',
      cpf: '312.984.770-19',
      phone: '(71) 99341-8890',
      email: 'rodrigo.santoro@empresa.com.br',
      city: 'Salvador (SSA)',
      services: ['Stop Case', 'Torre de Bebel'],
      totalSpent: 'R$ 4.190,00',
      lastInteraction: '01/10/2026',
      badge: 'Cliente VIP Cruzado',
      badgeColor: 'bg-purple-100 text-purple-800',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
            BASE UNIFICADA DE CLIENTES
          </span>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            CRM Central da Holding (+12.430 Clientes)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Visão unificada de viajantes de negócios e famílias que utilizam simultaneamente a Torre de Bebel e a Stop Case.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedCompany('torre')}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <TorreDeBebelLogo size={14} />
            <span>Clientes Torre</span>
          </button>
          <button
            onClick={() => setSelectedCompany('stop')}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <StopcaseLogo size={14} className="w-3.5 h-3.5" />
            <span>Clientes Stop Case</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar clientes por nome, CPF, telefone ou cidade em ambas as empresas..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs"
        />
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/70 text-slate-600 uppercase font-bold text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Cliente</th>
                <th className="py-3 px-4">Contato</th>
                <th className="py-3 px-4">Cidade / Polo</th>
                <th className="py-3 px-4">Serviços Utilizados</th>
                <th className="py-3 px-4 text-right">Gasto Acumulado (LTV)</th>
                <th className="py-3 px-4 text-center">Perfil</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              {sampleCustomers.map((cust) => (
                <tr key={cust.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-slate-900 block">{cust.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono">CPF: {cust.cpf}</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">
                    <span className="block">{cust.phone}</span>
                    <span className="text-[10px] text-slate-400">{cust.email}</span>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-700">{cust.city}</td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5">
                      {cust.services.includes('Torre de Bebel') && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                          <TorreDeBebelLogo size={10} />
                          Torre
                        </span>
                      )}
                      {cust.services.includes('Stop Case') && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1">
                          <StopcaseLogo size={10} className="w-2.5 h-2.5" />
                          Stop
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-right font-bold text-slate-900 tabular-nums">
                    {cust.totalSpent}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${cust.badgeColor}`}>
                      {cust.badge}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
