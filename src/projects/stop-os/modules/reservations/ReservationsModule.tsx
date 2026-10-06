import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  CalendarDays,
  Plus,
  Search,
  Printer
} from 'lucide-react';

export const ReservationsModule: React.FC = () => {
  const {
    reservations,
    selectedUnitId,
    setSelectedReservationId,
    setIsQuickCreateOpen,
    setQuickCreateType,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'todas' | 'hoje' | 'proximas' | 'finalizadas'>('todas');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('todos');

  const filteredReservations = reservations.filter((r) => {
    const matchesUnit = selectedUnitId === 'all' || r.unitId === selectedUnitId;
    const matchesSearch =
      r.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.customerPhone.includes(searchTerm);

    const matchesCategory = filterCategory === 'todos' || r.category === filterCategory;

    let matchesTab = true;
    const isToday = r.startDate.startsWith('2026-10-05');
    if (activeTab === 'hoje') matchesTab = isToday && r.status === 'active';
    if (activeTab === 'proximas') matchesTab = r.status === 'confirmed';
    if (activeTab === 'finalizadas') matchesTab = r.status === 'completed';

    return matchesUnit && matchesSearch && matchesCategory && matchesTab;
  });

  return (
    <div className="space-y-4 pb-10">
      {/* Top Header */}
      <div className="bg-white border border-slate-200 rounded p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-slate-900 tracking-tight">
              Controle Geral de Reservas & Guarda-Volumes
            </h2>
            <span className="text-[11px] text-slate-400">·</span>
            <span className="text-xs text-slate-500 font-mono">
              Emissão de vouchers, tarifas e check-out
            </span>
          </div>
        </div>

        <button
          onClick={() => {
            setQuickCreateType('reservation');
            setIsQuickCreateOpen(true);
          }}
          className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-medium rounded transition-colors cursor-pointer flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Nova Reserva</span>
        </button>
      </div>

      {/* Filter and Tab Bar */}
      <div className="bg-white border border-slate-200 rounded p-3 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        {/* Status Subtabs */}
        <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded">
          <button
            onClick={() => setActiveTab('todas')}
            className={`px-2.5 py-1 rounded transition-colors cursor-pointer font-medium ${
              activeTab === 'todas' ? 'bg-white text-slate-900 font-semibold shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Todas ({reservations.length})
          </button>
          <button
            onClick={() => setActiveTab('hoje')}
            className={`px-2.5 py-1 rounded transition-colors cursor-pointer font-medium ${
              activeTab === 'hoje' ? 'bg-white text-slate-900 font-semibold shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Hoje (Ativas)
          </button>
          <button
            onClick={() => setActiveTab('proximas')}
            className={`px-2.5 py-1 rounded transition-colors cursor-pointer font-medium ${
              activeTab === 'proximas' ? 'bg-white text-slate-900 font-semibold shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Confirmadas
          </button>
          <button
            onClick={() => setActiveTab('finalizadas')}
            className={`px-2.5 py-1 rounded transition-colors cursor-pointer font-medium ${
              activeTab === 'finalizadas' ? 'bg-white text-slate-900 font-semibold shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Concluídas
          </button>
        </div>

        {/* Search & Category Filter */}
        <div className="flex items-center gap-2">
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar reserva, cliente, telefone..."
              className="w-full pl-8 pr-2.5 py-1 bg-white border border-slate-200 rounded text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-600"
            />
          </div>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-2 py-1 bg-white border border-slate-200 rounded text-xs text-slate-700 cursor-pointer focus:outline-none focus:border-amber-600"
          >
            <option value="todos">Todas Categorias</option>
            <option value="P">Pequeno (Mochila)</option>
            <option value="M">Médio (Mala Bordo)</option>
            <option value="G">Grande (Mala 23kg)</option>
            <option value="ESP">Especial (Prancha/Bike)</option>
          </select>
        </div>
      </div>

      {/* Enterprise Reservations Table */}
      <div className="bg-white border border-slate-200 rounded overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] text-slate-600 font-semibold">
                <th className="py-2 px-3">Código</th>
                <th className="py-2 px-3">Passageiro</th>
                <th className="py-2 px-3">Telefone</th>
                <th className="py-2 px-3">Base</th>
                <th className="py-2 px-3">Cat.</th>
                <th className="py-2 px-3">Vols</th>
                <th className="py-2 px-3">Início</th>
                <th className="py-2 px-3">Previsão Fim</th>
                <th className="py-2 px-3">Valor</th>
                <th className="py-2 px-3">Status</th>
                <th className="py-2 px-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredReservations.map((res) => (
                <tr key={res.id} className="hover:bg-slate-50/70">
                  <td className="py-2.5 px-3 font-mono font-medium text-slate-900">
                    {res.id}
                  </td>
                  <td className="py-2.5 px-3 text-slate-800 font-medium">
                    {res.customerName}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-slate-500 text-[11px]">
                    {res.customerPhone}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-slate-700">
                    {res.unitId}
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 font-semibold">
                      {res.category}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-slate-800">
                    {res.quantity}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-slate-500 text-[11px]">
                    {new Date(res.startDate).toLocaleDateString('pt-BR')} {res.startDate.split('T')[1]?.slice(0, 5)}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-slate-500 text-[11px]">
                    {new Date(res.expectedEndDate).toLocaleDateString('pt-BR')} {res.expectedEndDate.split('T')[1]?.slice(0, 5)}
                  </td>
                  <td className="py-2.5 px-3 font-mono font-semibold text-slate-900">
                    R$ {res.finalAmount.toFixed(2)}
                  </td>
                  <td className="py-2.5 px-3">
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border font-medium ${
                      res.status === 'active'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : res.status === 'confirmed'
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}>
                      {res.status === 'active' ? 'ATIVA' : res.status === 'confirmed' ? 'CONFIRMADA' : 'CONCLUÍDA'}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => showToast('Comprovante', `Reimpresso comprovante ${res.id}`, 'info')}
                        className="text-slate-400 hover:text-slate-700 p-0.5 cursor-pointer"
                        title="Imprimir comprovante"
                      >
                        <Printer className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setSelectedReservationId(res.id)}
                        className="text-xs text-amber-700 hover:underline font-medium cursor-pointer"
                      >
                        Detalhes
                      </button>
                    </div>
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
