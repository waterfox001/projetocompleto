import React from 'react';
import { useApp } from '../../context/AppContext';
import { FileSpreadsheet, Building2, Plus, Calendar, AlertTriangle, ShieldCheck } from 'lucide-react';

export const PartnersModule: React.FC = () => {
 const { partners, showToast } = useApp();

 return (
 <div className="space-y-4 pb-10">
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded p-3.5">
 <div>
 <div className="text-[10px] font-mono uppercase tracking-wider text-amber-700 font-bold">
 Relações Institucionais & Aeroportos
 </div>
 <h2 className="text-sm font-bold text-slate-900 tracking-tight">
 Parceiros, Concessões & Contratos
 </h2>
 <p className="text-xs text-slate-500 mt-1">
 Gestão de outorgas comerciais de aeroportos (Aena, Fraport, VINCI, CCR) e acordos de canal hoteleiro.
 </p>
 </div>

 <button
 onClick={() => showToast('Novo Contrato', 'Formulário de credenciamento aberto.', 'info')}
 className="px-3.5 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded cursor-pointer flex items-center gap-1.5 shrink-0"
 >
 <Plus className="w-3.5 h-3.5 stroke-[3]" />
 <span>+ Novo Contrato / Parceiro</span>
 </button>
 </div>

 <div className="bg-white rounded border border-slate-200 p-5 space-y-4">
 <div className="overflow-x-auto">
 <table className="w-full text-left text-xs">
 <thead>
 <tr className="bg-slate-50 border-b border-slate-200 text-[11px] text-slate-600 font-semibold">
 <th className="pb-3">Entidade / Concessionária</th>
 <th className="pb-3">Tipo de Parceria</th>
 <th className="pb-3">Contato Operacional</th>
 <th className="pb-3">Base</th>
 <th className="pb-3">Comissão / Remuneração</th>
 <th className="pb-3">Receita Acumulada</th>
 <th className="pb-3">Término de Vigência</th>
 <th className="pb-3 text-right">Ação</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-slate-100">
 {partners.map((p) => (
 <tr key={p.id} className="hover:bg-slate-50/60 transition-colors">
 <td className="py-3 font-semibold text-slate-900">{p.partnerName}</td>
 <td className="py-3 text-slate-700">
 <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-700">
 {p.type}
 </span>
 </td>
 <td className="py-3 text-slate-500">{p.contactPerson} · {p.phone}</td>
 <td className="py-3 font-mono text-amber-700 font-bold">{p.unitId}</td>
 <td className="py-3 font-mono text-slate-800">{p.commissionPercentage}%</td>
 <td className="py-3 font-mono font-bold text-emerald-700">
 R$ {p.revenueGeneratedTotal.toLocaleString('pt-BR')}
 </td>
 <td className="py-3 font-mono text-slate-500">{p.contractEnd}</td>
 <td className="py-3 text-right">
 <button
 onClick={() => showToast('Contrato', `Minuta do contrato ${p.id} visualizada.`, 'info')}
 className="text-xs text-amber-700 hover:text-amber-800 font-medium cursor-pointer"
 >
 Detalhes
 </button>
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
