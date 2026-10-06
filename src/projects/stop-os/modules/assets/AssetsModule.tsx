import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AssetEquipment } from '../../types';
import {
 Wrench,
 Plus,
 Calendar,
 AlertTriangle,
 CheckCircle2,
 Building2,
 Search,
 Clock,
 ShieldCheck
} from 'lucide-react';

export const AssetsModule: React.FC = () => {
 const { assets, selectedUnitId, showToast } = useApp();

 const [activeTab, setActiveTab] = useState<'ativos' | 'manutencao'>('ativos');

 const filteredAssets = assets.filter(
 (a) => selectedUnitId === 'all' || a.unitId === selectedUnitId
 );

 return (
 <div className="space-y-4 pb-10">
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded p-3.5">
 <div>
 <div className="text-[10px] font-mono uppercase tracking-wider text-amber-700 font-bold">
 Infraestrutura & Equipamentos de Pista
 </div>
 <h2 className="text-sm font-bold text-slate-900 tracking-tight">
 Ativos, Calibração & Manutenção Preventiva
 </h2>
 <p className="text-xs text-slate-500 mt-1">
 Controle patrimonial de balanças digitais certificadas pelo IPEM/INMETRO, impressoras térmicas e leitores.
 </p>
 </div>

 <div className="flex items-center gap-2">
 <div className="flex items-center gap-1 p-1 bg-slate-100 p-0.5 rounded text-xs">
 <button
 onClick={() => setActiveTab('ativos')}
 className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors cursor-pointer ${
 activeTab === 'ativos' ? 'bg-white text-slate-900 font-semibold shadow-xs' : 'text-slate-600 hover:text-slate-900'
 }`}
 >
 Inventário de Ativos
 </button>
 <button
 onClick={() => setActiveTab('manutencao')}
 className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors cursor-pointer ${
 activeTab === 'manutencao' ? 'bg-white text-slate-900 font-semibold shadow-xs' : 'text-slate-600 hover:text-slate-900'
 }`}
 >
 Manutenções & Calibração
 </button>
 </div>

 <button
 onClick={() => showToast('Novo Ativo', 'Cadastro de equipamento aberto.', 'info')}
 className="px-3 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded cursor-pointer flex items-center gap-1.5 shrink-0"
 >
 <Plus className="w-3.5 h-3.5 stroke-[3]" />
 <span>+ Novo Ativo</span>
 </button>
 </div>
 </div>

 {activeTab === 'ativos' ? (
 <div className="bg-white rounded border border-slate-200 p-5 space-y-4">
 <div className="overflow-x-auto">
 <table className="w-full text-left text-xs">
 <thead>
 <tr className="bg-slate-50 border-b border-slate-200 text-[11px] text-slate-600 font-semibold">
 <th className="pb-3">Código Patrimonial</th>
 <th className="pb-3">Equipamento / Descrição</th>
 <th className="pb-3">Base</th>
 <th className="pb-3">Responsável</th>
 <th className="pb-3">Valor Contábil</th>
 <th className="pb-3">Status</th>
 <th className="pb-3 text-right">Ação</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-slate-100">
 {filteredAssets.map((asset) => (
 <tr key={asset.id} className="hover:bg-slate-50/60 transition-colors">
 <td className="py-3 font-mono font-bold text-amber-700">{asset.assetCode}</td>
 <td className="py-3 font-semibold text-slate-800">{asset.name}</td>
 <td className="py-3 font-mono text-slate-500">{asset.unitId}</td>
 <td className="py-3 text-slate-700">{asset.responsible}</td>
 <td className="py-3 font-mono text-slate-700">R$ {asset.value.toFixed(2)}</td>
 <td className="py-3">
 <span
 className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
 asset.status === 'Operacional'
 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
 : 'bg-amber-50 text-amber-800 border border-amber-200'
 }`}
 >
 {asset.status}
 </span>
 </td>
 <td className="py-3 text-right">
 <button
 onClick={() => showToast('Ordem de Serviço', `OS aberta para ${asset.name}.`, 'info')}
 className="text-xs text-amber-700 hover:text-amber-800 font-medium cursor-pointer"
 >
 Abrir OS
 </button>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </div>
 ) : (
 <div className="bg-white rounded border border-slate-200 p-5 space-y-4">
 <h3 className="text-sm font-bold text-slate-900">Cronograma de Manutenção Preventiva & Calibração INMETRO</h3>
 <div className="space-y-3 text-xs">
 {assets.map((asset) => (
 <div key={asset.id} className="p-3.5 bg-slate-50/70 rounded border border-slate-200 flex items-center justify-between">
 <div>
 <div className="font-semibold text-slate-800">{asset.name} ({asset.assetCode})</div>
 <div className="text-[11px] text-slate-500 mt-0.5">
 Unidade: {asset.unitId} · Responsável: {asset.responsible}
 </div>
 </div>
 <div className="text-right">
 <div className="text-slate-500 text-[11px]">Próxima Manutenção / Aferição:</div>
 <div className="font-mono font-bold text-amber-700">{asset.nextMaintenanceDate}</div>
 </div>
 </div>
 ))}
 </div>
 </div>
 )}
 </div>
 );
};
