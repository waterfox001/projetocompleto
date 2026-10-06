import React, { useState } from 'react';
import { Truck, MapPin, Clock, Phone, CheckCircle, AlertTriangle, ArrowRight, MessageCircle, Plus, X, Search } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DeliveriesView: React.FC = () => {
  const { deliveries, updateDeliveryStatus, createDeliveryOrder, openWhatsAppModal } = useApp();

  const [filterStatus, setFilterStatus] = useState<string>('TODAS');
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false);

  // New Order Form state
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [address, setAddress] = useState('');
  const [timeWindow, setTimeWindow] = useState('09:00 - 12:00');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [driverName, setDriverName] = useState('João Silva (Motorista 01)');
  const [itemCode, setItemCode] = useState('CR-001');
  const [itemName, setItemName] = useState('Carrinho de Bebê Yoyo²');
  const [notes, setNotes] = useState('');

  const filtered = deliveries.filter(d => {
    const matchesStatus = filterStatus === 'TODAS' || d.status === filterStatus;
    const matchesSearch =
      !searchQuery ||
      d.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.driverName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.items.some(i => i.productCode.toLowerCase().includes(searchQuery.toLowerCase()) || i.productName.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !address) return;

    createDeliveryOrder({
      rentalId: `rent-manual-${Date.now()}`,
      customerName,
      phone: customerPhone || '(11) 98888-0000',
      address,
      timeWindow,
      date,
      driverName,
      items: [{ productCode: itemCode || 'PROD-01', productName: itemName || 'Equipamento Torre de Bebel' }],
      status: 'separando',
      notes
    });

    setIsNewOrderModalOpen(false);
    setCustomerName('');
    setCustomerPhone('');
    setAddress('');
    setNotes('');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'entregue':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/80">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
            Entregue
          </span>
        );
      case 'em_rota':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-200/80">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            Em Rota
          </span>
        );
      case 'separando':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-200/80">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
            Separando
          </span>
        );
      case 'pronto':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-purple-50 text-purple-700 border border-purple-200/80">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
            Pronto para Saída
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
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Logística & Roteiro de Entregas</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Gestão de rotas de entrega e coleta domiciliar com janelas agendadas e motoristas dedicados
          </p>
        </div>

        <button
          onClick={() => setIsNewOrderModalOpen(true)}
          className="flex items-center space-x-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Nova Ordem de Entrega</span>
        </button>
      </div>

      {/* Filter and Search Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Filter Tabs */}
        <div className="flex items-center gap-1 p-0.5 bg-slate-100/80 rounded-lg border border-slate-200/60 overflow-x-auto w-fit">
          {[
            { id: 'TODAS', label: `Todas (${deliveries.length})` },
            { id: 'separando', label: `Separando (${deliveries.filter(d => d.status === 'separando').length})` },
            { id: 'pronto', label: `Prontos (${deliveries.filter(d => d.status === 'pronto').length})` },
            { id: 'em_rota', label: `Em Rota (${deliveries.filter(d => d.status === 'em_rota').length})` },
            { id: 'entregue', label: `Entregues (${deliveries.filter(d => d.status === 'entregue').length})` }
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

        {/* Search Input */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Buscar por cliente, endereço, item..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg outline-none focus:border-blue-500 w-full sm:w-64"
          />
        </div>
      </div>

      {/* Empty State */}
      {filtered.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-3">
          <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
            <Truck className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-sm text-slate-800">Nenhuma ordem de entrega encontrada</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Não há entregas correspondentes aos filtros selecionados. Altere os critérios ou agende uma nova entrega.
          </p>
          <button
            onClick={() => { setFilterStatus('TODAS'); setSearchQuery(''); }}
            className="px-3 py-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            Limpar Filtros
          </button>
        </div>
      ) : (
        /* Deliveries Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(del => (
            <div
              key={del.id}
              className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col justify-between space-y-3.5 hover:border-slate-300 transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-xs text-slate-900">{del.customerName}</h3>
                    <div className="text-[11px] text-slate-400 font-mono flex items-center space-x-1 mt-0.5">
                      <Phone className="w-3 h-3 text-slate-400" />
                      <span>{del.phone}</span>
                    </div>
                  </div>
                  {getStatusBadge(del.status)}
                </div>

                {/* Items in delivery */}
                <div className="p-2.5 bg-slate-50/70 rounded-lg border border-slate-100 space-y-1">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Itens da Remessa
                  </span>
                  {del.items.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-1.5 text-xs text-slate-800">
                      <span className="font-mono bg-slate-100 text-slate-700 text-[10px] font-medium px-1.5 py-0.2 rounded">
                        {item.productCode}
                      </span>
                      <span className="font-medium truncate text-[11px]">{item.productName}</span>
                    </div>
                  ))}
                </div>

                {/* Address and Window */}
                <div className="space-y-1 text-xs text-slate-600">
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span className="text-[11px] leading-relaxed text-slate-700">{del.address}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-[11px] text-slate-500 font-mono">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Janela: <strong className="text-slate-700">{del.timeWindow}</strong> ({del.date})</span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Motorista: <strong className="text-slate-800">{del.driverName}</strong>
                  </div>
                </div>

                {del.notes && (
                  <div className="p-2 bg-slate-50 rounded-md text-[10px] text-slate-600 italic border border-slate-100">
                    "{del.notes}"
                  </div>
                )}
              </div>

              {/* Quick status progress buttons */}
              <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() =>
                    openWhatsAppModal({
                      phone: del.phone,
                      customerName: del.customerName,
                      defaultText: `Olá ${del.customerName}! O motorista está a caminho para entrega na janela das ${del.timeWindow}. Por gentileza, confirme se haverá alguém no local.`,
                      type: 'endereco'
                    })
                  }
                  className="text-[11px] text-emerald-600 hover:text-emerald-700 font-medium flex items-center space-x-1"
                >
                  <MessageCircle className="w-3 h-3" />
                  <span>Avisar Cliente</span>
                </button>

                <select
                  value={del.status}
                  onChange={e => updateDeliveryStatus(del.id, e.target.value)}
                  className="text-[11px] font-medium px-2 py-1 bg-slate-50 border border-slate-200 rounded-md outline-none cursor-pointer focus:border-blue-500"
                >
                  <option value="separando">Separando</option>
                  <option value="pronto">Pronto</option>
                  <option value="em_rota">Em Rota</option>
                  <option value="entregue">Entregue</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal: Nova Ordem de Entrega */}
      {isNewOrderModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-4 bg-white text-slate-900 flex items-center justify-between border-b border-slate-200">
              <h3 className="font-bold text-sm text-slate-900">Agendar Nova Ordem de Entrega</h3>
              <button onClick={() => setIsNewOrderModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateOrder} className="p-5 space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nome do Cliente</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Amanda Rezende"
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Telefone / WhatsApp</label>
                <input
                  type="text"
                  placeholder="(11) 98765-4321"
                  value={customerPhone}
                  onChange={e => setCustomerPhone(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:border-blue-500 font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Endereço de Entrega</label>
                <input
                  type="text"
                  required
                  placeholder="Rua, número, apto, bairro - Cidade"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Data</label>
                  <input
                    type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Janela de Horário</label>
                  <select
                    value={timeWindow}
                    onChange={e => setTimeWindow(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none"
                  >
                    <option value="09:00 - 12:00">09:00 - 12:00 (Manhã)</option>
                    <option value="13:00 - 16:00">13:00 - 16:00 (Tarde)</option>
                    <option value="16:00 - 19:00">16:00 - 19:00 (Final de tarde)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Código Item</label>
                  <input
                    type="text"
                    value={itemCode}
                    onChange={e => setItemCode(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Nome do Item</label>
                  <input
                    type="text"
                    value={itemName}
                    onChange={e => setItemName(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Motorista Designado</label>
                <select
                  value={driverName}
                  onChange={e => setDriverName(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none"
                >
                  <option value="João Silva (Motorista 01)">João Silva (Fiorino #01)</option>
                  <option value="Marcos Santos (Motorista 02)">Marcos Santos (Kwid #02)</option>
                  <option value="Felipe Santana (Motorista 03)">Felipe Santana (Doblò #03)</option>
                  <option value="Carlos Expedição (Base)">Carlos Expedição (Doca/Base)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Observações / Ponto de Referência</label>
                <input
                  type="text"
                  placeholder="Ex: Deixar na portaria com autorização"
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsNewOrderModalOpen(false)}
                  className="px-3.5 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
                >
                  Agendar Entrega
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
