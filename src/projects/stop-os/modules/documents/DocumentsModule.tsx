import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FolderLock, FileText, Download, Plus, AlertTriangle, ShieldCheck, Search } from 'lucide-react';

export const DocumentsModule: React.FC = () => {
 const { showToast } = useApp();

 const [searchTerm, setSearchTerm] = useState('');

 const documents = [
 {
 id: 'DOC-01',
 title: 'Alvará de Funcionamento e Concessão Aeroporto Congonhas (Aena)',
 category: 'Alvarás & Concessão',
 expiryDate: '2028-12-31',
 unit: 'CGH',
 status: 'Válido',
 author: 'Jurídico Stopcase'
 },
 {
 id: 'DOC-02',
 title: 'Apólice de Seguro de Responsabilidade Civil e Guarda de Bagagens (Porto Seguro)',
 category: 'Seguros & Riscos',
 expiryDate: '2027-04-15',
 unit: 'Todas',
 status: 'Válido',
 author: 'Controladoria'
 },
 {
 id: 'DOC-03',
 title: 'Certificado de Aferição Periódica de Balanças INMETRO/IPEM (Base FOR)',
 category: 'Técnico & Calibração',
 expiryDate: '2026-11-20',
 unit: 'FOR',
 status: 'A Vencer em 45d',
 author: 'Operações'
 },
 {
 id: 'DOC-04',
 title: 'Manual de Segurança Contra Incêndio e Pânico no Aeroporto (AVSEC ANAC)',
 category: 'Segurança & Compliance',
 expiryDate: '2027-09-01',
 unit: 'Todas',
 status: 'Válido',
 author: 'Comitê de Segurança'
 }
 ];

 return (
 <div className="space-y-4 pb-10">
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded p-3.5">
 <div>
 <div className="text-[10px] font-mono uppercase tracking-wider text-amber-700 font-bold">
 Compliance & Gestão Documental
 </div>
 <h2 className="text-sm font-bold text-slate-900 tracking-tight">
 Documentos Oficiais, Alvarás & Apólices
 </h2>
 <p className="text-xs text-slate-500 mt-1">
 Controle de vencimentos regulatórios da ANAC, seguros de extravio e alvarás aeroportuários.
 </p>
 </div>

 <button
 onClick={() => showToast('Upload', 'Seletor de arquivos digitais aberto.', 'info')}
 className="px-3.5 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded cursor-pointer flex items-center gap-1.5 shrink-0"
 >
 <Plus className="w-3.5 h-3.5 stroke-[3]" />
 <span>+ Enviar Documento</span>
 </button>
 </div>

 <div className="bg-white rounded border border-slate-200 p-5 space-y-4">
 <div className="overflow-x-auto">
 <table className="w-full text-left text-xs">
 <thead>
 <tr className="bg-slate-50 border-b border-slate-200 text-[11px] text-slate-600 font-semibold">
 <th className="pb-3">Código / Nome do Documento</th>
 <th className="pb-3">Categoria</th>
 <th className="pb-3">Base Aeroporto</th>
 <th className="pb-3">Validade</th>
 <th className="pb-3">Status</th>
 <th className="pb-3 text-right">Download</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-slate-100">
 {documents.map((doc) => (
 <tr key={doc.id} className="hover:bg-slate-50/60 transition-colors">
 <td className="py-3">
 <div className="font-mono text-amber-700 font-bold">{doc.id}</div>
 <div className="font-semibold text-slate-800">{doc.title}</div>
 </td>
 <td className="py-3 text-slate-500 font-mono text-[11px]">{doc.category}</td>
 <td className="py-3 font-mono font-bold text-slate-700">{doc.unit}</td>
 <td className="py-3 font-mono text-slate-700">{doc.expiryDate}</td>
 <td className="py-3">
 <span
 className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
 doc.status === 'Válido'
 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
 : 'bg-amber-50 text-amber-800 border border-amber-200'
 }`}
 >
 {doc.status}
 </span>
 </td>
 <td className="py-3 text-right">
 <button
 onClick={() => showToast('Download', `Documento ${doc.id} baixado com carimbo digital.`, 'success')}
 className="p-1.5 text-slate-500 hover:text-amber-700 hover:bg-slate-100 rounded cursor-pointer inline-flex"
 title="Baixar cópia PDF"
 >
 <Download className="w-4 h-4" />
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
