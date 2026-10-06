import React, { useState } from 'react';
import {
  CalendarCheck,
  Search,
  Plus,
  Filter,
  Eye,
  MessageCircle,
  RotateCcw,
  CheckCircle,
  Clock,
  AlertTriangle,
  FileText,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Rental, RentalStatus } from '../../types';

export const RentalsView: React.FC = () => {
  const {
    rentals,
    setIsNewRentalModalOpen,
    openWhatsAppModal,
    setSelectedProductId,
    processReturnConference,
    setCurrentView
  } = useApp();

  const [filterStatus, setFilterStatus] = useState<string>('TODAS');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRental, setSelectedRental] = useState<Rental | null>(null);

  const filteredRentals = rentals.filter(r => {
    const matchesStatus = filterStatus === 'TODAS' || r.status === filterStatus;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      r.rentalNumber.toLowerCase().includes(q) ||
      r.customerName.toLowerCase().includes(q) ||
      r.items.some(i => i.productName.toLowerCase().includes(q) || i.productCode.toLowerCase().includes(q));
    return matchesStatus && matchesSearch;
  });

  const statusBadge = (status: RentalStatus) => {
    switch (status) {
      case 'ativa':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-200/80">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            Em Andamento
          </span>
        );
      case 'atrasada':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium bg-rose-50 text-rose-700 border border-rose-200/80">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
            Atrasada
          </span>
        );
      case 'devolucao_hoje':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-200/80">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
            Devolução Hoje
          </span>
        );
      case 'preparacao':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium bg-purple-50 text-purple-700 border border-purple-200/80">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
            Em Separação
          </span>
        );
      case 'devolvida':
      case 'finalizada':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/80">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
            Devolvida
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
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Gestão Central de Locações</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Controle de contratos, períodos em curso, cauções e ciclo de vida
          </p>
        </div>
        <button
          onClick={() => setIsNewRentalModalOpen(true)}
          className="flex items-center space-x-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs shadow-blue-600/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>+ Nova Locação</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-3 rounded-xl border border-slate-200/80 flex flex-col sm:flex-row gap-3 items-center justify-between shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Buscar por locação, cliente ou produto..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:border-blue-500 transition-all"
          />
        </div>

        {/* Clean Segmented Filter */}
        <div className="flex items-center gap-1 p-0.5 bg-slate-100/80 rounded-lg border border-slate-200/60 overflow-x-auto w-full sm:w-auto">
          {[
            { id: 'TODAS', label: 'Todas' },
            { id: 'ativa', label: 'Ativas' },
            { id: 'atrasada', label: 'Atrasadas' },
            { id: 'devolucao_hoje', label: 'Devolução Hoje' },
            { id: 'devolvida', label: 'Concluídas' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id)}
              className={`px-3 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-all ${
                filterStatus === tab.id
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Rentals Table */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/70 border-b border-slate-200/80 text-slate-500 font-semibold uppercase text-[11px] tracking-wider">
              <tr>
                <th className="py-2.5 px-4">Locação / Cliente</th>
                <th className="py-2.5 px-4">Produtos Alugados</th>
                <th className="py-2.5 px-4">Período</th>
                <th className="py-2.5 px-4">Financeiro</th>
                <th className="py-2.5 px-4">Caução</th>
                <th className="py-2.5 px-4">Status</th>
                <th className="py-2.5 px-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRentals.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400 text-xs">
                    Nenhuma locação encontrada com os filtros selecionados.
                  </td>
                </tr>
              ) : (
                filteredRentals.map(rental => (
                  <tr key={rental.id} className="hover:bg-slate-50/60 transition-colors">
                    {/* Rental / Customer */}
                    <td className="py-3 px-4">
                      <div className="font-mono font-semibold text-blue-600 text-xs">{rental.rentalNumber}</div>
                      <div className="font-medium text-slate-900 mt-0.5">{rental.customerName}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{rental.customerPhone}</div>
                    </td>

                    {/* Products */}
                    <td className="py-3 px-4">
                      <div className="space-y-1">
                        {rental.items.map((item, idx) => (
                          <div key={idx} className="flex items-center space-x-1.5">
                            <button
                              onClick={() => setSelectedProductId(item.productId)}
                              className="font-mono bg-slate-100 hover:bg-blue-100 text-slate-700 hover:text-blue-700 text-[10px] px-1.5 py-0.5 rounded font-medium transition-colors"
                            >
                              {item.productCode}
                            </button>
                            <span className="text-slate-700 truncate max-w-[170px] text-[11px]">{item.productName}</span>
                          </div>
                        ))}
                      </div>
                    </td>

                    {/* Dates */}
                    <td className="py-3 px-4 text-[11px]">
                      <div className="text-slate-600 font-mono tabular-nums">
                        Início: <strong className="text-slate-800">{rental.startDate}</strong>
                      </div>
                      <div className={`font-mono tabular-nums mt-0.5 ${rental.status === 'atrasada' ? 'text-rose-600 font-semibold' : 'text-slate-600'}`}>
                        Retorno: <strong>{rental.expectedReturnDate}</strong>
                      </div>
                    </td>

                    {/* Finance */}
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-900 font-mono tabular-nums">
                        R$ {rental.totalAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </div>
                      <div className="text-[10px] text-slate-400 uppercase mt-0.5">
                        {rental.paymentMethod} · {rental.paymentStatus}
                      </div>
                    </td>

                    {/* Deposit */}
                    <td className="py-3 px-4">
                      <div className="font-semibold text-blue-600 font-mono tabular-nums">
                        R$ {rental.depositAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </div>
                      <div className="text-[10px] text-slate-400 capitalize mt-0.5">{rental.depositStatus}</div>
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4">{statusBadge(rental.status)}</td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end space-x-1">
                        {/* Open Drawer Details */}
                        <button
                          onClick={() => setSelectedRental(rental)}
                          className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                          title="Ver Dossiê e Contrato"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        {/* WhatsApp Communication */}
                        <button
                          onClick={() =>
                            openWhatsAppModal({
                              phone: rental.customerPhone,
                              customerName: rental.customerName,
                              defaultText:
                                rental.status === 'atrasada'
                                  ? `Olá ${rental.customerName}! Constatamos que a locação ${rental.rentalNumber} expirou em ${rental.expectedReturnDate}. Podemos agendar a coleta ou renovar?`
                                  : `Olá ${rental.customerName}! Informamos que sua locação ${rental.rentalNumber} está em dia!`,
                              type: rental.status === 'atrasada' ? 'cobranca' : 'lembrete'
                            })
                          }
                          className="p-1.5 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
                          title="Conversar pelo WhatsApp"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </button>

                        {/* Return Action */}
                        {rental.status !== 'finalizada' && rental.status !== 'devolvida' && (
                          <button
                            onClick={() => {
                              setCurrentView('returns');
                            }}
                            className="px-2 py-1 text-[11px] font-medium text-amber-700 bg-amber-50 hover:bg-amber-100/80 border border-amber-200/80 rounded-md transition-colors"
                            title="Registrar devolução e conferir produto"
                          >
                            Check Devolução
                          </button>
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

      {/* Drawer: Detailed Timeline & Contract Modal */}
      {selectedRental && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
            <div className="p-4 bg-white text-slate-900 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-slate-900">
                  {selectedRental.rentalNumber} · Dossiê Operacional
                </h3>
                <div className="text-xs text-slate-500">Cliente: {selectedRental.customerName}</div>
              </div>
              <button
                onClick={() => setSelectedRental(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6">
              {/* Timeline Flow */}
              <div>
                <div className="text-xs font-semibold uppercase text-slate-400 tracking-wider mb-3">
                  Ciclo de Vida da Locação
                </div>
                <div className="space-y-4 border-l-2 border-slate-100 pl-4 ml-2">
                  {selectedRental.timeline.map((st, idx) => (
                    <div key={idx} className="relative">
                      <div
                        className={`absolute -left-[23px] top-0.5 w-3 h-3 rounded-full border-2 border-white ${
                          st.done ? 'bg-blue-600' : 'bg-slate-300'
                        }`}
                      />
                      <div className="text-xs font-semibold text-slate-800">{st.step}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{st.timestamp}</div>
                      {st.note && (
                        <div className="text-[11px] text-rose-600 font-medium mt-0.5">
                          {st.note}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Contract specs */}
              <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-lg space-y-2 text-xs">
                <div className="font-semibold text-slate-900 flex items-center space-x-1.5">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span>Contrato de Adesão & Termo de Caução</span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Contrato eletrônico assinado e autenticado. Caução de R$ {selectedRental.depositAmount} sob custódia de garantia para eventuais danos ou atrasos.
                </p>
                <div className="pt-2 flex justify-between font-mono text-[11px] text-slate-500 border-t border-slate-200/60">
                  <span>Entrega: {selectedRental.deliveryType}</span>
                  <span className="truncate max-w-[250px]">{selectedRental.address}</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setSelectedRental(null)}
                className="px-3.5 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 shadow-xs transition-colors"
              >
                Fechar Detalhes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
