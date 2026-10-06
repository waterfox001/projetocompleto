import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Box,
  Search,
  AlertTriangle
} from 'lucide-react';

export const VolumesModule: React.FC = () => {
  const {
    volumes,
    units,
    selectedUnitId,
    setSelectedVolumeId,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'grid' | 'lista'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArea, setSelectedArea] = useState<'A' | 'B' | 'C'>('A');

  const currentUnit = units.find((u) => u.id === selectedUnitId) || units[0];

  const filteredVolumes = volumes.filter((v) => {
    const matchesUnit = selectedUnitId === 'all' || v.unitId === selectedUnitId;
    const matchesSearch =
      v.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.tagNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.locationPosition.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesUnit && matchesSearch;
  });

  const gridPositions = Array.from({ length: 12 }, (_, i) => {
    const num = String(i + 1).padStart(2, '0');
    const posCode = `${selectedArea}${num}`;
    const occupant = volumes.find(
      (v) => (selectedUnitId === 'all' || v.unitId === selectedUnitId) && v.locationPosition === posCode && v.status === 'stored'
    );
    return {
      code: posCode,
      occupant,
      status: occupant ? 'ocupado' : i === 11 ? 'manutencao' : 'disponivel'
    };
  });

  return (
    <div className="space-y-4 pb-10">
      {/* Top Header */}
      <div className="bg-white border border-slate-200 rounded p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-slate-900 tracking-tight">
              Rastreabilidade de Volumes & Armários: {selectedUnitId === 'all' ? 'Todas as Bases' : currentUnit.name}
            </h2>
            <span className="text-[11px] text-slate-400">·</span>
            <span className="text-xs text-slate-500 font-mono">
              Localização Física por Bloco & Posição
            </span>
          </div>
        </div>

        {/* Submenu Tabs */}
        <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded text-xs">
          <button
            onClick={() => setActiveTab('grid')}
            className={`px-2.5 py-1 rounded transition-colors cursor-pointer font-medium ${
              activeTab === 'grid' ? 'bg-white text-slate-900 font-semibold shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Grade Visual de Armários
          </button>
          <button
            onClick={() => setActiveTab('lista')}
            className={`px-2.5 py-1 rounded transition-colors cursor-pointer font-medium ${
              activeTab === 'lista' ? 'bg-white text-slate-900 font-semibold shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Lista de Volumes
          </button>
        </div>
      </div>

      {/* Capacity Alert if unit is near limit */}
      {currentUnit.capacityOccupied / currentUnit.capacityTotal >= 0.85 && (
        <div className="p-3 bg-amber-50 border border-amber-200 rounded flex items-center justify-between text-xs text-amber-900">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
            <span>
              <strong>Capacidade Crítica:</strong> A base {currentUnit.shortName} atingiu{' '}
              {Math.round((currentUnit.capacityOccupied / currentUnit.capacityTotal) * 100)}% de ocupação. Direcionar novos volumes para o Bloco B.
            </span>
          </div>
          <span className="font-mono text-xs font-semibold text-amber-800 shrink-0">
            {currentUnit.capacityTotal - currentUnit.capacityOccupied} vagas livres
          </span>
        </div>
      )}

      {/* TAB 1: GRID VISUAL */}
      {activeTab === 'grid' && (
        <div className="bg-white border border-slate-200 rounded p-4 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-slate-800">Bloco / Área:</span>
              <div className="flex gap-1 bg-slate-100 p-0.5 rounded text-xs">
                {(['A', 'B', 'C'] as const).map((area) => (
                  <button
                    key={area}
                    onClick={() => setSelectedArea(area)}
                    className={`px-2.5 py-1 rounded font-mono font-medium transition-colors cursor-pointer ${
                      selectedArea === area ? 'bg-white text-slate-900 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Bloco {area}
                  </button>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-3 text-[11px] text-slate-500 font-mono">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-slate-100 border border-slate-300" />
                <span>Livre</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-amber-100 border border-amber-300" />
                <span>Ocupado</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-rose-100 border border-rose-300" />
                <span>Bloqueado</span>
              </div>
            </div>
          </div>

          {/* Grid Slots */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {gridPositions.map((pos) => {
              const isOccupied = pos.status === 'ocupado';
              const isMaintenance = pos.status === 'manutencao';

              return (
                <div
                  key={pos.code}
                  onClick={() => {
                    if (pos.occupant) {
                      setSelectedVolumeId(pos.occupant.id);
                    } else if (!isMaintenance) {
                      showToast('Posição Livre', `Posição ${pos.code} disponível para novos check-ins.`, 'info');
                    }
                  }}
                  className={`p-3 rounded border text-xs flex flex-col justify-between min-h-[95px] cursor-pointer transition-colors ${
                    isOccupied
                      ? 'bg-amber-50/70 border-amber-200 hover:border-amber-400'
                      : isMaintenance
                      ? 'bg-rose-50/50 border-rose-200 opacity-80 cursor-not-allowed'
                      : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-slate-900">{pos.code}</span>
                    <span className={`text-[10px] font-mono px-1 rounded ${
                      isOccupied
                        ? 'text-amber-800 bg-amber-100 font-semibold'
                        : isMaintenance
                        ? 'text-rose-700 bg-rose-100'
                        : 'text-slate-500 bg-slate-100'
                    }`}>
                      {isOccupied ? 'OCUPADO' : isMaintenance ? 'BLOQUEADO' : 'LIVRE'}
                    </span>
                  </div>

                  {pos.occupant ? (
                    <div className="mt-2 leading-tight">
                      <div className="font-mono text-[11px] font-semibold text-slate-900 truncate">
                        {pos.occupant.id}
                      </div>
                      <div className="text-[11px] text-slate-600 truncate mt-0.5">
                        {pos.occupant.customerName}
                      </div>
                    </div>
                  ) : (
                    <div className="text-[11px] text-slate-400 font-mono mt-2">
                      {isMaintenance ? 'Em reparo' : 'Disponível'}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: LISTA DE VOLUMES */}
      {activeTab === 'lista' && (
        <div className="bg-white border border-slate-200 rounded">
          <div className="p-3 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="relative w-full sm:w-72">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Filtrar por código, tag, cliente ou armário..."
                className="w-full pl-8 pr-2.5 py-1.5 bg-white border border-slate-200 rounded text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-600"
              />
            </div>
            <span className="font-mono text-slate-500 text-[11px]">
              {filteredVolumes.length} volumes listados
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] text-slate-600 font-semibold">
                  <th className="py-2 px-3">Código</th>
                  <th className="py-2 px-3">Tag Térmica</th>
                  <th className="py-2 px-3">Passageiro</th>
                  <th className="py-2 px-3">Base</th>
                  <th className="py-2 px-3">Posição</th>
                  <th className="py-2 px-3">Entrada</th>
                  <th className="py-2 px-3">Status</th>
                  <th className="py-2 px-3 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredVolumes.map((vol) => (
                  <tr key={vol.id} className="hover:bg-slate-50/70">
                    <td className="py-2 px-3 font-mono font-medium text-slate-900">
                      {vol.id}
                    </td>
                    <td className="py-2 px-3 font-mono text-slate-500">
                      {vol.tagNumber}
                    </td>
                    <td className="py-2 px-3 text-slate-800">
                      {vol.customerName}
                    </td>
                    <td className="py-2 px-3 font-mono text-slate-500">
                      {vol.unitId}
                    </td>
                    <td className="py-2 px-3">
                      <span className="font-mono text-xs px-1.5 py-0.5 rounded bg-slate-100 text-slate-800 font-bold border border-slate-200">
                        {vol.locationPosition}
                      </span>
                    </td>
                    <td className="py-2 px-3 font-mono text-slate-500 text-[11px]">
                      {new Date(vol.checkInTime).toLocaleDateString('pt-BR')} {vol.checkInTime.split('T')[1]?.slice(0, 5)}
                    </td>
                    <td className="py-2 px-3">
                      <span className={`text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded border ${
                        vol.status === 'stored'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-slate-100 text-slate-600 border-slate-200'
                      }`}>
                        {vol.status === 'stored' ? 'ARMAZENADO' : 'RETIRADO'}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-right">
                      <button
                        onClick={() => setSelectedVolumeId(vol.id)}
                        className="text-xs text-amber-700 hover:underline font-medium cursor-pointer"
                      >
                        Visualizar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
