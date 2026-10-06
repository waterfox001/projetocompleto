import React, { useState } from 'react';
import {
  CalendarDays,
  Search,
  Plus,
  ArrowRight,
  MessageCircle,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ReservationStatus } from '../../types';

export const ReservationsView: React.FC = () => {
  const {
    reservations,
    setIsNewReservationModalOpen,
    convertReservationToRental,
    cancelReservation,
    openWhatsAppModal,
    setSelectedProductId
  } = useApp();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('TODAS');

  const filteredReservations = reservations.filter(r => {
    const matchesStatus = statusFilter === 'TODAS' || r.status === statusFilter;
    const q = search.toLowerCase();
    const matchesSearch =
      r.reservationNumber.toLowerCase().includes(q) ||
      r.customerName.toLowerCase().includes(q) ||
      r.items.some(i => i.productName.toLowerCase().includes(q) || i.productCode.toLowerCase().includes(q));
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: ReservationStatus) => {
    switch (status) {
      case 'confirmada':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-200/80">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            Confirmada
          </span>
        );
      case 'ativa':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/80">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
            Convertida em Locação
          </span>
        );
      case 'aguardando_pagamento':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-200/80">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
            Aguardando Pgto
          </span>
        );
      case 'cancelada':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
            Cancelada
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Reservas Programadas</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Fluxo: Cliente → Escolhe Produto → Verifica Disponibilidade → Reserva → Pagamento → Entrega
          </p>
        </div>
        <button
          onClick={() => setIsNewReservationModalOpen(true)}
          className="flex items-center space-x-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs shadow-blue-600/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>+ Nova Reserva</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-3 rounded-xl border border-slate-200/80 flex flex-col sm:flex-row gap-3 items-center justify-between shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Buscar por reserva, cliente ou item..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:border-blue-500 transition-all"
          />
        </div>

        <div className="flex items-center gap-1 p-0.5 bg-slate-100/80 rounded-lg border border-slate-200/60 overflow-x-auto w-full sm:w-auto">
          {[
            { id: 'TODAS', label: 'Todas' },
            { id: 'confirmada', label: 'Confirmadas' },
            { id: 'aguardando_pagamento', label: 'Aguardando Pgto' },
            { id: 'ativa', label: 'Convertidas' },
            { id: 'cancelada', label: 'Canceladas' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-all ${
                statusFilter === tab.id
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Reservations Table */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/70 border-b border-slate-200/80 text-slate-500 font-semibold uppercase text-[11px] tracking-wider">
              <tr>
                <th className="py-2.5 px-4">Reserva / Cliente</th>
                <th className="py-2.5 px-4">Itens Reservados</th>
                <th className="py-2.5 px-4">Período Previsto</th>
                <th className="py-2.5 px-4">Valores</th>
                <th className="py-2.5 px-4">Pagamento</th>
                <th className="py-2.5 px-4">Status</th>
                <th className="py-2.5 px-4 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredReservations.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400 text-xs">
                    Nenhuma reserva encontrada com os filtros atuais.
                  </td>
                </tr>
              ) : (
                filteredReservations.map(res => (
                  <tr key={res.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-mono font-semibold text-blue-600 text-xs">{res.reservationNumber}</div>
                      <div className="font-medium text-slate-900 mt-0.5">{res.customerName}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{res.customerPhone}</div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="space-y-1">
                        {res.items.map((item, idx) => (
                          <div key={idx} className="flex items-center space-x-1.5">
                            <button
                              onClick={() => setSelectedProductId(item.productId)}
                              className="font-mono bg-slate-100 hover:bg-blue-100 text-slate-700 hover:text-blue-700 text-[10px] px-1.5 py-0.5 rounded font-medium transition-colors"
                            >
                              {item.productCode}
                            </button>
                            <span className="text-slate-700 truncate max-w-[160px] text-[11px]">{item.productName}</span>
                          </div>
                        ))}
                      </div>
                    </td>

                    <td className="py-3 px-4 text-[11px]">
                      <div className="font-mono tabular-nums text-slate-800 font-medium">
                        {res.startDate} → {res.endDate}
                      </div>
                      <span className="text-slate-400 font-mono text-[10px]">{res.totalDays} dias de locação</span>
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-900 font-mono tabular-nums">
                        R$ {res.totalAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">Caução: R$ {res.depositValue}</div>
                    </td>

                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium font-mono uppercase ${
                        res.paymentStatus === 'pago' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/80' : 'bg-amber-50 text-amber-700 border border-amber-200/80'
                      }`}>
                        {res.paymentStatus} · {res.paymentMethod}
                      </span>
                    </td>

                    <td className="py-3 px-4">{getStatusBadge(res.status)}</td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end space-x-1">
                        <button
                          onClick={() =>
                            openWhatsAppModal({
                              phone: res.customerPhone,
                              customerName: res.customerName,
                              defaultText: `Olá ${res.customerName}! Sua reserva ${res.reservationNumber} para o período de ${res.startDate} a ${res.endDate} está confirmada e pronta.`,
                              type: 'confirmacao'
                            })
                          }
                          className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                          title="Enviar confirmação WhatsApp"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </button>

                        {res.status !== 'ativa' && res.status !== 'cancelada' && (
                          <>
                            <button
                              onClick={() => convertReservationToRental(res.id)}
                              className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-medium rounded-md shadow-2xs transition-colors flex items-center space-x-1"
                              title="Transformar esta reserva em locação ativa e entregar os produtos"
                            >
                              <span>Ativar Locação</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => cancelReservation(res.id)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                              title="Cancelar Reserva"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
