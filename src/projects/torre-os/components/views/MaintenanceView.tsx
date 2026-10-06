import React, { useState } from 'react';
import { Wrench, Plus, CheckCircle, Clock, AlertTriangle, ArrowRight, DollarSign, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MaintenanceView: React.FC = () => {
  const { maintenances, completeMaintenance, products, createMaintenanceOrder } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProdId, setSelectedProdId] = useState(products[0]?.id || '');
  const [problemDesc, setProblemDesc] = useState('');
  const [vendor, setVendor] = useState('Oficina Autorizada Especializada');
  const [cost, setCost] = useState(120);

  const handleOpenOS = (e: React.FormEvent) => {
    e.preventDefault();
    const prod = products.find(p => p.id === selectedProdId);
    if (!prod || !problemDesc) return;

    createMaintenanceOrder({
      productId: prod.id,
      productCode: prod.code,
      productName: prod.name,
      category: prod.category,
      problemDescription: problemDesc,
      estimatedCompletion: '2026-10-12',
      technician: 'Roberto Técnico Especialista',
      vendor,
      cost,
      partsUsed: ['Reposição de presilha/ajuste']
    });

    setIsModalOpen(false);
    setProblemDesc('');
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Oficina & Ordens de Manutenção (O.S.)</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manutenção preventiva e corretiva, calibração de travas e reposição de componentes originais
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-xs shadow-rose-600/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>+ Abrir Ordem de Serviço</span>
        </button>
      </div>

      {/* Maintenances List */}
      {maintenances.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 mx-auto flex items-center justify-center">
            <Wrench className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-sm text-slate-800">Oficina Livre - Nenhuma O.S. Pendente</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Todos os equipamentos do acervo estão operacionais e com manutenção em dia.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {maintenances.map(maint => (
          <div
            key={maint.id}
            className={`p-4 rounded-xl border transition-all flex flex-col justify-between space-y-3.5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] ${
              maint.status === 'concluida'
                ? 'bg-slate-50/80 border-slate-200/80'
                : 'bg-white border-rose-200/80 hover:border-rose-300'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <span className="font-mono bg-slate-900 text-white text-[10px] font-semibold px-2 py-0.5 rounded-md">
                  {maint.productCode}
                </span>
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium ${
                    maint.status === 'concluida'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/80'
                      : maint.status === 'aguardando_peca'
                      ? 'bg-amber-50 text-amber-700 border border-amber-200/80'
                      : 'bg-rose-50 text-rose-700 border border-rose-200/80'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${maint.status === 'concluida' ? 'bg-emerald-600' : maint.status === 'aguardando_peca' ? 'bg-amber-600' : 'bg-rose-600'}`} />
                  {maint.status === 'concluida' ? 'Concluída' : maint.status === 'aguardando_peca' ? 'Aguardando Peça' : 'Em Reparo'}
                </span>
              </div>

              <div>
                <h3 className="font-semibold text-xs text-slate-900 leading-tight">{maint.productName}</h3>
                <div className="text-[11px] text-slate-500 mt-0.5 font-mono">
                  Entrada: <strong className="text-slate-700">{maint.entryDate}</strong> · Previsão: <strong className="text-slate-700">{maint.estimatedCompletion}</strong>
                </div>
              </div>

              <div className="p-2.5 bg-rose-50/60 rounded-lg border border-rose-100 text-xs space-y-0.5">
                <div className="text-[10px] font-semibold text-rose-800 uppercase tracking-wider">Defeito Registrado:</div>
                <div className="text-slate-800 text-[11px] leading-relaxed">{maint.problemDescription}</div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100 font-mono">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-sans">Técnico</span>
                  <strong className="text-slate-800 text-[10px]">{maint.technician}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-sans">Custo</span>
                  <strong className="text-rose-600 tabular-nums">R$ {maint.cost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 truncate max-w-[140px]">{maint.vendor}</span>

              {maint.status !== 'concluida' && (
                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={() => completeMaintenance(maint.id, true)}
                    className="px-2.5 py-1 bg-teal-600 hover:bg-teal-700 text-white rounded-md text-xs font-semibold transition-colors shadow-2xs"
                    title="Conclui conserto e encaminha para higienização"
                  >
                    Higienizar & Liberar
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    )}

      {/* Modal Nova O.S. */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-4 bg-white text-slate-900 flex items-center justify-between border-b border-slate-200">
              <h3 className="text-sm font-bold text-slate-900">Abrir Ordem de Serviço de Manutenção</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleOpenOS} className="p-4 space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1 text-[11px] uppercase tracking-wider">
                  Equipamento
                </label>
                <select
                  value={selectedProdId}
                  onChange={e => setSelectedProdId(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-mono focus:border-blue-500 outline-none"
                >
                  {products.map(p => (
                    <option key={p.id} value={p.id}>[{p.code}] {p.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1 text-[11px] uppercase tracking-wider">
                  Descrição da Avaria / Ocorrência
                </label>
                <textarea
                  rows={3}
                  value={problemDesc}
                  onChange={e => setProblemDesc(e.target.value)}
                  placeholder="Ex: Cinto 5 pontos desfiado ou presilha de fixação isofix com mola frouxa..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1 text-[11px] uppercase tracking-wider">
                    Prestador / Oficina
                  </label>
                  <input
                    type="text"
                    value={vendor}
                    onChange={e => setVendor(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1 text-[11px] uppercase tracking-wider">
                    Custo Estimado (R$)
                  </label>
                  <input
                    type="number"
                    value={cost}
                    onChange={e => setCost(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-mono tabular-nums focus:border-blue-500 outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-rose-600 text-white font-semibold rounded-lg hover:bg-rose-700 shadow-xs transition-colors"
                >
                  Abrir O.S. & Interditar Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
