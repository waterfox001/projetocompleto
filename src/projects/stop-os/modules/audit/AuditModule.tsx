import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Lock, Smartphone, Laptop, CheckCircle2, AlertTriangle, Search } from 'lucide-react';

export const AuditModule: React.FC = () => {
 const { auditLogs, showToast } = useApp();

 const [searchTerm, setSearchTerm] = useState('');

 const filteredLogs = auditLogs.filter(
 (l) =>
 l.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
 l.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
 l.module.toLowerCase().includes(searchTerm.toLowerCase()) ||
 l.resourceId.toLowerCase().includes(searchTerm.toLowerCase())
 );

 return (
 <div className="space-y-4 pb-10">
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded p-3.5">
 <div>
 <div className="text-[10px] font-mono uppercase tracking-wider text-amber-700 font-bold">
 Trilha de Auditoria & Segurança
 </div>
 <h2 className="text-sm font-bold text-slate-900 tracking-tight">
 Logs de Auditoria, Rastreamento & Conformidade LGPD
 </h2>
 <p className="text-xs text-slate-500 mt-1">
 Registro imutável de todas as transações, alterações de metas, check-ins de bagagem e acessos corporativos.
 </p>
 </div>
 </div>

 <div className="bg-white rounded border border-slate-200 p-5 space-y-4">
 <div className="flex items-center justify-between">
 <div className="relative flex-1 max-w-md">
 <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
 <input
 type="text"
 value={searchTerm}
 onChange={(e) => setSearchTerm(e.target.value)}
 placeholder="Filtrar por usuário, módulo, ação ou ID do recurso..."
 className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500"
 />
 </div>
 <span className="text-xs font-mono text-slate-500">{filteredLogs.length} eventos auditados</span>
 </div>

 <div className="overflow-x-auto">
 <table className="w-full text-left text-xs font-mono">
 <thead>
 <tr className="border-b border-slate-200 text-[10px] text-slate-500 uppercase">
 <th className="pb-3">Timestamp</th>
 <th className="pb-3 font-sans">Usuário / Papel</th>
 <th className="pb-3 font-sans">Módulo</th>
 <th className="pb-3 font-sans">Ação Executada</th>
 <th className="pb-3 font-sans">Resultado / Estado</th>
 <th className="pb-3">IP / Dispositivo</th>
 <th className="pb-3 text-right">Status</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-slate-100">
 {filteredLogs.map((log) => (
 <tr key={log.id} className="hover:bg-slate-50/60 transition-colors">
 <td className="py-3 text-slate-500 text-[11px]">
 {new Date(log.timestamp).toLocaleString('pt-BR')}
 </td>
 <td className="py-3 font-sans">
 <div className="font-bold text-slate-800">{log.user}</div>
 <div className="text-[10px] text-slate-500 uppercase">{log.role}</div>
 </td>
 <td className="py-3 font-sans text-amber-700 font-semibold">{log.module}</td>
 <td className="py-3 font-sans text-slate-800">{log.action}</td>
 <td className="py-3 text-slate-700 text-[11px] max-w-xs truncate">
 {log.afterState || log.resourceId}
 </td>
 <td className="py-3 text-slate-500 text-[10px]">
 <div>{log.ipAddress}</div>
 <div className="text-slate-500 truncate max-w-[140px]">{log.device}</div>
 </td>
 <td className="py-3 text-right">
 <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
 {log.status.toUpperCase()}
 </span>
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
