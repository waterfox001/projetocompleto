import React from 'react';
import { Sparkles, CheckCircle, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SanitizationView: React.FC = () => {
  const { sanitizations, completeSanitization, setSelectedProductId, setCurrentView } = useApp();

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Higienização & Esterilização Clínica</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Lavagem a vapor 140°C e desinfecção com quaternário de amônio de 5ª geração para segurança infantil
          </p>
        </div>
      </div>

      {/* Sanitization Queue */}
      {sanitizations.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 mx-auto flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-sm text-slate-800">Fila de Higienização Vazia</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Todos os equipamentos devolvidos foram esterilizados e liberados para o acervo disponível.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sanitizations.map(item => (
            <div
              key={item.id}
              className={`p-4 rounded-xl border transition-all flex flex-col justify-between space-y-3.5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] ${
                item.status === 'concluido'
                  ? 'bg-slate-50/80 border-slate-200/80'
                  : 'bg-white border-teal-200/80 hover:border-teal-300'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <span className="font-mono bg-slate-900 text-white text-[10px] font-semibold px-2 py-0.5 rounded-md">
                    {item.productCode}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium ${
                      item.status === 'concluido'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/80'
                        : item.status === 'em_andamento'
                        ? 'bg-teal-50 text-teal-700 border border-teal-200/80'
                        : 'bg-amber-50 text-amber-700 border border-amber-200/80'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${item.status === 'concluido' ? 'bg-emerald-600' : item.status === 'em_andamento' ? 'bg-teal-600' : 'bg-amber-600'}`} />
                    {item.status === 'concluido' ? 'Liberado' : item.status === 'em_andamento' ? 'Em Esterilização' : 'Aguardando Início'}
                  </span>
                </div>

                <div>
                  <h3 className="font-semibold text-xs text-slate-900 leading-tight">{item.productName}</h3>
                  <div className="text-[11px] text-slate-500 mt-0.5 font-mono">
                    Retornado em: <strong className="text-slate-700">{item.returnDate}</strong> · Resp: {item.responsibleStaff}
                  </div>
                </div>

                <div className="p-2.5 bg-teal-50/50 rounded-lg border border-teal-100 text-xs space-y-0.5">
                  <div className="text-[10px] font-semibold text-teal-800 uppercase tracking-wider">Protocolo Sanitário:</div>
                  <div className="text-[11px] text-teal-900 font-medium">{item.chemicalUsed}</div>
                </div>

                {item.notes && (
                  <div className="text-[11px] text-slate-500 italic bg-slate-50 p-2 rounded-md border border-slate-100">
                    "{item.notes}"
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => {
                    setSelectedProductId(item.productId);
                    setCurrentView('inventory');
                  }}
                  className="text-[11px] text-slate-500 hover:text-slate-800 font-medium"
                >
                  Ver no Estoque
                </button>

                {item.status !== 'concluido' ? (
                  <button
                    onClick={() => completeSanitization(item.id)}
                    className="flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Liberar para Estoque</span>
                  </button>
                ) : (
                  <span className="text-[11px] text-emerald-700 font-medium flex items-center space-x-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Pronto no Estoque</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
