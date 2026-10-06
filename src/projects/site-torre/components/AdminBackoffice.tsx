import React, { useState } from 'react';
import { X, TrendingUp, Package, Users, Calendar, ShieldAlert, Check, Edit2, Sliders, AlertTriangle } from 'lucide-react';
import { UnitId, Product, AvailabilityStatus } from '../types';
import { PRODUCTS, UNITS } from '../data/mockData';

interface AdminBackofficeProps {
  isOpen: boolean;
  onClose: () => void;
  unitId: UnitId;
  onSelectUnit: (unit: UnitId) => void;
}

export const AdminBackoffice: React.FC<AdminBackofficeProps> = ({
  isOpen,
  onClose,
  unitId,
  onSelectUnit,
}) => {
  const [activeTab, setActiveTab] = useState<'kpis' | 'inventory' | 'calendar' | 'orders'>('kpis');
  const [productsList, setProductsList] = useState<Product[]>(PRODUCTS);
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [newPrice, setNewPrice] = useState<number>(28);

  if (!isOpen) return null;

  const currentUnit = UNITS[unitId];

  const handleUpdateStock = (productId: string, newStatus: AvailabilityStatus) => {
    setProductsList((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          return {
            ...p,
            stockByUnit: {
              ...p.stockByUnit,
              [unitId]: newStatus,
            },
          };
        }
        return p;
      })
    );
  };

  const handleSavePrice = (productId: string) => {
    setProductsList((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, dailyPrice: newPrice } : p))
    );
    setEditingPriceId(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden text-left my-auto">
        {/* Header */}
        <div className="p-6 bg-stone-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center font-bold text-sm">
              TB
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">
                  Backoffice Operacional · Demonstração
                </span>
                <span className="text-[10px] bg-stone-800 text-stone-300 px-2 py-0.5 rounded">
                  Modo Admin
                </span>
              </div>
              <h3 className="text-xl font-bold font-serif">
                Painel Administrativo da Unidade {currentUnit.name}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={unitId}
              onChange={(e) => onSelectUnit(e.target.value as UnitId)}
              className="bg-stone-800 text-white border border-stone-700 rounded-xl px-3 py-1.5 text-xs font-semibold focus:outline-none"
            >
              {Object.values(UNITS).map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} ({u.airportCode})
                </option>
              ))}
            </select>

            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-white rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Tab navigation */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-stone-200 bg-stone-50 text-xs font-bold">
          <button
            onClick={() => setActiveTab('kpis')}
            className={`pb-3 px-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'kpis'
                ? 'border-orange-600 text-orange-600'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Indicadores & Faturamento
          </button>
          <button
            onClick={() => setActiveTab('inventory')}
            className={`pb-3 px-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'inventory'
                ? 'border-orange-600 text-orange-600'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Gestão de Estoque & Preços
          </button>
          <button
            onClick={() => setActiveTab('calendar')}
            className={`pb-3 px-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'calendar'
                ? 'border-orange-600 text-orange-600'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Calendário de Ocupação
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 px-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'orders'
                ? 'border-orange-600 text-orange-600'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Pedidos Recentes
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-xs">
          {/* TAB 1: KPIs */}
          {activeTab === 'kpis' && (
            <div className="space-y-6">
              {/* Top stats grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200">
                  <span className="text-stone-500 block">Reservas Hoje</span>
                  <span className="text-2xl font-bold text-stone-900 tabular-nums">18</span>
                  <span className="text-[10px] text-emerald-600 font-semibold block mt-1">+4 no aeroporto</span>
                </div>

                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200">
                  <span className="text-stone-500 block">Reservas Futuras</span>
                  <span className="text-2xl font-bold text-stone-900 tabular-nums">142</span>
                  <span className="text-[10px] text-stone-400 block mt-1">Próximos 30 dias</span>
                </div>

                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200">
                  <span className="text-stone-500 block">Taxa de Ocupação</span>
                  <span className="text-2xl font-bold text-emerald-700 tabular-nums">88.4%</span>
                  <span className="text-[10px] text-stone-500 block mt-1">Alta temporada</span>
                </div>

                <div className="p-4 bg-orange-50/60 rounded-2xl border border-orange-200">
                  <span className="text-orange-950 font-semibold block">Faturamento Estimado</span>
                  <span className="text-2xl font-bold text-orange-950 tabular-nums">R$ 42.850</span>
                  <span className="text-[10px] text-orange-700 block mt-1">Ticket médio: R$ 368,00</span>
                </div>
              </div>

              {/* Status Breakdown & Maintenance */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                  <span className="font-bold text-emerald-950 block">Itens Alugados Ativos</span>
                  <span className="text-xl font-bold text-emerald-800">{currentUnit.stats.activeRentals} unidades</span>
                  <p className="text-[10px] text-emerald-700 mt-1">Em trânsito ou no quarto dos clientes</p>
                </div>

                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                  <span className="font-bold text-amber-950 block">Em Higienização a Vapor</span>
                  <span className="text-xl font-bold text-amber-800">12 unidades</span>
                  <p className="text-[10px] text-amber-700 mt-1">Ciclo de esterilização hospitalar 140°C</p>
                </div>

                <div className="p-4 rounded-xl bg-stone-100 border border-stone-200">
                  <span className="font-bold text-stone-900 block">Em Manutenção Preventiva</span>
                  <span className="text-xl font-bold text-stone-700">3 unidades</span>
                  <p className="text-[10px] text-stone-500 mt-1">Ajuste de rolamentos e freios</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Inventory & Prices */}
          {activeTab === 'inventory' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-bold text-stone-900 text-sm">
                  Estoque de {currentUnit.fullName}
                </span>
                <span className="text-stone-500">
                  Clique para alterar status em tempo real para a simulação
                </span>
              </div>

              <div className="overflow-x-auto border border-stone-200 rounded-2xl">
                <table className="w-full text-left">
                  <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase tracking-wider font-bold">
                    <tr>
                      <th className="p-3">Produto</th>
                      <th className="p-3">Categoria</th>
                      <th className="p-3">Diária (R$)</th>
                      <th className="p-3">Status na Unidade</th>
                      <th className="p-3">Ação</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {productsList.map((p) => {
                      const status = p.stockByUnit[unitId];
                      return (
                        <tr key={p.id} className="hover:bg-stone-50">
                          <td className="p-3 font-bold text-stone-900">
                            {p.name}
                            <span className="block text-[10px] text-stone-400 font-normal">{p.brand}</span>
                          </td>
                          <td className="p-3 text-stone-600">{p.category}</td>
                          <td className="p-3">
                            {editingPriceId === p.id ? (
                              <div className="flex items-center gap-1">
                                <input
                                  type="number"
                                  value={newPrice}
                                  onChange={(e) => setNewPrice(Number(e.target.value))}
                                  className="w-16 border rounded p-1 font-bold text-stone-900"
                                />
                                <button
                                  onClick={() => handleSavePrice(p.id)}
                                  className="px-2 py-1 bg-emerald-600 text-white rounded text-[10px] font-bold"
                                >
                                  OK
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center gap-1.5">
                                <span className="font-bold text-stone-900">
                                  R$ {p.dailyPrice.toFixed(2).replace('.', ',')}
                                </span>
                                <button
                                  onClick={() => {
                                    setEditingPriceId(p.id);
                                    setNewPrice(p.dailyPrice);
                                  }}
                                  className="text-stone-400 hover:text-stone-700"
                                >
                                  <Edit2 className="w-3 h-3" />
                                </button>
                              </div>
                            )}
                          </td>
                          <td className="p-3 font-semibold">
                            <select
                              value={status}
                              onChange={(e) =>
                                handleUpdateStock(p.id, e.target.value as AvailabilityStatus)
                              }
                              className={`p-1.5 rounded-lg border font-bold text-xs ${
                                status === 'available'
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                  : status === 'low_stock'
                                  ? 'bg-amber-50 text-amber-800 border-amber-300'
                                  : 'bg-rose-50 text-rose-800 border-rose-300'
                              }`}
                            >
                              <option value="available">✓ Disponível</option>
                              <option value="low_stock">⚠ Última Unidade</option>
                              <option value="out_of_stock">× Indisponível</option>
                            </select>
                          </td>
                          <td className="p-3 text-stone-500">
                            <button
                              onClick={() =>
                                alert(`Histórico de locações do item ${p.name} aberto.`)
                              }
                              className="text-orange-600 hover:underline font-semibold"
                            >
                              Histórico
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: Calendário de Ocupação */}
          {activeTab === 'calendar' && (
            <div className="space-y-4">
              <div>
                <span className="font-bold text-stone-900 text-sm block">
                  Calendário de Ocupação por Unidade Individual
                </span>
                <p className="text-stone-500">
                  Prevenção de conflito de datas para a frota de {currentUnit.name}.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  { tag: 'YOYO #023', name: 'Carrinho Yoyo Babyzen', periods: ['10-15 Out: Mariana Silva (Reservado)', '16-20 Out: Disponível'] },
                  { tag: 'KEYFIT #012', name: 'Bebê Conforto Chicco', periods: ['08-12 Out: Rodrigo Lima (Em Uso)', '13-18 Out: Disponível'] },
                  { tag: 'PACK #007', name: 'Berço Graco Pack \'n Play', periods: ['10-15 Out: Mariana Silva (Reservado)', '15-16 Out: Higienização'] },
                  { tag: 'COSCO #041', name: 'Cadeirinha Cosco Progress', periods: ['11-14 Out: Gabriel Santos (Confirmado)'] },
                ].map((item, idx) => (
                  <div key={idx} className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="font-mono text-orange-700 font-bold">{item.tag}</span>
                      <h5 className="font-bold text-stone-900">{item.name}</h5>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {item.periods.map((per, pIdx) => (
                        <span
                          key={pIdx}
                          className="px-2.5 py-1 rounded bg-white border border-stone-200 font-medium text-stone-700"
                        >
                          {per}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Pedidos Recentes */}
          {activeTab === 'orders' && (
            <div className="space-y-3">
              <span className="font-bold text-stone-900 text-sm block">
                Últimos Pedidos Recebidos
              </span>

              {[
                { id: 'TB-89214', name: 'Mariana Silva', items: 'Carrinho Yoyo, Bebê Conforto, Berço', total: 'R$ 368,00', status: 'Em Entrega' },
                { id: 'TB-89210', name: 'Lucas Vasconcelos', items: 'Carrinho Yoyo, Cadeira Alimentação', total: 'R$ 210,00', status: 'Confirmado' },
                { id: 'TB-89198', name: 'Patrícia Rocha', items: 'Kit Primeira Viagem Completo', total: 'R$ 490,00', status: 'Higienizado' },
              ].map((order) => (
                <div key={order.id} className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-stone-900">#{order.id} · {order.name}</span>
                    <p className="text-[11px] text-stone-500">{order.items}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-stone-900 block">{order.total}</span>
                    <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
