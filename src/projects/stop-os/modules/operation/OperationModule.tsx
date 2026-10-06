import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Luggage,
  CheckCircle2,
  Building2,
  DollarSign,
  Search,
  CheckSquare
} from 'lucide-react';

export const OperationModule: React.FC = () => {
  const {
    units,
    selectedUnitId,
    volumes,
    reservations,
    checkInVolume,
    checkOutVolume,
    setSelectedVolumeId,
    setSelectedReservationId,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'central' | 'entrada' | 'retirada' | 'abertura_fechamento' | 'caixa'>('central');

  // Fast Check-in form state
  const [targetReservationCode, setTargetReservationCode] = useState('SC-28425');
  const [assignedLockerPosition, setAssignedLockerPosition] = useState('A05');
  const [entryNotes, setEntryNotes] = useState('');

  // Fast Checkout scan state
  const [checkoutCode, setCheckoutCode] = useState('');

  // Unit opening/closing checklist state
  const [checklistItems, setChecklistItems] = useState([
    { id: 1, title: 'Conferência física dos armários e lacres invioláveis', done: true },
    { id: 2, title: 'Ligação e teste dos leitores de código de barras 2D', done: true },
    { id: 3, title: 'Abastecimento de bobinas térmicas na impressora Zebra', done: true },
    { id: 4, title: 'Contagem e conferência do fundo de troco do caixa operacional', done: true },
    { id: 5, title: 'Verificação do sinal de link Wi-Fi/Rede redundante do aeroporto', done: false }
  ]);

  const toggleChecklist = (id: number) => {
    setChecklistItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    );
  };

  const currentUnit = units.find((u) => u.id === selectedUnitId) || units[0];

  const unitVolumes = volumes.filter((v) => selectedUnitId === 'all' || v.unitId === selectedUnitId);
  const storedVolumes = unitVolumes.filter((v) => v.status === 'stored');
  const retrievedToday = unitVolumes.filter((v) => v.status === 'retrieved');

  const handleSimulateCheckin = (e: React.FormEvent) => {
    e.preventDefault();
    const relatedRes = reservations.find((r) => r.id.toLowerCase() === targetReservationCode.toLowerCase().trim());
    if (!relatedRes) {
      showToast('Reserva Não Encontrada', 'Verifique o código digitado.', 'warning');
      return;
    }

    const unassignedVol = volumes.find((v) => v.reservationId === relatedRes.id && v.status === 'awaiting_arrival');
    const targetVolId = unassignedVol ? unassignedVol.id : `SC-VOL-00${Math.floor(8400 + Math.random() * 500)}`;

    checkInVolume(targetVolId, assignedLockerPosition, entryNotes);
    setTargetReservationCode('');
    setEntryNotes('');
  };

  const handleSimulateCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutCode.trim()) return;

    const matchedVol = volumes.find(
      (v) =>
        (v.id.toLowerCase() === checkoutCode.toLowerCase().trim() ||
          v.tagNumber.toLowerCase() === checkoutCode.toLowerCase().trim() ||
          v.reservationId.toLowerCase() === checkoutCode.toLowerCase().trim()) &&
        v.status === 'stored'
    );

    if (!matchedVol) {
      showToast('Volume Não Localizado', 'Nenhum volume armazenado ativo encontrado com esta chave.', 'warning');
      return;
    }

    checkOutVolume(matchedVol.id);
    setCheckoutCode('');
  };

  return (
    <div className="space-y-4 pb-10">
      {/* Top Header & Tab Navigation */}
      <div className="bg-white border border-slate-200 rounded p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-slate-900 tracking-tight">
              Central Operacional: {selectedUnitId === 'all' ? 'Todas as Bases' : currentUnit.name}
            </h2>
            <span className="text-[11px] text-slate-400">·</span>
            <span className="text-xs text-slate-500 font-mono">
              Balcão de Atendimento & Guarda
            </span>
          </div>
        </div>

        {/* Enterprise Subtabs */}
        <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded text-xs">
          <button
            onClick={() => setActiveTab('central')}
            className={`px-2.5 py-1 rounded transition-colors cursor-pointer font-medium ${
              activeTab === 'central' ? 'bg-white text-slate-900 font-semibold shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Central de Hoje
          </button>
          <button
            onClick={() => setActiveTab('entrada')}
            className={`px-2.5 py-1 rounded transition-colors cursor-pointer font-medium ${
              activeTab === 'entrada' ? 'bg-white text-slate-900 font-semibold shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Entrada (Check-in)
          </button>
          <button
            onClick={() => setActiveTab('retirada')}
            className={`px-2.5 py-1 rounded transition-colors cursor-pointer font-medium ${
              activeTab === 'retirada' ? 'bg-white text-slate-900 font-semibold shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Retirada (Check-out)
          </button>
          <button
            onClick={() => setActiveTab('abertura_fechamento')}
            className={`px-2.5 py-1 rounded transition-colors cursor-pointer font-medium ${
              activeTab === 'abertura_fechamento' ? 'bg-white text-slate-900 font-semibold shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Checklist de Base
          </button>
          <button
            onClick={() => setActiveTab('caixa')}
            className={`px-2.5 py-1 rounded transition-colors cursor-pointer font-medium ${
              activeTab === 'caixa' ? 'bg-white text-slate-900 font-semibold shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Caixa Operacional
          </button>
        </div>
      </div>

      {/* TAB 1: CENTRAL DE HOJE */}
      {activeTab === 'central' && (
        <div className="space-y-4">
          {/* Operational Status Counter Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <div className="bg-white p-3 border border-slate-200 rounded">
              <div className="text-[11px] text-slate-500 font-medium flex items-center justify-between">
                <span>Volumes em Guarda</span>
                <Luggage className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <div className="text-xl font-bold font-mono text-slate-900 tabular-nums mt-0.5">
                {storedVolumes.length}
              </div>
              <div className="text-[10px] text-slate-500 font-mono mt-0.5">100% etiquetados</div>
            </div>

            <div className="bg-white p-3 border border-slate-200 rounded">
              <div className="text-[11px] text-slate-500 font-medium flex items-center justify-between">
                <span>Retiradas Concluídas</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              </div>
              <div className="text-xl font-bold font-mono text-slate-900 tabular-nums mt-0.5">
                {retrievedToday.length + 18}
              </div>
              <div className="text-[10px] text-slate-500 font-mono mt-0.5">Tempo médio: 42s</div>
            </div>

            <div className="bg-white p-3 border border-slate-200 rounded">
              <div className="text-[11px] text-slate-500 font-medium flex items-center justify-between">
                <span>Ocupação dos Armários</span>
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <div className="text-xl font-bold font-mono text-slate-900 tabular-nums mt-0.5">
                {currentUnit.capacityOccupied} / {currentUnit.capacityTotal}
              </div>
              <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                {Math.round((currentUnit.capacityOccupied / currentUnit.capacityTotal) * 100)}% ocupado
              </div>
            </div>

            <div className="bg-white p-3 border border-slate-200 rounded">
              <div className="text-[11px] text-slate-500 font-medium flex items-center justify-between">
                <span>Caixa Balcão Atual</span>
                <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
              </div>
              <div className="text-xl font-bold font-mono text-slate-900 tabular-nums mt-0.5">
                R$ {currentUnit.cashBalance.toFixed(2)}
              </div>
              <div className="text-[10px] text-slate-500 font-mono mt-0.5">Fundo ativo e conferido</div>
            </div>
          </div>

          {/* Stored Luggage Inventory Table */}
          <div className="bg-white border border-slate-200 rounded">
            <div className="p-3 border-b border-slate-200 flex items-center justify-between text-xs">
              <div>
                <h3 className="font-bold text-slate-900">Inventário Ativo nos Armários</h3>
                <p className="text-[11px] text-slate-500">Volumes físicos atualmente custodiados nesta base</p>
              </div>
              <span className="font-mono text-slate-600 font-medium text-[11px] bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                {storedVolumes.length} volumes armazenados
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[11px] text-slate-600 font-semibold">
                    <th className="py-2 px-3">Código</th>
                    <th className="py-2 px-3">Passageiro</th>
                    <th className="py-2 px-3">Localização</th>
                    <th className="py-2 px-3">Entrada</th>
                    <th className="py-2 px-3">Previsão</th>
                    <th className="py-2 px-3">Operador</th>
                    <th className="py-2 px-3 text-right">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {storedVolumes.map((vol) => (
                    <tr key={vol.id} className="hover:bg-slate-50/70">
                      <td className="py-2.5 px-3">
                        <div className="font-mono font-medium text-slate-900">{vol.id}</div>
                        <div className="text-[11px] text-slate-500">{vol.description}</div>
                      </td>
                      <td className="py-2.5 px-3 text-slate-800 font-medium">
                        {vol.customerName}
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-xs px-1.5 py-0.5 rounded bg-slate-100 text-slate-900 font-bold border border-slate-200">
                            {vol.locationPosition}
                          </span>
                          <span className="text-slate-500 text-[11px] font-mono">{vol.locationLocker}</span>
                        </div>
                      </td>
                      <td className="py-2.5 px-3 font-mono text-slate-700">
                        {new Date(vol.checkInTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="py-2.5 px-3 font-mono text-slate-500 text-[11px]">
                        {new Date(vol.expectedCheckOutTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="py-2.5 px-3 text-slate-500 text-[11px]">
                        {vol.operatorIn}
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedVolumeId(vol.id)}
                            className="text-xs text-slate-600 hover:text-slate-900 font-medium cursor-pointer"
                          >
                            Detalhes
                          </button>
                          <button
                            onClick={() => checkOutVolume(vol.id)}
                            className="px-2 py-1 bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-medium rounded cursor-pointer"
                          >
                            Retirar
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
      )}

      {/* TAB 2: ENTRADA (CHECK-IN RÁPIDO) */}
      {activeTab === 'entrada' && (
        <div className="bg-white border border-slate-200 rounded p-4 max-w-xl space-y-4">
          <div className="border-b border-slate-200 pb-2">
            <h3 className="text-xs font-bold text-slate-900">Registro de Entrada de Bagagem no Balcão</h3>
            <p className="text-[11px] text-slate-500">Informe o código da reserva ou escaneie o voucher apresentado</p>
          </div>

          <form onSubmit={handleSimulateCheckin} className="space-y-3 text-xs">
            <div>
              <label className="block text-[11px] font-medium text-slate-700 mb-1">
                Código da Reserva / Voucher
              </label>
              <input
                type="text"
                value={targetReservationCode}
                onChange={(e) => setTargetReservationCode(e.target.value)}
                placeholder="Ex: SC-28425"
                className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded text-xs text-slate-900 font-mono uppercase focus:outline-none focus:border-amber-600"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-700 mb-1">
                Posição do Armário Atribuída
              </label>
              <input
                type="text"
                value={assignedLockerPosition}
                onChange={(e) => setAssignedLockerPosition(e.target.value)}
                placeholder="Ex: A05"
                className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded text-xs text-slate-900 font-mono uppercase focus:outline-none focus:border-amber-600"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-700 mb-1">
                Observações de Inspeção / Lacre ANAC
              </label>
              <textarea
                rows={2}
                value={entryNotes}
                onChange={(e) => setEntryNotes(e.target.value)}
                placeholder="Inspeção física, tag térmica e lacre de segurança conferidos..."
                className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded text-xs text-slate-900 focus:outline-none focus:border-amber-600"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('central')}
                className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded text-xs font-medium hover:bg-slate-50 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded text-xs font-medium cursor-pointer"
              >
                Concluir Entrada & Imprimir Tag
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 3: RETIRADA (CHECK-OUT) */}
      {activeTab === 'retirada' && (
        <div className="bg-white border border-slate-200 rounded p-4 max-w-xl space-y-4">
          <div className="border-b border-slate-200 pb-2">
            <h3 className="text-xs font-bold text-slate-900">Liberação de Bagagem & Check-out</h3>
            <p className="text-[11px] text-slate-500">Escaneie a tag ou digite o identificador do volume/reserva</p>
          </div>

          <form onSubmit={handleSimulateCheckout} className="space-y-3 text-xs">
            <div>
              <label className="block text-[11px] font-medium text-slate-700 mb-1">
                Identificador da Tag ou Código de Reserva
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={checkoutCode}
                  onChange={(e) => setCheckoutCode(e.target.value)}
                  placeholder="Ex: SC-VOL-008291 ou SC-28425"
                  className="flex-1 px-2.5 py-1.5 bg-white border border-slate-200 rounded text-xs text-slate-900 font-mono uppercase focus:outline-none focus:border-amber-600"
                  required
                />
                <button
                  type="submit"
                  className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded text-xs font-medium cursor-pointer"
                >
                  Confirmar Retirada
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* TAB 4: CHECKLIST DE ABERTURA / FECHAMENTO */}
      {activeTab === 'abertura_fechamento' && (
        <div className="bg-white border border-slate-200 rounded p-4 max-w-2xl space-y-3 text-xs">
          <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900">Checklist Operacional de Turno</h3>
              <p className="text-[11px] text-slate-500">Procedimento obrigatório da base {currentUnit.name}</p>
            </div>
            <span className="font-mono text-slate-500 text-[11px]">
              {checklistItems.filter((i) => i.done).length} de {checklistItems.length} concluídos
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {checklistItems.map((item) => (
              <div
                key={item.id}
                onClick={() => toggleChecklist(item.id)}
                className="py-2.5 flex items-center justify-between gap-3 hover:bg-slate-50 cursor-pointer px-1"
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={item.done}
                    onChange={() => {}}
                    className="w-4 h-4 text-amber-600 rounded border-slate-300 pointer-events-none"
                  />
                  <span className={item.done ? 'text-slate-800' : 'text-slate-900 font-medium'}>
                    {item.title}
                  </span>
                </div>
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${
                  item.done ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-slate-500 border-slate-200'
                }`}>
                  {item.done ? 'OK' : 'PENDENTE'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: CAIXA OPERACIONAL */}
      {activeTab === 'caixa' && (
        <div className="bg-white border border-slate-200 rounded p-4 max-w-xl space-y-3 text-xs">
          <div className="border-b border-slate-200 pb-2">
            <h3 className="font-bold text-slate-900">Caixa Operacional do Balcão</h3>
            <p className="text-[11px] text-slate-500">Saldo e movimentações do turno atual</p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded">
              <span className="text-[11px] text-slate-500">Fundo de Abertura</span>
              <div className="font-mono font-bold text-slate-900 text-base mt-0.5">R$ 500,00</div>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded">
              <span className="text-[11px] text-slate-500">Saldo Atual em Dinheiro</span>
              <div className="font-mono font-bold text-emerald-700 text-base mt-0.5">
                R$ {currentUnit.cashBalance.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
