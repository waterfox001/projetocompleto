import React from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { CITIES_DATA } from '../../data/platformData';
import {
  Layers,
  MapPin,
  CheckCircle2,
  Clock,
  Truck,
  Luggage,
  Sparkles,
  AlertTriangle,
  ArrowRight,
  Building2,
} from 'lucide-react';
import { TorreDeBebelLogo } from '../../projects/torre-os/components/TorreDeBebelLogo';
import { StopcaseLogo } from '../../projects/stop-os/components/common/StopcaseLogo';

export const ConsolidatedOperationalView: React.FC = () => {
  const { setSelectedCity, setSelectedCompany } = usePlatform();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
            LOGÍSTICA & AEROPORTOS
          </span>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            Central Operacional dos 5 Polos Aeroportuários
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitoramento de lockers inteligentes em tempo real e rotas de entrega e devolução de itens infantis.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedCompany('torre')}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <TorreDeBebelLogo size={14} />
            <span>Central Torre de Bebel</span>
          </button>
          <button
            onClick={() => setSelectedCompany('stop')}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <StopcaseLogo size={14} className="w-3.5 h-3.5" />
            <span>Operação Stop Case</span>
          </button>
        </div>
      </div>

      {/* 5 City Airport Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {CITIES_DATA.map((city) => (
          <div
            key={city.id}
            className="bg-white rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all p-5 space-y-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900">{city.name}</h3>
                  <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 font-bold text-[10px]">
                    {city.airportCode}
                  </span>
                </div>
                <span className="text-xs text-slate-500">{city.airportName}</span>
              </div>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Operacional
              </span>
            </div>

            {/* Split Operations */}
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-emerald-50/50 border border-emerald-100 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-slate-900">
                    <TorreDeBebelLogo size={14} />
                    <span>Torre de Bebel</span>
                  </div>
                  <span className="text-[11px] text-slate-500 block mt-0.5">
                    {city.terminalTorre}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Responsável: {city.managerTorre}
                  </span>
                </div>
                <span className="font-bold text-emerald-700 tabular-nums">
                  {city.activeTorreRentals} locações
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-amber-50/50 border border-amber-100 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-slate-900">
                    <StopcaseLogo size={14} className="w-3.5 h-3.5" />
                    <span>Stop Case</span>
                  </div>
                  <span className="text-[11px] text-slate-500 block mt-0.5">
                    {city.terminalStop}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Responsável: {city.managerStop}
                  </span>
                </div>
                <span className="font-bold text-amber-700 tabular-nums">
                  {city.activeStopVolumes} volumes
                </span>
              </div>
            </div>

            <button
              onClick={() => setSelectedCity(city.id)}
              className="w-full py-2 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>Ver Operação Detalhada desta Praça</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
