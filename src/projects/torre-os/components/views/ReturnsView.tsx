import React, { useState } from 'react';
import {
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Wrench,
  Sparkles,
  DollarSign,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ProductCondition } from '../../types';

export const ReturnsView: React.FC = () => {
  const { returns, processReturnConference, products } = useApp();

  const [selectedReturnId, setSelectedReturnId] = useState<string | null>(null);
  const [condition, setCondition] = useState<ProductCondition>('bom');
  const [destination, setDestination] = useState<'EM_HIGIENIZACAO' | 'EM_MANUTENCAO' | 'DISPONIVEL'>('EM_HIGIENIZACAO');
  const [damageCharge, setDamageCharge] = useState(0);
  const [checklistNotes, setChecklistNotes] = useState('');

  const currentReturn = returns.find(r => r.id === selectedReturnId);

  const handleFinishConference = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReturnId) return;

    processReturnConference(
      selectedReturnId,
      destination,
      condition,
      damageCharge,
      checklistNotes
    );

    setSelectedReturnId(null);
    setDamageCharge(0);
    setChecklistNotes('');
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Checklist de Devolução & Vistoria Técnica</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Inspeção física dos itens pós-locação, dedução de caução por avarias e encaminhamento para higienização
        </p>
      </div>

      {/* Returns List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {returns.map(ret => (
          <div
            key={ret.id}
            className={`p-4 rounded-xl border transition-all space-y-3 shadow-[0_1px_3px_rgba(0,0,0,0.03)] ${
              ret.status === 'pendente_conferencia'
                ? 'bg-white border-amber-300/80 ring-1 ring-amber-300/20'
                : 'bg-white border-slate-200/80'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="font-mono text-blue-600 font-semibold text-xs">{ret.rentalNumber}</span>
                <h3 className="font-medium text-xs text-slate-900 mt-0.5">{ret.customerName}</h3>
              </div>
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium ${
                  ret.status === 'pendente_conferencia'
                    ? 'bg-amber-50 text-amber-700 border border-amber-200/80'
                    : 'bg-emerald-50 text-emerald-700 border border-emerald-200/80'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${ret.status === 'pendente_conferencia' ? 'bg-amber-600' : 'bg-emerald-600'}`} />
                {ret.status === 'pendente_conferencia' ? 'Aguardando Checklist' : 'Conferido'}
              </span>
            </div>

            <div className="p-2.5 bg-slate-50/80 rounded-lg border border-slate-100 text-xs space-y-1">
              <div className="flex items-center space-x-2">
                <span className="font-mono bg-slate-900 text-white text-[10px] font-medium px-1.5 py-0.2 rounded">
                  {ret.productCode}
                </span>
                <span className="font-medium text-slate-800 text-[11px]">{ret.productName}</span>
              </div>
              <div className="text-[11px] text-slate-500 font-mono">
                Retorno: <strong className="text-slate-700">{ret.returnDate}</strong> · Inspetor: {ret.inspectorName}
              </div>
            </div>

            {ret.damagesFound && (
              <div className="p-2.5 bg-rose-50/70 border border-rose-200/80 rounded-lg text-xs text-rose-950 space-y-1">
                <div className="font-semibold flex items-center space-x-1 text-rose-800">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                  <span>Danos identificados:</span>
                </div>
                <div className="text-[11px] text-rose-900">{ret.damagesFound}</div>
                {ret.depositDeduction && (
                  <div className="text-[11px] font-semibold text-rose-700 font-mono tabular-nums">
                    Dedução da caução: R$ {ret.depositDeduction}
                  </div>
                )}
              </div>
            )}

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">
                Destino: <strong className="text-slate-800">{ret.destination}</strong>
              </span>

              {ret.status === 'pendente_conferencia' && (
                <button
                  onClick={() => setSelectedReturnId(ret.id)}
                  className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold shadow-2xs transition-colors"
                >
                  Fazer Conferência
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Conference Checklist Modal */}
      {selectedReturnId && currentReturn && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-4 bg-white text-slate-900 flex items-center justify-between border-b border-slate-200">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Conferência de Devolução: {currentReturn.productCode}</h3>
                <div className="text-xs text-slate-500">Cliente: {currentReturn.customerName}</div>
              </div>
              <button
                onClick={() => setSelectedReturnId(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleFinishConference} className="p-5 space-y-4 text-xs">
              {/* Product Condition Selection */}
              <div>
                <label className="block font-semibold text-slate-700 uppercase tracking-wider text-[11px] mb-1">
                  1. Condição Física do Produto
                </label>
                <select
                  value={condition}
                  onChange={e => setCondition(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-medium outline-none focus:border-blue-500"
                >
                  <option value="perfeito">Perfeito (Sem avaria, pronto)</option>
                  <option value="bom">Bom (Uso normal, apenas sujeira leve)</option>
                  <option value="desgaste">Com desgaste natural de uso</option>
                  <option value="danificado">Danificado (Necessita conserto/peça)</option>
                  <option value="incompleto">Incompleto (Faltando acessórios)</option>
                </select>
              </div>

              {/* Destination routing */}
              <div>
                <label className="block font-semibold text-slate-700 uppercase tracking-wider text-[11px] mb-1">
                  2. Direcionar Produto Para:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setDestination('EM_HIGIENIZACAO')}
                    className={`p-2 rounded-lg border text-center font-medium text-xs transition-all ${
                      destination === 'EM_HIGIENIZACAO'
                        ? 'bg-teal-600 text-white border-teal-600 shadow-2xs font-semibold'
                        : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    Higienização
                  </button>
                  <button
                    type="button"
                    onClick={() => setDestination('EM_MANUTENCAO')}
                    className={`p-2 rounded-lg border text-center font-medium text-xs transition-all ${
                      destination === 'EM_MANUTENCAO'
                        ? 'bg-rose-600 text-white border-rose-600 shadow-2xs font-semibold'
                        : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    Manutenção
                  </button>
                  <button
                    type="button"
                    onClick={() => setDestination('DISPONIVEL')}
                    className={`p-2 rounded-lg border text-center font-medium text-xs transition-all ${
                      destination === 'DISPONIVEL'
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs font-semibold'
                        : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    Disponível
                  </button>
                </div>
              </div>

              {/* Damage charge & notes */}
              <div>
                <label className="block font-semibold text-slate-700 uppercase tracking-wider text-[11px] mb-1">
                  3. Valor a Descontar da Caução (Danos / Perdas)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-slate-400 font-medium">R$</span>
                  <input
                    type="number"
                    value={damageCharge}
                    onChange={e => setDamageCharge(Number(e.target.value))}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none font-mono tabular-nums text-slate-900 focus:bg-white focus:border-blue-500"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 uppercase tracking-wider text-[11px] mb-1">
                  Observações do Inspetor
                </label>
                <textarea
                  rows={2}
                  value={checklistNotes}
                  onChange={e => setChecklistNotes(e.target.value)}
                  placeholder="Ex: Todos os redutores foram devolvidos. Apenas mancha leve removível com vapor."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:border-blue-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setSelectedReturnId(null)}
                  className="px-3.5 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-lg shadow-xs hover:bg-blue-700 transition-colors"
                >
                  Concluir Conferência
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
